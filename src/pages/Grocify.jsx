import { useState, useEffect } from 'react'
import BackButton from '../components/BackButton'
import basketImg from '../assets/basket.png'
import freshFruitsImg from '../assets/fresh-fruits.png'
import fruitsVeggiesImg from '../assets/fruits-and-veggies.png'
import dairyEggsImg from '../assets/dairy-and-eggs.png'
import meatSeafoodImg from '../assets/meat-and-seafood.png'
import fruitsBannerImg from '../assets/fruits-banner.jpg'
import dairyBannerImg from '../assets/dairy-banner.jpg'
import allBannerImg from '../assets/all-banner.jpg'
import customer1 from '../assets/customer1.jpg'
import customer2 from '../assets/customer2.jpg'
import customer3 from '../assets/customer3.jpg'

const NAV_LINKS = ['Home', 'About Us', 'Process', 'Contact Us']

const ALL_PRODUCTS = [
  { id: 1, name: 'Fresh Strawberries', price: 149, original: 199, unit: '250g', img: freshFruitsImg, tag: 'Sale', tagColor: 'bg-red-500', category: 'Fruits' },
  { id: 2, name: 'Organic Mango', price: 199, original: null, unit: '500g', img: freshFruitsImg, tag: 'Fresh', tagColor: 'bg-green-500', category: 'Fruits' },
  { id: 3, name: 'Kiwi Pack', price: 249, original: 299, unit: '4 pcs', img: freshFruitsImg, tag: 'Popular', tagColor: 'bg-orange-500', category: 'Fruits' },
  { id: 4, name: 'Grapes (Green)', price: 129, original: null, unit: '500g', img: freshFruitsImg, tag: 'Fresh', tagColor: 'bg-green-500', category: 'Fruits' },
  { id: 5, name: 'Organic Broccoli', price: 89, original: null, unit: '500g', img: fruitsVeggiesImg, tag: 'Fresh', tagColor: 'bg-green-500', category: 'Vegetables' },
  { id: 6, name: 'Fresh Capsicum', price: 69, original: 89, unit: '250g', img: fruitsVeggiesImg, tag: 'Sale', tagColor: 'bg-red-500', category: 'Vegetables' },
  { id: 7, name: 'Baby Spinach', price: 49, original: null, unit: '200g', img: fruitsVeggiesImg, tag: 'Organic', tagColor: 'bg-green-600', category: 'Vegetables' },
  { id: 8, name: 'Cabbage', price: 39, original: null, unit: '1 pc', img: fruitsVeggiesImg, tag: 'Fresh', tagColor: 'bg-green-500', category: 'Vegetables' },
  { id: 9, name: 'Farm Eggs', price: 120, original: 140, unit: '12 pcs', img: dairyEggsImg, tag: 'Popular', tagColor: 'bg-orange-500', category: 'Dairy & Eggs' },
  { id: 10, name: 'Whole Milk', price: 68, original: null, unit: '1L', img: dairyEggsImg, tag: 'Fresh', tagColor: 'bg-green-500', category: 'Dairy & Eggs' },
  { id: 11, name: 'Greek Yogurt', price: 149, original: 179, unit: '400g', img: dairyEggsImg, tag: 'Sale', tagColor: 'bg-red-500', category: 'Dairy & Eggs' },
  { id: 12, name: 'Butter Block', price: 59, original: null, unit: '100g', img: dairyEggsImg, tag: 'Popular', tagColor: 'bg-orange-500', category: 'Dairy & Eggs' },
  { id: 13, name: 'Salmon Fillet', price: 499, original: null, unit: '300g', img: meatSeafoodImg, tag: 'Premium', tagColor: 'bg-indigo-500', category: 'Meat & Seafood' },
  { id: 14, name: 'Chicken Breast', price: 299, original: 349, unit: '500g', img: meatSeafoodImg, tag: 'Sale', tagColor: 'bg-red-500', category: 'Meat & Seafood' },
  { id: 15, name: 'Tiger Shrimp', price: 399, original: null, unit: '250g', img: meatSeafoodImg, tag: 'Fresh', tagColor: 'bg-green-500', category: 'Meat & Seafood' },
  { id: 16, name: 'Beef Steak', price: 599, original: 699, unit: '300g', img: meatSeafoodImg, tag: 'Premium', tagColor: 'bg-indigo-500', category: 'Meat & Seafood' },
]

const CATEGORIES = [
  { icon: freshFruitsImg, name: 'Fruits', count: '120+ items', bg: 'bg-red-50 dark:bg-red-900/10' },
  { icon: fruitsVeggiesImg, name: 'Vegetables', count: '80+ items', bg: 'bg-green-50 dark:bg-green-900/10' },
  { icon: dairyEggsImg, name: 'Dairy & Eggs', count: '40+ items', bg: 'bg-yellow-50 dark:bg-yellow-900/10' },
  { icon: meatSeafoodImg, name: 'Meat & Seafood', count: '60+ items', bg: 'bg-orange-50 dark:bg-orange-900/10' },
]

const BANNERS = [
  { img: fruitsBannerImg, title: 'Fresh Fruits', sub: 'Farm to table, same day delivery' },
  { img: dairyBannerImg, title: 'Dairy & Eggs', sub: 'Pure, fresh, and organic' },
  { img: allBannerImg, title: 'Everything Fresh', sub: 'Best prices, delivered fast' },
]

const TESTIMONIALS = [
  { img: customer1, name: 'Priya Sharma', role: 'Home Chef', text: 'Grocify delivers the freshest produce I have ever seen! Same day delivery is a game changer.', stars: 5 },
  { img: customer2, name: 'Rahul Mehta', role: 'Fitness Enthusiast', text: 'Love the quality of organic vegetables. My smoothies have never tasted better!', stars: 5 },
  { img: customer3, name: 'Anita Patel', role: 'Working Mom', text: 'Saves me so much time every week. The app is easy and delivery is always on time.', stars: 5 },
]

// ─── CART DRAWER ───────────────────────────────────────────────────────────────
function CartDrawer({ cart, onClose, onRemove, onQtyChange, onPlaceOrder, darkMode }) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const [step, setStep] = useState('cart') // cart | address | payment | success
  const [address, setAddress] = useState({ name: '', phone: '', pincode: '', city: '', state: '', full: '' })
  const [payMethod, setPayMethod] = useState('cod')
  const [cardInfo, setCardInfo] = useState({ number: '', expiry: '', cvv: '', holder: '' })
  const [errors, setErrors] = useState({})

  const validateAddress = () => {
    const e = {}
    if (!address.name.trim()) e.name = 'Required'
    if (!address.phone.match(/^\d{10}$/)) e.phone = '10 digit phone required'
    if (!address.pincode.match(/^\d{6}$/)) e.pincode = '6 digit pincode required'
    if (!address.city.trim()) e.city = 'Required'
    if (!address.state.trim()) e.state = 'Required'
    if (!address.full.trim()) e.full = 'Required'
    return e
  }

  const validateCard = () => {
    const e = {}
    if (payMethod === 'card') {
      if (!cardInfo.number.replace(/\s/g,'').match(/^\d{16}$/)) e.number = '16 digit card number required'
      if (!cardInfo.expiry.match(/^\d{2}\/\d{2}$/)) e.expiry = 'MM/YY format required'
      if (!cardInfo.cvv.match(/^\d{3}$/)) e.cvv = '3 digit CVV required'
      if (!cardInfo.holder.trim()) e.holder = 'Required'
    }
    return e
  }

  const handleAddressNext = () => {
    const e = validateAddress()
    if (Object.keys(e).length) { setErrors(e); return }
    setErrors({})
    setStep('payment')
  }

  const handlePlaceOrder = () => {
    const e = validateCard()
    if (Object.keys(e).length) { setErrors(e); return }
    setErrors({})
    setStep('success')
    onPlaceOrder()
  }

  const inputCls = (field) => `w-full px-3 py-2 rounded-xl border text-sm focus:outline-none transition-colors ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-gray-50 border-gray-200 text-gray-900'} ${errors[field] ? 'border-red-400' : 'focus:border-orange-400'}`

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div className="flex-1 bg-black/50" onClick={onClose} />
      {/* Drawer */}
      <div className={`w-full max-w-md flex flex-col h-full shadow-2xl ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
        {/* Header */}
        <div className={`flex items-center justify-between px-5 py-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
          <div className="flex items-center gap-3">
            {step !== 'cart' && step !== 'success' && (
              <button onClick={() => setStep(step === 'payment' ? 'address' : 'cart')} className="text-orange-500 font-bold text-lg">←</button>
            )}
            <h2 className="font-bold text-lg">
              {step === 'cart' && `My Cart (${cart.length})`}
              {step === 'address' && 'Delivery Address'}
              {step === 'payment' && 'Payment Method'}
              {step === 'success' && 'Order Placed! 🎉'}
            </h2>
          </div>
          <button onClick={onClose} className="text-2xl text-gray-400 hover:text-gray-600 leading-none">×</button>
        </div>

        {/* Steps indicator */}
        {step !== 'success' && (
          <div className={`flex px-5 py-3 gap-2 border-b text-xs font-semibold ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
            {['cart','address','payment'].map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${step === s ? 'bg-orange-500 text-white' : ['cart','address','payment'].indexOf(step) > i ? 'bg-green-500 text-white' : darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-400'}`}>{i+1}</span>
                <span className={step === s ? 'text-orange-500' : darkMode ? 'text-gray-400' : 'text-gray-400'}>{s.charAt(0).toUpperCase()+s.slice(1)}</span>
                {i < 2 && <span className="text-gray-300">›</span>}
              </div>
            ))}
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4">

          {/* STEP: CART */}
          {step === 'cart' && (
            cart.length === 0
              ? <div className="text-center py-16"><div className="text-6xl mb-3">🛒</div><p className={`font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Your cart is empty</p><p className="text-xs text-gray-400 mt-1">Add some fresh items!</p></div>
              : <div className="space-y-3">
                  {cart.map(item => (
                    <div key={item.id} className={`flex items-center gap-3 p-3 rounded-2xl border ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-100 bg-gray-50'}`}>
                      <img src={item.img} alt={item.name} className="w-14 h-14 object-contain rounded-xl bg-white p-1" />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm truncate">{item.name}</p>
                        <p className="text-xs text-gray-400">{item.unit}</p>
                        <p className="font-bold text-orange-500 text-sm">₹{item.price}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <button onClick={() => onRemove(item.id)} className="text-red-400 hover:text-red-500 text-xs">✕</button>
                        <div className={`flex items-center gap-2 rounded-lg border px-2 py-1 ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                          <button onClick={() => onQtyChange(item.id, item.qty - 1)} className="font-bold text-sm w-4 text-center">−</button>
                          <span className="text-sm font-semibold w-4 text-center">{item.qty}</span>
                          <button onClick={() => onQtyChange(item.id, item.qty + 1)} className="font-bold text-sm w-4 text-center">+</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
          )}

          {/* STEP: ADDRESS */}
          {step === 'address' && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1 block">Full Name</label>
                  <input value={address.name} onChange={e => setAddress({...address, name: e.target.value})} placeholder="Your name" className={inputCls('name')} />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1 block">Phone</label>
                  <input value={address.phone} onChange={e => setAddress({...address, phone: e.target.value})} placeholder="10 digit number" className={inputCls('phone')} />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">Full Address</label>
                <textarea value={address.full} onChange={e => setAddress({...address, full: e.target.value})} placeholder="House no, Street, Area..." rows={2} className={inputCls('full')} />
                {errors.full && <p className="text-red-500 text-xs mt-1">{errors.full}</p>}
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1 block">Pincode</label>
                  <input value={address.pincode} onChange={e => setAddress({...address, pincode: e.target.value})} placeholder="6 digits" className={inputCls('pincode')} />
                  {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1 block">City</label>
                  <input value={address.city} onChange={e => setAddress({...address, city: e.target.value})} placeholder="City" className={inputCls('city')} />
                  {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1 block">State</label>
                  <input value={address.state} onChange={e => setAddress({...address, state: e.target.value})} placeholder="State" className={inputCls('state')} />
                  {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                </div>
              </div>
            </div>
          )}

          {/* STEP: PAYMENT */}
          {step === 'payment' && (
            <div className="space-y-4">
              <p className="text-sm font-semibold text-gray-500">Select Payment Method</p>
              {[
                { id: 'cod', label: 'Cash on Delivery', icon: '💵', desc: 'Pay when your order arrives' },
                { id: 'card', label: 'Credit / Debit Card', icon: '💳', desc: 'Visa, Mastercard, RuPay' },
                { id: 'upi', label: 'UPI', icon: '📱', desc: 'GPay, PhonePe, Paytm' },
              ].map(m => (
                <button key={m.id} onClick={() => setPayMethod(m.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${payMethod === m.id ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20' : darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
                  <span className="text-2xl">{m.icon}</span>
                  <div>
                    <p className="font-bold text-sm">{m.label}</p>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{m.desc}</p>
                  </div>
                  <div className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center ${payMethod === m.id ? 'border-orange-500' : darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                    {payMethod === m.id && <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />}
                  </div>
                </button>
              ))}

              {/* Card fields */}
              {payMethod === 'card' && (
                <div className={`space-y-3 p-4 rounded-2xl border ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-100 bg-gray-50'}`}>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 mb-1 block">Card Number</label>
                    <input value={cardInfo.number} onChange={e => setCardInfo({...cardInfo, number: e.target.value})} placeholder="1234 5678 9012 3456" maxLength={19} className={inputCls('number')} />
                    {errors.number && <p className="text-red-500 text-xs mt-1">{errors.number}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 mb-1 block">Card Holder Name</label>
                    <input value={cardInfo.holder} onChange={e => setCardInfo({...cardInfo, holder: e.target.value})} placeholder="Name on card" className={inputCls('holder')} />
                    {errors.holder && <p className="text-red-500 text-xs mt-1">{errors.holder}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-gray-500 mb-1 block">Expiry</label>
                      <input value={cardInfo.expiry} onChange={e => setCardInfo({...cardInfo, expiry: e.target.value})} placeholder="MM/YY" maxLength={5} className={inputCls('expiry')} />
                      {errors.expiry && <p className="text-red-500 text-xs mt-1">{errors.expiry}</p>}
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-500 mb-1 block">CVV</label>
                      <input value={cardInfo.cvv} onChange={e => setCardInfo({...cardInfo, cvv: e.target.value})} placeholder="123" maxLength={3} type="password" className={inputCls('cvv')} />
                      {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* UPI */}
              {payMethod === 'upi' && (
                <div className={`p-4 rounded-2xl border ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-100 bg-gray-50'}`}>
                  <label className="text-xs font-semibold text-gray-500 mb-1 block">UPI ID</label>
                  <input placeholder="yourname@upi" className={inputCls('upi')} />
                </div>
              )}

              {/* Order summary */}
              <div className={`rounded-2xl border p-4 space-y-2 ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-100 bg-gray-50'}`}>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Order Summary</p>
                {cart.map(i => (
                  <div key={i.id} className="flex justify-between text-sm">
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{i.name} × {i.qty}</span>
                    <span className="font-semibold">₹{i.price * i.qty}</span>
                  </div>
                ))}
                <div className={`border-t pt-2 mt-2 flex justify-between font-bold ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <span>Delivery</span><span className="text-green-500">FREE</span>
                </div>
                <div className="flex justify-between font-extrabold text-lg">
                  <span>Total</span><span className="text-orange-500">₹{total}</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP: SUCCESS */}
          {step === 'success' && (
            <div className="text-center py-10">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-xl font-extrabold text-green-600 dark:text-green-400 mb-1">Order Confirmed!</h3>
              <p className={`text-sm mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Thank you, {address.name}!</p>
              <p className="text-xs text-gray-400 mb-6">Estimated delivery: <span className="font-semibold text-gray-700 dark:text-gray-200">Today, 6–8 PM</span></p>
              <div className={`rounded-2xl border p-4 text-left space-y-2 mb-6 ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-100 bg-gray-50'}`}>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Receipt</p>
                {cart.map(i => (
                  <div key={i.id} className="flex justify-between text-sm">
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{i.name} × {i.qty}</span>
                    <span className="font-semibold">₹{i.price * i.qty}</span>
                  </div>
                ))}
                <div className="flex justify-between font-extrabold text-base border-t pt-2 dark:border-gray-700">
                  <span>Total Paid</span><span className="text-orange-500">₹{total}</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">Payment: <span className="font-semibold capitalize">{payMethod === 'cod' ? 'Cash on Delivery' : payMethod === 'card' ? 'Card' : 'UPI'}</span></p>
                <p className="text-xs text-gray-400">Deliver to: <span className="font-semibold">{address.full}, {address.city}</span></p>
              </div>
              <button onClick={onClose} className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-bold transition-colors">Continue Shopping</button>
            </div>
          )}
        </div>

        {/* Footer */}
        {step !== 'success' && (
          <div className={`px-5 py-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
            {step === 'cart' && (
              <>
                <div className="flex justify-between mb-3">
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total ({cart.length} items)</span>
                  <span className="font-extrabold text-lg text-orange-500">₹{total}</span>
                </div>
                <button onClick={() => cart.length > 0 && setStep('address')} disabled={cart.length === 0}
                  className={`w-full py-3 rounded-full font-bold text-sm transition-colors ${cart.length > 0 ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
                  Proceed to Checkout →
                </button>
              </>
            )}
            {step === 'address' && (
              <button onClick={handleAddressNext} className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-bold text-sm transition-colors">
                Continue to Payment →
              </button>
            )}
            {step === 'payment' && (
              <button onClick={handlePlaceOrder} className="w-full py-3 bg-green-500 hover:bg-green-600 text-white rounded-full font-bold text-sm transition-colors">
                Place Order ₹{total}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── CATEGORY PAGE ─────────────────────────────────────────────────────────────
function CategoryPage({ category, products, onBack, onAddToCart, darkMode }) {
  const filtered = products.filter(p => p.category === category)
  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className={`sticky top-0 z-10 px-4 py-4 border-b flex items-center gap-3 ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'} shadow-sm`}>
        <button onClick={onBack} className="w-9 h-9 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-orange-500 font-bold text-lg hover:bg-orange-50 transition-colors">←</button>
        <h2 className="font-extrabold text-xl">{category}</h2>
        <span className={`ml-auto text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{filtered.length} products</span>
      </div>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filtered.map(p => (
            <div key={p.id} className={`rounded-2xl border overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
              <div className="relative">
                <img src={p.img} alt={p.name} className="w-full h-36 object-contain bg-gray-50 dark:bg-gray-700 p-3" />
                <span className={`absolute top-2 left-2 ${p.tagColor} text-white text-xs font-bold px-2 py-0.5 rounded-lg`}>{p.tag}</span>
              </div>
              <div className="p-3">
                <p className="font-semibold text-sm leading-tight mb-0.5">{p.name}</p>
                <p className={`text-xs mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`}>{p.unit}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-extrabold text-orange-500">₹{p.price}</span>
                    {p.original && <span className={`ml-1.5 text-xs line-through ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>₹{p.original}</span>}
                  </div>
                  <button onClick={() => onAddToCart(p)}
                    className="w-8 h-8 bg-orange-500 hover:bg-orange-600 text-white rounded-full flex items-center justify-center text-lg font-bold transition-colors">+</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── MAIN PAGE ─────────────────────────────────────────────────────────────────
export default function Grocify() {
  const [search, setSearch] = useState('')
  const [mobileMenu, setMobileMenu] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [cart, setCart] = useState([])
  const [wishCount, setWishCount] = useState(0)
  const [cartOpen, setCartOpen] = useState(false)
  const [activeBanner, setActiveBanner] = useState(0)
  const [activeCategory, setActiveCategory] = useState(null)
  const [toast, setToast] = useState('')

  useEffect(() => {
    const t = setInterval(() => setActiveBanner(b => (b + 1) % BANNERS.length), 3500)
    return () => clearInterval(t)
  }, [])

  const cartCount = cart.reduce((s, i) => s + i.qty, 0)

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) return prev.map(i => i.id === product.id ? {...i, qty: i.qty + 1} : i)
      return [...prev, { ...product, qty: 1 }]
    })
    setToast(product.name)
    setTimeout(() => setToast(''), 2000)
  }

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id))
  const changeQty = (id, qty) => {
    if (qty < 1) { removeFromCart(id); return }
    setCart(prev => prev.map(i => i.id === id ? {...i, qty} : i))
  }
  const placeOrder = () => setCart([])

  const handleSearch = (e) => {
    e.preventDefault()
    console.log('Search:', search)
  }

  // Show category page
  if (activeCategory) {
    return <CategoryPage category={activeCategory} products={ALL_PRODUCTS} onBack={() => setActiveCategory(null)} onAddToCart={(p) => { addToCart(p); setActiveCategory(null) }} darkMode={darkMode} />
  }

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${darkMode ? 'bg-gray-950 text-white' : 'bg-white text-gray-900'}`}>

      {/* Cart Drawer */}
      {cartOpen && <CartDrawer cart={cart} onClose={() => setCartOpen(false)} onRemove={removeFromCart} onQtyChange={changeQty} onPlaceOrder={placeOrder} darkMode={darkMode} />}

      {/* Toast */}
      {toast && (
        <div className="fixed top-20 right-4 z-50 bg-green-500 text-white px-4 py-2 rounded-xl shadow-lg text-sm font-medium">
          ✓ {toast} added to cart
        </div>
      )}

      {/* ── NAVBAR ── */}
      <nav className={`sticky top-0 z-40 border-b shadow-sm transition-colors ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-6">
          <a href="#" className="text-xl font-extrabold shrink-0">Gr<span className="text-orange-500">O</span>cify</a>
          <div className="hidden md:flex items-center gap-6 flex-1">
            {NAV_LINKS.map((item, i) => (
              <a key={item} href="#" className={`text-sm font-medium hover:text-orange-500 transition-colors ${i === 0 ? 'text-orange-500' : darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{item}</a>
            ))}
          </div>
          <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-xs">
            <div className="relative flex-1">
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search fresh products..."
                className={`w-full pl-4 pr-10 py-2 rounded-full border text-sm focus:outline-none focus:border-orange-400 transition-colors ${darkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' : 'bg-gray-50 border-gray-200 placeholder-gray-400'}`} />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-500">🔍</button>
            </div>
          </form>
          <div className="flex items-center gap-3 ml-auto">
            <button onClick={() => setWishCount(w => w + 1)} className="relative text-xl hover:scale-110 transition-transform">
              ❤️{wishCount > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">{wishCount}</span>}
            </button>
            <button onClick={() => setCartOpen(true)} className="relative text-xl hover:scale-110 transition-transform">
              🛒{cartCount > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full text-white text-xs flex items-center justify-center">{cartCount}</span>}
            </button>
            <button onClick={() => setDarkMode(d => !d)} className={`text-lg px-2.5 py-1.5 rounded-lg border transition-colors ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 hover:border-orange-400'}`}>
              {darkMode ? '☀️' : '🌙'}
            </button>
            <button onClick={() => setMobileMenu(m => !m)} className="md:hidden text-xl">☰</button>
          </div>
        </div>
        {mobileMenu && (
          <div className={`md:hidden border-t px-4 py-3 space-y-2 ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'}`}>
            {NAV_LINKS.map(item => <a key={item} href="#" className="block py-1.5 text-sm hover:text-orange-500">{item}</a>)}
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold border mb-6 ${darkMode ? 'border-orange-700 text-orange-400 bg-orange-900/20' : 'border-orange-200 text-orange-600 bg-orange-50'}`}>🌱 Export Best Quality...</span>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-5">
            Tasty Organic<br />
            <span className="text-orange-500">Fruits &amp; Veggies</span><br />
            In Your City
          </h1>
          <p className={`text-base leading-relaxed mb-8 max-w-md ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Bred for a high content of beneficial substances. Our products are all fresh and healthy — delivered to your door the same day.
          </p>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => setCartOpen(true)} className="px-8 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full shadow-lg shadow-orange-200 hover:scale-105 transition-all duration-300">
              Shop Now →
            </button>
            <button className={`px-8 py-3.5 rounded-full font-semibold border transition-all hover:border-orange-400 hover:text-orange-500 ${darkMode ? 'border-gray-600 text-gray-300' : 'border-gray-300 text-gray-600'}`}>
              Learn More
            </button>
          </div>
          <div className="flex gap-8 mt-10">
            {[['500+', 'Products'], ['50K+', 'Customers'], ['1-Day', 'Delivery']].map(([num, label]) => (
              <div key={label}>
                <p className="text-2xl font-extrabold text-orange-500">{num}</p>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center">
          <div className="relative">
            <div className={`absolute inset-0 rounded-full scale-90 blur-3xl opacity-30 ${darkMode ? 'bg-orange-800' : 'bg-orange-200'}`} />
            <img src={basketImg} alt="Fresh basket" className="relative w-72 h-72 md:w-[420px] md:h-[420px] object-contain animate-float drop-shadow-2xl" />
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className={`py-14 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold mb-2">Shop by Category</h2>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Click a category to browse products</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {CATEGORIES.map(cat => (
              <button key={cat.name} onClick={() => setActiveCategory(cat.name)}
                className={`${cat.bg} border rounded-2xl p-5 text-center hover:-translate-y-1 hover:shadow-md transition-all cursor-pointer ${darkMode ? 'border-gray-700 hover:border-orange-500' : 'border-gray-100 hover:border-orange-400'}`}>
                <img src={cat.icon} alt={cat.name} className="w-16 h-16 object-contain mx-auto mb-3" />
                <p className="font-bold text-sm">{cat.name}</p>
                <p className={`text-xs mt-0.5 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`}>{cat.count}</p>
                <span className="mt-2 inline-block text-xs text-orange-500 font-semibold">Browse →</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── BANNER SLIDER ── */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="relative rounded-3xl overflow-hidden h-52 md:h-72 shadow-xl">
          {BANNERS.map((b, i) => (
            <div key={i} className={`absolute inset-0 transition-opacity duration-700 ${i === activeBanner ? 'opacity-100' : 'opacity-0'}`}>
              <img src={b.img} alt={b.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center px-10">
                <div>
                  <h3 className="text-white text-3xl font-extrabold mb-1">{b.title}</h3>
                  <p className="text-white/80 text-sm mb-4">{b.sub}</p>
                  <button onClick={() => setCartOpen(true)} className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-full text-sm font-bold">Shop Now</button>
                </div>
              </div>
            </div>
          ))}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {BANNERS.map((_, i) => (
              <button key={i} onClick={() => setActiveBanner(i)} className={`h-2 rounded-full transition-all ${i === activeBanner ? 'bg-orange-500 w-5' : 'bg-white/60 w-2'}`} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className={`py-14 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-extrabold">Featured Products</h2>
              <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Handpicked fresh picks just for you</p>
            </div>
            <button onClick={() => setActiveCategory('Fruits')} className="text-sm font-semibold text-orange-500 hover:underline">View All →</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {ALL_PRODUCTS.slice(0, 8).map(p => (
              <div key={p.id} className={`rounded-2xl border overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                <div className="relative">
                  <img src={p.img} alt={p.name} className="w-full h-36 object-contain bg-gray-50 dark:bg-gray-700 p-2" />
                  <span className={`absolute top-2 left-2 ${p.tagColor} text-white text-xs font-bold px-2 py-0.5 rounded-lg`}>{p.tag}</span>
                  <button onClick={() => setWishCount(w => w + 1)} className="absolute top-2 right-2 w-7 h-7 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center shadow hover:scale-110 transition-transform text-sm">❤️</button>
                </div>
                <div className="p-3">
                  <p className="font-semibold text-sm leading-tight mb-0.5">{p.name}</p>
                  <p className={`text-xs mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`}>{p.unit}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-extrabold text-orange-500">₹{p.price}</span>
                      {p.original && <span className={`ml-1.5 text-xs line-through ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>₹{p.original}</span>}
                    </div>
                    <button onClick={() => addToCart(p)} className="w-7 h-7 bg-orange-500 hover:bg-orange-600 text-white rounded-full flex items-center justify-center text-base font-bold transition-colors">+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold mb-2">Why Choose Grocify?</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[['🌿','Always Organic','100% certified organic from trusted farms'],['⚡','Same Day Delivery','Order before 2PM, delivered by evening'],['💯','Quality Guaranteed','Fresh or your money back'],['💳','Best Prices','Lowest prices compared to local stores']].map(([icon, title, desc]) => (
            <div key={title} className={`rounded-2xl p-5 text-center border hover:-translate-y-1 transition-all ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-100 hover:border-orange-200'}`}>
              <div className="text-4xl mb-3">{icon}</div>
              <p className="font-bold text-sm mb-1">{title}</p>
              <p className={`text-xs leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className={`py-14 ${darkMode ? 'bg-gray-900' : 'bg-orange-50'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-center mb-10">What Our Customers Say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className={`rounded-2xl p-6 border shadow-sm ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                <div className="flex items-center gap-3 mb-4">
                  <img src={t.img} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-orange-200" />
                  <div>
                    <p className="font-bold text-sm">{t.name}</p>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t.role}</p>
                  </div>
                </div>
                <div className="flex mb-3">{'⭐'.repeat(t.stars)}</div>
                <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>"{t.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className={`rounded-3xl p-10 text-center ${darkMode ? 'bg-orange-900/20 border border-orange-800' : 'bg-orange-500'}`}>
          <h2 className={`text-2xl font-extrabold mb-2 ${darkMode ? 'text-orange-400' : 'text-white'}`}>Get 20% Off Your First Order!</h2>
          <p className={`text-sm mb-6 ${darkMode ? 'text-orange-300' : 'text-orange-100'}`}>Subscribe for exclusive deals and fresh updates.</p>
          <div className="flex max-w-md mx-auto gap-2">
            <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 rounded-full text-sm focus:outline-none text-gray-900 placeholder-gray-400" />
            <button className={`px-6 py-3 rounded-full text-sm font-bold whitespace-nowrap ${darkMode ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'bg-white hover:bg-gray-50 text-orange-500'}`}>Subscribe</button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className={`border-t py-8 ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xl font-extrabold">Gr<span className="text-orange-500">O</span>cify</p>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>© 2025 Grocify. All rights reserved.</p>
          <div className="flex gap-4 text-sm">{NAV_LINKS.map(l => <a key={l} href="#" className={`hover:text-orange-500 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{l}</a>)}</div>
        </div>
        <div className="text-center mt-4"><BackButton /></div>
      </footer>

      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-18px)} }
        .animate-float { animation: float 4s ease-in-out infinite; }
      `}</style>
    </div>
  )
}
