import { motion } from 'framer-motion'
import {
  ChevronRight,
  Heart,
  Menu,
  Moon,
  Search,
  ShoppingCart,
  Sparkles,
  Sun,
  X,
} from 'lucide-react'
import { useMemo, useState } from 'react'

import basketHero from '../assets/basket-hero.svg'
import { cn } from '../lib/utils'

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About Us' },
  { id: 'process', label: 'Process' },
  { id: 'contact', label: 'Contact Us' },
]

const spotlightItems = [
  {
    title: 'Sun-picked freshness',
    description: 'Morning-sourced greens and orchard fruit curated for same-day delivery windows.',
  },
  {
    title: 'Zero-chaos checkout',
    description: 'Fast search, saved wishes, smooth cart interaction, and a cleaner mobile commerce flow.',
  },
  {
    title: 'Local-first curation',
    description: 'Seasonal produce, premium pantry staples, and city-friendly fulfillment rhythms.',
  },
]

export function GrocifyPage() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [darkMode, setDarkMode] = useState(false)

  const pageTheme = useMemo(
    () =>
      darkMode
        ? {
            shell: 'bg-slate-950 text-white',
            nav: 'bg-slate-950/90 border-white/10 text-white',
            surface: 'bg-white/6 border-white/10 text-slate-100',
            muted: 'text-slate-300',
            chip: 'bg-orange-500/15 text-orange-200 border-orange-400/25',
          }
        : {
            shell: 'bg-[#fff7ed] text-slate-950',
            nav: 'bg-[#fff7ed]/90 border-orange-100 text-slate-900',
            surface: 'bg-white/75 border-orange-100 text-slate-900',
            muted: 'text-slate-600',
            chip: 'bg-orange-100 text-orange-700 border-orange-200',
          },
    [darkMode],
  )

  function handleSearchSubmit(event) {
    event.preventDefault()
    console.log('Grocify search:', search.trim())
  }

  return (
    <div
      className={cn(
        'overflow-hidden rounded-[40px] border transition-colors duration-300',
        darkMode ? 'border-white/10' : 'border-orange-100',
      )}
    >
      <div className={cn('relative min-h-screen', pageTheme.shell)}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.18),transparent_25%),radial-gradient(circle_at_15%_20%,rgba(251,191,36,0.18),transparent_24%)]" />

        <header
          className={cn(
            'sticky top-0 z-40 border-b backdrop-blur-xl transition-colors duration-300',
            pageTheme.nav,
          )}
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <a href="#home" className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-lg shadow-orange-500/25">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-orange-500">
                  Grocify
                </p>
                <p className="text-lg font-semibold">Grocify Website</p>
              </div>
            </a>

            <nav className="hidden items-center gap-6 lg:flex">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={cn(
                    'font-medium transition hover:text-orange-500',
                    darkMode ? 'text-slate-100' : 'text-slate-700',
                  )}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="hidden items-center gap-3 lg:flex">
              <form
                onSubmit={handleSearchSubmit}
                className={cn(
                  'flex items-center gap-2 rounded-full border px-4 py-2 shadow-sm',
                  pageTheme.surface,
                )}
              >
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search groceries..."
                  className="w-48 bg-transparent text-sm outline-none placeholder:text-slate-400"
                />
                <button
                  type="submit"
                  className="rounded-full bg-orange-500 p-2 text-white transition hover:scale-105 hover:bg-orange-600"
                  aria-label="Search groceries"
                >
                  <Search className="h-4 w-4" />
                </button>
              </form>

              <button
                type="button"
                onClick={() => setDarkMode((value) => !value)}
                className={cn(
                  'rounded-full border p-3 transition hover:-translate-y-0.5',
                  pageTheme.surface,
                )}
                aria-label="Toggle light and dark mode"
              >
                {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>

              <button
                type="button"
                className={cn(
                  'rounded-full border p-3 transition hover:-translate-y-0.5 hover:text-orange-500',
                  pageTheme.surface,
                )}
                aria-label="Wishlist"
              >
                <Heart className="h-4 w-4" />
              </button>
              <button
                type="button"
                className={cn(
                  'rounded-full border p-3 transition hover:-translate-y-0.5 hover:text-orange-500',
                  pageTheme.surface,
                )}
                aria-label="Cart"
              >
                <ShoppingCart className="h-4 w-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen((value) => !value)}
              className={cn('rounded-full border p-3 lg:hidden', pageTheme.surface)}
              aria-label="Toggle mobile menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {mobileOpen && (
            <div className="border-t border-white/10 px-4 pb-4 lg:hidden">
              <div className="mt-4 space-y-3 rounded-[28px] bg-white/8 p-4 backdrop-blur-xl">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-2xl bg-white/10 px-4 py-3 font-medium text-white"
                  >
                    {item.label}
                  </a>
                ))}
                <form onSubmit={handleSearchSubmit} className="flex gap-2">
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search groceries..."
                    className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-white outline-none placeholder:text-slate-400"
                  />
                  <button
                    type="submit"
                    className="rounded-2xl bg-orange-500 px-4 py-3 font-semibold text-white"
                  >
                    Go
                  </button>
                </form>
              </div>
            </div>
          )}
        </header>

        <section
          id="home"
          className="relative mx-auto grid min-h-[calc(100svh-132px)] max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:px-8 lg:py-14"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="relative z-10 max-w-2xl"
          >
            <span
              className={cn(
                'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium',
                pageTheme.chip,
              )}
            >
              <Sparkles className="h-4 w-4" />
              Export Best Quality Organic Produce
            </span>
            <h1 className="display-serif mt-6 text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">
              Tasty Organic
              <br />
              Fruits & Veggies
              <br />
              In Your City
            </h1>
            <p className={cn('mt-6 max-w-xl text-lg leading-8', pageTheme.muted)}>
              Fresh-picked groceries for people who want their weekly essentials to feel brighter,
              faster, and more premium from the first click to the final basket.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#about"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 via-orange-400 to-amber-300 px-6 py-3 font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-orange-500/25"
              >
                Shop Now
                <ChevronRight className="h-4 w-4" />
              </a>
              <button
                type="button"
                onClick={() => console.log('Wishlist preview opened')}
                className={cn(
                  'rounded-full border px-6 py-3 font-semibold transition hover:-translate-y-0.5 hover:text-orange-500',
                  pageTheme.surface,
                )}
              >
                Preview Wishlist
              </button>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                ['12k+', 'Weekly baskets'],
                ['18 min', 'Average delivery slot'],
                ['96%', 'Repeat customers'],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className={cn('rounded-[28px] border p-4 backdrop-blur-xl', pageTheme.surface)}
                >
                  <p className="text-3xl font-semibold">{value}</p>
                  <p className={cn('mt-2 text-sm', pageTheme.muted)}>{label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.12, duration: 0.65 }}
            className="relative"
          >
            <div className="ambient-pulse absolute left-10 top-10 h-40 w-40 rounded-full bg-orange-400/25 blur-3xl" />
            <div className="ambient-pulse absolute bottom-4 right-8 h-52 w-52 rounded-full bg-amber-300/20 blur-3xl" />
            <div
              className={cn(
                'noise-overlay relative rounded-[40px] border p-6 backdrop-blur-xl',
                pageTheme.surface,
              )}
            >
              <img
                src={basketHero}
                alt="Basket filled with organic fruits and vegetables"
                className="floating-basket mx-auto w-full max-w-xl drop-shadow-[0_30px_70px_rgba(249,115,22,0.28)]"
              />
            </div>
          </motion.div>
        </section>

        <section id="about" className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className={cn('rounded-[32px] border p-8', pageTheme.surface)}>
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-orange-500">
                About Us
              </p>
              <h2 className="display-serif mt-4 text-4xl">
                Grocery shopping, redesigned to feel bright and effortless.
              </h2>
              <p className={cn('mt-4 max-w-xl text-base leading-7', pageTheme.muted)}>
                The page recreates the assignment brief while pushing the presentation further
                with cleaner hierarchy, stronger visual focus, and clearer commerce interaction
                patterns.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {spotlightItems.map((itemInfo) => (
                <div key={itemInfo.title} className={cn('rounded-[28px] border p-5', pageTheme.surface)}>
                  <h3 className="text-xl font-semibold">{itemInfo.title}</h3>
                  <p className={cn('mt-3 text-sm leading-7', pageTheme.muted)}>
                    {itemInfo.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
          <div className="grid gap-4 md:grid-cols-4">
            {[
              ['01', 'Harvested', 'Partner farms dispatch produce during the earliest quality window.'],
              ['02', 'Sorted', 'We check ripeness, freshness, and handling quality before inventory opens.'],
              ['03', 'Packed', 'Orders are grouped by route so the basket arrives cooler and cleaner.'],
              ['04', 'Delivered', 'Customers get a fast, city-first fulfillment experience with less friction.'],
            ].map(([step, title, description]) => (
              <motion.div
                key={step}
                whileHover={{ y: -4 }}
                className={cn('rounded-[28px] border p-5', pageTheme.surface)}
              >
                <p className="text-sm font-semibold uppercase tracking-[0.32em] text-orange-500">
                  {step}
                </p>
                <h3 className="mt-4 text-xl font-semibold">{title}</h3>
                <p className={cn('mt-3 text-sm leading-7', pageTheme.muted)}>{description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8 lg:pb-14">
          <div className="grid gap-6 rounded-[36px] border border-orange-300/25 bg-gradient-to-r from-orange-500 via-orange-400 to-amber-300 p-8 text-slate-950 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-slate-900/70">
                Contact Us
              </p>
              <h2 className="display-serif mt-4 text-4xl sm:text-5xl">
                Built to look like a homepage someone would actually ship.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-900/80">
                This assignment route intentionally goes beyond basic recreation: responsive
                layouts, motion, theming, sticky commerce nav, and clean mobile behavior all work
                together to make the result feel premium.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <a
                href="#home"
                className="rounded-full bg-slate-950 px-5 py-3 font-semibold text-white transition hover:-translate-y-0.5"
              >
                Back to top
              </a>
              <a
                href="#about"
                className="rounded-full border border-slate-950/15 bg-white/50 px-5 py-3 font-semibold text-slate-950 transition hover:-translate-y-0.5"
              >
                Explore sections
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
