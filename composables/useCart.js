import { ref, watch } from 'vue'

const cartItems = ref([])
const showCartModal = ref(false)

export const useCart = () => {
  if (process.client && cartItems.value.length === 0) {
    const savedCart = localStorage.getItem('cartItems')
    if (savedCart) {
      cartItems.value = JSON.parse(savedCart)
    }
  }
  if (process.client) {
    watch(cartItems, (newCart) => {
      localStorage.setItem('cartItems', JSON.stringify(newCart))
    }, { deep: true })
  }
  const addToCart = (category, service) => {
    const existingItem = cartItems.value.find(item => item.name === service.name)
    
    if (!existingItem) {
      cartItems.value.push({
        ...service,
        category: category,
        id: service.id
      })
    } else {
      // Handle case when item already exists (you can add logic here if needed)
    }
  }

  const removeFromCart = (index) => {
    cartItems.value.splice(index, 1)
  }

  const clearCart = () => {
    cartItems.value = []
    if (process.client) {
      localStorage.removeItem('cartItems')
    }
  }

  const toggleCartModal = () => {
    showCartModal.value = !showCartModal.value
  }

  const openCartModal = () => {
    showCartModal.value = true
  }

  const closeCartModal = () => {
    showCartModal.value = false
  }

  return {
    cartItems,
    showCartModal,
    addToCart,
    removeFromCart,
    clearCart,
    toggleCartModal,
    openCartModal,
    closeCartModal
  }
}