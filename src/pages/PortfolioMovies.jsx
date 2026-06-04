import { useState } from 'react'
import BackButton from '../components/BackButton'

const PROFILES = [
  { name: 'Alex Chen', title: 'Full Stack Developer', bio: 'Building scalable web apps with modern React patterns. Passionate about clean code and great UX.', skills: ['React', 'TypeScript', 'Node.js', 'GraphQL'], avatar: '👨‍💻' },
  { name: 'Sara Patel', title: 'UI/UX Designer & Engineer', bio: 'Crafting delightful interfaces at the intersection of design and engineering.', skills: ['Figma', 'React', 'TailwindCSS', 'Framer'], avatar: '👩‍🎨' },
  { name: 'Marcus Johnson', title: 'DevOps & Cloud Architect', bio: 'Automating everything. Making deployments boring so products can be exciting.', skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform'], avatar: '🧑‍🔧' },
  { name: 'Priya Sharma', title: 'AI & ML Engineer', bio: 'Turning data into decisions. Building neural networks that actually make sense.', skills: ['Python', 'TensorFlow', 'LangChain', 'React'], avatar: '👩‍🔬' },
]

const MOVIES = [
  { id: 1, title: 'Interstellar', year: 2014, genre: 'Sci-Fi', rating: 8.6, tags: ['Space', 'Time', 'Survival', 'Adventure'] },
  { id: 2, title: 'Star Wars: A New Hope', year: 1977, genre: 'Sci-Fi', rating: 8.6, tags: ['Space Opera', 'Rebels', 'Force', 'Galaxy'] },
  { id: 3, title: 'The Star', year: 2017, genre: 'Animation', rating: 6.3, tags: ['Family', 'Journey', 'Friends'] },
  { id: 4, title: 'Inception', year: 2010, genre: 'Sci-Fi', rating: 8.8, tags: ['Dreams', 'Mind', 'Heist', 'Complex'] },
  { id: 5, title: 'The Dark Knight', year: 2008, genre: 'Action', rating: 9.0, tags: ['Batman', 'Joker', 'Gotham', 'Crime'] },
  { id: 6, title: 'Spirited Away', year: 2001, genre: 'Animation', rating: 8.6, tags: ['Magic', 'Japan', 'Spirit World'] },
]

function PortfolioCard({ theme, onToggleTheme }) {
  const [profileIndex, setProfileIndex] = useState(0)
  const [likes, setLikes] = useState(128)
  const profile = PROFILES[profileIndex]
  const isDark = theme === 'dark'

  return (
    <div className={`rounded-2xl border ${isDark ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900'} overflow-hidden transition-all duration-300`}>
      <div className={`flex justify-end p-3 border-b ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
        <button onClick={onToggleTheme} className="flex items-center gap-2 text-xs font-medium text-gray-500 hover:text-orange-500 transition-colors">
          ☀️ Toggle theme
        </button>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-4 mb-5">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-3xl shadow-lg">
            {profile.avatar}
          </div>
          <div>
            <h2 className="text-xl font-bold">{profile.name}</h2>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{profile.title}</p>
          </div>
        </div>
        <p className={`text-sm leading-relaxed mb-5 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{profile.bio}</p>
        <p className={`text-xs font-semibold uppercase tracking-widest mb-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Skills</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {profile.skills.map(s => (
            <span key={s} className={`px-3 py-1 rounded-lg text-xs font-medium ${isDark ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700'}`}>{s}</span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setProfileIndex(i => (i - 1 + PROFILES.length) % PROFILES.length)}
              className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-orange-50 transition-colors"
            >‹</button>
            <span className="text-xs font-medium text-gray-500">{profileIndex + 1}/{PROFILES.length}</span>
            <button
              onClick={() => setProfileIndex(i => (i + 1) % PROFILES.length)}
              className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-orange-50 transition-colors"
            >›</button>
          </div>
          <button
            onClick={() => setLikes(l => l + 1)}
            className="flex items-center gap-1.5 text-rose-500 font-medium text-sm hover:scale-110 transition-transform"
          >
            ♥ {likes}
          </button>
          <button
            onClick={() => alert(`Contact ${profile.name}!`)}
            className="px-4 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-semibold transition-colors"
          >
            ✉ Contact
          </button>
        </div>
      </div>
    </div>
  )
}

function MovieCard({ movie, isFav, onToggleFav }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 flex items-start justify-between gap-3">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-gray-900 dark:text-white text-sm">{movie.title}</span>
          <span className="text-gray-400 text-xs">· {movie.year} · {movie.genre}</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <span className="px-2 py-0.5 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-xs font-bold rounded-md">{movie.rating}</span>
          {movie.tags.map(t => <span key={t} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-md">{t}</span>)}
        </div>
      </div>
      <button
        onClick={() => onToggleFav(movie.id)}
        className={`shrink-0 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${isFav ? 'bg-rose-50 dark:bg-rose-900/30 border-rose-300 dark:border-rose-600 text-rose-600 dark:text-rose-400' : 'border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:border-rose-300 hover:text-rose-500'}`}
      >
        {isFav ? '♥ Favorited' : '♡ Favorite'}
      </button>
    </div>
  )
}

export default function PortfolioMovies() {
  const [theme, setTheme] = useState('light')
  const [query, setQuery] = useState('')
  const [favs, setFavs] = useState([1])

  const filtered = query.trim() ? MOVIES.filter(m => m.title.toLowerCase().includes(query.toLowerCase()) || m.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))) : []
  const favMovies = MOVIES.filter(m => favs.includes(m.id))

  const toggleFav = (id) => setFavs(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <BackButton />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Portfolio & Movie Explorer</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">Module 2 — JSX, Props, State, Events, Lists</p>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Part A: Portfolio Card */}
          <div>
            <h2 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 bg-violet-500 rounded text-white text-xs flex items-center justify-center font-bold">A</span>
              Portfolio Card
            </h2>
            <PortfolioCard theme={theme} onToggleTheme={() => setTheme(t => t === 'light' ? 'dark' : 'light')} />
          </div>

          {/* Part B: Movie Explorer */}
          <div>
            <h2 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 bg-pink-500 rounded text-white text-xs flex items-center justify-center font-bold">B</span>
              Movie Explorer
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5">
              <div className="flex gap-2 mb-3">
                <div className="flex-1 relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
                  <input
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder='Search movies (e.g. "Interstellar", "Star")'
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-orange-400"
                  />
                </div>
                <button onClick={() => setQuery('')} className="px-3 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-medium transition-colors">Reset</button>
              </div>

              {!query && (
                <p className="text-xs text-gray-400 text-center py-4">Type to search movies...</p>
              )}

              {query && filtered.length === 0 && (
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center py-4">No movies found for "{query}"</p>
              )}

              {filtered.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{filtered.length} result{filtered.length !== 1 ? 's' : ''} for "{query}"</p>
                  <div className="space-y-2">
                    {filtered.map(m => <MovieCard key={m.id} movie={m} isFav={favs.includes(m.id)} onToggleFav={toggleFav} />)}
                  </div>
                </div>
              )}

              {favMovies.length > 0 && (
                <div className="border-t border-gray-100 dark:border-gray-700 pt-4 mt-2">
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Favourite Movies</p>
                  <div className="flex flex-wrap gap-2">
                    {favMovies.map(m => (
                      <span key={m.id} className="px-2.5 py-1 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 text-xs rounded-lg border border-rose-200 dark:border-rose-800">
                        ♥ {m.title} ({m.year})
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {favMovies.length === 0 && (
                <p className="text-xs text-gray-400 text-center py-2">You haven't added any favorites yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
