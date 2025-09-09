<template>
  <div v-if="blogPost">
    <!-- Modern Tech Blog Detail Page -->
    <div class="blog-detail-page tech-theme">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-overlay">
          <v-container>
            <v-row justify="center" align="center" class="hero-content">
              <v-col cols="12" lg="10" xl="8">
                <!-- Back Button -->
                <div class="mb-4">
                  <v-btn 
                    variant="text" 
                    color="white" 
                    prepend-icon="mdi-arrow-left"
                    @click="goBack"
                    class="back-button"
                  >
                    Back to Home
                  </v-btn>
                </div>

                <!-- Category Badge -->
                <v-chip
                  :color="blogPost.categoryColor"
                  variant="elevated"
                  size="large"
                  class="category-badge mb-6"
                >
                  <v-icon start>mdi-cog</v-icon>
                  {{ blogPost.category }}
                </v-chip>

                <!-- Main Title -->
                <h1 class="hero-title mb-6">{{ blogPost.title }}</h1>

                <!-- Meta Information -->
                <div class="hero-meta">
                  <v-row align="center" justify="center" class="mb-4">
                    <v-col cols="auto">
                      <div class="meta-chips">
                        <v-chip variant="text" color="white" prepend-icon="mdi-calendar" class="me-3">
                          {{ formatDate(blogPost.publishDate) }}
                        </v-chip>
                        <v-chip variant="text" color="white" prepend-icon="mdi-clock-outline" class="me-3">
                          {{ blogPost.readingTime }}
                        </v-chip>
                        <v-chip variant="text" color="white" prepend-icon="mdi-eye-outline">
                          {{ blogPost.views }} views
                        </v-chip>
                      </div>
                    </v-col>
                  </v-row>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </section>

      <!-- Main Content -->
      <section class="content-section py-8">
        <v-container>
          <v-row justify="center">
            <!-- Main Article Content -->
            <v-col cols="12" lg="8" xl="8">
              <article class="article-content">
                <!-- Introduction -->
                <div class="content-section mb-8">
                  <h2 class="section-heading mb-4">Introduction</h2>
                  <p class="lead-paragraph">{{ blogPost.introduction }}</p>
                </div>

                <!-- Featured Image -->
                <div class="featured-image mb-6">
                  <v-img
                    :src="blogPost.featuredImage"
                    :alt="blogPost.title"
                    cover
                    class="rounded-lg"
                    height="400"
                  />
                  <p class="image-caption mt-3">{{ blogPost.imageCaption }}</p>
                </div>

                <!-- Tech Category Badge -->
                <div class="tech-category-section mb-6">
                  <v-chip
                    color="primary"
                    variant="outlined"
                    size="large"
                    prepend-icon="mdi-chip"
                  >
                    {{ blogPost.techCategory }}
                  </v-chip>
                </div>

                <!-- Main Content -->
                <div class="main-content-section mb-8">
                  <p class="main-content-text">{{ blogPost.mainContent }}</p>
                </div>

                <!-- Conclusion -->
                <div class="content-section mb-8">
                  <h2 class="section-heading mb-4">Conclusion</h2>
                  <div class="conclusion-content">
                    {{ blogPost.conclusion }}
                  </div>
                </div>

                <!-- Tags -->
                <div class="tags-section mt-8 pt-6">
                  <h3 class="tags-title mb-4">Technology Topics</h3>
                  <div class="tags-container">
                    <v-chip
                      v-for="tag in blogPost.tags"
                      :key="tag"
                      color="primary"
                      variant="outlined"
                      size="large"
                      class="me-2 mb-2"
                    >
                      {{ tag }}
                    </v-chip>
                  </div>
                </div>
              </article>
            </v-col>

            <!-- Sidebar -->
            <v-col cols="12" lg="4" xl="4">
              <div class="sidebar">
                <!-- Related Articles -->
                <v-card class="related-articles mb-6" elevation="3">
                  <v-card-title class="related-title">
                    <v-icon class="me-2">mdi-cpu-64-bit</v-icon>
                    Related Technologies
                  </v-card-title>
                  <v-card-text class="pa-0">
                    <v-list>
                      <v-list-item
                        v-for="article in relatedArticles"
                        :key="article.id"
                        @click="navigateToPost(article.id)"
                        class="related-article-item"
                      >
                        <template #prepend>
                          <v-img
                            :src="article.featuredImage"
                            width="70"
                            height="70"
                            cover
                            class="rounded me-3"
                          />
                        </template>
                        <v-list-item-title class="related-article-title">
                          {{ article.title }}
                        </v-list-item-title>
                        <v-list-item-subtitle class="related-article-meta">
                          {{ formatDate(article.publishDate) }} • {{ article.readingTime }}
                        </v-list-item-subtitle>
                      </v-list-item>
                    </v-list>
                  </v-card-text>
                </v-card>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <!-- Comments Section -->
      <section class="comments-section py-8 bg-grey-lighten-5">
        <v-container>
          <v-row justify="center">
            <v-col cols="12" lg="8" xl="8">
              <h2 class="comments-title mb-6">Tech Discussion ({{ comments.length }})</h2>
              
              <!-- Comment Form -->
              <v-card class="comment-form mb-6" elevation="2">
                <v-card-title>
                  <v-icon class="me-2">mdi-comment-plus</v-icon>
                  Share Your Tech Experience
                </v-card-title>
                <v-card-text>
                  <v-textarea
                    v-model="newComment"
                    label="Share your experience with this technology..."
                    variant="outlined"
                    rows="4"
                    class="mb-4"
                  />
                  <div class="d-flex justify-end">
                    <v-btn color="primary" @click="addComment">
                      <v-icon start>mdi-send</v-icon>
                      Post Comment
                    </v-btn>
                  </div>
                </v-card-text>
              </v-card>

              <!-- Comments List -->
              <div class="comments-list">
                <v-card
                  v-for="comment in comments"
                  :key="comment.id"
                  class="comment-card mb-4"
                  elevation="2"
                >
                  <v-card-text>
                    <div class="comment-header mb-3">
                      <v-avatar size="45" class="me-3">
                        <v-img :src="comment.avatar" :alt="comment.author" />
                      </v-avatar>
                      <div class="comment-meta">
                        <div class="comment-author">{{ comment.author }}</div>
                        <div class="comment-date text-grey-darken-1">{{ formatDate(comment.date) }}</div>
                      </div>
                    </div>
                    <div class="comment-content">{{ comment.content }}</div>
                    <div class="comment-actions mt-3">
                      <v-btn variant="text" size="small" color="primary">
                        <v-icon start>mdi-thumb-up</v-icon>
                        {{ comment.likes }}
                      </v-btn>
                      <v-btn variant="text" size="small" color="primary" class="ms-2">
                        <v-icon start>mdi-reply</v-icon>
                        Reply
                      </v-btn>
                    </div>
                  </v-card-text>
                </v-card>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <!-- Back to Top Button -->
      <v-btn
        v-show="showBackToTop"
        class="back-to-top"
        color="primary"
        size="large"
        icon
        elevation="6"
        @click="scrollToTop"
      >
        <v-icon>mdi-arrow-up</v-icon>
      </v-btn>
    </div>
  </div>
  
  <!-- Loading State -->
  <div v-else-if="pending" class="loading-container">
    <v-container class="d-flex justify-center align-center" style="min-height: 50vh;">
      <v-progress-circular
        indeterminate
        size="64"
        color="primary"
      />
      <span class="ml-4">Loading technology article...</span>
    </v-container>
  </div>

  <!-- Error State -->
  <div v-else class="error-container">
    <v-container class="text-center" style="min-height: 50vh;">
      <v-icon size="64" color="error" class="mb-4">mdi-alert-circle</v-icon>
      <h2 class="mb-4">Technology Article Not Found</h2>
      <p class="mb-6">The technology article you're looking for doesn't exist or has been removed.</p>
      <v-btn color="primary" @click="goBack">
        <v-icon start>mdi-arrow-left</v-icon>
        Go Back
      </v-btn>
    </v-container>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Get route parameters
const route = useRoute()
const router = useRouter()

// Use the MODERN TECH store
const { getPostById, getRelatedPosts } = useModernTechStore()

// Get blog post ID from route params
const postId = computed(() => parseInt(route.params.id))

// Get blog post data
const blogPost = ref(null)
const pending = ref(true)

// Load blog post on component mount
onMounted(async () => {
  try {
    const post = getPostById(postId.value)
    if (post) {
      blogPost.value = post
      
      // Update page meta
      useHead({
        title: `${post.title} - Modern Technology | PPA Blog`,
        meta: [
          { name: 'description', content: post.description || post.introduction }
        ]
      })
    }
  } catch (error) {
    console.error('Error loading modern tech post:', error)
  } finally {
    pending.value = false
  }
})

// Reactive Variables
const newComment = ref('')
const showBackToTop = ref(false)

// Related articles
const relatedArticles = computed(() => {
  if (!blogPost.value) return []
  return getRelatedPosts(blogPost.value.id, 3)
})

// Sample comments for tech discussions
const comments = ref([
  {
    id: 1,
    author: 'Sunil Perera',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=45&h=45&fit=crop&crop=face',
    date: '2025-08-16',
    content: 'We implemented this technology on our estate last month and the results are impressive! The automation has reduced our processing time by 40% while maintaining consistent quality. Highly recommend this approach.',
    likes: 15
  },
  {
    id: 2,
    author: 'Nimal Silva',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=45&h=45&fit=crop&crop=face',
    date: '2025-08-15',
    content: 'The technical specifications mentioned here align perfectly with our experience. The ROI calculation is spot-on - we recovered our investment within 8 months.',
    likes: 11
  }
])

// Methods
const formatDate = (dateString) => {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }
  return new Date(dateString).toLocaleDateString('en-US', options)
}

const navigateToPost = async (postId) => {
  try {
    await router.push(`/blog/tech/${postId}`)
  } catch (error) {
    console.error('Navigation error:', error)
  }
}

const goBack = () => {
  // Try to go back in history, fallback to home page
  if (window.history.length > 1) {
    router.go(-1)
  } else {
    router.push('/')
  }
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const addComment = () => {
  if (newComment.value.trim()) {
    const comment = {
      id: comments.value.length + 1,
      author: 'Guest User',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=45&h=45&fit=crop&crop=face',
      date: new Date().toISOString().split('T')[0],
      content: newComment.value,
      likes: 0
    }
    comments.value.unshift(comment)
    newComment.value = ''
  }
}

const handleScroll = () => {
  showBackToTop.value = window.scrollY > 300
}

// Lifecycle
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.blog-detail-page {
  background-color: #ffffff;
  min-height: 100vh;
}

.tech-theme .hero-section {
  background: linear-gradient(135deg, rgba(33, 150, 243, 0.9), rgba(25, 118, 210, 0.9)),
              url('https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=600&fit=crop') center/cover;
}

.loading-container,
.error-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Back Button */
.back-button {
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.1) !important;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Hero Section */
.hero-section {
  min-height: 50vh;
  display: flex;
  align-items: center;
  color: white;
  position: relative;
}

.hero-overlay {
  background: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.hero-section .v-container {
  position: relative;
  z-index: 2;
}

.hero-content {
  min-height: 50vh;
  text-align: center;
}

.category-badge {
  font-weight: 600;
  color: white !important;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.2;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  max-width: 800px;
  margin: 0 auto;
}

.meta-chips .v-chip {
  background: rgba(255, 255, 255, 0.15) !important;
  backdrop-filter: blur(10px);
  font-size: 0.95rem;
}

/* Content Section */
.content-section {
  background: white;
}

/* Article Content */
.article-content {
  max-width: 100%;
}

.lead-paragraph {
  font-size: 1.25rem;
  line-height: 1.8;
  color: #424242;
  margin-bottom: 0;
  font-weight: 400;
}

.featured-image {
  text-align: center;
}

.featured-image .v-img {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.image-caption {
  font-style: italic;
  color: #666;
  text-align: center;
  font-size: 0.9rem;
}

.tech-category-section {
  text-align: center;
}

.section-heading {
  font-size: 2rem;
  font-weight: 600;
  color: #1976d2;
  border-bottom: 3px solid #2196f3;
  padding-bottom: 10px;
  margin-bottom: 1.5rem;
}

.main-content-text {
  font-size: 1.15rem;
  line-height: 1.8;
  color: #424242;
  margin-bottom: 0;
}

/* Conclusion */
.conclusion-content {
  font-size: 1.15rem;
  line-height: 1.8;
  color: #424242;
  background: #e3f2fd;
  padding: 2rem;
  border-radius: 12px;
  border-left: 4px solid #2196f3;
}

/* Tags Section */
.tags-section {
  border-top: 1px solid #e0e0e0;
}

.tags-title {
  color: #424242;
  font-weight: 600;
}

/* Sidebar */
.sidebar {
  position: sticky;
  top: 20px;
}

/* Related Articles */
.related-articles {
  border-radius: 16px;
}

.related-title {
  color: #1976d2;
  font-weight: 600;
}

.related-article-item {
  cursor: pointer;
  transition: background-color 0.2s;
  padding: 16px;
}

.related-article-item:hover {
  background-color: #f5f5f5;
}

.related-article-title {
  font-size: 0.95rem;
  font-weight: 500;
  line-height: 1.3;
}

.related-article-meta {
  font-size: 0.8rem;
}

/* Comments Section */
.comments-section {
  background: #f8f9fa;
}

.comments-title {
  color: #1976d2;
  font-weight: 600;
}

.comment-form {
  border-radius: 12px;
}

.comment-card {
  border-radius: 12px;
  border-left: 3px solid #2196f3;
}

.comment-header {
  display: flex;
  align-items: center;
}

.comment-meta {
  flex-grow: 1;
}

.comment-author {
  font-weight: 600;
  color: #424242;
}

.comment-date {
  font-size: 0.85rem;
}

.comment-content {
  line-height: 1.6;
  color: #424242;
}

.comment-actions .v-btn {
  font-size: 0.85rem;
}

/* Back to Top */
.back-to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .section-heading {
    font-size: 1.5rem;
  }
  
  .lead-paragraph,
  .main-content-text {
    font-size: 1.1rem;
  }
  
  .meta-chips {
    flex-wrap: wrap;
    gap: 8px;
  }
  
  .hero-content {
    min-height: 40vh;
    padding: 2rem 0;
  }

  .featured-image .v-img {
    height: 250px !important;
  }
}

@media (max-width: 960px) {
  .sidebar {
    position: static;
    margin-top: 3rem;
  }
}
</style>