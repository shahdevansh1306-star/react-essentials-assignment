import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { updateField, setErrors, submitSuccess, resetForm } from '../store/index'
import { setSize, setCrust, toggleTopping, toggleSide, setQuantity, resetPizza } from '../store/index'
import { addToCart, removeFromCart, clearCart, placeOrder } from '../store/index'
import BackButton from '../components/BackButton'

const SIZE_PRICE = { Small: 299, Medium: 449, Large: 599 }
const TOPPINGS = ['Cheese', 'Mushroom', 'Olives', 'Pepperoni', 'Onions', 'Bell Pepper', 'Jalapeño', 'Corn']
const SIDES = ['Garlic Bread', 'Fries', 'Pepsi', 'Chocolate Dip']
const CRUST_LIST = ['Classic', 'Thin Crust', 'Stuffed', 'Wheat']

function SignupForm() {
  const dispatch = useDispatch()
  const { formData, errors, status } = useSelector(s => s.user)

  const validate = (data) => {
    const e = {}
    if (!data.fullName.trim()) e.fullName = 'Name required'
    if (!data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required'
    if (data.password.length < 8) e.password = '8+ characters required'
    if (data.password !== data.confirmPassword) e.confirmPassword = 'Passwords do not match'
    if (!data.gender) e.gender = 'Gender required'
    if (!data.terms) e.terms = 'Must accept terms'
    return e
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    dispatch(updateField({ field: name, value: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate(formData)
    if (Object.keys(errs).length) { dispatch(setErrors(errs)); return }
    dispatch(submitSuccess())
  }

  if (status === 'success') return (
    <div className="text-center py-8">
      <div className="text-5xl mb-3">🎉</div>
      <h3 className="font-bold text-green-600 dark:text-green-400 text-lg mb-1">Account Created!</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Welcome, {formData.fullName}!</p>
      <p className="text-xs bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 px-3 py-2 rounded-lg inline-block mb-4">State managed via Redux userSlice</p>
      <br />
      <button onClick={() => dispatch(resetForm())} className="px-5 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl text-sm font-semibold">Reset Form</button>
    </div>
  )

  const Field = ({ name, placeholder, type = 'text' }) => (
    <div>
      <input name={name} type={type} value={formData[name] || ''} onChange={handleChange} placeholder={placeholder}
        className={`w-full px-3 py-2.5 rounded-xl border text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none ${errors[name] ? 'border-red-400' : 'border-gray-200 dark:border-gray-600 focus:border-indigo-400'}`} />
      {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Field name="fullName" placeholder="Full Name" />
      <Field name="email" placeholder="Email" type="email" />
      <Field name="phone" placeholder="Phone" type="tel" />
      <Field name="password" placeholder="Password" type="password" />
      <Field name="confirmPassword" placeholder="Confirm Password" type="password" />
      <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-indigo-400">
        <option value="">Select Gender</option>
        <option>Male</option><option>Female</option><option>Non-binary</option>
      </select>
      {errors.gender && <p className="text-red-500 text-xs">{errors.gender}</p>}
      <label className="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" name="terms" checked={formData.terms} onChange={handleChange} />
        <span className="text-xs text-gray-600 dark:text-gray-400">Accept Terms & Conditions</span>
      </label>
      {errors.terms && <p className="text-red-500 text-xs">{errors.terms}</p>}
      <button type="submit" className="w-full py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl text-sm font-semibold transition-colors">Create Account</button>
    </form>
  )
}

function PizzaBuilder() {
  const dispatch = useDispatch()
  const pizza = useSelector(s => s.pizza)
  const cart = useSelector(s => s.cart)

  const base = SIZE_PRICE[pizza.size] || 449
  const total = (base + pizza.toppings.length * 30 + pizza.sides.length * 50) * pizza.quantity

  const handleAddToCart = () => {
    dispatch(addToCart({ ...pizza, price: total, label: `${pizza.size} ${pizza.crust} Pizza` }))
    dispatch(resetPizza())
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        {Object.entries(SIZE_PRICE).map(([s, p]) => (
          <button key={s} onClick={() => dispatch(setSize(s))} className={`py-2 rounded-xl border text-xs font-semibold transition-all ${pizza.size === s ? 'bg-orange-500 border-orange-500 text-white' : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-orange-300'}`}>
            {s}<br />₹{p}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {CRUST_LIST.map(c => (
          <button key={c} onClick={() => dispatch(setCrust(c))} className={`py-2 rounded-xl border text-xs font-medium transition-all ${pizza.crust === c ? 'bg-orange-100 dark:bg-orange-900/30 border-orange-400 text-orange-700 dark:text-orange-300' : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300'}`}>{c}</button>
        ))}
      </div>
      <div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1.5">Toppings</p>
        <div className="flex flex-wrap gap-1.5">
          {TOPPINGS.map(t => <button key={t} onClick={() => dispatch(toggleTopping(t))} className={`px-2.5 py-1 rounded-lg border text-xs font-medium transition-all ${pizza.toppings.includes(t) ? 'bg-orange-500 border-orange-500 text-white' : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300'}`}>{t}</button>)}
        </div>
      </div>
      <div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1.5">Sides</p>
        <div className="flex flex-wrap gap-1.5">
          {SIDES.map(s => <button key={s} onClick={() => dispatch(toggleSide(s))} className={`px-2.5 py-1 rounded-lg border text-xs font-medium transition-all ${pizza.sides.includes(s) ? 'bg-red-500 border-red-500 text-white' : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300'}`}>{s}</button>)}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={() => dispatch(setQuantity(Math.max(1, pizza.quantity - 1)))} className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-600 font-bold">−</button>
        <span className="font-bold text-gray-900 dark:text-white">{pizza.quantity}</span>
        <button onClick={() => dispatch(setQuantity(pizza.quantity + 1))} className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-600 font-bold">+</button>
      </div>
      <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-3 border border-orange-200 dark:border-orange-800">
        <p className="text-xs text-orange-600 font-semibold">Total: <span className="text-xl font-bold text-gray-900 dark:text-white">₹{total}</span></p>
      </div>
      <button onClick={handleAddToCart} className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-semibold transition-colors">Add to Cart 🛒</button>

      {/* Cart */}
      {cart.items.length > 0 && (
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">Cart ({cart.items.length})</p>
            <button onClick={() => dispatch(clearCart())} className="text-xs text-red-500 hover:text-red-600">Clear</button>
          </div>
          {cart.items.map(item => (
            <div key={item.id} className="flex items-center justify-between text-xs py-1.5 border-b border-gray-100 dark:border-gray-700">
              <span className="text-gray-700 dark:text-gray-300">{item.label} ×{item.quantity}</span>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900 dark:text-white">₹{item.price}</span>
                <button onClick={() => dispatch(removeFromCart(item.id))} className="text-red-400 hover:text-red-500">✕</button>
              </div>
            </div>
          ))}
          <div className="flex items-center justify-between pt-2">
            <span className="text-sm font-bold text-gray-900 dark:text-white">Total: ₹{cart.items.reduce((s, i) => s + i.price, 0)}</span>
            <button onClick={() => dispatch(placeOrder())} className="px-4 py-1.5 bg-green-500 hover:bg-green-600 text-white rounded-lg text-xs font-semibold transition-colors">
              {cart.orderPlaced ? '✓ Ordered!' : 'Checkout'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function ReduxApp() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <BackButton />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Redux Toolkit App</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-2">Module 12 — Redux Toolkit: Slices, Reducers, Cart</p>
        <div className="flex flex-wrap gap-2 mb-8">
          {['userSlice', 'pizzaSlice', 'cartSlice', 'uiSlice'].map(s => <span key={s} className="px-2.5 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs rounded-lg font-mono">{s}</span>)}
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="font-bold text-gray-900 dark:text-white mb-1">User Signup — Redux</h2>
            <p className="text-xs text-gray-400 mb-5">Form state managed by userSlice</p>
            <SignupForm />
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="font-bold text-gray-900 dark:text-white mb-1">Pizza Builder — Redux</h2>
            <p className="text-xs text-gray-400 mb-5">Managed by pizzaSlice + cartSlice</p>
            <PizzaBuilder />
          </div>
        </div>
      </div>
    </div>
  )
}
