<template>
  <!-- <v-container class="fill-height" max-width="900">
    <v-col align="center" justify="center">
      <h1>{{ message }}</h1>
     
      <h2>{{ discriptiption }}</h2>
    </v-col>
  </v-container> -->
  <div class="coming-soon">
    <div class="content">
      <h1>We're Growing Something Awesome 🌱</h1>
      <p>This site is currently under development. Please check back soon!</p>
    </div>
  </div>
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
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}
.coming-soon {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 100vh;   /* full viewport height */
  width: 100vw;        /* full viewport width */
  background: linear-gradient(135deg, #d0f4de, #fdfcdc);
  font-family: 'Segoe UI', sans-serif;
  color: #215732;
  padding: 2rem;
  box-sizing: border-box;
}

.content {
  max-width: 500px;
}

.logo {
  width: 100px;
  margin-bottom: 20px;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #38761d;
}

p {
  font-size: 1.2rem;
  color: #444;
}
</style>
