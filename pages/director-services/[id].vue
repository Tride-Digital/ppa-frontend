<!-- pages/director-services/[id].vue -->
<template>
  <div class="director-service-page">
    <!-- Loading State -->
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

    <!-- Loaded Service Content -->
    <section v-else-if="service" class="hero-section bg-surface-variant">
      <v-container>
        <v-row align="center">
          <v-col cols="12" md="6">
            <div class="hero-content">
              <v-chip color="primary" variant="tonal" class="mb-3">
                <v-icon start size="small">{{ service.icon || 'mdi-account-tie' }}</v-icon>
                {{ service.category }}
              </v-chip>
              <h1 class="hero-title text-on-surface">{{ service.name }}</h1>
              <p class="hero-description text-on-surface-variant">
                {{ service.short_description || 'Professional director service' }}
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
                    <v-icon size="80" color="white">{{ service.icon || 'mdi-account-tie' }}</v-icon>
                  </div>
                </template>
              </v-img>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Details Section -->
    <section v-if="service" class="details-section py-12">
      <v-container>
        <v-row>
          <v-col cols="12" lg="8">
            <div class="service-details">
              <!-- Objective -->
              <div v-if="service.objective" class="mb-8">
                <h2 class="section-title mb-6 text-on-surface">Objective</h2>
                <p class="text-body-1 text-on-surface" v-html="service.objective"></p>
              </div>

              <!-- Scope -->
              <div v-if="service.scope && service.scope.length > 0" class="mb-8">
                <h3 class="subsection-title mb-4 text-on-surface">Scope</h3>
                <v-list class="scope-list">
                  <v-list-item v-for="(item, index) in service.scope" :key="index">
                    <template #prepend>
                      <v-icon color="primary">mdi-check-circle</v-icon>
                    </template>
                    <v-list-item-title class="text-on-surface">{{ item }}</v-list-item-title>
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
                        <p class="feature-description text-body-2 text-on-surface">{{ deliverable }}</p>
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
                        <p class="feature-description text-body-2 text-on-surface">{{ kpi }}</p>
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
                        <p class="feature-description text-body-2 text-on-surface">{{ expert }}</p>
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </div>
            </div>
          </v-col>

          <!-- Sidebar -->
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
                      <v-list-item-subtitle class="text-on-surface-variant">
                        {{ service.category }}
                      </v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item v-if="service.duration">
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

    <!-- CTA Section -->
    <section v-if="service" class="cta-section py-12 bg-primary">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="8" class="text-center">
            <h2 class="cta-title text-on-primary mb-4">Ready to Get Started?</h2>
            <p class="cta-description text-on-primary mb-6" style="opacity: 0.9;">
              Take the first step with our professional {{ service.name.toLowerCase() }} service.
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
                v-if="service.support_doc_url" 
                variant="outlined" 
                size="large" 
                color="text" 
                class="text-on-primary" 
                :href="service.support_doc_url" 
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

    <!-- Service Not Found -->
    <v-row v-if="!service && !loading">
      <v-col cols="12" class="text-center">
        <v-card class="pa-8" elevation="2">
          <v-icon size="100" color="grey" class="mb-4">mdi-account-tie-off</v-icon>
          <h2 class="mb-4">Director Service Not Found</h2>
          <p class="mb-6">The director service you're looking for doesn't exist.</p>
          <v-btn color="primary" @click="$router.push('/contactus')">
            Back to Leadership Team
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCart } from '~/composables/useCart'

const route = useRoute()
const router = useRouter()
const { addToCart } = useCart()

interface DirectorService {
  id: number
  name: string
  category: string
  image: string | null
  icon: string | null
  short_description?: string | null
  objective?: string | null
  scope?: string[] | null
  deliverables?: string[] | null
  key_kpis?: string[] | null
  expert_composition?: string[] | null
  duration?: string | null
  availability?: string | null
  coverage?: string | null
  support_doc_url?: string | null
}

const service = ref<DirectorService | null>(null)
const loading = ref<boolean>(true)

const config = useRuntimeConfig()
const apiBase = config.public.backendUrl || config.public.apiBase || 'http://localhost:8000'

const fetchDirectorService = async () => {
  const serviceId = parseInt(route.params.id as string)
  
  if (!serviceId || isNaN(serviceId)) {
    loading.value = false
    return
  }

  try {
    const data = await $fetch<any>(`${apiBase}/director_list/${serviceId}`)
    
    if (data) {
      service.value = {
        id: data.id,
        name: data.name,
        category: data.service_category || 'Director Services',
        image: data.img_url,
        icon: data.icon_font,
        short_description: data.short_description,
        objective: data.description?.objective,
        scope: data.description?.scope,
        deliverables: data.description?.deliverables,
        key_kpis: data.description?.key_kpis,
        expert_composition: data.description?.expert_composition,
        duration: data.description?.duration,
        availability: data.description?.availability,
        coverage: data.description?.coverage,
        support_doc_url: data.description?.support_doc_url
      }
    }
  } catch (err) {
    console.error('Error fetching director service:', err)
    service.value = null
  } finally {
    loading.value = false
  }
}

onMounted(fetchDirectorService)

const addServiceToCart = () => {
  if (service.value) {
    addToCart(service.value.category, {
      id: service.value.id,
      name: service.value.name,
      description: service.value.objective || service.value.short_description || '',
      image: service.value.image || '',
      icon: service.value.icon || undefined
    })
  }
}

useSeoMeta({
  title: computed(() => 
    service.value ? `${service.value.name} - Director Services` : 'Service Not Found'
  ),
  description: computed(() => 
    service.value ? (service.value.objective || service.value.short_description || '') : 'Service not found'
  ),
  ogTitle: computed(() => 
    service.value ? `${service.value.name} - Professional Director Services` : 'Service Not Found'
  ),
  ogDescription: computed(() => 
    service.value ? (service.value.objective || service.value.short_description || '') : 'Service not found'
  ),
})

definePageMeta({
  title: 'Director Service Details - PPA'
})
</script>

<style scoped>
.director-service-page {
  min-height: 100vh;
}

.hero-section {
  padding: 4rem 0;
}

.v-theme--light .hero-section {
  background: linear-gradient(135deg, rgb(var(--v-theme-primary)) 0%, rgba(var(--v-theme-surface), 0.9) 100%);
}

.v-theme--dark .hero-section {
  background: linear-gradient(135deg, rgb(var(--v-theme-surface)) 0%, rgba(var(--v-theme-surface-variant), 0.8) 100%);
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
  background: linear-gradient(135deg, rgba(var(--v-theme-primary), 0.8) 0%, rgba(var(--v-theme-primary), 0.6) 100%);
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
    margin: 0 !important;
    margin-bottom: 0.5rem !important;
  }
}
</style>