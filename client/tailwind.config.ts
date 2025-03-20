import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./templates/**/*.{js,ts,jsx,tsx,mdx}",
    "./shared/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "default-black": "#252525",
        "default-white": "#E6E6E6",
        "card-black": "#1A1A1A",
        "card-light": "#FAFAFA",
        placeholder: "#B3B3B3",
        primary: "#7B1D20",
        "primary-dark": "#400305",
        "primary-light": "#FF7B7F",
        "custom-blue": "#475993"
      },
      boxShadow: {
        default: "0px 4px 10px rgba(0, 0, 0, 0.25)"
      },
      fontFamily: {
        "la-belle-aurore": ["var(--font-la-belle-aurore)", "cursive"],
        "libre-baskerville": ["var(--font-libre-baskerville)", "serif"]
      },
      backgroundImage: {
        "background-gradient":
          "linear-gradient(to bottom, #7b1d20 50%, #f2f2f2 50%)",
        "dark-background-gradient":
          "linear-gradient(to bottom, #7b1d20 50%, #252525 50%)"
      }
    }
  },
  plugins: []
};
export default config;
