<template>
  <section class="products-section py-10">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" class="text-center mb-12">
          <h2 class="section-title">Our Agricultural Products</h2>
          <p class="section-subtitle"> {{ sectionDescription }}</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-for="product in products" :key="product.id" cols="12" sm="6" md="4" lg="3" class="mb-6">
          <v-card class="product-card h-100" elevation="4" hover @click="handleProductClick(product)">
            <v-img :src="product.image" :alt="product.name" height="200" cover class="product-image">
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="primary"></v-progress-circular>
                </v-row>
              </template>
            </v-img>
            <v-card-title class="product-name">{{ product.name }}</v-card-title>
            <v-card-subtitle class="product-subtitle">{{ product.subtitle }}</v-card-subtitle>
            <v-card-text class="product-description">{{ product.description }}</v-card-text>
            <v-card-actions>
              <v-btn variant="text" color="primary" size="small" @click.stop="learnMore(product)">Learn More
                <v-icon right>mdi-arrow-right</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup>
import { ref } from 'vue'
const sectionDescription = ref('Discover the diverse range of high-quality crops cultivated by our plantation members across Sri Lanka')
const products = ref([
  {
    id: 1,
    name: 'Tea',
    subtitle: 'Camellia sinensis',
    description: 'Premium Ceylon tea cultivated in the highlands of Sri Lanka.',
    image: '/images/products/tea.webp'
  },
  {
    id: 2,
    name: 'Rubber',
    subtitle: 'Hevea brasiliensis',
    description: 'High-quality natural rubber for industrial applications.',
    image: '/images/products/rubber.webp'
  },
  {
    id: 3,
    name: 'Coconut',
    subtitle: 'Cocos nucifera',
    description: 'Fresh coconuts harvested from sustainable plantations.',
    image: '/images/products/coconuts.webp'
  },
  {
    id: 4,
    name: 'Cinnamon',
    subtitle: 'Cinnamomum verum',
    description: 'Authentic Ceylon cinnamon with distinctive flavor and aroma.',
    image: '/images/products/cinnamon.webp'
  },
  {
    id: 5,
    name: 'Coffee',
    subtitle: 'Coffea arabica',
    description: 'Specialty coffee beans grown in ideal mountain conditions.',
    image: '/images/products/coffee.webp'
  },
  {
    id: 6,
    name: 'Cloves',
    subtitle: 'Syzygium aromaticum',
    description: 'Premium quality cloves for culinary and medicinal use.',
    image: '/images/products/cloves.webp'
  },
  {
    id: 7,
    name: 'Cardamom',
    subtitle: 'Elettaria cardamomum',
    description: 'Traditional arecanut cultivated using sustainable methods.',
    image: '/images/products/cardamom.webp'
  },
  {
    id: 8,
    name: 'Black Pepper',
    subtitle: 'Piper nigrum',
    description: 'The king of spices with intense flavor and aroma.',
    image: '/images/products/black_pepper.webp'
  },
])
const handleProductClick = (product) => {
  console.log('Product clicked:', product.name)
}
const learnMore = (product) => {
  console.log('Learn more about:', product.name)
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
.product-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 12px;
  overflow: hidden;
}
.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px rgb(var(--v-theme-product-card-shadow));
}
.product-image {
  transition: transform 0.3s ease;
}
.product-card:hover .product-image {
  transform: scale(1.05);
}
.product-name {
  font-size: 1.3rem;
  font-weight: 600;
  color: rgb(var(--v-theme-section-title));
  padding-bottom: 0;
}
.product-subtitle {
  font-style: italic;
  color: rgb(var(--v-theme-section-subtitle));
  font-size: 0.9rem;
}
.product-description {
  color: rgb(var(--v-theme-product-description));
  font-size: 0.95rem;
  line-height: 1.5;
  padding-top: 0;
}
:deep(.v-card-actions) {
  padding-top: 0;
}
:deep(.v-btn) {
  text-transform: none;
  font-weight: 500;
}
@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }
  .section-subtitle {
    font-size: 1rem;
  }
}
@media (max-width: 480px) {
  .section-title {
    font-size: 1.8rem;
  }
  .section-subtitle {
    font-size: 0.9rem;
  }
}
</style>