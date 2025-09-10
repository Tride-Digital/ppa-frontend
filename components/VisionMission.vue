<template>
  <section class="testimonials">
    <div class="container">
      <p class="eyebrow">Proprietary Planters Alliance</p>
      <h2 class="title">Vision & Mission</h2>
      <div class="cards">
        <article v-for="(t, i) in twoOnly" :key="i" class="card">
          <div class="namebar">
            <div>
              <h3 class="name">{{ t.name }}</h3>
              <p class="role">{{ t.role }}</p>
            </div>
          </div>
          <p class="text">{{ t.text }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify'

type Testimonial = {
  name: string
  role: string
  text: string
}
const props = defineProps<{
  items?: Testimonial[]
}>()
const theme = useTheme()
const fallback: Testimonial[] = [
  {
    name: 'Vision',
    role: 'To be sustainable and internationally competitive',
    text:
      'PPA Pvt Ltd aims to position itself as a globally recognized and environmentally responsible leader in the proprietary plantation sector, ensuring long-term viability and excellence in overall business performance.'
  },
  {
    name: 'Mission',
    role: 'Transform the proprietary plantation sector with innovation',
    text:
      'PPA Pvt Ltd transforms the proprietary plantation sector through innovation, advanced technologies, and value chain optimization. We modernize operations, boost productivity, and create higher value for stakeholders while promoting biodiversity, climate resilience, and green livelihoods. By continuously improving all production factors, PPA enables planters to achieve cost leadership, sustainable competitive advantage, and measurable economic, environmental, and social impact across Sri Lanka’s proprietary plantations.'
  }
]
const twoOnly = computed(() => (props.items?.slice(0, 2) ?? fallback))
</script>

<style scoped>
.testimonials {
  padding: 48px 16px 80px;
  background: rgb(var(--v-theme-background));
}
.container {
  max-width: 1200px;
  margin: 0 auto;
}
.eyebrow {
  text-align: center;
  color: rgb(var(--v-theme-vision-mission-eyebrow));
  font-family: ui-serif, Georgia, 'Times New Roman', Times, serif;
  font-size: 22px;
  margin: 0 0 6px;
}
.title {
  text-align: center;
  font-size: clamp(24px, 3vw, 40px);
  color: rgb(var(--v-theme-vision-mission-title));
  margin: 0 0 75px;
  font-weight: 800;
  letter-spacing: .2px;
}
.cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: 28px;
}
@media (min-width: 900px) {
  .cards { grid-template-columns: 1fr 1fr; }
}
.card {
  --header-overlap: 56px;
  position: relative;
  background: rgb(var(--v-theme-vision-mission-card-bg));
  padding: 24px 28px 32px;
  box-shadow: 0 6px 20px var(--v-theme-vision-mission-card-shadow);
  border-radius: 20px;
}
.namebar {
  position: relative;
  background: rgb(var(--v-theme-primary));
  color: rgb(var(--v-theme-text));
  padding: 18px 20px;
  border-radius: 8px;
  width: 62%;
  margin-top: calc(var(--header-overlap) * -1);
  margin-left: -28px;
  z-index: 1;
}
.name { margin: 0 0 8px; font-size: 20px; font-weight: 700; }
.role { margin: 0; opacity: .95; }
.text {
  margin: 24px 0 0;
  color: rgb(var(--v-theme-vision-mission-text));
  line-height: 1.75;
  font-size: 16px;
}
.card::after{
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 20px;
  pointer-events: none;
  box-shadow: 0 1px 0 var(--v-theme-vision-mission-card-highlight) inset;
  -webkit-mask: linear-gradient(#0000 0 var(--header-overlap), #000 var(--header-overlap) 100%);
          mask: linear-gradient(#0000 0 var(--header-overlap), #000 var(--header-overlap) 100%);
}
</style>
