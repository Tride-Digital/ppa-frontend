<template>
  <div class="homepage">
    <HeroSection />
    <ClientOnly>
      <RotateCoverflow />
    </ClientOnly>
    <AboutSection />
    <VisionMission/>
    <ProductSection />
    <AnnouncementSection />
  </div>
</template>

<script setup>
import HeroSection from '~/components/HeroSection.vue'
import RotateCoverflow from '~/components/RotateCoverflow.vue'
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
