import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./templates/**/*.{js,ts,jsx,tsx,mdx}",
    "./shared/components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      textColor: {
        "default-black": "#252525",
        "default-white": "#F2F2F2",
        placeholder: "#B3B3B3",
        primary: "#7B1D20",
        "primary-dark": "#400305",
        "primary-light": "#FF7B7F"
      },
      backgroundColor: {
        "default-black": "#252525",
        "card-black": "#1A1A1A",
        "default-white": "#F2F2F2",
        "card-light": "#FAFAFA",
        primary: "#7B1D20",
        "primary-dark": "#400305",
        "primary-light": "#FF7B7F"
      },
      boxShadow: {
        default: "0px 4px 10px rgba(0, 0, 0, 0.25)"
      },
      borderColor: {
        primary: "#7B1D20"
      },
      fontFamily: {
        "la-belle-aurore": ["var(--font-la-belle-aurore)", "cursive"]
      }
    }
  },
  plugins: []
};
export default config;
