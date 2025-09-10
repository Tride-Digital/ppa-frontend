<template>
  <div class="single-service-page">
    <section class="hero-section bg-surface-variant">
      <v-container>
        <v-row align="center">
          <v-col cols="12" md="6">
            <div class="hero-content">
              <h1 class="hero-title text-on-surface">{{ serviceName }}</h1>
              <p class="hero-description text-on-surface-variant">{{ serviceDescription }}</p>
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <div class="hero-image">
              <v-img :src="serviceImage" :alt="serviceName" height="400" cover class="rounded-lg elevation-8"></v-img>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <section class="details-section py-12">
      <v-container>
        <v-row>
          <v-col cols="12" lg="8">
            <div class="service-details">
              <h2 class="section-title mb-6 text-on-surface">Service Overview</h2>
              <div class="overview-content">
                <p class="text-body-1 mb-4 text-on-surface">
                  Our {{ serviceName.toLowerCase() }} service provides comprehensive solutions tailored to meet your specific plantation requirements. With years of expertise and a deep understanding of the agricultural sector in Sri Lanka, we deliver results that exceed expectations.
                </p>
                <p class="text-body-1 mb-6 text-on-surface">
                  {{ serviceDescription }}
                </p>
                <h3 class="subsection-title mb-4 text-on-surface">Key Features</h3>
                <v-row class="mb-6">
                  <v-col cols="12" md="6" v-for="(feature, index) in keyFeatures" :key="index">
                    <div class="feature-item d-flex align-start">
                      <v-icon color="contact-title" class="me-3 mt-1">mdi-check-circle</v-icon>
                      <div>
                        <h4 class="feature-title text-on-surface">{{ feature.title }}</h4>
                        <p class="feature-description text-body-2 text-on-surface-variant">{{ feature.description }}</p>
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </div>
            </div>
          </v-col>
          <v-col cols="12" lg="4">
            <div class="sidebar">
              <v-card class="service-info-card mb-6" elevation="4">
                <v-card-title class="bg-section-title text-on-primary">
                  <v-icon start>mdi-information-outline</v-icon>
                  Service Information
                </v-card-title>
                <v-card-text class="pa-0">
                  <v-list>
                    <v-list-item>
                      <v-list-item-title class="text-on-surface">Category</v-list-item-title>
                      <v-list-item-subtitle class="text-on-surface-variant">{{ serviceCategory }}</v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title class="text-on-surface">Duration</v-list-item-title>
                      <v-list-item-subtitle class="text-on-surface-variant">{{ serviceDuration }}</v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title class="text-on-surface">Availability</v-list-item-title>
                      <v-list-item-subtitle class="text-on-surface-variant">{{ serviceAvailability }}</v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title class="text-on-surface">Coverage</v-list-item-title>
                      <v-list-item-subtitle class="text-on-surface-variant">{{ serviceCoverage }}</v-list-item-subtitle>
                    </v-list-item>
                  </v-list>
                </v-card-text>
              </v-card>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <section class="cta-section py-12 bg-primary">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="8" class="text-center">
            <h2 class="cta-title text-on-primary mb-4">Ready to Get Started?</h2>
            <p class="cta-description text-on-primary mb-6" style="opacity: 0.9;">
              Take the first step towards optimizing your plantation operations with our professional {{ serviceName.toLowerCase() }} service.
            </p>
            <div class="cta-actions">
              <v-btn color="text" size="large" variant="elevated" class="me-4 text-on-surface" @click="getStarted">
                <v-icon start>mdi-cart-plus</v-icon>
                Add to Cart
              </v-btn>
              <v-btn variant="outlined" size="large" color="text" class="text-on-primary" @click="downloadBrochure">
                <v-icon start>mdi-download</v-icon>
                Download Brochure
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const serviceName = ref('')
const serviceCategory = ref('')
const serviceDescription = ref('')
const serviceDuration = ref('2-4 weeks')
const serviceAvailability = ref('Year-round')
const serviceCoverage = ref('All 9 Provinces')
const serviceImage = ref('/images/services/service.png')
const keyFeatures = ref([
  {
    title: 'Expert Analysis',
    description: 'Comprehensive assessment by certified professionals'
  },
  {
    title: 'Custom Solutions',
    description: 'Tailored approaches for your specific requirements'
  },
  {
    title: 'Quality Assurance',
    description: 'Guaranteed results with ongoing support'
  },
  {
    title: '24/7 Support',
    description: 'Round-the-clock assistance and consultation'
  }
])
const benefits = ref([
  'Comprehensive project documentation and reporting',
  'Expert consultation throughout the process',
  'Quality assurance and compliance verification',
  'Post-service support and maintenance',
  'Integration with existing plantation systems',
  'Training and knowledge transfer'
])
const relatedServices = ref([
  { name: 'Land Identification Services', category: 'Land' },
  { name: 'Project Feasibility Studies', category: 'Finance' },
  { name: 'Soil Analysis & Testing', category: 'Agronomy' },
  { name: 'Certification Support', category: 'Certifications' }
])
const breadcrumbs = computed(() => [
  {
    text: 'Home',
    disabled: false,
    href: '/'
  },
  {
    text: 'Services',
    disabled: false,
    href: '/services'
  },
  {
    text: serviceCategory.value,
    disabled: false,
    href: '/services'
  },
  {
    text: serviceName.value,
    disabled: true,
    href: '/singleService'
  }
])
onMounted(() => {
  serviceName.value = route.query.service || 'Service Details'
  serviceCategory.value = route.query.category || 'General Services'
  serviceDescription.value = route.query.description || 'Professional plantation services designed to enhance your operations.'
  serviceImage.value = route.query.image || '/images/services/service.png'
})
const requestQuote = () => {
  console.log('Request quote for:', serviceName.value)
}
const contactExpert = () => {
  console.log('Contact expert for:', serviceName.value)
}
const scheduleConsultation = () => {
  console.log('Schedule consultation for:', serviceName.value)
}
const getStarted = () => {
  console.log('Get started with:', serviceName.value)
}
const downloadBrochure = () => {
  console.log('Download brochure for:', serviceName.value)
}
const viewRelatedService = (service) => {
  console.log('View related service:', service.name)
  navigateTo({
    path: '/singleService',
    query: {
      category: service.category,
      service: service.name,
      description: 'Professional plantation services designed to enhance your operations.'
    }
  })
}
useSeoMeta({
  title: `${serviceName.value} - PPA Services`,
  description: serviceDescription.value,
  ogTitle: `${serviceName.value} - Professional Plantation Services`,
  ogDescription: serviceDescription.value,
})
</script>

<style scoped>
.single-service-page {
  min-height: 100vh;
}
.breadcrumb-item {
  text-decoration: none;
  transition: color 0.3s ease;
}
.breadcrumb-item:hover {
  color: rgb(var(--v-theme-primary));
}
.hero-section {
  padding: 4rem 0;
}
.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  color: rgb(var(--v-theme-text));
}
.hero-description {
  font-size: 1.2rem;
  line-height: 1.6;
  color: rgb(var(--v-theme-text));
}
.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}
.section-title {
  font-size: 2.5rem;
  font-weight: 600;
}
.subsection-title {
  font-size: 1.5rem;
  font-weight: 600;
}
.feature-item {
  margin-bottom: 1.5rem;
}
.feature-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}
.benefits-card {
  border-radius: 12px;
  border-left: 4px solid rgb(var(--v-theme-primary));
}
.service-info-card {
  background-color: rgb(var(--v-theme-service-card-bg));
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(var(--v-theme-outline), 0.12);
}
.related-service-item {
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 8px;
  margin: 4px 8px;
}
.related-service-item:hover {
  background-color: rgba(var(--v-theme-primary), 0.08);
  transform: translateX(4px);
}
.cta-section {
  position: relative;
  overflow: hidden;
}
.cta-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
  pointer-events: none;
}
.cta-title {
  font-size: 2.5rem;
  font-weight: 600;
}
.cta-description {
  font-size: 1.1rem;
}
.cta-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}
@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  .hero-description {
    font-size: 1rem;
  }
  .section-title {
    font-size: 2rem;
  }
  .cta-title {
    font-size: 2rem;
  }
  .hero-actions,
  .cta-actions {
    flex-direction: column;
    align-items: stretch;
  }
  .hero-actions .v-btn,
  .cta-actions .v-btn {
    width: 100%;
  }
}
.v-theme--dark .hero-section {
  background: linear-gradient(135deg, rgb(var(--v-theme-surface)) 0%, rgba(var(--v-theme-surface-variant), 0.8) 100%);
}
.v-theme--dark .benefits-card {
  border-left-color: rgb(var(--v-theme-primary));
}
.v-theme--light .hero-section {
  background: linear-gradient(135deg, rgb(var(--v-theme-primary)) 0%, rgba(var(--v-theme-surface), 0.9) 100%);
}
</style>