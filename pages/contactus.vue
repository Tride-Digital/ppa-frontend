<template>
  <v-container fluid class="contact-page pa-0">
    <!-- Hero Section -->
    <v-container class="py-12">
      <v-row justify="center">
        <v-col cols="12"  class="text-center">
          <h2 class="contact-title">Contact Us</h2>
          <p class="contact-subtitle">
            Have a question or want to work with us? We'd love to hear from you. 
            Send us a message and we'll respond as soon as possible.
          </p>
        </v-col>
      </v-row>
    </v-container>

    <!-- Main Content Section -->
    <v-container class="py-4">
      <v-row>

        <!-- Contact Information -->
        <v-col cols="12" md="5" lg="5">
          <v-card class="contact-info-card h-100" elevation="3">
            <v-card-title class="text-h5 font-weight-bold pa-6 pb-4">
              Contact Information
            </v-card-title>
            <v-card-text class="px-6 pb-6">
              <!-- Office Address -->
              <div class="contact-info-item mb-6">
                <div class="d-flex align-start">
                  <v-icon color="primary" size="28" class="mr-4 mt-1">mdi-map-marker</v-icon>
                  <div>
                    <h3 class="text-subtitle-1 font-weight-bold mb-2">Office Address</h3>
                    <p class="text-body-2 text-medium-emphasis mb-0">
                      No. 28, U. E. Perera Mawatha<br>
                      Rajagiriya. 10107<br>
                      Sri Lanka
                    </p>
                  </div>
                </div>
              </div>

              <!-- Phone Number -->
              <div class="contact-info-item mb-6">
                <div class="d-flex align-start">
                  <v-icon color="primary" size="28" class="mr-4 mt-1">mdi-phone</v-icon>
                  <div>
                    <h3 class="text-subtitle-1 font-weight-bold mb-2">Phone</h3>
                    <p class="text-body-2 text-medium-emphasis mb-0">
                      <a href="tel:+94772376343" class="contact-link">+94 77 237 6343</a>
                    </p>
                  </div>
                </div>
              </div>

              <!-- Email -->
              <div class="contact-info-item mb-6">
                <div class="d-flex align-start">
                  <v-icon color="primary" size="28" class="mr-4 mt-1">mdi-email</v-icon>
                  <div>
                    <h3 class="text-subtitle-1 font-weight-bold mb-2">Email</h3>
                    <p class="text-body-2 text-medium-emphasis mb-0">
                      <a href="mailto:info@planters.lk" class="contact-link">info@planters.lk</a>
                    </p>
                  </div>
                </div>
              </div>

              <!-- Business Hours -->
              <div class="contact-info-item mb-6">
                <div class="d-flex align-start">
                  <v-icon color="primary" size="28" class="mr-4 mt-1">mdi-clock-outline</v-icon>
                  <div>
                    <h3 class="text-subtitle-1 font-weight-bold mb-2">Business Hours</h3>
                    <p class="text-body-2 text-medium-emphasis mb-1">
                      Monday - Friday: 9:00 AM - 6:00 PM
                    </p>
                    <p class="text-body-2 text-medium-emphasis mb-1">
                      Saturday: 9:00 AM - 1:00 PM
                    </p>
                    <p class="text-body-2 text-medium-emphasis mb-0">
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              <!-- Social Media -->
              <div class="contact-info-item">
                <div class="d-flex align-start">
                  <v-icon color="primary" size="28" class="mr-4 mt-1">mdi-share-variant</v-icon>
                  <div>
                    <h3 class="text-subtitle-1 font-weight-bold mb-3">Follow Us</h3>
                    <div class="d-flex gap-4">
                      <v-btn 
                        icon 
                        variant="outlined" 
                        size="small"
                        href="https://www.facebook.com/share/1BZSphvAiV/?mibextid=wwXIfr" 
                        target="_blank"
                        aria-label="Facebook"
                      >
                        <v-icon>mdi-facebook</v-icon>
                      </v-btn> &nbsp;
                      <v-btn 
                        icon 
                        variant="outlined" 
                        size="small"
                        href="https://twitter.com" 
                        target="_blank"
                        aria-label="Twitter"
                      >
                        <v-icon>mdi-twitter</v-icon>
                      </v-btn> &nbsp;
                      <v-btn 
                        icon 
                        variant="outlined" 
                        size="small"
                        href="https://linkedin.com" 
                        target="_blank"
                        aria-label="LinkedIn"
                      >
                        <v-icon>mdi-linkedin</v-icon>
                      </v-btn> &nbsp;
                      <v-btn 
                        icon 
                        variant="outlined" 
                        size="small"
                        href="https://instagram.com" 
                        target="_blank"
                        aria-label="Instagram"
                      >
                        <v-icon>mdi-instagram</v-icon>
                      </v-btn> 
                    </div>
                  </div>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Contact Form -->
        <v-col cols="12" md="7" lg="7">
          <v-card class="contact-card h-100" elevation="3">
            <v-card-title class="text-h5 font-weight-bold pa-6 pb-2">
              Get In Touch
            </v-card-title>
            <v-card-subtitle class="px-6 pb-4">
              Fill out the form below and we'll get back to you as soon as possible.
            </v-card-subtitle>
            <v-card-text class="px-6 pb-6">
              <v-form ref="form" v-model="valid" @submit.prevent="submitForm">
                <v-text-field 
                  v-model="formData.fullName" 
                  label="Full Name" 
                  :rules="nameRules" 
                  required 
                  prepend-inner-icon="mdi-account" 
                  variant="outlined"
                  class="mb-3"
                />
                <v-text-field 
                  v-model="formData.phoneNumber" 
                  label="Phone Number" 
                  :rules="phoneRules" 
                  required 
                  prepend-inner-icon="mdi-phone" 
                  variant="outlined"
                  class="mb-3"
                />
                <v-text-field 
                  v-model="formData.email" 
                  label="Email Address (Optional)" 
                  :rules="emailRules" 
                  prepend-inner-icon="mdi-email" 
                  variant="outlined"
                  class="mb-3"
                />
                <v-textarea 
                  v-model="formData.message" 
                  label="Message" 
                  :rules="messageRules" 
                  required 
                  prepend-inner-icon="mdi-message-text" 
                  rows="5" 
                  variant="outlined"
                  class="mb-4"
                />
                <v-btn 
                  type="submit" 
                  color="primary" 
                  size="large" 
                  block 
                  :loading="loading" 
                  :disabled="!valid" 
                  class="submit-btn"
                >
                  <v-icon class="mr-2">mdi-send</v-icon>
                  Submit Message
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>

        
      </v-row>
    </v-container>

    <!-- Map Section -->
    <v-container class="map-section py-8 mt-2">
      <v-row justify="center" class="mb-6">
        <v-col cols="12" class="text-center">
          <p class="map-subtitle">
            Visit our office or view our location on the map below
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card class="map-card" elevation="4">
            <div class="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3960.798654807944!2d79.88838287501456!3d6.915483193085832!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNsKwNTQnNTUuNyJOIDc5wrA1MycyNi4xIkU!5e0!3m2!1sen!2slk!4v1729612345678!5m2!1sen!2slk"
                width="100%"
                height="500"
                style="border:0;"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                title="Office Location Map"
              ></iframe>
            </div>
            <v-card-text class="pa-6 d-flex align-center justify-center">
              <v-icon color="primary" size="24" class="mr-2">mdi-map-marker</v-icon>
              <span class="text-body-1 font-weight-medium">
                No. 28, U. E. Perera Mawatha, Rajagiriya. 10107
              </span>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Snackbar -->
    <v-snackbar 
      v-model="snackbar" 
      :color="snackbarColor" 
      :timeout="3000" 
      location="top"
    >
      {{ snackbarText }}
      <template v-slot:actions>
        <v-btn variant="text" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useContactUs } from '~/composables/useContactUs'

const form = ref(null)
const valid = ref(false)
const snackbar = ref(false)
const snackbarText = ref('')
const snackbarColor = ref('success')

const formData = ref({
  fullName: '',
  phoneNumber: '',
  email: '',
  message: ''
})

const nameRules = [
  (v: string) => !!v || 'Full name is required',
  (v: string) => (v && v.length >= 2) || 'Name must be at least 2 characters',
]

const phoneRules = [
  (v: string) => !!v || 'Phone number is required',
  (v: string) => /^[\d\s\-\+\(\)]+$/.test(v) || 'Please enter a valid phone number',
]

const emailRules = [
  (v: string) => !v || /.+@.+\..+/.test(v) || 'Email must be valid',
]

const messageRules = [
  (v: string) => !!v || 'Message is required',
  (v: string) => (v && v.length >= 10) || 'Message must be at least 10 characters',
]
const { loading, sendContactUs } = useContactUs()

const submitForm = async () => {
  const { valid: isValid } = await form.value.validate()
  if (isValid) {
    try {
      await sendContactUs(formData.value)
      snackbarText.value = 'Message sent successfully! We\'ll get back to you soon.'
      snackbarColor.value = 'success'
      snackbar.value = true
      form.value.reset()
      formData.value = {
        fullName: '',
        phoneNumber: '',
        email: '',
        message: ''
      }
    } catch (err) {
      snackbarText.value = 'Failed to send message. Please try again.'
      snackbarColor.value = 'error'
      snackbar.value = true
    }
  }
}
</script>

<style scoped>
.contact-page {
  background-color: rgb(var(--v-theme-surface));
}

/* Heading and Subheading styles matching directors page */
.contact-title {
  font-size: 2.2rem;
  font-weight: 600;
  color: rgb(var(--v-theme-contact-title));
  margin-bottom: 0.5rem;
}

.contact-subtitle {
  font-size: 1.1rem;
  color: rgb(var(--v-theme-section-subtitle));
  margin-bottom: 2rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

/* Map Section Styles */
.map-title {
  font-size: 2.2rem;
  font-weight: 600;
  color: rgb(var(--v-theme-contact-title));
  margin-bottom: 0.5rem;
}

.map-subtitle {
  font-size: 1.1rem;
  color: rgb(var(--v-theme-section-subtitle));
  margin-bottom: 0;
}

.map-card {
  border-radius: 12px;
  overflow: hidden;
}

.contact-card,
.contact-info-card {
  border-radius: 12px;
  overflow: hidden;
}

.contact-info-item {
  position: relative;
}

.contact-link {
  color: rgb(var(--v-theme-primary));
  text-decoration: none;
  transition: opacity 0.2s;
}

.contact-link:hover {
  opacity: 0.8;
  text-decoration: underline;
}

.submit-btn {
  font-weight: 600;
  letter-spacing: 0.5px;
  margin-top: 8px;
}

.map-container {
  width: 100%;
  position: relative;
  overflow: hidden;
}

.map-container iframe {
  display: block;
  width: 100%;
}

.map-section {
  background-color: rgb(var(--v-theme-surface));
}

:deep(.v-field__prepend-inner) {
  padding-top: 8px;
}

/* Responsive adjustments */
@media (max-width: 960px) {
  .contact-info-card {
    margin-top: 24px;
  }
  
  .map-container iframe {
    height: 400px;
  }
}

@media (max-width: 768px) {
  .contact-title,
  .map-title {
    font-size: 1.8rem;
  }
  .contact-subtitle,
  .map-subtitle {
    font-size: 1rem;
  }
  
  .map-container iframe {
    height: 350px;
  }
}

@media (max-width: 480px) {
  .contact-title,
  .map-title {
    font-size: 1.5rem;
  }
  
  .map-container iframe {
    height: 300px;
  }
}
</style>