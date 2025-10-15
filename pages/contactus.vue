<template>
  <v-container class="py-12">
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card class="contact-card" elevation="3">
          <v-card-title class="text-h4 font-weight-bold pa-8 pb-4">
            Get In Touch
          </v-card-title>
          <v-card-subtitle class="px-8 pb-6 text-subtitle-1">
            Fill out the form below and we'll get back to you as soon as possible.
          </v-card-subtitle>
          <v-card-text class="px-8 pb-8">
            <v-form ref="form" v-model="valid" @submit.prevent="submitForm">
              <v-text-field v-model="formData.fullName" label="Full Name" :rules="nameRules" required prepend-inner-icon="mdi-account" class="mb-4"/>
              <v-text-field v-model="formData.phoneNumber" label="Phone Number" :rules="phoneRules" required prepend-inner-icon="mdi-phone" class="mb-4"/>
              <v-text-field v-model="formData.email" label="Email Address (Optional)" :rules="emailRules" prepend-inner-icon="mdi-email" class="mb-4"/>
              <v-textarea v-model="formData.message" label="Message" :rules="messageRules" required prepend-inner-icon="mdi-message-text" rows="5" class="mb-4"/>
              <v-btn type="submit" color="primary" size="large" block :loading="loading" :disabled="!valid" class="submit-btn">
                <v-icon left class="mr-2">mdi-send</v-icon>
                Submit
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
        <v-snackbar v-model="snackbar" :color="snackbarColor" :timeout="3000" location="top">
          {{ snackbarText }}
          <template v-slot:actions>
            <v-btn variant="text" @click="snackbar = false">Close</v-btn>
          </template>
        </v-snackbar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
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
  v => !!v || 'Full name is required',
  v => (v && v.length >= 2) || 'Name must be at least 2 characters',
]

const phoneRules = [
  v => !!v || 'Phone number is required',
  v => /^[\d\s\-\+\(\)]+$/.test(v) || 'Please enter a valid phone number',
]

const emailRules = [
  v => !v || /.+@.+\..+/.test(v) || 'Email must be valid',
]

const messageRules = [
  v => !!v || 'Message is required',
  v => (v && v.length >= 10) || 'Message must be at least 10 characters',
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
.contact-card {
  border-radius: 12px;
  overflow: hidden;
}
.v-card-title {
  color: rgb(var(--v-theme-contact-title));
}
.v-card-subtitle {
  color: rgb(var(--v-theme-section-subtitle));
  opacity: 0.9;
}
.submit-btn {
  font-weight: 600;
  letter-spacing: 0.5px;
  margin-top: 8px;
}
:deep(.v-field__prepend-inner) {
  padding-top: 8px;
}
</style>