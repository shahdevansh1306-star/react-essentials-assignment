import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { updateField, setErrors, submitSuccess, resetForm } from '../store/index'
import { setSize, setCrust, toggleTopping, toggleSide, setQuantity, resetPizza } from '../store/index'
import { addToCart, removeFromCart, clearCart, placeOrder } from '../store/index'
import BackButton from '../components/BackButton'

const SIZE_PRICE = { Small: 299, Medium: 449, Large: 599 }
const TOPPINGS = ['Cheese', 'Mushroom', 'Olives', 'Pepperoni', 'Onions', 'Bell Pepper', 'Jalapeño', 'Corn']
const PREMIUM_TOPPINGS = ['Truffle', 'Sun-Dried Tomato', 'Artichoke']
const SIDES = ['Garlic Bread', 'Fries', 'Pepsi', 'Chocolate Dip']
const CRUST_LIST = ['Classic', 'Thin Crust', 'Stuffed', 'Wheat']

function SignupForm() {
  const dispatch = useDispatch()
  const { formData, errors, status } = useSelector(s => s.user)
  const [loading, setLoading] = useState(false)

  const validate = (data) => {
    const e = {}
    if (!data.fullName || data.fullName.trim().length < 2) e.fullName = 'Name must be 2+ characters'
    if (!data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required'
    if (!data.phone || !data.phone.match(/^\d{10}$/)) e.phone = 'Phone must be 10 digits'
    if (data.password.length < 8) e.password = '8+ characters required'
    else if (!/[A-Z]/.test(data.password)) e.password = 'Needs an uppercase letter'
    else if (!/[0-9]/.test(data.password)) e.password = 'Needs a number'
    else if (!/[^A-Za-z0-9]/.test(data.password)) e.password = 'Needs a special character'
    if (data.password !== data.confirmPassword) e.confirmPassword = 'Passwords do not match'
    if (!data.gender) e.gender = 'Gender required'
    if (!data.terms) e.terms = 'Must accept terms'
    return e
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    dispatch(updateField({ field: name, value: type === 'checkbox' ? checked : value }))
    // clear error for field
    if (errors[name]) dispatch(setErrors({ ...errors, [name]: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate(formData)
    if (Object.keys(errs).length) { dispatch(setErrors(errs)); return }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      dispatch(submitSuccess())
    }, 1500)
  }

  if (status === 'success') return (
    <div className="text-center py-6">
      <div className="text-5xl mb-3">🎉</div>
      <h3 className="font-bold text-green-600 dark:text-green-400 text-lg mb-1">Account Created!</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Welcome, <span className="font-semibold text-gray-700 dark:text-gray-200">{formData.fullName}</span>!</p>
      <p className="text-xs text-gray-400 mb-4">{formData.email}</p>
      <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-200 dark:border-indigo-800 px-4 py-3 text-left text-xs space-y-1 mb-5">
        <p className="text-indigo-600 dark:text-indigo-400 font-semibold mb-1.5">Redux State — userSlice</p>
        <p className="text-gray-600 dark:text-gray-400 font-mono">status: <span className="text-green-500">"success"</span></p>
        <p className="text-gray-600 dark:text-gray-400 font-mono">loggedIn: <span className="text-blue-500">true</span></p>
        <p className="text-gray-600 dark:text-gray-400 font-mono">currentUser: <span className="text-orange-400">"{formData.fullName}"</span></p>
      </div>
      <button onClick={() => dispatch(resetForm())} className="px-5 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl text-sm font-semibold">Reset Form</button>
    </div>
  )

  const Field = ({ name, placeholder, type = 'text' }) => (
    <div>
      <input name={name} type={type} value={formData[name] || ''} onChange={handleChange} placeholder={placeholder}
        className={`w-full px-3 py-2.5 rounded-xl border text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none transition-colors ${errors[name] ? 'border-red-400' : 'border-gray-200 dark:border-gray-600 focus:border-indigo-400'}`} />
      {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
    </div>
  )

  const isValid = Object.keys(validate(formData)).length === 0

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Field name="fullName" placeholder="Full Name" />
      <Field name="email" placeholder="Email" type="email" />
      <Field name="phone" placeholder="Phone (10 digits)" type="tel" />
      <Field name="password" placeholder="Password" type="password" />
      <Field name="confirmPassword" placeholder="Confirm Password" type="password" />
      <select name="gender" value={formData.gender} onChange={handleChange}
        className={`w-full px-3 py-2.5 rounded-xl border bg-gray-50 dark:bg-gray-700 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-indigo-400 transition-colors ${errors.gender ? 'border-red-400' : 'border-gray-200 dark:border-gray-600'}`}>
        <option value="">Select Gender</option>
        <option>Male</option><option>Female</option><option>Non-binary</option>
      </select>
      {errors.gender && <p className="text-red-500 text-xs">{errors.gender}</p>}
      <label className="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" name="terms" checked={formData.terms} onChange={handleChange} />
        <span className="text-xs text-gray-600 dark:text-gray-400">Accept <span className="text-indigo-500">Terms & Conditions</span></span>
      </label>
      {errors.terms && <p className="text-red-500 text-xs">{errors.terms}</p>}
      <button type="submit" disabled={!isValid || loading}
        className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${isValid && !loading ? 'bg-indigo-500 hover:bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-400 cursor-not-allowed'}`}>
        {loading ? (
          <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block"></span> Creating Account...</>
        ) : 'Create Account'}
      </button>
      <button type="button" onClick={() => dispatch(resetForm())}
        className="w-full py-2 rounded-xl text-sm border border-gray-200 dark:border-gray-600 text-gray-500 hover:border-indigo-400 hover:text-indigo-500 transition-colors">
        Clear Form
      </button>
    </form>
  )
}

function PizzaBuilder() {
  const dispatch = useDispatch()
  const pizza = useSelector(s => s.pizza)
  const cart = useSelector(s => s.cart)
  const [checkoutDone, setCheckoutDone] = useState(false)
  const [checkoutLoading, setCheckoutLoading] = useState(false)

  const base = SIZE_PRICE[pizza.size] || 449
  const total = (base + pizza.toppings.length * 30 + pizza.sides.length * 50) * pizza.quantity

  // Premium toppings unlock when Large is selected
  const availableToppings = pizza.size === 'Large' ? [...TOPPINGS, ...PREMIUM_TOPPINGS] : TOPPINGS

  const handleAddToCart = () => {
    dispatch(addToCart({ ...pizza, price: total, label: `${pizza.size} ${pizza.crust} Pizza` }))
    dispatch(resetPizza())
  }

  const handleCheckout = () => {
    setCheckoutLoading(true)
    setTimeout(() => {
      dispatch(placeOrder())
      setCheckoutLoading(false)
      setCheckoutDone(true)
    }, 1500)
  }

  if (cart.orderPlaced && checkoutDone) return (
    <div className="text-center py-6">
      <div className="text-5xl mb-3">✅</div>
      <h3 className="font-bold text-green-600 dark:text-green-400 text-lg mb-1">Order Confirmed!</h3>
      <p className="text-xs text-gray-400 mb-4">Your pizza is being prepared 🍕</p>
      <div className="bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800 p-4 text-left text-xs space-y-1 mb-5">
        <p className="text-green-700 dark:text-green-400 font-semibold mb-1.5">Order Receipt</p>
        {cart.items.map(item => (
          <div key={item.id} className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">{item.label} × {item.quantity}</span>
            <span className="font-bold text-gray-900 dark:text-white">₹{item.price}</span>
          </div>
        ))}
        <div className="border-t border-green-200 dark:border-green-800 pt-2 mt-2 flex justify-between">
          <span className="font-bold text-gray-800 dark:text-white">Grand Total</span>
          <span className="font-bold text-xl text-gray-900 dark:text-white">₹{cart.items.reduce((s, i) => s + i.price, 0)}</span>
        </div>
      </div>
      <button onClick={() => { dispatch(clearCart()); setCheckoutDone(false); }} className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-semibold">Order Again</button>
    </div>
  )

  return (
    <div className="space-y-4">
      {/* Size */}
      <div className="grid grid-cols-3 gap-2">
        {Object.entries(SIZE_PRICE).map(([s, p]) => (
          <button key={s} onClick={() => dispatch(setSize(s))} className={`py-2 rounded-xl border text-xs font-semibold transition-all ${pizza.size === s ? 'bg-orange-500 border-orange-500 text-white' : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-orange-300'}`}>
            {s}<br />₹{p}
          </button>
        ))}
      </div>
      {/* Crust */}
      <div className="grid grid-cols-2 gap-2">
        {CRUST_LIST.map(c => (
          <button key={c} onClick={() => dispatch(setCrust(c))} className={`py-2 rounded-xl border text-xs font-medium transition-all ${pizza.crust === c ? 'bg-orange-100 dark:bg-orange-900/30 border-orange-400 text-orange-700 dark:text-orange-300' : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300'}`}>{c}</button>
        ))}
      </div>
      {/* Toppings — dynamic based on size */}
      <div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1.5">
          Toppings (+₹30 each)
          {pizza.size === 'Large' && <span className="ml-2 text-yellow-500 font-semibold">★ Premium unlocked!</span>}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {availableToppings.map(t => (
            <button key={t} onClick={() => dispatch(toggleTopping(t))}
              className={`px-2.5 py-1 rounded-lg border text-xs font-medium transition-all ${pizza.toppings.includes(t) ? 'bg-orange-500 border-orange-500 text-white' : PREMIUM_TOPPINGS.includes(t) ? 'border-yellow-400 text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/10 hover:bg-yellow-100' : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300'}`}>{t}
            </button>
          ))}
        </div>
      </div>
      {/* Sides */}
      <div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1.5">Sides & Drinks (+₹50 each)</p>
        <div className="flex flex-wrap gap-1.5">
          {SIDES.map(s => <button key={s} onClick={() => dispatch(toggleSide(s))} className={`px-2.5 py-1 rounded-lg border text-xs font-medium transition-all ${pizza.sides.includes(s) ? 'bg-red-500 border-red-500 text-white' : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300'}`}>{s}</button>)}
        </div>
      </div>
      {/* Quantity */}
      <div className="flex items-center gap-3">
        <span className="text-xs text-gray-500 dark:text-gray-400">Qty</span>
        <button onClick={() => dispatch(setQuantity(Math.max(1, pizza.quantity - 1)))} className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-600 font-bold hover:border-orange-400 transition-colors">−</button>
        <span className="font-bold text-gray-900 dark:text-white">{pizza.quantity}</span>
        <button onClick={() => dispatch(setQuantity(pizza.quantity + 1))} className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-600 font-bold hover:border-orange-400 transition-colors">+</button>
      </div>
      {/* Live price */}
      <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-3 border border-orange-200 dark:border-orange-800">
        <p className="text-xs text-orange-600 font-semibold">Live Total: <span className="text-xl font-bold text-gray-900 dark:text-white">₹{total}</span></p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{pizza.size} {pizza.crust}{pizza.toppings.length ? ` + ${pizza.toppings.join(', ')}` : ''}</p>
      </div>
      <button onClick={handleAddToCart} className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-semibold transition-colors">Add to Cart 🛒</button>

      {/* Cart */}
      {cart.items.length > 0 && (
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">Cart ({cart.items.length} item{cart.items.length > 1 ? 's' : ''})</p>
            <button onClick={() => dispatch(clearCart())} className="text-xs text-red-500 hover:text-red-600">Clear All</button>
          </div>
          {cart.items.map(item => (
            <div key={item.id} className="flex items-center justify-between text-xs py-1.5 border-b border-gray-100 dark:border-gray-700">
              <span className="text-gray-700 dark:text-gray-300">{item.label} ×{item.quantity}</span>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900 dark:text-white">₹{item.price}</span>
                <button onClick={() => dispatch(removeFromCart(item.id))} className="text-red-400 hover:text-red-500 font-bold">✕</button>
              </div>
            </div>
          ))}
          <div className="flex items-center justify-between pt-1">
            <span className="text-sm font-bold text-gray-900 dark:text-white">Total: ₹{cart.items.reduce((s, i) => s + i.price, 0)}</span>
            <button onClick={handleCheckout} disabled={checkoutLoading}
              className="px-4 py-1.5 bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5">
              {checkoutLoading ? <><span className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin"></span> Processing...</> : 'Checkout ✓'}
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
          {['userSlice', 'pizzaSlice', 'cartSlice', 'uiSlice'].map(s => (
            <span key={s} className="px-2.5 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs rounded-lg font-mono">{s}</span>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="font-bold text-gray-900 dark:text-white mb-1">User Signup — Redux</h2>
            <p className="text-xs text-gray-400 mb-5">Managed by userSlice • Loading state • Validation</p>
            <SignupForm />
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="font-bold text-gray-900 dark:text-white mb-1">Pizza Builder — Redux</h2>
            <p className="text-xs text-gray-400 mb-5">pizzaSlice + cartSlice • Premium toppings • Order receipt</p>
            <PizzaBuilder />
          </div>
        </div>
      </div>
    </div>
  )
}
