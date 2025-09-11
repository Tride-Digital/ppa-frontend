<template>
  <v-btn icon @click="toggleCart" class="cart-nav-button" :class="{ 'has-items': cartCount > 0 }">
    <v-badge v-if="cartCount > 0" :content="cartCount" color="error" overlap offset-x="-8" offset-y="-8" location="top end">
      <v-icon>mdi-cart</v-icon>
    </v-badge>
    <v-icon v-else>mdi-cart</v-icon>
  </v-btn>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  cartItems: {
    type: Array,
    default: () => []
  }
})
const emit = defineEmits(['toggle-cart', 'cart-click'])
const cartCount = computed(() => props.cartItems.length)
const toggleCart = () => {
  emit('toggle-cart')
  emit('cart-click')
}
</script>

<style scoped>
.cart-nav-button {
  color: rgb(var(--v-theme-navtext)) !important;
  transition: all 0.3s ease;
  border-radius: 50%;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cart-nav-button:hover {
  background-color: rgba(var(--v-theme-primary-rgb), 0.1);
}
.cart-nav-button .v-icon {
  color: inherit !important;
}
.cart-nav-button :deep(.v-badge__badge) {
  min-width: 18px !important;
  height: 18px !important;
  font-size: 11px !important;
  font-weight: 600 !important;
}
</style>