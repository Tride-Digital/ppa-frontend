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

export interface DirectorInfo {
  directorTitle?: string
  directorProvince?: string
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
const directorInfoMap = ref<Record<string, DirectorInfo>>({})
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
 * Fetch director info (title and province) by user ID
 */
const fetchDirectorInfo = async (userId: string) => {
  try {
    const config = useRuntimeConfig()
    const baseURL = config.public.backendUrl || 'http://localhost:8000'
    const response = await $fetch<DirectorInfo>(`${baseURL}/directorinfo/user/${userId}`)
    if (response) {
      directorInfoMap.value[userId] = response
    }
  } catch (error) {
    console.log(`No director info found for user ${userId}`)
  }
}

/**
 * Get director title by ID
 */
const getDirectorTitle = (directorId: string): string => {
  return directorInfoMap.value[directorId]?.directorTitle || ''
}

/**
 * Get director province by ID
 */
const getDirectorProvince = (directorId: string): string => {
  return directorInfoMap.value[directorId]?.directorProvince || ''
}

/**
 * Fetch directors assigned to a given province
 */
const fetchDirectorsByProvince = async (province: string): Promise<DirectorContact[]> => {
  try {
    const config = useRuntimeConfig()
    const baseURL = config.public.backendUrl || 'http://localhost:8000'
    const list = await $fetch<any[]>(`${baseURL}/directorinfo/province/${encodeURIComponent(province)}`)

    if (directorContacts.value.length === 0) {
      await fetchDirectorContacts()
    }

    const contacts: DirectorContact[] = (list || [])
      .map((item: any) => {
        const userId = String(
          item?.user_id ?? item?.userId ?? item?.user ?? item?.id ?? ''
        )
        if (!userId) return null
        const match = directorContacts.value.find(c => String(c.id) === userId)
        if (match) return match
        // fallback minimal contact if not found
        return { id: userId, name: item?.fullName || 'Director', image: '' }
      })
      .filter(Boolean) as DirectorContact[]

    return contacts
  } catch (e) {
    return []
  }
}

/**
 * Convenience: return the first director id for a province or null
 */
const getPrimaryDirectorIdByProvince = async (province: string): Promise<string | null> => {
  const matches = await fetchDirectorsByProvince(province)
  if (!matches || matches.length === 0) return null
  return matches[0].id
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
    let lastname = ''
    if (d.lname && d.lname.trim() !== '') {
      lastname = d.lname.trim()
    } else if (d.profile?.fullName) {
      const parts = d.profile.fullName.trim().split(/\s+/)
      lastname = parts.length > 0 ? parts[parts.length - 1] : ''
    } else {
      lastname = ''
    }
    const lastKey = lastname.split(/\s+/).filter(Boolean)
    let sortName = ''
    if (lastKey.length >= 2) {
      sortName = lastKey[1].toLowerCase()
    } else if (lastKey.length === 1) {
      sortName = lastKey[0].toLowerCase()
    } else {
      const fnParts = fullName.split(/\s+/).filter(Boolean)
      sortName = fnParts.length > 0 ? fnParts[fnParts.length - 1].toLowerCase() : ''
    }
    return {
      id: d.id,
      name: fullName,
      sortName,
      image: d.profile?.profilePic || '',
    }
  })
  mapped.sort((a: { sortName: string; name: string }, b: { sortName: string; name: string }) => {
    const cmp = a.sortName.localeCompare(b.sortName, undefined, { sensitivity: 'base' })
    if (cmp !== 0) return cmp
    return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
  })
  directorContacts.value = mapped.map(({ id, name, image }: { id: string; name: string; image: string }) => ({ id, name, image }))
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
    directorInfoMap,
    isLoading,
    fetchDirectorContacts,
    fetchDirectorById,
    fetchDirectorInfo,
    getDirectorTitle,
    getDirectorProvince,
    fetchDirectorsByProvince,
    getPrimaryDirectorIdByProvince,
  }
}