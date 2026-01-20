<template>
  <v-container class="fill-height" max-width="900">
    <v-col align="center" justify="center">
      <h1>{{ message }}</h1>
      <div class="my-16 py-16"></div>
      <h2>{{ discriptiption }}</h2>
      <div class="my-16 py-16"></div>
    </v-col>
  </v-container>
 
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  message: {
    type: String,
    default: 'Sign Up'
  },
  discriptiption: {
    type: String,
    default: 'Currently under development. Please check back soon!'
  },
})
</script>

<style scoped>
</style>
