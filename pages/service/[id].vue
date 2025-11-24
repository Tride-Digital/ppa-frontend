<template>
  <div class="single-service-page">
    <section v-if="loading" class="hero-section bg-surface-variant">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" class="text-center">
            <v-progress-circular indeterminate color="primary" size="50"></v-progress-circular>
            <p class="mt-4">Loading service details...</p>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <section v-else-if="service" class="hero-section bg-surface-variant">
      <v-container>
        <v-row align="center">
          <v-col cols="12" md="6">
            <div class="hero-content">
              <v-chip color="primary" variant="tonal" class="mb-3">
                <v-icon start size="small">{{ service.icon || 'mdi-leaf' }}</v-icon>
                {{ service.category }}
              </v-chip>
              <h1 class="hero-title text-on-surface">{{ service.name }}</h1>
              <p class="hero-description text-on-surface-variant">
                {{ service.shortDescription || 'Professional plantation service' }}
              </p>
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <div class="hero-image">
              <v-img
                :src="service.image"
                :alt="service.name"
                height="400"
                cover
                class="rounded-lg elevation-8"
              >
                <template #placeholder>
                  <div class="d-flex align-center justify-center fill-height">
                    <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                  </div>
                </template>
                <template #error>
                  <div class="error-placeholder">
                    <v-icon size="80" color="white">{{ service.icon || 'mdi-leaf' }}</v-icon>
                  </div>
                </template>
              </v-img>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <section v-if="service" class="details-section py-12">
      <v-container>
        <v-row>
          <v-col cols="12" lg="8">
            <div class="service-details">
              <!-- Objective -->
              <div v-if="service.objective" class="mb-8">
                <h2 class="section-title mb-6 text-on-surface">Service Objective</h2>
                <p class="text-body-1 text-on-surface" v-html="service.objective"></p>
              </div>

              <!-- Scope -->
              <div v-if="service.scope && service.scope.length > 0" class="mb-8">
                <h3 class="subsection-title mb-4 text-on-surface">Scope</h3>
                <v-list class="scope-list">
                  <v-list-item
                    v-for="(item, index) in service.scope"
                    :key="index"
                  >
                    <template #prepend>
                      <v-icon color="primary">mdi-check-circle</v-icon>
                    </template>
                    <v-list-item-title class="text-on-surface">
                      {{ item }}
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </div>

              <!-- Deliverables -->
              <div v-if="service.deliverables && service.deliverables.length > 0" class="mb-8">
                <h3 class="subsection-title mb-4 text-on-surface">Deliverables</h3>
                <v-row>
                  <v-col
                    cols="12"
                    md="6"
                    v-for="(deliverable, index) in service.deliverables"
                    :key="index"
                  >
                    <div class="feature-item d-flex align-start">
                      <v-icon color="contact-title" class="me-3 mt-1">mdi-package-variant</v-icon>
                      <div>
                        <p class="feature-description text-body-2 text-on-surface">
                          {{ deliverable }}
                        </p>
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </div>

              <!-- Key KPIs -->
              <div v-if="service.key_kpis && service.key_kpis.length > 0" class="mb-8">
                <h3 class="subsection-title mb-4 text-on-surface">Key Performance Indicators</h3>
                <v-row>
                  <v-col
                    cols="12"
                    md="6"
                    v-for="(kpi, index) in service.key_kpis"
                    :key="index"
                  >
                    <div class="feature-item d-flex align-start">
                      <v-icon color="contact-title" class="me-3 mt-1">mdi-chart-line</v-icon>
                      <div>
                        <p class="feature-description text-body-2 text-on-surface">
                          {{ kpi }}
                        </p>
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </div>

              <!-- Expert Composition -->
              <div v-if="service.expert_composition && service.expert_composition.length > 0" class="mb-8">
                <h3 class="subsection-title mb-4 text-on-surface">Expert Composition</h3>
                <v-row>
                  <v-col
                    cols="12"
                    md="6"
                    v-for="(expert, index) in service.expert_composition"
                    :key="index"
                  >
                    <div class="feature-item d-flex align-start">
                      <v-icon color="contact-title" class="me-3 mt-1">mdi-account-group</v-icon>
                      <div>
                        <p class="feature-description text-body-2 text-on-surface">
                          {{ expert }}
                        </p>
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
                      <v-list-item-subtitle class="text-on-surface-variant">{{ service.category }}</v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title class="text-on-surface">Duration</v-list-item-title>
                      <v-list-item-subtitle class="text-on-surface-variant">
                        {{ service.duration }}
                      </v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item v-if="service.availability">
                      <v-list-item-title class="text-on-surface">Availability</v-list-item-title>
                      <v-list-item-subtitle class="text-on-surface-variant">
                        {{ service.availability }}
                      </v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item v-if="service.coverage">
                      <v-list-item-title class="text-on-surface">Coverage</v-list-item-title>
                      <v-list-item-subtitle class="text-on-surface-variant">
                        {{ service.coverage }}
                      </v-list-item-subtitle>
                    </v-list-item>
                  </v-list>
                </v-card-text>
              </v-card>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <section v-if="service" class="cta-section py-12 bg-primary">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="8" class="text-center">
            <h2 class="cta-title text-on-primary mb-4">Ready to Get Started?</h2>
            <p class="cta-description text-on-primary mb-6" style="opacity: 0.9;">
              Take the first step towards optimizing your plantation operations with our professional
              {{ service.name.toLowerCase() }} service.
            </p>
            <div class="cta-actions">
              <v-btn
                color="text"
                size="large"
                variant="elevated"
                class="me-4 text-on-surface"
                @click="addServiceToCart"
              >
                <v-icon start>mdi-cart-plus</v-icon>
                Add to Cart
              </v-btn>
              <v-btn
                v-if="service.supportDocUrl"
                variant="outlined"
                size="large"
                color="text"
                class="text-on-primary"
                :href="service.supportDocUrl"
                target="_blank"
              >
                <v-icon start>mdi-download</v-icon>
                Download Brochure
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <v-row v-if="!service && !loading">
      <v-col cols="12" class="text-center">
        <v-card class="pa-8" elevation="2">
          <v-icon size="100" color="grey" class="mb-4">mdi-cog-off</v-icon>
          <h2 class="mb-4">Service Not Found</h2>
          <p class="mb-6">The service you're looking for doesn't exist.</p>
          <v-btn color="primary" @click="$router.push('/services')">
            Back to Services
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCart } from '~/composables/useCart'

const route = useRoute()
const router = useRouter()
const { addToCart } = useCart()
const config = useRuntimeConfig()

const service = ref(null)
const loading = ref(true)

const fetchService = async () => {
  const serviceId = parseInt(route.params.id)

  if (!serviceId || isNaN(serviceId)) {
    loading.value = false
    return
  }

  try {
    const apiBase = config.public.backendUrl
    const data = await $fetch(`${apiBase}/director_list/${serviceId}`)

    if (data) {
      const desc = data.description || {}
      service.value = {
        id: data.id,
        name: data.name,
        category: data.service_category || 'Services',
        image: data.img_url,
        icon: data.icon_font || 'mdi-leaf',
        shortDescription: desc.objective || null,
        objective: desc.objective || null,
        scope: desc.scope || [],
        deliverables: desc.deliverables || [],
        key_kpis: desc.key_kpis || [],
        expert_composition: desc.expert_composition || [],
        duration: desc.duration || null,
        availability: desc.availability || null,
        coverage: desc.coverage || null,
        supportDocUrl: desc.support_doc_url || null
      }
    } else {
      service.value = null
    }
  } catch (err) {
    console.error('Error fetching service:', err)
    service.value = null
  } finally {
    loading.value = false
  }
}

onMounted(fetchService)

const addServiceToCart = () => {
  if (!service.value) return
  addToCart(service.value.category, {
    id: service.value.id,
    name: service.value.name,
    description: service.value.objective || service.value.shortDescription || '',
    image: service.value.image,
    icon: service.value.icon
  })
}
useSeoMeta({
  title: computed(() =>
    service.value ? `${service.value.name} - PPA Services` : 'Service Not Found'
  ),
  shortDescription: computed(() =>
    service.value
      ? (service.value.shortDescription || service.value.objective || '')
      : 'Service not found'
  ),
  description: computed(() =>
    service.value
      ? (service.value.objective || service.value.shortDescription || '')
      : 'Service not found'
  ),
  ogTitle: computed(() =>
    service.value
      ? `${service.value.name} - Professional Plantation Services`
      : 'Service Not Found'
  ),
  ogDescription: computed(() =>
    service.value
      ? (service.value.objective || service.value.shortDescription || '')
      : 'Service not found'
  )
})
definePageMeta({
  title: 'Service Details - PPA'
})
</script>

<style scoped>
.single-service-page {
  min-height: 100vh;
}
.hero-section {
  padding: 4rem 0;
}
.v-theme--light .hero-section {
  background: linear-gradient(
    135deg,
    rgb(var(--v-theme-primary)) 0%,
    rgba(var(--v-theme-surface), 0.9) 100%
  );
}
.v-theme--dark .hero-section {
  background: linear-gradient(
    135deg,
    rgb(var(--v-theme-surface)) 0%,
    rgba(var(--v-theme-surface-variant), 0.8) 100%
  );
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
.error-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    rgba(var(--v-theme-primary), 0.8) 0%,
    rgba(var(--v-theme-primary), 0.6) 100%
  );
}
.section-title {
  font-size: 2.5rem;
  font-weight: 600;
  color: rgb(var(--v-theme-section-title));
  border-bottom: 2px solid rgb(var(--v-theme-accent));
  padding-bottom: 0.5rem;
}
.subsection-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: rgb(var(--v-theme-section-title));
}
.feature-item {
  margin-bottom: 1.5rem;
}
.feature-description {
  color: rgb(var(--v-theme-on-surface));
  line-height: 1.6;
}

.scope-list {
  background-color: transparent;
}

.scope-list :deep(.v-list-item) {
  padding: 0.5rem 0;
}

.service-info-card {
  background-color: rgb(var(--v-theme-service-card-bg));
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(var(--v-theme-outline), 0.12);
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
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.05) 100%
  );
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
  .subsection-title {
    font-size: 1.3rem;
  }
  .cta-title {
    font-size: 2rem;
  }
  .cta-actions {
    flex-direction: column;
    align-items: stretch;
  }
  .cta-actions .v-btn {
    width: 100%;
  }
}
</style>