<template>
  <div class="blog-page">
    <!-- Show Blog Details Component when a post is selected -->
    <BlogDetails 
      v-if="showDetails && selectedPost" 
      :blog-post="selectedPost"
      @close="closeDetails"
      @navigate-to-post="handlePostNavigation"
    />
    
    <!-- Show Blog Listing when no post is selected -->
    <div v-else>
      <!-- Unified Blog Section -->
      <section class="unified-blog-section py-8">
        <v-container>
          <!-- Centered Header -->
          <v-row class="mb-8" justify="center">
            <v-col cols="12" class="text-center">
              <h2 class="section-title mb-4">{{ headerSection.title }}</h2>
              <p class="header-subtitle">{{ headerSection.subtitle }}</p>
            </v-col>
          </v-row>

          <!-- Blog Cards Grid -->
          <v-row>
            <v-col
              v-for="post in paginatedPosts"
              :key="post.id"
              cols="12"
              md="6"
              lg="4"
            >
              <v-card
                class="blog-card"
                elevation="4"
                hover
                @click="navigateToPost(post)"
              >
                <!-- Blog Image -->
                <v-img
                  :src="post.image"
                  :alt="post.title"
                  height="250"
                  cover
                  class="blog-image"
                >
                  <template #placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular indeterminate color="primary" />
                    </v-row>
                  </template>
                  
                  <!-- Category Badge -->
                  <v-chip
                    class="category-chip"
                    :color="post.categoryColor"
                    variant="elevated"
                    size="small"
                  >
                    {{ post.category }}
                  </v-chip>
                </v-img>

                <!-- Card Content -->
                <v-card-text class="blog-content pa-4">
                  <!-- Meta Information -->
                  <div class="meta-info mb-3">
                    <v-chip
                      variant="text"
                      size="small"
                      prepend-icon="mdi-calendar"
                      class="me-2 text-grey-darken-1"
                    >
                      {{ formatDate(post.publishDate) }}
                    </v-chip>
                    <v-chip
                      variant="text"
                      size="small"
                      prepend-icon="mdi-clock-outline"
                      class="text-grey-darken-1"
                    >
                      {{ post.readingTime }}
                    </v-chip>
                  </div>

                  <!-- Title -->
                  <h3 class="blog-title mb-3 text-grey-darken-4">{{ post.title }}</h3>

                  <!-- Description -->
                  <p class="blog-description mb-4 text-grey-darken-2">{{ post.description }}</p>

                  <!-- Tags -->
                  <div class="tags-section mb-4">
                    <v-chip
                      v-for="tag in post.tags"
                      :key="tag"
                      size="x-small"
                      variant="outlined"
                      class="me-1 mb-1 text-grey-darken-2"
                      color="primary"
                    >
                      {{ tag }}
                    </v-chip>
                  </div>

                  <!-- Read More Button -->
                  <div class="read-more-section">
                    <v-btn
                      :text="readMoreLabel"
                      color="primary"
                      variant="elevated"
                      size="small"
                      block
                      @click.stop="navigateToPost(post)"
                    />
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <!-- Pagination -->
          <v-row v-if="totalPages > 1" justify="center" class="mt-8">
            <v-col cols="12" class="text-center">
              <v-pagination
                v-model="currentPage"
                :length="totalPages"
                :total-visible="paginationConfig.totalVisible"
                color="primary"
                @update:model-value="scrollToTop"
              />
            </v-col>
          </v-row>
        </v-container>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import BlogDetails from '~/components/BlogDetails.vue'

// SEO Meta
useHead({
  title: 'PPA Blog - Plantation Industry Insights & Best Practices',
  meta: [
    { name: 'description', content: 'Discover the latest insights, SMART agronomic practices, and industry updates from the Proprietary Planters Association of Sri Lanka.' }
  ]
})

// Use the blog data composable
const { getAllPosts, selectPost, closeDetails, selectedPost, showDetails } = useBlogData()

// Reactive Variables
const currentPage = ref<number>(1)

// Configuration
const postsPerPage = ref<number>(6)
const paginationConfig = ref({
  totalVisible: 7
})

// Content Variables
const headerSection = ref({
  title: 'Our Blog',
  subtitle: 'Empowering Sri Lankan proprietary planters with SMART agronomic practices, industry insights, and sustainable plantation management strategies.'
})

const readMoreLabel = ref('Read More')

// Get blog posts from composable
const blogPosts = ref(getAllPosts())

// Simplified sorted posts - just show by newest first
const sortedPosts = computed(() => {
  const posts = [...blogPosts.value]
  return posts.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
})

const totalPages = computed(() => {
  return Math.ceil(sortedPosts.value.length / postsPerPage.value)
})

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage.value
  const end = start + postsPerPage.value
  return sortedPosts.value.slice(start, end)
})

// Methods
const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }
  return new Date(dateString).toLocaleDateString('en-US', options)
}

const navigateToPost = (post: any): void => {
  // Use the composable to select the post and show details
  selectPost(post)
  
  // Scroll to top when showing details
  scrollToTop()
}

const handlePostNavigation = (postId: number): void => {
  // Find the post by ID and navigate to it
  const post = blogPosts.value.find(p => p.id === postId)
  if (post) {
    selectPost(post)
    scrollToTop()
  }
}

const scrollToTop = (): void => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Lifecycle
onMounted(() => {
  // Any initialization logic if needed
})
</script>

<style scoped>
.blog-page {
  min-height: 100vh;
  background-color: rgb(var(--v-theme-background));
}

/* Unified Blog Section */
.unified-blog-section {
  background-color: rgb(var(--v-theme-background));
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: rgb(var(--v-theme-section-title));
  margin-bottom: 0;
}

.header-subtitle {
  font-size: 1.1rem;
  line-height: 1.8;
  color: rgb(var(--v-theme-about-text));
  margin-bottom: 0;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

/* Blog Cards */
.blog-card {
  border-radius: 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: white;
  border: 1px solid #e0e0e0;
}

.blog-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.blog-image {
  position: relative;
  border-radius: 16px 16px 0 0;
}

.category-chip {
  position: absolute;
  top: 12px;
  left: 12px;
  font-weight: 600;
  color: white !important;
}

.blog-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.meta-info {
  opacity: 0.8;
}

.blog-title {
  font-size: 1.3rem;
  font-weight: 600;
  line-height: 1.4;
  color: #212121 !important;
}

.blog-description {
  line-height: 1.6;
  flex-grow: 1;
  color: #616161 !important;
}

.tags-section {
  margin-top: auto;
}

.read-more-section {
  margin-top: 16px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }
  
  .header-subtitle {
    font-size: 1rem;
    padding: 0 1rem;
  }
}
</style>