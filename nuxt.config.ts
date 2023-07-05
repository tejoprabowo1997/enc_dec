// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-16',
      viewport: 'width=device-width, initial-scale=1',
      title: 'ENC DEC APP',
      meta: [
        {
          name: 'description',
          content: 'ENC DEC APP BY M.FARHAN',
        },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: 'https://www.lifewire.com/thmb/0_mo7cSyl1EddZM9nycLaTYo0Q4=/3864x2576/filters:fill(auto,1)/golden-digital-padlock-and-key-on-encrypted-data-913014174-5bf87aef46e0fb002673d6b6.jpg',
        },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: 'anonymous',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap',
        },
      ],
    },
    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },
    layoutTransition: {
      name: 'layout',
      mode: 'out-in',
    },
  },
  imports: {
    dirs: ['./stores'],
  },
  modules: ['@pinia/nuxt', 'nuxt-quasar-ui', '@pinia-plugin-persistedstate/nuxt'],
  pinia: {
    autoImports: ['defineStore'],
  },
  quasar: {
    extras: {
      fontIcons: ['material-icons'],
      animations: 'all',
    },
    plugins: ['Loading', 'Notify', 'AppFullscreen', 'Dialog'],
  },
  css: ['~/assets/styles/css/custom.css'],
  runtimeConfig: <
    {
      mongooDbUri: string
      dbName: string
      cryptoKey: string
    }
  >{
    mongooDbUri: process.env.MONGODB_URI,
    dbName: process.env.DB_NAME,
    cryptoKey: process.env.CRYPTO_KEY,
  },
})
