import { useDeferredValue, useMemo, useState } from 'react'
import { Heart, Moon, Search, Sun, UserRound } from 'lucide-react'

import { movieData } from '../data/movies'

const profileScenes = [
  {
    label: 'Studio Portrait',
    gradient: 'from-amber-300 via-orange-400 to-rose-500',
  },
  {
    label: 'Midnight Theme',
    gradient: 'from-slate-900 via-violet-700 to-fuchsia-500',
  },
  {
    label: 'Ocean Edition',
    gradient: 'from-cyan-300 via-sky-500 to-indigo-600',
  },
]

export function ReactEssentialsPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [sceneIndex, setSceneIndex] = useState(0)
  const [likes, setLikes] = useState(42)
  const [search, setSearch] = useState('')
  const [favourites, setFavourites] = useState([])

  const deferredSearch = useDeferredValue(search)

  const filteredMovies = useMemo(() => {
    if (!deferredSearch.trim()) {
      return []
    }

    return movieData.filter((movie) =>
      `${movie.title} ${movie.genre}`.toLowerCase().includes(deferredSearch.toLowerCase()),
    )
  }, [deferredSearch])

  const favouriteMovies = movieData.filter((movie) => favourites.includes(movie.id))
  const currentScene = profileScenes[sceneIndex]

  function toggleFavourite(movieId) {
    setFavourites((previous) =>
      previous.includes(movieId)
        ? previous.filter((id) => id !== movieId)
        : [...previous, movieId],
    )
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[40px] border border-white/60 bg-[linear-gradient(135deg,#111827,#4c1d95,#fb7185)] px-6 py-10 text-white sm:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-fuchsia-200">
          React Essentials Mini Projects
        </p>
        <h1 className="display-serif mt-4 max-w-4xl text-5xl leading-tight">
          Props, state, event handling, conditional rendering, and lists wrapped in two expressive demos.
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-fuchsia-50/90">
          The route combines the portfolio card application and movie explorer into one polished
          mini-project space while keeping each concept easy to inspect.
        </p>
      </section>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div
          className={`rounded-[36px] border p-6 backdrop-blur-xl ${
            darkMode
              ? 'border-white/10 bg-slate-950 text-white'
              : 'border-white/60 bg-white/75 text-slate-950'
          }`}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-fuchsia-500">
            Portfolio Card
          </p>

          <div className="mt-6 rounded-[32px] border border-white/10 bg-white/6 p-6">
            <div
              className={`relative overflow-hidden rounded-[28px] bg-gradient-to-br ${currentScene.gradient} p-8 text-white`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_30%)]" />
              <div className="relative flex items-start justify-between gap-4">
                <div className="rounded-3xl bg-white/18 p-4">
                  <UserRound className="h-14 w-14" />
                </div>
                <span className="rounded-full bg-white/18 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em]">
                  {currentScene.label}
                </span>
              </div>

              <h2 className="display-serif mt-8 text-4xl">Devansh Shah</h2>
              <p className="mt-3 text-sm uppercase tracking-[0.32em] text-white/80">
                Frontend Builder
              </p>
              <p className="mt-4 max-w-md text-sm leading-7 text-white/88">
                I turn academic briefs into showcase-grade interfaces with strong hierarchy,
                motion, and production-minded state management.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {['React', 'Redux', 'Framer Motion', 'Tailwind'].map((skill) => (
                  <span key={skill} className="rounded-full bg-white/18 px-3 py-1 text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setDarkMode((value) => !value)}
                className="rounded-full bg-slate-950 px-4 py-3 text-sm font-medium text-white"
              >
                {darkMode ? <Sun className="mr-2 inline h-4 w-4" /> : <Moon className="mr-2 inline h-4 w-4" />}
                Toggle theme
              </button>
              <button
                type="button"
                onClick={() => setSceneIndex((current) => (current + 1) % profileScenes.length)}
                className="rounded-full bg-fuchsia-500 px-4 py-3 text-sm font-medium text-white"
              >
                Cycle photo style
              </button>
              <button
                type="button"
                onClick={() => window.alert('Thanks for checking the portfolio card demo.')}
                className="rounded-full border border-slate-200 px-4 py-3 text-sm font-medium"
              >
                Show alert
              </button>
              <button
                type="button"
                onClick={() => setLikes((value) => value + 1)}
                className="rounded-full border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600"
              >
                <Heart className="mr-2 inline h-4 w-4" />
                Like {likes}
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-[36px] border border-white/60 bg-white/75 p-6 backdrop-blur-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-fuchsia-500">
            Movie Explorer
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="relative min-w-[240px] flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by movie title or genre..."
                className="w-full rounded-full border border-slate-200 py-3 pl-11 pr-4 outline-none transition focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-100"
              />
            </div>
            <button
              type="button"
              onClick={() => setSearch('')}
              className="rounded-full border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700"
            >
              Reset
            </button>
          </div>

          <div className="mt-6 grid gap-4">
            {!search.trim() ? (
              <div className="rounded-[28px] bg-slate-950/[0.04] p-6 text-sm leading-7 text-slate-600">
                Start typing to search the movie database.
              </div>
            ) : null}

            {search.trim() && filteredMovies.length === 0 ? (
              <div className="rounded-[28px] bg-rose-50 p-6 text-sm leading-7 text-rose-700">
                No matching movies found for “{search}”.
              </div>
            ) : null}

            {filteredMovies.map((movie) => (
              <div
                key={movie.id}
                className="grid gap-4 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-[1fr_auto]"
              >
                <div>
                  <p className="text-2xl font-semibold text-slate-900">{movie.title}</p>
                  <p className="mt-2 text-sm uppercase tracking-[0.24em] text-fuchsia-500">
                    {movie.genre} • {movie.year} • {movie.rating}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{movie.description}</p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleFavourite(movie.id)}
                  className={`rounded-full px-4 py-3 text-sm font-medium ${
                    favourites.includes(movie.id)
                      ? 'bg-rose-100 text-rose-600'
                      : 'bg-slate-950 text-white'
                  }`}
                >
                  <Heart className="mr-2 inline h-4 w-4" />
                  {favourites.includes(movie.id) ? 'Unfavourite' : 'Favourite'}
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[28px] bg-slate-950 p-5 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-fuchsia-300">
              Favourite Movies
            </p>
            <div className="mt-4 grid gap-3">
              {favouriteMovies.length ? (
                favouriteMovies.map((movie) => (
                  <div key={movie.id} className="rounded-2xl bg-white/8 px-4 py-3">
                    {movie.title}
                  </div>
                ))
              ) : (
                <div className="rounded-2xl bg-white/8 px-4 py-3 text-sm text-slate-300">
                  No favourites selected yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
