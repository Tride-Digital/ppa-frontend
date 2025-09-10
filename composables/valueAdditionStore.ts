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
  processStage: string
}

export interface Comment {
  id: number
  author: string
  avatar: string
  date: string
  content: string
  likes: number
}

// ---------- State ----------
const selectedPostRef = ref<ValueAdditionPost | null>(null)

const valueAdditionPosts = ref<ValueAdditionPost[]>([
  {
    id: 101,
    title: 'Pepper Processing',
    category: 'Spices',
    categoryColor: 'gray',
    publishDate: '2025-08-09',
    readingTime: '7 min read',
    views: 2210,
    introduction:
      'Freshly harvested berries are sun-dried and expertly graded into black, white, or ground pepper, ready for premium export markets.',
    featuredImage: '/images/value-addition/v1.webp',
    imageCaption:
      'Sun-drying and grading of pepper berries prior to export.',
    mainContent:
      'Pepper processing begins with selective harvesting at optimal ripeness, followed by washing and sun-drying until moisture falls below 12%. For black pepper, whole berries are dried intact; for white pepper, the outer pericarp is removed after controlled soaking before drying. Precision grading separates lots by size and density to achieve consistent pungency and volatile oil content. Final stages include metal detection, optical sorting, and hygienic packing for whole or milled formats.',
    conclusion:
      'Careful drying and grading deliver consistent quality, enabling premium pricing and strong acceptance in international spice markets.',
    tags: ['pepper', 'black pepper', 'white pepper', 'grading', 'spice processing'],
    description:
      'How pepper berries are dried, graded, and packed into high-value spice formats.',
    relatedTopics: ['pepper grading', 'pepper drying', 'spice export'],
    processStage: 'Processing & Grading'
  },
  {
    id: 102,
    title: 'Coconut Oil Extraction',
    category: 'Oils',
    categoryColor: 'amber',
    publishDate: '2025-08-10',
    readingTime: '8 min read',
    views: 1980,
    introduction:
      'Kernels are dried, pressed, and refined into pure oil for food, beauty, and wellness markets.',
    featuredImage: '/images/value-addition/v2.webp',
    imageCaption:
      'Copra drying and cold-pressing line for virgin coconut oil.',
    mainContent:
      'Mature coconuts are de-husked, split, and dried into copra under controlled conditions. Depending on the product, oil is obtained via expeller pressing or cold-pressing of fresh kernel to produce virgin coconut oil. Further steps include filtration, optional refining/bleaching/deodorizing for RBD grades, and nitrogen-flushed packing to preserve freshness. By-products such as coconut cake are valorized as animal feed or flour.',
    conclusion:
      'Process control and hygienic packing ensure stable flavor, high lauric content, and shelf life suitable for global F&B and cosmetics.',
    tags: ['coconut oil', 'virgin coconut oil', 'RBD', 'cold press', 'copra'],
    description:
      'From kernel to bottle: extracting premium coconut oil for diverse markets.',
    relatedTopics: ['oil extraction', 'copra drying', 'cold pressing'],
    processStage: 'Extraction & Refinement'
  },
  {
    id: 103,
    title: 'Cashew Processing',
    category: 'Nuts',
    categoryColor: 'orange',
    publishDate: '2025-08-11',
    readingTime: '9 min read',
    views: 1735,
    introduction:
      'Raw cashew nuts are steamed, shelled, peeled, and roasted to produce high-quality kernels for snacks, confectionery, and exports.',
    featuredImage: '/images/value-addition/v3.webp',
    imageCaption:
      'Steaming and shelling line producing whole cashew kernels.',
    mainContent:
      'Raw cashew nuts are pre-cleaned and steam-conditioned to soften shells and deactivate irritants. Mechanical shelling and careful peeling preserve kernel integrity and color. Grading sorts kernels by size and wholeness (W180–W450, splits, pieces). Light roasting develops flavor while reducing moisture to 2–3%, followed by metal detection and MAP packing to prevent rancidity.',
    conclusion:
      'Controlled steaming and gentle handling maximize whole-kernel yield, enabling premium categories and export-grade quality.',
    tags: ['cashew', 'steaming', 'shelling', 'roasting', 'grading'],
    description:
      'End-to-end cashew processing for high-yield, premium kernels.',
    relatedTopics: ['nut processing', 'kernel grading', 'moisture control'],
    processStage: 'Shelling & Roasting'
  },
  {
    id: 104,
    title: 'Cinnamon Processing',
    category: 'Spices',
    categoryColor: 'brown',
    publishDate: '2025-08-12',
    readingTime: '8 min read',
    views: 2650,
    introduction:
      'Bark is peeled, dried, and value-added into quills or powder, serving both culinary and medicinal markets.',
    featuredImage: '/images/value-addition/v4.webp',
    imageCaption:
      'Hand-crafted cinnamon quills graded by uniformity and aroma.',
    mainContent:
      'After harvest, outer bark is scraped to expose the delicate inner bark, which is expertly peeled and formed into quills. Controlled drying preserves volatile oils and the signature sweet aroma. Grading assesses quill diameter, color, and uniformity prior to precision cutting, powdering, and packaging. Strict hygiene and low-moisture storage protect quality and minimize mold risk.',
    conclusion:
      'Artisanal peeling with modern QA yields consistent quills and powders prized in premium spice segments.',
    tags: ['cinnamon', 'quills', 'spice grading', 'drying', 'powdering'],
    description:
      'From peeled bark to graded quills and powder with preserved aromatics.',
    relatedTopics: ['cinnamomum verum', 'volatile oils', 'quill grading'],
    processStage: 'Peeling & Quilling'
  },
  {
    id: 105,
    title: 'Coffee Processing',
    category: 'Beverages',
    categoryColor: 'chocolate',
    publishDate: '2025-08-13',
    readingTime: '10 min read',
    views: 1870,
    introduction:
      'Harvested beans are carefully fermented, sun-dried, expertly roasted, and finely ground to craft premium coffee for both local and international markets.',
    featuredImage: '/images/value-addition/v5.webp',
    imageCaption:
      'Washed-process parchment drying before precision roasting.',
    mainContent:
      'Selective picking ensures uniform ripeness. Washed or natural processing is chosen based on desired flavor profile, with controlled fermentation to develop clarity or fruity complexity. Sun or mechanical drying brings moisture to 10–12% before hulling and density/size grading. Roast profiles are dialed in by batch to highlight origin traits, followed by degassing and protective packing with one-way valves.',
    conclusion:
      'Tight control at each stage—from cherry to roast—unlocks distinctive cup quality and stable shelf life.',
    tags: ['coffee', 'washed', 'natural', 'roasting', 'grading'],
    description:
      'Designing process and roast to deliver origin-forward specialty coffee.',
    relatedTopics: ['fermentation control', 'roast profiling', 'moisture targets'],
    processStage: 'Roasting & Grinding'
  },
  {
    id: 106,
    title: 'Tea Processing',
    category: 'Beverages',
    categoryColor: 'green',
    publishDate: '2025-08-20',
    readingTime: '12 min read',
    views: 1850,
    introduction:
      'Fresh green leaves move through withering, rolling, fermentation, and drying, before being graded and packed, creating higher flavor, aroma, and market value across the value chain.',
    featuredImage: '/images/value-addition/v6.webp',
    imageCaption:
      'Modern tea line with climate-controlled withering and precision sorting.',
    mainContent:
      'Withering reduces leaf moisture while preserving essential oils. Rolling promotes cell rupture for even oxidation, followed by temperature- and humidity-controlled fermentation to achieve target flavor development. Drying stabilizes to 3–4% moisture, then optical sorting and sieving deliver consistent BOPF, Pekoe, and other grades. Nitrogen-flushed, moisture-barrier packaging protects freshness for extended shelf life.',
    conclusion:
      'Precision across withering to packing elevates quality, enabling premium positioning in global tea markets.',
    tags: ['tea', 'withering', 'fermentation', 'drying', 'grading'],
    description:
      'How carefully managed stages turn fresh leaves into premium tea.',
    relatedTopics: ['oxidation control', 'leaf grading', 'shelf-life'],
    processStage: 'Withering to Packing'
  },
  {
    id: 107,
    title: 'Mace Processing',
    category: 'Spices',
    categoryColor: 'orange',
    publishDate: '2025-08-15',
    readingTime: '6 min read',
    views: 1320,
    introduction:
      'The bright red aril covering nutmeg seeds is carefully dried and ground into flakes or powder, valued as a premium spice and flavoring agent.',
    featuredImage: '/images/value-addition/v7.webp',
    imageCaption:
      'Careful drying of mace arils to preserve color and aroma.',
    mainContent:
      'Fresh mace arils are separated from nutmeg seeds and dried gently to protect color and essential oils. Grading assesses color intensity, cleanliness, and flake size. Milling into flakes or powder is performed under low heat to minimize volatile loss, followed by sieving, metal detection, and aroma-protective packaging.',
    conclusion:
      'Color-preserving drying and hygienic milling produce high-value mace with strong market demand.',
    tags: ['mace', 'nutmeg', 'drying', 'milling', 'grading'],
    description:
      'Producing vibrant, aromatic mace flakes and powder for premium applications.',
    relatedTopics: ['myristica fragrans', 'volatile oils', 'color retention'],
    processStage: 'Drying & Milling'
  },
  {
    id: 108,
    title: 'Clove Processing',
    category: 'Spices',
    categoryColor: 'purple',
    publishDate: '2025-08-16',
    readingTime: '7 min read',
    views: 1605,
    introduction:
      'Clove buds are handpicked, sun-dried, and processed into spice or essential oil for food and pharmaceuticals.',
    featuredImage: '/images/value-addition/v8.webp',
    imageCaption:
      'Sun-dried clove buds prior to grading and oil distillation.',
    mainContent:
      'Unopened clove buds are harvested at the correct pigment stage and dried to 10–12% moisture to lock in eugenol-rich aromas. Grading ensures uniform size and low foreign matter. For essential oil, steam distillation captures key volatiles, while whole buds and ground cloves are packed in barrier materials to prevent oxidation.',
    conclusion:
      'Timely harvest, proper drying, and airtight packing preserve potency across culinary and medicinal uses.',
    tags: ['clove', 'eugenol', 'steam distillation', 'drying', 'grading'],
    description:
      'From bud to bottle: dried cloves and essential oil production.',
    relatedTopics: ['essential oils', 'aroma preservation', 'oxidation control'],
    processStage: 'Drying & Oil Distillation'
  },
  {
    id: 109,
    title: 'Turmeric Processing',
    category: 'Spices',
    categoryColor: 'yellow',
    publishDate: '2025-08-17',
    readingTime: '7 min read',
    views: 1788,
    introduction:
      'Fresh rhizomes are cleaned, boiled, sun-dried, and polished before being ground into vibrant powder, widely used in food, medicine, and cosmetics.',
    featuredImage: '/images/value-addition/v9.webp',
    imageCaption:
      'Boiled and sun-dried turmeric rhizomes ready for polishing.',
    mainContent:
      'Rhizomes are sorted, washed, and boiled to gelatinize starch and set color. Sun or mechanical drying reduces moisture to safe storage levels before drum or hand polishing removes rough surfaces. Milling and sieving achieve consistent fineness, while curcumin content and color (ASTA) are verified before oxygen- and light-barrier packing.',
    conclusion:
      'Standardized boiling and careful milling create vivid, stable turmeric powder with strong functional value.',
    tags: ['turmeric', 'curcumin', 'boiling', 'polishing', 'milling'],
    description:
      'Standardized steps that produce bright, shelf-stable turmeric powder.',
    relatedTopics: ['color retention', 'ASTA color', 'particle size'],
    processStage: 'Boiling & Grinding'
  }
])

// ---------- Composable Function ----------
export const useValueAdditionStore = () => {
  // Actions
  const selectPost = (post: ValueAdditionPost): void => {
    selectedPostRef.value = post
  }

  const getPostById = (id: number): ValueAdditionPost | undefined => {
    return valueAdditionPosts.value.find(post => post.id === id)
  }

  // Related posts logic for value addition content
  const getRelatedPosts = (currentPostId: number, limit: number = 3): ValueAdditionPost[] => {
    const currentPost = getPostById(currentPostId)
    if (!currentPost) return []

    const scoredPosts = valueAdditionPosts.value
      .filter(post => post.id !== currentPostId)
      .map(post => {
        let score = 0

        // Same process stage gets highest score
        if (post.processStage === currentPost.processStage) score += 15

        // Same category gets high score
        if (post.category === currentPost.category) score += 10

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

  // ---------- Computed Properties ----------
  const selectedPost = computed(() => selectedPostRef.value)
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
