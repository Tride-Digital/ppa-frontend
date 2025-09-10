<template>
  <div class="blog-detail-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-overlay">
        <v-container>
          <v-row justify="center" align="center" class="hero-content">
            <v-col cols="12" lg="10" xl="8">
              <!-- Back Button -->
              <div class="mb-4">
                <v-btn 
                  variant="elevated" 
                  color="white" 
                  prepend-icon="mdi-arrow-left"
                  @click="$emit('close')"
                  class="back-button"
                >
                  Back to Blog
                </v-btn>
              </div>

              <!-- Category Badge -->
              <v-chip
                :color="blogPost.categoryColor || 'accent'"
                variant="elevated"
                size="large"
                class="category-badge mb-6"
              >
                <v-icon start>mdi-leaf</v-icon>
                {{ blogPost.category }}
              </v-chip>

              <!-- Main Title -->
              <h1 class="hero-title mb-6">{{ blogPost.title }}</h1>

              <!-- Meta Information -->
              <div class="hero-meta">
                <v-row align="center" justify="center" class="mb-4">
                  <v-col cols="auto">
                    <div class="meta-chips">
                      <v-chip variant="elevated" color="white" prepend-icon="mdi-calendar" class="me-3 mb-2">
                        <span class="meta-text">{{ formatDate(blogPost.publishDate) }}</span>
                      </v-chip>
                      <v-chip variant="elevated" color="white" prepend-icon="mdi-clock-outline" class="me-3 mb-2">
                        <span class="meta-text">{{ blogPost.readingTime }}</span>
                      </v-chip>
                      <v-chip variant="elevated" color="white" prepend-icon="mdi-eye-outline" class="mb-2">
                        <span class="meta-text">{{ blogPost.views }} views</span>
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
            <v-card class="article-card" elevation="4">
              <v-card-text class="pa-6">
                <article class="article-content">
                  <!-- Introduction -->
                  <div class="content-section mb-8">
                    <div class="section-header mb-4">
                      <h2 class="section-heading">Introduction</h2>
                      <div class="section-divider"></div>
                    </div>
                    <p class="lead-paragraph">{{ blogPost.introduction }}</p>
                  </div>

                  <!-- Featured Image -->
                  <div class="featured-image mb-8">
                    <div class="image-container">
                      <v-img
                        :src="blogPost.featuredImage || blogPost.image"
                        :alt="blogPost.title"
                        cover
                        class="featured-img"
                        height="350"
                        :lazy-src="getPlaceholderImage()"
                        @error="handleImageError"
                      >
                        <template v-slot:placeholder>
                          <div class="d-flex align-center justify-center fill-height">
                            <v-progress-circular
                              color="grey-lighten-4"
                              indeterminate
                            ></v-progress-circular>
                          </div>
                        </template>
                      </v-img>
                      <div class="image-overlay">
                        <v-btn
                          icon
                          variant="elevated"
                          color="white"
                          class="expand-btn"
                          @click="openImageModal"
                        >
                          <v-icon>mdi-magnify-plus</v-icon>
                        </v-btn>
                      </div>
                    </div>
                    <p class="image-caption mt-3">{{ blogPost.imageCaption || 'Featured image for ' + blogPost.title }}</p>
                  </div>

                  <!-- Main Content -->
                  <div class="main-content-section mb-8">
                    <div class="content-wrapper">
                      <p class="main-content-text">{{ blogPost.mainContent }}</p>
                    </div>
                  </div>

                  <!-- Conclusion -->
                  <div class="content-section mb-6">
                    <div class="section-header mb-4">
                      <h2 class="section-heading">Conclusion</h2>
                      <div class="section-divider"></div>
                    </div>
                    <div class="conclusion-content">
                      <v-icon class="conclusion-icon" color="accent">mdi-lightbulb-on</v-icon>
                      <div class="conclusion-text">{{ blogPost.conclusion }}</div>
                    </div>
                  </div>

                  <!-- Tags -->
                  <div class="tags-section mt-8 pt-6">
                    <div class="section-header mb-4">
                      <h3 class="tags-title">Related Topics</h3>
                      <div class="section-divider small"></div>
                    </div>
                    <div class="tags-container">
                      <v-chip
                        v-for="tag in blogPost.tags"
                        :key="tag"
                        color="primary"
                        variant="outlined"
                        class="tag-chip me-2 mb-2"
                        prepend-icon="mdi-tag"
                      >
                        {{ tag }}
                      </v-chip>
                    </div>
                  </div>
                </article>
              </v-card-text>
            </v-card>
          </v-col>

          <!-- Sidebar -->
          <v-col cols="12" lg="4" xl="4">
            <div class="sidebar">
              <!-- Related Articles -->
              <v-card class="related-articles" elevation="4">
                <v-card-title class="related-header pa-4">
                  <v-icon class="me-2" color="primary">mdi-file-document-multiple</v-icon>
                  <span class="related-title">Related Articles</span>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text class="pa-0">
                  <v-list class="related-list">
                    <v-list-item
                      v-for="(article, index) in relatedArticles"
                      :key="article.id"
                      @click="navigateToPost(article.id)"
                      class="related-article-item pa-3"
                      :class="{ 'border-bottom': index < relatedArticles.length - 1 }"
                    >
                      <template #prepend>
                        <div class="article-image-wrapper me-3">
                          <v-img
                            :src="article.featuredImage || article.image"
                            width="64"
                            height="64"
                            cover
                            class="article-thumb"
                            :lazy-src="getPlaceholderImage()"
                            @error="handleRelatedImageError"
                          >
                            <template v-slot:placeholder>
                              <div class="d-flex align-center justify-center fill-height">
                                <v-progress-circular
                                  size="20"
                                  color="grey-lighten-4"
                                  indeterminate
                                ></v-progress-circular>
                              </div>
                            </template>
                          </v-img>
                          <div class="image-overlay-small">
                            <v-icon color="white" size="small">mdi-arrow-right</v-icon>
                          </div>
                        </div>
                      </template>
                      <div class="article-content">
                        <v-list-item-title class="related-article-title mb-1">
                          {{ article.title }}
                        </v-list-item-title>
                        <v-list-item-subtitle class="related-article-meta">
                          <v-icon size="small" class="me-1">mdi-calendar</v-icon>
                          {{ formatDate(article.publishDate) }}
                          <span class="mx-2">•</span>
                          <v-icon size="small" class="me-1">mdi-clock</v-icon>
                          {{ article.readingTime }}
                        </v-list-item-subtitle>
                      </div>
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
    <section class="comments-section py-8">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" lg="8" xl="8">
            <div class="comments-header mb-6">
              <h2 class="comments-title">Discussion</h2>
              <v-chip color="accent" variant="elevated" class="comments-count">
                {{ comments.length }} {{ comments.length === 1 ? 'Comment' : 'Comments' }}
              </v-chip>
            </div>
            
            <!-- Comment Form -->
            <v-card class="comment-form mb-6" elevation="4">
              <v-card-title class="form-header pa-4">
                <v-icon class="me-2" color="primary">mdi-comment-plus</v-icon>
                <span>Join the Discussion</span>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text class="pa-4">
                <v-textarea
                  v-model="newComment"
                  label="Share your thoughts and insights..."
                  variant="outlined"
                  rows="3"
                  class="mb-4"
                  hide-details
                  bg-color="background"
                />
                <div class="d-flex justify-end">
                  <v-btn 
                    color="primary" 
                    @click="addComment"
                    variant="elevated"
                    class="submit-btn"
                    :disabled="!newComment.trim()"
                  >
                    <v-icon start>mdi-send</v-icon>
                    Post Comment
                  </v-btn>
                </div>
              </v-card-text>
            </v-card>

            <!-- Comments List -->
            <div class="comments-list">
              <v-card
                v-for="(comment, index) in comments"
                :key="comment.id"
                class="comment-card mb-4"
                elevation="2"
              >
                <v-card-text class="pa-4">
                  <div class="comment-header mb-3">
                    <div class="d-flex align-center">
                      <v-avatar size="45" class="me-3">
                        <v-img 
                          :src="comment.avatar" 
                          :alt="comment.author"
                          :lazy-src="getPlaceholderAvatar()"
                        >
                          <template v-slot:placeholder>
                            <v-icon size="30">mdi-account</v-icon>
                          </template>
                        </v-img>
                      </v-avatar>
                      <div class="comment-meta flex-grow-1">
                        <div class="comment-author">{{ comment.author }}</div>
                        <div class="comment-date">
                          <v-icon size="small" class="me-1">mdi-clock-outline</v-icon>
                          {{ formatDate(comment.date) }}
                        </div>
                      </div>
                      <v-menu>
                        <template #activator="{ props }">
                          <v-btn
                            icon
                            variant="text"
                            size="small"
                            v-bind="props"
                          >
                            <v-icon>mdi-dots-vertical</v-icon>
                          </v-btn>
                        </template>
                        <v-list>
                          <v-list-item @click="reportComment(comment.id)">
                            <v-list-item-title>Report</v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </div>
                  </div>
                  <div class="comment-content mb-3">{{ comment.content }}</div>
                  <div class="comment-actions">
                    <v-btn 
                      variant="text" 
                      size="small" 
                      color="primary" 
                      class="me-2"
                      @click="likeComment(comment.id)"
                    >
                      <v-icon start size="small">mdi-thumb-up</v-icon>
                      {{ comment.likes }}
                    </v-btn>
                    <v-btn 
                      variant="text" 
                      size="small" 
                      color="primary" 
                      class="me-2"
                      @click="replyToComment(comment.id)"
                    >
                      <v-icon start size="small">mdi-reply</v-icon>
                      Reply
                    </v-btn>
                    <v-btn 
                      variant="text" 
                      size="small" 
                      color="primary"
                      @click="shareComment(comment.id)"
                    >
                      <v-icon start size="small">mdi-share</v-icon>
                      Share
                    </v-btn>
                  </div>
                </v-card-text>
              </v-card>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Image Modal -->
    <v-dialog v-model="showImageModal" max-width="90vw" max-height="90vh">
      <v-card>
        <v-card-actions class="justify-end pa-2">
          <v-btn icon @click="showImageModal = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-actions>
        <v-card-text class="pa-0">
          <v-img
            :src="blogPost.featuredImage || blogPost.image"
            :alt="blogPost.title"
            contain
            max-height="80vh"
          />
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Back to Top Button -->
    <v-btn
      v-show="showBackToTop"
      class="back-to-top"
      color="primary"
      icon
      elevation="4"
      @click="scrollToTop"
    >
      <v-icon>mdi-arrow-up</v-icon>
    </v-btn>

    <!-- Share FAB -->
    <v-btn
      class="share-fab"
      color="accent"
      icon
      elevation="4"
      @click="sharePost"
    >
      <v-icon>mdi-share-variant</v-icon>
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useBlogData } from '~/composables/useBlogData'

// Types
interface Comment {
  id: number
  author: string
  avatar: string
  date: string
  content: string
  likes: number
}

// Props
interface Props {
  blogPost: any // This should be BlogPost type from your composable
}

const props = defineProps<Props>()

// Emits
const emit = defineEmits<{
  close: []
  navigateToPost: [postId: number]
}>()

// Use the composable for related posts
const { getRelatedPosts } = useBlogData()

// Reactive Variables
const newComment = ref('')
const showBackToTop = ref(false)
const showImageModal = ref(false)

// Related articles
const relatedArticles = computed(() => {
  return getRelatedPosts(props.blogPost.id, 3)
})

// Sample comments
const comments = ref<Comment[]>([
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
const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }
  return new Date(dateString).toLocaleDateString('en-US', options)
}

const navigateToPost = (postId: number): void => {
  emit('navigateToPost', postId)
}

const scrollToTop = (): void => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const addComment = (): void => {
  if (newComment.value.trim()) {
    const comment: Comment = {
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

const handleScroll = (): void => {
  showBackToTop.value = window.scrollY > 300
}

// Image handling functions
const getPlaceholderImage = (): string => {
  return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+'
}

const getPlaceholderAvatar = (): string => {
  return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDUiIGhlaWdodD0iNDUiIHZpZXdCb3g9IjAgMCA0NSA0NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMi41IiBjeT0iMjIuNSIgcj0iMjIuNSIgZmlsbD0iI2VlZSIvPjxjaXJjbGUgY3g9IjIyLjUiIGN5PSIxOCIgcj0iNyIgZmlsbD0iI2NjYyIvPjxwYXRoIGQ9Im0xMCAzNWMwLTctNS41LTEyLjUtMTIuNS0xMi41czEyLjUgNS41IDEyLjUgMTIuNSIgZmlsbD0iI2NjYyIvPjwvc3ZnPg=='
}

const handleImageError = (error: string | undefined): void => {
  // When image fails to load, use placeholder
  const imgElement = document.querySelector('.featured-img') as HTMLImageElement
  if (imgElement) {
    imgElement.src = getPlaceholderImage()
  }
}

const handleRelatedImageError = (error: string | undefined): void => {
  const imgElements = document.querySelectorAll('.article-thumb') as NodeListOf<HTMLImageElement>
  imgElements.forEach(img => {
    if (img.src === window.location.href) {
      img.src = getPlaceholderImage()
    }
  })
}

const openImageModal = (): void => {
  showImageModal.value = true
}

const sharePost = (): void => {
  if (navigator.share) {
    navigator.share({
      title: props.blogPost.title,
      text: props.blogPost.description,
      url: window.location.href
    })
  } else {
    // Fallback for browsers that don't support Web Share API
    navigator.clipboard.writeText(window.location.href)
  }
}

const likeComment = (commentId: number): void => {
  const comment = comments.value.find(c => c.id === commentId)
  if (comment) {
    comment.likes++
  }
}

const replyToComment = (commentId: number): void => {
  console.log('Reply to comment:', commentId)
  // Implement reply functionality
}

const shareComment = (commentId: number): void => {
  console.log('Share comment:', commentId)
  // Implement comment sharing functionality
}

const reportComment = (commentId: number): void => {
  console.log('Report comment:', commentId)
  // Implement report functionality
}

// Lifecycle
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  
  // Update page title with dynamic content
  if (typeof useHead === 'function') {
    useHead({
      title: `${props.blogPost.title} - PPA Blog`,
      meta: [
        { name: 'description', content: props.blogPost.description }
      ]
    })
  } else {
    // Fallback if useHead is not available
    document.title = `${props.blogPost.title} - PPA Blog`
  }
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
  width: 100%;
  max-width: 100%;
}

.image-container:hover {
  transform: scale(1.01);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.featured-img {
  border-radius: 16px;
  transition: all 0.3s ease;
  width: 100%;
  object-fit: cover;
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
  object-fit: cover;
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

  .image-container {
    width: 100%;
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

/* Image loading states */
.v-img--loading {
  background-color: #f5f5f5;
}

.v-img--error {
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Ensure images are responsive */
.featured-img,
.article-thumb {
  max-width: 100%;
  height: auto;
}

/* Fix for v-img aspect ratio */
.featured-image .v-img {
  width: 100%;
  max-width: 100%;
}

/* Image modal styles */
.v-dialog .v-card {
  border-radius: 12px;
  overflow: hidden;
}

.v-dialog .v-img {
  max-height: 80vh;
  width: 100%;
  object-fit: contain;
}
</style>