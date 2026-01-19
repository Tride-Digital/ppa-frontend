<template>
  <section class="services-showcase">
    <v-container class="py-12">
      <div class="text-center mx-auto mb-10">
        <div class="section-title">
          <div class="divider-line">
            <span class="subtitle">{{ subtitle }}</span>
            <h2 class="main-title">{{ mainTitle }}</h2>
          </div>
        </div>
        <p class="lead">
          {{ lead }}
        </p>
      </div>
      <v-row align="stretch" dense class="mt-6">
        <v-col v-for="(svc, i) in itemsToRender" :key="i" cols="12" sm="6" md="6" lg="3" class="d-flex">
          <div class="svc-card">
            <div class="svc-media" @click="goToServiceCategory(svc.title)">
              <img :src="svc.image" class="svc-img" :alt="svc.title" />
              <div class="svc-overlay">
                <h3 class="svc-title">{{ svc.title }}</h3>
                <p class="svc-desc">{{ svc.description }}</p>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
      <div class="see-more-wrap mt-6">
        <v-btn color="primary-darken-1" variant="outlined" size="large" class="see-more-btn" @click="goToServices">
          See More
          <v-icon end>mdi-arrow-right</v-icon>
        </v-btn>
      </div>
    </v-container>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from 'vuetify'

type ServiceItem = {
  title: string
  description: string
  image: string
  href?: string
}
const props = defineProps<{ 
  items?: ServiceItem[]
  subtitle?: string
  mainTitle?: string
  lead?: string
}>()
useTheme()
const localItems: ServiceItem[] = [
{
    title: 'Plantation Advisory and Governance',
    description:
      'Strategic end-to-end guidance on estate planning, compliance, and governance to run each plantation as a professionally managed business unit.',
    image: '/images/services/service-1.png',
  },
  {
    title: 'HRM & Labour Transformation',
    description:
      'Modern HR, productivity, and welfare solutions that uplift estate workforces, reduce disputes, and align labour practices with national standards.',
    image: '/images/services/service-2.png',
  },
  {
    title: 'Agronomy & Soil Health Services',
    description:
      'Scientific crop and soil management, from fertilizer plans to replanting strategies, to maximize yields while protecting long-term land health.',
    image: '/images/services/service-3.png',
  },
  {
    title: 'Sustainability, ESG & Certification',
    description:
      'Roadmaps to meet global ESG expectations, secure certifications, and adopt climate-smart practices that protect both the environment and profitability.',
    image: '/images/services/service-4.png',
  },
]
const itemsToRender = computed(() => (props.items?.length ? props.items : localItems))
const subtitle = computed(() => props.subtitle || 'Featured Services')
const mainTitle = computed(() => props.mainTitle || 'Discover Services We Offer for Proprietary Planters')
const lead = computed(() => props.lead || 'These 28 services are organized into 7 key categories, which should be clearly displayed in the cards for easy navigation. Each category encompasses a range of specialized services designed to meet the diverse needs of our clients.')
function goToServices() {
  window.location.href = '/services'
}
function goToServiceCategory(serviceTitle: string) {
  const categoryMap: { [key: string]: number } = {
    'Plantation Advisory and Governance': 0,
    'HRM & Labour Transformation': 1,
    'Agronomy & Soil Health Services': 2,
    'Sustainability, ESG & Certification': 3
  }
  const categoryIndex = categoryMap[serviceTitle]
  if (categoryIndex !== undefined) {
    window.location.href = `/services?category=${categoryIndex}`
  } else {
    goToServices()
  }
}
</script>

<style scoped>
.services-showcase {
  background: var(--v-theme-background);
  color: var(--v-theme-on-background);
}
.section-title { text-align: center; margin-bottom: 12px; }
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
  background: linear-gradient(
    to right,
    transparent,
    rgb(var(--v-theme-divider-line)) 40%,
    rgb(var(--v-theme-divider-line)) 60%,
    transparent
  );
  width: 100%;
  transform: translateY(-50%);
  z-index: -1;
}
.subtitle {
  padding: 0 14px;
  font-size: clamp(16px, 2.3vw, 20px);
  color: rgb(var(--v-theme-title-subtitle));
}
.main-title {
  padding: 0 14px;
  font-size: clamp(22px, 3.2vw, 32px);
  font-weight: 800;
  line-height: 1.2;
  color: rgb(var(--v-theme-title-main));
}
.lead {
  max-width: 820px;
  margin: 12px auto 0;
  padding: 0 16px;
  font-size: clamp(14px, 2.2vw, 16px);
  line-height: 1.65;
}
@media (max-width: 480px) {
  .divider-line::before,
  .divider-line::after { display: none; }
}
.svc-card {
  width: 100%;
  display: block;
}
.svc-media {
  position: relative;
  aspect-ratio: 4 / 3;
  border-radius: 16px;
  overflow: hidden;
  background: var(--v-theme-surface);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform .2s ease-in-out, box-shadow .2s ease-in-out;
}
.svc-media:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(0,0,0,0.18);
}
.svc-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.svc-overlay {
  position: absolute;
  left: 12px; right: 12px; bottom: 8px;
  padding: clamp(8px, 1.6vw, 8px);
  border-radius: 14px;
  max-height: 60%;
  overflow: hidden;
  backdrop-filter: blur(2px);
  background: rgba(0, 0, 0, 0.28);
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 4px;
}
.svc-title {
  margin: 0;
  font-weight: 800;
  font-size: clamp(14px, 1.5vw, 15px);
  line-height: 1.25;
}
.svc-desc {
  margin: 0;
  font-size: clamp(13px, 1.2vw, 13px);
  line-height: 1.45;
}
@media (max-height: 250px) {
  .svc-title { font-size: 15px; }
  .svc-desc  { font-size: 13px; }
}
@media (max-height: 200px) {
  .svc-title { font-size: 15px; }
  .svc-desc  { font-size: 12px; }
}
.see-more-wrap { text-align: right; }
@media (max-width: 600px) { .see-more-wrap { text-align: center; } }
.see-more-btn {
  font-weight: 600;
  text-transform: none;
  border-radius: 10px;
  transition: transform .25s;
}
.see-more-btn:hover { transform: translateX(4px); }
</style>
