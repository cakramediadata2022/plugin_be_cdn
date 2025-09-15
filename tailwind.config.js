/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./example.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'ckh-primary': 'var(--ckh-primary-color, #007bff)',
                'ckh-secondary': 'var(--ckh-secondary-color, #6c757d)',
            },
            fontFamily: {
                'ckh': 'var(--ckh-font-family, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif)',
            },
            borderRadius: {
                'ckh': 'var(--ckh-border-radius, 0.375rem)',
            }
        },
    },
    plugins: [],
    // Important to override existing styles when used as a library
    important: '.ckh-booking-engine',
}