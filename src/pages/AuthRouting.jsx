import { useState, createContext, useContext } from 'react'
import { Routes, Route, Link, NavLink, Navigate, useParams, useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton'

// Local auth context for this module demo
const LocalAuth = createContext(null)
function LocalAuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const login = (email) => setUser({ email, name: email.split('@')[0] })
  const logout = () => setUser(null)
  return <LocalAuth.Provider value={{ user, login, logout }}>{children}</LocalAuth.Provider>
}
const useLocalAuth = () => useContext(LocalAuth)

function ProtectedRoute({ children }) {
  const { user } = useLocalAuth()
  return user ? children : <Navigate to="/auth-routing/login" replace />
}

function AuthNav() {
  const { user, logout } = useLocalAuth()
  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center gap-4 flex-wrap">
      <span className="font-bold text-gray-900 dark:text-white text-sm">Auth Demo</span>
      <div className="flex items-center gap-3 flex-1">
        {[['Home', '/auth-routing'], ['About', '/auth-routing/about'], ['Dashboard', '/auth-routing/dashboard'], ['Profile', '/auth-routing/profile/user123']].map(([label, to]) => (
          <NavLink key={to} to={to} end={to === '/auth-routing'} className={({ isActive }) => `text-xs font-medium transition-colors ${isActive ? 'text-orange-500' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}>{label}</NavLink>
        ))}
      </div>
      {user ? (
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 dark:text-gray-400">👤 {user.name}</span>
          <button onClick={logout} className="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors text-gray-700 dark:text-gray-300">Logout</button>
        </div>
      ) : (
        <Link to="/auth-routing/login" className="text-xs px-3 py-1 bg-slate-700 hover:bg-slate-800 text-white rounded-lg transition-colors font-semibold">Login</Link>
      )}
    </nav>
  )
}

function HomePage() {
  const { user } = useLocalAuth()
  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Welcome{user ? `, ${user.name}!` : '!'}</h2>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">This is a demo of React Router with protected routes and Context API auth.</p>
      {!user && <Link to="/auth-routing/login" className="inline-block px-5 py-2 bg-slate-700 hover:bg-slate-800 text-white rounded-xl text-sm font-semibold transition-colors">Login to access Dashboard →</Link>}
    </div>
  )
}

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useLocalAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email || !password) { setError('Fill in both fields'); return }
    if (password.length < 6) { setError('Password too short (min 6)'); return }
    login(email)
    navigate('/auth-routing/dashboard')
  }

  return (
    <div className="max-w-sm mx-auto p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5">Login</h2>
      {error && <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs p-3 rounded-lg mb-4 border border-red-200 dark:border-red-800">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email" className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm focus:outline-none focus:border-slate-400 text-gray-900 dark:text-white placeholder-gray-400" />
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password (any 6+ chars)" className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm focus:outline-none focus:border-slate-400 text-gray-900 dark:text-white placeholder-gray-400" />
        <button type="submit" className="w-full py-2.5 bg-slate-700 hover:bg-slate-800 text-white rounded-xl text-sm font-semibold transition-colors">Login</button>
      </form>
      <p className="text-xs text-gray-400 mt-3 text-center">No real backend — any valid email + 6+ char password works</p>
    </div>
  )
}

function DashboardPage() {
  const { user } = useLocalAuth()
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Dashboard 🔐</h2>
      <p className="text-xs text-green-600 dark:text-green-400 mb-4">Protected route — only accessible when logged in</p>
      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
        <p className="text-sm text-gray-700 dark:text-gray-300">Logged in as: <strong>{user?.email}</strong></p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">User data stored in AuthContext</p>
      </div>
    </div>
  )
}

function AboutPage() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">About</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400">This demo shows React Router v6 with BrowserRouter, dynamic routes, NavLink active states, and a 404 fallback.</p>
    </div>
  )
}

function ProfilePage() {
  const { userId } = useParams()
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">User Profile</h2>
      <p className="text-xs text-blue-500 mb-3">Dynamic route: /profile/<strong>{userId}</strong> — extracted with useParams()</p>
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
        <p className="text-sm text-gray-700 dark:text-gray-300">Profile ID: <strong className="font-mono">{userId}</strong></p>
      </div>
    </div>
  )
}

function NotFound() {
  return (
    <div className="p-6 text-center">
      <p className="text-5xl mb-3">404</p>
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">Page Not Found</h2>
      <Link to="/auth-routing" className="text-sm text-orange-500 hover:underline mt-2 block">← Back to Home</Link>
    </div>
  )
}

// Test section (simulated)
function TestSection() {
  const [results] = useState([
    { name: 'Counter renders with initial value 0', pass: true },
    { name: 'Increment button increases count', pass: true },
    { name: 'Decrement does not go below 0', pass: true },
    { name: 'Login form submits with valid data', pass: true },
    { name: 'Protected route redirects unauthenticated user', pass: true },
    { name: 'useParams extracts userId correctly', pass: true },
  ])

  return (
    <div className="mt-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5">
      <h3 className="font-bold text-gray-900 dark:text-white mb-1 text-sm">Component Tests (React Testing Library)</h3>
      <p className="text-xs text-gray-400 mb-4">Simulated test runner output — run `npm test` for real results</p>
      <div className="space-y-1.5">
        {results.map((r, i) => (
          <div key={i} className={`flex items-center gap-2 px-3 py-2 rounded-lg ${r.pass ? 'bg-green-50 dark:bg-green-900/10' : 'bg-red-50 dark:bg-red-900/10'}`}>
            <span className={`text-sm ${r.pass ? 'text-green-500' : 'text-red-500'}`}>{r.pass ? '✓' : '✗'}</span>
            <span className="text-xs text-gray-700 dark:text-gray-300">{r.name}</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-green-600 dark:text-green-400 font-semibold mt-3">6 tests passed, 0 failed</p>
    </div>
  )
}

export default function AuthRoutingPage() {
  return (
    <LocalAuthProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <BackButton />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Auth App + Routing</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6">Module 13 — React Router, Protected Routes, Authentication, Testing</p>

          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <AuthNav />
            <div className="min-h-48">
              <Routes>
                <Route path="auth-routing" element={<HomePage />} />
                <Route path="auth-routing/about" element={<AboutPage />} />
                <Route path="auth-routing/login" element={<LoginPage />} />
                <Route path="auth-routing/profile/:userId" element={<ProfilePage />} />
                <Route path="auth-routing/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                <Route path="auth-routing/*" element={<NotFound />} />
              </Routes>
            </div>
          </div>

          <TestSection />
        </div>
      </div>
    </LocalAuthProvider>
  )
}
