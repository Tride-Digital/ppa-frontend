<template>
  <section class="about-section py-8">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" class="text-center mb-8">
          <h2 class="section-title">About us</h2>
        </v-col>
        <v-col cols="12" md="10" lg="8">
          <div class="about-content">
            <p class="about-text mb-4" v-html="aboutParagraph1"></p>
            <p class="about-text mb-4">{{ aboutParagraph2 }}</p>
            <p class="about-text">{{ aboutParagraph3 }}</p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup>
import { ref } from "vue";
const aboutParagraph1 = ref(
  'The <span translate="no"> Proprietary Planters Alliance (Pvt) Ltd (PPA) </span> is Sri Lanka’s pioneering private‐sector catalyst for transforming privately owned plantations into high‐value, future‐ready enterprises. Since the Land Reform Act, proprietary planters who owned their property had no common platform to represent them nationally – a gap left unresolved for 52 years, until 2025. PPA bridges this gap, representing all proprietary planters at the highest level while driving GDP growth through value‐chain excellence and human resource management to secure a sustainable competitive advantage for their products and services.'
);
const aboutParagraph2 = ref(
  "We unite visionary growers, Agri‐innovators, and investors across tea, rubber, coconut, spices, fruits, timber, agroforestry, and any perennial commercial crop. From field to finished product, we deliver integrated solutions in productivity, climate resilience, processing, branding, and export competitiveness."
);

const aboutParagraph3 = ref(
  "Whether you seek investment partnerships or full project execution, do not hesitate to contact us on any activity pertaining to plantation‐related issues. Together, we create wealth, jobs, and a smarter Agri‐future."
);
</script>

<style scoped>
.about-section {
  background-color: rgb(var(--v-theme-background));
}
.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: rgb(var(--v-theme-section-title));
  margin-bottom: 2rem;
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
