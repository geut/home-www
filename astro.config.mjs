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
        weights: ["100", "300", "700"],
      },
      {
        provider: fontProviders.google(),
        name: "IBM+Plex+Mono",
        cssVariable: "--font-ibm-plex-mono",
        weights: ["100", "300", "700"],
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
