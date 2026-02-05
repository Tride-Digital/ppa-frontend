<template>
  <section class="about-section py-8">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" class="text-center mb-6">
          <h2 class="section-title">About us</h2>
        </v-col>
        <v-col cols="12" class="text-center mb-4">
          <v-btn
            color="primary"
            size="large"
            elevation="2"
            @click="handleCallUs"
            prepend-icon="mdi-phone"
          >
            Call us
          </v-btn>
        </v-col>
        <v-col ref="aboutContentRef" cols="12" md="10" lg="8">
          <div class="about-content">
            <div v-if="pending" class="text-center">Loading...</div>
            <div v-else-if="error" class="text-center">Failed to load content.</div>
            <div v-else v-html="content"></div>
          </div>
        </v-col>
        <v-col cols="12" class="text-center mt-8">
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
import { computed, ref, onMounted, nextTick } from 'vue';
import { useStaticContent } from '~/composables/useStaticContent';

const { content, pending, error } = useStaticContent('About');

const aboutContentRef = ref(null);

onMounted(async () => {
  await nextTick();
  setTimeout(() => {
    if (aboutContentRef.value) {
      const el = aboutContentRef.value.$el || aboutContentRef.value;
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 100);
});

const handleCallUs = () => {
  window.location.href = 'tel:+94772376343';
};

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
}
.about-content {
  text-align: justify;
}
.about-text {
  font-size: 1.1rem;
  line-height: 1.8;
  color: rgb(var(--v-theme-about-text));
}
.contact-link-wrapper {
  text-align: center;
  margin-top: 32px;
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
</style>
