<template>
  <div v-if="isMobile" class="cart-button-container">
    <v-btn icon size="large" class="cart-button" elevation="8" @click="toggleCart">
      <v-badge v-if="cartCount > 0" :content="cartCount" color="error" overlap offset-x="-8" offset-y="-2" location="top end">
        <v-icon size="28">mdi-cart</v-icon>
      </v-badge>
      <v-icon v-else size="28">mdi-cart</v-icon>
    </v-btn>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useDisplay } from 'vuetify'
const { xs, sm } = useDisplay()
const isMobile = computed(() => xs.value || sm.value)
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
.cart-button-container {
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 9999;
  pointer-events: none;
}
.cart-button {
  pointer-events: all;
  background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%) !important;
  color: white !important;
  box-shadow: 0 8px 24px rgba(25, 118, 210, 0.3) !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  width: 56px !important;
  height: 56px !important;
  border-radius: 50% !important;
}
.cart-button:hover {
  transform: scale(1.1) !important;
  box-shadow: 0 12px 32px rgba(25, 118, 210, 0.4) !important;
}
.cart-button:active {
  transform: scale(0.95) !important;
}
.cart-button .v-icon {
  color: white !important;
}
.cart-button :deep(.v-badge__badge) {
  min-width: 16px !important;
  height: 16px !important;
  font-size: 11px !important;
  font-weight: 600 !important;
}
@media (max-width: 480px) {
  .cart-button-container {
    top: 12px;
    right: 12px;
  }
  .cart-button {
    width: 48px !important;
    height: 48px !important;
  }
  .cart-button .v-icon {
    font-size: 20px !important;
  }
  .cart-button :deep(.v-badge__badge) {
    min-width: 16px !important;
    height: 16px !important;
    font-size: 10px !important;
  }
}
</style>