<template>
  <section class="about-section py-8">
    <v-container>
      <v-row justify="center">
        <!-- Title -->
        <v-col cols="12" class="text-center mb-6">
          <h2 class="section-title">About us</h2>
        </v-col>

        <!-- Video Section -->
        <v-col ref="videoSectionRef" cols="12" md="12" lg="10" class="mb-8 video-scroll-target">
          <div class="video-wrapper">
            <video
              class="about-video"
              autoplay
              loop
              muted
              playsinline
              preload="auto"
            >
              <source src="/assets/about_video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </v-col>

        <!-- Content Section -->
        <v-col cols="12" md="10" lg="8">
          <div class="about-content">
            <div v-if="pending" class="text-center py-8">
              <v-progress-circular
                indeterminate
                color="primary"
                size="48"
              ></v-progress-circular>
              <p class="mt-4 text-body-1">Loading...</p>
            </div>
            <div v-else-if="error" class="text-center py-8">
              <v-icon color="error" size="48" class="mb-4">mdi-alert-circle</v-icon>
              <p class="text-body-1">Failed to load content.</p>
            </div>
            <div v-else v-html="content" class="content-html"></div>
          </div>
        </v-col>

        <!-- Contact Link -->
        <v-col cols="12" class="text-center">
          <div class="contact-link-wrapper">
            <p class="contact-text">
              For more information, please
              <a :href="contactUsUrl" class="contact-link">contact us</a>
            </p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup>
import { computed, ref, onMounted, nextTick, watch, onUnmounted } from 'vue';
import { useStaticContent } from '~/composables/useStaticContent';

const { content, pending, error } = useStaticContent('About');
const route = useRoute();

const videoSectionRef = ref(null);
const hasScrolledToVideo = ref(false);

const scrollToVideo = async () => {
  if (hasScrolledToVideo.value) return;

  await nextTick();

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (videoSectionRef.value) {
        const el = videoSectionRef.value.$el || videoSectionRef.value;
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        hasScrolledToVideo.value = true;
      }
    });
  });
};

const handleWindowLoad = async () => {
  hasScrolledToVideo.value = false;
  await scrollToVideo();
};

onMounted(async () => {
  await scrollToVideo();
  window.addEventListener('load', handleWindowLoad, { once: true });
  setTimeout(() => {
    hasScrolledToVideo.value = false;
    scrollToVideo();
  }, 0);
});

onUnmounted(() => {
  window.removeEventListener('load', handleWindowLoad);
});

watch(
  () => route.fullPath,
  async () => {
    if (route.path === '/aboutus') {
      hasScrolledToVideo.value = false;
      await scrollToVideo();
    }
  },
  { flush: 'post' }
);

const contactUsUrl = computed(() => '/contactus');
</script>

<style scoped>
.about-section {
  background-color: rgb(var(--v-theme-background));
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: rgb(var(--v-theme-section-title));
  margin-bottom: 8px;
}

/* Video Wrapper */
.video-wrapper {
  position: relative;
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  background-color: #000;
}

.about-video {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
}

.video-scroll-target {
  scroll-margin-top: 88px;
}

/* Content Section */
.about-content {
  text-align: justify;
  line-height: 1.8;
}

.content-html {
  color: rgb(var(--v-theme-about-text));
  font-size: 1.1rem;
}

/* Ensure proper spacing for HTML content */
.content-html :deep(p) {
  margin-bottom: 8px;
  line-height: 1.6;
}

.content-html :deep(h1),
.content-html :deep(h2),
.content-html :deep(h3),
.content-html :deep(h4) {
  margin-top: 16px;
  margin-bottom: 8px;
  font-weight: 600;
  color: rgb(var(--v-theme-section-title));
}

.content-html :deep(h1:first-child),
.content-html :deep(h2:first-child),
.content-html :deep(h3:first-child),
.content-html :deep(h4:first-child) {
  margin-top: 4px;
}

.content-html :deep(ul),
.content-html :deep(ol) {
  margin-bottom: 8px;
  padding-left: 24px;
}

.content-html :deep(li) {
  margin-bottom: 4px;
}

/* Contact Link */
.contact-link-wrapper {
  text-align: center;
  margin-top: 8px;
  padding-top: 4px;
}

.contact-text {
  color: rgb(var(--v-theme-vision-mission-text));
  font-size: 18px;
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

/* Responsive Design */
@media (max-width: 960px) {
  .section-title {
    font-size: 2rem;
  }

  .content-html {
    font-size: 1rem;
  }

  .contact-text {
    font-size: 16px;
  }
}

@media (max-width: 600px) {
  .section-title {
    font-size: 1.75rem;
  }

  .video-wrapper {
    border-radius: 8px;
  }

  .about-content {
    text-align: left;
  }
}
</style>
