import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    ssr: true,
    components,
    directives,
    icons: {
      defaultSet: 'mdi',
    },
    theme: {
      defaultTheme: 'light',
      themes: {
        light: {
          colors: {
            primary: '#0b4c1a',
            secondary: '#ffffff',
            accent: '#4caf50',
            error: '#f44336',
            warning: '#ff9800',
            info: '#2196f3',
            success: '#4caf50',
            background: '#f8f9fa',
            surface: '#ffffff',
            'on-primary': '#ffffff',
            'on-secondary': '#000000',
            'on-background': '#1f1f1f',
            'on-surface': '#1f1f1f',
            'primary-darken-1': '#064113',
            'secondary-lighten-1': '#f5f5f5',
            'section-title': '#2e7d32',
            'section-subtitle': '#666666',
            'product-description': '#555555',
            'announcement-title': '#ffffff',
            'announcement-date': '#ffffff',
            'announcement-overlay-start': 'rgba(0, 0, 0, 0.3)',
            'announcement-overlay-end': 'rgba(0, 0, 0, 0.8)',
            'hero-overlay': 'rgba(0, 0, 0, 0.4)',
            'hero-text-shadow': 'rgba(0, 0, 0, 0.5)',
            'hero-arrow-bg': 'rgba(255, 255, 255, 0.2)',
            'hero-arrow-bg-hover': 'rgba(255, 255, 255, 0.3)',
            'footer-text-secondary': '#e8f5e8',
            'footer-link-hover': '#4caf50',
            'footer-border': '#2e7d32',
            'footer-social-btn-bg': 'rgba(76, 175, 80, 0.1)',
            'announcement-shadow': 'rgba(0, 0, 0, 0.15)',
            'product-card-shadow': 'rgba(0, 0, 0, 0.15)',
            'about-text': '#424242',
          }
        },
        dark: {
          colors: {
            primary: '#121212',
            secondary: '#ffffff',
            accent: '#81c784',
            error: '#cf6679',
            warning: '#ffb74d',
            info: '#64b5f6',
            success: '#81c784',
            background: '#121212',
            surface: '#1e1e1e',
            'on-primary': '#ffffff',
            'on-secondary': '#000000',
            'on-background': '#ffffff',
            'on-surface': '#ffffff',
            'section-title': '#81c784',
            'section-subtitle': '#b0b0b0',
            'product-description': '#cccccc',
            'announcement-title': '#ffffff',
            'announcement-date': '#e0e0e0',
            'announcement-overlay-start': 'rgba(0, 0, 0, 0.4)',
            'announcement-overlay-end': 'rgba(0, 0, 0, 0.9)',
            'hero-title': '#ffffff',
            'hero-overlay': 'rgba(0, 0, 0, 0.5)',
            'hero-text-shadow': 'rgba(0, 0, 0, 0.7)',
            'hero-arrow-bg': 'rgba(255, 255, 255, 0.25)',
            'hero-arrow-bg-hover': 'rgba(255, 255, 255, 0.4)',
            'footer-text-secondary': '#b0b0b0',
            'footer-link': '#ffffff',
            'footer-link-hover': '#4caf50',
            'footer-border': '#333333',
            'footer-social-btn-bg': 'rgba(76, 175, 80, 0.1)',
            'announcement-shadow': 'rgba(0, 0, 0, 0.25)',
            'product-card-shadow': 'rgba(0, 0, 0, 0.25)',
            'about-text': '#e0e0e0',
          },
        },
      },
    },
    defaults: {
      VBtn: {
        style: 'text-transform: none;',
        variant: 'flat',
      },
      VCard: {
        elevation: 2,
      },
      VTextField: {
        variant: 'outlined',
        density: 'comfortable',
      },
      VSelect: {
        variant: 'outlined',
        density: 'comfortable',
      },
    },
  })

  nuxtApp.vueApp.use(vuetify)
})