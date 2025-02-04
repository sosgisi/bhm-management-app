import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/**/*.blade.php',
        './resources/**/*.jsx',
        './resources/**/*.js',
    ],
    theme: {
        extend: {
            animation: {
                slideInOut: "slideInOut 5s ease-in-out",
            },
            keyframes: {
                slideInOut: {
                    "0%": { transform: "translateX(-100%)", opacity: 0 },
                    "10%": { transform: "translateX(0)", opacity: 1 },
                    "90%": { transform: "translateX(0)", opacity: 1 },
                    "100%": { transform: "translateX(-100%)", opacity: 0 },
                },
            },
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                'sidebar': '#EBEBEB',
                'underline': '#7E3C3C',
                'gray-button': '#4D4D4D',
                'green-button': '#597A45',
                'red-button': '#7A4242',
                'gray-button-darker': '#2E2E2E',
                'green-button-darker': '#436031',
                'red-button-darker': '#603131',
                'yellow-button': '#767A45',
                'yellow-button-darker': '#5B5F1F',
                'green-area': '#A5F996',
                'red-area': '#F9AF96',
                'gray-area': '#8F8F8F',
                'main': '#F1F1F1'
            },
        },
    },
    plugins: [],
};
