import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { productImages } from '@/lib/productImages';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: 'blush' | 'lips' | 'face' | 'eyes' | 'tools';
  shades?: string[];
  features: string[];
  ingredients?: string[];
  howToUse?: string;
  isNew?: boolean;
  isBestseller?: boolean;
  rating?: number;
  reviews?: number;
}

export interface CartItem extends Product {
  quantity: number;
  selectedShade?: string;
}

interface ProductStore {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  filters: {
    category: string;
    priceRange: [number, number];
    sortBy: 'name' | 'price' | 'rating' | 'newest';
  };
  searchQuery: string; // Added searchQuery to the store
  initializeUserData: (userId: string) => void;
  clearUserData: () => void;
  addToCart: (product: Product, shade?: string) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (id: string) => void;
  setFilters: (filters: Partial<ProductStore['filters']>) => void;
  setSearchQuery: (query: string) => void; // Added setSearchQuery action
  getFilteredProducts: () => Product[];
  getTotalPrice: () => number;
  getCartCount: () => number;
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Soft Pinch Liquid Blush',
    description: 'A weightless, long-lasting liquid blush that blends seamlessly for a natural, radiant flush.',
    price: 25,
    image: productImages['product-blush.jpg'],
    category: 'blush',
    shades: ['Hope', 'Joy', 'Peace', 'Grateful', 'Bliss'],
    features: ['Long-lasting', 'Buildable', 'Natural finish', 'Cruelty-free'],
    ingredients: ['Hyaluronic Acid', 'Vitamin E', 'Plant-based pigments'],
    howToUse: 'Apply 1-2 dots to the apples of cheeks and blend with fingertips or brush.',
    isNew: false,
    isBestseller: true,
    rating: 4.8,
    reviews: 2847
  },
  {
    id: '2',
    name: 'Soft Pinch Tinted Lip Oil',
    description: 'A nourishing lip oil that delivers a hint of color with incredible shine and comfort.',
    price: 22,
    image: productImages['product-lip.jpg'],
    category: 'lips',
    shades: ['Serenity', 'Clarity', 'Wisdom', 'Courage', 'Strength'],
    features: ['Hydrating', 'Glossy finish', 'Non-sticky', 'Buildable color'],
    ingredients: ['Jojoba Oil', 'Vitamin E', 'Coconut Oil'],
    howToUse: 'Apply directly to lips. Layer for more intense color and shine.',
    isNew: true,
    isBestseller: false,
    rating: 4.7,
    reviews: 1523
  },
  {
    id: '3',
    name: 'Warm Wishes Effortless Bronzer Stick',
    description: 'An easy-to-use bronzer stick that warms and defines your complexion with a natural finish.',
    price: 28,
    image: productImages['product-bronzer.jpg'],
    category: 'face',
    shades: ['Power Boost', 'Gratitude', 'Optimistic', 'Ambitious'],
    features: ['Cream-to-powder', 'Buildable', 'Travel-friendly', 'Natural finish'],
    ingredients: ['Coconut Oil', 'Vitamin E', 'Mineral pigments'],
    howToUse: 'Apply to areas where sun naturally hits: forehead, cheeks, nose, and chin.',
    isNew: false,
    isBestseller: true,
    rating: 4.6,
    reviews: 1892
  },
  {
    id: '4',
    name: 'Positive Light Liquid Luminizer',
    description: 'A luminous highlighter that creates a natural, lit-from-within glow.',
    price: 27,
    originalPrice: 32,
    image: productImages['product-highlighter.jpg'],
    category: 'face',
    shades: ['Exhilarate', 'Enlighten', 'Inspire', 'Motivate'],
    features: ['Luminous finish', 'Buildable', 'Lightweight', 'Long-wearing'],
    ingredients: ['Mica', 'Vitamin E', 'Light-reflecting particles'],
    howToUse: 'Apply to high points of the face: cheekbones, bridge of nose, and cupid\'s bow.',
    isNew: false,
    isBestseller: false,
    rating: 4.5,
    reviews: 967
  }
];


// Helper function to get user-specific storage key
const getUserStorageKey = (userId: string, dataType: string) => `user-data-${userId}-${dataType}`;

// Helper function to load user-specific data
const loadUserData = (userId: string) => {
  const cartData = localStorage.getItem(getUserStorageKey(userId, 'cart'));
  const wishlistData = localStorage.getItem(getUserStorageKey(userId, 'wishlist'));
  
  return {
    cart: cartData ? JSON.parse(cartData) : [],
    wishlist: wishlistData ? JSON.parse(wishlistData) : []
  };
};

// Helper function to save user-specific data
const saveUserData = (userId: string, cart: CartItem[], wishlist: string[]) => {
  localStorage.setItem(getUserStorageKey(userId, 'cart'), JSON.stringify(cart));
  localStorage.setItem(getUserStorageKey(userId, 'wishlist'), JSON.stringify(wishlist));
};

export const useProductStore = create<ProductStore>()(
  persist(
    (set, get) => ({
      products: mockProducts,
      cart: [],
      wishlist: [],
      filters: {
        category: 'all',
        priceRange: [0, 100],
        sortBy: 'name'
      },
      searchQuery: '', // Initialize searchQuery

      // Initialize user data when they log in
      initializeUserData: (userId: string) => {
        const userData = loadUserData(userId);
        set({
          cart: userData.cart,
          wishlist: userData.wishlist
        });
      },

      // Clear data when user logs out
      clearUserData: () => {
        set({
          cart: [],
          wishlist: []
        });
      },

      addToCart: (product, shade) => {
        const { cart, currentUser } = get() as any;
        
        // Get current user from auth store (we'll handle this via a hook)
        const existingItem = cart.find(
          item => item.id === product.id && item.selectedShade === shade
        );

        let newCart;
        if (existingItem) {
          newCart = cart.map(item =>
            item.id === product.id && item.selectedShade === shade
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          newCart = [...cart, { ...product, quantity: 1, selectedShade: shade }];
        }

        set({ cart: newCart });
        
        // Save to user-specific localStorage
        const authStore = (window as any).authStore;
        if (authStore?.currentUser) {
          saveUserData(authStore.currentUser.id, newCart, get().wishlist);
        }
      },

      removeFromCart: (id) => {
        const newCart = get().cart.filter(item => item.id !== id);
        set({ cart: newCart });
        
        // Save to user-specific localStorage
        const authStore = (window as any).authStore;
        if (authStore?.currentUser) {
          saveUserData(authStore.currentUser.id, newCart, get().wishlist);
        }
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(id);
          return;
        }

        const newCart = get().cart.map(item =>
          item.id === id ? { ...item, quantity } : item
        );
        set({ cart: newCart });
        
        // Save to user-specific localStorage
        const authStore = (window as any).authStore;
        if (authStore?.currentUser) {
          saveUserData(authStore.currentUser.id, newCart, get().wishlist);
        }
      },

      clearCart: () => {
        set({ cart: [] });
        
        // Save to user-specific localStorage
        const authStore = (window as any).authStore;
        if (authStore?.currentUser) {
          saveUserData(authStore.currentUser.id, [], get().wishlist);
        }
      },

      toggleWishlist: (id) => {
        const newWishlist = get().wishlist.includes(id)
          ? get().wishlist.filter(item => item !== id)
          : [...get().wishlist, id];
        
        set({ wishlist: newWishlist });
        
        // Save to user-specific localStorage
        const authStore = (window as any).authStore;
        if (authStore?.currentUser) {
          saveUserData(authStore.currentUser.id, get().cart, newWishlist);
        }
      },

      setFilters: (newFilters) => {
        set(state => ({
          filters: { ...state.filters, ...newFilters }
        }));
      },

      setSearchQuery: (query) => { // Action to update search query
        set({ searchQuery: query });
      },

      getFilteredProducts: () => {
        const { products, filters, searchQuery } = get();
        let filtered = [...products];

        // Apply search filter
        if (searchQuery.trim()) {
          const lowerCaseSearchQuery = searchQuery.toLowerCase();
          filtered = filtered.filter(product =>
            product.name.toLowerCase().includes(lowerCaseSearchQuery) ||
            product.description.toLowerCase().includes(lowerCaseSearchQuery)
          );
        }

        if (filters.category !== 'all') {
          filtered = filtered.filter(product => product.category === filters.category);
        }

        filtered = filtered.filter(
          product => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
        );

        switch (filters.sortBy) {
          case 'price':
            filtered.sort((a, b) => a.price - b.price);
            break;
          case 'rating':
            filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
            break;
          case 'newest':
            filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
            break;
          default:
            filtered.sort((a, b) => a.name.localeCompare(b.name));
        }

        return filtered;
      },

      getTotalPrice: () => {
        return get().cart.reduce((total, item) => total + (item.price * item.quantity), 0);
      },

      getCartCount: () => {
        return get().cart.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: 'rare-beauty-store',
      partialize: (state) => ({ cart: state.cart, wishlist: state.wishlist }),
    }
  )
);
