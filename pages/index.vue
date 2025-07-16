<template>
  <div class="homepage">
    <HeroSection />
    <AboutSection />
    <ProductSection />
    <AnnouncementSection />
  </div>
</template>

<script setup>
import HeroSection from '~/components/HeroSection.vue'
import ProductSection from '~/components/ProductSection.vue'
import AboutSection from '~/components/AboutSection.vue'
import AnnouncementSection from '~/components/AnnouncementSection.vue'
</script>

<style scoped>
.homepage {
  min-height: 100vh;
}
</style>
