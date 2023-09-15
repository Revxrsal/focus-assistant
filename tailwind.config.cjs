const textSafelist = ["base", "xl", "2xl", "3xl", "4xl", "5xl", "6xl", "7xl", "8xl", "9xl"]
    .map(v => `text-${v}`)
    .join(" ");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
    darkMode: "media",
    theme: {
        extend: {}
    },
    safelist: textSafelist,
    plugins: []
};
