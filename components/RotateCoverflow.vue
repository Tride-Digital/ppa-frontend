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
        aria-label="Value addition processes slider"
        @swiper="onSwiper"
        @progress="onProgress"
      >
        <SwiperSlide
          v-for="(item, i) in items"
          :key="item.blogId ?? i"
        >
          <article class="destination-box" @click="handleItemClick(item)">
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

const { selectPost, getPostById } = useValueAdditionStore()

const props = defineProps({
  items: {
    type: Array,
    default: () => [
      { 
        title: 'Pepper Processing',
        subtitle: 'Freshly harvested berries are sun-dried and expertly graded into black, white, or ground pepper, ready for premium export markets.',
        image: '/images/value-addition/v1.webp',
        blogId: 101
      },
      { 
        title: 'Coconut Oil Extraction',
        subtitle: 'Kernels are dried, pressed, and refined into pure oil for food, beauty, and wellness markets.',
        image: '/images/value-addition/v2.webp',
        blogId: 102
      },
      { 
        title: 'Cashew Processing',
        subtitle: 'Raw cashew nuts are steamed, shelled, peeled, and roasted to produce high-quality kernels for snacks, confectionery, and exports.',
        image: '/images/value-addition/v3.webp',
        blogId: 103
      },
      { 
        title: 'Cinnamon Processing',
        subtitle: 'Bark is peeled, dried, and value-added into quills or powder, serving both culinary and medicinal markets.',
        image: '/images/value-addition/v4.webp',
        blogId: 104
      },
      { 
        title: 'Coffee Processing',
        subtitle: 'Harvested beans are carefully fermented, sun-dried, expertly roasted, and finely ground to craft premium coffee for both local and international markets.',
        image: '/images/value-addition/v5.webp',
        blogId: 105
      },
      { 
        title: 'Tea Processing',
        subtitle: 'Fresh green leaves move through withering, rolling, fermentation, and drying, before being graded and packed, creating higher flavor, aroma, and market value across the value chain.',
        image: '/images/value-addition/v6.webp',
        blogId: 106
      },
      { 
        title: 'Mace Processing',
        subtitle: 'The bright red aril covering nutmeg seeds is carefully dried and ground into flakes or powder, valued as a premium spice and flavoring agent.',
        image: '/images/value-addition/v7.webp',
        blogId: 107
      },
      { 
        title: 'Clove Processing',
        subtitle: 'Clove buds are handpicked, sun-dried, and processed into spice or essential oil for food and pharmaceuticals.',
        image: '/images/value-addition/v8.webp',
        blogId: 108
      },
      { 
        title: 'Turmeric Processing',
        subtitle: 'Fresh rhizomes are cleaned, boiled, sun-dried, and polished before being ground into vibrant powder, widely used in food, medicine, and cosmetics.',
        image: '/images/value-addition/v9.webp',
        blogId: 109
      },
    ]
  },
  navigation: { type: [Boolean, Object], default: true },
  showTitle: { type: Boolean, default: true },
  subtitleText: { type: String, default: 'Our Products' },        
  titleText:   { type: String, default: 'Value Addition Process' } 
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

const handleItemClick = async (item) => {
  if (item.blogId) {
    try {
      const blogPost = getPostById(item.blogId)
      if (blogPost) {
        selectPost(blogPost)
        await navigateTo(`/blog/value/${blogPost.id}`)
      } else {
        console.warn(`Value Addition blog post with ID ${item.blogId} not found`)
        await navigateTo('/blogs')
      }
    } catch (error) {
      console.error('Navigation error:', error)
      try {
        await navigateTo('/blogs')
      } catch (fallbackError) {
        console.error('Fallback navigation failed:', fallbackError)
      }
    }
  }
}

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
.destination-box { 
  border-radius: 22px; 
  overflow: hidden; 
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.destination-box:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}
.destination-img { position: relative; border-radius: 22px; overflow: hidden; }
.destination-img img{
  display: block;
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 22px;
  box-shadow: 0 14px 32px var(--v-theme-card-shadow);
  transition: transform 0.3s ease;
}
.destination-box:hover .destination-img img {
  transform: scale(1.05);
}
@media (min-width: 768px) {
  .destination-img img { height: 580px; }
}
.destination-content {
  position: absolute; left: 0; right: 0; bottom: 0;
  padding: 12px;
  color: #fff;
  background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.45) 40%, rgba(0,0,0,.80) 100%);
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
@media (min-width: 768px) {
  .destination-content { padding: 18px; }
}
.box-title { 
  margin: 0; 
  font-weight: 700; 
  font-size: 16px;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
}
@media (min-width: 768px) {
  .box-title { font-size: 18px; }
}
.destination-subtitle { 
  opacity: 0.95; 
  font-size: 12px;
  line-height: 1.4;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
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
