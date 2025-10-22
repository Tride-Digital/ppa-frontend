<template>
  <div class="checkout-page">
    <v-container class="py-8">
      <v-row justify="center">
        <v-col cols="12" lg="8">
          <v-card class="checkout-card" elevation="4">
            <v-card-title class="checkout-header">
              <v-icon class="mr-3" size="32">mdi-clipboard-check</v-icon>
              <span class="checkout-title">Checkout</span>
            </v-card-title>
            <v-card-text class="checkout-content">
              <div class="services-summary mb-6">
                <h3 class="summary-title mb-4">
                  <v-icon class="mr-2">mdi-cart</v-icon>
                  Selected Services ({{ cartItems.length }})
                </h3>
                <v-list class="services-list">
                  <v-list-item v-for="(item, index) in cartItems" :key="index" class="service-item">
                    <template v-slot:prepend>
                      <v-avatar size="40" class="service-avatar">
                        <v-icon size="20" color="section-title">mdi-leaf</v-icon>
                      </v-avatar>
                    </template>
                    <v-list-item-title class="service-name">{{ item.name }}</v-list-item-title>
                    <v-list-item-subtitle class="service-category">{{ item.category }}</v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </div>
              <v-divider class="mb-6"></v-divider>
              <div class="checkout-form">
                <h3 class="form-title mb-4">
                  <v-icon class="mr-2">mdi-account-edit</v-icon>
                  Contact Information
                </h3>
                <v-form ref="checkoutForm" v-model="formValid" @submit.prevent="submitOrder">
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-text-field v-model="form.name" label="Full Name" :rules="nameRules" required variant="outlined" prepend-inner-icon="mdi-account" class="form-field"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field v-model="form.email" label="Email Address" :rules="emailRules" required variant="outlined" prepend-inner-icon="mdi-email" class="form-field"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field v-model="form.phone" label="Phone Number" :rules="phoneRules" required variant="outlined" prepend-inner-icon="mdi-phone" class="form-field"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-select 
                        v-model="form.district" 
                        :items="districts" 
                        item-title="district_en" 
                        item-value="district_en" 
                        label="District" 
                        :rules="districtRules" 
                        required 
                        variant="outlined" 
                        prepend-inner-icon="mdi-map-marker" 
                        class="form-field" 
                        :loading="loadingDistricts"
                      ></v-select>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field 
                        v-model="form.nic" 
                        label="NIC Number" 
                        :rules="nicRules" 
                        required 
                        variant="outlined" 
                        prepend-inner-icon="mdi-card-account-details" 
                        class="form-field"
                        persistent-hint
                        @input="formatNIC"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-textarea 
                        v-model="form.comment" 
                        label="Additional Comments (Optional)" 
                        variant="outlined" 
                        prepend-inner-icon="mdi-comment-text" 
                        rows="4" 
                        class="form-field" 
                        placeholder="Any specific requirements or comments about your selected services..." 
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-form>
              </div>
            </v-card-text>
            <v-card-actions class="checkout-actions">
              <v-btn variant="outlined" @click="goBack" class="back-btn" size="large">
                <v-icon left>mdi-arrow-left</v-icon>
                Back to Services
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn color="primary" variant="flat" size="large" :disabled="!formValid || loading" :loading="loading" @click="submitOrder" class="submit-btn">
                <v-icon left>mdi-send</v-icon>
                Submit Request
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Success Dialog -->
    <v-dialog v-model="showSuccessDialog" max-width="500px" persistent>
      <v-card class="success-card">
        <v-card-text class="text-center py-8">
          <v-icon size="64" color="success" class="mb-4">mdi-check-circle</v-icon>
          <h2 class="text-h5 mb-4">Request Submitted Successfully!</h2>
          <p class="text-body-1 mb-4">
            Thank you for your interest in our services. We have received your request and will contact you soon.
          </p>
          <p class="text-body-2 text-medium-emphasis">
            Reference ID: #{{ referenceId }}
          </p>
          <v-chip v-if="emailSent" color="success" size="small" class="mt-2">
            <v-icon left size="small">mdi-email-check</v-icon>
            Confirmation email sent
          </v-chip>
        </v-card-text>
        <v-card-actions class="justify-center pb-6">
          <v-btn color="primary" variant="flat" @click="goToHome" size="large">
            <v-icon left>mdi-home</v-icon>
            Back to Home
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Error Dialog -->
    <v-dialog v-model="showErrorDialog" max-width="500px">
      <v-card class="error-card">
        <v-card-text class="text-center py-8">
          <v-icon size="64" color="error" class="mb-4">mdi-alert-circle</v-icon>
          <h2 class="text-h5 mb-4">Submission Failed</h2>
          <p class="text-body-1 mb-4">
            {{ errorMessage }}
          </p>
        </v-card-text>
        <v-card-actions class="justify-center pb-6">
          <v-btn color="primary" variant="flat" @click="showErrorDialog = false" size="large">
            Try Again
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCart } from '~/composables/useCart'
const config = useRuntimeConfig();
const router = useRouter()
const { cartItems, clearCart } = useCart()
const form = ref({
  name: '',
  email: '',
  phone: '',
  district: '',
  nic: '',
  comment: ''
})

// State variables
const formValid = ref(false)
const loading = ref(false)
const loadingDistricts = ref(false)
const showSuccessDialog = ref(false)
const showErrorDialog = ref(false)
const referenceId = ref('')
const emailSent = ref(false)
const errorMessage = ref('')
const districts = ref([])

const nameRules = [
  v => !!v || 'Name is required',
  v => (v && v.length >= 2) || 'Name must be at least 2 characters'
]
const emailRules = [
  v => !!v || 'Email is required',
  v => /.+@.+\..+/.test(v) || 'Email must be valid'
]
const phoneRules = [
  v => !!v || 'Phone number is required',
  v => (v && v.length >= 10) || 'Phone number must be at least 10 digits'
]
const districtRules = [
  v => !!v || 'District is required'
]

const nicRules = [
  v => !!v || 'NIC is required',
  v => {
    if (!v) return 'NIC is required'
    
    const nic = v.toString().trim().toUpperCase()
    
    // Old format: 9 digits + V or X
    const oldFormat = /^\d{9}[VX]$/
    
    // New format: 12 digits
    const newFormat = /^\d{12}$/
    
    if (oldFormat.test(nic) || newFormat.test(nic)) {
      return true
    }
    
    return 'Invalid NIC format'
  }
]

// Format NIC input
const formatNIC = (event) => {
  // Auto-uppercase the input
  form.value.nic = form.value.nic.toUpperCase()
}

// Fetch districts
const fetchDistricts = async () => {
  loadingDistricts.value = true
  try {
    const response = await $fetch(`${config.public.backendUrl}/gn_division_list/all_district`)
    districts.value = response
  } catch (error) {
    console.error('Error fetching districts:', error)
    districts.value = []
  } finally {
    loadingDistricts.value = false
  }
}

onMounted(async () => {
  if (cartItems.value.length === 0) {
    router.push('/services')
    return
  }
  await fetchDistricts()
})

const submitOrder = async () => {
  if (!formValid.value) return
  loading.value = true
  errorMessage.value = ''
  
  try {
    const selectedDistrictObj = districts.value.find(d => d.district_en === form.value.district) || null
    const requestData = {
      name: form.value.name,
      email: form.value.email,
      phone: form.value.phone,
      district: selectedDistrictObj ? selectedDistrictObj.district_en : form.value.district,
      district_json: selectedDistrictObj ? { district_code: selectedDistrictObj.district_code } : null,
      nic: form.value.nic.toUpperCase().trim(),
      comment: form.value.comment || '',
      services: cartItems.value.map(item => ({
        id: item.id,
        name: item.name,
        category: item.category
      }))
    }
    const response = await $fetch(`${config.public.backendUrl}/service-requests/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: requestData
    })
    if (response.success) {
      referenceId.value = response.reference_id
      emailSent.value = response.email_sent || false
      clearCart()
      showSuccessDialog.value = true
    } else {
      throw new Error(response.message || 'Failed to submit request')
    }

  } catch (error) {
    console.error('Error submitting order:', error)
    if (error.data && error.data.detail) {
      errorMessage.value = error.data.detail
    } else if (error.data && error.data.message) {
      errorMessage.value = error.data.message
    } else if (error.message) {
      errorMessage.value = error.message
    } else {
      errorMessage.value = 'An unexpected error occurred. Please try again.'
    }
    
    showErrorDialog.value = true
  } finally {
    loading.value = false
  }
}
const goBack = () => {
  router.push('/services')
}
const goToHome = () => {
  showSuccessDialog.value = false
  router.push('/')
}
useHead({
  title: 'Checkout - PPA Services',
  meta: [
    { name: 'description', content: 'Complete your service request with PPA - Professional plantation services in Sri Lanka' }
  ]
})
</script>

<style scoped>
.checkout-page {
  background-color: rgb(var(--v-theme-background));
  min-height: 100vh;
}
.checkout-card {
  border-radius: 16px !important;
  overflow: hidden;
}
.checkout-header {
  background: rgb(var(--v-theme-primary-darken-1));
  color: white;
  padding: 24px;
}
.checkout-title {
  font-size: 1.5rem;
  font-weight: 600;
}
.checkout-content {
  padding: 32px;
}
.services-summary {
  background: rgba(var(--v-theme-primary-rgb), 0.05);
  border-radius: 12px;
  padding: 20px;
}
.summary-title {
  color: rgb(var(--v-theme-section-title));
  font-weight: 600;
}
.services-list {
  background: transparent;
}
.service-item {
  background: rgba(var(--v-theme-surface-rgb), 0.8);
  border-radius: 8px;
  margin-bottom: 8px;
  border: 1px solid rgba(var(--v-theme-primary-rgb), 0.1);
}
.service-avatar {
  background: rgba(var(--v-theme-primary-rgb), 0.1) !important;
}
.service-name {
  font-weight: 600;
  font-size: 0.9rem;
}
.service-category {
  color: rgb(var(--v-theme-primary-darken-1));
  font-weight: 500;
  font-size: 0.8rem;
}
.form-title {
  color: rgb(var(--v-theme-section-title));
  font-weight: 600;
}
.form-field {
  margin-bottom: 8px;
}
.checkout-actions {
  padding: 24px 32px;
  background: rgba(var(--v-theme-surface-variant-rgb), 0.3);
}
.back-btn, .submit-btn {
  text-transform: none;
  font-weight: 600;
  border-radius: 8px;
}
.success-card, .error-card {
  border-radius: 16px !important;
}
@media (max-width: 768px) {
  .checkout-content {
    padding: 20px;
  }
  .checkout-actions {
    padding: 20px;
    flex-direction: column;
    gap: 12px;
  }
  .back-btn, .submit-btn {
    width: 100%;
  }
}
</style>