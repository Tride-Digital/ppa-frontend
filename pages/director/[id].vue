<template>
  <v-container class="py-12" max-width="1200">
    <v-row v-if="director">
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
                <p class="director-title mb-0">{{ director.position }}</p>
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card class="director-details-card" elevation="2">
          <v-card-text class="pa-8">
            <div class="mb-8">
              <h2 class="section-title mb-4">About {{ director.name.replace('Director : ', '') }}</h2>
              <p class="director-description">{{ director.description }}</p>
            </div>
            <div class="mb-8">
              <h2 class="section-title mb-4">Qualifications</h2>
              <ul class="qualifications-list">
                <li v-for="qualification in director.qualifications" :key="qualification">
                  <v-icon size="small" color="navtext" class="mr-2">mdi-certificate</v-icon>
                  {{ qualification }}
                </li>
              </ul>
            </div>
            <div class="mb-6">
              <h2 class="section-title mb-4">Services Provided</h2>
              <v-row>
                <v-col v-for="(service, index) in directorServices" :key="index" cols="12" sm="6" md="4" class="mb-4">
                  <ServiceCard :service="service" :category-label="'Director Services'" @learn-more="learnMoreService"
                               @add-to-cart="addToCart"/>
                </v-col>
              </v-row>
            </div>
            <div class="contact-section">
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
import { ref, onMounted } from 'vue'
import ServiceCard from '~/components/ServiceCard.vue'
import { useCart } from '~/composables/useCart'
import { useRoute, useRouter } from 'vue-router'
import { useDirectors } from '~/composables/useDirectors'

definePageMeta({
  title: 'Director Profile - PPA'
})

const route = useRoute()
const router = useRouter()
const { addToCart: addToGlobalCart } = useCart()
const { fetchDirectorById } = useDirectors()

const director = ref<any>(null)
const directorServices = ref<any[]>([])

const fetchDirector = async () => {
  const userId = route.params.id as string
  const data = await fetchDirectorById(userId)
  director.value = data
  directorServices.value = data?.services || []
}

onMounted(fetchDirector)

const learnMoreService = (service: any): void => {
  router.push(`/service/${service.category}`)
}

const addToCart = (category: string, service: any): void => {
  if (!director.value) return
  addToGlobalCart(category, {
    name: service.name || '',
    description: `${service.description || ''} - by ${director.value.name}`,
    image: service.image || '',
    icon: service.icon || undefined,
    director: director.value.name
  })
}
</script>

<style scoped>
.director-profile-card {
  border-radius: 16px;
  overflow: hidden;
  min-height: 400px;
}
.director-image-wrapper {
  height: 400px;
  overflow: hidden;
}
.director-profile-image {
  width: 100%;
  height: 100%;
}
.director-profile-image .v-img__img {
  object-fit: cover;
  object-position: center top;
}
.error-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(var(--v-theme-primary), 0.1);
}
.director-profile-name {
  font-size: 2rem;
  font-weight: 600;
  color: rgb(var(--v-theme-section-title));
  margin-bottom: 0.5rem;
  line-height: 1.2;
}
.director-title {
  font-size: 1.3rem;
  color: rgb(var(--v-theme-navtext));
  font-weight: 500;
  line-height: 1.3;
}
.director-details-card {
  border-radius: 16px;
}
.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: rgb(var(--v-theme-section-title));
  border-bottom: 2px solid rgb(var(--v-theme-accent));
  padding-bottom: 0.5rem;
}
.director-description {
  font-size: 1.1rem;
  line-height: 1.7;
  color: rgb(var(--v-theme-on-surface));
  text-align: justify;
}
.qualifications-list {
  list-style: none;
  padding: 0;
}
.qualifications-list li {
  padding: 0.8rem 0;
  font-size: 1.1rem;
  color: rgb(var(--v-theme-on-surface));
  border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.1);
  display: flex;
  align-items: center;
}
.qualifications-list li:last-child {
  border-bottom: none;
}
.contact-section {
  background-color: rgba(var(--v-theme-primary), 0.05);
  border-radius: 12px;
  padding: 1.5rem;
}
.contact-item {
  border-radius: 12px;
  transition: all 0.3s ease;
}
.contact-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(var(--v-theme-primary), 0.2);
}
.contact-label {
  font-weight: 600;
  color: rgb(var(--v-theme-section-title));
  margin: 0;
  font-size: 0.9rem;
}
.contact-value {
  font-size: 1rem;
  color: rgb(var(--v-theme-on-surface));
  margin: 0;
  font-weight: 500;
}
@media (max-width: 768px) {
  .director-profile-name {
    font-size: 1.6rem;
  }
  .director-title {
    font-size: 1.1rem;
  }
  .section-title {
    font-size: 1.3rem;
  }
  .director-description {
    font-size: 1rem;
  }
  .director-image-wrapper {
    height: 350px;
  }
  .director-profile-card {
    min-height: 350px;
  }
}
@media (max-width: 599px) {
  .director-image-wrapper {
    height: 450px;
  }
  .director-profile-card {
    height: 570px;
  }
}
</style>