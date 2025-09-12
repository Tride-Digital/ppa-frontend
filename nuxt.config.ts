import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  ssr: true,
  nitro: {
    prerender: {
      routes: ["/","/aboutus", "/announcements", "/services", "/contactus"], // only these are SSG
    },
  },

  css: [
    "vuetify/lib/styles/main.sass", // Or 'vuetify/styles'
    "@mdi/font/css/materialdesignicons.min.css", // For MDI icons
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
          href: "images/logo_black.png",
          media: "(prefers-color-scheme: light)",
        },
        {
          rel: "icon",
          type: "image/png",
          href: "images/logo_white.png",
          media: "(prefers-color-scheme: dark)",
        },
      ],
    },
  },
  runtimeConfig: {
    public: {
      adminAppUrl: 'https://qaadmin.planters.lk',
      registerUrl: 'https://qaadmin.planters.lk/register',
      registerServiceUrl: 'https://qaadmin.planters.lk/registerservice',
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
  // );
});
