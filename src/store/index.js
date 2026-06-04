import { configureStore, createSlice } from '@reduxjs/toolkit'

// User Signup Slice
const userSlice = createSlice({
  name: 'user',
  initialState: {
    formData: { fullName: '', email: '', phone: '', password: '', confirmPassword: '', gender: '', terms: false },
    errors: {},
    status: 'idle', // idle | loading | success | error
    loggedIn: false,
    currentUser: null,
  },
  reducers: {
    updateField: (state, { payload: { field, value } }) => { state.formData[field] = value },
    setErrors: (state, { payload }) => { state.errors = payload },
    submitSuccess: (state) => { state.status = 'success'; state.loggedIn = true; state.currentUser = { ...state.formData } },
    resetForm: (state) => { state.formData = { fullName: '', email: '', phone: '', password: '', confirmPassword: '', gender: '', terms: false }; state.errors = {}; state.status = 'idle' },
    logout: (state) => { state.loggedIn = false; state.currentUser = null },
  },
})

// Pizza Slice
const pizzaSlice = createSlice({
  name: 'pizza',
  initialState: {
    size: 'Medium',
    crust: 'Classic',
    toppings: [],
    sides: [],
    quantity: 1,
  },
  reducers: {
    setSize: (state, { payload }) => { state.size = payload },
    setCrust: (state, { payload }) => { state.crust = payload },
    toggleTopping: (state, { payload }) => {
      state.toppings = state.toppings.includes(payload)
        ? state.toppings.filter(t => t !== payload)
        : [...state.toppings, payload]
    },
    toggleSide: (state, { payload }) => {
      state.sides = state.sides.includes(payload)
        ? state.sides.filter(s => s !== payload)
        : [...state.sides, payload]
    },
    setQuantity: (state, { payload }) => { state.quantity = payload },
    resetPizza: (state) => { state.size = 'Medium'; state.crust = 'Classic'; state.toppings = []; state.sides = []; state.quantity = 1 },
  },
})

// Cart Slice
const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [], orderPlaced: false },
  reducers: {
    addToCart: (state, { payload }) => { state.items.push({ ...payload, id: Date.now() }) },
    removeFromCart: (state, { payload }) => { state.items = state.items.filter(i => i.id !== payload) },
    clearCart: (state) => { state.items = []; state.orderPlaced = false },
    placeOrder: (state) => { state.orderPlaced = true },
  },
})

// UI Slice
const uiSlice = createSlice({
  name: 'ui',
  initialState: { darkMode: false, notification: null },
  reducers: {
    toggleDarkMode: (state) => { state.darkMode = !state.darkMode },
    setNotification: (state, { payload }) => { state.notification = payload },
    clearNotification: (state) => { state.notification = null },
  },
})

export const { updateField, setErrors, submitSuccess, resetForm, logout } = userSlice.actions
export const { setSize, setCrust, toggleTopping, toggleSide, setQuantity, resetPizza } = pizzaSlice.actions
export const { addToCart, removeFromCart, clearCart, placeOrder } = cartSlice.actions
export const { toggleDarkMode, setNotification, clearNotification } = uiSlice.actions

export default configureStore({
  reducer: {
    user: userSlice.reducer,
    pizza: pizzaSlice.reducer,
    cart: cartSlice.reducer,
    ui: uiSlice.reducer,
  },
})
