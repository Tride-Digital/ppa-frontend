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
        :pagination="pagination"
        :speed="5000"
        :initial-slide="middleIndex"
        aria-label="Destinations slider"
        >
        <SwiperSlide v-for="(item, i) in items" :key="i">
            <article class="destination-box">
            <div class="destination-img">
                <img
                :src="item.image"
                :alt="item.title"
                loading="lazy"
                decoding="async"
                />
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
import { EffectCoverflow, Navigation, Pagination, A11y } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { computed } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    default: () => [
      { title: 'PROCESS 1', subtitle: 'Process 1-description', image: '/images/products/tea.webp' },
      { title: 'PROCESS 2', subtitle: 'Process 2-description', image: '/images/products/rubber.webp' },
      { title: 'PROCESS 3', subtitle: 'Process 3-description', image: '/images/products/coconuts.webp' },
      { title: 'PROCESS 4', subtitle: 'Process 4-description', image: '/images/products/cinnamon.webp' },
      { title: 'PROCESS 5', subtitle: 'Process 5-description', image: '/images/products/coffee.webp' },
      { title: 'PROCESS 6', subtitle: 'Process 6-description', image: '/images/products/cloves.webp' },
      { title: 'PROCESS 7', subtitle: 'Process 7-description', image: '/images/products/cardamom.webp' },
      { title: 'PROCESS 8', subtitle: 'Process 8-description', image: '/images/products/black_pepper.webp' },
    ]
  },
  loop: { type: Boolean, default: false },
  navigation: { type: [Boolean, Object], default: true },
  pagination: { type: [Boolean, Object], default: () => ({ clickable: true }) },
  spaceBetween: { type: Number, default: 24 },
  showTitle: { type: Boolean, default: true },
  subtitleText: { type: String, default: 'Our Process' },
  titleText: { type: String, default: 'Value Addition Process' }
})

const modules = [EffectCoverflow, Navigation, Pagination, A11y]

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
</script>

<style scoped>
.section-title {
  text-align: center;
  margin-bottom: 28px;
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
  background: linear-gradient(to right, transparent, #61b96b 40%, #61b96b 60%, transparent);
  width: 100%;
  transform: translateY(-50%);
  z-index: -1;
}
.gutter-mask{
  padding: 0 100px;
  overflow: hidden;
}
.subtitle {
  padding: 0 14px;
  font-family: "Dancing Script", cursive;
  font-size: 20px;
  color: #2e7d32;
  background: #fff;
}
.main-title {
  padding: 0 14px;
  font-size: 32px;
  font-weight: 800;
  color: #0f2e37;
  background: #fff;
}
.destination-slider-wrap { 
    position: relative;
    margin: 50px 100px;
 }
.destination-swiper { overflow: visible; }
.destination-swiper :deep(.swiper) { 
    overflow: visible;
 }
.destination-swiper :deep(.swiper-slide) {
  width: 280px;
  transition: transform .35s ease, filter .35s ease, opacity .35s ease;
}
@media (min-width: 768px) {
  .destination-swiper :deep(.swiper-slide) { width: 320px; }
}
@media (min-width: 1200px) {
  .destination-swiper :deep(.swiper-slide) { width: 360px; }
}

.destination-box { border-radius: 22px; overflow: hidden; }
.destination-img { position: relative; border-radius: 22px; overflow: hidden; }
.destination-img img {
  display: block;
  width: 100%;
  height: 420px;   
  object-fit: cover;
  border-radius: 22px;
  box-shadow: 0 14px 32px rgba(0,0,0,.18);
}
.destination-content {
  position: absolute; left: 0; right: 0; bottom: 0;
  padding: 18px;
  color: #fff;
  background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.45) 40%, rgba(0,0,0,.75) 100%);
}
.box-title { margin: 0; font-weight: 700; }
.destination-subtitle { opacity: 0.9; font-size: 14px; }
.destination-swiper :deep(.swiper-slide:not(.swiper-slide-active)) {
  filter: blur(4px) brightness(0.78);
  transform: scale(0.92);
  opacity: 0.95;
}
.destination-swiper :deep(.swiper-slide-prev),
.destination-swiper :deep(.swiper-slide-next){
  filter: blur(6px) brightness(0.72);
  transform: scale(0.9);
}
.destination-swiper :deep(.swiper-slide-active) {
  filter: none;
  transform: scale(1);
  opacity: 1;
  z-index: 2;
}
</style>
