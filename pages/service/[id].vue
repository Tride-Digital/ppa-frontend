<template>
  <div class="single-service-page">
    <section class="hero-section bg-surface-variant">
      <v-container>
        <v-row align="center" v-if="service">
          <v-col cols="12" md="6">
            <div class="hero-content">
              <h1 class="hero-title text-on-surface">{{ service.name }}</h1>
              <p class="hero-description text-on-surface-variant">{{ service.description }}</p>
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <div class="hero-image">
              <v-img :src="service.image" :alt="service.name" height="400" cover class="rounded-lg elevation-8">
                <template #error>
                  <div class="error-placeholder">
                    <v-icon size="80" color="primary">{{ service.icon }}</v-icon>
                  </div>
                </template>
              </v-img>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <section class="details-section py-12" v-if="service">
      <v-container>
        <v-row>
          <v-col cols="12" lg="8">
            <div class="service-details">
              <h2 class="section-title mb-6 text-on-surface">Service Overview</h2>
              <div class="overview-content">
                <p class="text-body-1 mb-4 text-on-surface">
                  Our {{ service.name.toLowerCase() }} service provides comprehensive solutions tailored to meet your specific plantation requirements. With years of expertise and a deep understanding of the agricultural sector in Sri Lanka, we deliver results that exceed expectations.
                </p>
                <p class="text-body-1 mb-6 text-on-surface">
                  {{ service.description }}
                </p>
                <h3 class="subsection-title mb-4 text-on-surface">Key Features</h3>
                <v-row class="mb-6">
                  <v-col cols="12" md="6" v-for="(feature, index) in service.keyFeatures" :key="index">
                    <div class="feature-item d-flex align-start">
                      <v-icon color="contact-title" class="me-3 mt-1">mdi-check-circle</v-icon>
                      <div>
                        <h4 class="feature-title text-on-surface">{{ feature.title }}</h4>
                        <p class="feature-description text-body-2 text-on-surface-variant">{{ feature.description }}</p>
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </div>
            </div>
          </v-col>
          <v-col cols="12" lg="4">
            <div class="sidebar">
              <v-card class="service-info-card mb-6" elevation="4">
                <v-card-title class="bg-section-title text-on-primary">
                  <v-icon start>mdi-information-outline</v-icon>
                  Service Information
                </v-card-title>
                <v-card-text class="pa-0">
                  <v-list>
                    <v-list-item>
                      <v-list-item-title class="text-on-surface">Category</v-list-item-title>
                      <v-list-item-subtitle class="text-on-surface-variant">{{ service.category }}</v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title class="text-on-surface">Duration</v-list-item-title>
                      <v-list-item-subtitle class="text-on-surface-variant">{{ service.duration }}</v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title class="text-on-surface">Availability</v-list-item-title>
                      <v-list-item-subtitle class="text-on-surface-variant">{{ service.availability }}</v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title class="text-on-surface">Coverage</v-list-item-title>
                      <v-list-item-subtitle class="text-on-surface-variant">{{ service.coverage }}</v-list-item-subtitle>
                    </v-list-item>
                  </v-list>
                </v-card-text>
              </v-card>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <section class="cta-section py-12 bg-primary" v-if="service">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="8" class="text-center">
            <h2 class="cta-title text-on-primary mb-4">Ready to Get Started?</h2>
            <p class="cta-description text-on-primary mb-6" style="opacity: 0.9;">
              Take the first step towards optimizing your plantation operations with our professional {{ service.name.toLowerCase() }} service.
            </p>
            <div class="cta-actions">
              <v-btn color="text" size="large" variant="elevated" class="me-4 text-on-surface" @click="addServiceToCart">
                <v-icon start>mdi-cart-plus</v-icon>
                Add to Cart
              </v-btn>
              <v-btn variant="outlined" size="large" color="text" class="text-on-primary" @click="downloadBrochure">
                <v-icon start>mdi-download</v-icon>
                Download Brochure
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <v-row v-if="!service">
      <v-col cols="12" class="text-center">
        <v-card class="pa-8" elevation="2">
          <v-icon size="100" color="grey" class="mb-4">mdi-cog-off</v-icon>
          <h2 class="mb-4">Service Not Found</h2>
          <p class="mb-6">The service you're looking for doesn't exist.</p>
          <v-btn color="primary" @click="$router.push('/services')">
            Back to Services
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCart } from '~/composables/useCart'

const route = useRoute()
const router = useRouter()
const { addToCart } = useCart()
const servicesData = {
  1: {
    id: 1,
    name: 'Initial Discussion & Scoping',
    category: 'Land',
    image: '/images/services/Initial Discussion & Scoping.png',
    icon: 'mdi-chat-processing',
    description: 'Comprehensive consultation and project scoping for your plantation needs. We work closely with you to understand your requirements and develop a tailored approach.',
    duration: '1-2 weeks',
    availability: 'Year-round',
    coverage: 'All 9 Provinces',
    keyFeatures: [
      {
        title: 'Expert Consultation',
        description: 'One-on-one consultation with experienced plantation specialists'
      },
      {
        title: 'Project Assessment',
        description: 'Comprehensive evaluation of your project requirements and goals'
      },
      {
        title: 'Feasibility Analysis',
        description: 'Initial feasibility study and risk assessment'
      },
      {
        title: 'Custom Solutions',
        description: 'Tailored recommendations based on your specific needs'
      }
    ],
    benefits: [
      'Clear project roadmap and timeline',
      'Risk identification and mitigation strategies',
      'Cost-effective planning approach',
      'Expert guidance throughout the process',
      'Detailed project documentation'
    ]
  },
  2: {
    id: 2,
    name: 'Land Identification (9 Provinces)',
    category: 'Land',
    image: '/images/services/Land Identification.png',
    icon: 'mdi-map-search',
    description: 'Expert land identification services across all 9 provinces of Sri Lanka. We help you find the perfect location for your plantation venture.',
    duration: '2-4 weeks',
    availability: 'Year-round',
    coverage: 'All 9 Provinces',
    keyFeatures: [
      {
        title: 'Province-wide Coverage',
        description: 'Comprehensive land search across all 9 provinces'
      },
      {
        title: 'Soil Analysis',
        description: 'Detailed soil quality and suitability assessment'
      },
      {
        title: 'Climate Evaluation',
        description: 'Climate and weather pattern analysis for optimal crop selection'
      },
      {
        title: 'Market Access',
        description: 'Assessment of transportation and market accessibility'
      }
    ],
    benefits: [
      'Access to premium land locations',
      'Detailed land assessment reports',
      'Legal verification and due diligence',
      'Market value analysis',
      'Infrastructure evaluation'
    ]
  },
  3: {
    id: 3,
    name: 'Title Reports & Deed Transfers',
    category: 'Land',
    image: '/images/services/service.png',
    icon: 'mdi-file-document-outline',
    description: 'Professional legal documentation and property transfer services',
    duration: '2-3 weeks',
    availability: 'Year-round',
    coverage: 'All 9 Provinces',
    keyFeatures: [
      { title: 'Legal Documentation', description: 'Complete legal documentation and verification' },
      { title: 'Title Verification', description: 'Thorough title verification and clearance' },
      { title: 'Transfer Facilitation', description: 'Smooth property transfer process management' },
      { title: 'Compliance Assurance', description: 'Full regulatory compliance and legal protection' }
    ],
    benefits: ['Legal security and protection', 'Smooth transfer process', 'Complete documentation', 'Regulatory compliance', 'Expert legal guidance']
  },
  4: {
    id: 4,
    name: 'Legal & Succession Advisory',
    category: 'Land',
    image: '/images/services/service.png',
    icon: 'mdi-scale-balance',
    description: 'Expert legal guidance for property succession and ownership matters',
    duration: '3-6 weeks',
    availability: 'Year-round',
    coverage: 'All 9 Provinces',
    keyFeatures: [
      { title: 'Succession Planning', description: 'Comprehensive succession planning and documentation' },
      { title: 'Legal Advisory', description: 'Expert legal advice on ownership matters' },
      { title: 'Documentation Support', description: 'Complete documentation and legal process support' },
      { title: 'Conflict Resolution', description: 'Mediation and conflict resolution services' }
    ],
    benefits: ['Clear ownership structure', 'Legal protection', 'Smooth succession process', 'Conflict avoidance', 'Professional mediation']
  },
  5: {
    id: 5,
    name: 'Estate/Company Registration',
    category: 'Land',
    image: '/images/services/service.png',
    icon: 'mdi-office-building',
    description: 'Complete estate and company registration services',
    duration: '2-4 weeks',
    availability: 'Year-round',
    coverage: 'All 9 Provinces',
    keyFeatures: [
      { title: 'Company Registration', description: 'Complete company formation and registration' },
      { title: 'Estate Registration', description: 'Estate registration and legal setup' },
      { title: 'Regulatory Compliance', description: 'Full regulatory compliance and documentation' },
      { title: 'Ongoing Support', description: 'Ongoing legal and administrative support' }
    ],
    benefits: ['Legal entity formation', 'Regulatory compliance', 'Professional setup', 'Ongoing support', 'Tax optimization']
  },
  6: {
    id: 6,
    name: 'Project Reports (DPRs)',
    category: 'Finance',
    image: '/images/services/service.png',
    icon: 'mdi-file-chart',
    description: 'Detailed project reports and feasibility studies for investments',
    duration: '3-4 weeks',
    availability: 'Year-round',
    coverage: 'All 9 Provinces',
    keyFeatures: [
      { title: 'Detailed Analysis', description: 'Comprehensive project analysis and feasibility study' },
      { title: 'Financial Modeling', description: 'Advanced financial modeling and projections' },
      { title: 'Risk Assessment', description: 'Thorough risk analysis and mitigation strategies' },
      { title: 'Investment Guidelines', description: 'Clear investment recommendations and guidelines' }
    ],
    benefits: ['Informed investment decisions', 'Risk mitigation', 'Financial clarity', 'Professional documentation', 'Investor confidence']
  },
  7: {
    id: 7,
    name: 'Budgeting & Cost Estimates',
    category: 'Finance',
    image: '/images/services/service.png',
    icon: 'mdi-calculator-variant',
    description: 'Accurate budgeting and cost estimation for plantation projects',
    duration: '1-2 weeks',
    availability: 'Year-round',
    coverage: 'All 9 Provinces',
    keyFeatures: [
      { title: 'Detailed Budgeting', description: 'Comprehensive budget planning and analysis' },
      { title: 'Cost Estimation', description: 'Accurate cost estimation for all project phases' },
      { title: 'Financial Planning', description: 'Strategic financial planning and resource allocation' },
      { title: 'Budget Monitoring', description: 'Ongoing budget monitoring and control systems' }
    ],
    benefits: ['Financial control', 'Cost optimization', 'Resource efficiency', 'Budget accuracy', 'Financial transparency']
  },
  8: {
    id: 8,
    name: 'Accounts & Tax Advisory',
    category: 'Finance',
    image: '/images/services/service.png',
    icon: 'mdi-account-cash',
    description: 'Professional accounting and tax advisory services',
    duration: 'Ongoing',
    availability: 'Year-round',
    coverage: 'All 9 Provinces',
    keyFeatures: [
      { title: 'Accounting Services', description: 'Professional accounting and bookkeeping services' },
      { title: 'Tax Planning', description: 'Strategic tax planning and optimization' },
      { title: 'Compliance Management', description: 'Complete tax compliance and reporting' },
      { title: 'Advisory Services', description: 'Expert financial and tax advisory services' }
    ],
    benefits: ['Tax optimization', 'Compliance assurance', 'Financial accuracy', 'Professional expertise', 'Cost savings']
  },
  9: {
    id: 9,
    name: 'Statutory Reporting & Compliance',
    category: 'Finance',
    image: '/images/services/service.png',
    icon: 'mdi-file-check',
    description: 'Complete statutory reporting and regulatory compliance management',
    duration: 'Ongoing',
    availability: 'Year-round',
    coverage: 'All 9 Provinces',
    keyFeatures: [
      { title: 'Statutory Reporting', description: 'Complete statutory reporting and documentation' },
      { title: 'Compliance Management', description: 'Comprehensive regulatory compliance management' },
      { title: 'Audit Support', description: 'Professional audit support and preparation' },
      { title: 'Risk Management', description: 'Compliance risk assessment and management' }
    ],
    benefits: ['Regulatory compliance', 'Risk mitigation', 'Professional reporting', 'Audit readiness', 'Legal protection']
  },
  10: {
    id: 10,
    name: 'Investment Appraisal (NPV, IRR, ROI)',
    category: 'Finance',
    image: '/images/services/service.png',
    icon: 'mdi-chart-line-variant',
    description: 'Comprehensive investment analysis and financial modeling',
    duration: '2-3 weeks',
    availability: 'Year-round',
    coverage: 'All 9 Provinces',
    keyFeatures: [
      { title: 'NPV Analysis', description: 'Net Present Value analysis and calculations' },
      { title: 'IRR Calculation', description: 'Internal Rate of Return assessment' },
      { title: 'ROI Modeling', description: 'Return on Investment modeling and projections' },
      { title: 'Financial Analysis', description: 'Comprehensive financial analysis and reporting' }
    ],
    benefits: ['Investment clarity', 'Financial insights', 'Risk assessment', 'Decision support', 'Professional analysis']
  },
  11: {
    id: 11,
    name: 'Land, Topography & Soil Surveys',
    category: 'Agronomy',
    image: '/images/services/service.png',
    icon: 'mdi-terrain',
    description: 'Comprehensive land assessment and soil analysis services',
    duration: '2-3 weeks',
    availability: 'Year-round',
    coverage: 'All 9 Provinces',
    keyFeatures: [
      { title: 'Soil Analysis', description: 'Detailed soil composition and quality analysis' },
      { title: 'Topography Mapping', description: 'Comprehensive topographical mapping and analysis' },
      { title: 'Land Assessment', description: 'Complete land suitability assessment' },
      { title: 'Recommendations', description: 'Expert recommendations for optimal land use' }
    ],
    benefits: ['Optimal crop selection', 'Land suitability clarity', 'Soil health insights', 'Professional assessment', 'Planning support']
  },
  12: {
    id: 12,
    name: 'Farm Layout & Planting Design',
    category: 'Agronomy',
    image: '/images/services/service.png',
    icon: 'mdi-grid',
    description: 'Expert farm planning and optimal planting design',
    duration: '2-4 weeks',
    availability: 'Year-round',
    coverage: 'All 9 Provinces',
    keyFeatures: [
      { title: 'Layout Design', description: 'Optimal farm layout and design planning' },
      { title: 'Planting Strategy', description: 'Strategic planting design and spacing' },
      { title: 'Efficiency Optimization', description: 'Maximum efficiency and productivity planning' },
      { title: 'Infrastructure Planning', description: 'Integrated infrastructure and facility planning' }
    ],
    benefits: ['Maximized productivity', 'Efficient land use', 'Optimal spacing', 'Professional design', 'Future scalability']
  },
  13: {
    id: 13,
    name: 'Agronomy Consultancy (Planting → Harvest)',
    category: 'Agronomy',
    image: '/images/services/service.png',
    icon: 'mdi-sprout-outline',
    description: 'End-to-end agricultural guidance from planting to harvest',
    duration: 'Seasonal/Ongoing',
    availability: 'Year-round',
    coverage: 'All 9 Provinces',
    keyFeatures: [
      { title: 'Planting Guidance', description: 'Expert guidance for optimal planting practices' },
      { title: 'Crop Management', description: 'Comprehensive crop management throughout growth' },
      { title: 'Harvest Optimization', description: 'Harvest timing and technique optimization' },
      { title: 'Continuous Support', description: 'Ongoing agricultural support and consultation' }
    ],
    benefits: ['Increased yield', 'Quality improvement', 'Risk reduction', 'Expert guidance', 'Continuous support']
  },
  14: {
    id: 14,
    name: 'Irrigation / Fertigation & Crop Protection',
    category: 'Agronomy',
    image: '/images/services/service.png',
    icon: 'mdi-water',
    description: 'Advanced irrigation systems and crop protection solutions',
    duration: '3-6 weeks',
    availability: 'Year-round',
    coverage: 'All 9 Provinces',
    keyFeatures: [
      { title: 'Irrigation Design', description: 'Advanced irrigation system design and implementation' },
      { title: 'Fertigation Systems', description: 'Integrated fertigation system setup' },
      { title: 'Crop Protection', description: 'Comprehensive crop protection strategies' },
      { title: 'System Monitoring', description: 'Ongoing system monitoring and maintenance' }
    ],
    benefits: ['Water efficiency', 'Nutrient optimization', 'Crop protection', 'System automation', 'Yield improvement']
  },
  15: {
    id: 15,
    name: 'Nurseries',
    category: 'Agronomy',
    image: '/images/services/service.png',
    icon: 'mdi-greenhouse',
    description: 'Professional nursery management and seedling production',
    duration: 'Ongoing',
    availability: 'Year-round',
    coverage: 'All 9 Provinces',
    keyFeatures: [
      { title: 'Nursery Setup', description: 'Professional nursery design and setup' },
      { title: 'Seedling Production', description: 'High-quality seedling production and management' },
      { title: 'Quality Control', description: 'Strict quality control and health monitoring' },
      { title: 'Supply Management', description: 'Reliable supply chain and delivery management' }
    ],
    benefits: ['High-quality seedlings', 'Reliable supply', 'Quality assurance', 'Professional management', 'Cost efficiency']
  },
  16: {
    id: 16,
    name: 'Mechanization & Estate Engineering',
    category: 'Agronomy',
    image: '/images/services/service.png',
    icon: 'mdi-tractor',
    description: 'Modern mechanization and engineering solutions for estates',
    duration: '4-8 weeks',
    availability: 'Year-round',
    coverage: 'All 9 Provinces',
    keyFeatures: [
      { title: 'Mechanization Planning', description: 'Comprehensive mechanization strategy and planning' },
      { title: 'Equipment Selection', description: 'Optimal equipment selection and procurement' },
      { title: 'Engineering Solutions', description: 'Custom engineering solutions for estates' },
      { title: 'Maintenance Support', description: 'Ongoing maintenance and technical support' }
    ],
    benefits: ['Operational efficiency', 'Cost reduction', 'Modern technology', 'Professional engineering', 'Maintenance support']
  },
  17: {
    id: 17,
    name: 'Post-Harvest Handling',
    category: 'Processing',
    image: '/images/services/service.png',
    icon: 'mdi-package-variant',
    description: 'Expert post-harvest handling and storage solutions',
    duration: '2-3 weeks',
    availability: 'Year-round',
    coverage: 'All 9 Provinces',
    keyFeatures: [
      { title: 'Handling Systems', description: 'Advanced post-harvest handling systems' },
      { title: 'Storage Solutions', description: 'Optimal storage and preservation solutions' },
      { title: 'Quality Preservation', description: 'Quality preservation and loss reduction' },
      { title: 'Process Optimization', description: 'Handling process optimization and efficiency' }
    ],
    benefits: ['Quality preservation', 'Loss reduction', 'Efficiency improvement', 'Professional handling', 'Storage optimization']
  },
  18: {
    id: 18,
    name: 'Crop Processing (Tea, Rubber, Coconut, Spices)',
    category: 'Processing',
    image: '/images/services/service.png',
    icon: 'mdi-factory',
    description: 'Specialized processing for various plantation crops',
    duration: 'Ongoing',
    availability: 'Year-round',
    coverage: 'All 9 Provinces',
    keyFeatures: [
      { title: 'Multi-Crop Processing', description: 'Specialized processing for tea, rubber, coconut, and spices' },
      { title: 'Quality Standards', description: 'International quality standards and certifications' },
      { title: 'Technology Integration', description: 'Modern processing technology and equipment' },
      { title: 'Efficiency Optimization', description: 'Processing efficiency and yield optimization' }
    ],
    benefits: ['Quality products', 'Market readiness', 'Value addition', 'Technology advantage', 'Competitive pricing']
  },
  19: {
    id: 19,
    name: 'Product Development & Value-Added Lines',
    category: 'Processing',
    image: '/images/services/service.png',
    icon: 'mdi-lightbulb-on',
    description: 'Innovative product development and value addition services',
    duration: '4-8 weeks',
    availability: 'Year-round',
    coverage: 'All 9 Provinces',
    keyFeatures: [
      { title: 'Product Innovation', description: 'Innovative product development and research' },
      { title: 'Value Addition', description: 'Strategic value addition and enhancement' },
      { title: 'Market Research', description: 'Comprehensive market research and analysis' },
      { title: 'Commercialization', description: 'Product commercialization and market entry' }
    ],
    benefits: ['Product innovation', 'Market differentiation', 'Higher margins', 'Competitive advantage', 'Market expansion']
  },
  20: {
    id: 20,
    name: 'Branding & Packaging Services',
    category: 'Processing',
    image: '/images/services/service.png',
    icon: 'mdi-package',
    description: 'Professional branding and packaging design services',
    duration: '3-4 weeks',
    availability: 'Year-round',
    coverage: 'All 9 Provinces',
    keyFeatures: [
      { title: 'Brand Development', description: 'Comprehensive brand development and strategy' },
      { title: 'Package Design', description: 'Professional packaging design and development' },
      { title: 'Market Positioning', description: 'Strategic market positioning and messaging' },
      { title: 'Brand Implementation', description: 'Complete brand implementation and rollout' }
    ],
    benefits: ['Strong brand identity', 'Market appeal', 'Professional presentation', 'Brand recognition', 'Premium positioning']
  },
  21: {
    id: 21,
    name: 'Export Market Entry & Premium Positioning',
    category: 'Processing',
    image: '/images/services/service.png',
    icon: 'mdi-earth',
    description: 'Strategic market entry and premium positioning services',
    duration: '6-12 weeks',
    availability: 'Year-round',
    coverage: 'Global Markets',
    keyFeatures: [
      { title: 'Market Analysis', description: 'Comprehensive export market analysis' },
      { title: 'Entry Strategy', description: 'Strategic market entry planning and execution' },
      { title: 'Premium Positioning', description: 'Premium brand positioning and differentiation' },
      { title: 'Market Support', description: 'Ongoing market support and relationship management' }
    ],
    benefits: ['Global market access', 'Premium pricing', 'Market intelligence', 'Strategic positioning', 'Export growth']
  },
  22: {
    id: 22,
    name: 'HRM Systems (Recruitment, Payroll, IR)',
    category: 'Support',
    image: '/images/services/service.png',
    icon: 'mdi-account-group',
    description: 'Complete human resource management solutions',
    duration: '3-6 weeks',
    availability: 'Year-round',
    coverage: 'All 9 Provinces',
    keyFeatures: [
      { title: 'Recruitment Services', description: 'Professional recruitment and talent acquisition' },
      { title: 'Payroll Management', description: 'Complete payroll processing and management' },
      { title: 'Industrial Relations', description: 'Industrial relations and employee engagement' },
      { title: 'HR Systems', description: 'Integrated HR management systems and processes' }
    ],
    benefits: ['Efficient HR management', 'Compliance assurance', 'Employee satisfaction', 'Process automation', 'Cost optimization']
  },
  23: {
    id: 23,
    name: 'Worker Training & Upskilling',
    category: 'Support',
    image: '/images/services/service.png',
    icon: 'mdi-school',
    description: 'Comprehensive worker training and skill development programs',
    duration: '2-4 weeks',
    availability: 'Year-round',
    coverage: 'All 9 Provinces',
    keyFeatures: [
      { title: 'Skills Assessment', description: 'Comprehensive skills assessment and gap analysis' },
      { title: 'Training Programs', description: 'Customized training and development programs' },
      { title: 'Certification', description: 'Professional certification and competency validation' },
      { title: 'Continuous Learning', description: 'Ongoing learning and development support' }
    ],
    benefits: ['Improved productivity', 'Skill enhancement', 'Employee development', 'Quality improvement', 'Competitive advantage']
  },
  24: {
    id: 24,
    name: 'Labour Law & EPF/ETF Compliance',
    category: 'Support',
    image: '/images/services/service.png',
    icon: 'mdi-gavel',
    description: 'Expert guidance on labor law and statutory compliance',
    duration: 'Ongoing',
    availability: 'Year-round',
    coverage: 'All 9 Provinces',
    keyFeatures: [
      { title: 'Legal Compliance', description: 'Complete labor law compliance management' },
      { title: 'EPF/ETF Management', description: 'EPF and ETF compliance and processing' },
      { title: 'Policy Development', description: 'HR policy development and implementation' },
      { title: 'Advisory Services', description: 'Ongoing legal advisory and support services' }
    ],
    benefits: ['Legal compliance', 'Risk mitigation', 'Policy clarity', 'Professional guidance', 'Statutory adherence']
  },
  25: {
    id: 25,
    name: 'Plantation Digital Identity',
    category: 'Support',
    image: '/images/services/service.png',
    icon: 'mdi-digital-ocean',
    description: 'Digital transformation and identity solutions for plantations',
    duration: '4-8 weeks',
    availability: 'Year-round',
    coverage: 'All 9 Provinces',
    keyFeatures: [
      { title: 'Digital Strategy', description: 'Comprehensive digital transformation strategy' },
      { title: 'Identity Systems', description: 'Digital identity and branding systems' },
      { title: 'Technology Integration', description: 'Modern technology integration and implementation' },
      { title: 'Digital Presence', description: 'Strong digital presence and online visibility' }
    ],
    benefits: ['Digital transformation', 'Modern identity', 'Technology advantage', 'Market presence', 'Efficiency gains']
  },
  26: {
    id: 26,
    name: 'Farm Management Dashboards',
    category: 'Support',
    image: '/images/services/service.png',
    icon: 'mdi-monitor-dashboard',
    description: 'Advanced farm management and monitoring dashboards',
    duration: '3-5 weeks',
    availability: 'Year-round',
    coverage: 'All 9 Provinces',
    keyFeatures: [
      { title: 'Dashboard Development', description: 'Custom dashboard development and design' },
      { title: 'Real-time Monitoring', description: 'Real-time farm monitoring and analytics' },
      { title: 'Data Integration', description: 'Comprehensive data integration and management' },
      { title: 'Performance Tracking', description: 'Performance tracking and reporting systems' }
    ],
    benefits: ['Real-time insights', 'Data-driven decisions', 'Performance visibility', 'Operational efficiency', 'Management control']
  },
  27: {
    id: 27,
    name: 'Traceability / Blockchain / R & D',
    category: 'Support',
    image: '/images/services/service.png',
    icon: 'mdi-link-variant',
    description: 'Cutting-edge traceability and research solutions',
    duration: '6-12 weeks',
    availability: 'Year-round',
    coverage: 'All 9 Provinces',
    keyFeatures: [
      { title: 'Traceability Systems', description: 'Advanced product traceability and tracking' },
      { title: 'Blockchain Integration', description: 'Blockchain technology for transparency' },
      { title: 'Research & Development', description: 'Ongoing research and innovation projects' },
      { title: 'Technology Innovation', description: 'Cutting-edge technology innovation and implementation' }
    ],
    benefits: ['Product transparency', 'Technology leadership', 'Innovation advantage', 'Consumer trust', 'Market differentiation']
  },
  28: {
    id: 28,
    name: 'Transport & Cold Chain Logistics',
    category: 'Supply Chain',
    image: '/images/services/service.png',
    icon: 'mdi-truck-fast',
    description: 'Efficient transport and cold chain logistics solutions',
    duration: 'Ongoing',
    availability: 'Year-round',
    coverage: 'All 9 Provinces + International',
    keyFeatures: [
      { title: 'Transport Management', description: 'Comprehensive transport and logistics management' },
      { title: 'Cold Chain', description: 'Advanced cold chain storage and transport' },
      { title: 'Route Optimization', description: 'Efficient route planning and optimization' },
      { title: 'Quality Preservation', description: 'Product quality preservation during transport' }
    ],
    benefits: ['Efficient delivery', 'Quality preservation', 'Cost optimization', 'Reliable logistics', 'Global reach']
  },
  29: {
    id: 29,
    name: 'Export/Import Facilitation & Customs',
    category: 'Supply Chain',
    image: '/images/services/service.png',
    icon: 'mdi-ship-wheel',
    description: 'Complete export/import facilitation and customs services',
    duration: '1-3 weeks',
    availability: 'Year-round',
    coverage: 'Global Markets',
    keyFeatures: [
      { title: 'Export Facilitation', description: 'Complete export process facilitation and management' },
      { title: 'Customs Clearance', description: 'Professional customs clearance and documentation' },
      { title: 'Documentation', description: 'Complete export/import documentation services' },
      { title: 'Compliance Management', description: 'International trade compliance and regulations' }
    ],
    benefits: ['Smooth exports', 'Compliance assurance', 'Process efficiency', 'Global access', 'Professional handling']
  },
  30: {
    id: 30,
    name: 'E-commerce & B2B Platforms',
    category: 'Supply Chain',
    image: '/images/services/service.png',
    icon: 'mdi-shopping',
    description: 'Modern e-commerce and B2B platform solutions',
    duration: '4-8 weeks',
    availability: 'Year-round',
    coverage: 'Global Markets',
    keyFeatures: [
      { title: 'Platform Development', description: 'Custom e-commerce and B2B platform development' },
      { title: 'Digital Marketing', description: 'Integrated digital marketing and promotion' },
      { title: 'Order Management', description: 'Comprehensive order and inventory management' },
      { title: 'Customer Support', description: 'Professional customer support and service' }
    ],
    benefits: ['Online presence', 'Market expansion', 'Sales growth', 'Customer reach', 'Digital advantage']
  },
  31: {
    id: 31,
    name: 'Packaging Design & Storytelling',
    category: 'Supply Chain',
    image: '/images/services/service.png',
    icon: 'mdi-palette',
    description: 'Creative packaging design and brand storytelling',
    duration: '3-4 weeks',
    availability: 'Year-round',
    coverage: 'All 9 Provinces',
    keyFeatures: [
      { title: 'Creative Design', description: 'Creative and innovative packaging design' },
      { title: 'Brand Storytelling', description: 'Compelling brand storytelling and messaging' },
      { title: 'Market Appeal', description: 'Market-oriented design and positioning' },
      { title: 'Sustainability', description: 'Sustainable packaging solutions and materials' }
    ],
    benefits: ['Visual appeal', 'Brand differentiation', 'Market impact', 'Sustainable solutions', 'Consumer engagement']
  },
  32: {
    id: 32,
    name: 'Digital Marketing Campaigns',
    category: 'Supply Chain',
    image: '/images/services/service.png',
    icon: 'mdi-bullhorn',
    description: 'Strategic digital marketing and campaign management',
    duration: '2-6 weeks',
    availability: 'Year-round',
    coverage: 'Global Markets',
    keyFeatures: [
      { title: 'Campaign Strategy', description: 'Comprehensive digital marketing strategy and planning' },
      { title: 'Multi-Channel Marketing', description: 'Multi-channel digital marketing campaigns' },
      { title: 'Content Creation', description: 'Professional content creation and management' },
      { title: 'Performance Analytics', description: 'Campaign performance tracking and optimization' }
    ],
    benefits: ['Brand visibility', 'Market reach', 'Lead generation', 'Sales growth', 'ROI optimization']
  },
  33: {
    id: 33,
    name: 'Trade Fairs & Global Exhibitions',
    category: 'Supply Chain',
    image: '/images/services/service.png',
    icon: 'mdi-presentation',
    description: 'International trade fair and exhibition participation',
    duration: '4-12 weeks',
    availability: 'Seasonal',
    coverage: 'Global Markets',
    keyFeatures: [
      { title: 'Exhibition Management', description: 'Complete exhibition planning and management' },
      { title: 'Booth Design', description: 'Professional booth design and setup' },
      { title: 'Networking Support', description: 'Strategic networking and business development' },
      { title: 'Follow-up Services', description: 'Post-exhibition follow-up and lead management' }
    ],
    benefits: ['Global exposure', 'Business networking', 'Market presence', 'Lead generation', 'Industry connections']
  },
  34: {
    id: 34,
    name: 'Environmental: Soil & Water Health',
    category: 'ESG',
    image: '/images/services/service.png',
    icon: 'mdi-leaf',
    description: 'Comprehensive environmental health and sustainability services',
    duration: '3-6 weeks',
    availability: 'Year-round',
    coverage: 'All 9 Provinces',
    keyFeatures: [
      { title: 'Environmental Assessment', description: 'Comprehensive environmental health assessment' },
      { title: 'Soil Health', description: 'Soil health monitoring and improvement programs' },
      { title: 'Water Management', description: 'Sustainable water management and conservation' },
      { title: 'Sustainability Planning', description: 'Long-term sustainability planning and implementation' }
    ],
    benefits: ['Environmental sustainability', 'Soil health improvement', 'Water conservation', 'Regulatory compliance', 'Long-term viability']
  },
  35: {
    id: 35,
    name: 'Social: Worker Welfare Audits',
    category: 'ESG',
    image: '/images/services/service.png',
    icon: 'mdi-account-heart',
    description: 'Worker welfare audits and social responsibility programs',
    duration: '2-4 weeks',
    availability: 'Year-round',
    coverage: 'All 9 Provinces',
    keyFeatures: [
      { title: 'Welfare Audits', description: 'Comprehensive worker welfare assessment and auditing' },
      { title: 'Social Programs', description: 'Social responsibility program development and implementation' },
      { title: 'Compliance Monitoring', description: 'Social compliance monitoring and reporting' },
      { title: 'Improvement Planning', description: 'Welfare improvement planning and execution' }
    ],
    benefits: ['Worker satisfaction', 'Social compliance', 'Ethical practices', 'Community development', 'Reputation enhancement']
  },
  36: {
    id: 36,
    name: 'Governance: ESG Audits & Certifications',
    category: 'ESG',
    image: '/images/services/service.png',
    icon: 'mdi-shield-check',
    description: 'ESG audits and governance certification services',
    duration: '4-8 weeks',
    availability: 'Year-round',
    coverage: 'All 9 Provinces',
    keyFeatures: [
      { title: 'ESG Auditing', description: 'Comprehensive ESG assessment and auditing' },
      { title: 'Governance Review', description: 'Corporate governance review and improvement' },
      { title: 'Certification Support', description: 'ESG certification and compliance support' },
      { title: 'Reporting Systems', description: 'ESG reporting and monitoring systems' }
    ],
    benefits: ['ESG compliance', 'Governance improvement', 'Certification achievement', 'Investor confidence', 'Risk management']
  },
  37: {
    id: 37,
    name: 'Rainforest Alliance',
    category: 'Certifications',
    image: '/images/services/certifications/rainforest-alliance.webp',
    icon: 'mdi-tree',
    description: 'Rainforest Alliance certification and compliance',
    duration: '6-12 weeks',
    availability: 'Year-round',
    coverage: 'All 9 Provinces',
    keyFeatures: [
      { title: 'Certification Process', description: 'Complete Rainforest Alliance certification process' },
      { title: 'Compliance Management', description: 'Ongoing compliance management and monitoring' },
      { title: 'Documentation', description: 'Complete documentation and record keeping' },
      { title: 'Audit Preparation', description: 'Audit preparation and support services' }
    ],
    benefits: ['International recognition', 'Market access', 'Premium pricing', 'Sustainability credentials', 'Consumer trust']
  },
  38: {
    id: 38,
    name: 'Organic (EU/USDA/JAS/SL)',
    category: 'Certifications',
    image: '/images/services/certifications/Organic.png',
    icon: 'mdi-sprout',
    description: 'Multiple organic certifications for global markets',
    duration: '8-16 weeks',
    availability: 'Year-round',
    coverage: 'All 9 Provinces',
    keyFeatures: [
      { title: 'Multi-Standard Certification', description: 'EU, USDA, JAS, and SL organic certifications' },
      { title: 'Organic Transition', description: 'Complete organic transition planning and support' },
      { title: 'Compliance Management', description: 'Ongoing organic compliance and monitoring' },
      { title: 'Documentation Systems', description: 'Comprehensive documentation and record systems' }
    ],
    benefits: ['Premium market access', 'Higher pricing', 'Global market reach', 'Organic credibility', 'Health benefits']
  },
  39: {
    id: 39,
    name: 'Fairtrade International',
    category: 'Certifications',
    image: '/images/services/certifications/Fairtrade_International.jpg',
    icon: 'mdi-handshake',
    description: 'Fairtrade International certification and support',
    duration: '6-12 weeks',
    availability: 'Year-round',
    coverage: 'All 9 Provinces',
    keyFeatures: [
      { title: 'Fairtrade Certification', description: 'Complete Fairtrade International certification' },
      { title: 'Fair Trade Practices', description: 'Fair trade practice implementation and monitoring' },
      { title: 'Community Development', description: 'Community development and social premium management' },
      { title: 'Market Linkages', description: 'Fairtrade market linkages and buyer connections' }
    ],
    benefits: ['Fair trade premiums', 'Community development', 'Market stability', 'Ethical practices', 'Consumer appeal']
  },
  40: {
    id: 40,
    name: 'GlobalG.A.P. & UTZ',
    category: 'Certifications',
    image: '/images/services/certifications/Gloable G.P.A.png',
    icon: 'mdi-check-circle',
    description: 'GlobalG.A.P. and UTZ certification services',
    duration: '6-10 weeks',
    availability: 'Year-round',
    coverage: 'All 9 Provinces',
    keyFeatures: [
      { title: 'GlobalG.A.P. Certification', description: 'Complete GlobalG.A.P. certification and compliance' },
      { title: 'UTZ Certification', description: 'UTZ sustainable farming certification' },
      { title: 'Good Agricultural Practices', description: 'Implementation of good agricultural practices' },
      { title: 'Supply Chain Integration', description: 'Supply chain integration and traceability' }
    ],
    benefits: ['Market access', 'Quality assurance', 'Sustainable practices', 'Supply chain credibility', 'Consumer confidence']
  },
  41: {
    id: 41,
    name: 'SMETA & SA8000',
    category: 'Certifications',
    image: '/images/services/certifications/SMETA & SA8000.png',
    icon: 'mdi-account-check',
    description: 'SMETA and SA8000 social compliance certifications',
    duration: '4-8 weeks',
    availability: 'Year-round',
    coverage: 'All 9 Provinces',
    keyFeatures: [
      { title: 'SMETA Auditing', description: 'SMETA social compliance auditing and certification' },
      { title: 'SA8000 Standards', description: 'SA8000 social accountability standards implementation' },
      { title: 'Worker Rights', description: 'Worker rights protection and monitoring' },
      { title: 'Compliance Systems', description: 'Social compliance management systems' }
    ],
    benefits: ['Social compliance', 'Worker protection', 'Ethical practices', 'Supply chain credibility', 'Brand reputation']
  },
  42: {
    id: 42,
    name: 'ISO Standards',
    category: 'Certifications',
    image: '/images/services/certifications/ISO.png',
    icon: 'mdi-certificate',
    description: 'Various ISO standard certifications and implementation',
    duration: '8-16 weeks',
    availability: 'Year-round',
    coverage: 'All 9 Provinces',
    keyFeatures: [
      { title: 'Multi-ISO Certification', description: 'Multiple ISO standard certifications (9001, 14001, 22000, etc.)' },
      { title: 'System Implementation', description: 'Quality management system implementation' },
      { title: 'Process Optimization', description: 'Business process optimization and standardization' },
      { title: 'Continuous Improvement', description: 'Continuous improvement and monitoring systems' }
    ],
    benefits: ['International recognition', 'Process efficiency', 'Quality assurance', 'Management systems', 'Competitive advantage']
  },
  43: {
    id: 43,
    name: 'B Corp Certification',
    category: 'Certifications',
    image: '/images/services/certifications/B Corp.png',
    icon: 'mdi-earth',
    description: 'B Corp certification for sustainable business practices',
    duration: '12-24 weeks',
    availability: 'Year-round',
    coverage: 'All 9 Provinces',
    keyFeatures: [
      { title: 'B Corp Assessment', description: 'Comprehensive B Corp impact assessment' },
      { title: 'Sustainability Integration', description: 'Sustainability integration across business operations' },
      { title: 'Stakeholder Governance', description: 'Stakeholder-oriented governance implementation' },
      { title: 'Impact Measurement', description: 'Social and environmental impact measurement' }
    ],
    benefits: ['Sustainability leadership', 'Brand differentiation', 'Stakeholder engagement', 'Impact recognition', 'Market positioning']
  },
  44: {
    id: 44,
    name: 'GRI / SASB Reporting',
    category: 'Certifications',
    image: '/images/services/certifications/GRI & SASB.png',
    icon: 'mdi-file-document',
    description: 'GRI and SASB sustainability reporting services',
    duration: '6-12 weeks',
    availability: 'Year-round',
    coverage: 'All 9 Provinces',
    keyFeatures: [
      { title: 'GRI Reporting', description: 'Global Reporting Initiative (GRI) sustainability reporting' },
      { title: 'SASB Standards', description: 'Sustainability Accounting Standards Board (SASB) reporting' },
      { title: 'Data Collection', description: 'Comprehensive sustainability data collection and analysis' },
      { title: 'Report Preparation', description: 'Professional sustainability report preparation and publication' }
    ],
    benefits: ['Transparency', 'Stakeholder communication', 'Investment attraction', 'Sustainability credibility', 'Regulatory compliance']
  },
  45: {
    id: 45,
    name: 'Yield per Hectare (kg/ha/year)',
    category: 'KPIs',
    image: '/images/services/service.png',
    icon: 'mdi-chart-bar',
    description: 'Comprehensive yield analysis and optimization metrics',
    duration: 'Ongoing',
    availability: 'Year-round',
    coverage: 'All 9 Provinces',
    keyFeatures: [
      { title: 'Yield Monitoring', description: 'Comprehensive yield monitoring and tracking' },
      { title: 'Performance Analysis', description: 'Detailed performance analysis and benchmarking' },
      { title: 'Optimization Strategies', description: 'Yield optimization strategies and recommendations' },
      { title: 'Reporting Systems', description: 'Automated reporting and dashboard systems' }
    ],
    benefits: ['Yield optimization', 'Performance visibility', 'Data-driven decisions', 'Productivity improvement', 'Benchmarking']
  },
  46: {
    id: 46,
    name: 'ROI per Acre (Annualized)',
    category: 'KPIs',
    image: '/images/services/service.png',
    icon: 'mdi-calculator',
    description: 'Return on investment analysis and tracking',
    duration: 'Ongoing',
    availability: 'Year-round',
    coverage: 'All 9 Provinces',
    keyFeatures: [
      { title: 'ROI Calculation', description: 'Accurate ROI calculation and analysis' },
      { title: 'Investment Tracking', description: 'Investment tracking and performance monitoring' },
      { title: 'Financial Analysis', description: 'Comprehensive financial analysis and reporting' },
      { title: 'Optimization Recommendations', description: 'ROI optimization recommendations and strategies' }
    ],
    benefits: ['Financial clarity', 'Investment optimization', 'Performance tracking', 'Decision support', 'Profitability improvement']
  },
  47: {
    id: 47,
    name: 'Value-Added % (Raw vs. Branded)',
    category: 'KPIs',
    image: '/images/services/service.png',
    icon: 'mdi-trending-up',
    description: 'Value addition measurement and optimization',
    duration: 'Ongoing',
    availability: 'Year-round',
    coverage: 'All 9 Provinces',
    keyFeatures: [
      { title: 'Value Analysis', description: 'Comprehensive value addition analysis and measurement' },
      { title: 'Branding Impact', description: 'Branding impact assessment and optimization' },
      { title: 'Market Positioning', description: 'Strategic market positioning and pricing analysis' },
      { title: 'Optimization Strategies', description: 'Value addition optimization strategies and implementation' }
    ],
    benefits: ['Value optimization', 'Pricing strategies', 'Market positioning', 'Revenue enhancement', 'Competitive advantage']
  },
  48: {
    id: 48,
    name: 'Export Readiness Index',
    category: 'KPIs',
    image: '/images/services/service.png',
    icon: 'mdi-export',
    description: 'Export readiness assessment and improvement metrics',
    duration: '2-4 weeks',
    availability: 'Year-round',
    coverage: 'All 9 Provinces',
    keyFeatures: [
      { title: 'Readiness Assessment', description: 'Comprehensive export readiness assessment' },
      { title: 'Gap Analysis', description: 'Export capability gap analysis and identification' },
      { title: 'Improvement Planning', description: 'Export readiness improvement planning and implementation' },
      { title: 'Monitoring Systems', description: 'Continuous monitoring and tracking systems' }
    ],
    benefits: ['Export preparedness', 'Market readiness', 'Capability improvement', 'Global competitiveness', 'Export success']
  },
  49: {
    id: 49,
    name: 'Worker Welfare Score',
    category: 'KPIs',
    image: '/images/services/service.png',
    icon: 'mdi-account-heart',
    description: 'Worker welfare measurement and improvement tracking',
    duration: 'Ongoing',
    availability: 'Year-round',
    coverage: 'All 9 Provinces',
    keyFeatures: [
      { title: 'Welfare Assessment', description: 'Comprehensive worker welfare assessment and scoring' },
      { title: 'Satisfaction Monitoring', description: 'Employee satisfaction monitoring and tracking' },
      { title: 'Improvement Programs', description: 'Welfare improvement program development and implementation' },
      { title: 'Reporting Systems', description: 'Worker welfare reporting and dashboard systems' }
    ],
    benefits: ['Employee satisfaction', 'Welfare improvement', 'Social compliance', 'Productivity enhancement', 'Retention improvement']
  },
  50: {
    id: 50,
    name: 'ESG Audit Score',
    category: 'KPIs',
    image: '/images/services/service.png',
    icon: 'mdi-shield-check',
    description: 'ESG performance measurement and reporting',
    duration: 'Ongoing',
    availability: 'Year-round',
    coverage: 'All 9 Provinces',
    keyFeatures: [
      { title: 'ESG Assessment', description: 'Comprehensive ESG performance assessment and scoring' },
      { title: 'Impact Measurement', description: 'Environmental, social, and governance impact measurement' },
      { title: 'Reporting Systems', description: 'ESG reporting and communication systems' },
      { title: 'Improvement Tracking', description: 'ESG performance improvement tracking and monitoring' }
    ],
    benefits: ['ESG performance', 'Sustainability tracking', 'Investor confidence', 'Regulatory compliance', 'Risk management']
  },
  51: {
    id: 51,
    name: 'Carbon Credit Revenues',
    category: 'KPIs',
    image: '/images/services/service.png',
    icon: 'mdi-leaf',
    description: 'Carbon credit generation and revenue tracking',
    duration: 'Ongoing',
    availability: 'Year-round',
    coverage: 'All 9 Provinces',
    keyFeatures: [
      { title: 'Carbon Assessment', description: 'Carbon footprint assessment and measurement' },
      { title: 'Credit Generation', description: 'Carbon credit generation and verification' },
      { title: 'Revenue Tracking', description: 'Carbon credit revenue tracking and optimization' },
      { title: 'Market Access', description: 'Carbon credit market access and trading support' }
    ],
    benefits: ['Additional revenue', 'Environmental impact', 'Carbon neutrality', 'Sustainability credentials', 'Market opportunities']
  }
}
const service = computed(() => {
  return servicesData[parseInt(route.params.id)] || null
})
const relatedServices = computed(() => {
  if (!service.value) return []
  return Object.values(servicesData)
    .filter(s => s.category === service.value.category && s.id !== service.value.id)
    .slice(0, 3)
})
const addServiceToCart = () => {
  if (service.value) {
    addToCart(service.value.category, {
      name: service.value.name,
      description: service.value.description,
      image: service.value.image,
      icon: service.value.icon
    })
  }
}
const downloadBrochure = () => {
  // Implement brochure download logic
}
useSeoMeta({
  title: computed(() => service.value ? `${service.value.name} - PPA Services` : 'Service Not Found'),
  description: computed(() => service.value ? service.value.description : 'Service not found'),
  ogTitle: computed(() => service.value ? `${service.value.name} - Professional Plantation Services` : 'Service Not Found'),
  ogDescription: computed(() => service.value ? service.value.description : 'Service not found'),
})
definePageMeta({
  title: 'Service Details - PPA'
})
</script>

<style scoped>
.single-service-page {
  min-height: 100vh;
}
.hero-section {
  padding: 4rem 0;
}
.v-theme--light .hero-section {
  background: linear-gradient(135deg, rgb(var(--v-theme-primary)) 0%, rgba(var(--v-theme-surface), 0.9) 100%);
}
.v-theme--dark .hero-section {
  background: linear-gradient(135deg, rgb(var(--v-theme-surface)) 0%, rgba(var(--v-theme-surface-variant), 0.8) 100%);
}
.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  color: rgb(var(--v-theme-text));
}
.hero-description {
  font-size: 1.2rem;
  line-height: 1.6;
  color: rgb(var(--v-theme-text));
}
.error-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(var(--v-theme-primary), 0.1);
}
.section-title {
  font-size: 2.5rem;
  font-weight: 600;
  color: rgb(var(--v-theme-section-title));
  border-bottom: 2px solid rgb(var(--v-theme-accent));
  padding-bottom: 0.5rem;
}
.subsection-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: rgb(var(--v-theme-section-title));
}
.feature-item {
  margin-bottom: 1.5rem;
}
.feature-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: rgb(var(--v-theme-section-title));
}
.benefits-card {
  border-radius: 12px;
  border-left: 4px solid rgb(var(--v-theme-primary));
}
.benefits-list {
  list-style: none;
  padding: 0;
}
.benefits-list li {
  display: flex;
  align-items: center;
  color: rgb(var(--v-theme-on-surface));
}
.service-info-card,
.related-services-card {
  background-color: rgb(var(--v-theme-service-card-bg));
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(var(--v-theme-outline), 0.12);
}
.related-service-item {
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 8px;
  margin: 4px 8px;
}
.related-service-item:hover {
  background-color: rgba(var(--v-theme-primary), 0.08);
  transform: translateX(4px);
}
.cta-section {
  position: relative;
  overflow: hidden;
}
.cta-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
  pointer-events: none;
}
.cta-title {
  font-size: 2.5rem;
  font-weight: 600;
}
.cta-description {
  font-size: 1.1rem;
}
.cta-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}
@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  .hero-description {
    font-size: 1rem;
  }
  .section-title {
    font-size: 2rem;
  }
  .cta-title {
    font-size: 2rem;
  }
  .cta-actions {
    flex-direction: column;
    align-items: stretch;
  }
  .cta-actions .v-btn {
    width: 100%;
  }
}
</style>