<template>
  <v-container class="py-12" max-width="1200">
    <!-- Loading -->
    <v-row v-if="loading">
      <v-col cols="12" class="mb-4">
        <v-skeleton-loader type="button" width="200" />
      </v-col>
      <v-col cols="12" class="mb-6">
        <v-card class="director-profile-card" elevation="4">
          <v-row no-gutters>
            <v-col cols="12" sm="4" md="3">
              <v-skeleton-loader type="image" height="400" />
            </v-col>
            <v-col cols="12" sm="8" md="9">
              <v-card-text class="pa-6">
                <v-skeleton-loader type="heading" class="mb-4" />
                <v-skeleton-loader type="text" width="200" />
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card class="director-details-card" elevation="2">
          <v-card-text class="pa-8">
            <v-skeleton-loader type="article, article" />
            <v-skeleton-loader type="list-item-three-line" class="mt-6" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Loaded -->
    <v-row v-else-if="director">
      <v-col cols="12" class="mb-4">
        <v-btn variant="outlined" color="primary" @click="$router.back()" prepend-icon="mdi-arrow-left">
          Back to Leadership Team
        </v-btn>
      </v-col>

      <v-col cols="12" class="mb-6">
        <v-card class="director-profile-card" elevation="4">
          <v-row no-gutters>
            <v-col cols="12" sm="4" md="3">
              <div class="director-image-wrapper">
                <v-img :src="director.image" :alt="director.name" class="director-profile-image" cover>
                  <template #error>
                    <div class="error-placeholder">
                      <v-icon size="80" color="white">mdi-account-tie</v-icon>
                    </div>
                  </template>
                </v-img>
              </div>
            </v-col>
            <v-col cols="12" sm="8" md="9">
              <v-card-text class="pa-6 d-flex flex-column justify-center h-100">
                <h1 class="director-profile-name mb-2">{{ director.name }}</h1>
                <p class="director-title mb-0">
                  <template v-if="directorTitle">
                    Director of {{ directorTitle }}
                  </template>
                  <template v-else>
                    {{ director.position || 'Director' }}
                  </template>
                </p>
                <p class="director-province mb-0" v-if="directorProvince">
                  {{ directorProvince }}
                </p>
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <v-col cols="12">
        <v-card class="director-details-card" elevation="2">
          <v-card-text class="pa-8">
            <!-- About -->
            <div class="mb-8" v-if="director.description">
              <h2 class="section-title mb-4">About {{ cleanName }}</h2>
              <p class="director-description">{{ director.description }}</p>
            </div>

            <!-- Qualifications -->
            <div class="mb-8" v-if="(director.qualifications || []).length">
              <h2 class="section-title mb-4">Qualifications</h2>
              <ul class="qualifications-list">
                <li v-for="q in director.qualifications" :key="q">
                  <v-icon size="small" color="navtext" class="mr-2">mdi-certificate</v-icon>
                  {{ q }}
                </li>
              </ul>
            </div>

            <!-- Services -->
            <div class="mb-6">
              <h2 class="section-title mb-4">Services Provided</h2>

              <v-alert v-if="!displayServices.length" type="info" variant="tonal" class="mb-4">
                No services linked yet.
              </v-alert>

              <v-row v-else>
                <v-col
                  v-for="(srv, index) in displayServices"
                  :key="srv.id || index"
                  cols="12" sm="6" md="4"
                  class="mb-4"
                >
                  <ServiceCard
                    :service="srv"
                    :category-label="'Director Service'"
                    :is-director-service="true"
                    @learn-more="() => learnMoreService(srv)"
                    @add-to-cart="() => addToCart(srv)"
                  />
                </v-col>
              </v-row>
            </div>

            <!-- Contact -->
            <div class="contact-section" v-if="director.email || director.phone">
              <h2 class="section-title mb-4">Contact Information</h2>
              <v-row>
                <v-col cols="12" sm="6" v-if="director.email">
                  <v-card class="contact-item" variant="outlined">
                    <v-card-text class="text-center pa-4">
                      <v-icon size="large" color="section-title" class="mb-2">mdi-email</v-icon>
                      <p class="contact-label">Email</p>
                      <p class="contact-value">{{ director.email }}</p>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="12" sm="6" v-if="director.phone">
                  <v-card class="contact-item" variant="outlined">
                    <v-card-text class="text-center pa-4">
                      <v-icon size="large" color="section-title" class="mb-2">mdi-phone</v-icon>
                      <p class="contact-label">Phone</p>
                      <p class="contact-value">{{ director.phone }}</p>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Not found -->
    <v-row v-else>
      <v-col cols="12" class="text-center">
        <v-card class="pa-8" elevation="2">
          <v-icon size="100" color="grey" class="mb-4">mdi-account-question</v-icon>
          <h2 class="mb-4">Director Not Found</h2>
          <p class="mb-6">The director profile you're looking for doesn't exist.</p>
          <v-btn color="primary" @click="$router.push('/contactus')">
            Back to Leadership Team
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ServiceCard from '~/components/DirectorCard.vue'
import { useCart } from '~/composables/useCart'
import { useDirectors } from '~/composables/useDirectors'
import { useDIrectorService, type DirectorServiceCard } from '~/composables/useDirectorService'

definePageMeta({ title: 'Director Profile - PPA' })

const route = useRoute()
const router = useRouter()
const { addToCart: addToGlobalCart } = useCart()
const { fetchDirectorById } = useDirectors()
const { fetchLinkedServiceCardsByUser } = useDIrectorService()
const directorTitle = route.query.title as string || ''
const directorProvince = route.query.province as string || ''

type DirectorProfile = {
  id: string
  name: string
  position?: string
  image?: string
  email?: string
  phone?: string
  description?: string
  qualifications?: string[]
}

const director = ref<DirectorProfile | null>(null)
const loading = ref<boolean>(true)
const displayServices = ref<DirectorServiceCard[]>([])

const cleanName = computed(() =>
  director.value?.name?.replace(/^Director\s*:\s*/i, '') || director.value?.name || ''
)

const stripCategoryPrefix = (s?: string | null) =>
  (s || '').replace(/^\s*category\s+/i, '').trim()

const fetchData = async () => {
  loading.value = true
  try {
    const userId = String(route.params.id)
    director.value = await fetchDirectorById(userId)
    const cards = await fetchLinkedServiceCardsByUser(userId)
    displayServices.value = cards.map(c => ({
      ...c,
      category: stripCategoryPrefix(c.category)
    }))
  } catch (e) {
    console.error('Error fetching director profile:', e)
    director.value = null
    displayServices.value = []
  } finally {
    loading.value = false
  }
}

onMounted(fetchData)

const learnMoreService = (service: DirectorServiceCard) => {
  if (!service?.id) return
  router.push(`/director-services/${service.id}`)
}

/**
 * - itemType: 'director'
 * - directorUserId: which director from (users.id)
 * - directorServiceId: which director_list service id
 */
const addToCart = (service: DirectorServiceCard) => {
  if (!director.value) return

  addToGlobalCart(service.category || 'Director Services', {
    id: service.id, // director_list.id
    name: service.name,
    description: `${service.description || ''} - by ${cleanName.value}`,
    image: service.image || '',
    icon: service.icon || undefined,

    // who thiii director is
    director: cleanName.value,
    directorUserId: director.value.id,

    // which director_list service
    directorServiceId: service.id,

    // mark as director item
    itemType: 'director',
  })
}
</script>

<style scoped>
.director-profile-card { border-radius: 16px; overflow: hidden; min-height: 400px; }
.director-image-wrapper { height: 400px; overflow: hidden; }
.director-profile-image { width: 100%; height: 100%; }
.director-profile-image .v-img__img { object-fit: cover; object-position: center top; }
.error-placeholder { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background-color: rgba(var(--v-theme-primary), 0.1); }
.director-profile-name { font-size: 2rem; font-weight: 600; color: rgb(var(--v-theme-section-title)); margin-bottom: .5rem; line-height: 1.2; }
.director-title { font-size: 1.3rem; color: rgb(var(--v-theme-navtext)); font-weight: 500; line-height: 1.3; }
.director-details-card { border-radius: 16px; }
.section-title { font-size: 1.5rem; font-weight: 600; color: rgb(var(--v-theme-section-title)); border-bottom: 2px solid rgb(var(--v-theme-accent)); padding-bottom: .5rem; }
.director-description { font-size: 1.1rem; line-height: 1.7; color: rgb(var(--v-theme-on-surface)); text-align: justify; }
.qualifications-list { list-style: none; padding: 0; }
.qualifications-list li { padding: .8rem 0; font-size: 1.1rem; color: rgb(var(--v-theme-on-surface)); border-bottom: 1px solid rgba(var(--v-theme-on-surface), .1); display: flex; align-items: center; }
.qualifications-list li:last-child { border-bottom: none; }
.contact-section { background-color: rgba(var(--v-theme-primary), .05); border-radius: 12px; padding: 1.5rem; }
.contact-item { border-radius: 12px; transition: all .3s ease; }
.contact-item:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(var(--v-theme-primary), .2); }
.contact-label { font-weight: 600; color: rgb(var(--v-theme-section-title)); margin: 0; font-size: .9rem; }
.contact-value { font-size: 1rem; color: rgb(var(--v-theme-on-surface)); margin: 0; font-weight: 500; }
@media (max-width: 768px) {
  .director-profile-name { font-size: 1.6rem; }
  .director-title { font-size: 1.1rem; }
  .section-title { font-size: 1.3rem; }
  .director-description { font-size: 1rem; }
  .director-image-wrapper { height: 350px; }
  .director-profile-card { min-height: 350px; }
}
@media (max-width: 599px) {
  .director-image-wrapper { height: 450px; }
  .director-profile-card { height: 570px; }
}
</style>