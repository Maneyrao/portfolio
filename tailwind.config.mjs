/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/app/**/*.{js,jsx,ts,tsx,mdx}',
    './src/components/**/*.{js,jsx,ts,tsx,mdx}',
    './src/lib/**/*.{js,jsx,ts,tsx,mdx}',
    './src/data/**/*.{js,jsx,ts,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
