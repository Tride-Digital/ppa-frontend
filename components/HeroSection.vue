<template>
  <section class="hero-section">
    <div class="hero-slider">
      <VueFlux ref="vueflux" :options="options" :rscs="rscs" :transitions="transitions" class="vue-flux-container" @mounted="onFluxMounted" @transition-start="onTransitionStart" @transition-end="onTransitionEnd">
        <template #preloader="p"><FluxPreloader v-bind="p" /></template>
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
          <v-col cols="12" md="8" lg="6" class="text-center">
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

                  <div class="hero-buttons">
                    <v-btn color="primary" size="large" class="me-4 mb-3" :to="activeSlide.learnTo">
                      {{ activeSlide.learnLabel }}
                    </v-btn>

                    <v-btn @click="goToAdmin" variant="outlined" color="white" size="large" class="mb-3">
                      {{ activeSlide.joinLabel }}
                    </v-btn>
                  </div>
                </div>
              </Transition>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, shallowReactive, computed } from 'vue'
import { VueFlux, FluxPreloader, FluxControls, FluxPagination, Img, Kenburn } from 'vue-flux'
import 'vue-flux/style.css'

const config = useRuntimeConfig()
const vueflux = ref(null)
const isTransitioning = ref(false)

const slidesMeta = [
  { title: 'Empowering Proprietary Plantation Growers for a Sustainable Future', learnLabel: 'Learn More', learnTo: '/aboutus', joinLabel: 'Join PPA' },
  { title: 'Smart farming, export growth, and better livelihoods', learnLabel: 'Learn More', learnTo: '/aboutus', joinLabel: 'Join PPA' },
  { title: 'Tea • Cinnamon • Rubber — Value through innovation', learnLabel: 'Learn More', learnTo: '/aboutus', joinLabel: 'Join PPA' },
]

const options = reactive({
  allowFullscreen: true,
  allowToSkipTransition: true,
  autohideTime: 2500,
  autoplay: true,
  bindKeys: true,
  delay: 6000,
  enableGestures: true,
  infinite: true,
  lazyLoad: false,
  transitionDuration: 3000,
})

const uiEnterMs  = computed(() => options.transitionDuration) 
const uiLeaveMs  = 800
const travelY    = '300px'
const leaveDelay = 520
const currentIndex = ref(0)
const pendingIndex = ref(null)

defineProps({
  message: { type: String, default: 'Empowering Proprietary Plantation Growers for a Sustainable Future' },
})

const goToAdmin = () => window.open(config.public.adminAppUrl, '_blank')

const onFluxMounted = () => {}
const onTransitionStart = () => {
  isTransitioning.value = true
  if (typeof pendingIndex.value === 'number') {
    currentIndex.value = pendingIndex.value
    pendingIndex.value = null
  } else {
    currentIndex.value = (currentIndex.value + 1) % rscs.length
  }
}
const onTransitionEnd = () => { isTransitioning.value = false }

const showNext = () => {
  if (vueflux.value && !isTransitioning.value) {
    pendingIndex.value = (currentIndex.value + 1) % rscs.length
    vueflux.value.show('next')
  }
}
const showPrevious = () => {
  if (vueflux.value && !isTransitioning.value) {
    pendingIndex.value = currentIndex.value === 0 ? rscs.length - 1 : currentIndex.value - 1
    vueflux.value.show('prev')
  }
}

const rscs = shallowReactive([
  new Img('/images/cover/cover1.webp'),
  new Img('/images/cover/cover2.webp'),
  new Img('/images/cover/cover3.webp'),
  new Img('/images/cover/cover4.webp'),
  new Img('/images/cover/cover5.webp'),
])

const transitions = shallowReactive([
  { component: Kenburn, options: { totalDuration: 3000, easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' } },
])

const activeSlide = computed(() => slidesMeta[currentIndex.value % slidesMeta.length])
const activeKey   = computed(() => `copy-${currentIndex.value}`)
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
}
.hero-buttons { margin-top: 3rem; }

:deep(.flux-controls), :deep(.flux-pagination) { display: none !important; }

:deep(.vue-flux *), .hero-copy-stage, .hero-copy-slab, .hero-title, .hero-buttons {
  -webkit-backface-visibility: hidden; backface-visibility: hidden;
  transform: translateZ(0); will-change: transform, opacity;
}

.hero-copy-stage {
  position: relative;
  min-height: clamp(140px, 24vh, 260px);
}
.hero-copy-slab {
  position: absolute; inset: 0;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  padding-inline: 12px;
}

.hero-copy-enter-from,
.hero-copy-leave-to { opacity: 0; }

.hero-copy-enter-from { transform: translate3d(0, var(--travelY, 44px), 0); }
.hero-copy-leave-to   { transform: translate3d(0, 0, 0); }

.hero-copy-enter-active {
  transition:
    opacity  var(--enterMs, 3000ms) cubic-bezier(0.16, 1, 0.3, 1),
    transform var(--enterMs, 3000ms) cubic-bezier(0.16, 1, 0.3, 1);
}
.hero-copy-leave-active {
  transition:
    opacity var(--leaveMs, 800ms) cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: var(--leaveDelay, 520ms);
}

@media (prefers-reduced-motion: reduce) {
  .hero-copy-enter-active, .hero-copy-leave-active { transition-duration: 1ms !important; }
}

@media (max-width: 768px) {
  .hero-title { font-size: 2.5rem; }
  .hero-buttons { display: flex; flex-direction: column; align-items: center; }
  .hero-buttons .v-btn { width: 300px; }
  .nav-btn { width: 50px !important; height: 50px !important; }
  .navigation-buttons { padding: 0 15px; }
}
@media (max-width: 480px) {
  .hero-title { font-size: 2rem; }
  .nav-btn { width: 45px !important; height: 45px !important; }
  .navigation-buttons { padding: 0 10px; }
}
</style>
