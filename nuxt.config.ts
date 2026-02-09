import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: "2026-02-09",
  nitro: {
    prerender: {
      routes: ["/","/aboutus", "/announcements", "/services", "/contactus"], // only these are SSG
    },
  },

  css: [
    "vuetify/lib/styles/main.sass", // Or 'vuetify/styles'
    "@mdi/font/css/materialdesignicons.min.css", // For MDI icons
    "assets/css/fonts.css",
  ],

  build: {
    transpile: ["vuetify"],
  },
  app: {
    head: {
      title: "Planters",
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "/images/logo_black.png",
          media: "(prefers-color-scheme: light)",
        },
        {
          rel: "icon",
          type: "image/png",
          href: "/images/logo_white.png",
          media: "(prefers-color-scheme: dark)",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap",
        },
      ],

      // GA4 Google tag
      script: [
        {
          async: true,
          src: "https://www.googletagmanager.com/gtag/js?id=G-XVW7315F4E",
        },
        {
          innerHTML: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XVW7315F4E');
          `,
        },
      ],
    },
  },
  runtimeConfig: {
    public: {
      adminAppUrl: 'https://admin.planters.lk',
      registerUrl: 'https://admin.planters.lk/register',
      backendUrl: 'https://api.planters.lk',
      registerServiceUrl: 'https://admin.planters.lk/registerservice',
      ga4Id: "G-XVW7315F4E",
    }
  },

  modules: ['nuxt-google-translate'],
  googleTranslate: {
    defaultLanguage: 'en',
    supportedLanguages: ['en','ta', 'si'],
  },
  // modules: [
  //   async (options, nuxt) => {
  //     nuxt.hooks.hook('vite:extendConfig', (config) => {
  //       config.plugins = config.plugins || [];
  //       config.plugins.push(
  //         vuetify({
  //           styles: {
  //             configFile: 'assets/scss/variables.scss', // Optional: for custom SASS variables
  //           },
  //         })
  //       )
  //     })
  //   },
  // ],

  // Optional: If you want to customize SASS variables
  // vite: {
  //   define: {
  //     'process.env.DEBUG': false, // Example for Vite
  //   },
  // },

  // Optional: If you use the `vite-plugin-vuetify` with `styles.configFile`
  // Create an `assets/scss/variables.scss` file with your custom Vuetify SASS variables
  // For example:
  // @forward 'vuetify/settings' with (
  //   $button-border-radius: 0px,

  vite: {
    build: {
      chunkSizeWarningLimit: 2000,
    },
  },
});
