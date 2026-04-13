import { createElement, startTransition, useMemo, useState } from 'react'
import { CheckCircle2, LockKeyhole, LogOut, Route, ShieldCheck, UserRound } from 'lucide-react'
import { Link, NavLink, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'

import { cn } from '../../lib/utils'
import { useAuth } from './AuthContext'
import { Counter } from './Counter'

const authLinks = [
  { to: '/auth', label: 'Home' },
  { to: '/auth/about', label: 'About' },
  { to: '/auth/login', label: 'Login' },
  { to: '/auth/signup', label: 'Signup' },
  { to: '/auth/dashboard', label: 'Dashboard' },
]

const demoOrders = [
  {
    id: 'ORD-2026-017',
    customer: 'Aarav Patel',
    total: '₹1,280',
    status: 'Packed',
    eta: '18 mins',
  },
  {
    id: 'ORD-2026-018',
    customer: 'Aarav Patel',
    total: '₹940',
    status: 'Out for delivery',
    eta: '11 mins',
  },
]

function getLoginErrors(values) {
  const errors = {}

  if (!values.email.trim()) {
    errors.email = 'Email is required.'
  }

  if (!values.password.trim()) {
    errors.password = 'Password is required.'
  }

  return errors
}

function getSignupErrors(values) {
  const errors = {}
  const strongPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/

  if (!values.fullName.trim()) {
    errors.fullName = 'Full name is required.'
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Enter a valid email address.'
  }

  if (!/^\+?\d{10,13}$/.test(values.phone.replace(/\s+/g, ''))) {
    errors.phone = 'Phone number should contain 10 to 13 digits.'
  }

  if (!strongPassword.test(values.password)) {
    errors.password =
      'Password needs 8 characters with uppercase, lowercase, number, and special character.'
  }

  if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Passwords do not match.'
  }

  return errors
}

function AuthCard({ children, className = '' }) {
  return (
    <div className={cn('rounded-[32px] border border-white/60 bg-white/75 p-6 shadow-sm backdrop-blur-xl', className)}>
      {children}
    </div>
  )
}

export function AuthLayout() {
  return (
    <div className="space-y-6">
      <section className="rounded-[40px] border border-white/60 bg-[linear-gradient(135deg,#0f172a,#1e293b,#334155)] px-6 py-10 text-white sm:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-orange-200">
              Router + Context + Testing
            </p>
            <h1 className="display-serif mt-4 text-5xl leading-tight">
              Secure navigation with clean auth flows and dynamic route logic.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-200">
              This module covers client-side routing, signup/login, protected dashboards,
              dynamic URL parameters, and component testing with React Testing Library.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ['6+', 'Routes'],
              ['Context', 'Global auth state'],
              ['RTL', 'Interactive tests'],
            ].map(([value, label]) => (
              <div key={label} className="rounded-[28px] border border-white/12 bg-white/8 p-4">
                <p className="text-3xl font-semibold">{value}</p>
                <p className="mt-2 text-sm text-slate-300">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <nav className="soft-scrollbar overflow-x-auto rounded-[28px] border border-white/60 bg-white/70 p-3 backdrop-blur-xl">
        <div className="flex gap-2">
          {authLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/auth'}
              className={({ isActive }) =>
                cn(
                  'shrink-0 rounded-full px-4 py-2 text-sm font-medium transition',
                  isActive
                    ? 'bg-slate-950 text-white'
                    : 'bg-slate-950/[0.04] text-slate-600 hover:bg-orange-100 hover:text-orange-700',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>

      <Outlet />
    </div>
  )
}

export function AuthHomePage() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <AuthCard>
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-500">
          What this module shows
        </p>
        <h2 className="display-serif mt-4 text-4xl text-slate-950">
          Protected navigation without the usual student-project mess.
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            ['React Router', 'Home, about, login, signup, dashboard, profile, order details, and a scoped 404.'],
            ['Context API', 'Authentication state lives globally instead of being drilled through props.'],
            ['Dynamic params', 'Profile and order pages read values from the URL and render matching data.'],
            ['Testing', 'A testable counter and protected route checks are included for component-level verification.'],
          ].map(([title, text]) => (
            <div key={title} className="rounded-[24px] bg-slate-950/[0.04] p-4">
              <p className="font-semibold text-slate-900">{title}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </AuthCard>

      <div className="space-y-6">
        <Counter />
        <AuthCard>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-500">
            Quick links
          </p>
          <div className="mt-4 grid gap-3">
            <Link className="rounded-2xl bg-slate-950 px-4 py-3 font-medium text-white" to="/auth/login">
              Open login page
            </Link>
            <Link className="rounded-2xl bg-orange-500 px-4 py-3 font-medium text-white" to="/auth/signup">
              Open signup page
            </Link>
          </div>
        </AuthCard>
      </div>
    </div>
  )
}

export function AuthModuleAboutPage() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {[
        {
          icon: Route,
          title: 'Routing',
          text: 'Nested routes keep the auth module tidy while still showing clear navigation paths.',
        },
        {
          icon: ShieldCheck,
          title: 'Protection',
          text: 'The dashboard, profile, and order routes require an authenticated session.',
        },
        {
          icon: LockKeyhole,
          title: 'State',
          text: 'Users and the current session persist through localStorage for a realistic flow.',
        },
      ].map(({ icon, title, text }) => (
        <AuthCard key={title}>
          {createElement(icon, { className: 'h-6 w-6 text-orange-500' })}
          <h3 className="mt-4 text-2xl font-semibold text-slate-900">{title}</h3>
          <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
        </AuthCard>
      ))}
    </div>
  )
}

export function AuthLoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [values, setValues] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')

  const isFormValid = values.email.trim() && values.password.trim()

  async function handleSubmit(event) {
    event.preventDefault()

    const nextErrors = getLoginErrors(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    try {
      setStatus('loading')
      await login(values)
      const redirectTo = location.state?.from || '/auth/dashboard'
      setMessage('Login successful. Redirecting to the dashboard...')
      startTransition(() => navigate(redirectTo))
    } catch (error) {
      setMessage(error.message)
      setStatus('error')
      return
    }

    setStatus('success')
  }

  return (
    <AuthCard className="mx-auto max-w-3xl">
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-500">Login</p>
      <h2 className="display-serif mt-4 text-4xl text-slate-950">Welcome back</h2>
      <p className="mt-3 text-sm leading-7 text-slate-600">
        Demo account: <span className="font-semibold">aarav@grocify.dev</span> /
        <span className="font-semibold"> Aarav@1234</span>
      </p>

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="login-email">
            Email
          </label>
          <input
            id="login-email"
            value={values.email}
            onChange={(event) => setValues((prev) => ({ ...prev, email: event.target.value }))}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
            placeholder="name@example.com"
          />
          {errors.email ? <p className="mt-2 text-sm text-rose-600">{errors.email}</p> : null}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="login-password">
            Password
          </label>
          <input
            id="login-password"
            type="password"
            value={values.password}
            onChange={(event) => setValues((prev) => ({ ...prev, password: event.target.value }))}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
            placeholder="Enter your password"
          />
          {errors.password ? <p className="mt-2 text-sm text-rose-600">{errors.password}</p> : null}
        </div>

        <button
          disabled={!isFormValid || status === 'loading'}
          type="submit"
          className="rounded-full bg-slate-950 px-6 py-3 font-semibold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === 'loading' ? 'Signing in...' : 'Login'}
        </button>
      </form>

      {message ? (
        <p className={cn('mt-4 text-sm', status === 'error' ? 'text-rose-600' : 'text-emerald-600')}>
          {message}
        </p>
      ) : null}
    </AuthCard>
  )
}

export function AuthSignupPage() {
  const { signup } = useAuth()
  const navigate = useNavigate()
  const [values, setValues] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('idle')

  const isFormValid = useMemo(
    () => Object.keys(getSignupErrors(values)).length === 0 && Object.values(values).every(Boolean),
    [values],
  )

  async function handleSubmit(event) {
    event.preventDefault()

    const nextErrors = getSignupErrors(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    try {
      setStatus('loading')
      await signup(values)
      setMessage('Account created successfully. Redirecting to your dashboard...')
      startTransition(() => navigate('/auth/dashboard'))
      setStatus('success')
    } catch (error) {
      setMessage(error.message)
      setStatus('error')
    }
  }

  return (
    <AuthCard className="mx-auto max-w-4xl">
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-500">Signup</p>
      <h2 className="display-serif mt-4 text-4xl text-slate-950">Create a protected account</h2>

      <form className="mt-8 grid gap-5 md:grid-cols-2" onSubmit={handleSubmit}>
        {[
          ['fullName', 'Full Name', 'text', 'Your full name'],
          ['email', 'Email', 'email', 'name@example.com'],
          ['phone', 'Phone', 'tel', '+91 9876543210'],
          ['password', 'Password', 'password', 'Create a strong password'],
          ['confirmPassword', 'Confirm Password', 'password', 'Re-enter password'],
        ].map(([field, label, type, placeholder]) => (
          <div key={field} className={field === 'confirmPassword' ? 'md:col-span-2' : ''}>
            <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor={field}>
              {label}
            </label>
            <input
              id={field}
              type={type}
              value={values[field]}
              onChange={(event) =>
                setValues((prev) => ({
                  ...prev,
                  [field]: event.target.value,
                }))
              }
              placeholder={placeholder}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
            />
            {errors[field] ? <p className="mt-2 text-sm text-rose-600">{errors[field]}</p> : null}
          </div>
        ))}

        <div className="md:col-span-2">
          <button
            disabled={!isFormValid || status === 'loading'}
            type="submit"
            className="rounded-full bg-orange-500 px-6 py-3 font-semibold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {status === 'loading' ? 'Creating account...' : 'Signup'}
          </button>
        </div>
      </form>

      {message ? (
        <p className={cn('mt-4 text-sm', status === 'error' ? 'text-rose-600' : 'text-emerald-600')}>
          {message}
        </p>
      ) : null}
    </AuthCard>
  )
}

export function AuthDashboardPage() {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <AuthCard>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-500">
              Protected dashboard
            </p>
            <h2 className="display-serif mt-4 text-4xl text-slate-950">
              Hello, {currentUser?.name}
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-600">
              You only see this page after a valid login or signup. That proves the route guard is
              working as intended.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              logout()
              navigate('/auth/login')
            }}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 font-medium text-slate-700 transition hover:border-rose-200 hover:text-rose-600"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            ['Role', currentUser?.role],
            ['Email', currentUser?.email],
            ['Location', currentUser?.location],
          ].map(([label, value]) => (
            <div key={label} className="rounded-[24px] bg-slate-950/[0.04] p-4">
              <p className="text-sm font-medium text-slate-500">{label}</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{value}</p>
            </div>
          ))}
        </div>
      </AuthCard>

      <div className="space-y-6">
        <AuthCard>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-500">
            Dynamic routes
          </p>
          <div className="mt-4 grid gap-3">
            <Link
              className="rounded-2xl bg-slate-950 px-4 py-3 font-medium text-white"
              to={`/auth/profile/${currentUser?.id}`}
            >
              Open my profile route
            </Link>
            <Link
              className="rounded-2xl bg-orange-500 px-4 py-3 font-medium text-white"
              to={`/auth/order/${demoOrders[0].id}`}
            >
              Open order details route
            </Link>
          </div>
        </AuthCard>

        <AuthCard>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-500">
            Verification checklist
          </p>
          <div className="mt-4 space-y-3">
            {[
              'Login redirects to a protected route',
              'Profile route uses URL params',
              'Order route renders based on order id',
            ].map((point) => (
              <div key={point} className="flex items-start gap-3 text-sm leading-6 text-slate-600">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" />
                {point}
              </div>
            ))}
          </div>
        </AuthCard>
      </div>
    </div>
  )
}

export function AuthProfilePage() {
  const { userId } = useParams()
  const { users } = useAuth()
  const user = users.find((entry) => entry.id === userId)

  if (!user) {
    return <AuthNotFoundPage />
  }

  return (
    <AuthCard className="mx-auto max-w-4xl">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-orange-100 text-orange-600">
          <UserRound className="h-8 w-8" />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-500">
            Profile route
          </p>
          <h2 className="display-serif mt-2 text-4xl text-slate-950">{user.name}</h2>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {[
          ['User ID', user.id],
          ['Email', user.email],
          ['Phone', user.phone],
          ['Role', user.role],
        ].map(([label, value]) => (
          <div key={label} className="rounded-[24px] bg-slate-950/[0.04] p-4">
            <p className="text-sm font-medium text-slate-500">{label}</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">{value}</p>
          </div>
        ))}
      </div>
    </AuthCard>
  )
}

export function AuthOrderPage() {
  const { orderId } = useParams()
  const order = demoOrders.find((entry) => entry.id === orderId)

  if (!order) {
    return <AuthNotFoundPage />
  }

  return (
    <AuthCard className="mx-auto max-w-4xl">
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-500">
        Order details
      </p>
      <h2 className="display-serif mt-4 text-4xl text-slate-950">{order.id}</h2>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {[
          ['Customer', order.customer],
          ['Total', order.total],
          ['Status', order.status],
          ['ETA', order.eta],
        ].map(([label, value]) => (
          <div key={label} className="rounded-[24px] bg-slate-950/[0.04] p-4">
            <p className="text-sm font-medium text-slate-500">{label}</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">{value}</p>
          </div>
        ))}
      </div>
    </AuthCard>
  )
}

export function AuthNotFoundPage() {
  return (
    <AuthCard className="text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-500">Scoped 404</p>
      <h2 className="display-serif mt-4 text-4xl text-slate-950">Auth route not found</h2>
      <p className="mt-4 text-base leading-7 text-slate-600">
        This nested route belongs to the auth module but does not exist.
      </p>
      <Link
        className="mt-6 inline-flex rounded-full bg-slate-950 px-5 py-3 font-semibold text-white"
        to="/auth"
      >
        Back to auth home
      </Link>
    </AuthCard>
  )
}
