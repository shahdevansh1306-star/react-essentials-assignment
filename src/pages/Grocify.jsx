import { useState, useEffect, useRef } from 'react'
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

const CATEGORIES = [
  { icon: freshFruitsImg, name: 'Fruits', count: '120+ items', bg: 'bg-red-50 dark:bg-red-900/10' },
  { icon: fruitsVeggiesImg, name: 'Vegetables', count: '80+ items', bg: 'bg-green-50 dark:bg-green-900/10' },
  { icon: dairyEggsImg, name: 'Dairy & Eggs', count: '40+ items', bg: 'bg-yellow-50 dark:bg-yellow-900/10' },
  { icon: meatSeafoodImg, name: 'Meat & Seafood', count: '60+ items', bg: 'bg-orange-50 dark:bg-orange-900/10' },
]

const FEATURED_PRODUCTS = [
  { name: 'Fresh Strawberries', price: 149, original: 199, unit: '250g', img: freshFruitsImg, tag: 'Sale', tagColor: 'bg-red-500' },
  { name: 'Organic Broccoli', price: 89, original: null, unit: '500g', img: fruitsVeggiesImg, tag: 'Fresh', tagColor: 'bg-green-500' },
  { name: 'Farm Eggs', price: 120, original: 140, unit: '12 pcs', img: dairyEggsImg, tag: 'Popular', tagColor: 'bg-orange-500' },
  { name: 'Salmon Fillet', price: 499, original: null, unit: '300g', img: meatSeafoodImg, tag: 'Premium', tagColor: 'bg-indigo-500' },
]

const BANNERS = [
  { img: fruitsBannerImg, title: 'Fresh Fruits', sub: 'Farm to table, same day delivery' },
  { img: dairyBannerImg, title: 'Dairy & Eggs', sub: 'Pure, fresh, and organic' },
  { img: allBannerImg, title: 'Everything Fresh', sub: 'Shop all categories at the best prices' },
]

const TESTIMONIALS = [
  { img: customer1, name: 'Priya Sharma', role: 'Home Chef', text: 'Grocify delivers the freshest produce I have ever seen! Same day delivery is a game changer.', stars: 5 },
  { img: customer2, name: 'Rahul Mehta', role: 'Fitness Enthusiast', text: 'Love the quality of organic vegetables. My smoothies have never tasted better!', stars: 5 },
  { img: customer3, name: 'Anita Patel', role: 'Working Mom', text: 'Saves me so much time every week. The app is super easy and delivery is always on time.', stars: 5 },
]

export default function Grocify() {
  const [search, setSearch] = useState('')
  const [mobileMenu, setMobileMenu] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [wishCount, setWishCount] = useState(0)
  const [activeBanner, setActiveBanner] = useState(0)
  const [activeCategory, setActiveCategory] = useState('All')
  const [addedToast, setAddedToast] = useState('')

  // Auto-rotate banners
  useEffect(() => {
    const t = setInterval(() => setActiveBanner(b => (b + 1) % BANNERS.length), 3500)
    return () => clearInterval(t)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    console.log('Search:', search)
    alert(`Searching for: "${search}"`)
  }

  const handleAddToCart = (productName) => {
    setCartCount(c => c + 1)
    setAddedToast(productName)
    setTimeout(() => setAddedToast(''), 2000)
  }

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${darkMode ? 'bg-gray-950 text-white' : 'bg-white text-gray-900'}`}>

      {/* Toast notification */}
      {addedToast && (
        <div className="fixed top-20 right-4 z-50 bg-green-500 text-white px-4 py-2 rounded-xl shadow-lg text-sm font-medium animate-fade-up">
          ✓ {addedToast} added to cart
        </div>
      )}

      {/* ───── NAVBAR ───── */}
      <nav className={`sticky top-0 z-40 border-b shadow-sm transition-colors ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-6">
          {/* Logo */}
          <a href="#" className="text-xl font-extrabold shrink-0">
            Gr<span className="text-orange-500">O</span>cify
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6 flex-1">
            {NAV_LINKS.map((item, i) => (
              <a key={item} href="#" className={`text-sm font-medium hover:text-orange-500 transition-colors ${i === 0 ? 'text-orange-500' : darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{item}</a>
            ))}
          </div>

          {/* Search */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-xs">
            <div className="relative flex-1">
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search fresh products..."
                className={`w-full pl-4 pr-10 py-2 rounded-full border text-sm focus:outline-none focus:border-orange-400 transition-colors ${darkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' : 'bg-gray-50 border-gray-200 placeholder-gray-400'}`} />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-500 hover:text-orange-600 transition-colors">
                🔍
              </button>
            </div>
          </form>

          {/* Icons */}
          <div className="flex items-center gap-3 ml-auto">
            <button onClick={() => setWishCount(w => w + 1)} className="relative text-xl hover:scale-110 transition-transform" title="Wishlist">
              ❤️
              {wishCount > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center leading-none">{wishCount}</span>}
            </button>
            <button onClick={() => setCartCount(c => c + 1)} className="relative text-xl hover:scale-110 transition-transform" title="Cart">
              🛒
              {cartCount > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full text-white text-xs flex items-center justify-center leading-none">{cartCount}</span>}
            </button>
            <button onClick={() => setDarkMode(d => !d)}
              className={`text-lg px-2.5 py-1.5 rounded-lg border transition-colors ${darkMode ? 'border-gray-700 bg-gray-800 hover:border-orange-500' : 'border-gray-200 hover:border-orange-400'}`}>
              {darkMode ? '☀️' : '🌙'}
            </button>
            <button onClick={() => setMobileMenu(m => !m)} className="md:hidden text-xl p-1">☰</button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenu && (
          <div className={`md:hidden border-t px-4 py-3 space-y-2 ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'}`}>
            {NAV_LINKS.map(item => (
              <a key={item} href="#" className="block py-1.5 text-sm hover:text-orange-500 transition-colors">{item}</a>
            ))}
            <form onSubmit={handleSearch} className="flex mt-2">
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className={`flex-1 px-3 py-2 rounded-l-lg border text-sm focus:outline-none ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200'}`} />
              <button type="submit" className="px-3 bg-orange-500 text-white rounded-r-lg text-sm">🔍</button>
            </form>
          </div>
        )}
      </nav>

      {/* ───── HERO SECTION ───── */}
      <section className={`max-w-7xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center`}>
        {/* Left content */}
        <div>
          <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold border mb-6 ${darkMode ? 'border-orange-700 text-orange-400 bg-orange-900/20' : 'border-orange-200 text-orange-600 bg-orange-50'}`}>
            🌱 Export Best Quality...
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-5">
            Tasty Organic<br />
            <span className="text-orange-500">Fruits &amp; Veggies</span><br />
            In Your City
          </h1>
          <p className={`text-base leading-relaxed mb-8 max-w-md ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Bred for a high content of beneficial substances. Our products are all fresh and healthy — delivered to your door the same day.
          </p>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => setCartCount(c => c + 1)}
              className="px-8 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full shadow-lg shadow-orange-200 hover:shadow-orange-300 hover:scale-105 transition-all duration-300">
              Shop Now →
            </button>
            <button className={`px-8 py-3.5 rounded-full font-semibold border transition-all hover:border-orange-400 hover:text-orange-500 ${darkMode ? 'border-gray-600 text-gray-300' : 'border-gray-300 text-gray-600'}`}>
              Learn More
            </button>
          </div>
          {/* Stats */}
          <div className="flex gap-8 mt-10">
            {[['500+', 'Products'], ['50K+', 'Customers'], ['1-Day', 'Delivery']].map(([num, label]) => (
              <div key={label}>
                <p className="text-2xl font-extrabold text-orange-500">{num}</p>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — basket image with float animation */}
        <div className="flex justify-center">
          <div className="relative">
            <div className={`absolute inset-0 rounded-full scale-90 blur-3xl opacity-30 ${darkMode ? 'bg-orange-800' : 'bg-orange-200'}`} />
            <img
              src={basketImg}
              alt="Fresh fruits and vegetables basket"
              className="relative w-72 h-72 md:w-[420px] md:h-[420px] object-contain animate-float drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* ───── CATEGORIES ───── */}
      <section className={`py-14 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold mb-2">Shop by Category</h2>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Everything fresh, everything you need</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {CATEGORIES.map(cat => (
              <button key={cat.name} onClick={() => setActiveCategory(cat.name)}
                className={`${cat.bg} border rounded-2xl p-5 text-center hover:-translate-y-1 hover:shadow-md transition-all cursor-pointer ${activeCategory === cat.name ? 'border-orange-400 ring-2 ring-orange-200' : darkMode ? 'border-gray-700 hover:border-orange-500' : 'border-gray-100 hover:border-orange-300'}`}>
                <img src={cat.icon} alt={cat.name} className="w-16 h-16 object-contain mx-auto mb-3" />
                <p className="font-bold text-sm">{cat.name}</p>
                <p className={`text-xs mt-0.5 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`}>{cat.count}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ───── BANNER SLIDER ───── */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="relative rounded-3xl overflow-hidden h-52 md:h-72 shadow-xl">
          {BANNERS.map((b, i) => (
            <div key={i} className={`absolute inset-0 transition-opacity duration-700 ${i === activeBanner ? 'opacity-100' : 'opacity-0'}`}>
              <img src={b.img} alt={b.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center px-10">
                <div>
                  <p className="text-white text-xs font-semibold mb-1 uppercase tracking-widest opacity-80">Featured</p>
                  <h3 className="text-white text-3xl font-extrabold mb-1">{b.title}</h3>
                  <p className="text-white/80 text-sm mb-4">{b.sub}</p>
                  <button onClick={() => setCartCount(c => c + 1)} className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-full text-sm font-bold transition-colors">Shop Now</button>
                </div>
              </div>
            </div>
          ))}
          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {BANNERS.map((_, i) => (
              <button key={i} onClick={() => setActiveBanner(i)} className={`w-2 h-2 rounded-full transition-all ${i === activeBanner ? 'bg-orange-500 w-5' : 'bg-white/60'}`} />
            ))}
          </div>
        </div>
      </section>

      {/* ───── FEATURED PRODUCTS ───── */}
      <section className={`py-14 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-extrabold">Featured Products</h2>
              <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Handpicked fresh picks just for you</p>
            </div>
            <button className="text-sm font-semibold text-orange-500 hover:underline">View All →</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {FEATURED_PRODUCTS.map(p => (
              <div key={p.name} className={`rounded-2xl border overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
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
                    <button onClick={() => handleAddToCart(p.name)}
                      className="w-7 h-7 bg-orange-500 hover:bg-orange-600 text-white rounded-full flex items-center justify-center text-base font-bold transition-colors">+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── WHY CHOOSE US ───── */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold mb-2">Why Choose Grocify?</h2>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>We make grocery shopping effortless</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            ['🌿', 'Always Organic', '100% certified organic produce from trusted farms'],
            ['⚡', 'Same Day Delivery', 'Order before 2PM, delivered by evening'],
            ['💯', 'Quality Guaranteed', 'Fresh or your money back — no questions asked'],
            ['💳', 'Best Prices', 'Lowest prices compared to your local store'],
          ].map(([icon, title, desc]) => (
            <div key={title} className={`rounded-2xl p-5 text-center border transition-all hover:-translate-y-1 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-100 hover:border-orange-200'}`}>
              <div className="text-4xl mb-3">{icon}</div>
              <p className="font-bold text-sm mb-1">{title}</p>
              <p className={`text-xs leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ───── TESTIMONIALS ───── */}
      <section className={`py-14 ${darkMode ? 'bg-gray-900' : 'bg-orange-50'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold mb-2">What Our Customers Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className={`rounded-2xl p-6 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} shadow-sm`}>
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

      {/* ───── NEWSLETTER ───── */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className={`rounded-3xl p-10 text-center ${darkMode ? 'bg-orange-900/20 border border-orange-800' : 'bg-orange-500'}`}>
          <h2 className={`text-2xl font-extrabold mb-2 ${darkMode ? 'text-orange-400' : 'text-white'}`}>Get 20% Off Your First Order!</h2>
          <p className={`text-sm mb-6 ${darkMode ? 'text-orange-300' : 'text-orange-100'}`}>Subscribe to our newsletter for exclusive deals and fresh updates.</p>
          <div className="flex max-w-md mx-auto gap-2">
            <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 rounded-full text-sm focus:outline-none text-gray-900 placeholder-gray-400" />
            <button className={`px-6 py-3 rounded-full text-sm font-bold transition-colors whitespace-nowrap ${darkMode ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'bg-white hover:bg-gray-50 text-orange-500'}`}>
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* ───── FOOTER ───── */}
      <footer className={`border-t py-8 ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xl font-extrabold">Gr<span className="text-orange-500">O</span>cify</p>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>© 2025 Grocify. All rights reserved.</p>
          <div className="flex gap-4 text-sm">
            {NAV_LINKS.map(l => <a key={l} href="#" className={`hover:text-orange-500 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{l}</a>)}
          </div>
        </div>
        <div className="text-center mt-4">
          <BackButton />
        </div>
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-18px); }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up { animation: fade-up 0.5s ease both; }
      `}</style>
    </div>
  )
}
