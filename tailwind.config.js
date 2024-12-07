module.exports = {
  mode: 'jit',
  content: [
    /* */

    // Just-In-Time mode for faster builds and full class support
    './src/**/*.{js,ts,jsx,tsx,mdx}', // Broaden the scope to all src files
  ],
  theme: {
    extend: {},
  },

  plugins: [],
  important: true,
};
