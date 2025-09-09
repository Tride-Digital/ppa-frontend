// composables/valueAdditionStore.ts
import { ref, computed } from 'vue'

// Type Definitions
export interface ValueAdditionPost {
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
  processStage: string // Specific to value addition
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
const selectedPost = ref<ValueAdditionPost | null>(null)

const valueAdditionPosts = ref<ValueAdditionPost[]>([
  {
    id: 101,
    title: "Ceylon Tea Processing Excellence: From Leaf to Premium Package",
    category: "Processing",
    categoryColor: "brown",
    publishDate: "2025-08-20",
    readingTime: "12 min read",
    views: 1850,
    introduction: "Fresh green tea leaves move through advanced withering, rolling, fermentation, and drying processes, with modern grading and packaging techniques that create superior flavor, enhanced aroma, and increased market value throughout the entire processing chain.",
    featuredImage: "/images/value-addition/v6.webp",
    imageCaption: "Modern Ceylon tea processing facility showcasing precision equipment for optimal flavor and aroma development",
    mainContent: "Ceylon tea processing excellence transforms simple green leaves into premium products that command top prices in global markets. The withering process utilizes climate-controlled chambers maintaining precise temperature (24-26°C) and humidity (65-70%) levels, ensuring optimal moisture reduction from 80% to 68% while preserving essential oils that give Ceylon tea its distinctive character. Advanced rolling machines with variable pressure settings protect leaf integrity while promoting proper cell breakdown necessary for optimal fermentation, with modern machines capable of processing 500kg batches with consistent quality. Temperature-controlled fermentation chambers with continuous monitoring allow tea masters to achieve exact oxidation levels between 85-95% humidity and 26-28°C, creating consistent flavor profiles that meet international buyer specifications. Modern drying systems use precisely controlled hot air circulation at 87-93°C to ensure uniform moisture reduction to 3-4% while preserving natural aromatics. Automated optical sorting systems classify leaves by size, color, and quality with 99.7% accuracy, ensuring consistent grading standards that meet BOPF, Pekoe, and Broken Orange Pekoe classifications. Innovative packaging technologies including nitrogen flushing and advanced moisture barriers extend shelf life to 24-36 months while preserving fresh, vibrant flavors.",
    conclusion: "Modern tea processing excellence has elevated Ceylon tea from a traditional commodity to a premium product commanding 40-60% price premiums in global markets. These precision methods ensure every cup delivers exceptional quality that has made Ceylon tea the preferred choice of discerning consumers worldwide, securing Sri Lanka's position as the world's finest tea producer.",
    tags: ["Ceylon Tea", "Tea Processing", "Value Addition", "Quality Enhancement", "Export Premium", "Processing Excellence"],
    description: "Discover how advanced tea processing techniques transform fresh leaves into premium Ceylon tea that commands top prices in global markets.",
    relatedTopics: ["tea processing", "value addition", "quality enhancement", "ceylon tea", "processing excellence", "premium tea"],
    processStage: "Processing & Packaging"
  },
  {
    id: 102,
    title: "SMART Agriculture Revolution: Precision Farming for Maximum Value",
    category: "Technology",
    categoryColor: "green",
    publishDate: "2025-08-18",
    readingTime: "10 min read",
    views: 1420,
    introduction: "Modern precision agriculture techniques using advanced soil sensors, real-time data analytics, and automated nutrient management systems optimize crop yields while reducing costs through intelligent farming decisions that maximize value at every stage.",
    featuredImage: "/images/value-addition/v1.webp",
    imageCaption: "SMART agriculture sensors monitoring soil conditions in real-time across a modern Sri Lankan plantation",
    mainContent: "SMART agriculture revolution transforms traditional farming into precision science that maximizes value creation at every stage of production. IoT soil sensors deployed every 50 meters provide real-time monitoring of pH levels (optimal 5.5-6.5 for tea), moisture content (60-70% field capacity), and NPK ratios, with data transmitted to cloud systems for instant analysis. Machine learning algorithms process 10,000+ data points daily to predict optimal fertilizer application timing, reducing costs by 25-30% while increasing yields by 15-20%. Automated irrigation systems respond to actual soil conditions rather than predetermined schedules, delivering precise water quantities based on plant growth stage, weather forecasts, and soil moisture readings. Drone technology equipped with multispectral cameras identifies stressed plants, disease outbreaks, and nutrient deficiencies 2-3 weeks before visible symptoms appear, enabling preventive interventions that protect crop quality. GPS-guided variable-rate fertilizer spreaders apply nutrients with centimeter-level precision, ensuring each plant receives exactly what it needs for optimal growth. Mobile applications provide plantation managers with real-time dashboards showing field conditions, weather alerts, and recommended actions, enabling management of multiple sites from anywhere in the world.",
    conclusion: "SMART agriculture revolution delivers measurable returns through 20-25% increased yields, 30% reduced input costs, and premium prices for consistently high-quality crops. This technology-driven approach ensures plantation competitiveness in global markets while building sustainable operations for future generations.",
    tags: ["SMART Agriculture", "Precision Farming", "IoT Technology", "Data Analytics", "Yield Optimization", "Cost Reduction"],
    description: "Learn how SMART agriculture technologies maximize crop value through precision farming and data-driven decision making.",
    relatedTopics: ["smart agriculture", "precision farming", "iot sensors", "data analytics", "yield optimization", "automated systems"],
    processStage: "Cultivation & Monitoring"
  },
  {
    id: 103,
    title: "Sustainable Processing Revolution: Eco-Value Creation Methods",
    category: "Sustainability",
    categoryColor: "amber",
    publishDate: "2025-08-16",
    readingTime: "9 min read",
    views: 1290,
    introduction: "Environmentally friendly processing methods that maintain premium quality while reducing environmental impact and ensuring long-term sustainability through eco-conscious techniques and renewable energy integration that add value through green certification.",
    featuredImage: "/images/value-addition/v2.webp",
    imageCaption: "Sustainable processing facility powered by renewable energy with zero-waste production systems",
    mainContent: "Sustainable processing revolution creates additional value streams while protecting environmental resources for future generations. Solar-powered drying systems replace traditional fuel-fired dryers, reducing carbon emissions by 80% while maintaining precise temperature control for optimal product quality. Bio-waste processing units convert tea dust, rubber wood chips, and processing residues into valuable biomass pellets that generate 40% of facility power requirements. Water recycling systems capture and purify processing water through multi-stage filtration, reducing freshwater consumption by 70% while maintaining strict quality standards. Eco-friendly chemical alternatives replace harmful processing agents - natural enzymes accelerate fermentation, biodegradable lubricants protect machinery, and organic pest control methods eliminate toxic residues. Energy-efficient LED lighting systems reduce electricity consumption by 60% while providing optimal working conditions for quality control operations. Carbon footprint tracking systems monitor all processing stages, enabling facilities to achieve carbon-neutral certification that commands 15-20% premium prices in eco-conscious markets. Waste-to-wealth programs convert organic waste into high-value compost, biochar, and natural fertilizers that supply 30% of plantation nutrient requirements.",
    conclusion: "Sustainable processing revolution demonstrates that environmental responsibility and economic success create synergistic value. Green certifications open premium markets while cost savings from renewable energy and waste reduction improve profitability by 25-30%, ensuring long-term competitive advantage.",
    tags: ["Sustainable Processing", "Renewable Energy", "Zero Waste", "Green Certification", "Environmental Value", "Eco-Innovation"],
    description: "Explore how sustainable processing methods create additional value through environmental responsibility and green certifications.",
    relatedTopics: ["sustainable processing", "renewable energy", "zero waste", "green certification", "environmental value", "eco-innovation"],
    processStage: "Eco-Processing & Certification"
  },
  {
    id: 104,
    title: "Climate Resilience: Value Protection Through Adaptation Innovation",
    category: "Climate",
    categoryColor: "blue",
    publishDate: "2025-08-14",
    readingTime: "11 min read",
    views: 1380,
    introduction: "Innovative techniques to adapt plantation operations to changing climate conditions while maintaining productivity and profitability through resilience-building strategies and weather-smart technologies that protect value creation capacity.",
    featuredImage: "/images/value-addition/v3.webp",
    imageCaption: "Climate-resilient plantation implementing innovative adaptation strategies for long-term value protection",
    mainContent: "Climate resilience innovation protects value creation capacity against increasingly unpredictable weather patterns threatening plantation operations worldwide. Advanced weather monitoring stations with AI-powered forecasting provide 7-14 day precision forecasts with 95% accuracy, enabling proactive protection measures that prevent crop losses. Drought-resistant crop varieties developed through selective breeding maintain 80-90% normal yields even during 30% below-average rainfall years, while requiring 40% less irrigation water. Smart irrigation systems with soil moisture sensors and weather integration optimize water usage, reducing consumption by 50% while maintaining optimal growing conditions through precise scheduling and micro-climate management. Shade management systems using adjustable canopy covers protect sensitive crops from extreme heat (>32°C) and intense UV radiation, maintaining quality standards during heat stress periods. Multi-layered crop systems with climate-tolerant species create beneficial microclimates that moderate temperature extremes and improve overall ecosystem resilience. Emergency response protocols activated by weather alerts protect harvested crops through rapid deployment of mobile drying units, temporary storage facilities, and expedited processing schedules. Insurance integration with weather data provides parametric coverage that compensates for climate-related losses within 48 hours of verified weather events.",
    conclusion: "Climate resilience innovation ensures consistent value creation despite increasing weather volatility. Adaptation investments of 10-15% of operational costs protect 100% of revenue potential while opening opportunities for climate-smart certification premiums that enhance long-term profitability.",
    tags: ["Climate Resilience", "Weather Adaptation", "Risk Management", "Crop Protection", "Value Protection", "Smart Agriculture"],
    description: "Discover innovative climate adaptation strategies that protect plantation value creation against weather uncertainties.",
    relatedTopics: ["climate resilience", "weather adaptation", "risk management", "crop protection", "value protection", "adaptation innovation"],
    processStage: "Risk Management & Protection"
  },
  {
    id: 105,
    title: "Digital Marketing Excellence: Premium Value Realization Globally",
    category: "Marketing",
    categoryColor: "purple",
    publishDate: "2025-08-12",
    readingTime: "8 min read",
    views: 1150,
    introduction: "Modern digital strategies to connect Sri Lankan plantation products with global markets and achieve premium pricing through authentic brand building and targeted customer engagement that realizes maximum value from quality products.",
    featuredImage: "/images/value-addition/v4.webp",
    imageCaption: "Digital marketing dashboard displaying global reach and premium pricing achievements for Sri Lankan plantation products",
    mainContent: "Digital marketing excellence transforms quality products into premium global brands that command top-tier pricing and customer loyalty. Social media storytelling showcases the complete plantation-to-plate journey, highlighting traditional craftsmanship, sustainable practices, and the dedicated people behind each product, generating 300% higher engagement than generic product marketing. Content marketing through professional photography, educational videos, and virtual plantation tours builds emotional connections that convert 25% of viewers into customers while commanding 40% price premiums over commodity products. Search engine optimization targeting premium keywords like 'single-origin Ceylon tea' and 'estate-grown rubber' captures high-intent customers willing to pay 50-80% premiums for authenticity and quality. Influencer partnerships with celebrity chefs, wellness advocates, and sustainability leaders provide authentic endorsements that reach targeted demographics, generating $15-20 return for every marketing dollar invested. E-commerce platforms with integrated customer relationship management systems track purchasing patterns, enabling personalized recommendations that increase average order values by 35-40%. Email marketing automation nurtures customer relationships through educational content, exclusive offers, and seasonal promotions, maintaining 65% customer retention rates compared to 23% industry averages.",
    conclusion: "Digital marketing excellence unlocks the full value potential of premium plantation products by connecting quality with customers willing to pay for authenticity. Strategic digital investments of 8-12% of revenue generate 200-300% returns through premium pricing and direct market access.",
    tags: ["Digital Marketing", "Premium Pricing", "Brand Building", "Global Markets", "Customer Engagement", "Value Realization"],
    description: "Learn how digital marketing strategies help plantation products achieve premium pricing and global market recognition.",
    relatedTopics: ["digital marketing", "premium pricing", "brand building", "global markets", "customer engagement", "value realization"],
    processStage: "Marketing & Value Realization"
  },
  {
    id: 106,
    title: "Industry Collaboration: Collective Value Creation Through Unity",
    category: "Collaboration",
    categoryColor: "teal",
    publishDate: "2025-08-10",
    readingTime: "7 min read",
    views: 1680,
    introduction: "United plantation owners sharing knowledge, resources, and best practices to strengthen the entire industry through collective action and strategic partnerships that create value impossible to achieve individually.",
    featuredImage: "/images/value-addition/v5.webp",
    imageCaption: "Sri Lankan plantation owners collaborating on innovative value creation strategies through the PPA alliance",
    mainContent: "Industry collaboration through strategic alliances creates exponential value growth that transforms individual plantation success into sector-wide prosperity. Knowledge sharing platforms enable experienced plantation owners to mentor newcomers while innovative practitioners demonstrate breakthrough techniques, accelerating industry-wide adoption of best practices that increase sector competitiveness. Resource pooling allows member plantations to access expensive equipment, advanced technologies, and specialized expertise through cost-sharing arrangements, reducing individual investment requirements by 60-70% while accessing premium capabilities. Collective bargaining power enables alliance members to negotiate 15-25% better prices for inputs, secure premium rates for outputs, and access international markets requiring larger volumes than individual plantations can provide. Joint research and development initiatives funded through member contributions drive innovation in processing techniques, sustainable practices, and market development strategies, with shared costs reducing individual R&D expenses by 80%. Collaborative marketing initiatives leverage combined reputation and quality standards to build stronger brand recognition in international markets, with alliance certification commanding 20-30% price premiums. Quality standardization programs ensure all member products meet internationally recognized standards, enabling participation in premium market segments previously accessible only to large corporations.",
    conclusion: "Industry collaboration transforms individual plantation operations into a formidable value creation force capable of competing effectively against global agribusiness corporations. Through shared knowledge, pooled resources, and collective action, alliance members achieve 40-60% higher profitability than independent operations.",
    tags: ["Industry Collaboration", "Collective Value", "Resource Pooling", "Knowledge Sharing", "Alliance Benefits", "Sector Transformation"],
    description: "Discover how industry collaboration creates collective value that strengthens individual plantations and the entire sector.",
    relatedTopics: ["industry collaboration", "collective value", "resource pooling", "knowledge sharing", "alliance benefits", "sector transformation"],
    processStage: "Collaboration & Scaling"
  }
])

// Composable Function
export const useValueAdditionStore = () => {
  // Actions
  const selectPost = (post: ValueAdditionPost): void => {
    selectedPost.value = post
  }

  const getPostById = (id: number): ValueAdditionPost | undefined => {
    return valueAdditionPosts.value.find(post => post.id === id)
  }

  // Enhanced related posts logic for value addition content
  const getRelatedPosts = (currentPostId: number, limit: number = 3): ValueAdditionPost[] => {
    const currentPost = getPostById(currentPostId)
    if (!currentPost) return []

    const scoredPosts = valueAdditionPosts.value
      .filter(post => post.id !== currentPostId)
      .map(post => {
        let score = 0
        
        // Same process stage gets highest score
        if (post.processStage === currentPost.processStage) {
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

  const getAllPosts = (): ValueAdditionPost[] => {
    return valueAdditionPosts.value
  }

  const getPostsByCategory = (category: string): ValueAdditionPost[] => {
    return valueAdditionPosts.value.filter(post => 
      post.category.toLowerCase() === category.toLowerCase()
    )
  }

  const getPostsByProcessStage = (stage: string): ValueAdditionPost[] => {
    return valueAdditionPosts.value.filter(post =>
      post.processStage.toLowerCase().includes(stage.toLowerCase())
    )
  }

  const searchPosts = (query: string): ValueAdditionPost[] => {
    const searchTerm = query.toLowerCase()
    return valueAdditionPosts.value.filter(post =>
      post.title.toLowerCase().includes(searchTerm) ||
      post.description.toLowerCase().includes(searchTerm) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      post.relatedTopics.some(topic => topic.toLowerCase().includes(searchTerm)) ||
      post.processStage.toLowerCase().includes(searchTerm)
    )
  }

  // Computed Properties
  const selectedPost = computed(() => selectedPost.value)
  const allPosts = computed(() => valueAdditionPosts.value)
  const totalPosts = computed(() => valueAdditionPosts.value.length)

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
    getPostsByProcessStage,
    searchPosts
  }
}