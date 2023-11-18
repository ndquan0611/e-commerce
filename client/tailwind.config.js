/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js}'],
    theme: {
        extend: {
            fontFamily: {
                poppins: ['Poppins', 'sans-serif'],
            },
            colors: {
                primary: '#ee3131',
                textColor: '#505050',
                blackColor: '#1d1d1d',
                borderColor: '#0000001a',
            },
            width: {
                main: '1220px',
            },
            height: {
                header: '110px',
            },
            padding: {
                horizontal: '20px',
                verticalTopHeader: '10px',
            },
        },
    },
    plugins: [],
};
