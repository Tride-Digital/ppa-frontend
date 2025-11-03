<template>
  <section class="products-section py-10">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" class="text-center">
          <h2 class="section-title">Our Services</h2>
          <p class="section-subtitle">{{ sectionDescription }}</p>
        </v-col>
      </v-row>
      <v-row v-if="loading" justify="center" class="mb-8">
        <v-col cols="12" class="text-center">
          <v-progress-circular indeterminate color="primary" size="50"></v-progress-circular>
          <p class="mt-4">Loading services...</p>
        </v-col>
      </v-row>
      <v-row v-else-if="error" justify="center" class="mb-8">
        <v-col cols="12" class="text-center">
          <v-alert type="error" variant="tonal">
            Failed to load services. Please try again later.
          </v-alert>
        </v-col>
      </v-row>
      <v-row v-else justify="center" class="mb-8">
        <v-col cols="12">
          <nav class="services-nav">
            <div class="nav-container">
              <div v-for="(navItem, index) in navigationItems" :key="index" class="nav-item-wrapper">
                <div class="nav-item" :class="{ active: activeCategory === index }" @click="selectCategory(index)">
                  <v-icon class="nav-icon" :color="navtext">{{ navItem.icon }}</v-icon>
                  <span class="nav-text">{{ navItem.label }}</span>
                </div>
              </div>
            </div>
          </nav>
        </v-col>
      </v-row>
      <v-row v-if="activeCategory !== -1 && !loading">
        <v-col v-for="(subItem, subIndex) in navigationItems[activeCategory]?.subItems" :key="subIndex" cols="12" sm="6" md="4" lg="3" class="mb-6">
          <ServiceCard :service="subItem" :category-label="navigationItems[activeCategory].label" @service-click="handleServiceClick" @learn-more="learnMoreService" @add-to-cart="addToCartHandler"/>
        </v-col>
      </v-row>
      <v-row v-else-if="!loading">
        <v-col cols="12" class="text-center py-10">
          <div class="no-selection">
            <v-icon size="64" color="primary" class="mb-4">mdi-hand-pointing-up</v-icon>
            <h3 class="text-h5 mb-2">Select a Service Category</h3>
            <p class="text-body-1 text-medium-emphasis">
              Choose a category above to explore our comprehensive range of services
            </p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ServiceCard from './ServiceCard.vue'
import { useCart } from '~/composables/useCart'
import { useServices } from '~/composables/useServices'
const route = useRoute()
const router = useRouter()
const { addToCart } = useCart()
const {
  loading, 
  error, 
  fetchAllServices, 
  transformServiceCategories,
  getServiceIdByName 
} = useServices()

const sectionDescription = ref('Discover the diverse range of high-quality services offered by our plantation experts across Sri Lanka')
const activeCategory = ref(-1)
const navigationItems = ref([])

onMounted(async () => {
  const data = await fetchAllServices()
  if (data && data.length > 0) {
    navigationItems.value = transformServiceCategories(data)
    const categoryParam = route.query.category
    if(categoryParam !== undefined){
      const categoryIndex = parseInt(categoryParam)
      if(categoryParam >= 0 && categoryParam < navigationItems.value.length){
        activeCategory.value = categoryIndex
      }
      else {
        activeCategory.value = 0
      }
    }
    else {
      activeCategory.value = 0
    }
  }
})
const selectCategory = (index) => {
  const newCategory = activeCategory.value === index ? -1 : index
  activeCategory.value = newCategory
  if (newCategory !== -1) {
    router.replace({ query: { category: newCategory }})
  }
  else {
    router.replace({ query: {} })
  }
}
const handleServiceClick = (category, service) => {
}
const learnMoreService = (service) => {
  const serviceId = service.id || getServiceIdByName(service.name)
  if (serviceId) {
    navigateTo(`/service/${serviceId}?category=${activeCategory.value}`)
  }
}
const addToCartHandler = (category, service) => {
  addToCart(category, service)
}
</script>

<style scoped>
.products-section {
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
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}
.services-nav {
  background: linear-gradient(135deg, rgb(var(--v-theme-services-nav-bg-start)) 0%, rgb(var(--v-theme-services-nav-bg-end)) 100%);
  border-radius: 20px;
  padding: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
.nav-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}
.nav-item-wrapper {
  position: relative;
  display: inline-block;
}
.nav-item {
  display: flex;
  align-items: center;
  padding: 18px 20px;
  background: rgb(var(--v-theme-services-nav-item-bg));
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.05);
  min-width: 150px;
  justify-content: center;
  color: rgb(var(--v-theme-on-surface));
}
.nav-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  background: linear-gradient(135deg, rgb(var(--v-theme-primary)) 0%, rgb(var(--v-theme-primary-darken-1)) 100%);
  color: rgb(var(--v-theme-on-primary));
}
.nav-item.active {
  background: linear-gradient(135deg, rgb(var(--v-theme-primary)) 0%, rgb(var(--v-theme-primary-darken-1)) 100%);
  color: rgb(var(--v-theme-on-primary));
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgb(var(--v-theme-services-nav-item-shadow-hover));
}
.nav-icon {
  font-size: 1.5rem !important;
  margin-right: 12px;
  transition: color 0.3s ease;
}
.nav-text {
  font-weight: 600;
  font-size: 1rem;
  white-space: nowrap;
}
.no-selection {
  padding: 2rem;
}
.no-selection h3 {
  color: rgb(var(--v-theme-section-title));
}
.no-selection p {
  color: rgb(var(--v-theme-section-subtitle));
}
@media (max-width: 1200px) {
  .nav-container {
    justify-content: center;
  }
  .nav-item {
    min-width: 130px;
    padding: 16px 18px;
  }
  .nav-text {
    font-size: 0.9rem;
  }
  .nav-icon {
    font-size: 1.3rem;
  }
}
@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }
  .section-subtitle {
    font-size: 1rem;
  }
  .nav-container {
    gap: 12px;
  }
  .nav-item {
    flex-direction: column;
    padding: 12px;
    min-width: 100px;
  }
  .nav-icon {
    margin-right: 0;
    margin-bottom: 6px;
    font-size: 1.4rem;
  }
  .nav-text {
    font-size: 0.85rem;
  }
}
@media (max-width: 480px) {
  .section-title {
    font-size: 1.8rem;
  }
  .section-subtitle {
    font-size: 0.9rem;
  }
  .services-nav {
    padding: 8px;
  }
  .nav-item {
    padding: 10px;
    min-width: 80px;
  }
  .nav-text {
    font-size: 0.8rem;
  }
  .nav-icon {
    font-size: 1.2rem;
  }
}
</style>