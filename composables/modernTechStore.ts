// composables/modernTechStore.ts
import { ref, computed } from 'vue'

// Type Definitions
export interface ModernTechPost {
  id: number
  title: string
  category: string
  categoryColor: string
  publishDate: string
  readingTime: string
  views: number
  introduction: string
  featuredImage: string
  imageCaption: string
  mainContent: string
  conclusion: string
  tags: string[]
  description: string
  relatedTopics: string[]
  techCategory: string
  // Optional, non-breaking extensions
  author?: string
  slug?: string
}

export interface Comment {
  id: number
  author: string
  avatar: string
  date: string
  content: string
  likes: number
}

// ---------- Helpers ----------
const parseDate = (iso: string) => new Date(iso)
const normalize = (v: string) => v.toLowerCase().trim()

// ---------- State ----------
const selectedPost = ref<ModernTechPost | null>(null)

const modernTechPosts = ref<ModernTechPost[]>([
  {
    id: 201,
    title: "SMART Soil Technology: IoT Sensors Revolution in Agriculture",
    category: "IoT Technology",
    categoryColor: "green",
    publishDate: "2025-08-20",
    readingTime: "10 min read",
    views: 1950,
    introduction:
      "Advanced soil sensors, IoT monitoring, and real-time data analytics transform traditional farming into precision agriculture, enabling optimal nutrient management and crop yields through intelligent automation and data-driven decisions. Estate teams move from reactive field visits to proactive, alert-driven workflows with clear ROI tracking.",
    featuredImage: "/images/modern-technologies/m1.webp",
    imageCaption: "SMART soil sensors and IoT devices monitoring plantation conditions in real-time",
    mainContent:
      "SMART soil technology revolutionizes plantation management through network-connected sensors that continuously monitor soil conditions across vast agricultural areas. Advanced sensor arrays measure pH levels (accuracy ±0.1), moisture content (±2%), temperature (±0.5°C), electrical conductivity, and NPK ratios every 15 minutes, transmitting data via LoRaWAN networks to cloud-based analytics platforms. Machine learning algorithms analyze 50,000+ daily measurements to identify patterns invisible to human observation, predicting optimal fertilizer application windows with 95% accuracy. Automated irrigation systems integrate weather forecasts, soil data, and crop growth stages to deliver precise water quantities, reducing consumption by 40% while maintaining optimal growing conditions. Predictive analytics identify nutrient deficiencies 2–3 weeks before visible symptoms appear, enabling preventive interventions that protect crop quality and yields. GPS-guided variable-rate applicators use real-time soil data to apply fertilizers with centimeter-level precision, ensuring each area receives exactly what it needs. Mobile applications provide plantation managers with interactive dashboards, alert systems, and recommendation engines accessible from anywhere with internet connectivity.\n\nImplementation playbook: start with 10–20 pilot nodes per estate block, calibrate sensors against lab baselines, and set threshold-based alerts (e.g., volumetric water content, EC spikes). Quarterly model retraining uses new-season data; a simple A/B test compares mapped variable-rate plots to uniform-rate controls to quantify savings. Finally, integrate procurement to auto-generate replenishment orders when nutrient budgets fall below set points.",
    conclusion:
      "SMART soil technology delivers measurable returns through 25–30% yield increases, 35% input cost reductions, and consistent premium crop quality. This precision approach ensures competitive advantage while building sustainable operations for future generations.",
    tags: ["IoT Sensors", "Precision Agriculture", "Data Analytics", "Automated Systems", "Smart Farming", "Soil Monitoring"],
    description:
      "Discover how IoT sensors and data analytics revolutionize soil management for optimal crop performance and resource efficiency.",
    relatedTopics: ["iot sensors", "precision agriculture", "data analytics", "automated systems", "smart farming", "soil monitoring"],
    techCategory: "IoT & Sensors",
    author: "AgriTech Lab",
    slug: "smart-soil-iot-revolution"
  },
  {
    id: 202,
    title: "Sustainable Processing Equipment: Green Technology Innovation",
    category: "Green Technology",
    categoryColor: "amber",
    publishDate: "2025-08-18",
    readingTime: "9 min read",
    views: 1630,
    introduction:
      "Eco-friendly processing equipment using renewable energy, bio-based alternatives, and zero-waste systems create sustainable operations while maintaining premium quality and reducing environmental impact through innovative green technologies. These upgrades often qualify factories for eco-labels and preferential buyer programs.",
    featuredImage: "/images/modern-technologies/m2.webp",
    imageCaption: "Solar-powered processing facility with sustainable equipment and renewable energy systems",
    mainContent:
      "Sustainable processing equipment transforms traditional manufacturing through innovative green technologies that reduce environmental impact while enhancing operational efficiency. Solar panel arrays generating 500 kW capacity power entire processing facilities, with battery storage systems providing 12-hour backup during cloudy conditions, eliminating fossil fuel dependence. Advanced heat recovery systems capture waste heat from drying operations, reducing overall energy consumption by 60% while maintaining precise temperature control for optimal product quality. Bio-waste digesters convert organic processing residues into biogas, methane, and high-grade compost, creating circular economy systems that eliminate waste streams entirely. Water treatment plants with reverse osmosis and UV sterilization recycle 95% of processing water, reducing freshwater consumption from 1000 L/kg to 150 L/kg of finished product. Energy-efficient LED lighting with motion sensors and daylight integration reduces electricity consumption by 75% while providing optimal working conditions. Smart HVAC systems with CO₂ sensors and occupancy detection maintain ideal processing environments using 50% less energy than conventional systems. Automated material handling systems powered by regenerative electric motors reduce manual labor by 80% while improving workplace safety and processing consistency.\n\nFinancing tips: bundle upgrades into performance contracts with verified savings, stack grants with green credit lines, and phase deployments (heat recovery → water recycling → solar + storage). Publish a one-page MRV dashboard—energy intensity, water reuse, and waste diversion—to communicate progress to buyers and auditors.",
    conclusion:
      "Sustainable processing equipment proves that environmental responsibility and operational excellence create synergistic benefits. Green technology investments reduce operational costs by 45% while enabling premium eco-certifications that command 25% price premiums.",
    tags: ["Renewable Energy", "Green Technology", "Sustainable Equipment", "Solar Power", "Energy Efficiency", "Zero Waste"],
    description:
      "Explore cutting-edge green technologies that make processing operations sustainable while maintaining premium quality standards.",
    relatedTopics: ["renewable energy", "green technology", "sustainable equipment", "solar power", "energy efficiency", "zero waste"],
    techCategory: "Green Technology",
    author: "Sustainable Ops",
    slug: "sustainable-processing-equipment"
  },
  {
    id: 203,
    title: "Precision Tea Processing: Automated Quality Control Systems",
    category: "Automation",
    categoryColor: "brown",
    publishDate: "2025-08-16",
    readingTime: "11 min read",
    views: 1740,
    introduction:
      "Climate-controlled chambers, automated sorting systems, and precision packaging technology ensure consistent Ceylon tea quality through advanced automation that monitors every processing stage with scientific accuracy. Factories move from operator intuition to sensor-verified, specification-driven runs.",
    featuredImage: "/images/modern-technologies/m3.webp",
    imageCaption: "Automated tea processing line with precision sorting and quality control systems",
    mainContent:
      "Precision tea processing utilizes advanced automation to achieve consistent premium quality that traditional methods cannot match. Climate-controlled withering chambers maintain exact temperature (24±1°C) and humidity (68±2%) conditions using PLC-controlled systems that respond to real-time environmental changes within seconds. Automated rolling machines with servo-controlled pressure systems apply precise force (2.5–4.0 bar) based on leaf moisture content, ensuring optimal cell breakdown without damage to delicate tea particles. Computer-vision sorting systems equipped with hyperspectral cameras analyze each tea particle for size, color, and quality at 10,000 particles per second, achieving 99.8% grading accuracy compared to ~85% for manual sorting. Fermentation monitoring systems track temperature, humidity, and oxidation levels continuously, with automated misting systems maintaining optimal conditions throughout the 2–4 hour process. Precision drying tunnels with infrared sensors monitor moisture levels at multiple points, automatically adjusting airflow and temperature to achieve uniform ~3% moisture content across all particles. Nitrogen flushing packaging systems remove 99.9% of oxygen while maintaining product integrity, extending shelf life to 36 months while preserving fresh aroma and flavor compounds. Quality control laboratories equipped with gas chromatography and mass spectrometry analyze samples every 30 minutes, ensuring consistent flavor profiles that meet international buyer specifications.\n\nRollout approach: digitize SOPs into machine-readable setpoints, establish a golden-batch library per grade, and implement statistical process control charts visible to the shop floor. Tie incentive schemes to first-pass quality and downtime reduction to reinforce adoption.",
    conclusion:
      "Precision tea processing automation ensures Ceylon tea maintains its global reputation for excellence while reducing processing costs by 30% and achieving 99% quality consistency that commands premium prices worldwide.",
    tags: ["Process Automation", "Quality Control", "Ceylon Tea Technology", "Precision Systems", "Automated Sorting", "Climate Control"],
    description:
      "Learn how automation and precision technology maintain Ceylon tea's world-renowned quality standards through scientific processing control.",
    relatedTopics: ["process automation", "quality control", "ceylon tea technology", "precision systems", "automated sorting", "climate control"],
    techCategory: "Process Automation",
    author: "Factory Labs",
    slug: "precision-tea-processing-qc"
  },
  {
    id: 204,
    title: "Climate Resilience Technology: Weather Monitoring & Response Systems",
    category: "Climate Tech",
    categoryColor: "blue",
    publishDate: "2025-08-14",
    readingTime: "12 min read",
    views: 1520,
    introduction:
      "Advanced weather monitoring systems, drought-resistant crop varieties, and adaptive irrigation technology help plantations build resilience against climate challenges through predictive analytics and automated response systems. A clear incident playbook turns forecasts into field actions.",
    featuredImage: "/images/modern-technologies/m4.webp",
    imageCaption: "Weather monitoring station with climate sensors and automated response systems",
    mainContent:
      "Climate resilience technology creates comprehensive defense systems against increasingly unpredictable weather patterns threatening agricultural operations. Advanced weather monitoring stations equipped with 15+ sensors track temperature, humidity, rainfall, wind speed, soil moisture, UV intensity, and atmospheric pressure with meteorological-grade accuracy, updating cloud databases every 5 minutes. AI-powered forecasting systems analyze satellite imagery, local sensor data, and global weather models to provide hyper-local predictions with 96% accuracy for 7-day forecasts and 88% accuracy for 14-day projections. Automated irrigation systems respond instantly to weather alerts, pre-positioning water reserves before drought periods and adjusting application rates based on predicted rainfall patterns. Smart greenhouse systems with retractable panels, automated shading, and climate control protect high-value crops during extreme weather events, maintaining optimal growing conditions regardless of external conditions. Drone surveillance systems equipped with thermal and multispectral cameras monitor crop stress indicators across large areas, identifying heat damage, water stress, and disease pressure before visual symptoms appear. Emergency response protocols integrate weather alerts with mobile notification systems, enabling rapid deployment of protective measures including temporary shelters, emergency harvesting, and crop protection sprays. Parametric insurance systems linked to weather station data provide automated compensation when specified weather thresholds are exceeded, ensuring financial protection within 48 hours of verified weather events.\n\nGovernance tips: assign clear owners for drought, heat, wind, and flood playbooks; conduct two drills per year; and review KPI dashboards (yield impact avoided, downtime avoided, and claim cycles) after each event to refine thresholds.",
    conclusion:
      "Climate resilience technology transforms weather uncertainty from threat to manageable risk factor. Strategic technology investments of 12% of operational budget protect 100% of revenue potential while enabling premium climate-smart certifications.",
    tags: ["Climate Technology", "Weather Monitoring", "Predictive Analytics", "Automated Response", "Risk Management", "Smart Agriculture"],
    description:
      "Discover advanced technologies that help plantations adapt to climate challenges through intelligent monitoring and automated response systems.",
    relatedTopics: ["climate technology", "weather monitoring", "predictive analytics", "automated response", "risk management", "smart agriculture"],
    techCategory: "Climate Tech",
    author: "Resilience Works",
    slug: "climate-resilience-weather-response"
  },
  {
    id: 205,
    title: "Digital Marketing Systems: E-commerce & Analytics Platforms",
    category: "Digital Platforms",
    categoryColor: "purple",
    publishDate: "2025-08-12",
    readingTime: "8 min read",
    views: 1350,
    introduction:
      "Advanced e-commerce platforms, customer analytics systems, and social media automation tools enable direct global market access while building premium brands through data-driven marketing strategies and customer engagement technologies. Blending B2B and D2C creates resilient revenue.",
    featuredImage: "/images/modern-technologies/m5.webp",
    imageCaption: "Digital marketing command center with analytics dashboards and e-commerce management systems",
    mainContent:
      "Digital marketing systems leverage cutting-edge technology platforms to transform traditional agricultural products into global premium brands with direct customer relationships. Advanced e-commerce platforms integrated with inventory management, payment processing, and shipping logistics enable seamless transactions across 50+ countries while maintaining 99.9% uptime and sub-3-second page load speeds. Customer relationship management systems powered by artificial intelligence analyze purchasing patterns, seasonal preferences, and engagement behaviors to create personalized marketing campaigns that achieve 45% higher conversion rates than generic approaches. Social media automation tools schedule content across multiple platforms, monitor brand mentions, and respond to customer inquiries using natural language processing, maintaining 24/7 customer engagement with minimal manual intervention. Search engine optimization platforms continuously monitor keyword rankings, competitor activities, and search trends, automatically adjusting content strategies to maintain top-3 rankings for high-value search terms. Email marketing automation systems segment customers based on purchase history, geographic location, and engagement levels, delivering personalized content that maintains 35% open rates and 8% click-through rates compared to industry averages of 21% and 3%. Analytics dashboards integrate data from all marketing channels, providing real-time insights into campaign performance, customer lifetime value, and return on marketing investment with drill-down capabilities to individual customer interactions.\n\nExecution notes: standardize product data (specs, origin stories, brew guides) in a PIM, implement server-side tracking to reduce attribution gaps, and run quarterly CRO sprints on cart and checkout steps. For B2B buyers, publish downloadable spec sheets and logistics calculators to shorten sales cycles.",
    conclusion:
      "Digital marketing systems democratize global market access while building sustainable competitive advantages through direct customer relationships. Technology investments of 8% of revenue generate 300% returns through premium pricing and market expansion.",
    tags: ["E-commerce Technology", "Marketing Automation", "Customer Analytics", "Digital Platforms", "SEO Technology", "Social Media Tools"],
    description:
      "Explore digital marketing technologies that enable direct global sales and premium brand building through advanced e-commerce and analytics systems.",
    relatedTopics: ["e-commerce technology", "marketing automation", "customer analytics", "digital platforms", "seo technology", "social media tools"],
    techCategory: "Digital Platforms",
    author: "Growth Stack",
    slug: "digital-marketing-ecommerce-analytics"
  }
])

// Seed a small in-memory comment store to make the module more useful
const commentsByPost = ref<Record<number, Comment[]>>({
  201: [
    {
      id: 1,
      author: "Ruwan Perera",
      avatar: "/avatars/ruwan.png",
      date: "2025-08-21",
      content: "We piloted 12 LoRa nodes—the moisture alerts alone paid for the trial within one season.",
      likes: 7
    }
  ],
  203: [
    {
      id: 2,
      author: "Ishara D.",
      avatar: "/avatars/ishara.png",
      date: "2025-08-17",
      content: "Hyperspectral sorting cut our rework by half. Any guidance on SPC chart limits?",
      likes: 4
    }
  ]
})

// ---------- Composable ----------
export const useModernTechStore = () => {
  // ----- Actions -----
  const selectPost = (post: ModernTechPost): void => {
    selectedPost.value = post
  }

  const getPostById = (id: number): ModernTechPost | undefined => {
    return modernTechPosts.value.find(post => post.id === id)
  }

  // Enhanced related posts logic for modern technology content (with recency tiebreaker)
  const getRelatedPosts = (currentPostId: number, limit: number = 3): ModernTechPost[] => {
    const currentPost = getPostById(currentPostId)
    if (!currentPost) return []

    const candidates = modernTechPosts.value.filter(post => post.id !== currentPostId)

    const scored = candidates.map(post => {
      let score = 0

      // Strong signal: same tech category
      if (post.techCategory === currentPost.techCategory) score += 15

      // Same content category
      if (post.category === currentPost.category) score += 10

      // Shared tags
      const sharedTags = post.tags.filter(tag =>
        currentPost.tags.some(t => normalize(t).includes(normalize(tag)) || normalize(tag).includes(normalize(t)))
      )
      score += sharedTags.length * 3

      // Shared related topics
      const sharedTopics = post.relatedTopics.filter(topic =>
        currentPost.relatedTopics.some(rt => normalize(rt).includes(normalize(topic)) || normalize(topic).includes(normalize(rt)))
      )
      score += sharedTopics.length * 2

      return { post, score }
    })

    return scored
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score
        // Tiebreaker: newer first
        return parseDate(b.post.publishDate).getTime() - parseDate(a.post.publishDate).getTime()
      })
      .slice(0, limit)
      .map(s => s.post)
  }

  const getAllPosts = (): ModernTechPost[] => {
    return modernTechPosts.value
  }

  const getAllPostsSortedByDate = (): ModernTechPost[] => {
    return [...modernTechPosts.value].sort(
      (a, b) => parseDate(b.publishDate).getTime() - parseDate(a.publishDate).getTime()
    )
  }

  const getPostsByCategory = (category: string): ModernTechPost[] => {
    const key = normalize(category)
    return modernTechPosts.value.filter(post => normalize(post.category) === key)
  }

  const getPostsByTechCategory = (techCategory: string): ModernTechPost[] => {
    const key = normalize(techCategory)
    return modernTechPosts.value.filter(post => normalize(post.techCategory).includes(key))
  }

  const getPostsByTag = (tag: string): ModernTechPost[] => {
    const key = normalize(tag)
    return modernTechPosts.value.filter(post => post.tags.some(t => normalize(t) === key))
  }

  const getPostsInDateRange = (startISO: string, endISO: string): ModernTechPost[] => {
    const start = parseDate(startISO).getTime()
    const end = parseDate(endISO).getTime()
    return modernTechPosts.value.filter(p => {
      const t = parseDate(p.publishDate).getTime()
      return t >= start && t <= end
    })
  }

  const getRecentPosts = (limit: number = 3): ModernTechPost[] => {
    return getAllPostsSortedByDate().slice(0, limit)
  }

  const getPopularPosts = (limit: number = 3): ModernTechPost[] => {
    return [...modernTechPosts.value].sort((a, b) => b.views - a.views).slice(0, limit)
  }

  const paginatePosts = (page: number = 1, pageSize: number = 10, sortBy: 'date' | 'views' = 'date') => {
    const source =
      sortBy === 'views'
        ? [...modernTechPosts.value].sort((a, b) => b.views - a.views)
        : getAllPostsSortedByDate()
    const total = source.length
    const start = (page - 1) * pageSize
    const end = start + pageSize
    return {
      page,
      pageSize,
      total,
      pages: Math.max(1, Math.ceil(total / pageSize)),
      items: source.slice(start, end)
    }
  }

  const searchPosts = (query: string): ModernTechPost[] => {
    const q = normalize(query)
    return modernTechPosts.value.filter(post =>
      normalize(post.title).includes(q) ||
      normalize(post.description).includes(q) ||
      normalize(post.category).includes(q) ||
      normalize(post.techCategory).includes(q) ||
      post.tags.some(tag => normalize(tag).includes(q)) ||
      post.relatedTopics.some(topic => normalize(topic).includes(q))
    )
  }

  // ----- Comments API (in-memory demo) -----
  const getComments = (postId: number): Comment[] => {
    return commentsByPost.value[postId] ? [...commentsByPost.value[postId]] : []
  }

  const addComment = (postId: number, payload: Omit<Comment, 'id' | 'date' | 'likes'> & { date?: string; likes?: number }): Comment => {
    const list = commentsByPost.value[postId] || []
    const newComment: Comment = {
      id: Date.now(),
      author: payload.author,
      avatar: payload.avatar,
      content: payload.content,
      date: payload.date ?? new Date().toISOString().slice(0, 10),
      likes: payload.likes ?? 0
    }
    commentsByPost.value[postId] = [...list, newComment]
    return newComment
  }

  const likeComment = (postId: number, commentId: number) => {
    const list = commentsByPost.value[postId]
    if (!list) return
    commentsByPost.value[postId] = list.map(c => (c.id === commentId ? { ...c, likes: c.likes + 1 } : c))
  }

  // ----- Computed -----
  const selectedPostComputed = computed(() => selectedPost.value)
  const allPosts = computed(() => modernTechPosts.value)
  const totalPosts = computed(() => modernTechPosts.value.length)

  const categories = computed(() => {
    const set = new Set(modernTechPosts.value.map(p => p.category))
    return Array.from(set).sort()
  })

  const techCategories = computed(() => {
    const set = new Set(modernTechPosts.value.map(p => p.techCategory))
    return Array.from(set).sort()
  })

  const allTags = computed(() => {
    const set = new Set<string>()
    modernTechPosts.value.forEach(p => p.tags.forEach(t => set.add(t)))
    return Array.from(set).sort()
  })

  const getStats = () => {
    const posts = modernTechPosts.value
    const byCategory: Record<string, number> = {}
    const byTechCategory: Record<string, number> = {}
    let totalViews = 0

    posts.forEach(p => {
      totalViews += p.views
      byCategory[p.category] = (byCategory[p.category] ?? 0) + 1
      byTechCategory[p.techCategory] = (byTechCategory[p.techCategory] ?? 0) + 1
    })

    return {
      total: posts.length,
      totalViews,
      byCategory,
      byTechCategory,
      uniqueTags: allTags.value.length
    }
  }

  const getArchiveMonths = () => {
    const months = new Set(
      modernTechPosts.value.map(p => p.publishDate.slice(0, 7)) // YYYY-MM
    )
    return Array.from(months).sort().reverse()
  }

  return {
    // State
    selectedPost: selectedPostComputed,
    allPosts,
    totalPosts,
    categories,
    techCategories,
    allTags,

    // Actions
    selectPost,
    getPostById,
    getRelatedPosts,
    getAllPosts,
    getAllPostsSortedByDate,
    getPostsByCategory,
    getPostsByTechCategory,
    getPostsByTag,
    getPostsInDateRange,
    getRecentPosts,
    getPopularPosts,
    paginatePosts,
    searchPosts,

    // Comments
    getComments,
    addComment,
    likeComment,

    // Analytics / Utils
    getStats,
    getArchiveMonths
  }
}
