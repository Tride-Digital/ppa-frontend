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
  techCategory: string // Specific to modern technology
}

export interface Comment {
  id: number
  author: string
  avatar: string
  date: string
  content: string
  likes: number
}

// State
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
    introduction: "Advanced soil sensors, IoT monitoring, and real-time data analytics transform traditional farming into precision agriculture, enabling optimal nutrient management and crop yields through intelligent automation and data-driven decisions.",
    featuredImage: "/images/modern-technologies/m1.webp",
    imageCaption: "SMART soil sensors and IoT devices monitoring plantation conditions in real-time",
    mainContent: "SMART soil technology revolutionizes plantation management through network-connected sensors that continuously monitor soil conditions across vast agricultural areas. Advanced sensor arrays measure pH levels (accuracy ±0.1), moisture content (±2%), temperature (±0.5°C), electrical conductivity, and NPK ratios every 15 minutes, transmitting data via LoRaWAN networks to cloud-based analytics platforms. Machine learning algorithms analyze 50,000+ daily measurements to identify patterns invisible to human observation, predicting optimal fertilizer application windows with 95% accuracy. Automated irrigation systems integrate weather forecasts, soil data, and crop growth stages to deliver precise water quantities, reducing consumption by 40% while maintaining optimal growing conditions. Predictive analytics identify nutrient deficiencies 2-3 weeks before visible symptoms appear, enabling preventive interventions that protect crop quality and yields. GPS-guided variable-rate applicators use real-time soil data to apply fertilizers with centimeter-level precision, ensuring each area receives exactly what it needs. Mobile applications provide plantation managers with interactive dashboards, alert systems, and recommendation engines accessible from anywhere with internet connectivity.",
    conclusion: "SMART soil technology delivers measurable returns through 25-30% yield increases, 35% input cost reductions, and consistent premium crop quality. This precision approach ensures competitive advantage while building sustainable operations for future generations.",
    tags: ["IoT Sensors", "Precision Agriculture", "Data Analytics", "Automated Systems", "Smart Farming", "Soil Monitoring"],
    description: "Discover how IoT sensors and data analytics revolutionize soil management for optimal crop performance and resource efficiency.",
    relatedTopics: ["iot sensors", "precision agriculture", "data analytics", "automated systems", "smart farming", "soil monitoring"],
    techCategory: "IoT & Sensors"
  },
  {
    id: 202,
    title: "Sustainable Processing Equipment: Green Technology Innovation",
    category: "Green Technology",
    categoryColor: "amber",
    publishDate: "2025-08-18",
    readingTime: "9 min read",
    views: 1630,
    introduction: "Eco-friendly processing equipment using renewable energy, bio-based alternatives, and zero-waste systems create sustainable operations while maintaining premium quality and reducing environmental impact through innovative green technologies.",
    featuredImage: "/images/modern-technologies/m2.webp",
    imageCaption: "Solar-powered processing facility with sustainable equipment and renewable energy systems",
    mainContent: "Sustainable processing equipment transforms traditional manufacturing through innovative green technologies that reduce environmental impact while enhancing operational efficiency. Solar panel arrays generating 500kW capacity power entire processing facilities, with battery storage systems providing 12-hour backup during cloudy conditions, eliminating fossil fuel dependence. Advanced heat recovery systems capture waste heat from drying operations, reducing overall energy consumption by 60% while maintaining precise temperature control for optimal product quality. Bio-waste digesters convert organic processing residues into biogas, methane, and high-grade compost, creating circular economy systems that eliminate waste streams entirely. Water treatment plants with reverse osmosis and UV sterilization recycle 95% of processing water, reducing freshwater consumption from 1000L/kg to 150L/kg of finished product. Energy-efficient LED lighting with motion sensors and daylight integration reduces electricity consumption by 75% while providing optimal working conditions. Smart HVAC systems with CO2 sensors and occupancy detection maintain ideal processing environments using 50% less energy than conventional systems. Automated material handling systems powered by regenerative electric motors reduce manual labor by 80% while improving workplace safety and processing consistency.",
    conclusion: "Sustainable processing equipment proves that environmental responsibility and operational excellence create synergistic benefits. Green technology investments reduce operational costs by 45% while enabling premium eco-certifications that command 25% price premiums.",
    tags: ["Renewable Energy", "Green Technology", "Sustainable Equipment", "Solar Power", "Energy Efficiency", "Zero Waste"],
    description: "Explore cutting-edge green technologies that make processing operations sustainable while maintaining premium quality standards.",
    relatedTopics: ["renewable energy", "green technology", "sustainable equipment", "solar power", "energy efficiency", "zero waste"],
    techCategory: "Green Technology"
  },
  {
    id: 203,
    title: "Precision Tea Processing: Automated Quality Control Systems",
    category: "Automation",
    categoryColor: "brown",
    publishDate: "2025-08-16",
    readingTime: "11 min read",
    views: 1740,
    introduction: "Climate-controlled chambers, automated sorting systems, and precision packaging technology ensure consistent Ceylon tea quality through advanced automation that monitors every processing stage with scientific accuracy.",
    featuredImage: "/images/modern-technologies/m3.webp",
    imageCaption: "Automated tea processing line with precision sorting and quality control systems",
    mainContent: "Precision tea processing utilizes advanced automation to achieve consistent premium quality that traditional methods cannot match. Climate-controlled withering chambers maintain exact temperature (24±1°C) and humidity (68±2%) conditions using PLC-controlled systems that respond to real-time environmental changes within seconds. Automated rolling machines with servo-controlled pressure systems apply precise force (2.5-4.0 bar) based on leaf moisture content, ensuring optimal cell breakdown without damage to delicate tea particles. Computer-vision sorting systems equipped with hyperspectral cameras analyze each tea particle for size, color, and quality at 10,000 particles per second, achieving 99.8% grading accuracy compared to 85% for manual sorting. Fermentation monitoring systems track temperature, humidity, and oxidation levels continuously, with automated misting systems maintaining optimal conditions throughout the 2-4 hour process. Precision drying tunnels with infrared sensors monitor moisture levels at multiple points, automatically adjusting airflow and temperature to achieve uniform 3% moisture content across all particles. Nitrogen flushing packaging systems remove 99.9% of oxygen while maintaining product integrity, extending shelf life to 36 months while preserving fresh aroma and flavor compounds. Quality control laboratories equipped with gas chromatography and mass spectrometry analyze samples every 30 minutes, ensuring consistent flavor profiles that meet international buyer specifications.",
    conclusion: "Precision tea processing automation ensures Ceylon tea maintains its global reputation for excellence while reducing processing costs by 30% and achieving 99% quality consistency that commands premium prices worldwide.",
    tags: ["Process Automation", "Quality Control", "Ceylon Tea Technology", "Precision Systems", "Automated Sorting", "Climate Control"],
    description: "Learn how automation and precision technology maintain Ceylon tea's world-renowned quality standards through scientific processing control.",
    relatedTopics: ["process automation", "quality control", "ceylon tea technology", "precision systems", "automated sorting", "climate control"],
    techCategory: "Process Automation"
  },
  {
    id: 204,
    title: "Climate Resilience Technology: Weather Monitoring & Response Systems",
    category: "Climate Tech",
    categoryColor: "blue",
    publishDate: "2025-08-14",
    readingTime: "12 min read",
    views: 1520,
    introduction: "Advanced weather monitoring systems, drought-resistant crop varieties, and adaptive irrigation technology help plantations build resilience against climate challenges through predictive analytics and automated response systems.",
    featuredImage: "/images/modern-technologies/m4.webp",
    imageCaption: "Weather monitoring station with climate sensors and automated response systems",
    mainContent: "Climate resilience technology creates comprehensive defense systems against increasingly unpredictable weather patterns threatening agricultural operations. Advanced weather monitoring stations equipped with 15+ sensors track temperature, humidity, rainfall, wind speed, soil moisture, UV intensity, and atmospheric pressure with meteorological-grade accuracy, updating cloud databases every 5 minutes. AI-powered forecasting systems analyze satellite imagery, local sensor data, and global weather models to provide hyper-local predictions with 96% accuracy for 7-day forecasts and 88% accuracy for 14-day projections. Automated irrigation systems respond instantly to weather alerts, pre-positioning water reserves before drought periods and adjusting application rates based on predicted rainfall patterns. Smart greenhouse systems with retractable panels, automated shading, and climate control protect high-value crops during extreme weather events, maintaining optimal growing conditions regardless of external conditions. Drone surveillance systems equipped with thermal and multispectral cameras monitor crop stress indicators across large areas, identifying heat damage, water stress, and disease pressure before visual symptoms appear. Emergency response protocols integrate weather alerts with mobile notification systems, enabling rapid deployment of protective measures including temporary shelters, emergency harvesting, and crop protection sprays. Parametric insurance systems linked to weather station data provide automated compensation when specified weather thresholds are exceeded, ensuring financial protection within 48 hours of verified weather events.",
    conclusion: "Climate resilience technology transforms weather uncertainty from threat to manageable risk factor. Strategic technology investments of 12% of operational budget protect 100% of revenue potential while enabling premium climate-smart certifications.",
    tags: ["Climate Technology", "Weather Monitoring", "Predictive Analytics", "Automated Response", "Risk Management", "Smart Agriculture"],
    description: "Discover advanced technologies that help plantations adapt to climate challenges through intelligent monitoring and automated response systems.",
    relatedTopics: ["climate technology", "weather monitoring", "predictive analytics", "automated response", "risk management", "smart agriculture"],
    techCategory: "Climate Tech"
  },
  {
    id: 205,
    title: "Digital Marketing Systems: E-commerce & Analytics Platforms",
    category: "Digital Platforms",
    categoryColor: "purple",
    publishDate: "2025-08-12",
    readingTime: "8 min read",
    views: 1350,
    introduction: "Advanced e-commerce platforms, customer analytics systems, and social media automation tools enable direct global market access while building premium brands through data-driven marketing strategies and customer engagement technologies.",
    featuredImage: "/images/modern-technologies/m5.webp",
    imageCaption: "Digital marketing command center with analytics dashboards and e-commerce management systems",
    mainContent: "Digital marketing systems leverage cutting-edge technology platforms to transform traditional agricultural products into global premium brands with direct customer relationships. Advanced e-commerce platforms integrated with inventory management, payment processing, and shipping logistics enable seamless transactions across 50+ countries while maintaining 99.9% uptime and sub-3-second page load speeds. Customer relationship management systems powered by artificial intelligence analyze purchasing patterns, seasonal preferences, and engagement behaviors to create personalized marketing campaigns that achieve 45% higher conversion rates than generic approaches. Social media automation tools schedule content across multiple platforms, monitor brand mentions, and respond to customer inquiries using natural language processing, maintaining 24/7 customer engagement with minimal manual intervention. Search engine optimization platforms continuously monitor keyword rankings, competitor activities, and search trends, automatically adjusting content strategies to maintain top-3 rankings for high-value search terms. Email marketing automation systems segment customers based on purchase history, geographic location, and engagement levels, delivering personalized content that maintains 35% open rates and 8% click-through rates compared to industry averages of 21% and 3%. Analytics dashboards integrate data from all marketing channels, providing real-time insights into campaign performance, customer lifetime value, and return on marketing investment with drill-down capabilities to individual customer interactions.",
    conclusion: "Digital marketing systems democratize global market access while building sustainable competitive advantages through direct customer relationships. Technology investments of 8% of revenue generate 300% returns through premium pricing and market expansion.",
    tags: ["E-commerce Technology", "Marketing Automation", "Customer Analytics", "Digital Platforms", "SEO Technology", "Social Media Tools"],
    description: "Explore digital marketing technologies that enable direct global sales and premium brand building through advanced e-commerce and analytics systems.",
    relatedTopics: ["e-commerce technology", "marketing automation", "customer analytics", "digital platforms", "seo technology", "social media tools"],
    techCategory: "Digital Platforms"
  },
])

// Composable Function
export const useModernTechStore = () => {
  // Actions
  const selectPost = (post: ModernTechPost): void => {
    selectedPost.value = post
  }

  const getPostById = (id: number): ModernTechPost | undefined => {
    return modernTechPosts.value.find(post => post.id === id)
  }

  // Enhanced related posts logic for modern technology content
  const getRelatedPosts = (currentPostId: number, limit: number = 3): ModernTechPost[] => {
    const currentPost = getPostById(currentPostId)
    if (!currentPost) return []

    const scoredPosts = modernTechPosts.value
      .filter(post => post.id !== currentPostId)
      .map(post => {
        let score = 0
        
        // Same tech category gets highest score
        if (post.techCategory === currentPost.techCategory) {
          score += 15
        }
        
        // Same category gets high score
        if (post.category === currentPost.category) {
          score += 10
        }
        
        // Shared tags get medium score
        const sharedTags = post.tags.filter(tag => 
          currentPost.tags.some(currentTag => 
            currentTag.toLowerCase().includes(tag.toLowerCase()) ||
            tag.toLowerCase().includes(currentTag.toLowerCase())
          )
        )
        score += sharedTags.length * 3
        
        // Shared related topics get medium score
        const sharedTopics = post.relatedTopics.filter(topic =>
          currentPost.relatedTopics.some(currentTopic =>
            currentTopic.toLowerCase().includes(topic.toLowerCase()) ||
            topic.toLowerCase().includes(currentTopic.toLowerCase())
          )
        )
        score += sharedTopics.length * 2
        
        return { post, score }
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => item.post)

    return scoredPosts
  }

  const getAllPosts = (): ModernTechPost[] => {
    return modernTechPosts.value
  }

  const getPostsByCategory = (category: string): ModernTechPost[] => {
    return modernTechPosts.value.filter(post => 
      post.category.toLowerCase() === category.toLowerCase()
    )
  }

  const getPostsByTechCategory = (techCategory: string): ModernTechPost[] => {
    return modernTechPosts.value.filter(post =>
      post.techCategory.toLowerCase().includes(techCategory.toLowerCase())
    )
  }

  const searchPosts = (query: string): ModernTechPost[] => {
    const searchTerm = query.toLowerCase()
    return modernTechPosts.value.filter(post =>
      post.title.toLowerCase().includes(searchTerm) ||
      post.description.toLowerCase().includes(searchTerm) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      post.relatedTopics.some(topic => topic.toLowerCase().includes(searchTerm)) ||
      post.techCategory.toLowerCase().includes(searchTerm)
    )
  }

  // Computed Properties
  const selectedPost = computed(() => selectedPost.value)
  const allPosts = computed(() => modernTechPosts.value)
  const totalPosts = computed(() => modernTechPosts.value.length)

  return {
    // State
    selectedPost,
    allPosts,
    totalPosts,

    // Actions
    selectPost,
    getPostById,
    getRelatedPosts,
    getAllPosts,
    getPostsByCategory,
    getPostsByTechCategory,
    searchPosts
  }
}