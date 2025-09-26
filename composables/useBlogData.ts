import { ref, computed } from 'vue'

export interface BlogPost {
  id: number
  blog_name: string
  blog_category: string
  image_url: string
  short_description: string
  reading_time: number
  related_topics: string[]
  blog_type: number // 0: Standard Blog, 1: Value Addition, 2: Modern Tech
  status: boolean
  created_date: string
  description?: {
    introduction: string
    image_caption: string
    main_content: string
    conclusion: string
    related_articles: RelatedArticle[]
    comments: string[]
    id: number
    blog_id: number
    view_count: number
  }
}
export interface RelatedArticle {
  id: number
  name: string
  created_date: string
  reading_time: number
  image_url: string
  status: boolean
}
export interface Comment {
  id: number
  user_name: string
  comment: string
  created_at: string
}
export interface CommentRequest {
  user_name: string
  comment: string
}
export const useBlogData = () => {
  const baseUrl = 'http://127.0.0.1:8000'
  const loading = ref(false)
  const error = ref<string | null>(null)
  const $fetch = async (url: string, options: any = {}) => {
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        ...options
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (err) {
      console.error('Fetch error:', err)
      throw err
    }
  }
  const getAllPosts = async (skip: number = 0, limit: number = 100): Promise<BlogPost[]> => {
    loading.value = true
    error.value = null
    try {
      const posts = await $fetch(`${baseUrl}/blog/all?skip=${skip}&limit=${limit}`)
      return posts.filter((post: BlogPost) => post.status === true)
    } catch (err) {
      error.value = 'Failed to fetch blog posts'
      console.error('Error fetching posts:', err)
      return []
    } finally {
      loading.value = false
    }
  }
  const getPostById = async (id: number): Promise<BlogPost | null> => {
    loading.value = true
    error.value = null
    
    try {
      const post = await $fetch(`${baseUrl}/blog/${id}`)
      if (post && post.status === true) {
        if (post.description?.related_articles) {
          post.description.related_articles = post.description.related_articles.filter(
            (article: RelatedArticle) => article.status === true
          )
        }
        return post
      }
      return null
    } catch (err) {
      error.value = 'Failed to fetch blog post'
      console.error('Error fetching post:', err)
      return null
    } finally {
      loading.value = false
    }
  }
  const addComment = async (blogId: number, commentData: CommentRequest): Promise<Comment | null> => {
    loading.value = true
    error.value = null
    try {
      const comment = await $fetch(`${baseUrl}/blog/${blogId}/comments`, {
        method: 'POST',
        body: JSON.stringify(commentData)
      })
      return comment
    } catch (err) {
      error.value = 'Failed to add comment'
      console.error('Error adding comment:', err)
      return null
    } finally {
      loading.value = false
    }
  }
  const getPostsByType = async (blogType: number, skip: number = 0, limit: number = 100): Promise<BlogPost[]> => {
    const allPosts = await getAllPosts(skip, limit)
    return allPosts.filter(post => post.blog_type === blogType)
  }
  const getPostsByCategory = async (category: string, skip: number = 0, limit: number = 100): Promise<BlogPost[]> => {
    const allPosts = await getAllPosts(skip, limit)
    return allPosts.filter(post => 
      post.blog_category.toLowerCase() === category.toLowerCase()
    )
  }
  const searchPosts = async (query: string, skip: number = 0, limit: number = 100): Promise<BlogPost[]> => {
    const allPosts = await getAllPosts(skip, limit)
    const searchTerm = query.toLowerCase()
    return allPosts.filter(post =>
      post.blog_name.toLowerCase().includes(searchTerm) ||
      post.short_description.toLowerCase().includes(searchTerm) ||
      post.blog_category.toLowerCase().includes(searchTerm) ||
      post.related_topics.some(topic => topic.toLowerCase().includes(searchTerm))
    )
  }
  const getRelatedPosts = (post: BlogPost): RelatedArticle[] => {
    const relatedArticles = post.description?.related_articles || []
    return relatedArticles.filter(article => article.status === true)
  }
  const parseComments = (commentsArray: string[]): Comment[] => {
    return commentsArray.map(commentStr => {
      try {
        return JSON.parse(commentStr)
      } catch (err) {
        console.error('Error parsing comment:', err)
        return null
      }
    }).filter(Boolean)
  }
  const formatPostForDisplay = (post: BlogPost) => {
    return {
      id: post.id,
      title: post.blog_name,
      description: post.short_description,
      image: post.image_url,
      category: post.blog_category,
      categoryColor: getCategoryColor(post.blog_category),
      tags: post.related_topics,
      publishDate: formatDate(post.created_date),
      readingTime: `${post.reading_time} min read`,
      featured: post.blog_type === 0,
      introduction: post.description?.introduction || '',
      featuredImage: post.image_url,
      imageCaption: post.description?.image_caption || '',
      views: post.description?.view_count?.toString() || '0',
      mainContent: post.description?.main_content || '',
      conclusion: post.description?.conclusion || '',
      source: getSourceFromType(post.blog_type),
      relatedTopics: post.related_topics
    }
  }
  const getCategoryColor = (category: string): string => {
    const colorMap: { [key: string]: string } = {
      'SMART Agriculture': 'green',
      'IoT Technology': 'green',
      'Green Technology': 'amber',
      'Automation': 'brown',
      'Climate Tech': 'blue',
      'Digital Platforms': 'purple',
      'Spices': 'orange',
      'Oils': 'amber',
      'Nuts': 'orange',
      'Beverages': 'green',
      'Tea Cultivation': 'amber',
      'Rubber Plantation': 'brown',
      'Sustainability': 'blue',
      'Marketing & Trade': 'purple'
    }
    return colorMap[category] || 'primary'
  }
  const getSourceFromType = (blogType: number): string => {
    switch (blogType) {
      case 0: return 'blog'
      case 1: return 'value-addition'
      case 2: return 'modern-tech'
      default: return 'blog'
    }
  }
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }
    return date.toLocaleDateString('en-US', options)
  }

  return {
    loading,
    error,
    getAllPosts,
    getPostById,
    addComment,
    getPostsByType,
    getPostsByCategory,
    searchPosts,
    getRelatedPosts,
    parseComments,
    formatPostForDisplay,
    getCategoryColor,
    getSourceFromType,
    formatDate
  }
}