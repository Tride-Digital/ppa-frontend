<template>
  <v-container class="py-12" fluid>
    <v-row justify="center">
      <v-col cols="12" class="text-center mb-8">
        <h2 class="directors-title">Senior Leadership Team</h2>
        <p class="directors-subtitle">Get in touch with our directors directly</p>
      </v-col>
    </v-row>

    <v-row justify="center" class="directors-row">
      <v-col
        v-for="director in directorContacts"
        :key="director.name"
        cols="12"
        sm="6"
        md="4"
        lg="2.4"
        class="d-flex justify-center"
      >
        <div
          class="director-shell"
          role="button"
          tabindex="0"
          @click="navigateToDirector(director.id, getDirectorTitle(director.id), getDirectorProvince(director.id))"
          @keydown.enter="navigateToDirector(director.id, getDirectorTitle(director.id), getDirectorProvince(director.id))"
        >
          <v-card class="director-card" elevation="0">
            <v-card-text class="text-center pa-6">
              <div class="director-image-container">
                <v-img
                  :src="director.image"
                  :alt="director.name"
                  class="director-image"
                  cover
                >
                  <template #error>
                    <div class="error-placeholder">
                      <v-icon size="60" color="grey">mdi-account-tie</v-icon>
                    </div>
                  </template>
                </v-img>
              </div>
              <h3 class="director-name mt-4">
                Director
                <template v-if="getDirectorTitle(director.id)">
                  of {{ getDirectorTitle(director.id) }} {{ director.name }}
                </template>
                <template v-else>
                  {{ director.name }}
                </template>
              </h3>
            </v-card-text>
          </v-card>
        </div>
        <!-- /shell -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useDirectors } from '~/composables/useDirectors'

const router = useRouter()
const { 
  directorContacts, 
  fetchDirectorContacts, 
  fetchDirectorInfo,
  getDirectorTitle,
  getDirectorProvince 
} = useDirectors()

onMounted(async () => {
  await fetchDirectorContacts()
  // Fetch director info for all directors
  for (const director of directorContacts.value) {
    await fetchDirectorInfo(director.id)
  }
})

const navigateToDirector = (id: string | number, title?: string, province?: string): void => {
  const query: Record<string, string> = {}
  if (title) query.title = title
  if (province) query.province = province
  
  router.push({
    path: `/director/${id}`,
    query: Object.keys(query).length > 0 ? query : undefined
  })
}
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

.director-shell {
  background: rgb(var(--v-theme-surface));
  border: 1px solid rgba(var(--v-theme-on-surface), 0.12);
  border-radius: 20px;
  padding: 20px;
  padding-left: 20px; 
  padding-top: 10px;          
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
  cursor: pointer;
  display: inline-block;   
}
.director-shell:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.12);
  border-color: rgba(var(--v-theme-primary), 0.25);
}
.director-shell:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(var(--v-theme-primary), 0.25), 0 8px 24px rgba(0, 0, 0, 0.12);
}

.director-card {
  border-radius: 16px;
  background: rgb(var(--v-theme-surface));
  width: 220px;
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

/* Custom 5-up column on large screens */
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

  .director-shell {
    padding: 10px;
    border-radius: 16px;
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
