/// <reference types="node" />
// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

const rawBase = "my-slider-project"
const normalizedBaseURL = rawBase
  ? rawBase.startsWith('/') ? rawBase : `/${rawBase}`
  : '/'

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
  },
})