import { ref } from 'vue'

export interface Service {
  name: string
  image: string
  description: string
  category: string
  icon?: string
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

const directorContacts = ref<DirectorContact[]>([])
const directorDetailsCache = ref<Record<string, Director>>({})
const serviceCategoriesCache = ref<ServiceCategory[]>([])
const isLoading = ref<boolean>(false)

/**
 * Fetch service categories to map IDs to names
 */
const fetchServiceCategories = async () => {
  if (serviceCategoriesCache.value.length > 0) {
    return serviceCategoriesCache.value
  }
  
  try {
    const config = useRuntimeConfig()
    const baseURL = config.public.backendUrl || 'http://localhost:8000'
    const response = await $fetch<ServiceCategory[]>(`${baseURL}/service_list/categories/all`)
   
    serviceCategoriesCache.value = response || []
    return serviceCategoriesCache.value
  } catch (error) {
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
  const baseURL = config.public.backendUrl || 'http://localhost:8000'
  const res = await fetch(`${baseURL}/directorservice/directors?skip=0&limit=100`)
  const data = await res.json() || []

  const mapped = (data || []).map((d: any) => {
    const fullName = d.profile?.fullName || `${d.fname || ''} ${d.lname || ''}`.trim()
    let firstName = ''
    if (d.fname && d.fname.trim() !== '') {
      firstName = d.fname.trim()
    } else if (d.profile?.fullName) {
      const parts = d.profile.fullName.trim().split(/\s+/)
      firstName = parts.length > 0 ? parts[0] : ''
    } else {
      firstName = ''
    }
    return {
      id: d.id,
      name: fullName,
      firstName: firstName.toLowerCase(),
      image: d.profile?.profilePic || '',
    }
  })
  mapped.sort((a: { id: string; name: string; firstName: string; image: string }, b: { id: string; name: string; firstName: string; image: string }) => {
    const cmp = a.firstName.localeCompare(b.firstName, undefined, { sensitivity: 'base' })
    if (cmp !== 0) return cmp
    return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
  })
  directorContacts.value = mapped.map(({ id, name, image }: { id: string; name: string; image: string; firstName: string }) => ({ id, name, image }))
}

/**
 * Fetch full director details by user id
 */
const fetchDirectorById = async (id: string): Promise<Director | null> => {
  // Return cached data if availableLE
  if (directorDetailsCache.value[id]) {
    return directorDetailsCache.value[id]
  }
  
  isLoading.value = true
  
  try {
    const config = useRuntimeConfig()
    const baseURL = config.public.backendUrl || 'http://localhost:8000'
    
    // Fetch service categories first
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
    
    // Map {category: int, subcategory: int} to Service objects
    const transformedServices: Service[] = (data.services || []).map((service: any) => {
      const subcategory = getSubcategoryById(service.subcategory)
      const category = getCategoryById(service.category)
      
      return {
        name: subcategory?.name || `Service ${service.subcategory}`,
        description: subcategory?.description || '',
        image: subcategory?.img_url || '',
        category: category?.name || `Category ${service.category}`,
        icon: subcategory?.icon || 'mdi-briefcase',
        id: service.subcategory || '',
      }
    })
    
    const director: Director = {
      id: data.user_id || id,
      name: contact?.profile?.fullName || '',
      position: 'Director',
      image: contact?.profile?.profilePic || '',
      description: data.about_me || '',
      qualifications: data.qualifications || [],
      services: transformedServices,
      email: contact?.profile?.email || '',
      phone: contact?.profile?.mobile || '',
    }
    
    directorDetailsCache.value[id] = director
    return director
  } catch (error) {
    console.error('Error fetching director:', error)
    return null
  } finally {
    isLoading.value = false
  }
}

export const useDirectors = () => {
  return {
    directorContacts,
    isLoading,
    fetchDirectorContacts,
    fetchDirectorById,
  }
}