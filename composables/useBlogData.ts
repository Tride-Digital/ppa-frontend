// composables/useBlogData.ts
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
  // Additional fields for detail page
  introduction: string
  featuredImage: string
  imageCaption: string
  views: string
  mainContent: string
  conclusion: string
}

export const useBlogData = () => {
  const selectedPost = ref<BlogPost | null>(null)
  const showDetails = ref(false)

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: 'SMART Soil Nutrient Management for Tea Plantations in Sri Lanka',
      description: 'Learn advanced soil management techniques that increase tea yield by up to 30% while reducing fertilizer costs through precision agriculture.',
      image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=500&h=250&fit=crop',
      category: 'SMART Agriculture',
      categoryColor: 'green',
      tags: ['Soil Management', 'Tea', 'Productivity', 'Fertilizers'],
      publishDate: '2025-08-15',
      readingTime: '8 min read',
      featured: true,
      introduction: 'The future of tea cultivation in Sri Lanka lies in precision agriculture and smart soil management practices. This comprehensive guide explores how modern technology and data-driven approaches can revolutionize soil nutrient management, leading to increased yields, reduced costs, and sustainable farming practices.',
      featuredImage: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&h=400&fit=crop',
      imageCaption: 'Soil testing and analysis in Sri Lankan tea plantations using modern precision agriculture techniques',
      views: '2,847',
      mainContent: 'Modern soil testing goes beyond basic pH and NPK measurements in Sri Lankan tea estates. Advanced techniques including spectral analysis, microbial assessment, and trace element profiling provide a complete picture of soil health across the diverse elevation zones from low-grown estates in Matara and Galle to high-grown plantations in Nuwara Eliya and Dimbula. Digital soil mapping creates detailed field-specific recommendations, allowing for precision application of nutrients exactly where and when they are needed most. Continuous monitoring systems with wireless sensor networks provide real-time insights into soil conditions, enabling rapid response to changing conditions and creating a comprehensive decision support system that maximizes both yield and quality while minimizing environmental impact.',
      conclusion: 'Smart soil nutrient management through continuous monitoring and data-driven decisions represents the future of tea cultivation in Sri Lanka. By implementing comprehensive monitoring systems that integrate soil sensors, weather data, and predictive analytics, tea estate owners can make informed decisions that maximize both yield and quality while minimizing environmental impact and maintaining the premium quality that Ceylon tea is renowned for globally.'
    },

    {
      id: 2,
      title: 'Sustainable Rubber Tapping: Best Practices for Modern Estates',
      description: 'Explore innovative rubber tapping techniques that maximize latex yield while ensuring tree longevity and environmental sustainability.',
      image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=500&h=250&fit=crop',
      category: 'Rubber Plantation',
      categoryColor: 'brown',
      tags: ['Rubber', 'Sustainability', 'Tapping', 'Yield'],
      publishDate: '2025-08-12',
      readingTime: '12 min read',
      featured: false,
      introduction: 'Sustainable rubber tapping balances immediate productivity with long-term tree health and environmental responsibility. Modern techniques focus on optimizing latex flow while preserving tree vitality for decades of productive harvesting.',
      featuredImage: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&h=400&fit=crop',
      imageCaption: 'Traditional rubber tapping in Sri Lankan plantations enhanced with modern sustainable practices',
      views: '1,923',
      mainContent: 'Advanced tapping techniques focus on minimizing tree stress while maximizing latex yield in Sri Lankan rubber estates. The depth, angle, and frequency of cuts are carefully calculated based on tree age, health, and seasonal conditions, with optimal tapping systems like S/2d2 (half spiral cut every other day) ensuring sustainable bark consumption. Timing is crucial for optimal latex flow, with early morning tapping when turgor pressure is highest yielding the best results from the Hevea brasiliensis trees. Modern Sri Lankan estates use data analytics to determine the optimal tapping schedule for each section of their plantation, while proper rest periods allow trees to recover and maintain long-term productivity, extending the economic lifespan beyond the current 3-4 year panels to the recommended 6-year cycle.',
      conclusion: 'Sustainable rubber tapping requires a holistic approach that considers tree health, environmental impact, and long-term productivity. By implementing modern techniques developed by institutions like the Rubber Research Institute of Sri Lanka and maintaining focus on sustainability, rubber estates can achieve optimal yields while preserving their plantations for future generations and contributing to Sri Lanka\'s position as a leading natural rubber producer.'
    },

    {
      id: 3,
      title: 'Ceylon Tea Quality Enhancement Through Precision Processing',
      description: 'Discover how precision processing techniques and quality control measures can elevate your Ceylon tea to premium market standards.',
      image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=500&h=250&fit=crop',
      category: 'Tea Cultivation',
      categoryColor: 'amber',
      tags: ['Ceylon Tea', 'Processing', 'Quality', 'Premium'],
      publishDate: '2025-08-10',
      readingTime: '10 min read',
      featured: true,
      introduction: 'Ceylon tea\'s reputation for quality excellence stems from meticulous processing techniques that preserve the unique characteristics of high-grown Sri Lankan tea. Precision processing elevates good tea leaves into exceptional premium products.',
      featuredImage: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&h=400&fit=crop',
      imageCaption: 'Traditional Ceylon tea processing factory showcasing the orthodox method of black tea production',
      views: '3,156',
      mainContent: 'Withering is the critical first step in Ceylon tea processing where moisture content is reduced from 80% to 60-65% over 18-24 hours, preserving essential oils and developing the characteristic aroma profile that distinguishes Ceylon tea from other origins. Temperature and humidity monitoring in withering troughs ensure consistent conditions regardless of weather variations, with hot air circulation maintaining optimal processing environment. The orthodox rolling process breaks cell walls to release enzymes, followed by precise fermentation timing and conditions that determine the tea\'s strength, color, and flavor profile. Modern Ceylon tea factories use climate control systems to maintain optimal fermentation conditions between 20-26°C, with regular sampling ensuring consistent quality that meets the stringent standards required for the Lion Logo certification.',
      conclusion: 'Precision processing transforms Ceylon tea from good to exceptional quality that commands premium prices in global markets. By controlling each step from withering through fermentation using traditional orthodox methods refined with modern technology, Sri Lankan tea producers consistently create premium products that maintain Ceylon tea\'s reputation for excellence and distinctive character recognized by tea connoisseurs worldwide.'
    },

    {
      id: 4,
      title: 'Climate Change Adaptation Strategies for Sri Lankan Plantations',
      description: 'Comprehensive guide to adapting plantation operations to changing climate patterns while maintaining productivity and sustainability.',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&h=250&fit=crop',
      category: 'Sustainability',
      categoryColor: 'blue',
      tags: ['Climate Change', 'Adaptation', 'Resilience'],
      publishDate: '2025-08-08',
      readingTime: '15 min read',
      featured: false,
      introduction: 'Climate change presents significant challenges to Sri Lankan plantations, from shifting rainfall patterns to temperature variations. Adaptive strategies help plantations build resilience while maintaining productivity and profitability.',
      featuredImage: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=400&fit=crop',
      imageCaption: 'Climate-resilient tea plantation practices in Sri Lanka\'s central highlands protecting against environmental changes',
      views: '2,234',
      mainContent: 'Changing rainfall patterns across Sri Lanka\'s diverse elevation zones require innovative water management approaches including comprehensive rainwater harvesting systems, efficient irrigation infrastructure, and water conservation techniques to ensure adequate supply during increasingly frequent dry periods. Smart irrigation systems respond to real-time weather data and soil moisture levels, optimizing water use efficiency while maintaining crop health across tea, rubber, and coconut plantations. Diversifying plantation crops reduces climate risk by spreading vulnerability across different species with varying climate tolerances, while climate-resilient varieties of tea and rubber developed through research institutions can better withstand temperature fluctuations and changing precipitation patterns that affect different agro-ecological zones from the wet zone plantations to the dry zone cultivation areas.',
      conclusion: 'Climate adaptation requires proactive planning and implementation of resilient practices tailored to Sri Lanka\'s diverse plantation environments. By diversifying crops, improving water management infrastructure, selecting climate-appropriate varieties, and implementing sustainable soil management practices, plantations can maintain productivity and profitability while contributing to the country\'s climate resilience goals and supporting the livelihoods of over one million people dependent on the plantation sector.'
    },

    {
      id: 5,
      title: 'Digital Marketing Strategies for Ceylon Tea Export Success',
      description: 'Learn how modern digital marketing techniques can help Sri Lankan tea producers reach global markets and command premium prices.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=250&fit=crop',
      category: 'Marketing & Trade',
      categoryColor: 'purple',
      tags: ['Digital Marketing', 'Export', 'Branding'],
      publishDate: '2025-08-05',
      readingTime: '9 min read',
      featured: true,
      introduction: 'Digital marketing opens new pathways for Ceylon tea producers to connect directly with global consumers, build brand recognition, and achieve premium pricing in competitive international markets.',
      featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
      imageCaption: 'Digital marketing platforms connecting Ceylon tea producers with global export markets and international consumers',
      views: '1,789',
      mainContent: 'Strong brand identity differentiates Ceylon tea in crowded global markets, with digital platforms providing cost-effective ways to communicate plantation heritage, sustainable practices, and the unique Lion Logo quality standards to international consumers across key markets in the Middle East, Europe, and emerging economies. Effective digital marketing utilizes multiple platforms to reach different segments of the global tea market, from B2B relationships with importers and distributors to direct-to-consumer e-commerce channels that bypass traditional intermediaries. Content marketing through professional websites, social media presence, and educational campaigns highlights the distinctive characteristics of Ceylon tea\'s seven growing regions, the orthodox processing methods, and certifications from Rainforest Alliance, Fairtrade, and UTZ that appeal to conscious consumers willing to pay premium prices for ethically sourced, high-quality tea.',
      conclusion: 'Digital marketing empowers Ceylon tea producers to leverage Sri Lanka\'s reputation as the world\'s leading tea exporter by building direct relationships with global consumers, achieving premium pricing through effective brand positioning, and accessing new markets through targeted digital strategies that showcase the unique qualities and heritage of Pure Ceylon Tea certified with the Lion Logo.'
    },
  ]

  // Get all blog posts for listing
  const getAllPosts = (): BlogPost[] => {
    return blogPosts
  }

  // Get single blog post by ID
  const getPostById = (id: number): BlogPost | null => {
    return blogPosts.find(post => post.id === id) || null
  }

  // Get related posts (excluding current post)
  const getRelatedPosts = (currentPostId: number, limit: number = 3): BlogPost[] => {
    return blogPosts
      .filter(post => post.id !== currentPostId)
      .slice(0, limit)
  }

  // Get posts by category
  const getPostsByCategory = (category: string): BlogPost[] => {
    return blogPosts.filter(post => post.category === category)
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

  return {
    getAllPosts,
    getPostById,
    getRelatedPosts,
    getPostsByCategory,
    selectedPost: readonly(selectedPost),
    showDetails: readonly(showDetails),
    selectPost,
    closeDetails
  }
}