<template>
  <section class="destination-slider-wrap">
    <div v-if="showTitle" class="section-title">
      <div class="divider-line">
        <span class="subtitle">{{ subtitleText }}</span>
        <h2 class="main-title">{{ titleText }}</h2>
      </div>
    </div>
    <div class="gutter-mask">
      <Swiper
        class="destination-swiper"
        :modules="modules"
        effect="coverflow"
        :centered-slides="true"
        :grab-cursor="true"
        :watch-slides-progress="true"
        :slides-per-view="'auto'"
        :space-between="-100"
        :loop="true"
        :coverflow-effect="coverflowEffect"
        :autoplay="autoplayConfig"
        :speed="1000"
        :initial-slide="middleIndex"
        aria-label="Destinations slider"
        @swiper="onSwiper"
        @progress="onProgress"
      >
        <SwiperSlide v-for="(item, i) in items" :key="i">
          <article class="destination-box">
            <div class="destination-img">
              <img :src="item.image" :alt="item.title" loading="lazy" decoding="async"/>
              <div class="destination-content">
                <div class="media-left">
                  <h4 class="box-title title">{{ item.title }}</h4>
                  <span class="destination-subtitle trip_count">{{ item.subtitle }}</span>
                </div>
              </div>
            </div>
          </article>
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { EffectCoverflow, Navigation, A11y, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'
import { computed, ref } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    default: () => [
      { title: 'Pepper Processing', subtitle: 'Berries are harvested, sun-dried, and graded into black, white, or ground pepper for export.', image: '/images/value-addition/v1.webp' },
      { title: 'Coconut Oil Extraction', subtitle: 'Coconut kernels are dried, pressed, and refined into pure oil used in cooking, cosmetics, and wellness products.', image: '/images/value-addition/v2.webp' },
      { title: 'Cashew Processing', subtitle: 'Raw cashew nuts are steamed, shelled, peeled, and roasted to produce high-quality kernels for snacks, confectionery, and exports.', image: '/images/value-addition/v3.webp' },
      { title: 'Cinnamon Processing', subtitle: 'Cinnamon bark is peeled, dried, and rolled into quills or ground into powder for culinary and medicinal use.', image: '/images/value-addition/v4.webp' },
      { title: 'Coffee Processing', subtitle: 'Harvested beans are fermented, dried, roasted, and ground to produce high-quality coffee for local and global markets.', image: '/images/value-addition/v5.webp' },
      { title: 'Tea Processing', subtitle: 'Freshly plucked leaves are withered, rolled, fermented, dried, and packed to enhance flavor, aroma, and market value.', image: '/images/value-addition/v6.webp' },
      { title: 'Mace Processing', subtitle: 'The bright red aril covering nutmeg seeds is carefully dried and ground into flakes or powder, valued as a premium spice and flavoring agent.', image: '/images/value-addition/v7.webp' },
      { title: 'Clove Processing', subtitle: 'Clove buds are handpicked, sun-dried, and processed into spice or essential oil for food and pharmaceuticals.', image: '/images/value-addition/v8.webp' },
      ]
  },
  navigation: { type: [Boolean, Object], default: true },
  showTitle: { type: Boolean, default: true },
  subtitleText: { type: String, default: 'Our Products' },
  titleText: { type: String, default: 'Value Addition Process' }
})
const modules = [EffectCoverflow, Navigation, A11y, Autoplay]
const autoplayConfig = {
  delay: 3000,
  disableOnInteraction: false,
  pauseOnMouseEnter: true
}
const coverflowEffect = {
  rotate: 0,
  stretch: 0,
  depth: 180,
  modifier: 1,
  slideShadows: false
}
const middleIndex = computed(() => {
  const len = props.items?.length ?? 1
  return Math.floor(len / 2)
})
const swiperRef = ref(null)
const onSwiper = (swiper) => {
  swiperRef.value = swiper
  requestAnimationFrame(() => applyFiveVisible(swiper))
}
const onProgress = (swiper) => {
  applyFiveVisible(swiper)
}
function applyFiveVisible(swiper){
  if (!swiper?.slides) return
  swiper.slides.forEach((slideEl) => {
    const p = Math.abs(slideEl.progress ?? 99)
    const hide = p > 2
    slideEl.style.opacity = hide ? '0' : ''
    slideEl.style.pointerEvents = hide ? 'none' : ''
    slideEl.style.willChange = 'transform, opacity'
  })
}
</script>

<style scoped>
.section-title {
  text-align: center;
  margin-bottom: 30px;
}
@media (min-width: 768px) {
  .section-title { margin-bottom: 50px; }
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
  font-size: 18px;
  color: rgb(var(--v-theme-title-subtitle));
}
@media (min-width: 768px) {
  .subtitle { font-size: 20px; }
}
.main-title {
  padding: 0 14px;
  font-size: 24px;
  font-weight: 800;
  color: rgb(var(--v-theme-title-main));
}
@media (min-width: 768px) {
  .main-title { font-size: 32px; }
}
.destination-slider-wrap { 
  position: relative;
  margin: 20px 10px;
}
@media (min-width: 768px) {
  .destination-slider-wrap { margin: 50px 50px; }
}
@media (min-width: 1200px) {
  .destination-slider-wrap { margin: 50px 100px; }
}
.gutter-mask{
  padding: 0 20px;
  overflow: hidden;
}
@media (min-width: 768px) {
  .gutter-mask { padding: 0 100px; }
}
@media (min-width: 1200px) {
  .gutter-mask { padding: 0 220px; }
}
.destination-swiper { overflow: visible; }
.destination-swiper :deep(.swiper) { overflow: visible; }
.destination-swiper :deep(.swiper-slide) {
  width: 280px;
  transition: transform 0.05s ease, filter 0.05s ease, opacity 0.05s ease;
}
@media (min-width: 768px) {
  .destination-swiper :deep(.swiper-slide) { width: 360px; }
}
@media (min-width: 1200px) {
  .destination-swiper :deep(.swiper-slide) { width: 380px; }
}
.destination-box { border-radius: 22px; overflow: hidden; }
.destination-img { position: relative; border-radius: 22px; overflow: hidden; }
.destination-img img{
  display: block;
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 22px;
  box-shadow: 0 14px 32px var(--v-theme-card-shadow);
}
@media (min-width: 768px) {
  .destination-img img { height: 580px; }
}
.destination-content {
  position: absolute; left: 0; right: 0; bottom: 0;
  padding: 12px;
  color: #fff;
  background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.45) 40%, rgba(0,0,0,.75) 100%);
}
@media (min-width: 768px) {
  .destination-content { padding: 18px; }
}
.box-title { 
  margin: 0; 
  font-weight: 700; 
  font-size: 16px;
}
@media (min-width: 768px) {
  .box-title { font-size: 18px; }
}
.destination-subtitle { 
  opacity: 0.9; 
  font-size: 12px;
  line-height: 1.4;
}
@media (min-width: 768px) {
  .destination-subtitle { font-size: 14px; }
}
.destination-swiper :deep(.swiper-slide:not(.swiper-slide-active)) {
  filter: blur(2px) brightness(0.85);
  transform: scale(0.95);
  opacity: 0.95;
}
@media (min-width: 768px) {
  .destination-swiper :deep(.swiper-slide:not(.swiper-slide-active)) {
    filter: blur(4px) brightness(0.78);
    transform: scale(0.92);
  }
}
.destination-swiper :deep(.swiper-slide-prev),
.destination-swiper :deep(.swiper-slide-next){
  filter: blur(3px) brightness(0.80);
  transform: scale(0.93);
}
@media (min-width: 768px) {
  .destination-swiper :deep(.swiper-slide-prev),
  .destination-swiper :deep(.swiper-slide-next){
    filter: blur(6px) brightness(0.72);
    transform: scale(0.90);
  }
}
.destination-swiper :deep(.swiper-slide-active) {
  filter: none;
  transform: scale(1);
  opacity: 1;
  z-index: 2;
}
</style>