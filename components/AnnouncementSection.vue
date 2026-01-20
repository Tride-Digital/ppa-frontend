<template>
  <section class="announcements-section pt-8">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" class="text-center mb-12">
          <h2 class="section-title">Announcements</h2>
          <p class="section-subtitle">{{ sectionDescription }}</p>
        </v-col>
        <v-col cols="12">
          <v-row justify="center">
            <v-col v-for="announcement in announcements" :key="announcement.id" cols="12" sm="6" lg="3" class="mb-6">
              <v-card class="announcement-card h-100" elevation="4" hover @click="handleAnnouncementClick(announcement)">
                <v-img :src="announcement.coverImage" :alt="announcement.title" height="300" cover class="announcement-image">
                  <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular indeterminate color="primary"></v-progress-circular>
                    </v-row>
                  </template>
                  <div class="announcement-overlay">
                    <v-card-text class="announcement-content">
                      <h3 class="announcement-title mb-4">{{ announcement.title }}</h3>
                      <p class="announcement-date">Date: {{ announcement.date }}</p>
                    </v-card-text>
                  </div>
                </v-img>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
        <div class="my-8 py-8"></div>
      </v-row>
    </v-container>
    <v-dialog v-model="isModalOpen" max-width="900px" persistent class="announcement-modal">
      <v-card class="modal-card">
        <v-btn icon class="close-btn" @click="closeModal" size="small" color="white" elevation="2">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-card-text class="p-0">
          <v-img
            v-if="selectedAnnouncement?.mainImage"
            :src="selectedAnnouncement.mainImage"
            :alt="selectedAnnouncement?.title"
            class="modal-image"
            contain
            max-height="50vh"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="primary" size="50"></v-progress-circular>
              </v-row>
            </template>
          </v-img>
          <div class="modal-details pa-6">
            <h3 class="modal-title">{{ selectedAnnouncement?.title }}</h3>
            <p class="modal-date mb-4">{{ selectedAnnouncement?.date }}</p>
            <p class="modal-description" v-html="selectedAnnouncement?.description"></p>
            <div v-if="selectedAnnouncement?.link && selectedAnnouncement.link.trim() !== ''" class="modal-actions mt-4">
              <v-btn
                :href="selectedAnnouncement.link"
                target="_blank"
                rel="noopener"
                color="primary"
                elevation="2"
                class="take-btn"
              >
                Take me
                <v-icon right>mdi-open-in-new</v-icon>
              </v-btn>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const config = useRuntimeConfig()
const sectionDescription = ref('Stay informed about upcoming events, policy updates, member benefits, and industry developments that matter to our plantation community.')
const isModalOpen = ref(false)
const selectedAnnouncement = ref(null)
const announcements = ref([])
const baseUrl = config.public.backendUrl
const fetchAnnouncements = async () => {
  try {
    const res = await fetch(`${baseUrl}/announcement/all?skip=0&limit=100`, {
      headers: { accept: 'application/json' }
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    const items = Array.isArray(data.items) ? data.items : []
    const active = items.filter(a => Number(a.status) === 1)
    announcements.value = active.map(a => ({
      id: a.id,
      title: a.title,
      date: a.created_date ? new Date(a.created_date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : '',
      coverImage: a.cover_image_url || '',
      mainImage: a.main_image_url ? a.main_image_url : null,
      description: a.description || '',
      link: a.link || ''
    }))
  } catch (err) {
    console.error('Failed to load announcements:', err)
  }
}

onMounted(() => {
  fetchAnnouncements()
})

const handleAnnouncementClick = (announcement) => {
  selectedAnnouncement.value = announcement
  isModalOpen.value = true
  console.log('Announcement clicked:', announcement.title)
}
const closeModal = () => {
  isModalOpen.value = false
  selectedAnnouncement.value = null
}
</script>

<style scoped>
.announcements-section {
  background-color: rgb(var(--v-theme-background));
  min-height: 100vh;
}
.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: rgb(var(--v-theme-section-title));
  margin-bottom: 1rem;
}
.section-subtitle {
  font-size: 1.1rem;
  color: rgb(var(--v-theme-about-text));
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}
.announcement-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
}
.announcement-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px var(--v-theme-announcement-shadow);
}
.announcement-image {
  position: relative;
}
.announcement-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    var(--v-theme-announcement-overlay-start),
    var(--v-theme-announcement-overlay-end)
  );
  display: flex;
  align-items: flex-end;
}
.announcement-content {
  color: white;
  width: 100%;
}
.announcement-title {
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 1.3;
  margin-bottom: 1rem;
  color: var(--v-theme-announcement-title);
}
.announcement-date {
  font-size: 0.9rem;
  opacity: 0.9;
  margin-bottom: 0;
  color: white;
}
.announcement-modal :deep(.v-overlay__content) {
  margin: 24px;
  max-height: calc(100% - 48px);
  overflow-y: auto;
}
.modal-card {
  border-radius: 16px;
  position: relative;
  overflow: hidden;
  border: none;
  background: rgb(var(--v-theme-service-card-bg));
}
.close-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 10;
  background-color: rgba(255, 255, 255, 0.9) !important;
  backdrop-filter: blur(8px);
  transition: all 0.2s ease;
}
.close-btn:hover {
  transform: scale(1.1);
  background-color: white !important;
}
.modal-image {
  width: 100%;
  object-fit: cover;
  max-height: 60vh;
  background: rgb(var(--v-theme-service-card-bg));
}
.modal-details {
  background: rgb(var(--v-theme-service-card-bg));
}
.modal-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--v-theme-title-main);
  margin-bottom: 8px;
}
.modal-date {
  color: var(--v-theme-section-subtitle);
  font-size: 0.9rem;
  margin: 0;
}
.modal-description {
  color: var(--v-theme-product-description);
  line-height: 1.6;
  margin-top: 0.5rem;
  white-space: pre-wrap;
}
.modal-link {
  color: #1e88e5;
  text-decoration: underline;
}
.modal-actions {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: flex-start;
}
.take-btn {
  text-transform: none;
  font-weight: 600;
}
@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }
  .section-subtitle {
    font-size: 1rem;
  }
  .announcement-modal :deep(.v-overlay__content) {
    margin: 16px;
    max-height: calc(100% - 32px);
  }
  .modal-image {
    max-height: 50vh !important;
  }
}
@media (max-width: 480px) {
  .section-title {
    font-size: 1.8rem;
  }
  .section-subtitle {
    font-size: 0.9rem;
  }
  .announcement-modal :deep(.v-overlay__content) {
    margin: 8px;
    max-height: calc(100% - 16px);
  }
}
.announcement-modal :deep(.v-dialog-transition-enter-active),
.announcement-modal :deep(.v-dialog-transition-leave-active) {
  transition: all 0.3s ease;
}
.announcement-modal :deep(.v-dialog-transition-enter-from),
.announcement-modal :deep(.v-dialog-transition-leave-to) {
  opacity: 0;
  transform: scale(0.9);
}
</style>