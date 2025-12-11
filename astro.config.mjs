// @ts-check
import { defineConfig, fontProviders } from "astro/config"

import react from "@astrojs/react"

import tailwindcss from "@tailwindcss/vite"

import cloudflare from "@astrojs/cloudflare"

// https://astro.build/config
export default defineConfig({
  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        name: "Inter",
        cssVariable: "--font-inter",
        subsets: ["latin"],
        weights: ["100", "300", "700"],
      },
      {
        provider: fontProviders.google(),
        name: "IBM Plex Mono",
        cssVariable: "--font-ibm-plex-mono",
        subsets: ["latin"],
        weights: ["100", "300", "700"],
      },
      {
        name: "Avantt",
        cssVariable: "--font-avantt",
        provider: "local",
        variants: [
          {
            src: ["./src/assets/fonts/Avantt-Regular.woff2"],
            weight: "400",
            style: "normal",
          },
          {
            src: ["./src/assets/fonts/Avantt-Bold.woff2"],
            weight: "700",
            style: "normal",
          },
          {
            src: ["./src/assets/fonts/Avantt-SemiBold.woff2"],
            weight: "600",
            style: "normal",
          },
        ],
      },
    ],
  },

  publicDir: "public",

  integrations: [react()],

  vite: {
    plugins: [tailwindcss()],
  },

  adapter: cloudflare(),
})
