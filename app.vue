<template>
  <GoogleTranslate />
  <v-app >
      <AppNavBar />
    <v-main>
        <NuxtPage />
    </v-main>
    <AppFooter />
    <CartButton :cart-items="cartItems" @toggle-cart="handleToggleCart" @cart-click="handleCartClick"/>
    <CartModal v-model="showCartModal" :cart-items="cartItems" @remove-item="removeFromCart" @checkout="goToCheckout"/>
    <Chatbot/>
  </v-app>
</template>

<script setup>
import AppNavBar from '~/components/AppNavBar.vue';
import AppFooter from '~/components/AppFooter.vue';
import CartButton from '~/components/cart/CartButton.vue';
import CartModal from '~/components/cart/CartModal.vue';
import { useCart } from '~/composables/useCart';
import { navigateTo } from 'nuxt/app';
import Chatbot from "~/components/chatbot.vue";

const { 
  cartItems, 
  showCartModal, 
  removeFromCart, 
  toggleCartModal, 
  openCartModal 
} = useCart();
const handleToggleCart = () => {
  toggleCartModal()
}
const handleCartClick = () => {
  openCartModal()
}
const goToCheckout = () => {
  if (cartItems.value.length > 0) {
    navigateTo('/checkout')
  }
}
</script>

<style scoped>
/* Optional: Add some scoped styles for the layout if needed */
</style>
