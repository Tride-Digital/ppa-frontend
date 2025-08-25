<template>
  <div class="homepage">
    <HeroSection />
    <ClientOnly>
      <RotateCoverflow />
    </ClientOnly>
    <ModernTechnologies />
    <StateCountSection />
    <ServicesShowcase />
    <VisionMission/>
  </div>
</template>

<script setup>
import HeroSection from '~/components/HeroSection.vue'
import RotateCoverflow from '~/components/RotateCoverflow.vue'
import VisionMission from '~/components/VisionMission.vue'
import ModernTechnologies from '~/components/ModernTechnologies.vue'
import StateCountSection from '~/components/StateCountSection.vue'
import ServicesShowcase from '~/components/ServicesShowcase.vue'
</script>

<style scoped>
.homepage {
  min-height: 100vh;
}
</style>
