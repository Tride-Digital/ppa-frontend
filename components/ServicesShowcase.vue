<!-- components/ServicesShowcase.vue -->
<template>
  <section class="services-showcase">
    <v-container class="py-12">
      <div class="text-center mx-auto max-w-3xl mb-10">
        <div class="section-title">
          <div class="divider-line">
            <span class="subtitle">Best Recommended Services</span>
            <h2 class="main-title">Popular Services we offer for all</h2>
          </div>
        </div>
        <p class="lead">
          Explore our most trusted agricultural products and services designed to support farmers,
          businesses, and communities. From high‑quality crops to sustainable solutions, we bring
          you the best to grow, trade, and thrive.
        </p>
      </div>
      <v-row align="stretch" dense class="mt-6">
        <v-col
          v-for="(svc, i) in itemsToRender" :key="i" cols="12" md="6" lg="3" class="d-flex">
          <div class="svc-card flex-grow-1">
            <img :src="svc.image" class="svc-img" :alt="svc.title"/>
          </div>
        </v-col>
      </v-row>
      <div class="text-end mt-4">
        <v-btn color="primary" variant="outlined" size="large" class="see-more-btn" @click="">
            See More
            <v-icon end>mdi-arrow-right</v-icon>
        </v-btn>
      </div>
    </v-container>
  </section>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify'

type ServiceItem = {
  title: string
  description: string
  image: string
  href?: string
}
const props = defineProps<{
  items?: ServiceItem[]
}>()
const theme = useTheme()
const localItems: ServiceItem[] = [
  {
    title: 'Services 1',
    description:
      'Explore our most trusted agricultural products and services designed to support farmers, businesses, and communities.',
    image: '/images/services/service-1.png',
  },
  {
    title: 'Services 2',
    description:
      'Explore our most trusted agricultural products and services designed to support farmers, businesses, and communities.',
    image: '/images/services/service-2.png',
  },
  {
    title: 'Services 3',
    description:
      'Explore our most trusted agricultural products and services designed to support farmers, businesses, and communities.',
    image: '/images/services/service-3.png',
  },
  {
    title: 'Services 4',
    description:
      'Explore our most trusted agricultural products and services designed to support farmers, businesses, and communities.',
    image: '/images/services/service-4.png',
  },
]
const itemsToRender = computed(() => props.items?.length ? props.items : localItems)
</script>

<style scoped>
.services-showcase {
  background: var(--v-theme-background);
  color: var(--v-theme-on-background);
}

.section-title {
  text-align: center;
  margin-bottom: 20px;
}

.divider-line {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  position: relative;
  width: min(980px, 100%);
  margin: 0 auto;
}

.divider-line::before,
.divider-line::after {
  content: "";
  position: absolute;
  top: 50%;
  height: 2px;
  background: linear-gradient(to right, transparent, rgb(var(--v-theme-divider-line)) 40%, rgb(var(--v-theme-divider-line)) 60%, transparent);
  width: 100%;
  transform: translateY(-50%);
  z-index: -1;
}

.subtitle {
  padding: 0 14px;
  font-family: "Dancing Script", cursive;
  font-size: 20px;
  color: rgb(var(--v-theme-title-subtitle));
}

.lead {
  padding: 0 480px;;
}

.main-title {
  padding: 0 14px;
  font-size: 32px;
  font-weight: 800;
  color: rgb(var(--v-theme-title-main));
}

.svc-card {
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
  background: var(--v-theme-surface);
  transition: transform 0.2s ease-in-out;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.svc-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}
.svc-img {
  width: 100%;
  height: 280px;
  object-fit: cover;
}
.see-more-btn {
  font-weight: 600;
  text-transform: none;
  border-radius: 8px;
  transition: all 0.3s ease;
}
.see-more-btn:hover {
  transform: translateX(4px);
}
</style>