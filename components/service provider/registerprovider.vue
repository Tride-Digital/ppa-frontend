<!-- pages/join/service-provider/index.vue -->
<template>
  <v-container class="py-8">
    <!-- Header -->
    <v-row justify="center" class="mb-8">
      <v-col cols="12" md="10" lg="8">
        <div class="text-center mb-6">
          <v-icon size="64" color="primary" class="mb-4">mdi-handshake</v-icon>
          <h1 class="text-h4 font-weight-bold mb-2">Service Provider Registration</h1>
          <p class="text-body-1 text-grey-darken-2">
            Join PPA's network of trusted service providers
          </p>
        </div>

        <!-- Progress Stepper -->
        <v-stepper
          v-model="currentStep"
          alt-labels
          elevation="0"
          class="registration-stepper"
        >
          <v-stepper-header>
            <template v-for="(step, index) in steps" :key="index">
              <v-stepper-item
                :value="index + 1"
                :complete="currentStep > index + 1"
                :color="currentStep > index + 1 ? 'success' : 'primary'"
              >
                <template v-slot:icon>
                  <v-icon v-if="currentStep > index + 1">mdi-check</v-icon>
                  <span v-else>{{ index + 1 }}</span>
                </template>
                <template v-slot:title>
                  <span class="text-caption">{{ step.title }}</span>
                </template>
              </v-stepper-item>
              <v-divider v-if="index < steps.length - 1" />
            </template>
          </v-stepper-header>

          <v-stepper-window>
            <!-- Step 1: Business Information -->
            <v-stepper-window-item :value="1">
              <v-form ref="form1" v-model="valid1" @submit.prevent="nextStep">
                <v-card flat class="mt-6">
                  <v-card-title class="text-h6 font-weight-bold">
                    <v-icon class="mr-2">mdi-office-building</v-icon>
                    Business Information
                  </v-card-title>
                  
                  <v-card-text>
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="formData.businessName"
                          label="Business Name *"
                          :rules="[rules.required]"
                          variant="outlined"
                          density="comfortable"
                          prepend-inner-icon="mdi-domain"
                        />
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="formData.ownerName"
                          label="Owner/Contact Person Name *"
                          :rules="[rules.required]"
                          variant="outlined"
                          density="comfortable"
                          prepend-inner-icon="mdi-account"
                        />
                      </v-col>
                      
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="formData.nicNumber"
                          label="NIC Number *"
                          :rules="[rules.required, rules.nic]"
                          variant="outlined"
                          density="comfortable"
                          prepend-inner-icon="mdi-card-account-details"
                          hint="Format: 123456789V or 123456789012"
                        />
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="formData.brNumber"
                          label="Business Registration Number"
                          variant="outlined"
                          density="comfortable"
                          prepend-inner-icon="mdi-file-certificate"
                          hint="Optional - if registered business"
                        />
                      </v-col>
                      
                      <v-col cols="12">
                        <v-text-field
                          v-model="formData.address"
                          label="Business Address *"
                          :rules="[rules.required]"
                          variant="outlined"
                          density="comfortable"
                          prepend-inner-icon="mdi-map-marker"
                        />
                      </v-col>
                      
                      <v-col cols="12" md="6">
                        <v-select
                          v-model="formData.district"
                          :items="districts"
                          label="District *"
                          :rules="[rules.required]"
                          variant="outlined"
                          density="comfortable"
                          prepend-inner-icon="mdi-map"
                        />
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="formData.phone"
                          label="Contact Number *"
                          :rules="[rules.required, rules.phone]"
                          variant="outlined"
                          density="comfortable"
                          prepend-inner-icon="mdi-phone"
                          hint="Format: 0771234567"
                        />
                      </v-col>
                      
                      <v-col cols="12">
                        <v-text-field
                          v-model="formData.email"
                          label="Email Address *"
                          :rules="[rules.required, rules.email]"
                          variant="outlined"
                          density="comfortable"
                          prepend-inner-icon="mdi-email"
                        />
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-form>
            </v-stepper-window-item>

            <!-- Step 2: Service Details -->
            <v-stepper-window-item :value="2">
              <v-form ref="form2" v-model="valid2" @submit.prevent="nextStep">
                <v-card flat class="mt-6">
                  <v-card-title class="text-h6 font-weight-bold">
                    <v-icon class="mr-2">mdi-briefcase</v-icon>
                    Service Details
                  </v-card-title>
                  
                  <v-card-text>
                    <v-row>
                      <v-col cols="12">
                        <v-radio-group
                          v-model="formData.category"
                          :rules="[rules.required]"
                        >
                          <template v-slot:label>
                            <div class="text-subtitle-1 font-weight-medium mb-2">
                              Select Service Category *
                            </div>
                          </template>
                          <v-radio value="supply_chain">
                            <template v-slot:label>
                              <div>
                                <span class="font-weight-medium">Supply Chain Services</span>
                                <div class="text-caption text-grey">
                                  Logistics, Export, E-commerce, Certification, Branding
                                </div>
                              </div>
                            </template>
                          </v-radio>
                          <v-radio value="support_services">
                            <template v-slot:label>
                              <div>
                                <span class="font-weight-medium">Support Services</span>
                                <div class="text-caption text-grey">
                                  Legal, Financial, HR, ICT, Insurance, Training
                                </div>
                              </div>
                            </template>
                          </v-radio>
                        </v-radio-group>
                      </v-col>

                      <v-col cols="12">
                        <v-select
                          v-model="formData.serviceType"
                          :items="getServiceTypes"
                          label="Specific Service Type *"
                          :rules="[rules.required]"
                          variant="outlined"
                          density="comfortable"
                          prepend-inner-icon="mdi-tools"
                          :disabled="!formData.category"
                        />
                      </v-col>

                      <v-col cols="12">
                        <v-textarea
                          v-model="formData.description"
                          label="Service Description *"
                          :rules="[rules.required, rules.description]"
                          variant="outlined"
                          rows="5"
                          counter
                          prepend-inner-icon="mdi-text"
                          hint="Describe your services in 100-150 words"
                          persistent-hint
                        />
                      </v-col>

                      <v-col cols="12">
                        <v-text-field
                          v-model="formData.experience"
                          label="Years of Experience"
                          type="number"
                          variant="outlined"
                          density="comfortable"
                          prepend-inner-icon="mdi-calendar-clock"
                          min="0"
                        />
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-form>
            </v-stepper-window-item>

            <!-- Step 3: Document Upload -->
            <v-stepper-window-item :value="3">
              <v-card flat class="mt-6">
                <v-card-title class="text-h6 font-weight-bold">
                  <v-icon class="mr-2">mdi-file-upload</v-icon>
                  Upload Documents
                </v-card-title>
                
                <v-card-text>
                  <v-row>
                    <v-col cols="12">
                      <v-alert type="info" variant="tonal" class="mb-4">
                        Upload clear copies of your documents. Supported formats: PDF, JPG, PNG (Max 5MB each)
                      </v-alert>
                    </v-col>

                    <!-- NIC Copy -->
                    <v-col cols="12" md="6">
                      <v-file-input
                        v-model="formData.documents.nicCopy"
                        label="NIC Copy *"
                        :rules="[rules.required, rules.fileSize]"
                        variant="outlined"
                        density="comfortable"
                        prepend-icon="mdi-card-account-details"
                        accept=".pdf,.jpg,.jpeg,.png"
                        show-size
                      />
                    </v-col>

                    <!-- BR Certificate -->
                    <v-col cols="12" md="6">
                      <v-file-input
                        v-model="formData.documents.brCertificate"
                        label="BR Certificate"
                        :rules="formData.brNumber ? [rules.required, rules.fileSize] : [rules.fileSize]"
                        variant="outlined"
                        density="comfortable"
                        prepend-icon="mdi-file-certificate"
                        accept=".pdf,.jpg,.jpeg,.png"
                        show-size
                        :hint="formData.brNumber ? 'Required since you provided BR number' : 'Optional'"
                      />
                    </v-col>

                    <!-- Professional Certificates -->
                    <v-col cols="12">
                      <v-file-input
                        v-model="formData.documents.certifications"
                        label="Professional Certificates"
                        variant="outlined"
                        density="comfortable"
                        prepend-icon="mdi-certificate"
                        accept=".pdf,.jpg,.jpeg,.png"
                        show-size
                        multiple
                        counter
                        hint="Optional - Upload any relevant certifications"
                        :rules="[rules.multiFileSize]"
                      />
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-stepper-window-item>

            <!-- Step 4: Agreement -->
            <v-stepper-window-item :value="4">
              <v-card flat class="mt-6">
                <v-card-title class="text-h6 font-weight-bold">
                  <v-icon class="mr-2">mdi-file-document-check</v-icon>
                  Service Provider Agreement
                </v-card-title>
                
                <v-card-text>
                  <!-- Summary Version -->
                  <v-alert type="info" variant="outlined" class="mb-4">
                    <v-alert-title class="text-h6">Key Terms Summary</v-alert-title>
                    <v-list density="compact" class="mt-3">
                      <v-list-item v-for="term in agreementSummary" :key="term">
                        <template v-slot:prepend>
                          <v-icon size="small">mdi-check</v-icon>
                        </template>
                        <v-list-item-title class="text-body-2">{{ term }}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-alert>

                  <!-- Full Agreement -->
                  <v-expansion-panels variant="accordion" class="mb-4">
                    <v-expansion-panel>
                      <v-expansion-panel-title>
                        <span class="font-weight-medium">
                          <v-icon class="mr-2">mdi-file-document</v-icon>
                          Read Full Agreement
                        </span>
                      </v-expansion-panel-title>
                      <v-expansion-panel-text>
                        <div class="agreement-text">
                          <h4>SERVICE PROVIDER AGREEMENT</h4>
                          <p class="mt-3"><strong>1. Purpose</strong></p>
                          <p>The Provider registers with PPA to offer services to planters and associates through the PPA virtual office platform.</p>
                          
                          <p class="mt-3"><strong>2. Independent Status</strong></p>
                          <p>Provider operates as an independent contractor. No employer-employee or partnership relationship arises between PPA and the Provider.</p>
                          
                          <p class="mt-3"><strong>3. Registration & Verification</strong></p>
                          <p>Provider must submit accurate information and supporting documents. PPA reserves the right to verify and approve/reject applications within 7 working days.</p>
                          
                          <p class="mt-3"><strong>4. Fees & Payments</strong></p>
                          <p>Registration is free. PPA may charge a commission (3-5%) on services performed through the platform. Payments between Provider and client remain the sole responsibility of the Provider.</p>
                          
                          <p class="mt-3"><strong>5. Service Quality & Liability</strong></p>
                          <p>Provider warrants that services will be delivered with reasonable skill, care, and professionalism. PPA shall not be liable for the quality, timeliness, or outcomes of services provided.</p>
                          
                          <p class="mt-3"><strong>6. Termination</strong></p>
                          <p>Either party may terminate this Agreement with 30 days' notice. PPA may suspend or terminate immediately in cases of fraud or breach.</p>
                          
                          <p class="mt-3"><strong>7. Governing Law</strong></p>
                          <p>This Agreement shall be governed by the laws of the Democratic Socialist Republic of Sri Lanka.</p>
                        </div>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                  </v-expansion-panels>

                  <!-- Agreement Checkbox -->
                  <v-checkbox
                    v-model="formData.agreementAccepted"
                    :rules="[rules.agreement]"
                    color="primary"
                  >
                    <template v-slot:label>
                      <span class="text-body-2">
                        I have read and agree to the 
                        <span class="font-weight-medium">Service Provider Agreement</span>
                        and understand that this electronic acceptance is valid under the 
                        Electronic Transactions Act No. 19 of 2006 of Sri Lanka *
                      </span>
                    </template>
                  </v-checkbox>
                </v-card-text>
              </v-card>
            </v-stepper-window-item>

            <!-- Step 5: Review & Submit -->
            <v-stepper-window-item :value="5">
              <v-card flat class="mt-6">
                <v-card-title class="text-h6 font-weight-bold">
                  <v-icon class="mr-2">mdi-check-all</v-icon>
                  Review Your Application
                </v-card-title>
                
                <v-card-text>
                  <v-alert type="success" variant="tonal" class="mb-4">
                    Please review your information before submitting
                  </v-alert>

                  <!-- Review Sections -->
                  <div class="review-section">
                    <h4 class="text-subtitle-1 font-weight-bold mb-3">Business Information</h4>
                    <v-row>
                      <v-col cols="12" md="6">
                        <div class="review-item">
                          <span class="text-caption text-grey">Business Name:</span>
                          <p class="font-weight-medium">{{ formData.businessName }}</p>
                        </div>
                      </v-col>
                      <v-col cols="12" md="6">
                        <div class="review-item">
                          <span class="text-caption text-grey">Owner Name:</span>
                          <p class="font-weight-medium">{{ formData.ownerName }}</p>
                        </div>
                      </v-col>
                      <v-col cols="12" md="6">
                        <div class="review-item">
                          <span class="text-caption text-grey">NIC Number:</span>
                          <p class="font-weight-medium">{{ formData.nicNumber }}</p>
                        </div>
                      </v-col>
                      <v-col cols="12" md="6">
                        <div class="review-item">
                          <span class="text-caption text-grey">Contact:</span>
                          <p class="font-weight-medium">{{ formData.phone }}</p>
                        </div>
                      </v-col>
                      <v-col cols="12">
                        <div class="review-item">
                          <span class="text-caption text-grey">Email:</span>
                          <p class="font-weight-medium">{{ formData.email }}</p>
                        </div>
                      </v-col>
                    </v-row>

                    <v-divider class="my-4" />

                    <h4 class="text-subtitle-1 font-weight-bold mb-3">Service Details</h4>
                    <v-row>
                      <v-col cols="12" md="6">
                        <div class="review-item">
                          <span class="text-caption text-grey">Category:</span>
                          <p class="font-weight-medium">
                            {{ formData.category === 'supply_chain' ? 'Supply Chain Services' : 'Support Services' }}
                          </p>
                        </div>
                      </v-col>
                      <v-col cols="12" md="6">
                        <div class="review-item">
                          <span class="text-caption text-grey">Service Type:</span>
                          <p class="font-weight-medium">{{ formData.serviceType }}</p>
                        </div>
                      </v-col>
                      <v-col cols="12">
                        <div class="review-item">
                          <span class="text-caption text-grey">Description:</span>
                          <p class="font-weight-medium">{{ formData.description }}</p>
                        </div>
                      </v-col>
                    </v-row>

                    <v-divider class="my-4" />

                    <h4 class="text-subtitle-1 font-weight-bold mb-3">Documents Uploaded</h4>
                    <v-chip-group>
                      <v-chip color="success" variant="outlined" prepend-icon="mdi-check">
                        NIC Copy
                      </v-chip>
                      <v-chip 
                        v-if="formData.documents.brCertificate" 
                        color="success" 
                        variant="outlined" 
                        prepend-icon="mdi-check"
                      >
                        BR Certificate
                      </v-chip>
                      <v-chip 
                        v-if="formData.documents.certifications?.length" 
                        color="success" 
                        variant="outlined" 
                        prepend-icon="mdi-check"
                      >
                        {{ formData.documents.certifications.length }} Certificate(s)
                      </v-chip>
                    </v-chip-group>
                  </div>
                </v-card-text>
              </v-card>
            </v-stepper-window-item>
          </v-stepper-window>
        </v-stepper>

        <!-- Navigation Buttons -->
        <v-card flat class="mt-6">
          <v-card-actions>
            <v-btn
              v-if="currentStep > 1"
              variant="outlined"
              @click="previousStep"
              prepend-icon="mdi-arrow-left"
            >
              Previous
            </v-btn>
            <v-spacer />
            <v-btn
              v-if="currentStep < 5"
              color="primary"
              variant="elevated"
              @click="nextStep"
              append-icon="mdi-arrow-right"
              :disabled="!canProceed"
            >
              Next
            </v-btn>
            <v-btn
              v-if="currentStep === 5"
              color="success"
              variant="elevated"
              @click="submitApplication"
              append-icon="mdi-check"
              :loading="submitting"
            >
              Submit Application
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Success Dialog -->
    <v-dialog v-model="successDialog" max-width="500" persistent>
      <v-card>
        <v-card-text class="text-center py-8">
          <v-icon size="80" color="success" class="mb-4">mdi-check-circle</v-icon>
          <h3 class="text-h5 font-weight-bold mb-3">Application Submitted Successfully!</h3>
          <p class="text-body-1 mb-4">
            Thank you for registering as a Service Provider with PPA. 
            Your application will be reviewed within 7 working days.
          </p>
          <p class="text-body-2 text-grey-darken-1">
            You will receive a confirmation email at<br>
            <strong>{{ formData.email }}</strong>
          </p>
          <p class="text-caption mt-4">
            Application Reference: <strong>{{ applicationRef }}</strong>
          </p>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" variant="elevated" @click="goToHome">
            Go to Home
          </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Form data
const currentStep = ref(1)
const valid1 = ref(false)
const valid2 = ref(false)
const submitting = ref(false)
const successDialog = ref(false)
const applicationRef = ref('')

const formData = ref({
  // Business Info
  businessName: '',
  ownerName: '',
  nicNumber: '',
  brNumber: '',
  address: '',
  district: '',
  phone: '',
  email: '',
  
  // Service Details
  category: '',
  serviceType: '',
  description: '',
  experience: '',
  
  // Documents
  documents: {
    nicCopy: null as File | null,
    brCertificate: null as File | null,
    certifications: [] as File[]
  },
  
  // Agreement
  agreementAccepted: false
})

// Steps configuration
const steps = [
  { title: 'Business Info' },
  { title: 'Service Details' },
  { title: 'Documents' },
  { title: 'Agreement' },
  { title: 'Review' }
]

// Districts of Sri Lanka
const districts = [
  'Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Matale', 'Nuwara Eliya',
  'Galle', 'Matara', 'Hambantota', 'Jaffna', 'Kilinochchi', 'Mannar',
  'Mullaitivu', 'Vavuniya', 'Puttalam', 'Kurunegala', 'Anuradhapura',
  'Polonnaruwa', 'Badulla', 'Monaragala', 'Ratnapura', 'Kegalle',
  'Batticaloa', 'Ampara', 'Trincomalee'
]

// Service types based on category
const supplyChainServices = [
  'Logistics & Cold Chain Operations',
  'Export Consultancy',
  'Certification Services (ISO, HACCP, Organic)',
  'E-commerce Platform Services',
  'International Trading',
  'Branding & Packaging'
]

const supportServices = [
  'Legal Advisory',
  'Financial & Investment Consulting',
  'Human Resource Management',
  'ICT & AI Solutions',
  'Insurance Services',
  'Training & Development',
  'Audit & Compliance',
  'Community Welfare'
]

const getServiceTypes = computed(() => {
  if (formData.value.category === 'supply_chain') {
    return supplyChainServices
  } else if (formData.value.category === 'support_services') {
    return supportServices
  }
  return []
})

// Agreement summary points
const agreementSummary = [
  'You operate as an independent service provider, not an employee of PPA',
  'PPA will verify your application within 7 working days',
  'Registration is free, small commission may apply on successful transactions',
  'You are responsible for service quality and client relationships',
  'PPA acts as a digital connector, not a guarantor of services',
  'Either party can terminate with 30 days notice',
  'Agreement is governed by Sri Lankan law'
]

// Validation rules
const rules = {
  required: (v: any) => !!v || 'This field is required',
  email: (v: string) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return pattern.test(v) || 'Invalid email address'
  },
  nic: (v: string) => {
    const pattern = /^([0-9]{9}[vVxX]|[0-9]{12})$/
    return pattern.test(v) || 'Invalid NIC format (123456789V or 123456789012)'
  },
  phone: (v: string) => {
    const pattern = /^(?:\+94|0)?[0-9]{9}$/
    return pattern.test(v) || 'Invalid phone number (0771234567)'
  },
  description: (v: string) => {
    if (!v) return 'Description is required'
    const words = v.trim().split(/\s+/).length
    if (words < 100) return `Too short (${words}/100 words minimum)`
    if (words > 150) return `Too long (${words}/150 words maximum)`
    return true
  },
  fileSize: (v: File | null) => {
    if (!v) return true
    return v.size < 5242880 || 'File size must be less than 5MB'
  },
  multiFileSize: (v: File[]) => {
    if (!v || v.length === 0) return true
    const invalid = v.some(file => file.size >= 5242880)
    return !invalid || 'Each file must be less than 5MB'
  },
  agreement: (v: boolean) => v || 'You must accept the agreement to proceed'
}

// Check if can proceed to next step
const canProceed = computed(() => {
  switch (currentStep.value) {
    case 1:
      return valid1.value
    case 2:
      return valid2.value && formData.value.category && formData.value.serviceType
    case 3:
      return !!formData.value.documents.nicCopy
    case 4:
      return formData.value.agreementAccepted
    default:
      return true
  }
})

// Navigation functions
const nextStep = () => {
  if (currentStep.value < 5 && canProceed.value) {
    currentStep.value++
  }
}

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

// Generate application reference
const generateRef = () => {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
  return `SP${year}${month}${random}`
}

// Submit application
const submitApplication = async () => {
  submitting.value = true
  
  // Simulate API call
  setTimeout(() => {
    applicationRef.value = generateRef()
    submitting.value = false
    successDialog.value = true
  }, 2000)
}

const goToHome = () => {
  router.push('/')
}
</script>

<style scoped>
.registration-stepper {
  background: transparent;
}

.agreement-text {
  max-height: 400px;
  overflow-y: auto;
  padding: 16px;
  background: #f5f5f5;
  border-radius: 8px;
}

.review-section {
  padding: 16px;
  background: #fafafa;
  border-radius: 8px;
}

.review-item {
  margin-bottom: 12px;
}

.review-item p {
  margin: 4px 0;
}

/* Custom scrollbar for agreement text */
.agreement-text::-webkit-scrollbar {
  width: 8px;
}

.agreement-text::-webkit-scrollbar-track {
  background: #e0e0e0;
  border-radius: 4px;
}

.agreement-text::-webkit-scrollbar-thumb {
  background: #9e9e9e;
  border-radius: 4px;
}

.agreement-text::-webkit-scrollbar-thumb:hover {
  background: #757575;
}
</style>