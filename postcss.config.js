module.exports = {
    plugins: {
        'postcss-import': require('postcss-import'),
        'tailwindcss': require('tailwindcss'),
        'postcss-nested': require('postcss-nested'), // or require('postcss-nesting')
        'autoprefixer': require('autoprefixer'),
    }
}