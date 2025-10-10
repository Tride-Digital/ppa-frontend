<template>
    <div v-if="isMobile">
        <v-navigation-drawer v-model="sidebar" app :color="$vuetify.theme.current.colors.primary">
            <v-list nav dense>
                <div @click="goToHome" tag="span" style="cursor: pointer">
                    <v-row align="center">
                        <v-col cols="12" class="pa-2 mt-3">
                            <v-img :src="theme.global.current.value.dark?'/images/logo-dark.png':'/images/logo-dark.png'" contain max-height="60" class="mobile-logo"></v-img>
                        </v-col>
                    </v-row>
                </div>
                <v-divider class="my-6" :thickness="2"></v-divider>
                <v-list-item class="px-0 py-0 mb-2">
                    <v-btn icon @click="toggleTheme" class="mobile-theme-toggle-btn">
                        <v-icon>{{ isDarkTheme ? 'mdi-white-balance-sunny' : 'mdi-moon-waning-crescent' }}</v-icon>
                    </v-btn>
                </v-list-item>
                <v-list-item v-for="item in menuItems" :key="item.title" :to="item.path" link>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
                <v-list-item to="/announcements" link>
                    <v-list-item-title>Announcements</v-list-item-title>
                </v-list-item>
                <v-list-item @click="goToRegister" link>
                    <v-list-item-title>Join PPA</v-list-item-title>
                </v-list-item>
                <v-list-item @click="goToAdmin" link>
                    <v-list-item-title>Log In</v-list-item-title>
                </v-list-item>
                <!-- <div class="d-flex">
                    <LanguageSelector/>
                </div> -->
            </v-list>
        </v-navigation-drawer>
        <v-fab-transition>
            <v-btn v-if="isMobile" icon color="transparent" class="fab" @click="sidebar = !sidebar">
                <v-icon>mdi-menu</v-icon>
            </v-btn>
        </v-fab-transition>
    </div>
    <v-app-bar v-else app flat height="90" :color="$vuetify.theme.current.colors.surface" class="navbar-with-border">
  <v-toolbar flat :color="$vuetify.theme.current.colors.surface" height="110">
    <v-toolbar-title class="logo-container">
      <div @click="goToHome" tag="span" style="cursor: pointer">
        <v-row align="center" no-gutters>
          <v-img class="logo-img" :src="theme.global.current.value.dark?'/images/logo-dark.png':'/images/logo.png'" contain height="90" width="220"/>
        </v-row>
      </div>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="nav-items">
      <v-btn flat v-for="item in menuItems.slice(0, 5)" :key="item.title" :to="item.path" class="nav-link">{{ item.title }}</v-btn>
      <v-btn flat @click="goToRegister" class="nav-link">Join PPA</v-btn>
      <v-btn flat @click="goToAdmin" class="nav-link">Log In</v-btn>
      <div class="d-flex align-center mx-2">
        <v-btn icon @click="goToAnnouncements" class="announcements-icon-btn" title="Announcements">
          <v-icon>mdi-bullhorn</v-icon>
        </v-btn>
      </div>
      <div class="d-flex align-center mx-2">
        <CartNavButton :cart-items="cartItems" @toggle-cart="handleToggleCart" @cart-click="handleCartClick"/>
      </div>
      <div class="d-flex align-center mx-2">
        <v-btn icon @click="toggleTheme" class="theme-toggle-btn" title="Toggle Theme">
          <v-icon>{{ isDarkTheme ? 'mdi-white-balance-sunny' : 'mdi-moon-waning-crescent' }}</v-icon>
        </v-btn>
      </div>
      <v-btn flat v-for="item in menuItems.slice(5)" :key="item.title" :to="item.path" class="nav-link">{{ item.title }}</v-btn>
      <!-- <div class="d-flex align-center mx-3">
        <LanguageSelector/>
      </div> -->
    </v-toolbar-items>
  </v-toolbar>
</v-app-bar>
</template>

<script setup>
import { useDisplay, useTheme } from 'vuetify';
import { ref, computed } from "vue";
import { useRouter } from 'vue-router';
import LanguageSelector from './LanguageSelector.vue';
import CartNavButton from './cart/CartNavButton.vue';
import { useCart } from '~/composables/useCart';
const config = useRuntimeConfig();
const { xs, sm } = useDisplay();
const isMobile = computed(() => xs.value || sm.value);
const router = useRouter();
const theme = useTheme();
const sidebar = ref(false);
const search = ref('');
const isDarkTheme = computed(() => theme.global.current.value.dark);
const { cartItems, toggleCartModal, openCartModal } = useCart();
const toggleTheme = () => {
    const newTheme = isDarkTheme.value ? 'light' : 'dark';
    theme.global.name.value = newTheme;
    localStorage.setItem('theme', newTheme);
};
const handleToggleCart = () => {
  toggleCartModal()
}
const handleCartClick = () => {
  openCartModal()
}

const menuItems = ref([
    { title: 'Home', path: '/', icon: 'mdi-home' },
    { title: 'About us', path: '/aboutus', icon: 'mdi-home' },
    { title: 'Services', path: '/services', icon: 'mdi-leaf' },
    { title: 'Our Team', path: '/contactus', icon: 'mdi-phone' },
    { title: 'Blogs', path: '/blogs', icon: 'mdi-text-box-multiple-outline' },

]);
const goToHome = () => {
    router.push('/');
};
const goToAdmin = () => {
    window.open(config.public.adminAppUrl, '_blank')
};
const goToRegister = () => {
  router.push('/providerselector');
};
const goToAnnouncements = () => {
  router.push('/announcements');
};
</script>

<style scoped>
.fab {
    position: fixed;
    top: 5px;
    left: 5px;
    z-index: 100;
}
.navbar-with-border {
    border-bottom: 2px solid rgb(var(--v-theme-hero-arrow-bg)) !important;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
}

.nav-items .nav-link {
    color: rgb(var(--v-theme-navtext)) !important;
    font-weight: 500;
    text-transform: none;
}
.search-bar {
    align-items: center;
    border-radius: 20px;
    min-width: 250px;
    height: 50px;
}
.search-bar .v-field__input {
    color: var(--v-theme-onSecondary) !important;
}
.search-bar .v-field__prepend-inner {
    color: var(--v-theme-onSecondary) !important;
}
.theme-toggle-btn {
    color: var(--v-theme-on-primary) !important;
    transition: transform 0.3s ease;
    border-radius: 50%;
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
}
.announcements-icon-btn {
    color: rgb(var(--v-theme-navtext)) !important;
    transition: all 0.3s ease;
    border-radius: 50%;
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
}
.mobile-theme-toggle-btn {
    color: var(--v-theme-on-primary) !important;
    transition: transform 0.3s ease;
    background-color: var(--v-theme-toggle-btn);
    border: 1px solid var(--v-theme-hero-arrow-bg);
    border-radius: 50%;
}
.theme-toggle-btn:hover,
.mobile-theme-toggle-btn:hover {
    transform: rotate(30deg);
    background-color: var(--v-theme-toggle-btn-hover);
}
.announcements-icon-btn:hover {
    background-color: rgba(var(--v-theme-primary-rgb), 0.1);
}
.announcements-icon-btn .v-icon {
    color: inherit !important;
}

.logo-container {
    flex-shrink: 0 !important;
    min-width: 220px !important;
    height: 100% !important;
    display: flex !important;
    align-items: center !important;
}

.logo-img {
    width: 220px !important;
    height: 90px !important;
    flex-shrink: 0 !important;
    object-fit: contain !important;
    max-width: none !important;
    max-height: none !important;
}

.mobile-logo {
    width: 100%;
    object-fit: contain;
}
</style>