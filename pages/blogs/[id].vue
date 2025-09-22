<template>
  <div v-if="blogPost" class="blog-detail-page">
    <section class="hero-section">
      <div class="hero-overlay">
        <v-container>
          <v-row justify="center" align="center" class="hero-content">
            <v-col cols="12" lg="10" xl="8">
              <div class="mb-4">
                <v-btn variant="elevated" color="white" prepend-icon="mdi-arrow-left" @click="navigateBack" class="back-button">
                  Back to Blog
                </v-btn>
              </div>
              <v-chip :color="getCategoryColor(blogPost.blog_category)" variant="elevated" size="large" class="category-badge mb-6">
                <v-icon start>mdi-leaf</v-icon>
                {{ blogPost.blog_category }}
              </v-chip>
              <h1 class="hero-title mb-6">{{ blogPost.blog_name }}</h1>
              <div class="hero-meta">
                <v-row align="center" justify="center" class="mb-4">
                  <v-col cols="auto">
                    <div class="meta-chips">
                      <v-chip variant="elevated" color="white" prepend-icon="mdi-calendar" class="me-3 mb-2">
                        <span class="meta-text">{{ formatDate(blogPost.created_date) }}</span>
                      </v-chip>
                      <v-chip variant="elevated" color="white" prepend-icon="mdi-clock-outline" class="me-3 mb-2">
                        <span class="meta-text">{{ blogPost.reading_time }} min read</span>
                      </v-chip>
                      <v-chip variant="elevated" color="white" prepend-icon="mdi-eye-outline" class="mb-2">
                        <span class="meta-text">{{ blogPost.description?.view_count || 0 }} views</span>
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
    <section class="content-section py-8">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" lg="8" xl="8">
            <v-card class="article-card" elevation="4">
              <v-card-text class="pa-6">
                <article class="article-content">
                  <div class="content-section mb-8">
                    <div class="section-header mb-4">
                      <h2 class="section-heading">Introduction</h2>
                      <div class="section-divider"></div>
                    </div>
                    <p class="lead-paragraph" v-html="blogPost.description?.introduction"></p>
                  </div>
                  <div class="featured-image mb-8">
                    <div class="image-container">
                      <v-img :src="blogPost.image_url" :alt="blogPost.blog_name" cover class="featured-img" height="350">
                        <template v-slot:placeholder>
                          <div class="d-flex align-center justify-center fill-height">
                            <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                          </div>
                        </template>
                      </v-img>
                    </div>
                    <p class="image-caption mt-3" v-html="formatTextWithLineBreaks(blogPost.description?.image_caption)"></p>
                  </div>
                  <div class="main-content-section mb-8">
                    <div class="content-wrapper">
                      <p class="main-content-text" v-html="formatTextWithLineBreaks(blogPost.description?.main_content)"></p>
                    </div>
                  </div>
                  <div class="content-section mb-6">
                    <div class="section-header mb-4">
                      <h2 class="section-heading">Conclusion</h2>
                      <div class="section-divider"></div>
                    </div>
                    <div class="conclusion-content">
                      <v-icon class="conclusion-icon" color="accent">mdi-lightbulb-on</v-icon>
                      <div class="conclusion-text" v-html="formatTextWithLineBreaks(blogPost.description?.conclusion)"></div>
                    </div>
                  </div>
                  <div class="tags-section mt-8 pt-6">
                    <div class="section-header mb-4">
                      <h3 class="tags-title">Related Topics</h3>
                      <div class="section-divider small"></div>
                    </div>
                    <div class="tags-container">
                      <v-chip v-for="tag in blogPost.related_topics" :key="tag" color="primary" variant="outlined" class="tag-chip me-2 mb-2" prepend-icon="mdi-tag">
                        {{ tag }}
                      </v-chip>
                    </div>
                  </div>
                </article>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" lg="4" xl="4">
            <div class="sidebar">
              <v-card class="related-articles" elevation="4" v-if="relatedArticles.length">
                <v-card-title class="related-header pa-4">
                  <v-icon class="me-2" color="primary">mdi-file-document-multiple</v-icon>
                  <span class="related-title">Related Articles</span>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text class="pa-0">
                  <v-list class="related-list">
                    <v-list-item v-for="(article, index) in relatedArticles" :key="article.id" @click="navigateToPost(article.id)" class="related-article-item pa-3">
                      <template #prepend>
                        <div class="article-image-wrapper me-3">
                          <v-img :src="article.image_url" width="64" height="64" cover class="article-thumb">
                            <template v-slot:placeholder>
                              <div class="d-flex align-center justify-center fill-height">
                                <v-progress-circular size="20" color="grey-lighten-4" indeterminate></v-progress-circular>
                              </div>
                            </template>
                          </v-img>
                        </div>
                      </template>
                      <div class="article-content">
                        <v-list-item-title class="related-article-title mb-1">
                          {{ article.name }}
                        </v-list-item-title>
                        <v-list-item-subtitle class="related-article-meta">
                          <v-icon size="small" class="me-1">mdi-calendar</v-icon>
                          {{ formatDate(article.created_date) }}
                          <span class="mx-2">•</span>
                          <v-icon size="small" class="me-1">mdi-clock</v-icon>
                          {{ article.reading_time }} min read
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
            <v-card class="comment-form mb-6" elevation="4">
              <v-card-title class="form-header pa-4">
                <v-icon class="me-2" color="primary">mdi-comment-plus</v-icon>
                <span>Join the Discussion</span>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text class="pa-4">
                <v-text-field v-model="newCommentAuthor" label="Your Name" variant="outlined" class="mb-4" />
                <v-textarea v-model="newCommentText" label="Share your thoughts and insights..." variant="outlined" rows="3" class="mb-4" />
                <div class="d-flex justify-end">
                  <v-btn color="primary" @click="submitComment" variant="elevated" class="submit-btn" :loading="commentLoading" :disabled="!newCommentText.trim() || !newCommentAuthor.trim()">
                    <v-icon start>mdi-send</v-icon>
                    Post Comment
                  </v-btn>
                </div>
              </v-card-text>
            </v-card>
            <div class="comments-list">
              <v-card v-for="comment in comments" :key="comment.id" class="comment-card mb-4" elevation="2">
                <v-card-text class="pa-4">
                  <div class="comment-header mb-3">
                    <div class="d-flex align-center">
                      <v-avatar size="45" class="me-3">
                        <v-icon size="30">mdi-account</v-icon>
                      </v-avatar>
                      <div class="comment-meta flex-grow-1">
                        <div class="comment-author">{{ comment.user_name }}</div>
                        <div class="comment-date">
                          <v-icon size="small" class="me-1">mdi-clock-outline</v-icon>
                          {{ formatDate(comment.created_at) }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="comment-content mb-3">{{ comment.comment }}</div>
                </v-card-text>
              </v-card>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
  <div v-else-if="loading" class="loading-container">
    <v-container>
      <v-row justify="center" align="center" style="min-height: 60vh;">
        <v-col cols="12" class="text-center">
          <v-progress-circular size="64" indeterminate color="primary" class="mb-4" />
          <h3 class="text-h5">Loading blog post...</h3>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { BlogPost, Comment } from '~/composables/useBlogData'

const route = useRoute()
const router = useRouter()
const { 
  getPostById, 
  addComment, 
  loading, 
  error, 
  getCategoryColor, 
  formatDate, 
  parseComments,
  getRelatedPosts
} = useBlogData()
const blogPost = ref<BlogPost | null>(null)
const comments = ref<Comment[]>([])
const relatedArticles = computed(() => {
  if (blogPost.value) {
    return getRelatedPosts(blogPost.value)
  }
  return []
})
const newCommentAuthor = ref('')
const newCommentText = ref('')
const commentLoading = ref(false)
const loadBlogPost = async () => {
  const id = parseInt(route.params.id as string)
  if (isNaN(id)) return
  try {
    const post = await getPostById(id)
    if (post) {
      blogPost.value = post
      comments.value = parseComments(post.description?.comments || [])
      useHead({
        title: `${post.blog_name} - PPA Blog`,
        meta: [
          { name: 'description', content: post.short_description },
          { property: 'og:title', content: post.blog_name },
          { property: 'og:description', content: post.short_description },
          { property: 'og:image', content: post.image_url },
          { property: 'og:type', content: 'article' }
        ]
      })
    }
  } catch (err) {
    console.error('Failed to load blog post:', err)
  }
}
const submitComment = async () => {
  if (!blogPost.value || !newCommentText.value.trim() || !newCommentAuthor.value.trim()) return
  commentLoading.value = true
  try {
    const newComment = await addComment(blogPost.value.id, {
      user_name: newCommentAuthor.value,
      comment: newCommentText.value
    })
    if (newComment) {
      comments.value.unshift(newComment)
      newCommentText.value = ''
      newCommentAuthor.value = ''
    }
  } catch (err) {
    console.error('Failed to add comment:', err)
  } finally {
    commentLoading.value = false
  }
}
const navigateBack = (): void => {
  router.push('/blogs')
}
const navigateToPost = (postId: number): void => {
  router.push(`/blogs/${postId}`)
}
onMounted(() => {
  loadBlogPost()
})
const formatTextWithLineBreaks = (text: string | undefined) => {
  if (!text) return '';
  return text.replace(/\n/g, '<br>');
};
</script>

<style scoped>
.blog-detail-page {
  background-color: rgb(var(--v-theme-background));
  min-height: 100vh;
}
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
.sidebar {
  position: sticky;
  top: 100px;
}
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
.v-img--loading {
  background-color: #f5f5f5;
}
.v-img--error {
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
}
.featured-img,
.article-thumb {
  max-width: 100%;
  height: auto;
}
.featured-image .v-img {
  width: 100%;
  max-width: 100%;
}
.v-dialog .v-card {
  border-radius: 12px;
  overflow: hidden;
}
.v-dialog .v-img {
  max-height: 80vh;
  width: 100%;
  object-fit: contain;
}
.loading-container,
.error-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f9ff 0%, #dcfce7 100%);
}
.error-container .v-icon {
  opacity: 0.7;
}
</style>