import { useState } from 'react'
import BackButton from '../components/BackButton'

const TOPPINGS = ['Cheese', 'Mushroom', 'Olives', 'Pepperoni', 'Onions', 'Bell Pepper', 'Jalapeño', 'Corn']
const SIDES = ['Garlic Bread', 'Coleslaw', 'Fries', 'Pepsi', 'Lemonade', 'Chocolate Dip']
const SIZE_PRICE = { Small: 299, Medium: 449, Large: 599 }
const CRUST = ['Classic', 'Thin Crust', 'Stuffed', 'Wheat']

const EMPTY_FORM = { name: '', email: '', phone: '', password: '', confirmPassword: '', gender: '', terms: false }

function PasswordStrength({ password }) {
  const checks = [
    { label: '8+ characters', ok: password.length >= 8 },
    { label: 'Uppercase letter', ok: /[A-Z]/.test(password) },
    { label: 'Number', ok: /[0-9]/.test(password) },
    { label: 'Special character (!@#$...)', ok: /[^A-Za-z0-9]/.test(password) },
  ]
  const score = checks.filter(c => c.ok).length
  const color = score <= 1 ? 'bg-red-500' : score === 2 ? 'bg-orange-400' : score === 3 ? 'bg-yellow-400' : 'bg-green-500'
  const label = score <= 1 ? 'Weak' : score === 2 ? 'Fair' : score === 3 ? 'Good' : 'Strong'
  if (!password) return null
  return (
    <div className="mt-1.5 space-y-1.5">
      <div className="flex gap-1">
        {[1,2,3,4].map(i => (
          <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= score ? color : 'bg-gray-200 dark:bg-gray-600'}`} />
        ))}
        <span className="text-xs font-medium ml-1" style={{color: score <= 1 ? '#ef4444' : score === 2 ? '#f97316' : score === 3 ? '#eab308' : '#22c55e'}}>{label}</span>
      </div>
      <div className="flex flex-wrap gap-x-3 gap-y-0.5">
        {checks.map(c => (
          <span key={c.label} className={`text-xs ${c.ok ? 'text-green-500' : 'text-gray-400'}`}>
            {c.ok ? '✓' : '○'} {c.label}
          </span>
        ))}
      </div>
    </div>
  )
}

function RegistrationForm() {
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)

  const validate = (f = form) => {
    const e = {}
    if (!f.name.trim() || f.name.length < 2) e.name = 'Name must be at least 2 characters'
    if (!f.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Enter a valid email address'
    if (!f.phone.match(/^\d{10}$/)) e.phone = 'Phone must be exactly 10 digits'
    if (f.password.length < 8) e.password = 'Password must be 8+ characters'
    else if (!/[A-Z]/.test(f.password)) e.password = 'Password needs at least one uppercase letter'
    else if (!/[0-9]/.test(f.password)) e.password = 'Password needs at least one number'
    else if (!/[^A-Za-z0-9]/.test(f.password)) e.password = 'Password needs at least one special character'
    if (f.password !== f.confirmPassword) e.confirmPassword = 'Passwords do not match'
    if (!f.gender) e.gender = 'Please select a gender'
    if (!f.terms) e.terms = 'You must accept the terms & conditions'
    return e
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    const updated = { ...form, [name]: type === 'checkbox' ? checked : value }
    setForm(updated)
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSuccess(true)
  }

  const handleReset = () => {
    setForm(EMPTY_FORM)
    setErrors({})
    setSuccess(false)
  }

  const isValid = Object.keys(validate()).length === 0

  if (success) return (
    <div className="text-center py-8">
      <div className="text-5xl mb-3">🎉</div>
      <h3 className="text-xl font-bold text-green-600 dark:text-green-400 mb-1">Registration Successful!</h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Welcome aboard, <span className="font-semibold text-gray-700 dark:text-gray-200">{form.name}</span>!</p>
      <p className="text-xs text-gray-400 mb-6">{form.email}</p>
      <div className="bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800 px-4 py-3 text-left mb-5 text-sm space-y-1">
        <p className="text-green-700 dark:text-green-400 font-semibold text-xs mb-2">Registered Details</p>
        <p className="text-gray-600 dark:text-gray-300"><span className="font-medium">Name:</span> {form.name}</p>
        <p className="text-gray-600 dark:text-gray-300"><span className="font-medium">Email:</span> {form.email}</p>
        <p className="text-gray-600 dark:text-gray-300"><span className="font-medium">Phone:</span> {form.phone}</p>
        <p className="text-gray-600 dark:text-gray-300"><span className="font-medium">Gender:</span> {form.gender}</p>
      </div>
      <button onClick={handleReset} className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-semibold">Register Another</button>
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {[
        ['name', 'Full Name', 'text'],
        ['email', 'Email Address', 'email'],
        ['phone', 'Phone Number', 'tel'],
      ].map(([field, label, type]) => (
        <div key={field}>
          <input name={field} type={type} value={form[field]} onChange={handleChange} placeholder={label}
            className={`w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none text-gray-900 dark:text-white placeholder-gray-400 bg-gray-50 dark:bg-gray-700 transition-colors ${errors[field] ? 'border-red-400' : 'border-gray-200 dark:border-gray-600 focus:border-orange-400'}`} />
          {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
        </div>
      ))}
      <div>
        <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password"
          className={`w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none text-gray-900 dark:text-white placeholder-gray-400 bg-gray-50 dark:bg-gray-700 transition-colors ${errors.password ? 'border-red-400' : 'border-gray-200 dark:border-gray-600 focus:border-orange-400'}`} />
        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
        <PasswordStrength password={form.password} />
      </div>
      <div>
        <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm Password"
          className={`w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none text-gray-900 dark:text-white placeholder-gray-400 bg-gray-50 dark:bg-gray-700 transition-colors ${errors.confirmPassword ? 'border-red-400' : 'border-gray-200 dark:border-gray-600 focus:border-orange-400'}`} />
        {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
      </div>
      <div>
        <select name="gender" value={form.gender} onChange={handleChange}
          className={`w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 transition-colors ${errors.gender ? 'border-red-400' : 'border-gray-200 dark:border-gray-600 focus:border-orange-400'}`}>
          <option value="">Select Gender</option>
          <option>Male</option><option>Female</option><option>Non-binary</option><option>Prefer not to say</option>
        </select>
        {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
      </div>
      <label className="flex items-start gap-2 cursor-pointer">
        <input type="checkbox" name="terms" checked={form.terms} onChange={handleChange} className="mt-0.5" />
        <span className="text-xs text-gray-600 dark:text-gray-400">I agree to the <span className="text-orange-500 font-medium cursor-pointer hover:underline">Terms & Conditions</span> and <span className="text-orange-500 font-medium cursor-pointer hover:underline">Privacy Policy</span></span>
      </label>
      {errors.terms && <p className="text-red-500 text-xs">{errors.terms}</p>}
      <div className="flex gap-2 pt-1">
        <button type="submit" disabled={!isValid}
          className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-colors ${isValid ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-400 cursor-not-allowed'}`}>
          Create Account
        </button>
        <button type="button" onClick={handleReset}
          className="px-4 py-2.5 rounded-xl text-sm font-semibold border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-orange-400 hover:text-orange-500 transition-colors">
          Reset
        </button>
      </div>
    </form>
  )
}

function PizzaOrder() {
  const [size, setSize] = useState('Medium')
  const [crust, setCrust] = useState('Classic')
  const [toppings, setToppings] = useState([])
  const [sides, setSides] = useState([])
  const [qty, setQty] = useState(1)
  const [ordered, setOrdered] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  const toggleTopping = t => setToppings(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])
  const toggleSide = s => setSides(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])

  const basePrice = SIZE_PRICE[size]
  const toppingPrice = toppings.length * 30
  const sidePrice = sides.length * 50
  const total = (basePrice + toppingPrice + sidePrice) * qty

  const orderId = 'MRO-' + Math.floor(Math.random() * 90000 + 10000)

  const handleReset = () => {
    setOrdered(false)
    setToppings([])
    setSides([])
    setSize('Medium')
    setCrust('Classic')
    setQty(1)
    setShowPreview(false)
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
      <button onClick={handleReset} className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-semibold">Order Again</button>
    </div>
  )

  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Pizza Size</p>
        <div className="grid grid-cols-3 gap-2">
          {Object.entries(SIZE_PRICE).map(([s, p]) => (
            <button key={s} onClick={() => setSize(s)} className={`py-2 rounded-xl border text-xs font-semibold transition-all ${size === s ? 'bg-orange-500 border-orange-500 text-white' : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-orange-300'}`}>
              {s}<br /><span className="font-normal">₹{p}</span>
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Crust Type</p>
        <div className="grid grid-cols-2 gap-2">
          {CRUST.map(c => (
            <button key={c} onClick={() => setCrust(c)} className={`py-2 rounded-xl border text-xs font-medium transition-all ${crust === c ? 'bg-orange-100 dark:bg-orange-900/30 border-orange-400 text-orange-700 dark:text-orange-300' : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-orange-300'}`}>{c}</button>
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
          Toppings <span className="text-orange-400 normal-case font-normal">(+₹30 each)</span>
          {size === 'Large' && <span className="ml-2 text-green-600 dark:text-green-400 normal-case font-normal">★ Large unlocks all toppings</span>}
        </p>
        <div className="flex flex-wrap gap-2">
          {TOPPINGS.map(t => (
            <button key={t} onClick={() => toggleTopping(t)} className={`px-3 py-1 rounded-lg border text-xs font-medium transition-all ${toppings.includes(t) ? 'bg-orange-500 border-orange-500 text-white' : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-orange-300'}`}>{t}</button>
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Sides & Drinks <span className="text-orange-400 normal-case font-normal">(+₹50 each)</span></p>
        <div className="flex flex-wrap gap-2">
          {SIDES.map(s => (
            <button key={s} onClick={() => toggleSide(s)} className={`px-3 py-1 rounded-lg border text-xs font-medium transition-all ${sides.includes(s) ? 'bg-red-500 border-red-500 text-white' : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-red-300'}`}>{s}</button>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Quantity</p>
        <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-600 font-bold hover:border-orange-400 transition-colors">−</button>
        <span className="font-bold text-gray-900 dark:text-white w-4 text-center">{qty}</span>
        <button onClick={() => setQty(q => q + 1)} className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-600 font-bold hover:border-orange-400 transition-colors">+</button>
      </div>

      {/* Live Order Preview */}
      <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-3 border border-orange-200 dark:border-orange-800">
        <div className="flex items-center justify-between mb-1">
          <p className="text-xs text-orange-600 dark:text-orange-400 font-semibold">Order Preview</p>
          <button onClick={() => setShowPreview(p => !p)} className="text-xs text-orange-500 hover:underline">{showPreview ? 'Hide' : 'Details'}</button>
        </div>
        <p className="text-xs text-gray-600 dark:text-gray-400">{size} {crust}{toppings.length ? ` + ${toppings.join(', ')}` : ''}{sides.length ? ` + ${sides.join(', ')}` : ''} × {qty}</p>
        {showPreview && (
          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 space-y-0.5">
            <p>Base (₹{basePrice}) × {qty} = ₹{basePrice * qty}</p>
            {toppings.length > 0 && <p>Toppings (₹{toppingPrice}) × {qty} = ₹{toppingPrice * qty}</p>}
            {sides.length > 0 && <p>Sides (₹{sidePrice}) × {qty} = ₹{sidePrice * qty}</p>}
          </div>
        )}
        <p className="text-xl font-bold text-gray-900 dark:text-white mt-1">₹{total}</p>
      </div>

      <div className="flex gap-2">
        <button onClick={() => setOrdered(true)} className="flex-1 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-semibold transition-colors">
          Place Order 🍕
        </button>
        <button onClick={handleReset} className="px-4 py-2.5 rounded-xl text-sm font-semibold border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-orange-400 hover:text-orange-500 transition-colors">
          Reset
        </button>
      </div>
    </div>
  )
}

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
