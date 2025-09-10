<template>
  <section class="products-section py-10">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" class="text-center">
          <h2 class="section-title">Our Services</h2>
          <p class="section-subtitle"> {{ sectionDescription }}</p>
        </v-col>
      </v-row>
      <v-row justify="center" class="mb-8">
        <v-col cols="12">
          <nav class="services-nav">
            <div class="nav-container">
              <div 
                v-for="(navItem, index) in navigationItems" :key="index"class="nav-item-wrapper">
                <div class="nav-item" :class="{ active: activeCategory === index }" @click="selectCategory(index)">
                  <v-icon class="nav-icon" :color="navtext">{{ navItem.icon }}</v-icon>
                  <span class="nav-text">{{ navItem.label }}</span>
                </div>
              </div>
            </div>
          </nav>
        </v-col>
      </v-row>
      <v-row v-if="activeCategory !== -1">
        <v-col v-for="(subItem, subIndex) in navigationItems[activeCategory].subItems" :key="subIndex" cols="12" sm="6" md="4" lg="3" class="mb-6">
          <v-card class="service-card h-100" elevation="4" hover  @click="handleServiceClick(navigationItems[activeCategory].label, subItem.name)">
            <div class="card-image-container">
              <v-img
                :src="subItem.image"
                :alt="subItem.name"
                height="200"
                cover
                class="card-image"
              >
                <template v-slot:placeholder>
                  <div class="d-flex align-center justify-center fill-height">
                    <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                  </div>
                </template>
              </v-img>
              <div class="image-overlay">
                <v-chip size="small" color="primary" variant="elevated" class="category-chip">
                  {{ navigationItems[activeCategory].label }}
                </v-chip>
              </div>
            </div>
            <v-card-title class="service-name">{{ subItem.name }}</v-card-title>
            <v-card-text class="service-description">
              {{ subItem.description || getServiceDescription(navigationItems[activeCategory].label, subItem.name) }}
            </v-card-text>
            <v-card-actions class="card-actions">
              <v-btn variant="outlined" color="primary" size="small" @click.stop="learnMoreService(navigationItems[activeCategory].label, subItem)">
                Learn More
                <v-icon right>mdi-arrow-right</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn variant="outlined" color="primary" size="small" @click.stop="addToCart(navigationItems[activeCategory].label, subItem)" class="add-to-cart-btn">
                <v-icon left>mdi-cart-plus</v-icon>
                Add to Cart
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col cols="12" class="text-center py-10">
          <div class="no-selection">
            <v-icon size="64" color="primary" class="mb-4">mdi-hand-pointing-up</v-icon>
            <h3 class="text-h5 mb-2">Select a Service Category</h3>
            <p class="text-body-1 text-medium-emphasis">
              Choose a category above to explore our comprehensive range of services
            </p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const sectionDescription = ref('Discover the diverse range of high-quality services offered by our plantation experts across Sri Lanka')
const activeCategory = ref(-1)
const navigationItems = ref([
  {
    icon: 'mdi-map',
    label: 'Land',
    subItems: [
      {
        name: 'Initial Discussion & Scoping',
        image: '/images/services/Initial Discussion & Scoping.png',
        description: 'Comprehensive consultation and project scoping for your plantation needs'
      },
      {
        name: 'Land Identification (9 Provinces)',
        image: '/images/services/Land Identification.png',
        description: 'Expert land identification services across all 9 provinces of Sri Lanka'
      },
      {
        name: 'Title Reports & Deed Transfers',
        image: '/images/services/service.png',
        description: 'Professional legal documentation and property transfer services'
      },
      {
        name: 'Legal & Succession Advisory',
        image: '/images/services/service.png',
        description: 'Expert legal guidance for property succession and ownership matters'
      },
      {
        name: 'Estate/Company Registration',
        image: '/images/services/service.png',
        description: 'Complete estate and company registration services'
      }
    ]
  },
  {
    icon: 'mdi-bank',
    label: 'Finance',
    subItems: [
      {
        name: 'Project Reports (DPRs)',
        image: '/images/services/service.png',
        description: 'Detailed project reports and feasibility studies for investments'
      },
      {
        name: 'Budgeting & Cost Estimates',
        image: '/images/services/service.png',
        description: 'Accurate budgeting and cost estimation for plantation projects'
      },
      {
        name: 'Accounts & Tax Advisory',
        image: '/images/services/service.png',
        description: 'Professional accounting and tax advisory services'
      },
      {
        name: 'Statutory Reporting & Compliance',
        image: '/images/services/service.png',
        description: 'Complete statutory reporting and regulatory compliance management'
      },
      {
        name: 'Investment Appraisal (NPV, IRR, ROI)',
        image: '/images/services/service.png',
        description: 'Comprehensive investment analysis and financial modeling'
      }
    ]
  },
  {
    icon: 'mdi-sprout',
    label: 'Agronomy',
    subItems: [
      {
        name: 'Land, Topography & Soil Surveys',
        image: '/images/services/service.png',
        description: 'Comprehensive land assessment and soil analysis services'
      },
      {
        name: 'Farm Layout & Planting Design',
        image: '/images/services/service.png',
        description: 'Expert farm planning and optimal planting design'
      },
      {
        name: 'Agronomy Consultancy (Planting → Harvest)',
        image: '/images/services/service.png',
        description: 'End-to-end agricultural guidance from planting to harvest'
      },
      {
        name: 'Irrigation / Fertigation & Crop Protection',
        image: '/images/services/service.png',
        description: 'Advanced irrigation systems and crop protection solutions'
      },
      {
        name: 'Nurseries',
        image: '/images/services/service.png',
        description: 'Professional nursery management and seedling production'
      },
      {
        name: 'Mechanization & Estate Engineering',
        image: '/images/services/service.png',
        description: 'Modern mechanization and engineering solutions for estates'
      }
    ]
  },
  {
    icon: 'mdi-factory',
    label: 'Processing',
    subItems: [
      {
        name: 'Post-Harvest Handling',
        image: '/images/services/service.png',
        description: 'Expert post-harvest handling and storage solutions'
      },
      {
        name: 'Crop Processing (Tea, Rubber, Coconut, Spices)',
        image: '/images/services/service.png',
        description: 'Specialized processing for various plantation crops'
      },
      {
        name: 'Product Development & Value-Added Lines',
        image: '/images/services/service.png',
        description: 'Innovative product development and value addition services'
      },
      {
        name: 'Branding & Packaging Services',
        image: '/images/services/service.png',
        description: 'Professional branding and packaging design services'
      },
      {
        name: 'Export Market Entry & Premium Positioning',
        image: '/images/services/service.png',
        description: 'Strategic market entry and premium positioning services'
      }
    ]
  },
  {
    icon: 'mdi-account-hard-hat',
    label: 'Support',
    subItems: [
      {
        name: 'HRM Systems (Recruitment, Payroll, IR)',
        image: '/images/services/service.png',
        description: 'Complete human resource management solutions'
      },
      {
        name: 'Worker Training & Upskilling',
        image: '/images/services/service.png',
        description: 'Comprehensive worker training and skill development programs'
      },
      {
        name: 'Labour Law & EPF/ETF Compliance',
        image: '/images/services/service.png',
        description: 'Expert guidance on labor law and statutory compliance'
      },
      {
        name: 'Plantation Digital Identity',
        image: '/images/services/service.png',
        description: 'Digital transformation and identity solutions for plantations'
      },
      {
        name: 'Farm Management Dashboards',
        image: '/images/services/service.png',
        description: 'Advanced farm management and monitoring dashboards'
      },
      {
        name: 'Traceability / Blockchain / R & D',
        image: '/images/services/service.png',
        description: 'Cutting-edge traceability and research solutions'
      }
    ]
  },
  {
    icon: 'mdi-truck',
    label: 'Supply Chain',
    subItems: [
      {
        name: 'Transport & Cold Chain Logistics',
        image: '/images/services/service.png',
        description: 'Efficient transport and cold chain logistics solutions'
      },
      {
        name: 'Export/Import Facilitation & Customs',
        image: '/images/services/service.png',
        description: 'Complete export/import facilitation and customs services'
      },
      {
        name: 'E-commerce & B2B Platforms',
        image: '/images/services/service.png',
        description: 'Modern e-commerce and B2B platform solutions'
      },
      {
        name: 'Packaging Design & Storytelling',
        image: '/images/services/service.png',
        description: 'Creative packaging design and brand storytelling'
      },
      {
        name: 'Digital Marketing Campaigns',
        image: '/images/services/service.png',
        description: 'Strategic digital marketing and campaign management'
      },
      {
        name: 'Trade Fairs & Global Exhibitions',
        image: '/images/services/service.png',
        description: 'International trade fair and exhibition participation'
      }
    ]
  },
  {
    icon: 'mdi-earth',
    label: 'ESG',
    subItems: [
      {
        name: 'Environmental: Soil & Water Health',
        image: '/images/services/service.png',
        description: 'Comprehensive environmental health and sustainability services'
      },
      {
        name: 'Social: Worker Welfare Audits',
        image: '/images/services/service.png',
        description: 'Worker welfare audits and social responsibility programs'
      },
      {
        name: 'Governance: ESG Audits & Certifications',
        image: '/images/services/service.png',
        description: 'ESG audits and governance certification services'
      }
    ]
  },
  {
    icon: 'mdi-certificate',
    label: 'Certifications',
    subItems: [
      {
        name: 'Rainforest Alliance',
        image: '/images/services/certifications/rainforest-alliance.webp',
        description: 'Rainforest Alliance certification and compliance'
      },
      {
        name: 'Organic (EU/USDA/JAS/SL)',
        image: '/images/services/certifications/Organic.png',
        description: 'Multiple organic certifications for global markets'
      },
      {
        name: 'Fairtrade International',
        image: '/images/services/certifications/Fairtrade_International.jpg',
        description: 'Fairtrade International certification and support'
      },
      {
        name: 'GlobalG.A.P. & UTZ',
        image: '/images/services/certifications/Gloable G.P.A.png',
        description: 'GlobalG.A.P. and UTZ certification services'
      },
      {
        name: 'SMETA & SA8000',
        image: '/images/services/certifications/SMETA & SA8000.png',
        description: 'SMETA and SA8000 social compliance certifications'
      },
      {
        name: 'ISO Standards',
        image: '/images/services/certifications/ISO.png',
        description: 'Various ISO standard certifications and implementation'
      },
      {
        name: 'B Corp Certification',
        image: '/images/services/certifications/B Corp.png',
        description: 'B Corp certification for sustainable business practices'
      },
      {
        name: 'GRI / SASB Reporting',
        image: 'images/services/certifications/GRI & SASB.png',
        description: 'GRI and SASB sustainability reporting services'
      }
    ]
  },
  {
    icon: 'mdi-chart-line',
    label: 'KPIs',
    subItems: [
      {
        name: 'Yield per Hectare (kg/ha/year)',
        image: '/images/services/service.png',
        description: 'Comprehensive yield analysis and optimization metrics'
      },
      {
        name: 'ROI per Acre (Annualized)',
        image: '/images/services/service.png',
        description: 'Return on investment analysis and tracking'
      },
      {
        name: 'Value-Added % (Raw vs. Branded)',
        image: '/images/services/service.png',
        description: 'Value addition measurement and optimization'
      },
      {
        name: 'Export Readiness Index',
        image: '/images/services/service.png',
        description: 'Export readiness assessment and improvement metrics'
      },
      {
        name: 'Worker Welfare Score',
        image: '/images/services/service.png',
        description: 'Worker welfare measurement and improvement tracking'
      },
      {
        name: 'ESG Audit Score',
        image: '/images/services/service.png',
        description: 'ESG performance measurement and reporting'
      },
      {
        name: 'Carbon Credit Revenues',
        image: '/images/services/service.png',
        description: 'Carbon credit generation and revenue tracking'
      }
    ]
  }
])
onMounted(() => {
  activeCategory.value = 0
})
const selectCategory = (index) => {
  activeCategory.value = activeCategory.value === index ? -1 : index
} 
const handleServiceClick = (category, service) => {
  console.log('Service clicked:', category, '->', service)
}
const learnMoreService = (category, service) => {
  console.log('Learn more about:', category, '->', service.name)
  navigateTo({
    path: '/singleService',
    query: {
      category: category,
      service: service.name,
      description: service.description,
      image: service.image
    }
  })
}
const addToCart = (category, service) => {
  console.log('Add to cart:', category, '->', service.name)
}
const getServiceDescription = (category, service) => {
  const descriptions = {
    'Land': 'Professional land management and acquisition services tailored to your plantation needs.',
    'Finance': 'Comprehensive financial planning and advisory services for agricultural investments.',
    'Agronomy': 'Expert agricultural consultation from planting to harvest optimization.',
    'Processing': 'Advanced post-harvest processing and value-addition services.',
    'Support': 'Complete operational support including HR, training, and digital solutions.',
    'Supply Chain': 'End-to-end logistics and market access solutions.',
    'ESG': 'Sustainable practices and compliance management services.',
    'Certifications': 'International certification and compliance assistance.',
    'KPIs': 'Performance measurement and analytics for plantation optimization.'
  }
  return descriptions[category] || 'Professional services designed to enhance your plantation operations.'
}
</script>

<style scoped>
.products-section {
  background-color: rgb(var(--v-theme-background));
}
.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: rgb(var(--v-theme-section-title));
  margin-bottom: 1rem;
}
.section-subtitle {
  font-size: 1.1rem;
  color: rgb(var(--v-theme-section-subtitle));
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}
.services-nav {
  background: linear-gradient(135deg, rgb(var(--v-theme-services-nav-bg-start)) 0%, rgb(var(--v-theme-services-nav-bg-end)) 100%);
  border-radius: 20px;
  padding: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
.nav-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}
.nav-item-wrapper {
  position: relative;
  display: inline-block;
}
.nav-item {
  display: flex;
  align-items: center;
  padding: 18px 24px;
  background: rgb(var(--v-theme-services-nav-item-bg));
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.05);
  min-width: 150px;
  justify-content: center;
  color: rgb(var(--v-theme-on-surface));
}
.nav-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  background: linear-gradient(135deg, rgb(var(--v-theme-primary)) 0%, rgb(var(--v-theme-primary-darken-1)) 100%);
  color: rgb(var(--v-theme-on-primary));
}
.nav-item.active {
  background: linear-gradient(135deg, rgb(var(--v-theme-primary)) 0%, rgb(var(--v-theme-primary-darken-1)) 100%);
  color: rgb(var(--v-theme-on-primary));
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgb(var(--v-theme-services-nav-item-shadow-hover));
}
.nav-icon {
  font-size: 1.5rem !important;
  margin-right: 12px;
  transition: color 0.3s ease;
}
.nav-text {
  font-weight: 600;
  font-size: 1rem;
  white-space: nowrap;
}
.service-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  background-color: rgb(var(--v-theme-service-card-bg));
}
.service-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px rgb(var(--v-theme-card-shadow-hover));
}
.card-image-container {
  position: relative;
  overflow: hidden;
}
.card-image {
  transition: transform 0.3s ease;
}
.service-card:hover .card-image {
  transform: scale(1.05);
}
.image-overlay {
  position: absolute;
  top: 12px;
  right: 12px;
}
.category-chip {
  backdrop-filter: blur(10px);
  background-color: rgba(var(--v-theme-primary), 0.9) !important;
  color: rgb(var(--v-theme-on-primary)) !important;
}
.service-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: rgb(var(--v-theme-section-title));
  padding-bottom: 8px;
  line-height: 1.3;
}
.service-description {
  color: rgb(var(--v-theme-section-subtitle));
  font-size: 0.95rem;
  line-height: 1.5;
  padding-top: 0;
}
.card-actions {
  padding: 16px;
  gap: 8px;
  background-color: rgb(var(--v-theme-service-card-bg));
}
.add-to-cart-btn {
  text-transform: none;
  font-weight: 500;
}
.no-selection {
  padding: 2rem;
}
.no-selection h3 {
  color: rgb(var(--v-theme-section-title));
}
.no-selection p {
  color: rgb(var(--v-theme-section-subtitle));
}
:deep(.v-card) {
  background-color: rgb(var(--v-theme-service-card-bg)) !important;
}
:deep(.v-card-title) {
  color: rgb(var(--v-theme-section-title)) !important;
}
:deep(.v-card-text) {
  color: rgb(var(--v-theme-section-subtitle)) !important;
}
:deep(.v-card-actions) {
  padding-top: 8px;
  background-color: rgb(var(--v-theme-service-card-bg)) !important;
}
:deep(.v-btn) {
  text-transform: none;
  font-weight: 500;
}
:deep(.v-btn--variant-text) {
  color: rgb(var(--v-theme-navtext)) !important;
}
:deep(.v-btn--variant-outlined) {
  color: rgb(var(--v-theme-navtext)) !important;
  border-color: rgb(var(--v-theme-navtext)) !important;
}
:deep(.v-btn--variant-outlined:hover) {
  background-color: rgba(var(--v-theme-navtext), 0.1) !important;
}
:deep(.v-btn .v-icon) {
  color: inherit !important;
}
@media (max-width: 1200px) {
  .nav-container {
    justify-content: center;
  }
  .nav-item {
    min-width: 130px;
    padding: 16px 18px;
  }
  .nav-text {
    font-size: 0.9rem;
  }
  .nav-icon {
    font-size: 1.3rem;
  }
}
@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }
  .section-subtitle {
    font-size: 1rem;
  }
  .nav-container {
    gap: 12px;
  }
  .nav-item {
    flex-direction: column;
    padding: 12px;
    min-width: 100px;
  }
  .nav-icon {
    margin-right: 0;
    margin-bottom: 6px;
    font-size: 1.4rem;
  }
  .nav-text {
    font-size: 0.85rem;
  }
  .card-image {
    height: 160px;
  }
  .card-actions {
    flex-direction: column;
    gap: 8px;
  }
  .card-actions .v-btn {
    width: 100%;
  }
  .card-actions .v-spacer {
    display: none;
  }
}
@media (max-width: 480px) {
  .section-title {
    font-size: 1.8rem;
  }
  .section-subtitle {
    font-size: 0.9rem;
  }
  .services-nav {
    padding: 8px;
  }
  .nav-item {
    padding: 10px;
    min-width: 80px;
  }
  .nav-text {
    font-size: 0.8rem;
  }
  .nav-icon {
    font-size: 1.2rem;
  }
  .card-image {
    height: 140px;
  }
}
</style>