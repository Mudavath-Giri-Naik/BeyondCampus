module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}", // Adjust paths as needed
    ],
    theme: {
      extend: {},
    },
    plugins: [
      require('@tailwindcss/typography'),
      require('@tailwindcss/forms'),
    ],
  }