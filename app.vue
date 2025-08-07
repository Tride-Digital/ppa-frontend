<template>
  <GoogleTranslate />
  <v-app >
      <AppNavBar />
    <v-main>
        <NuxtPage />
    </v-main>

     <AppFooter />
  </v-app>
</template>

<script setup>
import AppNavBar from '~/components/AppNavBar.vue';
import AppFooter from '~/components/AppFooter.vue';
</script>

<style scoped>
/* Optional: Add some scoped styles for the layout if needed */
</style>
