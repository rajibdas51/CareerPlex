/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  corePlugins: {
    preflight: false, // This is important when using Ant Design
  },
  important: true, // This ensures Tailwind styles take precedence
  theme: {
    extend: {},
  },
  plugins: [],
};
