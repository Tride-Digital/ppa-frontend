<template>
  <section class="hero-section">
    <div class="hero-slider">
      <v-carousel v-model="currentSlide" cycle interval="4000" hide-delimiter-background hide-delimiters show-arrows="hover" height="100vh">
        <v-carousel-item v-for="(image, index) in heroImages" :key="index" :src="image.url" cover></v-carousel-item>
      </v-carousel>
    </div>
    <div class="hero-overlay">
      <v-container class="hero-content">
        <v-row align="center" justify="center" class="fill-height">
          <v-col cols="12" md="8" lg="6" class="text-center">
            <h1 class="hero-title mb-6">{{ message }}</h1>
            <div class="hero-buttons">
              <v-btn color="primary" size="large" class="me-4 mb-3" to="/aboutus">Learn More</v-btn>
              <v-btn variant="outlined" color="white" size="large" class="mb-3">Join PPA</v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
  message: {
    type: String,
    default: 'Empowering Private Plantation Growers for a Sustainable Future'
  },
})
const currentSlide = ref(0)
const heroImages = ref([
  {
    url: '/images/cover/cover1.webp',
    alt: 'cover image 1'
  },
  {
    url: '/images/cover/cover2.webp',
    alt: 'cover image 2'
  },
  {
    url: '/images/cover/cover3.webp',
    alt: 'cover image 3'
  },
  {
    url: '/images/cover/cover4.webp',
    alt: 'cover image 4'
  },
  {
    url: '/images/cover/cover5.webp',
    alt: 'cover image 5'
  }
])
</script>

<style scoped>
.hero-section {
  height: 100vh;
  position: relative;
  overflow: hidden;
}
.hero-slider {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(var(--v-theme-hero-overlay), var(--v-theme-hero-overlay));
  display: flex;
  align-items: center;
  z-index: 2;
}
.hero-content {
  height: 100%;
  display: flex;
  align-items: center;
}
.hero-title {
  font-size: 3rem;
  font-weight: 100;
  color: rgb(var(--v-theme-on-primary));
  text-shadow: 2px 2px 4px var(--v-theme-hero-text-shadow);
  line-height: 1.2;
}
.hero-buttons {
  margin-top: 3rem;
}
:deep(.v-carousel) {
  height: 100vh
}
:deep(.v-carousel__item) {
  height: 100vh
}
:deep(.v-carousel .v-btn--icon) {
  background-color: var(--v-theme-hero-arrow-bg);
  backdrop-filter: blur(10px);
}
:deep(.v-carousel .v-btn--icon:hover) {
  background-color: var(--v-theme-hero-arrow-bg-hover);
}
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  .hero-buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .hero-buttons .v-btn {
    width: 300px;
  }
}
@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }
}
</style>
