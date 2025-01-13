/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            spacing: {
                100: '25rem',
                128: '32rem',
                250: '62.5rem'
            }
        }
    },
    plugins: []
};
