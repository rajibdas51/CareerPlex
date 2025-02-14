module.exports = {
  mode: 'jit',
  content: [
    /* */

    // Just-In-Time mode for faster builds and full class support
    './src/**/*.{js,ts,jsx,tsx,mdx}', // Broaden the scope to all src files
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00ae94',
      },
    },
  },

  plugins: [],
  important: true,
};
