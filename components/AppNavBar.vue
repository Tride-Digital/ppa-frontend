<template>
    <div v-if="isMobile">
        <v-navigation-drawer v-model="sidebar" app :color="$vuetify.theme.current.colors.primary">
            <v-list nav dense>
                <div @click="goToHome" tag="span" style="cursor: pointer">
                    <v-row align="center">
                        <v-col cols="4" class="pa-0 ma-0"><v-img :height="75" :src="theme.global.current.value.dark?'/images/PPA_Logo.png':'/images/PPA_Logo.png'"></v-img></v-col>
                        <v-col cols="8" class="pa-0 ma-0">
                            <h3 translate="no">Proprietary</h3>
                            <h3 translate="no">Planters Alliance</h3>
                        </v-col>
                    </v-row>
                </div>
                <v-divider class="my-6" :thickness="2"></v-divider>
                <v-list-item class="px-0 py-0 mb-2">
                    <v-btn icon @click="toggleTheme" class="mobile-theme-toggle-btn">
                        <v-icon>{{ isDarkTheme ? 'mdi-white-balance-sunny' : 'mdi-moon-waning-crescent' }}</v-icon>
                    </v-btn>
                </v-list-item>
                <!-- <v-list-item class="px-0 py-0">
                    <v-text-field v-model="search" placeholder="Search" hide-details density="comfortable" prepend-inner-icon="mdi-magnify" variant="solo-filled" class="search-bar" :bg-color="$vuetify.theme.current.colors.secondary"></v-text-field>
                </v-list-item> -->
                <v-list-item v-for="item in menuItems" :key="item.title" :to="item.path" link>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
                <div class="d-flex">
                    <LanguageSelector/>
                </div>
            </v-list>
        </v-navigation-drawer>
        <v-fab-transition>
            <v-btn v-if="isMobile" icon color="transparent" class="fab" @click="sidebar = !sidebar">
                <v-icon>mdi-menu</v-icon>
            </v-btn>
        </v-fab-transition>
    </div>
    <v-app-bar v-else app flat height="100" :color="$vuetify.theme.current.colors.surface" class="navbar-with-border">
        <v-toolbar flat :color="$vuetify.theme.current.colors.surface">
            <v-toolbar-title>
                <v-col cols="4">
                    <div @click="goToHome" tag="span" style="cursor: pointer">
                        <v-row align="center">
                            <v-col cols="8" class="pa-0 mt-0"><v-img :height="80" :src="theme.global.current.value.dark?'/images/PPA_Logo.png':'/images/PPA_Logo.png'"></v-img></v-col>
                            <v-col cols="4" class="pa-0 ma-0">
                                <h2 translate="no">Proprietary</h2>
                                <h2 translate="no">Planters Alliance</h2>
                            </v-col>
                        </v-row>
                    </div>
                </v-col>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="nav-items">
                <v-btn flat v-for="item in menuItems.slice(0, 6)" :key="item.title" :to="item.path" class="nav-link">{{ item.title }}</v-btn>
                <div class="d-flex align-center mx-2">
                    <v-btn @click="goToRegister">Join PPA</v-btn>
                </div>
                <div class="d-flex align-center mx-2">
                    <v-btn @click="goToAdmin">Log In</v-btn>
                </div>
                <div class="d-flex align-center mx-2">
                    <v-btn icon @click="toggleTheme" class="theme-toggle-btn">
                        <v-icon>{{ isDarkTheme ? 'mdi-white-balance-sunny' : 'mdi-moon-waning-crescent' }}</v-icon>
                    </v-btn>
                </div>

                <!-- <div class="d-flex align-center mx-3">
                    <v-text-field v-model="search" placeholder="Search" hide-details density="comfortable" prepend-inner-icon="mdi-magnify" variant="solo-filled" class="search-bar" :bg-color="$vuetify.theme.current.colors.secondary"></v-text-field>
                </div> -->
                <v-btn flat v-for="item in menuItems.slice(6)" :key="item.title" :to="item.path" class="nav-link">{{ item.title }}</v-btn>
                <div class="d-flex align-center mx-3">
                    <LanguageSelector/>
                </div>
            </v-toolbar-items>
        </v-toolbar>
    </v-app-bar>
</template>

<script setup>
import { useDisplay, useTheme } from 'vuetify';
import { ref, computed } from "vue";
import { useRouter } from 'vue-router';
import LanguageSelector from './LanguageSelector.vue';
const config = useRuntimeConfig();
const { mobile } = useDisplay();
const isMobile = computed(() => mobile.value);
const router = useRouter();
const theme = useTheme();
const sidebar = ref(false);
const search = ref('');
const isDarkTheme = computed(() => theme.global.current.value.dark);
const toggleTheme = () => {
    const newTheme = isDarkTheme.value ? 'light' : 'dark';
    theme.global.name.value = newTheme;
    localStorage.setItem('theme', newTheme);
};

const menuItems = ref([
    { title: 'Home', path: '/', icon: 'mdi-home' },
    { title: 'About us', path: '/aboutus', icon: 'mdi-home' },
    { title: 'Announcements', path: '/announcements', icon: 'mdi-bell' },
    { title: 'Products', path: '/products', icon: 'mdi-leaf' },
    // { title: 'Membership', path: '/membership', icon: 'mdi-account' },
    { title: 'Contact us', path: '/contactus', icon: 'mdi-phone' },
]);
const goToHome = () => {
    router.push('/');
};
const goToAdmin = () => {
    window.open(config.public.adminAppUrl, '_blank')
};
const goToRegister = () => {
    window.open(config.public.registerUrl, '_blank')
};
</script>

<style scoped>
.fab {
    position: fixed;
    top: 10px;
    left: 10px;
    z-index: 100;
}

.navbar-with-border {
    border-bottom: 2px solid rgb(var(--v-theme-hero-arrow-bg)) !important;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
}

.nav-items .nav-link {
    color: rgb(var(--v-theme-navtext)) !important;
    margin: 0 12px;
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
</style>