<template>
  <div class="homepage">
    <HeroSection />
    <ClientOnly>
      <RotateCoverflow />
    </ClientOnly>
    <ModernTechnologies />
    <VisionMission/>
  </div>
</template>

<script setup>
import HeroSection from '~/components/HeroSection.vue'
import RotateCoverflow from '~/components/RotateCoverflow.vue'
import VisionMission from '~/components/VisionMission.vue'
import ModernTechnologies from '~/components/ModernTechnologies.vue'
</script>

<style scoped>
.homepage {
  min-height: 100vh;
}
</style>
