<template>
  <section class="testimonials">
    <div class="container">
      <p class="eyebrow">Proprietary Planters Alliance</p>

      <div class="learn-more-wrapper">
        <p class="learn-more-text">
          <a :href="learnMoreUrl" class="learn-more-link">Learn More >>></a>
        </p>
      </div>
      
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

      <div class="contact-link-wrapper">
        <p class="contact-text">
          Have questions or want to know more? 
          <a :href="contactUsUrl" class="contact-link">Contact Us</a>
        </p>
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
  learnMoreUrl?: string
  contactUsUrl?: string
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
const learnMoreUrl = computed(() => props.learnMoreUrl ?? '/aboutus')
const contactUsUrl = computed(() => props.contactUsUrl ?? '/contactus')
</script>

<style scoped>
.testimonials {
  padding: 32px 16px 48px;
  background: rgb(var(--v-theme-background));
}
.container {
  max-width: 1200px;
  margin: 0 auto;
}
.eyebrow {
  text-align: center;
  color: rgb(var(--v-theme-title-subtitle));
  font-size: 22px;
  margin: 0 0 6px;
}

/* Learn More Link */
.learn-more-wrapper {
  text-align: center;
  margin: 12px 0 24px;
}

.learn-more-text {
  color: rgb(var(--v-theme-vision-mission-text));
  font-size: 16px;
  margin: 0;
}

.learn-more-link {
  color: rgb(var(--v-theme-primary));
  text-decoration: none;
  font-weight: 600;
  position: relative;
  transition: opacity 0.3s ease;
}

.learn-more-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background: rgb(var(--v-theme-primary));
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.learn-more-link:hover {
  opacity: 0.8;
}

.learn-more-link:hover::after {
  transform: scaleX(1);
}

.title {
  text-align: center;
  font-size: clamp(24px, 3vw, 40px);
  color: rgb(var(--v-theme-vision-mission-title));
  margin: 0 0 48px;
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

/* Contact Us Link */
.contact-link-wrapper {
  text-align: center;
  margin-top: 32px;
}

.contact-text {
  color: rgb(var(--v-theme-vision-mission-text));
  font-size: 16px;
  margin: 0;
}

.contact-link {
  color: rgb(var(--v-theme-primary));
  text-decoration: none;
  font-weight: 600;
  position: relative;
  transition: opacity 0.3s ease;
}

.contact-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background: rgb(var(--v-theme-primary));
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.contact-link:hover {
  opacity: 0.8;
}

.contact-link:hover::after {
  transform: scaleX(1);
}
</style>
