<template>
  <!-- <v-container class="fill-height" max-width="900">
    <v-col align="center" justify="center">
      <h1>{{ message }}</h1>
     
      <h2>{{ discriptiption }}</h2>
    </v-col>
  </v-container> -->
  <v-container
    fluid
    class="coming-soon d-flex align-center justify-center text-center"
  >
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-img
          src="/images/PPA_Logo-removebg.png"
          alt="Logo"
          class="mb-6"
          max-width="100%"
          width="100%"
          aspect-ratio="2.5"
          contain
        ></v-img>

        <h1 class="display-1 font-weight-bold text-success">
          We're Growing Something Awesome 🌱
        </h1>

        <p class="text-body-1 text-grey-darken-1 mt-4">
          This site is currently under development. Please check back soon!
        </p>
      </v-col>
    </v-row>
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
.coming-soon {
  min-height: 100vh;
  background: linear-gradient(135deg, #d0f4de, #fdfcdc);
  padding: 2rem;
  box-sizing: border-box;
}
</style>
