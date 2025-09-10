// composables/useBlogData.ts
import { ref, readonly, computed } from 'vue'
import { useValueAdditionStore, type ValueAdditionPost } from './valueAdditionStore'
import { useModernTechStore, type ModernTechPost } from './modernTechStore'

export interface BlogPost {
  id: number
  title: string
  description: string
  image: string
  category: string
  categoryColor: string
  tags: string[]
  publishDate: string
  readingTime: string
  featured: boolean
  introduction: string
  featuredImage: string
  imageCaption: string
  views: string
  mainContent: string
  conclusion: string
  source?: 'blog' | 'value-addition' | 'modern-tech' // To track the source
  processStage?: string // For value addition posts
  techCategory?: string // For modern tech posts
  relatedTopics?: string[] // For value addition and modern tech posts
}

export const useBlogData = () => {
  const selectedPost = ref<BlogPost | null>(null)
  const showDetails = ref(false)

  // Import data from other stores
  const { getAllPosts: getValueAdditionPosts } = useValueAdditionStore()
  const { getAllPosts: getModernTechPosts } = useModernTechStore()

  // Original blog posts
  const originalBlogPosts: BlogPost[] = [
    {
      id: 1,
      title: 'SMART Soil Nutrient Management for Tea Plantations in Sri Lanka',
      description: 'Learn advanced soil management techniques that increase tea yield by up to 30% while reducing fertilizer costs through precision agriculture.',
      image: 'https://agrigateglobal.com/wp-content/uploads/2021/05/Untitled-design-2.jpg',
      category: 'SMART Agriculture',
      categoryColor: 'green',
      tags: ['Soil Management', 'Tea', 'Productivity', 'Fertilizers'],
      publishDate: '2025-08-15',
      readingTime: '8 min read',
      featured: true,
      introduction: 'The future of tea cultivation in Sri Lanka lies in precision agriculture and smart soil management practices. This comprehensive guide explores how modern technology and data-driven approaches can revolutionize soil nutrient management, leading to increased yields, reduced costs, and sustainable farming practices.',
      featuredImage: 'https://agrigateglobal.com/wp-content/uploads/2021/05/Untitled-design-2.jpg',
      imageCaption: 'Soil testing and analysis in Sri Lankan tea plantations using modern precision agriculture techniques',
      views: '2,847',
      mainContent: 'Modern soil testing goes beyond basic pH and NPK measurements in Sri Lankan tea estates. Advanced techniques including spectral analysis, microbial assessment, and trace element profiling provide a complete picture of soil health across the diverse elevation zones from low-grown estates in Matara and Galle to high-grown plantations in Nuwara Eliya and Dimbula. Digital soil mapping creates detailed field-specific recommendations, allowing for precision application of nutrients exactly where and when they are needed most. Continuous monitoring systems with wireless sensor networks provide real-time insights into soil conditions, enabling rapid response to changing conditions and creating a comprehensive decision support system that maximizes both yield and quality while minimizing environmental impact.',
      conclusion: 'Smart soil nutrient management through continuous monitoring and data-driven decisions represents the future of tea cultivation in Sri Lanka. By implementing comprehensive monitoring systems that integrate soil sensors, weather data, and predictive analytics, tea estate owners can make informed decisions that maximize both yield and quality while minimizing environmental impact and maintaining the premium quality that Ceylon tea is renowned for globally.',
      source: 'blog'
    },

    {
      id: 2,
      title: 'Sustainable Rubber Tapping: Best Practices for Modern Estates',
      description: 'Explore innovative rubber tapping techniques that maximize latex yield while ensuring tree longevity and environmental sustainability.',
      image: 'https://cdn.britannica.com/21/75921-050-A34DC6E2/Latex-rubber-tree.jpg',
      category: 'Rubber Plantation',
      categoryColor: 'brown',
      tags: ['Rubber', 'Sustainability', 'Tapping', 'Yield'],
      publishDate: '2025-08-12',
      readingTime: '12 min read',
      featured: false,
      introduction: 'Sustainable rubber tapping balances immediate productivity with long-term tree health and environmental responsibility. Modern techniques focus on optimizing latex flow while preserving tree vitality for decades of productive harvesting.',
      featuredImage: 'https://cdn.britannica.com/21/75921-050-A34DC6E2/Latex-rubber-tree.jpg',
      imageCaption: 'Traditional rubber tapping in Sri Lankan plantations enhanced with modern sustainable practices',
      views: '1,923',
      mainContent: 'Advanced tapping techniques focus on minimizing tree stress while maximizing latex yield in Sri Lankan rubber estates. The depth, angle, and frequency of cuts are carefully calculated based on tree age, health, and seasonal conditions, with optimal tapping systems like S/2d2 (half spiral cut every other day) ensuring sustainable bark consumption. Timing is crucial for optimal latex flow, with early morning tapping when turgor pressure is highest yielding the best results from the Hevea brasiliensis trees. Modern Sri Lankan estates use data analytics to determine the optimal tapping schedule for each section of their plantation, while proper rest periods allow trees to recover and maintain long-term productivity, extending the economic lifespan beyond the current 3-4 year panels to the recommended 6-year cycle.',
      conclusion: 'Sustainable rubber tapping requires a holistic approach that considers tree health, environmental impact, and long-term productivity. By implementing modern techniques developed by institutions like the Rubber Research Institute of Sri Lanka and maintaining focus on sustainability, rubber estates can achieve optimal yields while preserving their plantations for future generations and contributing to Sri Lanka\'s position as a leading natural rubber producer.',
      source: 'blog'
    },

    {
      id: 3,
      title: 'Ceylon Tea Quality Enhancement Through Precision Processing',
      description: 'Discover how precision processing techniques and quality control measures can elevate your Ceylon tea to premium market standards.',
      image: 'https://jyyna.co.uk/wp-content/uploads/2024/08/woman-representing-ceylon-tea-history.webp',
      category: 'Tea Cultivation',
      categoryColor: 'amber',
      tags: ['Ceylon Tea', 'Processing', 'Quality', 'Premium'],
      publishDate: '2025-08-10',
      readingTime: '10 min read',
      featured: true,
      introduction: 'Ceylon tea\'s reputation for quality excellence stems from meticulous processing techniques that preserve the unique characteristics of high-grown Sri Lankan tea. Precision processing elevates good tea leaves into exceptional premium products.',
      featuredImage: 'https://jyyna.co.uk/wp-content/uploads/2024/08/woman-representing-ceylon-tea-history.webp',
      imageCaption: 'Traditional Ceylon tea processing factory showcasing the orthodox method of black tea production',
      views: '3,156',
      mainContent: 'Withering is the critical first step in Ceylon tea processing where moisture content is reduced from 80% to 60-65% over 18-24 hours, preserving essential oils and developing the characteristic aroma profile that distinguishes Ceylon tea from other origins. Temperature and humidity monitoring in withering troughs ensure consistent conditions regardless of weather variations, with hot air circulation maintaining optimal processing environment. The orthodox rolling process breaks cell walls to release enzymes, followed by precise fermentation timing and conditions that determine the tea\'s strength, color, and flavor profile. Modern Ceylon tea factories use climate control systems to maintain optimal fermentation conditions between 20-26°C, with regular sampling ensuring consistent quality that meets the stringent standards required for the Lion Logo certification.',
      conclusion: 'Precision processing transforms Ceylon tea from good to exceptional quality that commands premium prices in global markets. By controlling each step from withering through fermentation using traditional orthodox methods refined with modern technology, Sri Lankan tea producers consistently create premium products that maintain Ceylon tea\'s reputation for excellence and distinctive character recognized by tea connoisseurs worldwide.',
      source: 'blog'
    },

    {
      id: 4,
      title: 'Climate Change Adaptation Strategies for Sri Lankan Plantations',
      description: 'Comprehensive guide to adapting plantation operations to changing climate patterns while maintaining productivity and sustainability.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSx_9dwBOl1SXqpslAx1Ue_7YXQX_0yMfmWQA&s',
      category: 'Sustainability',
      categoryColor: 'blue',
      tags: ['Climate Change', 'Adaptation', 'Resilience'],
      publishDate: '2025-08-08',
      readingTime: '15 min read',
      featured: false,
      introduction: 'Climate change presents significant challenges to Sri Lankan plantations, from shifting rainfall patterns to temperature variations. Adaptive strategies help plantations build resilience while maintaining productivity and profitability.',
      featuredImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSx_9dwBOl1SXqpslAx1Ue_7YXQX_0yMfmWQA&s',
      imageCaption: 'Climate-resilient tea plantation practices in Sri Lanka\'s central highlands protecting against environmental changes',
      views: '2,234',
      mainContent: 'Changing rainfall patterns across Sri Lanka\'s diverse elevation zones require innovative water management approaches including comprehensive rainwater harvesting systems, efficient irrigation infrastructure, and water conservation techniques to ensure adequate supply during increasingly frequent dry periods. Smart irrigation systems respond to real-time weather data and soil moisture levels, optimizing water use efficiency while maintaining crop health across tea, rubber, and coconut plantations. Diversifying plantation crops reduces climate risk by spreading vulnerability across different species with varying climate tolerances, while climate-resilient varieties of tea and rubber developed through research institutions can better withstand temperature fluctuations and changing precipitation patterns that affect different agro-ecological zones from the wet zone plantations to the dry zone cultivation areas.',
      conclusion: 'Climate adaptation requires proactive planning and implementation of resilient practices tailored to Sri Lanka\'s diverse plantation environments. By diversifying crops, improving water management infrastructure, selecting climate-appropriate varieties, and implementing sustainable soil management practices, plantations can maintain productivity and profitability while contributing to the country\'s climate resilience goals and supporting the livelihoods of over one million people dependent on the plantation sector.',
      source: 'blog'
    },

    {
      id: 5,
      title: 'Digital Marketing Strategies for Ceylon Tea Export Success',
      description: 'Learn how modern digital marketing techniques can help Sri Lankan tea producers reach global markets and command premium prices.',
      image: 'https://bmkltsly13vb.compat.objectstorage.ap-mumbai-1.oraclecloud.com/cdn.ft.lk/assets/uploads/image_6f4cd1f161.jpg',
      category: 'Marketing & Trade',
      categoryColor: 'purple',
      tags: ['Digital Marketing', 'Export', 'Branding'],
      publishDate: '2025-08-05',
      readingTime: '9 min read',
      featured: true,
      introduction: 'Digital marketing opens new pathways for Ceylon tea producers to connect directly with global consumers, build brand recognition, and achieve premium pricing in competitive international markets.',
      featuredImage: 'https://bmkltsly13vb.compat.objectstorage.ap-mumbai-1.oraclecloud.com/cdn.ft.lk/assets/uploads/image_6f4cd1f161.jpg',
      imageCaption: 'Digital marketing platforms connecting Ceylon tea producers with global export markets and international consumers',
      views: '1,789',
      mainContent: 'Strong brand identity differentiates Ceylon tea in crowded global markets, with digital platforms providing cost-effective ways to communicate plantation heritage, sustainable practices, and the unique Lion Logo quality standards to international consumers across key markets in the Middle East, Europe, and emerging economies. Effective digital marketing utilizes multiple platforms to reach different segments of the global tea market, from B2B relationships with importers and distributors to direct-to-consumer e-commerce channels that bypass traditional intermediaries. Content marketing through professional websites, social media presence, and educational campaigns highlights the distinctive characteristics of Ceylon tea\'s seven growing regions, the orthodox processing methods, and certifications from Rainforest Alliance, Fairtrade, and UTZ that appeal to conscious consumers willing to pay premium prices for ethically sourced, high-quality tea.',
      conclusion: 'Digital marketing empowers Ceylon tea producers to leverage Sri Lanka\'s reputation as the world\'s leading tea exporter by building direct relationships with global consumers, achieving premium pricing through effective brand positioning, and accessing new markets through targeted digital strategies that showcase the unique qualities and heritage of Pure Ceylon Tea certified with the Lion Logo.',
      source: 'blog'
    },
  ]

  // Transform Value Addition posts to BlogPost format
  const transformValueAdditionPost = (post: ValueAdditionPost): BlogPost => {
    return {
      id: post.id,
      title: post.title,
      description: post.description,
      image: post.featuredImage,
      category: post.category,
      categoryColor: post.categoryColor,
      tags: post.tags,
      publishDate: post.publishDate,
      readingTime: post.readingTime,
      featured: false, // Default to false for value addition posts
      introduction: post.introduction,
      featuredImage: post.featuredImage,
      imageCaption: post.imageCaption,
      views: post.views.toString(),
      mainContent: post.mainContent,
      conclusion: post.conclusion,
      source: 'value-addition',
      processStage: post.processStage,
      relatedTopics: post.relatedTopics
    }
  }

  // Transform Modern Tech posts to BlogPost format
  const transformModernTechPost = (post: ModernTechPost): BlogPost => {
    return {
      id: post.id,
      title: post.title,
      description: post.description,
      image: post.featuredImage,
      category: post.category,
      categoryColor: post.categoryColor,
      tags: post.tags,
      publishDate: post.publishDate,
      readingTime: post.readingTime,
      featured: false, // Default to false for modern tech posts
      introduction: post.introduction,
      featuredImage: post.featuredImage,
      imageCaption: post.imageCaption,
      views: post.views.toString(),
      mainContent: post.mainContent,
      conclusion: post.conclusion,
      source: 'modern-tech',
      techCategory: post.techCategory,
      relatedTopics: post.relatedTopics
    }
  }

  // Computed property to get all combined posts
  const allCombinedPosts = computed(() => {
    const valueAdditionPosts = getValueAdditionPosts().map(transformValueAdditionPost)
    const modernTechPosts = getModernTechPosts().map(transformModernTechPost)
    
    return [
      ...originalBlogPosts,
      ...valueAdditionPosts,
      ...modernTechPosts
    ].sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
  })

  // Get all blog posts for listing
  const getAllPosts = (): BlogPost[] => {
    return allCombinedPosts.value
  }

  // Get single blog post by ID
  const getPostById = (id: number): BlogPost | null => {
    return allCombinedPosts.value.find(post => post.id === id) || null
  }

  // Get related posts with improved logic based on source and categories
  const getRelatedPosts = (currentPostId: number, limit: number = 3): BlogPost[] => {
    const currentPost = getPostById(currentPostId)
    if (!currentPost) return []

    const otherPosts = allCombinedPosts.value.filter(post => post.id !== currentPostId)
    
    // Score posts based on similarity
    const scoredPosts = otherPosts.map(post => {
      let score = 0
      
      // Same source gets bonus points
      if (post.source === currentPost.source) score += 5
      
      // Same category gets high score
      if (post.category === currentPost.category) score += 10
      
      // Shared tags
      const sharedTags = post.tags.filter(tag => 
        currentPost.tags.some(currentTag => 
          currentTag.toLowerCase().includes(tag.toLowerCase()) ||
          tag.toLowerCase().includes(currentTag.toLowerCase())
        )
      )
      score += sharedTags.length * 3
      
      // Shared related topics (if available)
      if (post.relatedTopics && currentPost.relatedTopics) {
        const sharedTopics = post.relatedTopics.filter(topic =>
          currentPost.relatedTopics!.some(currentTopic =>
            currentTopic.toLowerCase().includes(topic.toLowerCase()) ||
            topic.toLowerCase().includes(currentTopic.toLowerCase())
          )
        )
        score += sharedTopics.length * 2
      }
      
      // Same process stage for value addition posts
      if (post.processStage && currentPost.processStage && 
          post.processStage === currentPost.processStage) {
        score += 8
      }
      
      // Same tech category for modern tech posts
      if (post.techCategory && currentPost.techCategory && 
          post.techCategory === currentPost.techCategory) {
        score += 8
      }
      
      return { post, score }
    })
    
    return scoredPosts
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => item.post)
  }

  // Get posts by category
  const getPostsByCategory = (category: string): BlogPost[] => {
    return allCombinedPosts.value.filter(post => 
      post.category.toLowerCase() === category.toLowerCase()
    )
  }

  // Get posts by source
  const getPostsBySource = (source: 'blog' | 'value-addition' | 'modern-tech'): BlogPost[] => {
    return allCombinedPosts.value.filter(post => post.source === source)
  }

  // Search posts across all sources
  const searchPosts = (query: string): BlogPost[] => {
    const searchTerm = query.toLowerCase()
    return allCombinedPosts.value.filter(post =>
      post.title.toLowerCase().includes(searchTerm) ||
      post.description.toLowerCase().includes(searchTerm) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      post.category.toLowerCase().includes(searchTerm) ||
      (post.relatedTopics && post.relatedTopics.some(topic => 
        topic.toLowerCase().includes(searchTerm)
      )) ||
      (post.processStage && post.processStage.toLowerCase().includes(searchTerm)) ||
      (post.techCategory && post.techCategory.toLowerCase().includes(searchTerm))
    )
  }

  // Get featured posts
  const getFeaturedPosts = (): BlogPost[] => {
    return allCombinedPosts.value.filter(post => post.featured)
  }

  // Get posts by process stage (for value addition posts)
  const getPostsByProcessStage = (stage: string): BlogPost[] => {
    return allCombinedPosts.value.filter(post => 
      post.processStage && post.processStage.toLowerCase().includes(stage.toLowerCase())
    )
  }

  // Get posts by tech category (for modern tech posts)
  const getPostsByTechCategory = (techCategory: string): BlogPost[] => {
    return allCombinedPosts.value.filter(post => 
      post.techCategory && post.techCategory.toLowerCase().includes(techCategory.toLowerCase())
    )
  }

  // Set selected post and show details
  const selectPost = (post: BlogPost) => {
    selectedPost.value = post
    showDetails.value = true
  }

  // Close details view
  const closeDetails = () => {
    showDetails.value = false
    selectedPost.value = null
  }

  // Get statistics
  const getStats = () => {
    const posts = allCombinedPosts.value
    return {
      total: posts.length,
      blog: posts.filter(p => p.source === 'blog').length,
      valueAddition: posts.filter(p => p.source === 'value-addition').length,
      modernTech: posts.filter(p => p.source === 'modern-tech').length,
      featured: posts.filter(p => p.featured).length
    }
  }

  return {
    // Core functions
    getAllPosts,
    getPostById,
    getRelatedPosts,
    getPostsByCategory,
    
    // Source-specific functions
    getPostsBySource,
    getPostsByProcessStage,
    getPostsByTechCategory,
    
    // Utility functions
    searchPosts,
    getFeaturedPosts,
    getStats,
    
    // State management
    selectedPost: readonly(selectedPost),
    showDetails: readonly(showDetails),
    selectPost,
    closeDetails,
    
    // Computed properties
    allCombinedPosts: readonly(allCombinedPosts)
  }
}