import { ref } from 'vue'
import { useRuntimeConfig } from '#app'

export interface DirectorServiceStored {
  category?: string | number
  director_id?: number
  name?: string
  // legacy support
  subcategory?: number
}

export interface DirectorListDetail {
  id: number
  name: string
  service_category?: string | null
  img_url?: string | null
  icon_font?: string | null
  short_description?: string | null
  description?: {
    objective?: string | null
    scope?: string[] | null
    deliverables?: string[] | null
    key_kpis?: string[] | null
    expert_composition?: string[] | null
    duration?: string | null
    availability?: string | null
    coverage?: string | null
    support_doc_url?: string | null
  } | null
}

export interface DirectorServiceCard {
  id: number
  name: string
  category?: string
  image?: string | null
  icon?: string | null
  description?: string | null
}

interface DirectorserviceOut {
  user_id: string
  about_me?: string | null
  qualifications?: string[] | null
  services?: DirectorServiceStored[] | null
  created_at: number
  updated_at: number
}

export const useDIrectorService = () => {
  const config = useRuntimeConfig()
  const apiBase =
    (config.public?.backendUrl as string)

  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchDirectorServiceByUser = async (userId: string): Promise<DirectorserviceOut | null> => {
    try {
      return await $fetch<DirectorserviceOut>(`${apiBase}/directorservice/user/${userId}`)
    } catch (err: any) {
      if (err?.status === 404) return null
      throw err
    }
  }

  const fetchDirectorListDetail = async (id: number): Promise<DirectorListDetail | null> => {
    try {
      return await $fetch<DirectorListDetail>(`${apiBase}/director_list/${id}`)
    } catch (err) {
      return null
    }
  }

  const fetchLinkedServiceCardsByUser = async (userId: string): Promise<DirectorServiceCard[]> => {
    loading.value = true
    error.value = null
    try {
      const raw = await fetchDirectorServiceByUser(userId)
      const stored = raw?.services ?? []
      if (!stored?.length) return []

      const ids = [...new Set(
        stored
          .map(s => Number(s?.director_id ?? s?.subcategory))
          .filter(n => Number.isFinite(n))
      )] as number[]

      const details = await Promise.all(ids.map(id => fetchDirectorListDetail(id)))
      const detailMap = new Map<number, DirectorListDetail>()
      details.forEach(d => { if (d?.id) detailMap.set(d.id, d) })

      const cards: DirectorServiceCard[] = stored.map(s => {
        const id = Number(s?.director_id ?? s?.subcategory)
        const d = detailMap.get(id)
        if (!id || !d) return null

        return {
          id,
          name: (s?.name && String(s.name)) || d.name,
          category: typeof s?.category === 'string' ? s.category : (d.service_category ?? undefined),
          image: d.img_url ?? null,   
          icon: d.icon_font ?? null,
          description: d.description?.objective ?? d.short_description ?? null
        } as DirectorServiceCard
      }).filter(Boolean) as DirectorServiceCard[]

      return cards
    } catch (err: any) {
      error.value = err?.data?.detail || err?.message || 'Failed to load linked director services'
      return []
    } finally {
      loading.value = false
    }
  }

  return {
    // state
    loading,
    error,
    // methods
    fetchDirectorServiceByUser,
    fetchLinkedServiceCardsByUser,
  }
}
