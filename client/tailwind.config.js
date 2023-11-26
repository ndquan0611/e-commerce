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
                borderElement: '#ebebeb',
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
            keyframes: {
                slideTop: {
                    '0%': {
                        '-webkit-transform': 'translateY(10px)',
                        transform: 'translateY(10px)',
                    },
                    '100%': {
                        '-webkit-transform': 'translateY(0)',
                        transform: 'translateY(0)',
                    },
                },
                scaleUpTl: {
                    '0%': {
                        '-webkit-transform': 'scale(0.5)',
                        transform: 'scale(0.5)',
                        '-webkit-transform-origin': '0% 0%',
                        'transform-origin': '0% 0%',
                    },
                    '100%': {
                        '-webkit-transform': 'scale(1)',
                        transform: 'scale(1)',
                        '-webkit-transform-origin': '0% 0%',
                        'transform-origin': '0% 0%',
                    },
                },
            },
            animation: {
                slideTop: 'slideTop 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
                scaleUpTl: 'scaleUpTl cubic-bezier(0.390, 0.575, 0.565, 1.000) both',
            },
        },
    },
    plugins: [],
};
