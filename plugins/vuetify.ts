import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import 'vuetify/styles' // Vuetify styles

export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    ssr: true, // Enable SSR support
    components,
    directives,
    icons: {
      defaultSet: 'mdi', // Set default icon set
    },
    // Add any other Vuetify configurations here, e.g., themes
    theme: {
      defaultTheme: 'dark',
      themes: {
        dark: {
          colors: {
            primary: '#1867C0',
            secondary: '#5CBBF6',
          },
        },
      },
    },
  })

  nuxtApp.vueApp.use(vuetify)
})