<template>
  <section class="hero-section">
    <div class="hero-slider">
      <VueFlux ref="vueflux" :options="options" :rscs="rscs" :transitions="transitions" class="vue-flux-container" @mounted="onFluxMounted" @transition-start="onTransitionStart" @transition-end="onTransitionEnd">
        <template #controls="c"><FluxControls v-bind="c" /></template>
        <template #pagination="p"></template>
      </VueFlux>
    </div>
    <div class="navigation-buttons">
      <v-btn @click="showPrevious" class="nav-btn nav-btn-prev" icon size="large" variant="text">
        <v-icon size="32" color="white">mdi-chevron-left</v-icon>
      </v-btn>
      <v-btn @click="showNext" class="nav-btn nav-btn-next" icon size="large" variant="text">
        <v-icon size="32" color="white">mdi-chevron-right</v-icon>
      </v-btn>
    </div>
    <div class="hero-overlay">
      <v-container class="hero-content">
        <v-row align="center" justify="center" class="fill-height">
          <v-col cols="12" md="10" lg="9" xl="8" class="text-center">
            <div class="hero-copy-stage">
              <Transition name="hero-copy" :duration="{ enter: uiEnterMs, leave: uiLeaveMs }" appear>
                <div :key="activeKey" class="hero-copy-slab"
                  :style="{
                    '--enterMs': uiEnterMs + 'ms',
                    '--leaveMs': uiLeaveMs + 'ms',
                    '--leaveDelay': leaveDelay + 'ms',
                    '--travelY': travelY
                  }"
                >
                  <h1 class="hero-title mb-6">{{ activeSlide.title }} </h1>
                </div>
              </Transition>
              <div class="hero-buttons-fixed">
                <v-btn color="primary" size="large" class="me-4 mb-3" to="/aboutus">Learn More</v-btn>
                <v-btn color="white" size="large" class="mb-3" to="/providerselector">Join PPA</v-btn>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, shallowReactive, computed, onMounted, onUnmounted } from 'vue'
import { VueFlux, FluxPreloader, FluxControls, FluxPagination, Img, Fade } from 'vue-flux'
import 'vue-flux/style.css'

const vueflux = ref(null)
const isTransitioning = ref(false)
const autoplayTimer = ref(null)
const isManualNavigation = ref(false)

const slidesMeta = [
  { title: 'Empowering Proprietary Planters (PP)', learnLabel: 'Join PPA', learnTo: '/aboutus', joinLabel: 'Join PPA' },
  { title: 'Together, we are shaping plantations into profitable, sustainable, and globally competitive enterprises.', learnLabel: 'Learn More', learnTo: '/aboutus', joinLabel: 'Join PPA' },
  { title: 'From Tea to Cinnamon to Rubber: Innovation That Adds Value', learnLabel: 'Learn More', learnTo: '/aboutus', joinLabel: 'Join PPA' },
  { title: 'Sustainable Practices for Future Generations', learnLabel: 'Learn More', learnTo: '/aboutus', joinLabel: 'Join PPA' },
  { title: 'Empowering Agriculture for International Markets', learnLabel: 'Learn More', learnTo: '/aboutus', joinLabel: 'Join PPA' },
]

const options = reactive({
  allowFullscreen: true,
  allowToSkipTransition: true,
  autohideTime: 1000,
  autoplay: false,
  bindKeys: true,
  delay: 2000,
  enableGestures: true,
  infinite: true,
  lazyLoad: false,
  transitionDuration: 1000,
})

const uiEnterMs  = computed(() => options.transitionDuration) 
const uiLeaveMs  = 800
const travelY    = '5px'
const leaveDelay = 0
const currentIndex = ref(0)
const pendingIndex = ref(null)
const startAutoplay = () => {
  if (autoplayTimer.value) {
    clearInterval(autoplayTimer.value)
  }
  autoplayTimer.value = setInterval(() => {
    if (!isTransitioning.value && !isManualNavigation.value) {
      showNext(true)
    }
  }, options.delay)
}
const stopAutoplay = () => {
  if (autoplayTimer.value) {
    clearInterval(autoplayTimer.value)
    autoplayTimer.value = null
  }
}
const onFluxMounted = () => {
  startAutoplay()
}
const onTransitionStart = () => {
  isTransitioning.value = true
  if (typeof pendingIndex.value === 'number') {
    currentIndex.value = pendingIndex.value
    pendingIndex.value = null
  } else {
    currentIndex.value = (currentIndex.value + 1) % rscs.length
  }
}
const onTransitionEnd = () => { 
  isTransitioning.value = false
  if (isManualNavigation.value) {
    isManualNavigation.value = false
    setTimeout(() => {
      if (!isManualNavigation.value) {
        startAutoplay()
      }
    }, 1000)
  }
}
const showNext = (isAuto = false) => {
  if (vueflux.value) {
    if (!isAuto) {
      isManualNavigation.value = true
      stopAutoplay()
    }
    if (isTransitioning.value && !isAuto && options.allowToSkipTransition) {
      vueflux.value.skipTransition?.() || vueflux.value.stop()
    }
    pendingIndex.value = (currentIndex.value + 1) % rscs.length
    vueflux.value.show('next')
  }
}
const showPrevious = () => {
  if (vueflux.value) {
    isManualNavigation.value = true
    stopAutoplay()
    if (isTransitioning.value && options.allowToSkipTransition) {
      vueflux.value.skipTransition?.() || vueflux.value.stop()
    }
    pendingIndex.value = currentIndex.value === 0 ? rscs.length - 1 : currentIndex.value - 1
    vueflux.value.show('prev')
  }
}
const rscs = shallowReactive([
  new Img('/images/cover/cover23.png'),
  new Img('/images/cover/cover29.png'),
  new Img('/images/cover/cover30.png'),
  new Img('/images/cover/cover27.png'),
  new Img('/images/cover/cover28.png'),
])
const transitions = shallowReactive([
  { component: Fade, options: { totalDuration: 3000, easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' } },
])
const activeSlide = computed(() => slidesMeta[currentIndex.value % slidesMeta.length])
const activeKey   = computed(() => `copy-${currentIndex.value}`)
onUnmounted(() => {
  stopAutoplay()
})
onMounted(() => {
  const handleVisibilityChange = () => {
    if (document.hidden) {
      stopAutoplay()
    } else if (!isManualNavigation.value) {
      startAutoplay()
    }
  }
  document.addEventListener('visibilitychange', handleVisibilityChange)
  onUnmounted(() => {
    document.removeEventListener('visibilitychange', handleVisibilityChange)
  })
})
</script>

<style scoped>
.hero-section { height: 100vh; position: relative; overflow: hidden; background: transparent; }
.hero-slider  { position: absolute; inset: 0; z-index: 1; }
.vue-flux-container { width: 100%; height: 100vh; background: transparent; }
.navigation-buttons {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 20px; z-index: 3; pointer-events: none;
}
.nav-btn {
  pointer-events: auto;
  background: rgba(0,0,0,.3) !important;
  backdrop-filter: blur(10px);
  border-radius: 50% !important;
  width: 60px !important; height: 60px !important;
  transition: all .3s ease; opacity: .8;
  border: 1px solid rgba(255,255,255,.2);
}
.nav-btn:hover { background: rgba(0,0,0,.5) !important; opacity: 1; transform: scale(1.1); border-color: rgba(255,255,255,.4); }
.hero-overlay { position: absolute; inset: 0; background: transparent; display: flex; align-items: center; z-index: 2; }
.hero-content { height: 100%; display: flex; align-items: center; }
.hero-title {
  font-size: 3rem; font-weight: 100; color: #fff;
  text-shadow: 2px 2px 8px rgba(0,0,0,.7);
  line-height: 1.2;
  margin-bottom: 0;
}
.hero-buttons { margin-top: 10rem; }
.hero-buttons-fixed {
  margin-top: 0;
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  padding-top: 20px;
}
:deep(.flux-controls), :deep(.flux-pagination) { display: none !important; }
:deep(.vue-flux *), .hero-copy-stage, .hero-copy-slab, .hero-title, .hero-buttons {
  -webkit-backface-visibility: hidden; backface-visibility: hidden;
  transform: translateZ(0); will-change: transform, opacity;
}
.hero-copy-stage {
  position: relative;
  min-height: clamp(140px, 24vh, 260px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 120px;
  max-width: 90vw;
  margin: 0 auto;
}
.hero-copy-slab {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 120px;
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  justify-content: center;
  padding-inline: 12px;
}
.hero-copy-enter-from,
.hero-copy-leave-to { opacity: 0; }
.hero-copy-enter-from { transform: translate3d(0, var(--travelY, 44px), 0); }
.hero-copy-leave-to   { transform: translate3d(0, calc(var(--travelY, 44px) * -1), 0); }
.hero-copy-enter-active {
  transition:
    opacity  var(--enterMs, 3000ms) cubic-bezier(0.16, 1, 0.3, 1),
    transform var(--enterMs, 3000ms) cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: var(--leaveMs, 400ms);
}
.hero-copy-leave-active {
  transition:
    opacity var(--leaveMs, 400ms) cubic-bezier(0.4, 0, 0.2, 1),
    transform var(--leaveMs, 400ms) cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: 0ms;
}
@media (prefers-reduced-motion: reduce) {
  .hero-copy-enter-active, .hero-copy-leave-active { transition-duration: 1ms !important; }
}
@media (max-width: 768px) {
  .hero-title { 
    font-size: 2.2rem; 
    line-height: 1.25;
  }
  .hero-copy-stage { 
    padding-bottom: 180px;
    max-width: 95vw;
  }
  .hero-copy-slab { bottom: 210px; }
  .hero-buttons, .hero-buttons-fixed { 
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    gap: 12px;
  }
  .hero-buttons-fixed {
    bottom: -40px;
  }
  .hero-buttons .v-btn, .hero-buttons-fixed .v-btn { 
    width: 280px; 
    margin: 0 !important;
  }
  .nav-btn { width: 50px !important; height: 50px !important; }
  .navigation-buttons { padding: 0 15px; }
}
@media (max-width: 480px) {
  .hero-title { 
    font-size: 1.8rem; 
    line-height: 1.3;
    padding: 0 10px;
  }
  .hero-copy-stage { 
    padding-bottom: 200px;
    max-width: 100vw;
    padding-inline: 20px;
  }
  .hero-copy-slab { bottom: 230px; }
  .hero-buttons-fixed {
    padding-top: 15px;
    bottom: -50px;
  }
  .hero-buttons .v-btn, .hero-buttons-fixed .v-btn { 
    width: 260px;
    font-size: 0.9rem;
  }
  .nav-btn { width: 45px !important; height: 45px !important; }
  .navigation-buttons { padding: 0 10px; }
}
@media (max-width: 360px) {
  .hero-title { 
    font-size: 1.6rem; 
    line-height: 1.4;
    padding: 0 15px;
  }
  .hero-copy-stage { 
    padding-bottom: 220px;
    max-width: 100vw;
    padding-inline: 15px;
  }
  .hero-copy-slab { bottom: 250px; }
  .hero-buttons-fixed { 
    width: 240px;
    font-size: 0.85rem;
    bottom: -60px;
  }
}
</style>