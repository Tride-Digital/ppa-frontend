import { ref, computed } from 'vue'

export const useServices = () => {
  const config = useRuntimeConfig()
  const services = ref([])
  const loading = ref(false)
  const error = ref(null)
  const fetchAllServices = async () => {
    loading.value = true
    error.value = null
    try {
      const data = await $fetch(`${config.public.backendUrl}/service_list/all`, {
        params: {
          skip: 0,
          limit: 100
        }
      })
      services.value = data
      return data
    } catch (err) {
      error.value = err
      console.error('Error fetching services:', err)
      return []
    } finally {
      loading.value = false
    }
  }
  const fetchServiceById = async (id) => {
    try {
      const data = await $fetch(`${config.public.backendUrl}/service_list/${id}`)
      return data
    } catch (err) {
      console.error('Error fetching service:', err)
      return null
    }
  }
  const transformServiceCategories = (apiData) => {
    return apiData.map(category => ({
      icon: category.icon_font,
      label: category.service_category,
      subItems: category.services.map(service => {
        const transformedService = {
          id: service.id,
          name: service.subcategory,
          image: service.img_url,
          shortDescription: service.short_description,
          icon: category.icon_font
        }
        return transformedService
      })
    }))
  }
  const transformSingleService = (apiData) => {
    if (!apiData) return null
    return {
      id: apiData.id,
      name: apiData.subcategory,
      category: apiData.service_category,
      image: apiData.img_url,
      icon: apiData.icon_font,
      description: apiData.description?.description,
      shortDescription: apiData.short_description,
      duration: apiData.description?.duration,
      availability: apiData.description?.availability,
      coverage: apiData.description?.coverage,
      keyFeatures: apiData.description?.key_features?.map(feature => ({
        title: feature.feature_name,
        description: feature.feature_description
      })) || [],
      supportDocUrl: apiData.description?.support_doc_url
    }
  }
  const getServiceIdByName = (serviceName) => {
    for (const category of services.value) {
      const service = category.services.find(s => s.subcategory === serviceName)
      if (service) return service.id
    }
    return null
  }
  return {
    services,
    loading,
    error,
    fetchAllServices,
    fetchServiceById,
    transformServiceCategories,
    transformSingleService,
    getServiceIdByName
  }
}