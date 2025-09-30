import { ref } from 'vue'

export interface Service {
  id: number
  name: string
  image: string
  description: string
  category: string
  icon?: string
  shortDescription?: string
}

export interface Director {
  id: string
  name: string
  position: string
  image: string
  description: string
  qualifications: string[]
  services: Service[]
  email: string
  phone: string
}

export interface DirectorContact {
  id: string
  name: string
  image: string
}

interface ServiceCategory {
  id: number
  name: string
  description: string
  icon: string
  subcategories: ServiceSubcategory[]
}

interface ServiceSubcategory {
  id: number
  name: string
  description: string
  icon: string
  img_url: string  
}

interface FullServiceData {
  id: number
  subcategory: string
  service_category: string
  img_url: string
  icon_font: string
  short_description: string
  description: any
}

const directorContacts = ref<DirectorContact[]>([])
const directorDetailsCache = ref<Record<string, Director>>({})
const serviceCategoriesCache = ref<ServiceCategory[]>([])
const fullServicesCache = ref<FullServiceData[]>([])

/**
 * Fetch all services from service_list API to get the full service data
 */
const fetchAllServices = async () => {
  if (fullServicesCache.value.length > 0) {
    return fullServicesCache.value
  }
  
  try {
    const config = useRuntimeConfig()
    const baseURL = config.public.backendUrl || 'http://localhost:8000'
    const response = await $fetch<any>(`${baseURL}/service_list/all`, {
      params: {
        skip: 0,
        limit: 100
      }
    })
    
    // Flatten all services from all categories
    const allServices: FullServiceData[] = []
    response.forEach((category: any) => {
      category.services.forEach((service: any) => {
        allServices.push({
          id: service.id,
          subcategory: service.subcategory,
          service_category: category.service_category,
          img_url: service.img_url,
          icon_font: service.icon_font || category.icon_font,
          short_description: service.short_description,
          description: service.description
        })
      })
    })
    
    fullServicesCache.value = allServices
    return fullServicesCache.value
  } catch (error) {
    console.error('Failed to fetch all services:', error)
    return []
  }
}

/**
 * Get full service data by service ID
 */
const getServiceById = (serviceId: number): FullServiceData | null => {
  return fullServicesCache.value.find(service => service.id === serviceId) || null
}

/**
 * Fetch service categories to map IDs to names
 */
const fetchServiceCategories = async () => {
  if (serviceCategoriesCache.value.length > 0) {
    return serviceCategoriesCache.value
  }
  
  try {
    const config = useRuntimeConfig()
    const baseURL = config.public.apiBase || 'http://localhost:8000'
    const response = await $fetch<ServiceCategory[]>(`${baseURL}/service_list/categories/all`)
    serviceCategoriesCache.value = response || []
    return serviceCategoriesCache.value
  } catch (error) {
    console.error('Failed to fetch service categories:', error)
    return []
  }
}

/**
 * Get subcategory details by ID
 */
const getSubcategoryById = (subcategoryId: number): ServiceSubcategory | null => {
  for (const category of serviceCategoriesCache.value) {
    const subcategory = category.subcategories.find(sub => sub.id === subcategoryId)
    if (subcategory) {
      return subcategory
    }
  }
  return null
}

/**
 * Get category details by ID
 */
const getCategoryById = (categoryId: number): ServiceCategory | null => {
  return serviceCategoriesCache.value.find(cat => cat.id === categoryId) || null
}

/**
 * Fetch all directors for contact cards (name, id, image)
 */
const fetchDirectorContacts = async () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBase || 'http://localhost:8000'
  const res = await fetch(`${baseURL}/directorservice/directors?skip=0&limit=100`)
  const data = await res.json()
  directorContacts.value = data.map((d: any) => ({
    id: d.id,
    name: d.profile?.fullName || `${d.fname} ${d.lname}`,
    image: d.profile?.profilePic || '',
  }))
}

/**
 * Fetch full director details by user id
 */
const fetchDirectorById = async (id: string): Promise<Director | null> => {
  if (directorDetailsCache.value[id]) {
    return directorDetailsCache.value[id]
  }
  
  try {
    const config = useRuntimeConfig()
    const baseURL = config.public.apiBase || 'http://localhost:8000'
    
    // Fetch all services first to get the actual service data with images
    await fetchAllServices()
    
    // Fetch service categories
    await fetchServiceCategories()
    
    // Ensure contacts are loaded to get profile info
    if (directorContacts.value.length === 0) {
      await fetchDirectorContacts()
    }
    
    // Fetch director service data
    const res = await fetch(`${baseURL}/directorservice/user/${id}`)
    const data = await res.json()
    
    // Find the full director object to get email and phone
    const contactDataRes = await fetch(`${baseURL}/directorservice/directors?skip=0&limit=100`)
    const contactsData = await contactDataRes.json()
    const contact = contactsData.find((d: any) => d.id === id)
    
    // Transform services using the actual service IDs from service_list
    const transformedServices: Service[] = (data.services || []).map((service: any) => {
      // Use service.subcategory as the service ID
      const serviceId = service.subcategory
      const fullService = getServiceById(serviceId)
      
      if (fullService) {
        // Use the full service data from service_list API with image
        return {
          id: fullService.id,
          name: fullService.subcategory,
          description: fullService.short_description,
          image: fullService.img_url, 
          category: fullService.service_category,
          icon: fullService.icon_font,
          shortDescription: fullService.short_description
        }
      } else {
        // Fallback if service not found
        const subcategory = getSubcategoryById(serviceId)
        const category = getCategoryById(service.category)
        
        return {
          id: serviceId,
          name: subcategory?.name || `Service ${serviceId}`,
          description: subcategory?.description ,
          image: subcategory?.img_url, 
          category: category?.name || `Category ${service.category}`,
          icon: subcategory?.icon || 'mdi-briefcase',
          shortDescription: subcategory?.description
        }
      }
    })
    
    const director: Director = {
      id: data.user_id || id,
      name: contact?.profile?.fullName,
      position: 'Director',
      image: contact?.profile?.profilePic,
      description: data.about_me || '',
      qualifications: data.qualifications,
      services: transformedServices,
      email: contact?.profile?.email,
      phone: contact?.profile?.mobile,
    }
    
    directorDetailsCache.value[id] = director
    return director
  } catch (error) {
    console.error('Failed to fetch director details:', error)
    return null
  }
}

export const useDirectors = () => {
  return {
    directorContacts,
    fetchDirectorContacts,
    fetchDirectorById,
  }
}