<template>
  <section class="services-showcase">
    <v-container class="py-12">
      <div class="text-center mx-auto mb-10">
        <div class="section-title">
          <div class="divider-line">
            <span class="subtitle">Best Recommended Services</span>
            <h2 class="main-title">Popular Services we offer for all</h2>
          </div>
        </div>
        <p class="lead">
          Explore our most trusted agricultural products and services designed to support farmers,
          businesses, and communities. From high-quality crops to sustainable solutions, we bring
          you the best to grow, trade, and thrive.
        </p>
      </div>
      <v-row align="stretch" dense class="mt-6">
        <v-col v-for="(svc, i) in itemsToRender" :key="i" cols="12" sm="6" md="6" lg="3" class="d-flex">
          <div class="svc-card">
            <div class="svc-media">
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
        <v-btn color="primary" variant="outlined" size="large" class="see-more-btn">
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
const props = defineProps<{ items?: ServiceItem[] }>()
useTheme()
const localItems: ServiceItem[] = [
  {
    title: 'Business Registration & Legal Services',
    description:
      'We provide comprehensive business registration and legal services to help you establish and grow your business.',
    image: '/images/services/service-1.png',
  },
  {
    title: 'Agricultural Consultancy',
    description:
      'We offer expert agricultural consultancy services to help farmers and businesses optimize their operations and achieve sustainable growth.',
    image: '/images/services/service-2.png',
  },
  {
    title: 'Value Added Services',
    description:
      'We provide a range of value-added services to enhance the quality and marketability of agricultural products.',
    image: '/images/services/service-3.png',
  },
  {
    title: 'Export & Trade Facilitation',
    description:
      'We assist businesses in navigating the complexities of export and trade, ensuring smooth and efficient transactions across borders.',
    image: '/images/services/service-4.png',
  },
]
const itemsToRender = computed(() => (props.items?.length ? props.items : localItems))
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
  font-family: "Dancing Script", cursive;
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
  left: 16px; right: 16px; bottom: 16px;
  padding: 16px;
  border-radius: 14px;
  backdrop-filter: blur(6px);
  background: rgba(0, 0, 0, 0.28);
  color: #fff;
}
.svc-title { margin: 0 0 6px 0; font-size: clamp(16px, 2.4vw, 18px); font-weight: 700; }
.svc-desc  { margin: 0; font-size: clamp(12px, 2vw, 14px); line-height: 1.5; }
.svc-media::before,
.svc-media::after { content: none !important; display: none !important; }
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
