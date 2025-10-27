import textFillStroke from "tailwindcss-text-fill-stroke"

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      backgroundImage: () => ({
        curl: "url('/images/curl.svg')",
        "curl-dark": "url('/images/curl-dark.svg')",
        "curl-card": "url('/images/curl-card.svg')",
      }),
      typography: () => ({
        DEFAULT: {
          css: {
            pre: { color: null, backgroundColor: null },
            "pre code": { color: null, backgroundColor: null },
          },
        },
      }),
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0.0, 0.2, 1)",
      },
      transitionDuration: {
        "800": "800ms",
        "1200": "1200ms",
      },
    },
  },
  plugins: [textFillStroke],
  variants: {
    extend: {},
  },
}
