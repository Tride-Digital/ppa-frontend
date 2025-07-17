<template>
  <v-container class="fill-height py-12" max-width="1400">
    <v-row justify="center">
      <v-col cols="12" class="text-center mb-6">
        <h2 class="directors-title">Our Leadership Team</h2>
        <p class="directors-subtitle">Get in touch with our directors directly</p>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col v-for="director in directorContacts" :key="director.name" cols="12" sm="6" md="4" lg="2.4" xl="2.4" class="mb-4 d-flex">
        <v-card class="director-card h-100 flex-grow-1" elevation="3" hover>
          <v-card-text class="text-center pa-8">
            <!-- Profile Icon -->
            <v-avatar class="director-avatar mb-5" size="90" color="primary">
              <v-icon size="45" color="white">mdi-account-tie</v-icon>
            </v-avatar>
            <h3 class="director-name mb-4">{{ director.name }}</h3>
            <div class="contact-info">
              <v-chip class="contact-chip" color="accent" variant="tonal" size="x-large" :href="'tel:' + director.phone" link>
                <v-icon start>mdi-phone</v-icon>{{ director.phone }}</v-chip>
              <div v-if="director.note" class="contact-note mt-2">
                <v-chip size="small" color="success" variant="outlined">{{ director.note }}</v-chip>
              </div>
            </div>
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
  { name: 'Director / CEO', phone: '077 7790147' },
  { name: 'Director-Operations', phone: '077 7812538' },
  { name: 'Director-Marketing', phone: '077 7423500' },
  { name: 'Director-Finance', phone: '076 9499270' },
  { name: 'Director-Projects', phone: '077 2960284' },
  { name: 'Director-Sustainability', phone: '077 7485957' },
  { name: 'Director-Exports', phone: '077 8752657' },
  { name: 'Director-Legal', phone: '077 7713567' },
  { name: 'Director-HRM', phone: '077 2376343' },
  { name: 'Director-Export crops', phone: '077 6083027' }
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
  min-width: 220px;
}
.director-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgb(var(--v-theme-product-card-shadow)) !important;
}
.director-avatar {
  border: 3px solid rgb(var(--v-theme-accent));
  box-shadow: 0 4px 12px rgba(var(--v-theme-primary), 0.3);
}
.director-name {
  font-size: 1.2rem;
  font-weight: 600;
  color: rgb(var(--v-theme-contact-title));
  line-height: 1.3;
  margin: 0;
}
.contact-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.contact-chip {
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
}
.contact-chip:hover {
  transform: scale(1.05);
  box-shadow: 0 2px 8px rgba(var(--v-theme-accent), 0.3);
}
.contact-note {
  margin-top: 8px;
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
  .director-avatar {
    size: 70px;
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
  .director-avatar {
    size: 60px;
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
