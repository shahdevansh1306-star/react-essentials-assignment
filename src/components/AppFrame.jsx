import { createElement } from 'react'
import { motion } from 'framer-motion'
import { Home, Rocket, Sparkles } from 'lucide-react'
import { NavLink, useLocation } from 'react-router-dom'

import { assignmentModules } from '../data/modules'
import { cn } from '../lib/utils'

const topLinks = [
  { to: '/', label: 'Showcase', icon: Home },
  ...assignmentModules.map((module) => ({
    to: module.path,
    label: module.navLabel,
    icon: Rocket,
  })),
]

export function AppFrame({ children }) {
  const location = useLocation()

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[540px] bg-[radial-gradient(circle_at_top,_rgba(251,146,60,0.22),_transparent_48%),radial-gradient(circle_at_80%_15%,_rgba(244,114,182,0.18),_transparent_24%)]" />

      <header className="sticky top-0 z-50 border-b border-white/40 bg-white/50 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
          <NavLink to="/" className="flex min-w-0 items-center gap-3">
            <motion.div
              initial={{ scale: 0.92, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-orange-200/40"
            >
              <Sparkles className="h-5 w-5" />
            </motion.div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold uppercase tracking-[0.3em] text-orange-500">
                React Essentials
              </p>
              <p className="truncate text-lg font-semibold text-slate-900">
                Assignment Showcase Repo
              </p>
            </div>
          </NavLink>

          <div className="hidden items-center gap-3 rounded-full border border-white/60 bg-white/70 px-4 py-2 text-sm text-slate-600 shadow-sm lg:flex">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            Reviewer shock value optimized
          </div>
        </div>

        <div className="soft-scrollbar overflow-x-auto border-t border-slate-900/5">
          <nav className="mx-auto flex max-w-7xl gap-2 px-4 py-3 sm:px-6 lg:px-8">
            {topLinks.map(({ to, label, icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  cn(
                    'inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-slate-950 text-white shadow-lg shadow-slate-950/15'
                      : 'bg-white/70 text-slate-600 hover:bg-orange-100 hover:text-orange-700',
                  )
                }
              >
                {createElement(icon, { className: 'h-4 w-4' })}
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-[28px] border border-white/60 bg-white/60 px-5 py-4 text-sm text-slate-600 shadow-sm backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <span className="inline-flex rounded-full bg-orange-100 px-3 py-1 font-medium text-orange-700">
              Active route
            </span>
            <span className="font-medium text-slate-900">{location.pathname}</span>
          </div>
          <p className="max-w-2xl">
            One repo, nine modules, and every assignment turned into a polished, presentable build.
          </p>
        </div>

        {children}
      </main>
    </div>
  )
}
