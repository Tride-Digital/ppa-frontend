<template>
  <section  class="stats-hero" :style="{ '--bg-url': `url(${currentBackgroundUrl})` }" aria-label="Key stats over hero image" ref="sectionRef">
    <div class="stats-layer">
      <div v-for="(s, i) in stats" :key="i" class="stat" :style="posStyle(s)">
        <div class="ring outer"></div>
        <div class="ring inner"></div>
        <div class="circle">
          <div class="value" translate="no">
            <span v-if="getValuePrefix(s, i)" class="currency-prefix">{{ getValuePrefix(s, i) }}</span>{{ getAnimatedValueWithoutPrefix(s, i) }}
          </div>
          <div class="label">
            <div v-for="(line, j) in splitLabel(s.label)" :key="j">{{ line }}</div>
          </div>
        </div>
        <i class="accent-dot" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { 
  estateRegistrations, 
  serviceProviders, 
  siteVisitStats, 
  registeredRetainerClients,
  fetchUserAppStats, 
  fetchEstateStats, 
  fetchProviderStats, 
  fetchSiteVisitStats,
  fetchRegisteredRetainerClientsCount,
} = useStats()

const props = defineProps({
  backgroundUrl: { 
    type: [String, Array] as PropType<string | string[]>, 
    default: () => [
      '/images/state/state.png',
      '/images/state/state2.png',
      '/images/state/state3.webp'
    ]
  },
  autoChangeInterval: { type: Number, default: 5000 }, // 5 seconds
  size: { type: Number, default: 220 },
})

const formatCount = (num: number): string => {
  if (num >= 1000000) return `${Math.floor(num / 1000000)}M+`
  if (num >= 1000) return `${Math.floor(num / 1000)}K+`
  return `${num}+`
}

const stats = computed(() => {
  return [
    { value: formatCount(estateRegistrations.value.crop_stats.total_acres), label: 'Total Acres', x: 35, y: 25 },
    { value: formatCount(siteVisitStats.value.total_visits), label: 'Total Site\nVisits', x: 65, y: 25 },
    { value: formatCount(registeredRetainerClients.value), label: 'Registered Retainer\nClients', x: 20, y: 63 },
    { value: formatCount(estateRegistrations.value.crop_stats.distinct_crops_count), label: 'Agricultural\nCrops Grown', x: 50, y: 63 },
    { value: formatCount(serviceProviders.value.approved), label: 'Registered Service Providers', x: 80, y: 63 },
  ];
})

const sectionRef = ref<HTMLElement>()
const animatedValues = ref<number[]>([])
const hasAnimated = ref(false)
const currentBackgroundIndex = ref(0)
const currentBackgroundUrl = ref('')
const backgroundInterval = ref<NodeJS.Timeout | null>(null)
const initializeBackground = () => {
  if (Array.isArray(props.backgroundUrl)) {
    currentBackgroundUrl.value = props.backgroundUrl[0]
    startBackgroundRotation()
  } else {
    currentBackgroundUrl.value = props.backgroundUrl
  }
}
const startBackgroundRotation = () => {
  if (Array.isArray(props.backgroundUrl) && props.backgroundUrl.length > 1) {
    backgroundInterval.value = setInterval(() => {
      currentBackgroundIndex.value = (currentBackgroundIndex.value + 1) % props.backgroundUrl.length
      currentBackgroundUrl.value = props.backgroundUrl[currentBackgroundIndex.value]
    }, props.autoChangeInterval)
  }
}
const stopBackgroundRotation = () => {
  if (backgroundInterval.value) {
    clearInterval(backgroundInterval.value)
    backgroundInterval.value = null
  }
}
const parseValue = (value: string) => {
  const match = value.match(/([A-Z$]*)(\d+)(.*)/)
  if (match) {
    return {
      prefix: match[1],
      number: parseInt(match[2]),
      suffix: match[3]
    }
  }
  return { prefix: '', number: 0, suffix: '' }
}
onMounted(async () => {
  initializeBackground()

  const results = await Promise.allSettled([
    fetchUserAppStats(),
    fetchEstateStats(),
    fetchProviderStats(),
    fetchSiteVisitStats(),
    fetchRegisteredRetainerClientsCount(),
  ])

  results.forEach((r) => {
    if (r.status === "rejected") console.error("Stats fetch error:", r.reason)
  })

  animatedValues.value = new Array(stats.value.length).fill(0)
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated.value) {
          hasAnimated.value = true
          startAnimation()
        }
      })
    },
    {threshold: 0.3}
  )
  if (sectionRef.value) {
    observer.observe(sectionRef.value)
  }
  onUnmounted(() => {
    observer.disconnect()
    stopBackgroundRotation()
  })
})
watch(() => props.backgroundUrl, () => {
  stopBackgroundRotation()
  initializeBackground()
}, { deep: true })
const startAnimation = () => {
  stats.value.forEach((stat, index) => {
    const parsed = parseValue(stat.value)
    const targetValue = parsed.number
    const duration = 4000
    const startTime = Date.now()
    const delay = index * 200
    setTimeout(() => {
      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        animatedValues.value[index] = Math.floor(targetValue * easeOutQuart)
        if (progress < 1) requestAnimationFrame(animate)
        else animatedValues.value[index] = targetValue
      }
      requestAnimationFrame(animate)
    }, delay)
  })
}
const getAnimatedValue = (stat: { value: string }, index: number) => {
  const parsed = parseValue(stat.value)
  const currentValue = animatedValues.value[index] || 0
  return `${parsed.prefix}${currentValue}${parsed.suffix}`
}
const getValuePrefix = (stat: { value: string }, index: number) => {
  const parsed = parseValue(stat.value)
  return parsed.prefix
}
const getAnimatedValueWithoutPrefix = (stat: { value: string }, index: number) => {
  const parsed = parseValue(stat.value)
  const currentValue = animatedValues.value[index] || 0
  return `${currentValue}${parsed.suffix}`
}
function posStyle(s: { x: number; y: number }) {
  return {
    left: `${s.x}%`,
    top: `${s.y}%`,
  }
}
function splitLabel(label: string) {
  return label.split('\n')
}
</script>

<style scoped>
.stats-hero{
  position: relative;
  width: 100%;
  min-height: 400px;
  background-image: var(--bg-url);
  background-size: cover;
  background-position: center;
  display: grid;
  place-items: center;
  overflow: hidden;
  margin-top: 20px;
  margin-bottom: 20px;
  transition: background-image 0.8s ease-in-out;
}
@media (min-width: 768px) {
  .stats-hero {
    min-height: 680px;
    margin-top: 50px;
    margin-bottom: 50px;
  }
}
.stats-layer{
  position: relative;
  width: 100%;
  height: 100%;
}
.stat{
  position: absolute;
  transform: translate(-50%, -50%);
  width: var(--size);
  height: var(--size);
}
.circle{
  position: absolute;
  inset: 8px;
  border-radius: 9999px;
  background: rgb(var(--v-theme-secondary));
  color: rgb(var(--v-theme-on-secondary));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 10px;
  box-shadow: 0 6px 16px var(--v-theme-card-shadow, rgba(0,0,0,.15));
  animation: fadeInScale 0.6s ease-out backwards;
}
@media (min-width: 768px) {
  .circle {
    inset: 12px;
    padding: 18px;
    box-shadow: 0 10px 28px var(--v-theme-card-shadow, rgba(0,0,0,.15));
  }
}
.value{
  font-weight: 700;
  letter-spacing: .2px;
  font-size: 12px;
  line-height: 1.1;
  margin-bottom: 3px;
  transition: transform 0.1s ease;
}
.currency-prefix {
  font-size: 0.6em;
  opacity: 0.85;
}
@media (min-width: 400px) {
  .value { font-size: 14px; }
}
@media (min-width: 480px) {
  .value { font-size: 16px; margin-bottom: 4px; }
}
@media (min-width: 768px) {
  .value { font-size: clamp(24px, 3.4vw, 40px); margin-bottom: 6px; }
}
.label{
  font-size: 8px;
  opacity: .9;
  line-height: 1.1;
}
@media (min-width: 400px) {
  .label { font-size: 9px; }
}
@media (min-width: 480px) {
  .label { font-size: 10px; line-height: 1.2; }
}
@media (min-width: 768px) {
  .label { font-size: clamp(14px, 1.4vw, 20px); }
}
.ring{
  position: absolute;
  border-radius: 9999px;
  border: 1px solid transparent;
  animation: ringPulse 3s ease-in-out infinite;
}
@media (min-width: 768px) {
  .ring { border-width: 3px; }
}
.ring.outer{ 
  inset: -4px; 
  border-color: rgba(var(--v-theme-circle-ring), .48);
  animation-delay: 0s;
}
@media (min-width: 768px) {
  .ring.outer { inset: -10px; }
}
.ring.inner{ 
  inset: -8px; 
  border-color: rgba(var(--v-theme-circle-ring), .32);
  animation-delay: 0.5s;
}
@media (min-width: 768px) {
  .ring.inner { inset: -20px; }
}
.accent-dot{
  position: absolute;
  right: -3px;
  bottom: 22%;
  width: 6px; 
  height: 6px; 
  border-radius: 9999px;
  background: rgb(var(--v-theme-dot-active, var(--v-theme-success)));
  box-shadow: 0 0 0 2px rgba(var(--v-theme-dot-active, var(--v-theme-success)), .15);
  animation: dotPulse 2s ease-in-out infinite;
}
@media (min-width: 768px) {
  .accent-dot {
    right: -10px;
    width: 10px;
    height: 10px;
    box-shadow: 0 0 0 6px rgba(var(--v-theme-dot-active, var(--v-theme-success)), .15);
  }
}
@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes ringPulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.05);
  }
}
@keyframes dotPulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}
.stat{ --size: 100px; }
@media (min-width: 400px) { 
  .stat{ --size: 110px; } 
}
@media (min-width: 480px) { 
  .stat{ --size: 130px; } 
}
@media (min-width: 768px) { 
  .stat{ --size: 170px; } 
}
@media (min-width: 960px) { 
  .stat{ --size: 200px; } 
}
@media (min-width: 1280px) { 
  .stat{ --size: 200px; } 
}
@media (min-width: 1440px) { 
  .stat{ --size: 220px; } 
}
</style>
