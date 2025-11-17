import { ref, watch } from 'vue'
import type { Ref } from 'vue'

interface CartItem {
  id: string | number
  name: string
  category: string
  itemType: 'service' | 'director'
  [key: string]: any
}

interface Service {
  id?: string | number
  name: string
  itemType?: 'director' | string
  [key: string]: any
}

const cartItems: Ref<CartItem[]> = ref([])
const showCartModal = ref(false)

export const useCart = () => {
  if (process.client && cartItems.value.length === 0) {
    const savedCart = localStorage.getItem('cartItems')
    if (savedCart) {
      try {
        cartItems.value = JSON.parse(savedCart)
      } catch (e) {
        cartItems.value = []
      }
    }
  }

  if (process.client) {
    watch(
      cartItems,
      (newCart) => {
        localStorage.setItem('cartItems', JSON.stringify(newCart))
      },
      { deep: true }
    )
  }

  /**
   * Add item to cart.
   */
  const addToCart = (category: string, service: Service): void => {
    if (!service || !service.name) return

    const existingItem = cartItems.value.find(item => item.name === service.name)

    if (!existingItem) {
      const itemType: 'service' | 'director' = 
        service?.itemType === 'director' ? 'director' : 'service'

      cartItems.value.push({
        ...service,
        category,
        id: service.id || '', 
        itemType,           
      } as CartItem)
    } else {
    }
  }

  const removeFromCart = (index: number): void => {
    cartItems.value.splice(index, 1)
  }

  const clearCart = (): void => {
    cartItems.value = []
    if (process.client) {
      localStorage.removeItem('cartItems')
    }
  }

  const toggleCartModal = (): void => {
    showCartModal.value = !showCartModal.value
  }

  const openCartModal = (): void => {
    showCartModal.value = true
  }

  const closeCartModal = (): void => {
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
    closeCartModal,
  }
}