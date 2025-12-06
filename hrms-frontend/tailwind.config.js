/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'tech-dark': '#0f0c29',
                'tech-purple': '#302b63',
                'tech-violet': '#24243e',
                'neon-pink': '#ea00d9',
                'neon-blue': '#0abdc6',
                'neon-purple': '#711c91',
            },
            animation: {
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            }
        },
    },
    plugins: [],
}
