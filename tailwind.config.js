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
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                'sidebar': '#EBEBEB',
                'underline': '#7E3C3C',
                'gray-button': '#4D4D4D',
                'green-button': '#597A45',
                'red-button': '#7A4242',
                'green-button-darker': '#436031',
                'red-button-darker': '#603131',
                'bg-green': 'A5F996',
                'bg-red': '#F9AF96',
                'bg-gray': '#8F8F8F',
            },
        },
    },
    plugins: [],
};
