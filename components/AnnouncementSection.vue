<template>
  <section class="announcements-section pt-5 pb-12">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" class="text-center mb-12">
          <h2 class="section-title">Announcements</h2>
          <p class="section-subtitle">{{ sectionDescription }}</p>
        </v-col>
        <v-col cols="12">
          <v-row>
            <v-col v-for="announcement in announcements" :key="announcement.id" cols="12" sm="6" lg="3" class="mb-6">
              <v-card class="announcement-card h-100" elevation="4" hover @click="handleAnnouncementClick(announcement)">
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
      </v-row>
    </v-container>
  </section>
</template>

<script setup>
import { ref } from 'vue'
const sectionDescription = ref('Stay informed about upcoming events, policy updates, member benefits, and industry developments that matter to our plantation community')
const announcements = ref([
  {
    id: 1,
    title: 'Launch of the National Proprietary Planters Registry',
    date: 'July 15, 2025',
    image: '/images/announcements/announcement1.webp'
  },
  {
    id: 2,
    title: 'Upcoming Webinar: "Sustainable Plantation Practices 2025"',
    date: 'August 18, 2025',
    image: '/images/announcements/announcement2.webp'
  },
  {
    id: 3,
    title: 'Partnership Announcement with Vivonta Green Tech Consultants',
    date: 'July 1, 2025',
    image: '/images/announcements/announcement3.webp'
  },
  {
    id: 4,
    title: 'Call for Nominations: Executive Board Elections 2025',
    date: 'July 30, 2025',
    image: '/images/announcements/announcement4.webp'
  }
])
const handleAnnouncementClick = (announcement) => {
  console.log('Announcement clicked:', announcement.title)
}
</script>

<style scoped>
.announcements-section {
  background-color: rgb(var(--v-theme-background));
}
.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: rgb(var(--v-theme-section-title));
  margin-bottom: 1rem;
}
.section-subtitle {
  font-size: 1.1rem;
  color: rgb(var(--v-theme-section-subtitle));
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
  box-shadow: 0 8px 25px rgb(var(--v-theme-announcement-shadow));
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
  color: rgb(var(--v-theme-announcement-title));
  width: 100%;
}
.announcement-title {
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 1.3;
  margin-bottom: 1rem;
  color: rgb(var(--v-theme-announcement-title));
}
.announcement-date {
  font-size: 0.9rem;
  opacity: 0.9;
  margin-bottom: 0;
  color: rgb(var(--v-theme-announcement-date));
}
@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }
  .section-subtitle {
    font-size: 1rem;
  }
}
@media (max-width: 480px) {
  .section-title {
    font-size: 1.8rem;
  }
  .section-subtitle {
    font-size: 0.9rem;
  }
}
</style>
