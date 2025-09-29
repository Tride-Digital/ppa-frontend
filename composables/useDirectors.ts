import { ref } from 'vue'

export interface Service {
  name: string
  image: string
  description: string
  category: string
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

const directorContacts = ref<DirectorContact[]>([])
const directorDetailsCache = ref<Record<string, Director>>({})

/**
 * Fetch all directors for contact cards (name, id, image)
 */
const fetchDirectorContacts = async () => {
  const res = await fetch('http://127.0.0.1:8000/directorservice/directors?skip=0&limit=100')
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
    // Ensure contacts are loaded to get profile info
    if (directorContacts.value.length === 0) {
      await fetchDirectorContacts()
    }
    const res = await fetch(`http://127.0.0.1:8000/directorservice/user/${id}`)
    const data = await res.json()
    // Find the full director object to get email and phone
    const contactDataRes = await fetch('http://127.0.0.1:8000/directorservice/directors?skip=0&limit=100')
    const contactsData = await contactDataRes.json()
    const contact = contactsData.find((d: any) => d.id === id)
    const director: Director = {
      id: data.user_id || id,
      name: contact?.profile?.fullName || '',
      position: 'Director',
      image: contact?.profile?.profilePic || '',
      description: data.about_me || '',
      qualifications: data.qualifications || [],
      services: data.services || [],
      email: contact?.profile?.email || '',
      phone: contact?.profile?.mobile || '',
    }
    directorDetailsCache.value[id] = director
    return director
  } catch {
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