/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
       primary:{
        DEFAULT:'#1F939A',
        light:'#DBEEEF'
      },
      },
    },
  },
  plugins: [],
}