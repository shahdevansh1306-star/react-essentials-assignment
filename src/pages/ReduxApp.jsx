import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { setErrors, submitSuccess, resetForm } from '../store/index'
import { setSize, setCrust, toggleTopping, toggleSide, setQuantity, resetPizza } from '../store/index'
import { addToCart, removeFromCart, clearCart, placeOrder } from '../store/index'
import BackButton from '../components/BackButton'

const SIZE_PRICE = { Small: 299, Medium: 449, Large: 599 }
const TOPPINGS = ['Cheese', 'Mushroom', 'Olives', 'Pepperoni', 'Onions', 'Bell Pepper', 'Jalapeño', 'Corn']
const PREMIUM_TOPPINGS = ['Truffle', 'Sun-Dried Tomato', 'Artichoke']
const SIDES = ['Garlic Bread', 'Fries', 'Pepsi', 'Chocolate Dip']
const CRUST_LIST = ['Classic', 'Thin Crust', 'Stuffed', 'Wheat']

// ── Signup Form — local state to fix focus bug, dispatches only on submit ────
function SignupPanel() {
  const dispatch = useDispatch()
  const { status, formData } = useSelector(s => s.user)

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [gender, setGender] = useState('')
  const [terms, setTerms] = useState(false)
  const [errors, setLocalErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const getErr = (field, val) => {
    if (field === 'fullName') return val.trim().length < 2 ? 'Name must be 2+ characters' : ''
    if (field === 'email') return !val.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ? 'Valid email required' : ''
    if (field === 'phone') return !val.match(/^\d{10}$/) ? '10 digit phone required' : ''
    if (field === 'password') {
      if (val.length < 8) return '8+ characters required'
      if (!/[A-Z]/.test(val)) return 'Needs uppercase letter'
      if (!/[0-9]/.test(val)) return 'Needs a number'
      if (!/[^A-Za-z0-9]/.test(val)) return 'Needs special character'
      return ''
    }
    if (field === 'confirmPassword') return val !== password ? 'Passwords do not match' : ''
    if (field === 'gender') return !val ? 'Select a gender' : ''
    if (field === 'terms') return !val ? 'Must accept terms' : ''
    return ''
  }

  const isValid = () =>
    fullName.trim().length >= 2 &&
    email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) &&
    phone.match(/^\d{10}$/) &&
    password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password) &&
    password === confirmPassword && gender && terms

  const handleSubmit = (e) => {
    e.preventDefault()
    const vals = { fullName, email, phone, password, confirmPassword, gender, terms }
    const errs = {}
    Object.entries(vals).forEach(([k, v]) => { errs[k] = getErr(k, v) })
    setLocalErrors(errs)
    if (!isValid()) return
    setLoading(true)
    setTimeout(() => {
      dispatch(submitSuccess())
      setLoading(false)
    }, 1500)
  }

  const handleReset = () => {
    setFullName(''); setEmail(''); setPhone(''); setPassword('')
    setConfirmPassword(''); setGender(''); setTerms(false)
    setLocalErrors({})
    dispatch(resetForm())
    setLoading(false)
  }

  const inp = (field, err) =>
    `w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-all bg-gray-800 border text-white placeholder-gray-500 ${err ? 'border-red-500 focus:border-red-400' : 'border-gray-700 focus:border-violet-500'}`

  // ── Success screen ──
  if (status === 'success') return (
    <div className="flex flex-col items-center justify-center h-full py-10 text-center">
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-4xl mb-4 shadow-lg shadow-violet-500/30">✓</div>
      <h3 className="text-2xl font-bold text-white mb-1">Account Created!</h3>
      <p className="text-gray-400 text-sm mb-1">Welcome, <span className="text-violet-400 font-semibold">{fullName || formData.fullName}</span></p>
      <p className="text-gray-500 text-xs mb-6">{email || formData.email}</p>

      {/* Redux state visualization */}
      <div className="w-full bg-gray-900 rounded-2xl border border-gray-700 p-4 text-left mb-6 font-mono text-xs">
        <p className="text-gray-500 mb-2">// Redux userSlice state</p>
        <p className="text-gray-400">{'{'}</p>
        <p className="pl-4"><span className="text-violet-400">status</span>: <span className="text-green-400">"success"</span>,</p>
        <p className="pl-4"><span className="text-violet-400">loggedIn</span>: <span className="text-blue-400">true</span>,</p>
        <p className="pl-4"><span className="text-violet-400">currentUser</span>: <span className="text-orange-400">"{fullName || formData.fullName}"</span></p>
        <p className="text-gray-400">{'}'}</p>
      </div>
      <button onClick={handleReset} className="px-6 py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-sm font-semibold transition-colors">Reset Form</button>
    </div>
  )

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-3">
      {/* Name */}
      <div>
        <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Full Name" autoComplete="name" className={inp('fullName', errors.fullName)} />
        {errors.fullName && <p className="text-red-400 text-xs mt-1 pl-1">{errors.fullName}</p>}
      </div>
      {/* Email */}
      <div>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email Address" autoComplete="email" className={inp('email', errors.email)} />
        {errors.email && <p className="text-red-400 text-xs mt-1 pl-1">{errors.email}</p>}
      </div>
      {/* Phone */}
      <div>
        <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone (10 digits)" autoComplete="tel" className={inp('phone', errors.phone)} />
        {errors.phone && <p className="text-red-400 text-xs mt-1 pl-1">{errors.phone}</p>}
      </div>
      {/* Password */}
      <div>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" autoComplete="new-password" className={inp('password', errors.password)} />
        {errors.password && <p className="text-red-400 text-xs mt-1 pl-1">{errors.password}</p>}
        {password && (
          <div className="mt-2 flex gap-1">
            {[
              password.length >= 8,
              /[A-Z]/.test(password),
              /[0-9]/.test(password),
              /[^A-Za-z0-9]/.test(password)
            ].map((ok, i) => (
              <div key={i} className={`h-1 flex-1 rounded-full transition-all ${ok ? 'bg-violet-500' : 'bg-gray-700'}`} />
            ))}
          </div>
        )}
      </div>
      {/* Confirm */}
      <div>
        <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm Password" autoComplete="new-password" className={inp('confirmPassword', errors.confirmPassword)} />
        {errors.confirmPassword && <p className="text-red-400 text-xs mt-1 pl-1">{errors.confirmPassword}</p>}
      </div>
      {/* Gender */}
      <div>
        <select value={gender} onChange={e => setGender(e.target.value)} className={`w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-all bg-gray-800 border text-white focus:border-violet-500 ${errors.gender ? 'border-red-500' : 'border-gray-700'}`}>
          <option value="">Select Gender</option>
          <option>Male</option><option>Female</option><option>Non-binary</option>
        </select>
        {errors.gender && <p className="text-red-400 text-xs mt-1 pl-1">{errors.gender}</p>}
      </div>
      {/* Terms */}
      <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl border border-gray-700 hover:border-violet-600 transition-colors">
        <input type="checkbox" checked={terms} onChange={e => setTerms(e.target.checked)} className="w-4 h-4 accent-violet-500" />
        <span className="text-xs text-gray-400">Accept <span className="text-violet-400 font-medium">Terms & Conditions</span></span>
      </label>
      {errors.terms && <p className="text-red-400 text-xs pl-1">{errors.terms}</p>}

      <div className="flex gap-2 pt-1">
        <button type="submit" disabled={!isValid() || loading}
          className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${isValid() && !loading ? 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-violet-500/25' : 'bg-gray-700 text-gray-500 cursor-not-allowed'}`}>
          {loading ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Creating...</> : 'Create Account →'}
        </button>
        <button type="button" onClick={handleReset} className="px-4 py-3 rounded-xl text-sm border border-gray-700 text-gray-400 hover:border-violet-500 hover:text-violet-400 transition-colors">Clear</button>
      </div>
    </form>
  )
}

// ── Pizza Builder ────────────────────────────────────────────────────────────
function PizzaPanel() {
  const dispatch = useDispatch()
  const pizza = useSelector(s => s.pizza)
  const cart = useSelector(s => s.cart)
  const [checkoutDone, setCheckoutDone] = useState(false)
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('build') // build | cart

  const base = SIZE_PRICE[pizza.size] || 449
  const total = (base + pizza.toppings.length * 30 + pizza.sides.length * 50) * pizza.quantity
  const cartTotal = cart.items.reduce((s, i) => s + i.price, 0)
  const availableToppings = pizza.size === 'Large' ? [...TOPPINGS, ...PREMIUM_TOPPINGS] : TOPPINGS

  const handleAddToCart = () => {
    dispatch(addToCart({ ...pizza, price: total, label: `${pizza.size} ${pizza.crust} Pizza` }))
    dispatch(resetPizza())
    setActiveTab('cart')
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
    <div className="flex flex-col items-center justify-center h-full py-10 text-center">
      <div className="text-6xl mb-4">🍕</div>
      <h3 className="text-2xl font-bold text-white mb-1">Order Confirmed!</h3>
      <p className="text-gray-400 text-sm mb-6">Your pizza is on its way!</p>
      <div className="w-full bg-gray-900 rounded-2xl border border-gray-700 p-4 text-left mb-6 space-y-2">
        <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-3">Order Receipt</p>
        {cart.items.map(item => (
          <div key={item.id} className="flex justify-between text-sm">
            <span className="text-gray-300">{item.label} × {item.quantity}</span>
            <span className="font-bold text-white">₹{item.price}</span>
          </div>
        ))}
        <div className="border-t border-gray-700 pt-3 mt-2 flex justify-between">
          <span className="font-bold text-white">Grand Total</span>
          <span className="font-bold text-2xl text-orange-400">₹{cartTotal}</span>
        </div>
      </div>
      <button onClick={() => { dispatch(clearCart()); setCheckoutDone(false); setActiveTab('build') }}
        className="px-6 py-2.5 bg-orange-500 hover:bg-orange-400 text-white rounded-xl text-sm font-bold transition-colors">Order Again</button>
    </div>
  )

  return (
    <div>
      {/* Tabs */}
      <div className="flex bg-gray-900 rounded-xl p-1 mb-5">
        {['build', 'cart'].map(tab => (
          <button key={tab} type="button" onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all capitalize flex items-center justify-center gap-2 ${activeTab === tab ? 'bg-gray-700 text-white' : 'text-gray-500 hover:text-gray-300'}`}>
            {tab === 'build' ? '🍕 Build' : `🛒 Cart${cart.items.length > 0 ? ` (${cart.items.length})` : ''}`}
          </button>
        ))}
      </div>

      {/* BUILD TAB */}
      {activeTab === 'build' && (
        <div className="space-y-5">
          {/* Size */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Pizza Size</p>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(SIZE_PRICE).map(([s, p]) => (
                <button key={s} type="button" onClick={() => dispatch(setSize(s))}
                  className={`py-3 rounded-xl border text-xs font-bold transition-all ${pizza.size === s ? 'bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/25' : 'border-gray-700 text-gray-400 hover:border-orange-500 hover:text-orange-400 bg-gray-800'}`}>
                  {s}<br /><span className="font-normal text-xs opacity-80">₹{p}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Crust */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Crust</p>
            <div className="grid grid-cols-2 gap-2">
              {CRUST_LIST.map(c => (
                <button key={c} type="button" onClick={() => dispatch(setCrust(c))}
                  className={`py-2.5 rounded-xl border text-xs font-medium transition-all ${pizza.crust === c ? 'bg-gray-600 border-gray-400 text-white' : 'border-gray-700 text-gray-400 hover:border-gray-500 bg-gray-800'}`}>{c}</button>
              ))}
            </div>
          </div>

          {/* Toppings */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Toppings <span className="normal-case text-orange-400 font-normal">(+₹30)</span>
              {pizza.size === 'Large' && <span className="ml-2 text-yellow-400 text-xs normal-case font-normal">★ Premium unlocked</span>}
            </p>
            <div className="flex flex-wrap gap-2">
              {availableToppings.map(t => (
                <button key={t} type="button" onClick={() => dispatch(toggleTopping(t))}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                    pizza.toppings.includes(t) ? 'bg-orange-500 border-orange-500 text-white' :
                    PREMIUM_TOPPINGS.includes(t) ? 'border-yellow-600 text-yellow-400 bg-yellow-900/20 hover:bg-yellow-900/40' :
                    'border-gray-700 text-gray-400 hover:border-gray-500 bg-gray-800'
                  }`}>{t}</button>
              ))}
            </div>
          </div>

          {/* Sides */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Sides <span className="normal-case text-orange-400 font-normal">(+₹50)</span></p>
            <div className="flex flex-wrap gap-2">
              {SIDES.map(s => (
                <button key={s} type="button" onClick={() => dispatch(toggleSide(s))}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${pizza.sides.includes(s) ? 'bg-red-600 border-red-600 text-white' : 'border-gray-700 text-gray-400 hover:border-gray-500 bg-gray-800'}`}>{s}</button>
              ))}
            </div>
          </div>

          {/* Qty + total */}
          <div className="flex items-center gap-4">
            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Qty</p>
            <div className="flex items-center gap-3 bg-gray-800 border border-gray-700 rounded-xl px-3 py-2">
              <button type="button" onClick={() => dispatch(setQuantity(Math.max(1, pizza.quantity - 1)))} className="text-gray-400 hover:text-white font-bold w-4 text-center">−</button>
              <span className="font-bold text-white w-4 text-center">{pizza.quantity}</span>
              <button type="button" onClick={() => dispatch(setQuantity(pizza.quantity + 1))} className="text-gray-400 hover:text-white font-bold w-4 text-center">+</button>
            </div>
            <div className="ml-auto text-right">
              <p className="text-xs text-gray-500">Total</p>
              <p className="text-2xl font-bold text-orange-400">₹{total}</p>
            </div>
          </div>

          <button type="button" onClick={handleAddToCart}
            className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-orange-500/25">
            Add to Cart 🛒
          </button>
        </div>
      )}

      {/* CART TAB */}
      {activeTab === 'cart' && (
        <div className="space-y-4">
          {cart.items.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-3">🛒</div>
              <p className="text-gray-500 text-sm">Cart is empty</p>
              <button type="button" onClick={() => setActiveTab('build')} className="mt-3 text-xs text-orange-400 hover:underline">← Build a pizza</button>
            </div>
          ) : (
            <>
              {cart.items.map(item => (
                <div key={item.id} className="flex items-center justify-between bg-gray-800 border border-gray-700 rounded-xl p-3">
                  <div>
                    <p className="font-semibold text-sm text-white">{item.label}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {item.toppings?.length > 0 && item.toppings.join(', ')}
                      {item.sides?.length > 0 && ` + ${item.sides.join(', ')}`}
                    </p>
                    <p className="text-orange-400 font-bold text-sm mt-1">₹{item.price}</p>
                  </div>
                  <button type="button" onClick={() => dispatch(removeFromCart(item.id))} className="w-8 h-8 rounded-full bg-gray-700 hover:bg-red-600 text-gray-400 hover:text-white transition-all flex items-center justify-center text-sm">✕</button>
                </div>
              ))}

              <div className="bg-gray-900 rounded-xl border border-gray-700 p-4">
                <div className="flex justify-between mb-3">
                  <span className="text-gray-400 text-sm">Subtotal</span>
                  <span className="font-bold text-white text-xl">₹{cartTotal}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mb-4">
                  <span>Delivery</span><span className="text-green-400 font-semibold">FREE</span>
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => dispatch(clearCart())} className="px-4 py-2.5 rounded-xl text-xs border border-gray-700 text-gray-400 hover:border-red-500 hover:text-red-400 transition-colors">Clear</button>
                  <button type="button" onClick={handleCheckout} disabled={checkoutLoading}
                    className="flex-1 py-2.5 bg-green-600 hover:bg-green-500 disabled:bg-green-900 text-white rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2">
                    {checkoutLoading ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Processing...</> : 'Checkout ✓'}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function ReduxApp() {
  return (
    <div className="min-h-screen bg-gray-950 px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <BackButton />
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-white mb-2">Redux Toolkit App</h1>
          <p className="text-gray-500 mb-4">Module 12 — Redux Toolkit: Slices, Reducers, Cart & Authentication</p>
          <div className="flex flex-wrap gap-2">
            {['userSlice', 'pizzaSlice', 'cartSlice', 'uiSlice'].map(s => (
              <span key={s} className="px-3 py-1 bg-violet-950 border border-violet-800 text-violet-400 text-xs rounded-lg font-mono">{s}</span>
            ))}
          </div>
        </div>

        {/* Two column layout */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* Signup Panel */}
          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-8 h-8 rounded-lg bg-violet-600/20 border border-violet-700 flex items-center justify-center text-sm">👤</div>
              <h2 className="font-bold text-white text-lg">User Signup</h2>
            </div>
            <div className="flex items-center gap-2 mb-5">
              <span className="w-2 h-2 rounded-full bg-violet-500"></span>
              <p className="text-xs text-gray-500">Managed by <span className="text-violet-400 font-mono">userSlice</span> • Local state for inputs • Redux on submit</p>
            </div>
            <SignupPanel />
          </div>

          {/* Pizza Panel */}
          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-8 h-8 rounded-lg bg-orange-600/20 border border-orange-700 flex items-center justify-center text-sm">🍕</div>
              <h2 className="font-bold text-white text-lg">Pizza Builder</h2>
            </div>
            <div className="flex items-center gap-2 mb-5">
              <span className="w-2 h-2 rounded-full bg-orange-500"></span>
              <p className="text-xs text-gray-500"><span className="text-orange-400 font-mono">pizzaSlice</span> + <span className="text-orange-400 font-mono">cartSlice</span> • Premium toppings • Order receipt</p>
            </div>
            <PizzaPanel />
          </div>
        </div>
      </div>
    </div>
  )
}
