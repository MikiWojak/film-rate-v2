/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                roboto: ['Roboto', 'sans-serif']
            },
            spacing: {
                128: '32rem',
                250: '62.5rem',
            }
        }
    },
    plugins: []
};
