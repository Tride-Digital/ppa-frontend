<template>
  <v-container class="fill-height py-12" max-width="1400">
    <v-row justify="center">
      <v-col cols="12" class="text-center mb-6">
        <h2 class="directors-title">Senior Leadership Team</h2>
        <p class="directors-subtitle">Get in touch with our directors directly</p>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col v-for="director in directorContacts" :key="director.name" cols="12" sm="6" md="4" lg="2.4" xl="2.4" class="mb-4 d-flex">
        <v-card class="director-card h-100 flex-grow-1" elevation="3" hover>
          <v-card-text class="text-center pa-8">
            <div class="director-image-container mb-5">
              <v-img :src="director.image" :alt="director.name" class="director-image" cover>
                <template #error>
                  <div class="error-placeholder">
                    <v-icon size="60" color="white">mdi-account-tie</v-icon>
                  </div>
                </template>
              </v-img>
            </div>
            <h3 class="director-name">{{ director.name }}</h3>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
definePageMeta({
  title: 'Contact Us - PPA'
})
const directorContacts = ref([
  { name: 'Director : D M Kobbekaduwe', image: '/images/team/Dammika.jpg' },
  { name: 'Director : Rehan Jayatilake', image: '/images/team/Rehan.jpg' },
  { name: 'Director : Ravindra Hewavitharana', image: '/images/team/Ravindra.jpg' },
  { name: 'Director : S M P Jayantha', image: '/images/team/Jayantha.jpg' },
  { name: 'Director : Dr W G Somaratne', image: '/images/team/Somarathne.jpg' },
  { name: 'Director : Mr Upananda Karunarathne', image: '/images/team/Upananda.jpg' },
  { name: 'Director : Attorney Wijitha Manamperi', image: '/images/team/Vijitha.jpg' },
  { name: 'Director : Nalin Amunugama', image: '/images/team/Nalin.jpg' },
  { name: 'Director : Januka Karunasena', image: '/images/team/Januka.jpg' },
  { name: 'Director : Prof Sarath P Nissanka', image: '/images/team/Nissanka 2.jpg' }
])
</script>

<style scoped>
.directors-title {
  font-size: 2.2rem;
  font-weight: 600;
  color: rgb(var(--v-theme-contact-title));
  margin-bottom: 0.5rem;
}
.directors-subtitle {
  font-size: 1.1rem;
  color: rgb(var(--v-theme-section-subtitle));
  margin-bottom: 2rem;
}
.director-card {
  transition: all 0.3s ease;
  border-radius: 16px;
  background: rgb(var(--v-theme-surface));
  border: 1px solid rgba(var(--v-theme-on-surface), 0.12);
  width: 220px;
}
.director-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgb(var(--v-theme-product-card-shadow)) !important;
}
.director-image-container {
  width: 180px;
  height: 220px;
  margin: 0 auto;
  border-radius: 12px;
  overflow: hidden;
  border: 3px solid rgb(var(--v-theme-accent));
  box-shadow: 0 4px 12px rgba(var(--v-theme-primary), 0.3);
}
.director-image {
  width: 100%;
  height: 100%;
}
.director-image .v-img__img {
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
.director-name {
  font-size: 1.2rem;
  font-weight: 600;
  color: rgb(var(--v-theme-contact-title));
  line-height: 1.3;
  margin: 0;
}
@media (min-width: 1264px) {
  .v-col-lg-2\.4 {
    flex: 0 0 20%;
    max-width: 20%;
  }
}
@media (max-width: 1263px) and (min-width: 960px) {
  .v-col-lg-2\.4 {
    flex: 0 0 25%;
    max-width: 25%;
  }
}
@media (max-width: 959px) and (min-width: 768px) {
  .v-col-lg-2\.4 {
    flex: 0 0 33.333333%;
    max-width: 33.333333%;
  }
}
@media (max-width: 768px) {
  .directors-title {
    font-size: 1.8rem;
  }
  .directors-subtitle {
    font-size: 1rem;
  }
  .director-image-container {
    width: 120px;
    height: 150px;
  }
  .director-name {
    font-size: 1rem;
  }
  .v-col-lg-2\.4 {
    flex: 0 0 50%;
    max-width: 50%;
  }
}
@media (max-width: 480px) {
  .directors-title {
    font-size: 1.5rem;
  }
  .director-image-container {
    width: 100px;
    height: 130px;
  }
  .director-name {
    font-size: 0.95rem;
  }
  .v-col-lg-2\.4 {
    flex: 0 0 100%;
    max-width: 100%;
  }
}
</style>