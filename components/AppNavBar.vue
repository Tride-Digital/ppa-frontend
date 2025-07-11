<template>
    <div v-if="isMobile">
        <v-navigation-drawer v-model="sidebar" app>

            <v-list nav dense>
                <div @click="goToHome" tag="span" style="cursor: pointer">
                    <v-row align="center">
                        <v-col cols="4" class="pa-0 ma-0"><v-img :height="75" :src="theme.global.current.value.dark?'/images/PPA_Logo.png':'/images/PPA_Logo.png'"></v-img></v-col>
                        <v-col cols="8" class="pa-0 ma-0">
                            <h3>Proprietary</h3>
                            <h3>Planters Alliance</h3>
                        </v-col>
                    </v-row>

                </div>
                <v-divider class="my-6" :thickness="2"></v-divider>

                <v-list-item v-for="item in menuItems" :key="item.title" :to="item.path" link>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-fab-transition>
            <v-btn v-if="isMobile" icon color="transparent" class="fab" @click="sidebar = !sidebar">
                <v-icon>mdi-menu</v-icon>
            </v-btn>
        </v-fab-transition>
    </div>

    <v-app-bar v-else app fixed>
        <v-toolbar>
            <v-toolbar-title>
                <v-col cols="4">
                    <div @click="goToHome" tag="span" style="cursor: pointer">
                        <v-row align="center">
                            <v-col cols="4" class="pa-0 ma-0"><v-img :height="75" :src="theme.global.current.value.dark?'/images/PPA_Logo.png':'/images/PPA_Logo.png'"></v-img></v-col>
                            <v-col cols="4" class="pa-0 ma-0">
                                <h3>Proprietary</h3>
                                <h3>Planters Alliance</h3>
                            </v-col>
                        </v-row>

                    </div>
                </v-col>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-xs-only">
                <v-btn flat v-for="item in menuItems" :key="item.title" :to="item.path">
                    <!-- <v-icon left dark>{{ item.icon }}</v-icon> -->
                    {{ item.title }}
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>
    </v-app-bar>

</template>

<script setup>
import { useDisplay, useTheme } from 'vuetify';
import { ref, computed, watch } from "vue";
import { useRouter } from 'vue-router';


const { mobile } = useDisplay();
const isMobile = computed(() => mobile.value);

const router = useRouter();
const theme = useTheme()

const sidebar = ref(false);
const menuItems = ref([
    { title: 'Home', path: '/home', icon: 'mdi-home' },
    { title: 'Sign Up', path: '/signup', icon: 'face' },
    { title: 'Sign In', path: '/signin', icon: 'lock_open' }
])

const goToHome = () => {
    router.push('/');
}

// watch(sidebar, (newVal, oldVal) => {
//     if (newVal) {
//         moveToTop();
//     } else {
//         goBackTo();
//     }
// })

</script>
<style scoped>
.fab {
    position: fixed;
    top: 10px;
    left: 10px;
    z-index: 100;
}
</style>