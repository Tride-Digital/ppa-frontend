<template>
  <v-dialog v-model="showModal" max-width="600px" persistent>
    <v-card class="cart-modal">
      <v-card-title class="cart-header">
        <div class="header-content">
          <div class="header-left">
            <v-icon class="mr-3" size="28">mdi-cart</v-icon>
            <span class="cart-title">Your Selected Services</span>
          </div>
          <v-btn icon variant="outlined" @click="closeModal" class="close-btn">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </v-card-title>
      <v-card-text class="cart-content">
        <div v-if="cartItems.length === 0" class="empty-cart">
          <v-icon size="64" color="grey-lighten-1" class="mb-4">mdi-cart-outline</v-icon>
          <h3 class="text-h6 mb-2">Your cart is empty</h3>
          <p class="text-body-2 text-medium-emphasis">Add some services to get started!</p>
        </div>
        <div v-else>
          <v-list class="cart-items-list">
            <v-list-item v-for="(item, index) in cartItems" :key="index" class="cart-item">
              <template v-slot:prepend>
                <v-avatar size="48" class="service-avatar">
                  <v-icon size="24" color="primary-darken-1">mdi-leaf</v-icon>
                </v-avatar>
              </template>
              <v-list-item-title class="service-name">{{ item.name }}</v-list-item-title>
              <v-list-item-subtitle class="service-category">{{ item.category }}</v-list-item-subtitle>
              <template v-slot:append>
                <v-btn icon size="small" color="error" variant="text" @click="removeFromCart(index)" class="remove-btn">
                  <v-icon size="20">mdi-delete</v-icon>
                </v-btn>
              </template>
            </v-list-item>
          </v-list>
          <v-divider class="my-4"></v-divider>
          <div class="cart-summary">
            <div class="summary-item">
              <span class="summary-label">Total Services:</span>
              <span class="summary-value">{{ cartItems.length }}</span>
            </div>
          </div>
        </div>
      </v-card-text>
      <v-card-actions class="cart-actions" v-if="cartItems.length > 0">
        <v-btn variant="outlined" @click="closeModal" class="continue-btn">
          Continue Shopping
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary-darken-1" variant="flat" size="large" @click="proceedToCheckout" class="checkout-btn">
          <v-icon left>mdi-check</v-icon>
          Proceed to Checkout
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  cartItems: {
    type: Array,
    default: () => []
  }
})
const emit = defineEmits(['update:modelValue', 'remove-item', 'checkout'])
const showModal = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})
const closeModal = () => {
  showModal.value = false
}
const removeFromCart = (index) => {
  emit('remove-item', index)
}
const proceedToCheckout = () => {
  emit('checkout')
  closeModal()
}
</script>

<style scoped>
.cart-modal {
  border-radius: 16px !important;
}
.cart-header {
  background: rgb(var(--v-theme-primary-darken-1));
  color: rgb(var(--v-theme-surface));
  padding: 20px 24px;
}
.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.header-left {
  display: flex;
  align-items: center;
}
.cart-title {
  font-size: 1.25rem;
  font-weight: 600;
}
.close-btn {
  color: rgb(var(--v-theme-text)) !important;
}
.cart-content {
  padding: 24px;
  max-height: 400px;
  overflow-y: auto;
}
.empty-cart {
  text-align: center;
  padding: 40px 20px;
}
.cart-items-list {
  background: transparent;
}
.cart-item {
  border-radius: 12px;
  margin-bottom: 8px;
  background: rgba(var(--v-theme-primary-rgb), 0.05);
  border: 1px solid rgba(var(--v-theme-primary-rgb), 0.1);
}
.service-avatar {
  background: rgba(var(--v-theme-primary-rgb), 0.1) !important;
}
.service-name {
  font-weight: 600;
  font-size: 0.95rem;
}
.service-category {
  color: rgb(var(--v-theme-primary-darken-1));
  font-weight: 500;
  font-size: 0.85rem;
}
.remove-btn {
  opacity: 0.7;
  transition: opacity 0.2s ease;
}

.remove-btn:hover {
  opacity: 1;
}
.cart-summary {
  background: rgba(var(--v-theme-primary-rgb), 0.05);
  border-radius: 12px;
  padding: 16px;
}
.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.summary-label {
  font-weight: 600;
  color: rgb(var(--v-theme-on-surface));
}
.summary-value {
  font-weight: 700;
  color: rgb(var(--v-theme-on-surface));
  font-size: 1.1rem;
}
.cart-actions {
  padding: 20px 24px;
  background: rgba(var(--v-theme-surface-variant-rgb), 0.3);
}
.continue-btn {
  text-transform: none;
  font-weight: 500;
}
.checkout-btn {
  text-transform: none;
  font-weight: 600;
  border-radius: 8px;
}
.cart-content::-webkit-scrollbar {
  width: 6px;
}
.cart-content::-webkit-scrollbar-track {
  background: rgba(var(--v-theme-on-surface-rgb), 0.1);
  border-radius: 3px;
}
.cart-content::-webkit-scrollbar-thumb {
  background: rgba(var(--v-theme-primary-rgb), 0.3);
  border-radius: 3px;
}
.cart-content::-webkit-scrollbar-thumb:hover {
  background: rgba(var(--v-theme-primary-rgb), 0.5);
}
@media (max-width: 600px) {
  .cart-modal {
    max-width: 98vw !important;
    min-width: 0 !important;
    border-radius: 10px !important;
  }
  .cart-header,
  .cart-actions {
    padding: 14px 10px;
  }
  .cart-content {
    padding: 14px 6px;
    max-height: 60vh;
  }
  .cart-title {
    font-size: 1.05rem;
  }
  .service-name {
    font-size: 0.9rem;
  }
  .service-category {
    font-size: 0.8rem;
  }
  .cart-summary {
    padding: 10px;
  }
  .checkout-btn,
  .continue-btn {
    width: 100%;
    margin-top: 8px;
  }
  .cart-actions {
    flex-direction: column;
    gap: 8px;
  }
}
</style>