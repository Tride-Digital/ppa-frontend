<template>
  <v-container class="fill-height" max-width="900">
    <v-col align="center" justify="center">
      <h1>{{ message }}</h1>
     
      <h2>{{ discriptiption }}</h2>
    </v-col>
  </v-container>
 
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  message: {
    type: String,
    default: 'Hello, World!'
  },
  discriptiption: {
    type: String,
    default: 'Hello, World!'
  },
})
</script>

<style scoped>

</style>
