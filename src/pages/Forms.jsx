import { useState } from 'react'
import BackButton from '../components/BackButton'

const TOPPINGS = ['Cheese', 'Mushroom', 'Olives', 'Pepperoni', 'Onions', 'Bell Pepper', 'Jalapeño', 'Corn']
const SIDES = ['Garlic Bread', 'Coleslaw', 'Fries', 'Pepsi', 'Lemonade', 'Chocolate Dip']
const SIZE_PRICE = { Small: 299, Medium: 449, Large: 599 }
const CRUST = ['Classic', 'Thin Crust', 'Stuffed', 'Wheat']

function RegistrationForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '', gender: '', terms: false })
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.name.trim() || form.name.length < 2) e.name = 'Name must be at least 2 characters'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Enter a valid email'
    if (!form.phone.match(/^\d{10}$/)) e.phone = 'Phone must be 10 digits'
    if (form.password.length < 8) e.password = 'Password must be 8+ characters'
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match'
    if (!form.gender) e.gender = 'Please select a gender'
    if (!form.terms) e.terms = 'You must accept the terms'
    return e
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSuccess(true)
  }

  const isValid = !Object.keys(validate()).length

  if (success) return (
    <div className="text-center py-10">
      <div className="text-5xl mb-3">🎉</div>
      <h3 className="text-xl font-bold text-green-600 dark:text-green-400 mb-2">Registration Successful!</h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-5">Welcome, {form.name}!</p>
      <button onClick={() => { setSuccess(false); setForm({ name: '', email: '', phone: '', password: '', confirmPassword: '', gender: '', terms: false }) }} className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-semibold">Register Again</button>
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {[['name', 'Full Name', 'text'], ['email', 'Email Address', 'email'], ['phone', 'Phone Number', 'tel'], ['password', 'Password', 'password'], ['confirmPassword', 'Confirm Password', 'password']].map(([field, label, type]) => (
        <div key={field}>
          <input name={field} type={type} value={form[field]} onChange={handleChange} placeholder={label}
            className={`w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none text-gray-900 dark:text-white placeholder-gray-400 bg-gray-50 dark:bg-gray-700 ${errors[field] ? 'border-red-400' : 'border-gray-200 dark:border-gray-600 focus:border-orange-400'}`} />
          {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
        </div>
      ))}
      <div>
        <select name="gender" value={form.gender} onChange={handleChange} className={`w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 ${errors.gender ? 'border-red-400' : 'border-gray-200 dark:border-gray-600 focus:border-orange-400'}`}>
          <option value="">Select Gender</option>
          <option>Male</option><option>Female</option><option>Non-binary</option><option>Prefer not to say</option>
        </select>
        {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
      </div>
      <label className="flex items-start gap-2 cursor-pointer">
        <input type="checkbox" name="terms" checked={form.terms} onChange={handleChange} className="mt-0.5" />
        <span className="text-xs text-gray-600 dark:text-gray-400">I agree to the <span className="text-orange-500 font-medium">Terms & Conditions</span></span>
      </label>
      {errors.terms && <p className="text-red-500 text-xs">{errors.terms}</p>}
      <button type="submit" disabled={!isValid} className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-colors ${isValid ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-400 cursor-not-allowed'}`}>
        Create Account
      </button>
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

  const toggleTopping = t => setToppings(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])
  const toggleSide = s => setSides(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])

  const basePrice = SIZE_PRICE[size]
  const toppingPrice = toppings.length * 30
  const sidePrice = sides.length * 50
  const total = (basePrice + toppingPrice + sidePrice) * qty

  if (ordered) return (
    <div className="text-center py-8">
      <div className="text-5xl mb-3">🍕</div>
      <h3 className="text-xl font-bold text-orange-500 mb-1">Order Placed!</h3>
      <p className="text-gray-500 text-sm mb-1">{size} {crust} pizza × {qty}</p>
      <p className="text-2xl font-bold text-gray-900 dark:text-white mb-5">₹{total}</p>
      <button onClick={() => { setOrdered(false); setToppings([]); setSides([]) }} className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-semibold">Order Again</button>
    </div>
  )

  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Size</p>
        <div className="grid grid-cols-3 gap-2">
          {Object.entries(SIZE_PRICE).map(([s, p]) => (
            <button key={s} onClick={() => setSize(s)} className={`py-2 rounded-xl border text-xs font-semibold transition-all ${size === s ? 'bg-orange-500 border-orange-500 text-white' : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-orange-300'}`}>
              {s}<br /><span className="font-normal">₹{p}</span>
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Crust</p>
        <div className="grid grid-cols-2 gap-2">
          {CRUST.map(c => (
            <button key={c} onClick={() => setCrust(c)} className={`py-2 rounded-xl border text-xs font-medium transition-all ${crust === c ? 'bg-orange-100 dark:bg-orange-900/30 border-orange-400 text-orange-700 dark:text-orange-300' : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-orange-300'}`}>{c}</button>
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Toppings (+₹30 each)</p>
        <div className="flex flex-wrap gap-2">
          {TOPPINGS.map(t => (
            <button key={t} onClick={() => toggleTopping(t)} className={`px-3 py-1 rounded-lg border text-xs font-medium transition-all ${toppings.includes(t) ? 'bg-orange-500 border-orange-500 text-white' : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-orange-300'}`}>{t}</button>
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Sides (+₹50 each)</p>
        <div className="flex flex-wrap gap-2">
          {SIDES.map(s => (
            <button key={s} onClick={() => toggleSide(s)} className={`px-3 py-1 rounded-lg border text-xs font-medium transition-all ${sides.includes(s) ? 'bg-red-500 border-red-500 text-white' : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-red-300'}`}>{s}</button>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Qty</p>
        <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-600 font-bold hover:border-orange-400 transition-colors">−</button>
        <span className="font-bold text-gray-900 dark:text-white">{qty}</span>
        <button onClick={() => setQty(q => q + 1)} className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-600 font-bold hover:border-orange-400 transition-colors">+</button>
      </div>
      <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-3 border border-orange-200 dark:border-orange-800">
        <p className="text-xs text-orange-600 dark:text-orange-400 font-semibold mb-1">Order Summary</p>
        <p className="text-xs text-gray-600 dark:text-gray-400">{size} {crust} pizza{toppings.length ? ` + ${toppings.join(', ')}` : ''}{sides.length ? ` + ${sides.join(', ')}` : ''} × {qty}</p>
        <p className="text-xl font-bold text-gray-900 dark:text-white mt-1">₹{total}</p>
      </div>
      <button onClick={() => setOrdered(true)} className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-semibold transition-colors">
        Place Order 🍕
      </button>
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
            <p className="text-xs text-gray-400 mb-5">With real-time validation</p>
            <RegistrationForm />
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="font-bold text-gray-900 dark:text-white mb-1">Mario's Pizza</h2>
            <p className="text-xs text-gray-400 mb-5">Online ordering with dynamic pricing</p>
            <PizzaOrder />
          </div>
        </div>
      </div>
    </div>
  )
}
