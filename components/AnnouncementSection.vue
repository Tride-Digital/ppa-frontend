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
              <v-card class="announcement-card h-100" elevation="4" hover  @click="handleAnnouncementClick(announcement)">
                <v-img :src="announcement.image" :alt="announcement.title" height="300" cover class="announcement-image">
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
    <v-dialog v-model="isModalOpen" max-width="800px" persistent class="announcement-modal">
      <v-card class="modal-card">
        <v-btn icon class="close-btn" @click="closeModal" size="small" color="white" elevation="2">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-card-text>
            <v-img :src="selectedAnnouncement?.fullImage" :alt="selectedAnnouncement?.title" class="modal-image" contain max-height="80vh">
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="primary" size="50"></v-progress-circular>
                </v-row>
              </template>
            </v-img>
        </v-card-text>
      </v-card>
    </v-dialog>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const sectionDescription = ref('Stay informed about upcoming events, policy updates, member benefits, and industry developments that matter to our plantation community')
const isModalOpen = ref(false)
const selectedAnnouncement = ref(null)
const announcements = ref([
  {
    id: 1,
    title: 'Join as a Service Provider',
    date: 'July 15, 2025',
    image: '/images/announcements/a2.jpg',
    fullImage: '/images/announcements/a1.jpg',
  }
])
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
  background-color: #f8fafc;
  min-height: 100vh;
}
.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1rem;
}
.section-subtitle {
  font-size: 1.1rem;
  color: #64748b;
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
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
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
    rgba(0, 0, 0, 0.1), 
    rgba(0, 0, 0, 0.7)
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
  color: white;
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
.image-container {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}
.modal-image {
  border-radius: 8px;
}
.border-corner {
  position: absolute;
  width: 32px;
  height: 32px;
  z-index: 2;
}
.border-top-left {
  top: -8px;
  left: -8px;
  border-left: 4px solid #22c55e;
  border-top: 4px solid #22c55e;
  border-top-left-radius: 8px;
}
.border-top-right {
  top: -8px;
  right: -8px;
  border-right: 4px solid #22c55e;
  border-top: 4px solid #22c55e;
  border-top-right-radius: 8px;
}
.border-bottom-left {
  bottom: -8px;
  left: -8px;
  border-left: 4px solid #22c55e;
  border-bottom: 4px solid #22c55e;
  border-bottom-left-radius: 8px;
}
.border-bottom-right {
  bottom: -8px;
  right: -8px;
  border-right: 4px solid #22c55e;
  border-bottom: 4px solid #22c55e;
  border-bottom-right-radius: 8px;
}
.modal-footer {
  border-top: 1px solid #e2e8f0;
}
.modal-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 8px;
}
.modal-date {
  color: #64748b;
  font-size: 0.9rem;
  margin: 0;
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
    max-height: 60vh !important;
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