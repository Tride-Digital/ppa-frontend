<template>
  <div class="card-slider-container">
    <div class="slider-header">
      <h2 class="slider-subtitle">Proprietary Planters Alliance For You</h2>
      <h1 class="slider-title">Modern Technologies</h1>
    </div>
    <div class="slider-controls">
      <div class="cards-wrapper" ref="wrapper">
        <button class="nav-button nav-button-prev" @click="prev" :disabled="isTransitioning">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <div class="cards-container" ref="track" :class="{ transitioning: isTransitioning }" :style="{ transform: `translateX(-${offsetPx}px)` }" @transitionend="onTransitionEnd" @mouseenter="pauseAutoPlay" @mouseleave="resumeAutoPlay">
          <div class="card" :class="{ active: normalizedIndex === cards.length - 1 }">
            <img :src="cards[cards.length - 1].image" :alt="cards[cards.length - 1].alt" class="card-image" />
          </div>
          <div v-for="(card, index) in cards" :key="`real-${index}`" class="card" :class="{ active: normalizedIndex === index }">
            <img :src="card.image" :alt="card.alt" class="card-image" />
          </div>
          <div class="card" :class="{ active: normalizedIndex === 0 }">
            <img :src="cards[0].image" :alt="cards[0].alt" class="card-image" />
          </div>
        </div>
        <button class="nav-button nav-button-next" @click="next" :disabled="isTransitioning">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
    <div class="navigation-dots">
      <button v-for="(card, i) in cards" :key="`dot-${i}`" class="dot" :class="{ active: normalizedIndex === i }" @click="goToRealIndex(i)"></button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModernCardSlider',
  data() {
    return {
      currentIndex: 1,
      isTransitioning: false,
      autoPlayInterval: null,
      slideSize: 420,
      wrapperWidth: 0,
      gapPx: 15,
      isPaused: false,
      cards: [
        { image: '/images/modern-technologies/m1.jpg?w=500&h=400&fit=crop', alt: 'Agricultural drone technology' },
        { image: '/images/modern-technologies/m2.jpg?w=500&h=400&fit=crop', alt: 'Hydroponic farming system' },
        { image: '/images/modern-technologies/m3.jpg?w=500&h=400&fit=crop', alt: 'Smart agriculture monitoring' },
        { image: '/images/modern-technologies/m4.jpg?w=500&h=400&fit=crop', alt: 'Precision crop spraying' },
        { image: '/images/modern-technologies/m5.jpg?w=500&h=400&fit=crop', alt: 'Modern farming equipment' }
      ]
    }
  },
  computed: {
    normalizedIndex() {
      const n = this.cards.length
      if (this.currentIndex === 0) return n - 1
      if (this.currentIndex === n + 1) return 0
      return this.currentIndex - 1
    },
    
    offsetPx() {
      const slideLeft = this.currentIndex * this.slideSize
      const centerPad = Math.max(0, (this.wrapperWidth - (this.slideSize - this.gapPx)) / 2)
      return Math.max(0, slideLeft - centerPad)
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.measure()
      this.startAutoPlay()
    })
    window.addEventListener('resize', this.handleResize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
    this.clearAutoPlay()
  },
  methods: {
    next() {
      if (this.isTransitioning) return
      this.isTransitioning = true
      this.currentIndex += 1
      this.restartAutoPlay()
    },
    prev() {
      if (this.isTransitioning) return
      this.isTransitioning = true
      this.currentIndex -= 1
      this.restartAutoPlay()
    },
    goToRealIndex(i) {
      if (this.isTransitioning) return
      this.isTransitioning = true
      this.currentIndex = i + 1
      this.restartAutoPlay()
    },
    onTransitionEnd() {
      const n = this.cards.length
      if (this.currentIndex === 0) {
        this.isTransitioning = false
        this.currentIndex = n
        this.$nextTick(() => {
          void this.$refs.track?.offsetHeight
        })
      } else if (this.currentIndex === n + 1) {
        this.isTransitioning = false
        this.currentIndex = 1
        this.$nextTick(() => {
          void this.$refs.track?.offsetHeight
        })
      } else {
        this.isTransitioning = false
      }
    },
    startAutoPlay() {
      this.clearAutoPlay()
      this.autoPlayInterval = setInterval(() => {
        if (!this.isPaused && !this.isTransitioning) {
          this.next()
        }
      }, 3000)
    },
    clearAutoPlay() {
      if (this.autoPlayInterval) {
        clearInterval(this.autoPlayInterval)
        this.autoPlayInterval = null
      }
    },
    pauseAutoPlay() {
      this.isPaused = true
    },
    resumeAutoPlay() {
      this.isPaused = false
    },
    restartAutoPlay() {
      this.startAutoPlay()
    },
    handleResize() {
      clearTimeout(this.resizeTimeout)
      this.resizeTimeout = setTimeout(() => {
        this.measure()
      }, 100)
    },
    measure() {
      if (!this.$refs.wrapper) return
      this.wrapperWidth = this.$refs.wrapper.clientWidth || 0
      const firstCardEl = this.$el.querySelector('.card')
      if (!firstCardEl) return
      const cardRect = firstCardEl.getBoundingClientRect()
      const containerStyle = this.$refs.track ? window.getComputedStyle(this.$refs.track) : null
      const gap = containerStyle ? parseFloat(containerStyle.gap || containerStyle.columnGap || '32') : 32
      this.gapPx = isNaN(gap) ? 32 : gap
      this.slideSize = Math.round(cardRect.width + this.gapPx)
    }
  }
}
</script>

<style scoped>
.card-slider-container {
  width: 100%;
  max-width: 1700px;
  margin: 0 auto;
  padding: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
.slider-header {
  text-align: center;
  margin-bottom: 32px;
}
.slider-subtitle {
  padding: 0 14px;
  font-family: "Dancing Script", cursive;
  font-size: 22px;
  color: #2e7d32;
  margin-bottom: 8px;
}
.slider-title {
  font-size: 2.8rem;
  color: #1e293b;
  font-weight: 700;
  margin: 0;
}
.slider-controls {
  position: relative;
  width: 100%;
}
.cards-wrapper {
  overflow: hidden;
  width: 100%;
  position: relative;
  cursor: grab;
}
.cards-wrapper:active {
  cursor: grabbing;
}
.cards-container {
  display: flex;
  gap: 2rem;
  padding: 1.5rem 0;
  will-change: transform;
  transform: translateZ(0);
}
.cards-container.transitioning {
  transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.card {
  flex: 0 0 400px;
  height: 340px;
  border-radius: 1.25rem;
  overflow: hidden;
  box-shadow: 0 8px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 10px -2px rgba(0, 0, 0, 0.05);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transform: scale(0.88);
  opacity: 0.6;
  position: relative;
}
.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1));
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: 1;
}
.card.active {
  transform: scale(1);
  opacity: 1;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 10px 20px -5px rgba(0, 0, 0, 0.1);
}
.card.active::before {
  opacity: 1;
}
.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.card:hover .card-image {
  transform: scale(1.08);
}
.navigation-dots {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2.5rem;
}
.dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  background-color: #cbd5e1;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
}
.dot::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 0;
  height: 0;
  background-color: rgba(16, 185, 129, 0.3);
  border-radius: 50%;
  transition: all 0.3s ease;
}
.dot:hover {
  background-color: #94a3b8;
  transform: scale(1.2);
}
.dot:hover::before {
  width: 24px;
  height: 24px;
}
.dot.active {
  background-color: #10b981;
  transform: scale(1.3);
}
.dot.active::before {
  width: 28px;
  height: 28px;
  background-color: rgba(16, 185, 129, 0.2);
}
.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.95);
  color: #1e293b;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  backdrop-filter: blur(10px);
}
.nav-button:hover {
  background: rgba(255, 255, 255, 1);
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}
.nav-button:active {
  transform: translateY(-50%) scale(0.95);
}
.nav-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: translateY(-50%) scale(1);
}
.nav-button-prev {
  left: 20px;
}
.nav-button-next {
  right: 20px;
}
.nav-button svg {
  transition: transform 0.2s ease;
}
.nav-button:hover svg {
  transform: scale(1.1);
}
@media (max-width: 1024px) {
  .card {
    flex: 0 0 320px;
    height: 240px;
  }
}
@media (max-width: 768px) {
  .card-slider-container {
    padding: 1.5rem;
  }
  .slider-title {
    font-size: 2.2rem;
  }
  .card {
    flex: 0 0 280px;
    height: 210px;
  }
  .cards-container {
    gap: 1.5rem;
  }
  .nav-button {
    width: 40px;
    height: 40px;
  }
  .nav-button-prev {
    left: 10px;
  }
  .nav-button-next {
    right: 10px;
  }
}
@media (max-width: 480px) {
  .card-slider-container {
    padding: 1rem;
  }
  .slider-title {
    font-size: 1.8rem;
  }
  .card {
    flex: 0 0 260px;
    height: 190px;
  }
  .cards-container {
    gap: 1rem;
  }
  .nav-button {
    width: 36px;
    height: 36px;
  }
  .nav-button-prev {
    left: 5px;
  }
  .nav-button-next {
    right: 5px;
  }
}
</style>