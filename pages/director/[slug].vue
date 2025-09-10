<template>
  <v-container class="py-12" max-width="1200">
    <v-row v-if="director">
      <!-- Back Button -->
      <v-col cols="12" class="mb-4">
        <v-btn 
          variant="outlined" 
          color="primary" 
          @click="$router.back()"
          prepend-icon="mdi-arrow-left"
        >
          Back to Leadership Team
        </v-btn>
      </v-col>

      <!-- Director Profile -->
      <v-col cols="12" md="4">
        <v-card class="director-profile-card" elevation="4">
          <div class="director-image-wrapper">
            <v-img 
              :src="director.image" 
              :alt="director.name" 
              class="director-profile-image"
              cover
            >
              <template #error>
                <div class="error-placeholder">
                  <v-icon size="120" color="white">mdi-account-tie</v-icon>
                </div>
              </template>
            </v-img>
          </div>
          <v-card-text class="text-center pa-6">
            <h1 class="director-profile-name">{{ director.name }}</h1>
            <p class="director-title">{{ director.position }}</p>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Director Details -->
      <v-col cols="12" md="8">
        <v-card class="director-details-card" elevation="2">
          <v-card-text class="pa-8">
            <!-- About Section -->
            <div class="mb-8">
              <h2 class="section-title mb-4">About {{ director.name.replace('Director : ', '') }}</h2>
              <p class="director-description">{{ director.description }}</p>
            </div>

            <!-- Qualifications Section -->
            <div class="mb-8">
              <h2 class="section-title mb-4">Qualifications</h2>
              <ul class="qualifications-list">
                <li v-for="qualification in director.qualifications" :key="qualification">
                  <v-icon size="small" color="navtext" class="mr-2">mdi-certificate</v-icon>
                  {{ qualification }}
                </li>
              </ul>
            </div>

            <!-- Services Section -->
            <div class="mb-6">
              <h2 class="section-title mb-4">Services Provided</h2>
              <v-row>
                <v-col v-for="service in director.services" :key="service" cols="12" sm="6" class="py-2">
                  <v-chip color="navtext" variant="outlined" size="large">
                    <v-icon start>mdi-check-circle</v-icon>
                    {{ service }}
                  </v-chip>
                </v-col>
              </v-row>
            </div>

            <!-- Contact Information -->
            <div class="contact-section">
              <h2 class="section-title mb-4">Contact Information</h2>
              <v-row>
                <v-col cols="12" sm="6" v-if="director.email">
                  <v-card class="contact-item" variant="outlined">
                    <v-card-text class="text-center pa-4">
                      <v-icon size="large" color="section-title" class="mb-2">mdi-email</v-icon>
                      <p class="contact-label">Email</p>
                      <p class="contact-value">{{ director.email }}</p>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="12" sm="6" v-if="director.phone">
                  <v-card class="contact-item" variant="outlined">
                    <v-card-text class="text-center pa-4">
                      <v-icon size="large" color="section-title" class="mb-2">mdi-phone</v-icon>
                      <p class="contact-label">Phone</p>
                      <p class="contact-value">{{ director.phone }}</p>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Director Not Found -->
    <v-row v-else>
      <v-col cols="12" class="text-center">
        <v-card class="pa-8" elevation="2">
          <v-icon size="100" color="grey" class="mb-4">mdi-account-question</v-icon>
          <h2 class="mb-4">Director Not Found</h2>
          <p class="mb-6">The director profile you're looking for doesn't exist.</p>
          <v-btn color="primary" @click="$router.push('/contactus')">
            Back to Leadership Team
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'

const route = useRoute()
const router = useRouter()

// Director data (in a real app, this would come from an API)
const directorsData = {
  'd-m-kobbekaduwe': {
    name: 'Director : D M Kobbekaduwe',
    position: 'Senior Director',
    image: '/images/team/Dammika.jpg',
    description: 'With over 25 years of experience in strategic planning and organizational development, D M Kobbekaduwe has been instrumental in driving PPA\'s growth and success. His expertise spans across multiple sectors including finance, technology, and business development.',
    qualifications: [
      'MBA in Strategic Management',
      'Bachelor of Business Administration',
      'Certified Project Management Professional (PMP)',
      'Advanced Certificate in Corporate Governance'
    ],
    services: [
      'Strategic Planning',
      'Business Development',
      'Corporate Governance',
      'Risk Management',
      'Financial Advisory',
      'Project Management'
    ],
    email: 'dkobbekaduwe@ppa.lk',
    phone: '+94 11 234 5678'
  },
  'rehan-jayatilake': {
    name: 'Director : Rehan Jayatilake',
    position: 'Director - Operations',
    image: '/images/team/Rehan.jpg',
    description: 'Rehan Jayatilake brings extensive experience in operations management and process optimization. His leadership has been crucial in streamlining PPA\'s operational efficiency and service delivery excellence.',
    qualifications: [
      'Master of Science in Operations Management',
      'Bachelor of Engineering',
      'Six Sigma Black Belt Certification',
      'Lean Management Certification'
    ],
    services: [
      'Operations Management',
      'Process Optimization',
      'Quality Assurance',
      'Supply Chain Management',
      'Performance Analytics',
      'Team Leadership'
    ],
    email: 'rehan@ppa.lk',
    phone: '+94 11 234 5679'
  },
  'ravindra-hewavitharana': {
    name: 'Director : Ravindra Hewavitharana',
    position: 'Director - Technology',
    image: '/images/team/Ravindra.jpg',
    description: 'Ravindra Hewavitharana is a technology visionary with deep expertise in digital transformation and innovation. He leads PPA\'s technological initiatives and digital strategy implementation.',
    qualifications: [
      'Master of Computer Science',
      'Bachelor of Information Technology',
      'Certified Information Systems Security Professional (CISSP)',
      'AWS Solutions Architect Certification'
    ],
    services: [
      'Digital Transformation',
      'IT Strategy',
      'Cybersecurity',
      'Cloud Solutions',
      'Software Development',
      'Technology Consulting'
    ],
    email: 'ravindra@ppa.lk',
    phone: '+94 11 234 5680'
  },
  's-m-p-jayantha': {
    name: 'Director : S M P Jayantha',
    position: 'Director - Finance',
    image: '/images/team/Jayantha.jpg',
    description: 'S M P Jayantha is a seasoned finance professional with comprehensive experience in financial management, investment strategies, and regulatory compliance.',
    qualifications: [
      'Chartered Financial Analyst (CFA)',
      'Master of Finance',
      'Certified Public Accountant (CPA)',
      'Advanced Diploma in Taxation'
    ],
    services: [
      'Financial Planning',
      'Investment Advisory',
      'Tax Consulting',
      'Audit Services',
      'Risk Assessment',
      'Regulatory Compliance'
    ],
    email: 'jayantha@ppa.lk',
    phone: '+94 11 234 5681'
  },
  'w-g-somaratne': {
    name: 'Director : Dr W G Somaratne',
    position: 'Director - Research & Development',
    image: '/images/team/Somarathne.jpg',
    description: 'Dr W G Somaratne is a distinguished researcher and academic with extensive experience in innovation management and strategic research initiatives.',
    qualifications: [
      'PhD in Business Administration',
      'Master of Science in Management',
      'Postgraduate Diploma in Research Methodology',
      'Certified Innovation Manager'
    ],
    services: [
      'Research & Development',
      'Innovation Management',
      'Academic Consulting',
      'Strategic Research',
      'Policy Development',
      'Training & Development'
    ],
    email: 'somaratne@ppa.lk',
    phone: '+94 11 234 5682'
  },
  'upananda-karunarathne': {
    name: 'Director : Mr Upananda Karunarathne',
    position: 'Director - Human Resources',
    image: '/images/team/Upananda.jpg',
    description: 'Upananda Karunarathne is an HR expert specializing in organizational development, talent management, and employee engagement strategies.',
    qualifications: [
      'Master of Human Resource Management',
      'Bachelor of Psychology',
      'Certified HR Professional (CHRP)',
      'Advanced Certificate in Organizational Development'
    ],
    services: [
      'Human Resource Management',
      'Talent Acquisition',
      'Performance Management',
      'Training & Development',
      'Employee Relations',
      'Organizational Development'
    ],
    email: 'upananda@ppa.lk',
    phone: '+94 11 234 5683'
  },
  'wijitha-manamperi': {
    name: 'Director : Attorney Wijitha Manamperi',
    position: 'Director - Legal Affairs',
    image: '/images/team/Vijitha.jpg',
    description: 'Attorney Wijitha Manamperi is a distinguished legal professional with expertise in corporate law, compliance, and regulatory affairs.',
    qualifications: [
      'Attorney-at-Law',
      'Master of Laws (LLM)',
      'Bachelor of Laws (LLB)',
      'Certified Compliance Professional'
    ],
    services: [
      'Legal Advisory',
      'Corporate Law',
      'Contract Management',
      'Regulatory Compliance',
      'Dispute Resolution',
      'Legal Documentation'
    ],
    email: 'wijitha@ppa.lk',
    phone: '+94 11 234 5684'
  },
  'nalin-amunugama': {
    name: 'Director : Nalin Amunugama',
    position: 'Director - Marketing',
    image: '/images/team/Nalin.jpg',
    description: 'Nalin Amunugama is a marketing strategist with extensive experience in brand management, digital marketing, and customer relationship management.',
    qualifications: [
      'Master of Marketing',
      'Bachelor of Business Administration',
      'Certified Digital Marketing Professional',
      'Advanced Certificate in Brand Management'
    ],
    services: [
      'Marketing Strategy',
      'Brand Management',
      'Digital Marketing',
      'Customer Relations',
      'Market Research',
      'Advertising Campaigns'
    ],
    email: 'nalin@ppa.lk',
    phone: '+94 11 234 5685'
  },
  'januka-karunasena': {
    name: 'Director : Januka Karunasena',
    position: 'Director - Business Development',
    image: '/images/team/Januka.jpg',
    description: 'Januka Karunasena specializes in business development, strategic partnerships, and market expansion initiatives.',
    qualifications: [
      'Master of Business Development',
      'Bachelor of Commerce',
      'Certified Sales Professional',
      'Advanced Diploma in Strategic Management'
    ],
    services: [
      'Business Development',
      'Strategic Partnerships',
      'Market Expansion',
      'Sales Strategy',
      'Client Relations',
      'Revenue Growth'
    ],
    email: 'januka@ppa.lk',
    phone: '+94 11 234 5686'
  },
  'sarath-p-nissanka': {
    name: 'Director : Prof Sarath P Nissanka',
    position: 'Director - Academic Affairs',
    image: '/images/team/Nissanka 2.jpg',
    description: 'Prof Sarath P Nissanka is an esteemed academic and researcher with extensive experience in educational leadership and curriculum development.',
    qualifications: [
      'PhD in Education',
      'Master of Education',
      'Postgraduate Diploma in Higher Education',
      'Certified Academic Leader'
    ],
    services: [
      'Academic Leadership',
      'Curriculum Development',
      'Educational Research',
      'Faculty Development',
      'Quality Assurance',
      'Academic Consulting'
    ],
    email: 'nissanka@ppa.lk',
    phone: '+94 11 234 5687'
  }
}

const director = computed(() => {
  return directorsData[route.params.slug] || null
})

definePageMeta({
  title: 'Director Profile - PPA'
})
</script>

<style scoped>
.director-profile-card {
  border-radius: 16px;
  overflow: hidden;
}

.director-image-wrapper {
  height: 400px;
  overflow: hidden;
}

.director-profile-image {
  width: 100%;
  height: 100%;
}

.director-profile-image .v-img__img {
  object-fit: cover;
  object-position: center top;
}

.error-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(var(--v-theme-primary), 0.1);
}

.director-profile-name {
  font-size: 1.8rem;
  font-weight: 600;
  color: rgb(var(--v-theme-section-title));
  margin-bottom: 0.5rem;
}

.director-title {
  font-size: 1.2rem;
  color: rgb(var(--v-theme-navtext));
  font-weight: 500;
}

.director-details-card {
  border-radius: 16px;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: rgb(var(--v-theme-section-title));
  border-bottom: 2px solid rgb(var(--v-theme-accent));
  padding-bottom: 0.5rem;
}

.director-description {
  font-size: 1.1rem;
  line-height: 1.7;
  color: rgb(var(--v-theme-on-surface));
  text-align: justify;
}

.qualifications-list {
  list-style: none;
  padding: 0;
}

.qualifications-list li {
  padding: 0.8rem 0;
  font-size: 1.1rem;
  color: rgb(var(--v-theme-on-surface));
  border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.1);
  display: flex;
  align-items: center;
}

.qualifications-list li:last-child {
  border-bottom: none;
}

.contact-section {
  background-color: rgba(var(--v-theme-primary), 0.05);
  border-radius: 12px;
  padding: 1.5rem;
}

.contact-item {
  border-radius: 12px;
  transition: all 0.3s ease;
}

.contact-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(var(--v-theme-primary), 0.2);
}

.contact-label {
  font-weight: 600;
  color: rgb(var(--v-theme-section-title));
  margin: 0;
  font-size: 0.9rem;
}

.contact-value {
  font-size: 1rem;
  color: rgb(var(--v-theme-on-surface));
  margin: 0;
  font-weight: 500;
}

@media (max-width: 768px) {
  .director-profile-name {
    font-size: 1.5rem;
  }
  
  .director-title {
    font-size: 1rem;
  }
  
  .section-title {
    font-size: 1.3rem;
  }
  
  .director-description {
    font-size: 1rem;
  }
  
  .director-image-wrapper {
    height: 300px;
  }
}
</style>