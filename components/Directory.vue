<template>
  <section class="directory-page py-10">
    <v-container>
      <!-- Header -->
      <v-row justify="center" class="mb-6">
        <v-col cols="12" class="text-center">
          <h2 class="section-title">Service Providers Directory</h2>
          <p class="section-subtitle">
            Find verified plantation service providers across Sri Lanka. Use search & filters to discover the best match.
          </p>
        </v-col>
      </v-row>

      <!-- Marketing: Service Categories (top) -->
      <v-row class="mb-8">
        <v-col cols="12">
          <div class="marketing-strip">
            <div class="marketing-title">Explore Services</div>

            <v-row v-if="servicesLoading" class="mt-2">
              <v-col cols="12">
                <v-skeleton-loader type="card" />
              </v-col>
            </v-row>

            <v-row v-else>
              <v-col
                v-for="cat in serviceCategories"
                :key="cat.id"
                cols="12" sm="6" md="4" lg="3"
              >
                <ServiceCategoryMarketingCard
                  :category="cat"
                  @click="selectMarketingCategory(cat)"
                />
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>

      <v-row>
        <!-- Filters Panel -->
        <v-col cols="12" lg="3">
          <v-card class="filters-card" elevation="4">
            <v-card-title class="filters-title">
              <v-icon start>mdi-filter-variant</v-icon>
              Filters
            </v-card-title>

            <v-card-text>
              <v-text-field
                v-model="filters.q"
                label="Search keyword"
                prepend-inner-icon="mdi-magnify"
                variant="outlined"
                density="comfortable"
                class="mb-3"
              />

              <v-select
                v-model="filters.category_id"
                :items="categoryItems"
                item-title="title"
                item-value="value"
                label="Category"
                variant="outlined"
                density="comfortable"
                class="mb-3"
                @update:modelValue="onCategoryChange"
              />

              <v-select
                v-model="filters.subcategory_id"
                :items="subcategoryItems"
                item-title="title"
                item-value="value"
                label="Sub Category"
                variant="outlined"
                density="comfortable"
                class="mb-3"
                :disabled="!filters.category_id"
              />

              <v-select
                v-model="filters.province_code"
                :items="provinceItems"
                item-title="title"
                item-value="value"
                label="Province"
                variant="outlined"
                density="comfortable"
                class="mb-3"
                @update:modelValue="onProvinceChange"
              />

              <v-select
                v-model="filters.district_code"
                :items="districtItems"
                item-title="title"
                item-value="value"
                label="District"
                variant="outlined"
                density="comfortable"
                class="mb-3"
                :disabled="!filters.province_code"
              />

              <v-select
                v-model="filters.sort"
                :items="sortItems"
                item-title="title"
                item-value="value"
                label="Sort By"
                variant="outlined"
                density="comfortable"
                class="mb-5"
              />

              <v-btn
                block
                color="primary"
                variant="elevated"
                class="apply-btn"
                :loading="loading"
                @click="applyFilters"
              >
                <v-icon start>mdi-check</v-icon>
                Apply
              </v-btn>

              <v-btn
                block
                variant="outlined"
                color="primary"
                class="mt-3"
                @click="resetFilters"
              >
                Reset
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Results -->
        <v-col cols="12" lg="9">
          <v-row v-if="loading">
            <v-col v-for="i in 8" :key="i" cols="12" sm="6" md="4" lg="3">
              <v-skeleton-loader type="card" />
            </v-col>
          </v-row>

          <v-row v-else-if="items.length === 0">
            <v-col cols="12">
              <v-alert type="info" variant="tonal">
                No providers found. Try adjusting filters.
              </v-alert>
            </v-col>
          </v-row>

          <v-row v-else>
            <v-col
              v-for="p in items"
              :key="p.id"
              cols="12" sm="6" md="4" lg="3"
              class="provider-card-col"
            >
              <ProviderCard :provider="p" @click="openProvider(p.id)" />
            </v-col>
          </v-row>

          <!-- Pagination -->
          <v-row v-if="total > limit" class="mt-6" justify="center">
            <v-col cols="12" class="d-flex justify-center">
              <v-pagination
                v-model="page"
                :length="Math.ceil(total / limit)"
                rounded="circle"
                @update:modelValue="onPageChange"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>

    </v-container>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import ProviderCard from '@/components/directory/ProviderCard.vue'
import { usePublicDirectory } from '~/composables/usePublicDirectory'
import { useLocations } from '~/composables/useLocations'
import { useServices } from '~/composables/useServices'

const router = useRouter()
const { searchProviders } = usePublicDirectory()
const { fetchProvinces, fetchDistrictsByProvince } = useLocations()
const { fetchAllServices, transformServiceCategories } = useServices()

const loading = ref(false)
const servicesLoading = ref(false)

const items = ref<any[]>([])
const total = ref(0)

const page = ref(1)
const limit = 12

const filters = ref({
  q: '',
  category_id: null as number | null,
  subcategory_id: null as number | null,
  province_code: null as string | null,
  district_code: null as string | null,
  sort: 'most_recent' as any
})

const sortItems = [
  { title: 'Most Recent', value: 'most_recent' },
  { title: 'Featured', value: 'featured' },
  { title: 'Highest Rated', value: 'highest_rated' },
  { title: 'Nearest Province Match', value: 'nearest' },
]

const provinceItems = ref<any[]>([])
const districtItems = ref<any[]>([])

const serviceCategories = ref<any[]>([]) // marketing cards (service_list)
const categoryItems = ref<any[]>([])
const subcategoryItems = ref<any[]>([])

const loadServicesMarketing = async () => {
  servicesLoading.value = true
  try {
    const data = await fetchAllServices()
    const nav = transformServiceCategories(data || [])
    // build marketing cards from categories
    serviceCategories.value = (nav || []).map((c: any, idx: number) => ({
      id: c.id ?? idx + 1,
      name: c.label,
      icon: c.icon,
      image: (c.image || c.img_url || '/images/placeholder-service.jpg'),
      subItems: c.subItems || [],
      service_category_id: c.service_category_id ?? (idx + 1),
    }))

    categoryItems.value = serviceCategories.value.map((c: any) => ({
      title: c.name,
      value: c.service_category_id
    }))
  } finally {
    servicesLoading.value = false
  }
}

const loadProvinces = async () => {
  const provinces = await fetchProvinces('en')
  // normalize to {title,value}
  provinceItems.value = provinces.map((p: any) => ({
    title: p.text || p.title,
    value: p.value
  }))
}

const onProvinceChange = async () => {
  filters.value.district_code = null
  if (!filters.value.province_code) {
    districtItems.value = []
    return
  }
  const districts = await fetchDistrictsByProvince(filters.value.province_code, 'en')
  districtItems.value = districts.map((d: any) => ({ title: d.title, value: d.value }))
}

const onCategoryChange = () => {
  filters.value.subcategory_id = null
  const catId = filters.value.category_id
  if (!catId) {
    subcategoryItems.value = []
    return
  }
  const cat = serviceCategories.value.find((c: any) => c.service_category_id === catId)
  subcategoryItems.value = (cat?.subItems || []).map((s: any) => ({
    title: s.name,
    value: s.id
  }))
}

const fetchPage = async () => {
  loading.value = true
  try {
    const skip = (page.value - 1) * limit
    const res = await searchProviders({
      q: filters.value.q || undefined,
      category_id: filters.value.category_id,
      subcategory_id: filters.value.subcategory_id,
      province_code: filters.value.province_code,
      district_code: filters.value.district_code,
      sort: filters.value.sort,
    })
    items.value = res.items || []
    total.value = res.total || 0
  } finally {
    loading.value = false
  }
}

const applyFilters = async () => {
  page.value = 1
  await fetchPage()
}

const resetFilters = async () => {
  filters.value = {
    q: '',
    category_id: null,
    subcategory_id: null,
    province_code: null,
    district_code: null,
    sort: 'most_recent'
  }
  subcategoryItems.value = []
  districtItems.value = []
  page.value = 1
  await fetchPage()
}

const onPageChange = async () => {
  await fetchPage()
}

const openProvider = (id: number) => {
  router.push(`/providers/${id}`)
}

const selectMarketingCategory = (cat: any) => {
  filters.value.category_id = cat.service_category_id
  onCategoryChange()
  applyFilters()
}

onMounted(async () => {
  await loadServicesMarketing()
  await loadProvinces()
  await fetchPage()
})
</script>

<style scoped>
.directory-page {
  background-color: rgb(var(--v-theme-background));
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: rgb(var(--v-theme-section-title));
  margin-bottom: 1rem;
}

.section-subtitle {
  font-size: 1.1rem;
  color: rgb(var(--v-theme-section-subtitle));
  max-width: 760px;
  margin: 0 auto;
  line-height: 1.6;
}

.marketing-strip {
  background: linear-gradient(135deg, rgb(var(--v-theme-services-nav-bg-start)) 0%, rgb(var(--v-theme-services-nav-bg-end)) 100%);
  border-radius: 20px;
  padding: 18px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.marketing-title {
  font-weight: 700;
  color: rgb(var(--v-theme-section-title));
  margin-bottom: 10px;
}

.filters-card {
  border-radius: 16px;
  overflow: hidden;
  background-color: rgb(var(--v-theme-service-card-bg));
}

.filters-title {
  background: linear-gradient(135deg, rgb(var(--v-theme-primary)) 0%, rgb(var(--v-theme-primary-darken-1)) 100%);
  color: rgb(var(--v-theme-on-primary));
}

.apply-btn {
  text-transform: none;
  font-weight: 600;
  border-radius: 12px;
}

.provider-card-col {
  display: flex;
}

@media (max-width: 768px) {
  .section-title { font-size: 2rem; }
}
</style>