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
        <div v-if="isPending" class="text-center">Loading...</div>
        <div v-else-if="isError" class="text-center">Failed to load content.</div>
        <template v-else>
          <div class="cards">
            <article v-for="(t, i) in twoOnly" :key="i" class="card">
              <div class="namebar">
                <div>
                  <h3 class="name">{{ t.name }}</h3>
                  <p class="role">{{ t.role }}</p>
                </div>
              </div>
              <div class="text" v-html="t.text"></div>
            </article>
          </div>
        </template>
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
import { computed } from 'vue'
import { useStaticContent } from '~/composables/useStaticContent'

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
const fallback: Testimonial[] = []
const visionStore = useStaticContent('Vision')
const missionStore = useStaticContent('Mission')

const isPending = computed(() => !!visionStore.pending.value || !!missionStore.pending.value)
const isError = computed(() => !!visionStore.error.value || !!missionStore.error.value)

const remoteItems = computed<Testimonial[]>(() => {
  const items: Testimonial[] = []
  const v = visionStore.data.value
  const m = missionStore.data.value
  if (v) {
    items.push({
      name: 'Vision',
      role: v.short_description ?? 'Vision',
      text: v.content ?? ''
    })
  }
  if (m) {
    items.push({
      name: 'Mission',
      role: m.short_description ?? 'Mission',
      text: m.content ?? ''
    })
  }
  return items
})
const twoOnly = computed(() => {
  if (props.items && props.items.length) return props.items.slice(0, 2)
  if (remoteItems.value.length) return remoteItems.value.slice(0, 2)
  return fallback
})
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
