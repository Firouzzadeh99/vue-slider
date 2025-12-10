/// <reference types="node" />
// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

// Normalize base URL (used for GitHub Pages). Default to '/' for dev.
const rawBase = process.env.NUXT_APP_BASE_URL || '/'
const normalizedBaseURL = (() => {
  const withLeading = rawBase.startsWith('/') ? rawBase : `/${rawBase}`
  return withLeading.endsWith('/') ? withLeading : `${withLeading}/`
})()

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  app: {
    baseURL: normalizedBaseURL,
    head: {
      title: 'اسلایدر محصولات',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },
  },
  nitro: {
    preset: 'github-pages',
    prerender: {
      crawlLinks: false,
      routes: ['/', '/200.html', '/404.html'],
    },
  },
})