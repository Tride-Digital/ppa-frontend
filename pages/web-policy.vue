<template>
  <v-container class="fill-height" max-width="900">
    <v-col align="center" justify="center">
      <h1>{{ message }}</h1>
      <div class="my-16 py-16"></div>
      <h2>{{ description }}</h2>
      <div class="my-16 py-16"></div>
    </v-col>
  </v-container>
</template>

<script setup>
const message = 'Web Policy'
const description = 'Currently under development. Please check back soon!'
</script>

<style scoped>
</style>
