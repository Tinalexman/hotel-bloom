import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ['class', '[data-mantine-color-scheme="dark"]'],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#39E058",
        "primary-80": "rgba(65, 240, 100, 1)",
        "primary-20": "rgba(65, 240, 100, 0.2)",
        "primary-shade-1": "#A8DF4C",
        "primary-shade-2": "#E5DC5F",
        "primary-shade-3": "#FFDA83",
        secondary: "#1D4875",
        "secondary-80": "rgba(40, 80, 130, 1)",
        tertiary: "#DEF2FF",
        neutral: "#647899",
        monokai: "#131313",
        "monokai-faded": "#161616",
        "neutral-light": "#E5E5E5",
        "neutral-dark": "#202020",
        input: "#F4F4F4",
        "contrast-base": "#474747",
        error: "#FF0000",
        "error-20": "rgba(255, 0, 0, 0.2)",
      },
      boxShadow: {
        "custom-black": "0 0 5px rgba(0, 0, 0, 0.1)",
        "custom-white": "0 0 5px rgba(255, 255, 255, 0.1)",
      },
    },
  },
  plugins: [],
};
export default config;
