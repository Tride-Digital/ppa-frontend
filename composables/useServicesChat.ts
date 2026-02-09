import {ref, computed} from 'vue'

interface ServiceSubcategory {
    id: number
    name: string
    description: string
    icon: string
}

interface ServiceCategory {
    id: number
    name: string
    description: string
    icon: string
    subcategories: ServiceSubcategory[]
}

interface ServiceCategoryOption {
    id: number
    name: string
    description: string
    icon: string
    subcategories: ServiceSubcategory[]
}

const serviceCategories = ref<ServiceCategory[]>([])
const loading = ref(false)
const error = ref('')

export const useServicesChat = () => {
    const config = useRuntimeConfig()
    const baseURL = config.public.backendUrl

    // Fetch all service categories with subcategories
    const fetchServiceCategories = async () => {
        try {
            loading.value = true
            error.value = ''

            const response = await $fetch<ServiceCategory[]>(`${baseURL}/service_list/categories/all`)

            serviceCategories.value = response || []

        } catch (err: any) {
            console.error('Error fetching service categories:', err)
            error.value = err.message || 'Failed to load service categories'
            serviceCategories.value = []
        } finally {
            loading.value = false
        }
    }

    // Computed property for main service categories
    const mainServiceCategories = computed<ServiceCategoryOption[]>(() => {
        return serviceCategories.value.map(category => ({
            id: category.id,
            name: category.name,
            description: category.description,
            icon: category.icon,
            subcategories: category.subcategories
        }))
    })

    // Get subcategories for a specific category
    const getSubcategoriesForCategory = (categoryId: number | null) => {
        if (!categoryId) return []

        const category = serviceCategories.value.find(cat => cat.id === categoryId)
        return category?.subcategories || []
    }

    // Get category name by ID
    const getCategoryName = (categoryId: number | null) => {
        if (!categoryId) return ''
        const category = serviceCategories.value.find(cat => cat.id === categoryId)
        return category?.name || ''
    }

    // Get subcategory name by ID
    const getSubcategoryName = (subcategoryId: number | null) => {
        if (!subcategoryId) return ''

        for (const category of serviceCategories.value) {
            const subcategory = category.subcategories.find(sub => sub.id === subcategoryId)
            if (subcategory) {
                return subcategory.name
            }
        }
        return ''
    }

    // Get category icon by ID
    const getCategoryIcon = (categoryId: number | null) => {
        if (!categoryId) return 'mdi-briefcase'
        const category = serviceCategories.value.find(cat => cat.id === categoryId)
        return category?.icon || 'mdi-briefcase'
    }

    // Get subcategory icon by ID
    const getSubcategoryIcon = (subcategoryId: number | null) => {
        if (!subcategoryId) return 'mdi-tools'

        for (const category of serviceCategories.value) {
            const subcategory = category.subcategories.find(sub => sub.id === subcategoryId)
            if (subcategory) {
                return subcategory.icon
            }
        }
        return 'mdi-tools'
    }

    // Search services
    const searchServices = async (query: string, categoryId?: number) => {
        try {
            const params = new URLSearchParams()
            params.set('query', query)
            if (categoryId) {
                params.set('category_id', categoryId.toString())
            }

            const response = await $fetch(`${baseURL}/service_list/search?${params}`)
            return response || []
        } catch (err) {
            console.error('Error searching services:', err)
            return []
        }
    }

    return {
        // State
        serviceCategories: readonly(serviceCategories),
        loading: readonly(loading),
        error: readonly(error),

        // Computed
        mainServiceCategories,

        // Methods
        fetchServiceCategories,
        getSubcategoriesForCategory,
        getCategoryName,
        getSubcategoryName,
        getCategoryIcon,
        getSubcategoryIcon,
        searchServices
    }
}