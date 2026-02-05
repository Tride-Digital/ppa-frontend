<template>
  <div class="directory-page">
    <!-- Hero -->
    <section class="hero-section">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="8" class="text-center">
            <h2 class="section-title">Support Provider Service Directory</h2>
            <p class="section-subtitle">
              Browse categories first, then apply filters to discover matching providers.
            </p>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <section ref="filtersSection" class="py-8">
      <v-container>
        <v-row>
          <!-- Filters panel -->
          <v-col cols="12" lg="4" class="filters-col">
            <v-card class="filters-card" elevation="4">
              <v-card-title class="filters-title">
                <v-icon start>mdi-filter</v-icon>
                Search Directory
              </v-card-title>

              <v-card-text>
                <v-text-field
                  v-model="filters.q"
                  label="Search by keyword"
                  variant="outlined"
                  density="comfortable"
                  prepend-inner-icon="mdi-magnify"
                  class="mb-3"
                />

                <v-select
                  v-model="filters.category"
                  :items="categoryItems"
                  @click="filters.subcategory = null"
                  label="Category"
                  variant="outlined"
                  density="comfortable"
                  item-title="title"
                  item-value="value"
                  class="mb-3"
                />

                <v-select
                  v-model="filters.subcategory"
                  :items="subcategoryItems"
                  label="Subcategory"
                  variant="outlined"
                  density="comfortable"
                  item-title="title"
                  item-value="value"
                  :disabled="!filters.category"
                  class="mb-3"
                />

                <v-select
                  v-model="filters.province"
                  :items="provinceItems"
                  label="Province"
                  variant="outlined"
                  density="comfortable"
                  item-title="title"
                  item-value="value"
                  class="mb-3"
                  @update:modelValue="onProvinceChange"
                />

                <v-select
                  v-model="filters.district"
                  :items="districtItems"
                  label="District"
                  variant="outlined"
                  density="comfortable"
                  item-title="title"
                  item-value="value"
                  :disabled="!filters.province"
                  class="mb-3"
                />

                <v-select
                  v-model="filters.sort"
                  :items="sortItems"
                  label="Sort"
                  variant="outlined"
                  density="comfortable"
                  class="mb-4"
                />

                <v-btn
                  block
                  color="primary"
                  size="large"
                  class="apply-btn"
                  :loading="loadingProviders"
                  @click="page = 1; maxKnownTotalPages = null; applyFilters()"
                >
                  <v-icon start>mdi-check</v-icon>
                  Apply
                </v-btn>

                <v-btn block variant="text" class="mt-2" @click="resetFilters">
                  Reset
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>

          <!-- Results -->
          <v-col cols="12" lg="8">
            <!-- When filters NOT applied - Show marketing categories -->
            <div v-if="!hasSearched">
              <v-card class="results-header mb-4" elevation="0">
                <h3 class="text-h6" style="color: rgb(var(--v-theme-section-title)); font-weight: 700;">
                  Explore Service Categories
                </h3>
                <p class="text-body-2 mt-1" style="color: rgb(var(--v-theme-section-subtitle));">
                  Select a category to browse service providers, or use filters to refine your search.
                </p>
              </v-card>

              <v-row v-if="loadingCategories" justify="center">
                <v-col cols="12" class="text-center">
                  <v-progress-circular indeterminate size="48"></v-progress-circular>
                </v-col>
              </v-row>

              <v-row v-else class="category-card-row">
                <v-col v-for="cat in categories" :key="cat.id" cols="12" sm="6" md="6" lg="6" class="category-card-col">
                  <v-card class="category-card" :class="{ 'category-card--expanded': openCategoryPanel[cat.id] === 0 }" elevation="3" hover>
                    <div class="category-card-top" @click="selectCategory(cat)">
                      <v-img :src="categoryImage(cat)" height="140" cover />
                      <v-card-title class="category-title">
                        <v-icon start size="20">{{ cat.icon || 'mdi-briefcase' }}</v-icon>
                        {{ cat.name }}
                      </v-card-title>
                    </div>

                    <div class="category-card-spacer"></div>

                    <v-card-text class="category-sub pa-0">
                      <v-expansion-panels
                        flat
                        v-model="openCategoryPanel[cat.id]"
                        @update:modelValue="onCategoryPanelChange(cat.id, $event)"
                      >
                        <v-expansion-panel>
                          <v-expansion-panel-title class="text-body-2">
                            {{ cat.subcategories?.length || 0 }} services
                          </v-expansion-panel-title>
                          <v-expansion-panel-text>
                            <v-list density="compact" class="pa-0 subcategory-list">
                              <v-list-item
                                v-for="sub in cat.subcategories"
                                :key="sub.id"
                                class="text-body-2 subcategory-item"
                                @click="selectSubcategory(cat.id, sub.id)"
                              >
                                <template #prepend>
                                  <v-icon size="16" class="me-2">mdi-chevron-right</v-icon>
                                </template>
                                <div class="subcategory-text">{{ sub.name }}</div>
                              </v-list-item>
                            </v-list>
                          </v-expansion-panel-text>
                        </v-expansion-panel>
                      </v-expansion-panels>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </div>

            <!-- When filters ARE applied - Show provider results -->
            <div v-else>
              <v-card class="results-header" elevation="0">
                <div class="d-flex align-center justify-space-between flex-wrap gap-3">
                  <div>
                    <h3 class="text-h6" style="color: rgb(var(--v-theme-section-title)); font-weight: 700;">
                      Providers
                    </h3>
                    <div class="text-body-2" style="color: rgb(var(--v-theme-section-subtitle));">
                      Showing {{ providers.length }} of {{ total }}
                    </div>
                  </div>

                  <v-select
                    v-model="pageSize"
                    :items="[8, 12, 16, 24]"
                    label="Per page"
                    variant="outlined"
                    density="compact"
                    style="max-width: 160px; margin-top: 10px;"
                  />
                </div>
              </v-card>

              <v-row v-if="loadingProviders" class="mt-6" justify="center">
                <v-col cols="12" class="text-center">
                  <v-progress-circular indeterminate size="52"></v-progress-circular>
                  <p class="mt-3">Loading providers...</p>
                </v-col>
              </v-row>

              <v-row v-else-if="providers.length === 0" class="mt-6">
                <v-col cols="12" class="text-center py-10">
                  <v-icon size="64" color="grey" class="mb-4">mdi-account-search</v-icon>
                  <h3 class="text-h6 mb-2">No providers found</h3>
                  <p class="text-body-2" style="color: rgb(var(--v-theme-section-subtitle));">
                    Try changing filters or removing some constraints.
                  </p>
                </v-col>
              </v-row>

              <v-row v-else class="mt-4 equal-card-row">
                <v-col
                  v-for="p in providers"
                  :key="p.id"
                  cols="12"
                  sm="6"
                  md="4"
                  lg="3"
                  class="mb-6 provider-card-col"
                >
                  <ProviderCard
                    :provider="p"
                    @click="goToProvider(p.id)"
                    @view="goToProvider(p.id)"
                  />
                </v-col>
              </v-row>
   
              <div v-if="effectiveTotalPages > 1" class="d-flex justify-center mt-6">
                <v-pagination
                  v-model="page"
                  :length="effectiveTotalPages"
                  rounded="lg"
                  @update:modelValue="applyFilters"
                />
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <section v-if="hasSearched" class="py-6">
      <v-container>
        <div ref="categoriesScrollTarget" class="categories-scroll-target"></div>
        <v-row class="mb-4" justify="center">
          <v-col cols="12" md="8" class="text-center">
            <h2 class="text-h5" style="color: rgb(var(--v-theme-section-title)); font-weight: 700;">
              Explore More Service Categories
            </h2>
            <p class="text-body-2" style="color: rgb(var(--v-theme-section-subtitle));">
              Browse other service categories available in our directory.
            </p>
          </v-col>
        </v-row>

        <v-row v-if="loadingCategories" justify="center">
          <v-col cols="12" class="text-center">
            <v-progress-circular indeterminate size="48"></v-progress-circular>
          </v-col>
        </v-row>

        <v-row v-else class="category-card-row">
          <v-col v-for="cat in categories" :key="cat.id" cols="12" sm="6" md="4" lg="3" class="category-card-col">
            <v-card class="category-card" :class="{ 'category-card--expanded': openCategoryPanel[cat.id] === 0 }" elevation="3" hover>
              <div class="category-card-top" @click="selectCategory(cat)">
                <v-img :src="categoryImage(cat)" height="140" cover />
                <v-card-title class="category-title">
                  <v-icon start size="20">{{ cat.icon || 'mdi-briefcase' }}</v-icon>
                  {{ cat.name }}
                </v-card-title>
              </div>

              <div class="category-card-spacer"></div>

              <v-card-text class="category-sub pa-0">
                <v-expansion-panels
                  flat
                  v-model="openCategoryPanel[cat.id]"
                  @update:modelValue="onCategoryPanelChange(cat.id, $event)"
                >
                  <v-expansion-panel>
                    <v-expansion-panel-title class="text-body-2">
                      {{ cat.subcategories?.length || 0 }} services
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                      <v-list density="compact" class="pa-0 subcategory-list">
                        <v-list-item
                          v-for="sub in cat.subcategories"
                          :key="sub.id"
                          class="text-body-2 subcategory-item"
                          @click="selectSubcategory(cat.id, sub.id)"
                        >
                          <template #prepend>
                            <v-icon size="16" class="me-2">mdi-chevron-right</v-icon>
                          </template>
                          <div class="subcategory-text">{{ sub.name }}</div>
                        </v-list-item>
                      </v-list>
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script setup lang="ts">
import ProviderCard from "~/components/directory/ProviderCard.vue";
import { usePublicDirectory } from "~/composables/usePublicDirectory";
import { useLocations } from "~/composables/useLocations";

const { categories, providers, total, loadingCategories, loadingProviders, fetchCategories, searchProviders } = usePublicDirectory();
const { provinces, districts, fetchProvinces, fetchDistrictsByProvince, resetDistricts } = useLocations();

const hasSearched = ref(false);
const page = ref(1);
const pageSize = ref(12);
const maxKnownTotalPages = ref<number | null>(null);

const filters = ref({
  q: "",
  category: null as number | null,
  subcategory: null as number | null,
  province: null as string | null,
  district: null as string | null,
  sort: "most_recent" as any,
});

const categoriesScrollTarget = ref<HTMLElement | null>(null);
const filtersSection = ref<HTMLElement | null>(null);

const openCategoryPanel = ref<Record<number, number | null>>({});

const onCategoryPanelChange = (catId: number, val: any) => {
  Object.keys(openCategoryPanel.value).forEach(k => {
    const id = Number(k);
    if (id !== catId) openCategoryPanel.value[id] = null;
  });

  openCategoryPanel.value[catId] = (val === 0 ? 0 : null);
};

const scrollToCategories = async () => {
  await nextTick();

  requestAnimationFrame(() => {
    if (categoriesScrollTarget.value) {
      categoriesScrollTarget.value.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
};

onMounted(async () => {
  await Promise.all([fetchCategories(), fetchProvinces("en")]);
  categories.value.forEach((c: any) => {
    if (openCategoryPanel.value[c.id] === undefined) openCategoryPanel.value[c.id] = null;
  });

  // Auto-scroll to filters section
  await nextTick();
  setTimeout(() => {
    if (filtersSection.value) {
      filtersSection.value.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, 300);
});

watch(
  () => loadingCategories.value,
  async (isLoading, wasLoading) => {
    if (wasLoading === true && isLoading === false) {
      categories.value.forEach((c: any) => {
        if (openCategoryPanel.value[c.id] === undefined) openCategoryPanel.value[c.id] = null;
      });
    }
  }
);

const categoryItems = computed(() =>
  categories.value.map(c => ({ title: c.name, value: c.id }))
);

const subcategoryItems = computed(() => {
  const cat = categories.value.find(c => c.id === filters.value.category);
  const subs = cat?.subcategories || [];
  return subs.map(s => ({ title: s.name, value: s.id }));
});

const provinceItems = computed(() =>
  provinces.value.map(p => ({ title: p.province_en || p.province_code, value: p.province_code }))
);

const districtItems = computed(() =>
  districts.value.map(d => ({ title: d.district_en || d.district_code, value: d.district_code }))
);

const sortItems = [
  { title: "Featured", value: "featured" },
  { title: "Highest rated", value: "highest_rated" },
  { title: "Most recent", value: "most_recent" },
  { title: "Nearest province match", value: "nearest" },
];

const totalPages = computed(() => {
  const t = total.value || 0;
  return Math.max(1, Math.ceil(t / pageSize.value));
});

const effectiveTotalPages = computed(() => {
  const base = totalPages.value;
  if (maxKnownTotalPages.value == null) return base;
  return Math.max(1, Math.min(base, maxKnownTotalPages.value));
});

const categoryImage = (cat: any) => {
  const img = cat?.subcategories?.find((s: any) => s.img_url)?.img_url;
  return img || "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=1200&q=60";
};

const selectCategory = (cat: any) => {
  filters.value.category = cat.id;
  filters.value.subcategory = null;
  // Scroll to top to see filters
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const selectSubcategory = (categoryId: number, subcategoryId: number) => {
  filters.value.category = categoryId;
  filters.value.subcategory = subcategoryId;
  // Scroll to top to see filters
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const onProvinceChange = async () => {
  filters.value.district = null;
  resetDistricts();
  if (filters.value.province) {
    await fetchDistrictsByProvince(filters.value.province, "en");
  }
};

const applyFilters = async () => {
  hasSearched.value = true;

  const baseParams = {
    q: filters.value.q || undefined,
    category_id: filters.value.category,
    subcategory_id: filters.value.subcategory,
    province_code: filters.value.province,
    district_code: filters.value.district,
    sort: filters.value.sort,
    page_size: pageSize.value,
    lan: "en",
  };

  await searchProviders({
    ...baseParams,
    page: page.value,
  });

  if (page.value > 1 && providers.value.length === 0) {
    const fallbackPage = Math.max(1, page.value - 1);
    maxKnownTotalPages.value = fallbackPage;
    page.value = fallbackPage;

    await searchProviders({
      ...baseParams,
      page: page.value,
    });
  }

  if (providers.value.length > 0 && providers.value.length < pageSize.value) {
    maxKnownTotalPages.value = page.value;
  }
};

watch(pageSize, () => {
  page.value = 1;
  maxKnownTotalPages.value = null;
  if (hasSearched.value) applyFilters();
});

const resetFilters = () => {
  filters.value = { q: "", category: null, subcategory: null, province: null, district: null, sort: "most_recent" };
  resetDistricts();
  providers.value = [];
  total.value = 0;
  hasSearched.value = false;
  page.value = 1;
  maxKnownTotalPages.value = null;
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const goToProvider = (id: number) => {
  navigateTo(`/directory/provider/${id}`);
};

useSeoMeta({
  title: "Public Directory - PPA",
  description: "Search verified service providers across Sri Lanka using filters.",
});
</script>

<style scoped>
.hero-section {
  padding: 2.5rem 0 1rem 0;
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
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

:root {
  --dir-card-height: 420px;
  --dir-card-img-height: 150px;
  --category-card-height: 320px;
}
@media (max-width: 1264px) {
  :root {
    --dir-card-height: 420px;
    --dir-card-img-height: 150px;
    --category-card-height: 320px;
  }
}
@media (max-width: 960px) {
  :root {
    --dir-card-height: 410px;
    --dir-card-img-height: 150px;
    --category-card-height: 310px;
  }
}
@media (max-width: 600px) {
  :root {
    --dir-card-height: auto;
    --dir-card-img-height: 160px;
    --category-card-height: 300px;
  }
}

.equal-card-row > :deep(.v-col) {
  display: flex;
}

.category-card-row {
  align-items: stretch;
}
.category-card-row > :deep(.v-col) {
  display: flex;
}

.category-card-col {
  display: flex;
  position: relative;
  z-index: 1;
}
.category-card-col:has(.category-card--expanded) {
  z-index: 10;
}
.category-card {
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: var(--category-card-height);

  border-radius: 16px;
  overflow: hidden;
  background-color: rgb(var(--v-theme-service-card-bg));
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.category-card:hover {
  transform: translateY(-6px);
}

.category-card-top {
  flex-shrink: 0;
}

.category-card-spacer {
  flex: 1 1 auto;
}

.category-title {
  font-weight: 700;
  color: rgb(var(--v-theme-section-title));
  word-wrap: break-word;
  white-space: normal;
  overflow-wrap: break-word;
  line-height: 1.2;
  min-height: 56px;
  display: flex;
  align-items: flex-start;
  gap: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.category-sub {
  color: rgb(var(--v-theme-section-subtitle));
  position: relative;
  flex-shrink: 0;
  margin-top: auto;
}

.category-card :deep(.v-expansion-panels) {
  background: transparent;
  border-radius: 0;
}

.category-card :deep(.v-expansion-panel) {
  background-color: rgb(var(--v-theme-service-card-bg));
}

.category-card :deep(.v-expansion-panel-text__wrapper) {
  max-height: 220px;
  overflow-y: auto;
}

.subcategory-list {
  background: transparent !important;
}

.filters-card {
  border-radius: 16px;
  background-color: rgb(var(--v-theme-service-card-bg));
  position: sticky;
  top: 88px;
  max-height: calc(100vh - 100px);
  overflow-y: auto;
}

.filters-col {
  align-self: flex-start;
}

.filters-title {
  font-weight: 800;
  color: rgb(var(--v-theme-section-title));
}
.apply-btn {
  border-radius: 12px;
}
.results-header {
  background: transparent;
}

.provider-card-col {
  display: flex;
}
.provider-card-col :deep(.v-card) {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;

  height: var(--dir-card-height);
  min-height: 0;
}
@media (max-width: 600px) {
  .provider-card-col :deep(.v-card) {
    height: auto;
  }
}

.subcategory-item {
  align-items: flex-start !important;
  padding: 8px 0 !important;
}

.subcategory-text {
  word-wrap: break-word;
  word-break: break-word;
  white-space: normal;
  line-height: 1.4;
  overflow-wrap: break-word;
}

.categories-scroll-target {
  scroll-margin-top: 88px;
}
</style>
