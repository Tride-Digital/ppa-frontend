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
    author: 'Insha Asif',
    avatar: 'https://img.freepik.com/premium-photo/young-malay-woman-smiling-portrait_849906-15912.jpg',
    date: '2025-08-16',
    content: 'This value addition approach has transformed our estate operations! We\'ve seen a 35% increase in premium pricing after implementing these processing improvements. The investment pays for itself within the first year.',
    likes: 18
  },
  {
    id: 2,
    author: 'Anwar Hussain',
    avatar: 'https://t4.ftcdn.net/jpg/00/60/02/53/360_F_60025318_jeZht6tkRBhVLYuXNYZE9MPfLZYpWOF5.jpg',
    date: '2025-08-15',
    content: 'As a fellow plantation owner, I can confirm these value creation strategies work. We\'ve successfully expanded into premium export markets using similar approaches. The key is consistent quality and proper certification.',
    likes: 14
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
  background-color: rgb(var(--v-theme-background));
  min-height: 100vh;
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, rgba(11, 76, 26, 0.95), rgba(76, 175, 80, 0.85)),
              url('https://images.unsplash.com/photo-1594736797933-d0d2608c3e74?w=1200&h=600&fit=crop') center/cover;
  min-height: 50vh;
  display: flex;
  align-items: center;
  color: white;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(11, 76, 26, 0.1) 25%, transparent 25%),
              linear-gradient(-45deg, rgba(11, 76, 26, 0.1) 25%, transparent 25%),
              linear-gradient(45deg, transparent 75%, rgba(11, 76, 26, 0.1) 75%),
              linear-gradient(-45deg, transparent 75%, rgba(11, 76, 26, 0.1) 75%);
  background-size: 40px 40px;
  background-position: 0 0, 0 20px, 20px -20px, -20px 0px;
  opacity: 0.2;
}

.hero-overlay {
  background: rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(1px);
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

.back-button {
  font-weight: 600;
  text-transform: none;
  letter-spacing: 0;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.back-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.category-badge {
  font-weight: 600;
  color: rgb(var(--v-theme-on-primary)) !important;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.hero-title {
  font-size: 2.75rem;
  font-weight: 700;
  line-height: 1.2;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  max-width: 800px;
  margin: 0 auto;
  letter-spacing: -0.5px;
}

.meta-chips {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
}

.meta-chips .v-chip {
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  font-weight: 500;
}

.meta-text {
  color: rgb(var(--v-theme-on-surface)) !important;
  font-weight: 500;
}

/* Content Section */
.content-section {
  background: rgb(var(--v-theme-surface));
}

.article-card {
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(76, 175, 80, 0.08);
  transition: all 0.3s ease;
}

.article-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
}

/* Section Headers */
.section-header {
  position: relative;
  margin-bottom: 1.5rem;
}

.section-heading {
  font-size: 1.75rem;
  font-weight: 600;
  color: rgb(var(--v-theme-primary));
  margin-bottom: 0.75rem;
  letter-spacing: -0.25px;
}

.section-divider {
  width: 60px;
  height: 3px;
  background: linear-gradient(135deg, rgb(var(--v-theme-primary)), rgb(var(--v-theme-accent)));
  border-radius: 2px;
}

.section-divider.small {
  width: 40px;
  height: 2px;
}

/* Article Content */
.lead-paragraph {
  font-size: 1.125rem;
  line-height: 1.7;
  color: rgb(var(--v-theme-on-surface));
  margin-bottom: 0;
  font-weight: 400;
  text-align: justify;
}

.main-content-text {
  font-size: 1rem;
  line-height: 1.8;
  color: rgb(var(--v-theme-on-surface));
  margin-bottom: 0;
  text-align: justify;
}

.content-wrapper {
  position: relative;
  padding: 1.5rem;
  background: linear-gradient(135deg, rgba(248, 249, 250, 0.6), rgba(255, 255, 255, 0.8));
  border-radius: 12px;
  border-left: 4px solid rgb(var(--v-theme-accent));
}

/* Featured Image */
.featured-image {
  text-align: center;
}

.image-container {
  position: relative;
  display: inline-block;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.image-container:hover {
  transform: scale(1.01);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.featured-img {
  border-radius: 16px;
  transition: all 0.3s ease;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.3s ease;
}

.image-container:hover .image-overlay {
  opacity: 1;
}

.expand-btn {
  transform: scale(0.9);
  transition: all 0.3s ease;
}

.image-container:hover .expand-btn {
  transform: scale(1);
}

.image-caption {
  font-style: italic;
  color: rgb(var(--v-theme-on-surface));
  opacity: 0.7;
  text-align: center;
  font-size: 0.9rem;
  margin-top: 0.75rem;
}

/* Conclusion */
.conclusion-content {
  font-size: 1rem;
  line-height: 1.7;
  color: rgb(var(--v-theme-on-surface));
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.04), rgba(11, 76, 26, 0.02));
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid rgba(76, 175, 80, 0.08);
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.conclusion-icon {
  flex-shrink: 0;
  margin-top: 0.125rem;
}

.conclusion-text {
  flex: 1;
}

/* Tags */
.tags-section {
  border-top: 1px solid rgba(76, 175, 80, 0.08);
}

.tags-title {
  color: rgb(var(--v-theme-primary));
  font-weight: 600;
  font-size: 1.25rem;
}

.tag-chip {
  transition: all 0.3s ease;
  font-weight: 500;
}

.tag-chip:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Sidebar */
.sidebar {
  position: sticky;
  top: 100px;
}

/* Related Articles */
.related-articles {
  border-radius: 16px;
  border: 1px solid rgba(76, 175, 80, 0.08);
  overflow: hidden;
}

.related-header {
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.04), rgba(11, 76, 26, 0.02));
  border-bottom: 1px solid rgba(76, 175, 80, 0.08);
}

.related-title {
  color: rgb(var(--v-theme-primary));
  font-weight: 600;
  font-size: 1.125rem;
}

.related-article-item {
  cursor: pointer;
  transition: all 0.3s ease;
}

.related-article-item:hover {
  background-color: rgba(76, 175, 80, 0.04);
  transform: translateX(4px);
}

.related-article-item.border-bottom {
  border-bottom: 1px solid rgba(76, 175, 80, 0.08);
}

.article-image-wrapper {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
}

.article-thumb {
  border-radius: 8px;
  transition: all 0.3s ease;
}

.image-overlay-small {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(76, 175, 80, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.3s ease;
}

.related-article-item:hover .image-overlay-small {
  opacity: 1;
}

.related-article-title {
  font-size: 0.9rem;
  font-weight: 500;
  line-height: 1.4;
  color: rgb(var(--v-theme-on-surface));
}

.related-article-meta {
  font-size: 0.8rem;
  color: rgb(var(--v-theme-on-surface));
  opacity: 0.6;
  display: flex;
  align-items: center;
}

/* Comments Section */
.comments-section {
  background: linear-gradient(135deg, rgba(248, 249, 250, 0.6), rgba(255, 255, 255, 0.8));
}

.comments-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.comments-title {
  color: rgb(var(--v-theme-primary));
  font-weight: 600;
  font-size: 1.75rem;
  letter-spacing: -0.25px;
}

.comments-count {
  font-weight: 500;
}

/* Comment Form */
.comment-form {
  border-radius: 16px;
  border: 1px solid rgba(76, 175, 80, 0.08);
  transition: all 0.3s ease;
}

.comment-form:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
}

.form-header {
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.04), rgba(11, 76, 26, 0.02));
  color: rgb(var(--v-theme-primary));
  font-weight: 600;
  font-size: 1.125rem;
}

.submit-btn {
  font-weight: 500;
  text-transform: none;
  letter-spacing: 0.25px;
}

/* Comment Cards */
.comment-card {
  border-radius: 12px;
  border: 1px solid rgba(76, 175, 80, 0.06);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.comment-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(135deg, rgb(var(--v-theme-accent)), rgb(var(--v-theme-primary)));
}

.comment-card:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
}

.comment-author {
  font-weight: 600;
  color: rgb(var(--v-theme-primary));
  font-size: 1rem;
}

.comment-date {
  font-size: 0.8rem;
  color: rgb(var(--v-theme-on-surface));
  opacity: 0.6;
  display: flex;
  align-items: center;
  margin-top: 0.125rem;
}

.comment-content {
  line-height: 1.6;
  color: rgb(var(--v-theme-on-surface));
  font-size: 0.95rem;
}

.comment-actions .v-btn {
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: none;
}

/* Floating Action Buttons */
.back-to-top {
  position: fixed;
  bottom: 80px;
  right: 20px;
  z-index: 1000;
  transition: all 0.3s ease;
}

.back-to-top:hover {
  transform: translateY(-2px) scale(1.05);
}

.share-fab {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  transition: all 0.3s ease;
}

.share-fab:hover {
  transform: translateY(-2px) scale(1.05);
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
    font-size: 1rem;
  }
  
  .meta-chips {
    flex-direction: column;
    align-items: center;
    gap: 6px;
  }
  
  .hero-content {
    min-height: 40vh;
    padding: 1.5rem 0;
  }

  .featured-img {
    height: 250px !important;
  }

  .comments-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .comments-title {
    font-size: 1.5rem;
  }

  .conclusion-content {
    flex-direction: column;
    text-align: center;
    padding: 1.25rem;
  }

  .content-wrapper {
    padding: 1.25rem;
  }

  .back-to-top {
    bottom: 70px;
    right: 16px;
  }

  .share-fab {
    bottom: 16px;
    right: 16px;
  }
}

@media (max-width: 960px) {
  .sidebar {
    position: static;
    margin-top: 2rem;
  }
}

/* Loading Animation */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.article-content > * {
  animation: fadeInUp 0.5s ease-out;
  animation-fill-mode: both;
}

.article-content > *:nth-child(1) { animation-delay: 0.1s; }
.article-content > *:nth-child(2) { animation-delay: 0.15s; }
.article-content > *:nth-child(3) { animation-delay: 0.2s; }
.article-content > *:nth-child(4) { animation-delay: 0.25s; }
.article-content > *:nth-child(5) { animation-delay: 0.3s; }
</style>
