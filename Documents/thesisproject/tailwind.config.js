/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/*.tsx",
    "./layouts/*.tsx",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
