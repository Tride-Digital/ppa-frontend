<template>
    <section class="about-section py-8">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" class="text-center mb-8">
            <h2 class="section-title">About us</h2>
          </v-col>
          <v-col cols="12" md="10" lg="8">
            <div class="about-content">
              <p class="about-text mb-4">{{ aboutParagraph1 }}</p>
              <p class="about-text">{{ aboutParagraph2 }}</p>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>
</template>

<script setup>
import { ref } from 'vue'
const aboutParagraph1 = ref(
  "The Proprietary Planters Alliance (Pvt) Ltd (PPA) is established under the Companies Act of Sri Lanka, No. 07 of 2007, as a membership-based private organization. It is a pioneering initiative aimed at organizing and empowering all perennial crop growers who own and manage more than 10 acres of land in Sri Lanka. These planters, though vital to the national economy, have historically lacked unified representation."
)
const aboutParagraph2 = ref(
  "PPA is created to bridge that gap-liaising between proprietary planters and government agencies, private sector institutions, and international bodies. It will ensure that its members have a voice in shaping agricultural policy, access to innovation, funding for productivity, and integration into global value chains."
)
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