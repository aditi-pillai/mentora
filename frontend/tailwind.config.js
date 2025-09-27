/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        base: {
          100: "var(--color-base-100)",
          200: "var(--color-base-200)",
          300: "var(--color-base-300)",
          content: "var(--color-base-content)",
        },
        primary: {
          DEFAULT: "var(--color-primary)",
          content: "var(--color-primary-content)",
        },
        secondary: {
          DEFAULT: "var(--color-secondary)",
          content: "var(--color-secondary-content)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          content: "var(--color-accent-content)",
        },
        neutral: {
          DEFAULT: "var(--color-neutral)",
          content: "var(--color-neutral-content)",
        },
        info: {
          DEFAULT: "var(--color-info)",
          content: "var(--color-info-content)",
        },
        success: {
          DEFAULT: "var(--color-success)",
          content: "var(--color-success-content)",
        },
        warning: {
          DEFAULT: "var(--color-warning)",
          content: "var(--color-warning-content)",
        },
        error: {
          DEFAULT: "var(--color-error)",
          content: "var(--color-error-content)",
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
