<template>
  <v-card class="service-card h-100" elevation="4" hover @click="handleServiceClick">
    <div class="card-image-container">
      <v-img :src="service.image" :alt="service.name" height="200" cover class="card-image">
        <template v-slot:placeholder>
          <div class="d-flex align-center justify-center fill-height">
            <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
          </div>
        </template>
      </v-img>
      <div class="image-overlay">
        <v-chip size="small" color="primary" variant="elevated" class="category-chip">
          {{ categoryLabel }}
        </v-chip>
      </div>
    </div>
    <v-card-title class="service-name">{{ service.name }}</v-card-title>
    <v-card-text class="service-description">
      {{ service.description || getServiceDescription(categoryLabel, service.name) }}
    </v-card-text>
    <v-card-actions class="card-actions">
      <v-btn variant="outlined" color="primary" size="small" @click.stop="handleLearnMore">
        Learn More
        <v-icon right>mdi-arrow-right</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn variant="outlined" color="primary" size="small" @click.stop="handleAddToCart" class="add-to-cart-btn">
        <v-icon left>mdi-cart-plus</v-icon>
        Add to Cart
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
const props = defineProps({
  service: { type: Object, required: true},
  categoryLabel: { type: String, required: true}
})
const emit = defineEmits(['service-click', 'learn-more', 'add-to-cart'])
const handleServiceClick = () => {
  emit('service-click', props.categoryLabel, props.service.name)
}
const handleLearnMore = () => {
  // Instead of emitting, navigate directly to the service page
  // You'll need to implement a way to map service names to IDs
  const serviceId = getServiceId(props.service.name)
  navigateTo(`/service/${serviceId}`)
}

// Helper function to map service names to IDs
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
    // Add all your services here...
  }
  return serviceMap[serviceName] || 1
}

const handleAddToCart = () => {
  emit('add-to-cart', props.categoryLabel, props.service)
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
@media (max-width: 768px) {
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
  .card-image {
    height: 140px;
  }
}
</style>