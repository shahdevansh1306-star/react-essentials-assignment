import { createSelector, createSlice } from '@reduxjs/toolkit'

const sizeOptions = [
  { id: 'small', label: 'Small', price: 199, accent: 'Quick lunch' },
  { id: 'medium', label: 'Medium', price: 299, accent: 'Best seller' },
  { id: 'large', label: 'Large', price: 429, accent: 'Unlocks premium toppings' },
]

const crustOptions = [
  { id: 'classic', label: 'Classic crust', price: 0 },
  { id: 'thin', label: 'Thin crust', price: 20 },
  { id: 'cheese-burst', label: 'Cheese burst', price: 75 },
]

const toppings = [
  { id: 'basil', label: 'Fresh basil', price: 18, premium: false },
  { id: 'jalapeno', label: 'Jalapeno', price: 22, premium: false },
  { id: 'paneer', label: 'Paneer tikka', price: 55, premium: false },
  { id: 'smoked-bbq', label: 'Smoked BBQ chicken', price: 90, premium: true },
  { id: 'truffle', label: 'Truffle mushrooms', price: 95, premium: true },
]

const sides = [
  { id: 'garlic-bread', label: 'Garlic bread', price: 109 },
  { id: 'dip', label: 'Chipotle dip', price: 39 },
  { id: 'cola', label: 'Craft cola', price: 59 },
]

const initialState = {
  catalog: {
    sizeOptions,
    crustOptions,
    toppings,
    sides,
  },
  current: {
    size: 'medium',
    crust: 'classic',
    toppings: ['basil'],
    sides: [],
    quantity: 1,
    note: '',
  },
}

function prunePremiumToppings(state) {
  if (state.current.size !== 'large') {
    state.current.toppings = state.current.toppings.filter((toppingId) => {
      const topping = state.catalog.toppings.find((entry) => entry.id === toppingId)
      return topping && !topping.premium
    })
  }
}

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setSize(state, action) {
      state.current.size = action.payload
      prunePremiumToppings(state)
    },
    setCrust(state, action) {
      state.current.crust = action.payload
    },
    toggleTopping(state, action) {
      const toppingId = action.payload
      const existing = state.current.toppings.includes(toppingId)

      if (existing) {
        state.current.toppings = state.current.toppings.filter((item) => item !== toppingId)
      } else {
        state.current.toppings.push(toppingId)
      }
    },
    toggleSide(state, action) {
      const sideId = action.payload
      const existing = state.current.sides.includes(sideId)

      if (existing) {
        state.current.sides = state.current.sides.filter((item) => item !== sideId)
      } else {
        state.current.sides.push(sideId)
      }
    },
    setQuantity(state, action) {
      state.current.quantity = action.payload
    },
    setNote(state, action) {
      state.current.note = action.payload
    },
    resetConfiguration(state) {
      state.current = initialState.current
    },
  },
})

export const pizzaActions = pizzaSlice.actions

export const selectPizzaState = (state) => state.pizza

export const selectCurrentPizzaPreview = createSelector([selectPizzaState], (pizzaState) => {
  const { catalog, current } = pizzaState
  const size = catalog.sizeOptions.find((option) => option.id === current.size)
  const crust = catalog.crustOptions.find((option) => option.id === current.crust)
  const toppingList = catalog.toppings.filter((option) => current.toppings.includes(option.id))
  const sideList = catalog.sides.filter((option) => current.sides.includes(option.id))

  const onePizzaTotal =
    (size?.price || 0) +
    (crust?.price || 0) +
    toppingList.reduce((sum, item) => sum + item.price, 0) +
    sideList.reduce((sum, item) => sum + item.price, 0)

  return {
    size,
    crust,
    toppingList,
    sideList,
    onePizzaTotal,
    total: onePizzaTotal * current.quantity,
  }
})

export default pizzaSlice.reducer
