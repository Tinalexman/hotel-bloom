import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-mantine-color-scheme="dark"]'],
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
      screens: {
        xs: {
          max: "120px",
        },
        sm: {
          max: "480px",
        },
        md: {
          max: "768px",
        },
        lg: {
          max: "976px",
        },
        xl: {
          max: "1440px",
        },
      },
      colors: {
        primary: "#A419A4",
        secondary: "#5A0870",
        "secondary-2": "rgba(140, 50, 150, 0.5)",
        tertiary: "#360056",
        neutral: "#647899",
        monokai: "#131313",
        offWhite: "#F9F9F9",
        "white-20": "rgba(255, 255, 255, 0.2)",
        "monokai-faded": "#161616",
        "neutral-light": "#EEEEEE",
        "neutral-dark": "#202020",
        input: "#F4F4F4",
        transparent: "rgba(0, 0, 0, 0)",
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
  plugins: [
    function ({ addUtilities }: any) {
      const newUtilities = {
        ".scrollbar-thin": {
          scrollbarWidth: "thin",
          scrollbarColor: "rgb(135 135 135) rgb(247 247 247)",
        },
        ".scrollbar-webkit": {
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "rgb(247 247 247)",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "rgb(135 135 135)",
            borderRadius: "4px",
          },
        },
      };
      addUtilities(newUtilities, ["responsive", "hover", "focus"]);
    },
  ],
};
export default config;
