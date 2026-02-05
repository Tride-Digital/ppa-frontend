import { ref } from 'vue'

type ContactUsPayload = {
  fullName: string
  phoneNumber: string
  email: string
  message: string
}

export function useContactUs() {
  const config = useRuntimeConfig()
  const baseUrl = config.public.backendUrl
  const loading = ref(false)
  const error = ref<unknown | null>(null)
  const response = ref(null)

  const $fetch = async (url: string, options: any = {}) => {
    try {
      const res = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      })
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
      return await res.json()
    } catch (err) {
      throw err
    }
  }

  const sendContactUs = async (payload: ContactUsPayload) => {
    loading.value = true
    error.value = null
    response.value = null
    try {
      const res = await $fetch(`${baseUrl}/contact_us/`, {
        method: 'POST',
        body: JSON.stringify({
          name: payload.fullName,
          phone_number: payload.phoneNumber,
          email: payload.email,
          message: payload.message,
        }),
      })
      response.value = res
      return res
    } catch (err) {
      error.value = err
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    response,
    sendContactUs,
  }
}