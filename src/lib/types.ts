export interface FoodItem {
    id: string
    name: string
    description: string
    price: number
    image: string
    category: string
    rating: number
    cookTime: string
    isPopular?: boolean
  }
  
  export interface CartItem extends FoodItem {
    quantity: number
  }
  
  export interface User {
    id: string
    name: string
    email: string
    phone: string
    address: string
  }
  
  export interface CheckoutData {
    deliveryOption: "delivery" | "pickup"
    address: string
    paymentMethod: "card" | "cash"
    total: number
    deliveryFee: number
    tax: number
    subtotal: number
  }
  
  export interface AuthContextType {
    user: User | null
    isLoading: boolean
    login: (email: string, password: string) => Promise<void>
    signup: (name: string, email: string, password: string) => Promise<void>
    logout: () => void
  }
  