const express = require("express");
const cors = require("cors");
const { google } = require("googleapis");
const fs = require("fs");
require("dotenv").config();

const app = express();

// ================================
// CORS
// ================================
app.use(cors({
  origin: [
    "https://milfpornx.com",
    "https://www.milfpornx.com",
    "http://localhost:5173"
  ],
  methods: ["GET"],
  allowedHeaders: ["Content-Type", "x-api-key"]
}));

// ================================
// GOOGLE SHEETS AUTH
// ================================
let credentials;

if (process.env.GOOGLE_CREDENTIALS_BASE64) {
  credentials = JSON.parse(
    Buffer.from(process.env.GOOGLE_CREDENTIALS_BASE64, "base64").toString("utf8")
  );
} else {
  credentials = JSON.parse(fs.readFileSync("credentials.json", "utf8"));
}

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"]
});

const spreadsheetId = process.env.SP_ID;

// ================================
// GLOBAL CACHE STRUCTURE
// ================================
const CACHE_TTL = 1000 * 60 * 15; // 15 min refresh

let sheets = {
  home: { data: [], ts: 0 },
  best: { data: [], ts: 0 },
  main: { data: [], ts: 0 },
  stars: { data: [], ts: 0 },
};

let randomPools = {
  main: { data: [], ts: 0 }
};

let searchIndex = {
  main: []
};

// ================================
// HELPERS
// ================================
async function getSheetValues(range) {
  const client = await auth.getClient();
  const sheetsAPI = google.sheets({ version: "v4", auth: client });

  try {
    const result = await sheetsAPI.spreadsheets.values.get({
      spreadsheetId,
      range
    });

    return result.data.values || [];

  } catch (err) {
    console.error("Google Sheets Error →", range);
    console.error(err);
    return [];
  }
}

async function getLastRow(sheetName, column = "B") {
  const col = await getSheetValues(`${sheetName}!${column}:${column}`);
  for (let i = col.length - 1; i >= 0; i--) {
    if (col[i][0] && col[i][0].trim() !== "") return i + 1;
  }
  return 1;
}

async function loadSheet(sheetName) {
  const now = Date.now();

  if (now - sheets[sheetName].ts < CACHE_TTL && sheets[sheetName].data.length)
    return sheets[sheetName].data;

  const lastRow = await getLastRow(sheetName);
  const rows = await getSheetValues(`${sheetName}!A2:J${lastRow}`);

  const parsed = rows.map(r => ({
    title: r[0] || "",
    video_url: r[1] || "",
    img_url: r[2] || "",
    source: r[3] || "",
    duration: r[4] || ""
  }));

  sheets[sheetName].data = parsed;
  sheets[sheetName].ts = now;

  if (sheetName === "main") buildSearchIndex(parsed);

  return parsed;
}

let starSheetCache = {
  data: [],
  ts: 0
};

const STAR_SHEET_TTL = 1000 * 60 * 15; // 15 min


async function loadStarSheetCached() {
  const now = Date.now();

  if (now - starSheetCache.ts < STAR_SHEET_TTL && starSheetCache.data.length) {
    return starSheetCache.data;
  }

  const stars = await loadStarsFromSheet();
  starSheetCache.data = stars;
  starSheetCache.ts = now;

  return stars;
}


async function loadStarsFromSheet() {
  const lastRow = await getLastRow("stars", "A");

  const rows = await getSheetValues(`stars!A2:J${lastRow}`);

  return rows.map(r => ({
    name: r[0] || "",                      
    slug: (r[1] || r[0] || "")             
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\-]/g, ""),       
    img_url: r[2] || "",         
    description: r[3] || ""         
  }));
}





function buildSearchIndex(rows) {
  searchIndex.main = rows.map((row, i) => ({
    title: (row.title || "").toLowerCase(),
    source: (row.source || "").toLowerCase(),
    i
  }));
}

function shuffle(arr) {
  let a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ================================
// RANDOM CACHE
// ================================
const RANDOM_TTL = 2000;

async function refreshRandom(sheetName = "main") {
  const rows = await loadSheet(sheetName);
  randomPools.main.data = shuffle([...rows]);
  randomPools.main.ts = Date.now();
}

// refresh random pool every 10 min
setInterval(() => refreshRandom("main"), RANDOM_TTL);
refreshRandom("main");

// ================================
// WARM ALL SHEETS ON STARTUP
// ================================
async function warmAllSheets() {
  console.log("🔄 Warming sheet cache...");
  await loadSheet("home");
  await loadSheet("best");
  await loadSheet("main");
  await loadStarSheetCached();

  await refreshRandom("main");
  console.log("✅ All sheets warmed & random pool ready");
}

warmAllSheets();

// ================================
// PAGINATION HANDLER
// ================================
async function handlePaginatedSheet(sheetName, req, res) {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 120;

  const data = await loadSheet(sheetName);

  const total = data.length;
  const pages = Math.ceil(total / limit);

  const start = (page - 1) * limit;
  const sliced = data.slice(start, start + limit);

  res.json({
    route: sheetName,
    page,
    limit,
    totalItems: total,
    totalPages: pages,
    data: sliced
  });
}

// ================================
// ROUTES
// ================================
app.get("/home", (req, res) => handlePaginatedSheet("home", req, res));
app.get("/best", (req, res) => handlePaginatedSheet("best", req, res));
app.get("/stars", async (req, res) => {
  const stars = await loadStarSheetCached();

  res.json({
    totalStars: stars.length,
    stars
  });
});


// RANDOM
app.get("/random", async (req, res) => {
  const limit = parseInt(req.query.limit) || 120;

  if (Date.now() - randomPools.main.ts > RANDOM_TTL)
    await refreshRandom("main");

  res.json({
    route: "random",
    limit,
    totalItems: randomPools.main.data.length,
    data: randomPools.main.data.slice(0, limit)
  });
});

// SEARCH
app.get("/search", async (req, res) => {
  const q = (req.query.q || "").toLowerCase().trim();
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 120;

  if (!q) return res.json({ page, totalPages: 1, videos: [] });

  const rows = await loadSheet("main");

  const matches = searchIndex.main
    .filter(x => x.title.includes(q) || x.source.includes(q))
    .map(x => rows[x.i]);

  const total = matches.length;
  const pages = Math.ceil(total / limit);

  res.json({
    page,
    totalPages: pages,
    videos: matches.slice((page - 1) * limit, page * limit)
  });
});

// ================================
// ADMIN CACHE RESET API
// ================================
// OPTIONAL: Protect with API key
const ADMIN_KEY = process.env.ADMIN_KEY || "letmein";

app.get("/admin/refresh", async (req, res) => {
  if (req.query.key !== ADMIN_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // reset entire cache
  sheets = {
    home: { data: [], ts: 0 },
    best: { data: [], ts: 0 },
    main: { data: [], ts: 0 },
    stars: { data: [], ts: 0 },
  };

  searchIndex.main = [];
  randomPools.main = { data: [], ts: 0 };

  await warmAllSheets();

  res.json({
    status: "ok",
    message: "All caches cleared and refreshed."
  });
});

// ================================
app.get("/", (req, res) => {
  res.json({ message: "API Ready." });
});

app.listen(1337, () => console.log("🔥 Ultra API running on port 1337"));
