<template>
  <div class="blog-page">
    <div class="blog-listing">
      <section class="unified-blog-section py-12">
        <v-container>
          <v-row class="mb-12" justify="center">
            <v-col cols="12" class="text-center">
              <h2 class="section-title mb-4">{{ headerSection.title }}</h2>
              <p class="header-subtitle">{{ headerSection.subtitle }}</p>
              <div class="header-divider mx-auto mt-6"></div>
            </v-col>
          </v-row>
          <v-row v-if="loading" justify="center" class="my-12">
            <v-col cols="12" class="text-center">
              <v-progress-circular size="64" indeterminate color="primary" class="mb-4" />
              <h3 class="text-h5">Loading blog posts...</h3>
            </v-col>
          </v-row>
          <v-row v-else-if="error" justify="center" class="my-12">
            <v-col cols="12" md="6" class="text-center">
              <v-icon size="64" color="error" class="mb-4">mdi-alert-circle</v-icon>
              <h3 class="text-h5 mb-2">Error Loading Posts</h3>
              <p class="text-body-1 mb-4">{{ error }}</p>
              <v-btn color="primary" @click="loadPosts" prepend-icon="mdi-refresh">
                Try Again
              </v-btn>
            </v-col>
          </v-row>
          <v-row v-else class="blog-grid">
            <v-col v-for="(post, index) in paginatedPosts" :key="post.id" cols="12" md="6" lg="4" class="blog-col">
              <v-card class="blog-card" elevation="0" hover @click="navigateToPost(post)" :style="{ animationDelay: `${index * 0.1}s` }">
                <div class="image-container">
                  <v-img :src="post.image_url" :alt="post.blog_name" height="280" cover class="blog-image">
                    <template #placeholder>
                      <v-row class="fill-height ma-0" align="center" justify="center">
                        <v-progress-circular indeterminate color="primary" />
                      </v-row>
                    </template>
                    <v-chip class="category-chip" :color="getCategoryColor(post.blog_category)" variant="elevated" size="small" label>
                      {{ post.blog_category }}
                    </v-chip>
                    <div class="image-overlay">
                      <v-icon size="32" color="white">mdi-arrow-right</v-icon>
                    </div>
                  </v-img>
                </div>
                <v-card-text class="blog-content pa-6">
                  <div class="meta-info mb-4">
                    <div class="meta-item">
                      <v-icon size="16" class="me-1">mdi-calendar-outline</v-icon>
                      <span>{{ formatDate(post.created_date) }}</span>
                    </div>
                    <div class="meta-item">
                      <v-icon size="16" class="me-1">mdi-clock-outline</v-icon>
                      <span>{{ post.reading_time }} min read</span>
                    </div>
                  </div>
                  <h3 class="blog-title mb-3">{{ post.blog_name }}</h3>
                  <p class="blog-description mb-4">{{ post.short_description }}</p>
                  <div class="tags-section mb-5">
                    <v-chip v-for="tag in post.related_topics.slice(0, 3)" :key="tag" size="small" variant="outlined" class="me-2 mb-1 tag-chip" color="primary">
                      {{ tag }}
                    </v-chip>
                    <v-chip v-if="post.related_topics.length > 3" size="small" variant="text" class="more-tags">
                      +{{ post.related_topics.length - 3 }} more
                    </v-chip>
                  </div>
                  <div class="read-more-section">
                    <v-btn :text="readMoreLabel" color="primary" variant="flat" size="default" block class="read-more-btn" append-icon="mdi-arrow-right" @click.stop="navigateToPost(post)"/>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-row v-if="totalPages > 1" justify="center" class="mt-12">
            <v-col cols="12" class="text-center">
              <div class="simple-pagination">
                <v-btn icon="mdi-chevron-left" :disabled="currentPage === 1" @click="currentPage--; scrollToTop()" class="nav-btn" size="default"/>
                <div class="page-info">
                  <span class="current-page">{{ currentPage }}</span>
                  <span class="page-separator">of</span>
                  <span class="total-pages">{{ totalPages }}</span>
                </div>
                <v-btn icon="mdi-chevron-right" :disabled="currentPage === totalPages" @click="currentPage++; scrollToTop()" class="nav-btn" size="default"/>
              </div>
            </v-col>
          </v-row>
          <v-row v-if="!loading && !error && !paginatedPosts.length" justify="center" class="mt-12">
            <v-col cols="12" md="6" class="text-center">
              <div class="empty-state">
                <v-icon size="64" color="grey-lighten-1" class="mb-4">mdi-post-outline</v-icon>
                <h3 class="text-h5 mb-2 text-grey-darken-1">No blog posts yet</h3>
                <p class="text-grey-darken-1">Please check back soon!</p>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { BlogPost } from '~/composables/useBlogData'

useHead({
  title: 'PPA Blog - Plantation Industry Insights & Best Practices',
  meta: [
    { name: 'description', content: 'Discover the latest insights, SMART agronomic practices, and industry updates from the Proprietary Planters Association of Sri Lanka.' }
  ]
})
const { 
  getAllPosts, 
  loading, 
  error, 
  getCategoryColor, 
  formatDate 
} = useBlogData()
const currentPage = ref<number>(1)
const postsPerPage = ref<number>(6)
const allPosts = ref<BlogPost[]>([])
const headerSection = ref({
  title: 'Our Blog',
  subtitle: 'Empowering Sri Lankan proprietary planters with SMART agronomic practices, industry insights, and sustainable plantation management strategies.'
})
const readMoreLabel = ref('Read More')
const sortedPosts = computed(() => {
  const posts = [...allPosts.value]
  return posts.sort((a, b) => new Date(b.created_date).getTime() - new Date(a.created_date).getTime())
})
const totalPages = computed(() => {
  return Math.ceil(sortedPosts.value.length / postsPerPage.value)
})
const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage.value
  const end = start + postsPerPage.value
  return sortedPosts.value.slice(start, end)
})
const loadPosts = async () => {
  try {
    allPosts.value = await getAllPosts(0, 100)
  } catch (err) {
    console.error('Failed to load posts:', err)
  }
}
const navigateToPost = (post: BlogPost): void => {
  navigateTo(`/blogs/${post.id}`)
}
const scrollToTop = (): void => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
onMounted(() => {
  loadPosts()
})
</script>

<style scoped>
.blog-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f9ff 0%, #dcfce7 100%);
  position: relative;
}
.blog-page::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="0.5" fill="%23000" opacity="0.02"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  pointer-events: none;
}
.blog-listing {
  position: relative;
  z-index: 1;
}
.unified-blog-section {
  background: transparent;
  position: relative;
}
.section-title {
  font-size: 3rem;
  font-weight: 800;
  color: rgb(var(--v-theme-section-title));
  margin-bottom: 0;
  background: linear-gradient(135deg, rgb(var(--v-theme-success)) 0%, rgb(var(--v-theme-primary)) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
}
.header-subtitle {
  font-size: 1.2rem;
  line-height: 1.8;
  color: rgb(var(--v-theme-about-text));
  margin-bottom: 0;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  opacity: 0.85;
  font-weight: 400;
}
.header-divider {
  width: 80px;
  height: 4px;
  background: linear-gradient(135deg, rgb(var(--v-theme-success)) 0%, rgb(var(--v-theme-primary)) 100%);
  border-radius: 2px;
}
.blog-grid {
  perspective: 1000px;
}
.blog-col {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
  transform: translateY(30px);
}
@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.blog-card {
  border-radius: 24px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
  position: relative;
}
.blog-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(var(--v-theme-success), 0.05) 0%, rgba(var(--v-theme-primary), 0.05) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1;
}
.blog-card:hover::before {
  opacity: 1;
}
.blog-card:hover {
  transform: translateY(-12px) scale(1.02);
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.3);
}
.image-container {
  position: relative;
  overflow: hidden;
}
.blog-image {
  transition: transform 0.4s ease;
  border-radius: 24px 24px 0 0;
}
.blog-card:hover .blog-image {
  transform: scale(1.05);
}
.category-chip {
  position: absolute;
  top: 16px;
  left: 16px;
  font-weight: 600;
  color: white !important;
  z-index: 3;
  backdrop-filter: blur(10px);
  border-radius: 12px;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.5px;
}
.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 2;
}
.blog-card:hover .image-overlay {
  opacity: 1;
}
.blog-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 2;
}
.meta-info {
  display: flex;
  gap: 16px;
  opacity: 0.7;
  font-size: 0.875rem;
}
.meta-item {
  display: flex;
  align-items: center;
  color: #64748b;
  font-weight: 500;
}
.blog-title {
  font-size: 1.4rem;
  font-weight: 700;
  line-height: 1.3;
  color: #1e293b !important;
  transition: color 0.3s ease;
  letter-spacing: -0.01em;
}
.blog-card:hover .blog-title {
  color: rgb(var(--v-theme-success)) !important;
}
.blog-description {
  line-height: 1.7;
  flex-grow: 1;
  color: #64748b !important;
  font-size: 0.95rem;
  font-weight: 400;
}
.tags-section {
  margin-top: auto;
}
.tag-chip {
  border-radius: 12px;
  font-weight: 500;
  transition: all 0.3s ease;
  font-size: 0.8rem;
}
.tag-chip:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(var(--v-theme-success), 0.3);
}
.more-tags {
  color: #94a3b8 !important;
  font-size: 0.8rem;
}
.read-more-section {
  margin-top: 20px;
}
.read-more-btn {
  border-radius: 16px;
  font-weight: 600;
  text-transform: none;
  font-size: 0.95rem;
  letter-spacing: 0.02em;
  transition: all 0.3s ease;
  background: linear-gradient(135deg, rgb(var(--v-theme-success)) 0%, rgb(var(--v-theme-primary)) 100%) !important;
  color: white !important;
  box-shadow: 0 4px 15px rgba(var(--v-theme-success), 0.4);
}
.read-more-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(var(--v-theme-success), 0.5);
}
.simple-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 16px 32px;
  border: 1px solid rgba(var(--v-theme-success), 0.1);
  box-shadow: 0 4px 20px rgba(var(--v-theme-success), 0.1);
  display: inline-flex;
}
.nav-btn {
  background: rgba(var(--v-theme-success), 0.1) !important;
  color: rgb(var(--v-theme-primary)) !important;
  border-radius: 12px;
  transition: all 0.3s ease;
}
.nav-btn:hover:not(:disabled) {
  background: rgb(var(--v-theme-success)) !important;
  color: white !important;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(var(--v-theme-success), 0.3);
}
.nav-btn:disabled {
  background: rgba(148, 163, 184, 0.1) !important;
  color: #94a3b8 !important;
  opacity: 0.5;
}
.page-info {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 1rem;
  min-width: 80px;
  justify-content: center;
}
.current-page {
  color: rgb(var(--v-theme-success));
  font-size: 1.1rem;
  font-weight: 700;
}
.page-separator {
  color: #64748b;
  font-weight: 400;
  font-size: 0.9rem;
}
.total-pages {
  color: #64748b;
  font-weight: 500;
}
.empty-state {
  padding: 60px 20px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}
@media (max-width: 960px) {
  .section-title {
    font-size: 2.5rem;
  }
  .header-subtitle {
    font-size: 1.1rem;
    padding: 0 1rem;
  }
  .blog-card {
    border-radius: 20px;
  }
  .blog-card:hover {
    transform: translateY(-8px) scale(1.01);
  }
  .simple-pagination {
    padding: 12px 24px;
    gap: 16px;
  }
}
@media (max-width: 600px) {
  .section-title {
    font-size: 2rem;
  }
  .header-subtitle {
    font-size: 1rem;
  }
  .blog-content {
    padding: 20px !important;
  }
  .meta-info {
    flex-direction: column;
    gap: 8px;
  }
  .blog-title {
    font-size: 1.2rem;
  }
  .unified-blog-section {
    padding-top: 2rem !important;
    padding-bottom: 2rem !important;
  }
  .simple-pagination {
    padding: 10px 20px;
    gap: 12px;
  }
  .page-info {
    min-width: 60px;
    gap: 6px;
  }
}
.blog-card {
  will-change: transform;
  contain: layout style paint;
}
.blog-image {
  will-change: transform;
}
</style>
