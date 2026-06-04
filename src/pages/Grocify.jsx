import { useState } from 'react'
import BackButton from '../components/BackButton'

export default function Grocify() {
  const [search, setSearch] = useState('')
  const [mobileMenu, setMobileMenu] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [wishCount, setWishCount] = useState(0)

  const handleSearch = (e) => {
    e.preventDefault()
    console.log('Search:', search)
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-950 text-white' : 'bg-white text-gray-900'} font-sans transition-colors duration-300`}>
      {/* Navbar */}
      <nav className={`sticky top-0 z-50 ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-100'} border-b shadow-sm`}>
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-6">
          <a href="#" className="text-xl font-extrabold">
            Gr<span className="text-orange-500">O</span>cify
          </a>
          <div className="hidden md:flex items-center gap-6 flex-1">
            {['Home', 'About Us', 'Process', 'Contact Us'].map(item => (
              <a key={item} href="#" className={`text-sm font-medium hover:text-orange-500 transition-colors ${item === 'Home' ? 'text-orange-500' : darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{item}</a>
            ))}
          </div>
          <form onSubmit={handleSearch} className="hidden md:flex items-center gap-1 flex-1 max-w-xs">
            <div className="relative flex-1">
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search..."
                className={`w-full pl-3 pr-8 py-2 rounded-lg border text-sm focus:outline-none focus:border-orange-400 ${darkMode ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-500' : 'bg-gray-50 border-gray-200 placeholder-gray-400'}`}
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-orange-500 hover:text-orange-600">
                🔍
              </button>
            </div>
          </form>
          <div className="flex items-center gap-3">
            <button onClick={() => setWishCount(w => w + 1)} className="relative text-xl hover:scale-110 transition-transform">
              ❤️ {wishCount > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">{wishCount}</span>}
            </button>
            <button onClick={() => setCartCount(c => c + 1)} className="relative text-xl hover:scale-110 transition-transform">
              🛒 {cartCount > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full text-white text-xs flex items-center justify-center">{cartCount}</span>}
            </button>
            <button onClick={() => setDarkMode(d => !d)} className="text-sm px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-orange-400 transition-colors">
              {darkMode ? '☀️' : '🌙'}
            </button>
            <button onClick={() => setMobileMenu(m => !m)} className="md:hidden text-xl">☰</button>
          </div>
        </div>
        {mobileMenu && (
          <div className={`md:hidden border-t ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-100'} px-4 py-3`}>
            {['Home', 'About Us', 'Process', 'Contact Us'].map(item => (
              <a key={item} href="#" className="block py-2 text-sm hover:text-orange-500">{item}</a>
            ))}
          </div>
        )}
      </nav>

      {/* Hero */}
      <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div className="animate-fade-up">
          <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold border ${darkMode ? 'border-orange-700 text-orange-400 bg-orange-900/20' : 'border-orange-200 text-orange-600 bg-orange-50'} mb-6`}>
            Export Best Quality...
          </span>
          <h1 className="text-5xl font-extrabold leading-tight mb-4">
            Tasty Organic<br />
            <span className="text-orange-500">Fruits & Veggies</span><br />
            In Your City
          </h1>
          <p className={`text-base leading-relaxed mb-8 max-w-md ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Bred for a high content of beneficial substances. Our products are all fresh and healthy.
          </p>
          <button
            onClick={() => setCartCount(c => c + 1)}
            className="px-8 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full shadow-lg shadow-orange-200 hover:shadow-orange-300 hover:scale-105 transition-all duration-300"
          >
            Shop Now →
          </button>
        </div>
        <div className="flex justify-center">
          <div className="animate-float w-72 h-72 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-green-100 to-orange-100 dark:from-green-900/20 dark:to-orange-900/20 flex items-center justify-center text-9xl shadow-2xl">
            🧺
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Fresh Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[['🍎', 'Fruits', '120+ items'], ['🥬', 'Vegetables', '80+ items'], ['🥛', 'Dairy', '40+ items'], ['🌾', 'Grains', '60+ items']].map(([icon, name, count]) => (
            <div key={name} className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-100'} border rounded-2xl p-5 text-center hover:border-orange-300 hover:-translate-y-1 transition-all cursor-pointer`}>
              <div className="text-4xl mb-2">{icon}</div>
              <p className="font-bold text-sm">{name}</p>
              <p className="text-xs text-gray-400">{count}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-100 dark:border-gray-800 py-4 text-center text-xs text-gray-400">
        <BackButton />
      </div>
    </div>
  )
}
