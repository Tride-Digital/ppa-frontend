// composables/usePublicDirectory.ts
import { ref } from "vue";

export type SortOption = "featured" | "highest_rated" | "most_recent" | "nearest";

export type CategoryDTO = {
  id: number;
  name: string;
  description?: string;
  icon?: string;
  subcategories: Array<{
    id: number;
    name: string;
    description?: string;
    icon?: string;
    img_url?: string;
  }>;
};

export type ProviderCard = {
  id: number;
  business_name: string;
  owner_name?: string | null;
  phone?: string | null;
  email?: string | null;
  website?: string | null;
  description?: string | null;
  other_services?: any;
  image_url?: string | null;
  logo_url?: string | null;

  district_code?: string | null;
  district_name?: string | null;
  province_code?: string | null;
  province_name?: string | null;

  services: Array<{
    service_category_id: number;
    service_category?: string | null;
    subcategory_id: number;
    subcategory?: string | null;
    icon_font?: string | null;
    img_url?: string | null;
  }>;

  has_certifications: boolean;
  is_featured: boolean;
  average_rating?: number | null;
  rating_count: number;
  created_at?: string | null;
};

export type ProviderDetail = ProviderCard & {
  address?: string | null;
  type_of_business?: string | null;
  geographical_coverage?: any;
  other_services?: any;
  qualifications?: any;
  clients?: any;
  documents?: Array<{ document_type: string; document_url: string; uploaded_at?: string }>;
};

export function usePublicDirectory() {
  const config = useRuntimeConfig();

  const loadingCategories = ref(false);
  const loadingProviders = ref(false);
  const loadingDetail = ref(false);

  const categories = ref<CategoryDTO[]>([]);
  const providers = ref<ProviderCard[]>([]);
  const total = ref(0);

  const fetchCategories = async () => {
    loadingCategories.value = true;
    try {
      const apiBase = config.public.backendUrl;
      // you already have this endpoint
      categories.value = await $fetch(`${apiBase}/service_list/categories/all`);
    } finally {
      loadingCategories.value = false;
    }
  };

  const searchProviders = async (params: {
    q?: string;
    category_id?: number | null;
    subcategory_id?: number | null;
    province_code?: string | null;
    district_code?: string | null;
    sort?: SortOption;
    page?: number;
    page_size?: number;
    lan?: "en" | "si" | "ta";
  }) => {
    loadingProviders.value = true;
    try {
      const apiBase = config.public.backendUrl;
      
      // Filter out null/undefined values
      const cleanParams = Object.fromEntries(
        Object.entries(params).filter(([_, value]) => value != null)
      );
      
      const res = await $fetch<{ items: ProviderCard[]; total: number; page: number; page_size: number }>(
        `${apiBase}/public_directory/providers`,
        { query: cleanParams }
      );
      providers.value = res.items;
      total.value = res.total;
      return res;
    } finally {
      loadingProviders.value = false;
    }
  };

  const fetchProviderDetail = async (id: number, lan: "en" | "si" | "ta" = "en") => {
    loadingDetail.value = true;
    try {
      const apiBase = config.public.backendUrl;
      const data = await $fetch<ProviderDetail>(`${apiBase}/public_directory/providers/${id}`, { query: { lan } });
      return data;
    } finally {
      loadingDetail.value = false;
    }
  };

  const getProviderPublicReviews = async (providerId: number) => {
    try {
      const apiBase = config.public.backendUrl;
      const response = await $fetch(`${apiBase}/public_directory/providers/${providerId}/reviews`);
      return response;
    } catch (error: any) {
      console.error('Get provider reviews error:', error);
      throw new Error(error.response?.data?.detail || 'Failed to fetch provider reviews');
    }
  };

  const getProviderAverageRating = async (providerId: number) => {
    try {
      const apiBase = config.public.backendUrl;
      const response = await $fetch(`${apiBase}/service-provider/${providerId}/rating/average`);
      return response;
    } catch (error: any) {
      console.error('Get provider average rating error:', error?.response?.data || error);
      throw new Error(error.response?.data?.detail || 'Failed to fetch provider rating');
    }
  };

  return {
    categories,
    providers,
    total,
    loadingCategories,
    loadingProviders,
    loadingDetail,
    fetchCategories,
    searchProviders,
    fetchProviderDetail,
    getProviderPublicReviews,
    getProviderAverageRating,
  };
}
