import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  form: {
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    gender: 'Male',
    acceptedTerms: false,
  },
  errors: {},
  status: 'idle',
  successMessage: '',
  currentUser: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateField(state, action) {
      const { field, value } = action.payload
      state.form[field] = value
    },
    setErrors(state, action) {
      state.errors = action.payload
    },
    setStatus(state, action) {
      state.status = action.payload
    },
    setSuccessMessage(state, action) {
      state.successMessage = action.payload
    },
    setCurrentUser(state, action) {
      state.currentUser = action.payload
    },
    resetForm(state) {
      state.form = initialState.form
      state.errors = {}
      state.status = 'idle'
    },
    logout(state) {
      state.currentUser = null
      state.successMessage = ''
    },
  },
})

export const userActions = userSlice.actions
export default userSlice.reducer
