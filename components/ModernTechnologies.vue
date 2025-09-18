<template>
  <div class="card-slider-container">
    <div class="section-title">
      <div class="divider-line">
        <span class="subtitle">Proprietary Planters Alliance For You</span>
        <h2 class="main-title">Modern Technologies</h2>
      </div>
    </div>
    <div class="slider-controls">
      <div class="cards-wrapper" ref="wrapper">
        <button class="nav-button nav-button-prev" @click="prev" :disabled="isTransitioning">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <div class="cards-container" ref="track" :class="{ transitioning: isTransitioning }" :style="{ transform: `translateX(-${currentIndex * slideSize}px)` }" @transitionend="onTransitionEnd" @mouseenter="pauseAutoPlay" @mouseleave="resumeAutoPlay">
          <div v-for="(card, i) in preClones" :key="`pre-${i}`" class="card" @click="handleCardClick(cards[cards.length - preClones.length + i])">
            <img :src="card.image" :alt="card.alt" class="card-image" />
            <div class="card-overlay">
              <div class="card-content">
                <h3 class="card-title">{{ card.title }}</h3>
                <p class="card-description">{{ card.description }}</p>
                <div class="click-indicator">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span>Learn More</span>
                </div>
              </div>
            </div>
          </div>
          <div v-for="(card, index) in cards" :key="`real-${index}`" class="card" @click="handleCardClick(card)">
            <img :src="card.image" :alt="card.alt" class="card-image" />
            <div class="card-overlay">
              <div class="card-content">
                <h3 class="card-title">{{ card.title }}</h3>
                <p class="card-description">{{ card.description }}</p>
                <div class="click-indicator">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span>Learn More</span>
                </div>
              </div>
            </div>
          </div>
          <div v-for="(card, i) in postClones" :key="`post-${i}`" class="card" @click="handleCardClick(cards[i])">
            <img :src="card.image" :alt="card.alt" class="card-image" />
            <div class="card-overlay">
              <div class="card-content">
                <h3 class="card-title">{{ card.title }}</h3>
                <p class="card-description">{{ card.description }}</p>
                <div class="click-indicator">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span>Learn More</span>
                </div>
              </div>
            </div>
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
      currentIndex: 0,
      isTransitioning: false,
      autoPlayInterval: null,
      slideSize: 452,
      wrapperWidth: 0,
      gapPx: 32,
      perView: 1,
      isPaused: false,
      cards: [
        { 
          image: '/images/modern-technologies/m1.webp?w=500&h=400&fit=crop', 
          alt: 'SMART soil management sensors and IoT technology in plantation', 
          title: 'SMART Soil Technology',
          description: 'Advanced IoT sensors, real-time monitoring, and data analytics transform soil management for optimal crop performance.',
          blogId: 201 
        },
        { 
          image: '/images/modern-technologies/m2.webp?w=500&h=400&fit=crop', 
          alt: 'Solar-powered sustainable processing equipment and renewable energy systems', 
          title: 'Green Processing Equipment',
          description: 'Eco-friendly processing systems using renewable energy and bio-based alternatives for sustainable operations.',
          blogId: 202 
        },
        { 
          image: '/images/modern-technologies/m3.webp?w=500&h=400&fit=crop', 
          alt: 'Automated Ceylon tea processing machinery with precision control systems', 
          title: 'Automated Tea Systems',
          description: 'Climate-controlled chambers and precision automation ensure consistent Ceylon tea quality standards.',
          blogId: 203 
        },
        { 
          image: '/images/modern-technologies/m4.webp?w=500&h=400&fit=crop', 
          alt: 'Weather monitoring stations with climate resilience technology', 
          title: 'Climate Tech Systems',
          description: 'Advanced weather monitoring and automated response systems for climate challenge adaptation.',
          blogId: 204 
        },
        { 
          image: '/images/modern-technologies/m5.webp?w=500&h=400&fit=crop', 
          alt: 'Digital marketing dashboard with e-commerce and analytics platforms', 
          title: 'Digital Marketing Tech',
          description: 'E-commerce platforms, customer analytics, and automated marketing systems for global market reach.',
          blogId: 205 
        },
      ]
    }
  },
  computed: {
    normalizedIndex() {
      return (this.currentIndex - this.perView + this.cards.length) % this.cards.length;
    },
    preClones() {
      return this.cards.slice(-this.perView);
    },
    postClones() {
      return this.cards.slice(0, this.perView);
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.measure();
      this.currentIndex = this.perView;
      this.startAutoPlay();
    });
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
    this.clearAutoPlay();
  },
  methods: {
    async handleCardClick(card) {
      if (card && card.blogId) {
        try {
          const { getPostById } = useBlogData()
          const blogPost = getPostById(card.blogId)
          if (blogPost) {
            await this.$router.push(`/blogs/${blogPost.id}`)
          } else {
            console.warn(`Blog post with ID ${card.blogId} not found`)
            await this.$router.push('/blogs')
          }
        } catch (error) {
          console.error('Navigation error:', error)
          try {
            await this.$router.push('/blogs')
          } catch (fallbackError) {
            console.error('Fallback navigation failed:', fallbackError)
          }
        }
      }
    },
    next() {
      if (this.isTransitioning) return;
      this.isTransitioning = true;
      this.currentIndex += 1;
      this.restartAutoPlay();
    },
    prev() {
      if (this.isTransitioning) return;
      this.isTransitioning = true;
      this.currentIndex -= 1;
      this.restartAutoPlay();
    },
    goToRealIndex(i) {
      if (this.isTransitioning) return;
      this.isTransitioning = true;
      this.currentIndex = i + this.perView;
      this.restartAutoPlay();
    },
    onTransitionEnd(e) {
      if (e && e.propertyName && e.propertyName !== 'transform') return;
      const total = this.cards.length;
      const leftBound = this.perView;
      const rightBound = this.perView + total - 1;
      if (this.currentIndex > rightBound) {
        this.$refs.track.style.transition = 'none';
        this.currentIndex -= total;
        this.$nextTick(() => {
          void this.$refs.track.offsetHeight;
          this.$refs.track.style.transition = '';
          this.isTransitioning = false;
        });
      } else if (this.currentIndex < leftBound) {
        this.$refs.track.style.transition = 'none';
        this.currentIndex += total;
        this.$nextTick(() => {
          void this.$refs.track.offsetHeight;
          this.$refs.track.style.transition = '';
          this.isTransitioning = false;
        });
      } else {
        this.isTransitioning = false;
      }
    },
    startAutoPlay() {
      this.clearAutoPlay();
      this.autoPlayInterval = setInterval(() => {
        if (!this.isPaused && !this.isTransitioning) {
          this.next();
        }
      }, 2500);
    },
    clearAutoPlay() {
      if (this.autoPlayInterval) {
        clearInterval(this.autoPlayInterval);
        this.autoPlayInterval = null;
      }
    },
    pauseAutoPlay() { this.isPaused = true; },
    resumeAutoPlay() { this.isPaused = false; },
    restartAutoPlay() { this.startAutoPlay(); },
    handleResize() {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => {
        const prevReal = this.normalizedIndex;
        this.measure();
        this.currentIndex = prevReal + this.perView;
      }, 100);
    },
    measure() {
      if (!this.$refs.wrapper || !this.$refs.track) return;

      this.wrapperWidth = this.$refs.wrapper.clientWidth || 0;
      const csTrack = window.getComputedStyle(this.$refs.track);
      const gap = parseFloat(csTrack.gap || csTrack.columnGap || '32');
      this.gapPx = isNaN(gap) ? 32 : gap;
      const firstCard = this.$el.querySelector('.card');
      let cardWidth = 400;
      if (firstCard) {
        const csCard = window.getComputedStyle(firstCard);
        const fb = parseFloat(csCard.flexBasis);
        cardWidth = !isNaN(fb) && fb > 0 ? fb : firstCard.offsetWidth || 400;
      }
      this.perView = Math.max(1, Math.floor((this.wrapperWidth + this.gapPx) / (cardWidth + this.gapPx)));
      this.slideSize = Math.round(cardWidth + this.gapPx);
    }
  }
}
</script>

<style scoped>
.section-title {
  text-align: center;
  margin-bottom: 50px;
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
  font-size: 20px;
  color: rgb(var(--v-theme-title-subtitle));
}
.main-title {
  padding: 0 14px;
  font-size: 32px;
  font-weight: 800;
  color: rgb(var(--v-theme-title-main));
}

.card-slider-container {
  width: 100%;
  max-width: 1700px;
  margin: 0 auto;
  padding: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
.slider-controls { position: relative; width: 100%; }
.cards-wrapper { overflow: hidden; width: 100%; position: relative; cursor: grab; }
.cards-wrapper:active { cursor: grabbing; }
.cards-container {
  display: flex;
  gap: 2rem;
  padding: 1.5rem 0;
  will-change: transform;
  transform: translateZ(0);
  backface-visibility: hidden;
}
.cards-container.transitioning {
  transition: transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1);
}
.card {
  flex: 0 0 400px;
  height: 340px;
  border-radius: 1.25rem;
  overflow: hidden;
  box-shadow: 0 8px 25px -5px var(--v-theme-card-shadow), 0 4px 10px -2px var(--v-theme-card-shadow);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  cursor: pointer;
}
.card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 12px 35px -5px var(--v-theme-card-shadow), 0 6px 15px -2px var(--v-theme-card-shadow);
}
.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.card:hover .card-image { transform: scale(1.08); }

.card-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0.85) 100%);
  color: white;
  padding: 24px;
  transform: translateY(20px);
  opacity: 0;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.card:hover .card-overlay {
  transform: translateY(0);
  opacity: 1;
}
.card-title {
  font-size: 1.4rem;
  font-weight: 700;
  margin: 0 0 8px 0;
  line-height: 1.3;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
}
.card-description {
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0 0 16px 0;
  opacity: 0.95;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}
.click-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  opacity: 0.9;
  transition: all 0.3s ease;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.5));
}
.card:hover .click-indicator {
  opacity: 1;
  transform: translateX(5px);
}

.navigation-dots {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2.5rem;
}
.dot {
  width: 14px; height: 14px; border-radius: 50%; border: none; cursor: pointer;
  background-color: rgb(var(--v-theme-dot-inactive));
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
}
.dot::before {
  content: ''; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
  width: 0; height: 0; background-color: var(--v-theme-dot-hover-bg); border-radius: 50%;
  transition: all 0.3s ease;
}
.dot:hover { 
  background-color: rgb(var(--v-theme-dot-hover)); 
  transform: scale(1.2); 
}
.dot:hover::before { width: 24px; height: 24px; }
.dot.active { 
  background-color: rgb(var(--v-theme-dot-active)); 
  transform: scale(1.3); 
}
.dot.active::before { 
  width: 28px; 
  height: 28px; 
  background-color: var(--v-theme-dot-active-bg); 
}
.nav-button {
  position: absolute; top: 50%; transform: translateY(-50%); z-index: 10;
  width: 50px; height: 50px; border-radius: 50%; border: none;
  background: var(--v-theme-nav-button-bg); 
  color: rgb(var(--v-theme-nav-button-text)); 
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 4px 12px var(--v-theme-nav-button-shadow);
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  backdrop-filter: blur(10px);
}
.nav-button:hover { 
  background: var(--v-theme-nav-button-bg); 
  transform: translateY(-50%) scale(1.1); 
  box-shadow: 0 6px 20px var(--v-theme-nav-button-shadow-hover); 
}
.nav-button:active { transform: translateY(-50%) scale(0.95); }
.nav-button:disabled { opacity: 0.5; cursor: not-allowed; transform: translateY(-50%) scale(1); }
.nav-button-prev { left: 20px; }
.nav-button-next { right: 20px; }
.nav-button svg { transition: transform 0.2s ease; }
.nav-button:hover svg { transform: scale(1.1); }
@media (max-width: 1024px) {
  .card { flex: 0 0 320px; height: 240px; }
}
@media (max-width: 768px) {
  .card-slider-container { padding: 1.5rem; }
  .main-title { font-size: 2.2rem; }
  .card { flex: 0 0 280px; height: 210px; }
  .cards-container { gap: 1.5rem; }
  .nav-button { width: 40px; height: 40px; }
  .nav-button-prev { left: 10px; }
  .nav-button-next { right: 10px; }
  .card-overlay { padding: 16px; }
  .card-title { font-size: 1.2rem; }
  .card-description { font-size: 0.8rem; }
}
@media (max-width: 480px) {
  .card-slider-container { padding: 1rem; }
  .main-title { font-size: 1.8rem; }
  .card { flex: 0 0 260px; height: 190px; }
  .cards-container { gap: 1rem; }
  .nav-button { width: 36px; height: 36px; }
  .nav-button-prev { left: 5px; }
  .nav-button-next { right: 5px; }
  .card-overlay { padding: 12px; }
  .card-title { font-size: 1.1rem; }
  .card-description { font-size: 0.75rem; }
}
</style>