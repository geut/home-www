import textFillStroke from "tailwindcss-text-fill-stroke"

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      backgroundImage: (theme: any) => ({
        dots: "url('src/assets/dots.svg')",
        topo: "url('src/assets/topography.svg')" , 
        curl: "url('src/assets/curl.svg')", 
        curl2: "url('src/assets/curl-2.svg')",
        'curl-dark': "url('src/assets/curl-dark.svg')",
      }),
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            pre: { color: null, backgroundColor: null },
            "pre code": { color: null, backgroundColor: null },
          },
        },
      }),
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      },
      transitionDuration: {
        '800': '800ms',
        '1200': '1200ms',
      },
    },
  },
  plugins: [textFillStroke],
  variants: {
    extend: {},
  },
}
