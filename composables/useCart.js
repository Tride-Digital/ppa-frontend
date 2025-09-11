import { ref, watch } from 'vue'

// Global cart state
const cartItems = ref([])
const showCartModal = ref(false)

export const useCart = () => {
  // Load cart from localStorage on first use
  if (process.client && cartItems.value.length === 0) {
    const savedCart = localStorage.getItem('cartItems')
    if (savedCart) {
      cartItems.value = JSON.parse(savedCart)
    }
  }

  // Save to localStorage whenever cart changes
  if (process.client) {
    watch(cartItems, (newCart) => {
      localStorage.setItem('cartItems', JSON.stringify(newCart))
    }, { deep: true })
  }

  const addToCart = (category, service) => {
    const existingItem = cartItems.value.find(item => item.name === service.name)
    
    if (!existingItem) {
      cartItems.value.push({
        ...service,
        category: category,
        id: getServiceId(service.name)
      })
    } else {
    }
  }

  const removeFromCart = (index) => {
    cartItems.value.splice(index, 1)
  }

  const clearCart = () => {
    cartItems.value = []
    if (process.client) {
      localStorage.removeItem('cartItems')
    }
  }

  const toggleCartModal = () => {
    showCartModal.value = !showCartModal.value
  }

  const openCartModal = () => {
    showCartModal.value = true
  }

  const closeCartModal = () => {
    showCartModal.value = false
  }

  // Helper function to get service ID
  const getServiceId = (serviceName) => {
    const serviceMap = {
      'Initial Discussion & Scoping': 1,
      'Land Identification (9 Provinces)': 2,
      'Title Reports & Deed Transfers': 3,
      'Legal & Succession Advisory': 4,
      'Estate/Company Registration': 5,
      'Project Reports (DPRs)': 6,
      'Budgeting & Cost Estimates': 7,
      'Accounts & Tax Advisory': 8,
      'Statutory Reporting & Compliance': 9,
      'Investment Appraisal (NPV, IRR, ROI)': 10,
      'Land, Topography & Soil Surveys': 11,
      'Farm Layout & Planting Design': 12,
      'Agronomy Consultancy (Planting → Harvest)': 13,
      'Irrigation / Fertigation & Crop Protection': 14,
      'Nurseries': 15,
      'Mechanization & Estate Engineering': 16,
      'Post-Harvest Handling': 17,
      'Crop Processing (Tea, Rubber, Coconut, Spices)': 18,
      'Product Development & Value-Added Lines': 19,
      'Branding & Packaging Services': 20,
      'Export Market Entry & Premium Positioning': 21,
      'HRM Systems (Recruitment, Payroll, IR)': 22,
      'Worker Training & Upskilling': 23,
      'Labour Law & EPF/ETF Compliance': 24,
      'Plantation Digital Identity': 25,
      'Farm Management Dashboards': 26,
      'Traceability / Blockchain / R & D': 27,
      'Transport & Cold Chain Logistics': 28,
      'Export/Import Facilitation & Customs': 29,
      'E-commerce & B2B Platforms': 30,
      'Packaging Design & Storytelling': 31,
      'Digital Marketing Campaigns': 32,
      'Trade Fairs & Global Exhibitions': 33,
      'Environmental: Soil & Water Health': 34,
      'Social: Worker Welfare Audits': 35,
      'Governance: ESG Audits & Certifications': 36,
      'Rainforest Alliance': 37,
      'Organic (EU/USDA/JAS/SL)': 38,
      'Fairtrade International': 39,
      'GlobalG.A.P. & UTZ': 40,
      'SMETA & SA8000': 41,
      'ISO Standards': 42,
      'B Corp Certification': 43,
      'GRI / SASB Reporting': 44,
      'Yield per Hectare (kg/ha/year)': 45,
      'ROI per Acre (Annualized)': 46,
      'Value-Added % (Raw vs. Branded)': 47,
      'Export Readiness Index': 48,
      'Worker Welfare Score': 49,
      'ESG Audit Score': 50,
      'Carbon Credit Revenues': 51
    }
    return serviceMap[serviceName] || 1
  }

  return {
    cartItems,
    showCartModal,
    addToCart,
    removeFromCart,
    clearCart,
    toggleCartModal,
    openCartModal,
    closeCartModal
  }
}