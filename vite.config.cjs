const { defineConfig } = require('vite');
const tailwind = require('vite-plugin-tailwind');  // Ensure this is the plugin

module.exports = defineConfig({
  plugins: [tailwind()],
  css: {
    postcss: false,  // Disable PostCSS processing entirely
  },
});
