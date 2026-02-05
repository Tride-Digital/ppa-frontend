<template>
  <v-card class="service-card h-100" elevation="4" hover @click="handleServiceClick">
    <div class="card-image-container">
      <v-img :src="service.image" :alt="service.name" height="200" cover class="card-image">
        <template v-slot:placeholder>
          <div class="d-flex align-center justify-center fill-height">
            <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
          </div>
        </template>
      </v-img>
      <div class="image-overlay">
        <v-chip size="small" color="primary" variant="elevated" class="category-chip">
          {{ categoryLabel }}
        </v-chip>
      </div>
    </div>
    <v-card-title class="service-name">{{ service.name }}</v-card-title>
    <v-card-text class="service-description">
      {{ service.shortDescription }}
    </v-card-text>
    <v-card-actions class="card-actions">
      <v-btn variant="outlined" color="primary" size="small" @click="handleLearnMore">
        Learn More
        <v-icon right>mdi-arrow-right</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn variant="outlined" color="primary" size="small" @click.stop="handleAddToCart" class="add-to-cart-btn">
        <v-icon left>mdi-cart-plus</v-icon>
        Add to Cart
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
const props = defineProps({
  service: { type: Object, required: true},
  categoryLabel: { type: String, required: true}
})
const emit = defineEmits(['service-click', 'learn-more', 'add-to-cart'])
const handleServiceClick = () => {
  emit('service-click', props.categoryLabel, props.service.name)
}
const handleLearnMore = () => {
  const serviceId = props.service.id
  if (serviceId) {
    navigateTo(`/service/${serviceId}`)
  }
}
const handleAddToCart = () => {
  emit('add-to-cart', props.categoryLabel, props.service)
}
</script>

<style scoped>
.service-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  background-color: rgb(var(--v-theme-service-card-bg));
}
.service-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px rgb(var(--v-theme-card-shadow-hover));
}
.card-image-container {
  position: relative;
  overflow: hidden;
}
.card-image {
  transition: transform 0.3s ease;
}
.service-card:hover .card-image {
  transform: scale(1.05);
}
.image-overlay {
  position: absolute;
  top: 12px;
  right: 12px;
}
.category-chip {
  backdrop-filter: blur(10px);
  background-color: rgba(var(--v-theme-primary), 0.9) !important;
  color: rgb(var(--v-theme-on-primary)) !important;
}
.service-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: rgb(var(--v-theme-section-title));
  padding-bottom: 8px;
  line-height: 1.3;
}
.service-description {
  color: rgb(var(--v-theme-section-subtitle));
  font-size: 0.95rem;
  line-height: 1.5;
  padding-top: 0;
}
.card-actions {
  padding: 16px;
  gap: 8px;
  background-color: rgb(var(--v-theme-service-card-bg));
}
.add-to-cart-btn {
  text-transform: none;
  font-weight: 500;
}
:deep(.v-card) {
  background-color: rgb(var(--v-theme-service-card-bg)) !important;
}
:deep(.v-card-title) {
  color: rgb(var(--v-theme-section-title)) !important;
}
:deep(.v-card-text) {
  color: rgb(var(--v-theme-section-subtitle)) !important;
}
:deep(.v-card-actions) {
  padding-top: 8px;
  background-color: rgb(var(--v-theme-service-card-bg)) !important;
}
:deep(.v-btn) {
  text-transform: none;
  font-weight: 500;
}
:deep(.v-btn--variant-text) {
  color: rgb(var(--v-theme-navtext)) !important;
}
:deep(.v-btn--variant-outlined) {
  color: rgb(var(--v-theme-navtext)) !important;
  border-color: rgb(var(--v-theme-navtext)) !important;
}
:deep(.v-btn--variant-outlined:hover) {
  background-color: rgba(var(--v-theme-navtext), 0.1) !important;
}
:deep(.v-btn .v-icon) {
  color: inherit !important;
}
@media (max-width: 768px) {
  .card-image {
    height: 160px;
  }
  .card-actions {
    flex-direction: column;
    gap: 8px;
  }
  .card-actions .v-btn {
    width: 100%;
  }
  .card-actions .v-spacer {
    display: none;
  }
}
@media (max-width: 480px) {
  .card-image {
    height: 140px;
  }
}
</style>