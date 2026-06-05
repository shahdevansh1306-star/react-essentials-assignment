import { useState, useCallback } from 'react'
import BackButton from '../components/BackButton'

const TOPPINGS = ['Cheese', 'Mushroom', 'Olives', 'Pepperoni', 'Onions', 'Bell Pepper', 'Jalapeño', 'Corn']
const SIDES = ['Garlic Bread', 'Coleslaw', 'Fries', 'Pepsi', 'Lemonade', 'Chocolate Dip']
const SIZE_PRICE = { Small: 299, Medium: 449, Large: 599 }
const CRUST_LIST = ['Classic', 'Thin Crust', 'Stuffed', 'Wheat']

// ── Password Strength (pure display, no state) ──────────────────────────────
function PasswordStrength({ password }) {
  if (!password) return null
  const checks = [
    { label: '8+ characters', ok: password.length >= 8 },
    { label: 'Uppercase letter', ok: /[A-Z]/.test(password) },
    { label: 'Number', ok: /[0-9]/.test(password) },
    { label: 'Special character (!@#$...)', ok: /[^A-Za-z0-9]/.test(password) },
  ]
  const score = checks.filter(c => c.ok).length
  const barColor = ['bg-red-500', 'bg-red-500', 'bg-orange-400', 'bg-yellow-400', 'bg-green-500'][score]
  const label = ['', 'Weak', 'Fair', 'Good', 'Strong'][score]
  const labelColor = ['', 'text-red-500', 'text-orange-400', 'text-yellow-500', 'text-green-500'][score]
  return (
    <div className="mt-2 space-y-1.5">
      <div className="flex items-center gap-1">
        {[1,2,3,4].map(i => (
          <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i <= score ? barColor : 'bg-gray-200 dark:bg-gray-600'}`} />
        ))}
        <span className={`text-xs font-semibold ml-2 w-10 ${labelColor}`}>{label}</span>
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-0.5">
        {checks.map(c => (
          <span key={c.label} className={`text-xs transition-colors ${c.ok ? 'text-green-500' : 'text-gray-400 dark:text-gray-500'}`}>
            {c.ok ? '✓' : '○'} {c.label}
          </span>
        ))}
      </div>
    </div>
  )
}

// ── Registration Form ────────────────────────────────────────────────────────
function RegistrationForm() {
  // Use separate state fields to avoid object re-creation causing re-renders
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [gender, setGender] = useState('')
  const [terms, setTerms] = useState(false)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const getFieldError = (field, value) => {
    switch(field) {
      case 'name': return (!value || value.trim().length < 2) ? 'Name must be at least 2 characters' : ''
      case 'email': return !value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ? 'Enter a valid email address' : ''
      case 'phone': return !value.match(/^\d{10}$/) ? 'Phone must be exactly 10 digits' : ''
      case 'password':
        if (value.length < 8) return 'Password must be 8+ characters'
        if (!/[A-Z]/.test(value)) return 'Needs at least one uppercase letter'
        if (!/[0-9]/.test(value)) return 'Needs at least one number'
        if (!/[^A-Za-z0-9]/.test(value)) return 'Needs at least one special character'
        return ''
      case 'confirmPassword': return value !== password ? 'Passwords do not match' : ''
      case 'gender': return !value ? 'Please select a gender' : ''
      case 'terms': return !value ? 'You must accept the terms & conditions' : ''
      default: return ''
    }
  }

  const handleBlur = (field, value) => {
    setTouched(prev => ({ ...prev, [field]: true }))
    setErrors(prev => ({ ...prev, [field]: getFieldError(field, value) }))
  }

  const isFormValid = () => {
    return (
      name.trim().length >= 2 &&
      email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) &&
      phone.match(/^\d{10}$/) &&
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^A-Za-z0-9]/.test(password) &&
      password === confirmPassword &&
      gender &&
      terms
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Touch all fields to show errors
    const allFields = { name, email, phone, password, confirmPassword, gender, terms }
    const newErrors = {}
    Object.entries(allFields).forEach(([field, value]) => {
      newErrors[field] = getFieldError(field, value)
    })
    setErrors(newErrors)
    setTouched({ name: true, email: true, phone: true, password: true, confirmPassword: true, gender: true, terms: true })
    if (!isFormValid()) return
    setSubmitted(true)
  }

  const handleReset = () => {
    setName(''); setEmail(''); setPhone(''); setPassword('')
    setConfirmPassword(''); setGender(''); setTerms(false)
    setErrors({}); setTouched({}); setSubmitted(false)
  }

  const inputCls = (field) =>
    `w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 ${
      touched[field] && errors[field] ? 'border-red-400 focus:border-red-400' : 'border-gray-200 dark:border-gray-600 focus:border-orange-400'
    }`

  if (submitted) return (
    <div className="text-center py-8">
      <div className="text-5xl mb-3">🎉</div>
      <h3 className="text-xl font-bold text-green-600 dark:text-green-400 mb-1">Registration Successful!</h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Welcome, <span className="font-semibold text-gray-700 dark:text-gray-200">{name}</span>!</p>
      <p className="text-xs text-gray-400 mb-5">{email}</p>
      <div className="bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800 px-4 py-3 text-left text-sm space-y-1 mb-5">
        <p className="text-green-700 dark:text-green-400 font-semibold text-xs mb-2">Registered Details</p>
        <p className="text-gray-600 dark:text-gray-300"><span className="font-medium">Name:</span> {name}</p>
        <p className="text-gray-600 dark:text-gray-300"><span className="font-medium">Email:</span> {email}</p>
        <p className="text-gray-600 dark:text-gray-300"><span className="font-medium">Phone:</span> {phone}</p>
        <p className="text-gray-600 dark:text-gray-300"><span className="font-medium">Gender:</span> {gender}</p>
      </div>
      <button onClick={handleReset} className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-semibold transition-colors">Register Another</button>
    </div>
  )

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-3">
      {/* Name */}
      <div>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          onBlur={e => handleBlur('name', e.target.value)}
          placeholder="Full Name"
          autoComplete="name"
          className={inputCls('name')}
        />
        {touched.name && errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>

      {/* Email */}
      <div>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onBlur={e => handleBlur('email', e.target.value)}
          placeholder="Email Address"
          autoComplete="email"
          className={inputCls('email')}
        />
        {touched.email && errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>

      {/* Phone */}
      <div>
        <input
          type="tel"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          onBlur={e => handleBlur('phone', e.target.value)}
          placeholder="Phone Number (10 digits)"
          autoComplete="tel"
          className={inputCls('phone')}
        />
        {touched.phone && errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
      </div>

      {/* Password */}
      <div>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onBlur={e => handleBlur('password', e.target.value)}
          placeholder="Password"
          autoComplete="new-password"
          className={inputCls('password')}
        />
        {touched.password && errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
        <PasswordStrength password={password} />
      </div>

      {/* Confirm Password */}
      <div>
        <input
          type="password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          onBlur={e => handleBlur('confirmPassword', e.target.value)}
          placeholder="Confirm Password"
          autoComplete="new-password"
          className={inputCls('confirmPassword')}
        />
        {touched.confirmPassword && errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
      </div>

      {/* Gender */}
      <div>
        <select
          value={gender}
          onChange={e => setGender(e.target.value)}
          onBlur={e => handleBlur('gender', e.target.value)}
          className={inputCls('gender')}
        >
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Non-binary</option>
          <option>Prefer not to say</option>
        </select>
        {touched.gender && errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
      </div>

      {/* Terms */}
      <label className="flex items-start gap-2.5 cursor-pointer">
        <input
          type="checkbox"
          checked={terms}
          onChange={e => { setTerms(e.target.checked); handleBlur('terms', e.target.checked) }}
          className="mt-0.5 w-4 h-4 accent-orange-500"
        />
        <span className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
          I agree to the <span className="text-orange-500 font-medium cursor-pointer hover:underline">Terms & Conditions</span> and <span className="text-orange-500 font-medium cursor-pointer hover:underline">Privacy Policy</span>
        </span>
      </label>
      {touched.terms && errors.terms && <p className="text-red-500 text-xs">{errors.terms}</p>}

      {/* Buttons */}
      <div className="flex gap-2 pt-1">
        <button
          type="submit"
          className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
            isFormValid()
              ? 'bg-orange-500 hover:bg-orange-600 text-white cursor-pointer'
              : 'bg-gray-200 dark:bg-gray-600 text-gray-400 cursor-not-allowed'
          }`}
        >
          Create Account
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="px-4 py-2.5 rounded-xl text-sm font-semibold border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-orange-400 hover:text-orange-500 transition-colors"
        >
          Reset
        </button>
      </div>
    </form>
  )
}

// ── Pizza Order ──────────────────────────────────────────────────────────────
function PizzaOrder() {
  const [size, setSize] = useState('Medium')
  const [crust, setCrust] = useState('Classic')
  const [toppings, setToppings] = useState([])
  const [sides, setSides] = useState([])
  const [qty, setQty] = useState(1)
  const [ordered, setOrdered] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  const toggleTopping = (t) => setToppings(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])
  const toggleSide = (s) => setSides(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])

  const basePrice = SIZE_PRICE[size]
  const toppingPrice = toppings.length * 30
  const sidePrice = sides.length * 50
  const total = (basePrice + toppingPrice + sidePrice) * qty

  const orderId = 'MRO-' + String(Math.floor(Math.random() * 90000 + 10000))

  const handleReset = () => {
    setSize('Medium'); setCrust('Classic'); setToppings([])
    setSides([]); setQty(1); setOrdered(false); setShowDetails(false)
  }

  if (ordered) return (
    <div className="text-center py-6">
      <div className="text-5xl mb-3">🍕</div>
      <h3 className="text-xl font-bold text-orange-500 mb-1">Order Placed!</h3>
      <p className="text-xs text-gray-400 mb-4">Order ID: <span className="font-mono font-bold text-gray-700 dark:text-gray-200">{orderId}</span></p>
      <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-200 dark:border-orange-800 p-4 text-left text-sm space-y-1.5 mb-5">
        <p className="text-orange-600 dark:text-orange-400 font-semibold text-xs mb-2">📋 Order Receipt</p>
        <p className="text-gray-700 dark:text-gray-300"><span className="font-medium">Size:</span> {size} (₹{SIZE_PRICE[size]})</p>
        <p className="text-gray-700 dark:text-gray-300"><span className="font-medium">Crust:</span> {crust}</p>
        {toppings.length > 0 && <p className="text-gray-700 dark:text-gray-300"><span className="font-medium">Toppings:</span> {toppings.join(', ')} (+₹{toppingPrice})</p>}
        {sides.length > 0 && <p className="text-gray-700 dark:text-gray-300"><span className="font-medium">Sides:</span> {sides.join(', ')} (+₹{sidePrice})</p>}
        <p className="text-gray-700 dark:text-gray-300"><span className="font-medium">Quantity:</span> {qty}</p>
        <div className="border-t border-orange-200 dark:border-orange-800 pt-2 mt-2">
          <p className="text-xl font-bold text-gray-900 dark:text-white">Total: ₹{total}</p>
        </div>
      </div>
      <button onClick={handleReset} className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-semibold transition-colors">Order Again</button>
    </div>
  )

  return (
    <div className="space-y-4">
      {/* Size */}
      <div>
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Pizza Size</p>
        <div className="grid grid-cols-3 gap-2">
          {Object.entries(SIZE_PRICE).map(([s, p]) => (
            <button key={s} type="button" onClick={() => setSize(s)}
              className={`py-2 rounded-xl border text-xs font-semibold transition-all ${size === s ? 'bg-orange-500 border-orange-500 text-white' : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-orange-300'}`}>
              {s}<br /><span className="font-normal">₹{p}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Crust */}
      <div>
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Crust Type</p>
        <div className="grid grid-cols-2 gap-2">
          {CRUST_LIST.map(c => (
            <button key={c} type="button" onClick={() => setCrust(c)}
              className={`py-2 rounded-xl border text-xs font-medium transition-all ${crust === c ? 'bg-orange-100 dark:bg-orange-900/30 border-orange-400 text-orange-700 dark:text-orange-300' : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-orange-300'}`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Toppings */}
      <div>
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
          Toppings <span className="normal-case text-orange-400 font-normal">(+₹30 each)</span>
          {size === 'Large' && <span className="ml-2 text-green-600 dark:text-green-400 normal-case font-normal text-xs">★ Large unlocks all toppings</span>}
        </p>
        <div className="flex flex-wrap gap-2">
          {TOPPINGS.map(t => (
            <button key={t} type="button" onClick={() => toggleTopping(t)}
              className={`px-3 py-1 rounded-lg border text-xs font-medium transition-all ${toppings.includes(t) ? 'bg-orange-500 border-orange-500 text-white' : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-orange-300'}`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Sides */}
      <div>
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
          Sides & Drinks <span className="normal-case text-orange-400 font-normal">(+₹50 each)</span>
        </p>
        <div className="flex flex-wrap gap-2">
          {SIDES.map(s => (
            <button key={s} type="button" onClick={() => toggleSide(s)}
              className={`px-3 py-1 rounded-lg border text-xs font-medium transition-all ${sides.includes(s) ? 'bg-red-500 border-red-500 text-white' : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-red-300'}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div className="flex items-center gap-3">
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Quantity</p>
        <button type="button" onClick={() => setQty(q => Math.max(1, q - 1))}
          className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-600 font-bold hover:border-orange-400 transition-colors text-gray-700 dark:text-gray-200">−</button>
        <span className="font-bold text-gray-900 dark:text-white w-4 text-center">{qty}</span>
        <button type="button" onClick={() => setQty(q => q + 1)}
          className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-600 font-bold hover:border-orange-400 transition-colors text-gray-700 dark:text-gray-200">+</button>
      </div>

      {/* Live Order Preview */}
      <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-3 border border-orange-200 dark:border-orange-800">
        <div className="flex items-center justify-between mb-1">
          <p className="text-xs text-orange-600 dark:text-orange-400 font-semibold">Order Preview</p>
          <button type="button" onClick={() => setShowDetails(d => !d)} className="text-xs text-orange-500 hover:underline">{showDetails ? 'Hide' : 'Details'}</button>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {size} {crust}{toppings.length ? ` + ${toppings.join(', ')}` : ''}{sides.length ? ` + ${sides.join(', ')}` : ''} × {qty}
        </p>
        {showDetails && (
          <div className="mt-2 space-y-0.5 text-xs text-gray-500 dark:text-gray-400">
            <p>Base (₹{basePrice}) × {qty} = ₹{basePrice * qty}</p>
            {toppings.length > 0 && <p>Toppings (₹{toppingPrice}) × {qty} = ₹{toppingPrice * qty}</p>}
            {sides.length > 0 && <p>Sides (₹{sidePrice}) × {qty} = ₹{sidePrice * qty}</p>}
          </div>
        )}
        <p className="text-xl font-bold text-gray-900 dark:text-white mt-1">₹{total}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button type="button" onClick={() => setOrdered(true)}
          className="flex-1 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-semibold transition-colors">
          Place Order 🍕
        </button>
        <button type="button" onClick={handleReset}
          className="px-4 py-2.5 rounded-xl text-sm font-semibold border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-orange-400 hover:text-orange-500 transition-colors">
          Reset
        </button>
      </div>
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function FormsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <BackButton />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Registration & Pizza Order</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">Module 11 — Forms, Validation & Controlled Components</p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="font-bold text-gray-900 dark:text-white mb-1">User Registration</h2>
            <p className="text-xs text-gray-400 mb-5">Real-time validation • Strong password rules • Reset option</p>
            <RegistrationForm />
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="font-bold text-gray-900 dark:text-white mb-1">Mario's Pizza</h2>
            <p className="text-xs text-gray-400 mb-5">Dynamic pricing • Order preview • Receipt generation</p>
            <PizzaOrder />
          </div>
        </div>
      </div>
    </div>
  )
}
