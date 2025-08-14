<template>
  <div class="homepage">
    <HeroSection />
    <AboutSection />
    <VisionMission/>
    <ProductSection />
    <AnnouncementSection />
  </div>
</template>

<script setup>
import HeroSection from '~/components/HeroSection.vue'
import ProductSection from '~/components/ProductSection.vue'
import AboutSection from '~/components/AboutSection.vue'
import AnnouncementSection from '~/components/AnnouncementSection.vue'
import VisionMission from '~/components/VisionMission.vue'
</script>

<style scoped>
.homepage {
  min-height: 100vh;
}
</style>
