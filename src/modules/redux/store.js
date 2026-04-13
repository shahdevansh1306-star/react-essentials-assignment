import { configureStore } from '@reduxjs/toolkit'

import cartReducer from './slices/cartSlice'
import pizzaReducer from './slices/pizzaSlice'
import uiReducer from './slices/uiSlice'
import userReducer from './slices/userSlice'

const STORAGE_KEY = 'react-showcase-redux-store'

function loadState() {
  if (typeof window === 'undefined') {
    return undefined
  }

  try {
    const rawState = window.localStorage.getItem(STORAGE_KEY)
    return rawState ? JSON.parse(rawState) : undefined
  } catch {
    return undefined
  }
}

const preloadedState = loadState()

export const store = configureStore({
  reducer: {
    user: userReducer,
    pizza: pizzaReducer,
    cart: cartReducer,
    ui: uiReducer,
  },
  preloadedState,
})

store.subscribe(() => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store.getState()))
})
