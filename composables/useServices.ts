import { ref } from 'vue'
import { useRuntimeConfig } from '#app'
import type { DirectorListDetail, DirectorListDescription } from '~/types/director'

export interface DirectorListServiceDto {
  id: number
  img_url?: string | null
  name?: string | null
  subcategory?: string | null
  short_description?: string | null
  objective?: string | null
  description?: DirectorListDescription | null
}

export interface DirectorListCategoryDto {
  service_category_id?: number
  service_category: string
  icon_font?: string | null
  services?: DirectorListServiceDto[]
}

export interface TransformedServiceCard {
  id: number
  name: string
  image?: string | null
  shortDescription: string
  icon?: string
}

export interface ServiceCategoryNav {
  icon: string
  label: string
  subItems: TransformedServiceCard[]
}

export interface TransformedSingleService {
  id: number
  name: string
  category?: string
  image?: string | null
  icon?: string | null
  description: string | null
  shortDescription: string | null
  duration?: string | null
  availability?: string | null
  coverage?: string | null
  keyFeatures: { title: string; description: string }[]
  supportDocUrl?: string | null
}

export const useServices = () => {
  const config = useRuntimeConfig()

  const services = ref<DirectorListCategoryDto[]>([])
  const loading = ref(false)
  const error = ref<unknown | null>(null)

  
  // Fetch all services from director_list.
  const fetchAllServices = async (): Promise<DirectorListCategoryDto[]> => {
    loading.value = true
    error.value = null
    try {
      const res = await $fetch<
        DirectorListCategoryDto[] | { items: DirectorListCategoryDto[] }
      >(`${config.public.backendUrl}/director_list/admin/all`, {
        params: {
          skip: 0,
          limit: 1000,
        },
      })

      const items = Array.isArray((res as any)?.items)
        ? (res as any).items
        : (res as DirectorListCategoryDto[])

      services.value = items || []
      return services.value
    } catch (err: any) {
      error.value = err
      console.error('Error fetching services:', err)
      services.value = []
      return []
    } finally {
      loading.value = false
    }
  }

  // Fetch single service details from director_list by ID
  const fetchServiceById = async (
    id: number | string
  ): Promise<DirectorListDetail | null> => {
    try {
      const data = await $fetch<DirectorListDetail>(
        `${config.public.backendUrl}/director_list/${id}`
      )
      return data
    } catch (err) {
      console.error('Error fetching service:', err)
      return null
    }
  }

  const transformServiceCategories = (
    apiData: DirectorListCategoryDto[]
  ): ServiceCategoryNav[] => {
    if (!Array.isArray(apiData)) return []

    return apiData.map((category) => ({
      icon: category.icon_font || 'mdi-account-tie-outline',
      label: category.service_category,
      subItems: (category.services || []).map((service) => {
        const transformedService: TransformedServiceCard = {
          id: service.id,
          name: (service.name ?? service.subcategory ?? '').toString(),
          image: service.img_url ?? null,
          shortDescription:
            service.objective ?? service.short_description ?? '',
          icon: category.icon_font || 'mdi-account-tie-outline',
        }
        return transformedService
      }),
    }))
  }

  // Transform a single service object for the detail page.

  const transformSingleService = (
    apiData: any
  ): TransformedSingleService | null => {
    if (!apiData) return null
    if (apiData.subcategory) {
      return {
        id: apiData.id,
        name: apiData.subcategory,
        category: apiData.service_category,
        image: apiData.img_url,
        icon: apiData.icon_font,
        description: apiData.description?.description ?? null,
        shortDescription: apiData.short_description ?? null,
        duration: apiData.description?.duration ?? null,
        availability: apiData.description?.availability ?? null,
        coverage: apiData.description?.coverage ?? null,
        keyFeatures:
          apiData.description?.key_features?.map((feature: any) => ({
            title: feature.feature_name,
            description: feature.feature_description,
          })) || [],
        supportDocUrl: apiData.description?.support_doc_url ?? null,
      }
    }

    const desc: DirectorListDescription = apiData.description || {}

    return {
      id: apiData.id,
      name: apiData.name,
      category: apiData.service_category,
      image: apiData.img_url,
      icon: apiData.icon_font,
      description: desc.objective || null,
      shortDescription: desc.objective || null,
      duration: desc.duration || null,
      availability: desc.availability || null,
      coverage: desc.coverage || null,
      keyFeatures: Array.isArray(desc.scope)
        ? desc.scope.map((item: string) => ({
            title: item,
            description: '',
          }))
        : [],
      supportDocUrl: desc.support_doc_url || null,
    }
  }
  
  // Helper to get service id by name from loaded services.
  const getServiceIdByName = (serviceName: string): number | null => {
    for (const category of services.value || []) {
      const list = category.services || []
      const found = list.find(
        (s) => s.subcategory === serviceName || s.name === serviceName
      )
      if (found) return found.id
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
    getServiceIdByName,
  }
}
