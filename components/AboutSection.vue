<template>
  <section class="about-section py-8">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" class="text-center mb-6">
          <h2 class="section-title">About us</h2>
        </v-col>
        <v-col cols="12" md="10" lg="8">
          <div class="about-content">
            <div v-if="pending" class="text-center">Loading...</div>
            <div v-else-if="error" class="text-center">Failed to load content.</div>
            <div v-else v-html="content"></div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup>
import { useStaticContent } from '~/composables/useStaticContent';

const { content, pending, error } = useStaticContent('About');
</script>

<style scoped>
.about-section {
  background-color: rgb(var(--v-theme-background));
}
.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: rgb(var(--v-theme-section-title));
}
.about-content {
  text-align: justify;
}
.about-text {
  font-size: 1.1rem;
  line-height: 1.8;
  color: rgb(var(--v-theme-about-text));
}
</style>
