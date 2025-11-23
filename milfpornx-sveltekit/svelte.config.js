import adapter from '@sveltejs/adapter-node';

const config = {
  kit: {
    adapter: adapter({ strict: false })
  }
};

export default config;
