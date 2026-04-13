import { createSlice } from '@reduxjs/toolkit'

function calculateCart(items) {
  const subtotal = items.reduce((sum, item) => sum + item.total, 0)
  const delivery = items.length > 0 ? 49 : 0
  const grandTotal = subtotal + delivery
  return { subtotal, delivery, grandTotal }
}

const initialState = {
  items: [],
  summary: {
    subtotal: 0,
    delivery: 0,
    grandTotal: 0,
  },
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      state.items.push(action.payload)
      state.summary = calculateCart(state.items)
    },
    removeItem(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload)
      state.summary = calculateCart(state.items)
    },
    clearCart(state) {
      state.items = []
      state.summary = calculateCart(state.items)
    },
  },
})

export const cartActions = cartSlice.actions
export default cartSlice.reducer
