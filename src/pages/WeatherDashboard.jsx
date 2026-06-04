import { useState, useEffect, useRef } from 'react'
import { useWeather } from '../hooks/index'
import BackButton from '../components/BackButton'

const weatherIcons = { Clear: '☀️', 'Partly Cloudy': '⛅', Rainy: '🌧️', Snowy: '❄️', Thunderstorm: '⛈️' }
const weatherColors = {
  Clear: 'from-amber-400 to-orange-400',
  'Partly Cloudy': 'from-sky-400 to-blue-500',
  Rainy: 'from-slate-400 to-blue-600',
  Snowy: 'from-blue-200 to-indigo-300',
  Thunderstorm: 'from-slate-600 to-gray-800',
}

export default function WeatherDashboard() {
  const [city, setCity] = useState('')
  const [autoRefresh, setAutoRefresh] = useState(false)
  const { weather, loading, error, fetchWeather } = useWeather()
  const intervalRef = useRef(null)

  useEffect(() => {
    fetchWeather('Mumbai')
  }, [])

  useEffect(() => {
    if (autoRefresh && weather) {
      intervalRef.current = setInterval(() => fetchWeather(weather.city.split(',')[0]), 60000)
    }
    return () => clearInterval(intervalRef.current)
  }, [autoRefresh, weather])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (city.trim()) fetchWeather(city.trim())
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <BackButton />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Weather Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">Module 6 — useEffect, API Fetching & Side Effects</p>

        <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
          <input
            value={city}
            onChange={e => setCity(e.target.value)}
            placeholder="Enter city name..."
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:border-sky-400 text-gray-900 dark:text-white placeholder-gray-400"
          />
          <button type="submit" disabled={loading} className="px-6 py-3 bg-sky-500 hover:bg-sky-600 disabled:bg-sky-300 text-white rounded-xl text-sm font-semibold transition-colors">
            {loading ? '⏳' : 'Get Weather'}
          </button>
        </form>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-5 text-red-600 dark:text-red-400 text-sm">
            ⚠️ {error}
          </div>
        )}

        {loading && (
          <div className="text-center py-12">
            <div className="text-4xl animate-bounce">🌐</div>
            <p className="text-gray-400 mt-3 text-sm">Loading weather data...</p>
          </div>
        )}

        {weather && !loading && (
          <div className={`rounded-2xl bg-gradient-to-br ${weatherColors[weather.condition] || 'from-sky-400 to-blue-500'} p-6 text-white shadow-xl mb-5`}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-white/70 text-sm mb-1">📍 {weather.city}</p>
                <p className="text-6xl font-bold">{weather.temp}°C</p>
                <p className="text-white/90 text-lg font-medium mt-1">{weather.condition}</p>
              </div>
              <div className="text-7xl">{weatherIcons[weather.condition] || '🌡️'}</div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/20 rounded-xl p-3 backdrop-blur-sm">
                <p className="text-white/70 text-xs">Humidity</p>
                <p className="text-white font-bold text-lg">{weather.humidity}%</p>
              </div>
              <div className="bg-white/20 rounded-xl p-3 backdrop-blur-sm">
                <p className="text-white/70 text-xs">Wind Speed</p>
                <p className="text-white font-bold text-lg">{weather.wind} km/h</p>
              </div>
            </div>
          </div>
        )}

        {weather && (
          <div className="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
            <label className="flex items-center gap-2 cursor-pointer flex-1">
              <div
                onClick={() => setAutoRefresh(a => !a)}
                className={`w-10 h-6 rounded-full transition-colors ${autoRefresh ? 'bg-sky-500' : 'bg-gray-200 dark:bg-gray-600'} relative`}
              >
                <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${autoRefresh ? 'left-5' : 'left-1'}`} />
              </div>
              <span className="text-sm text-gray-700 dark:text-gray-300">Auto-refresh every 60 seconds</span>
            </label>
            <button onClick={() => weather && fetchWeather(weather.city.split(',')[0])} className="text-xs text-sky-500 hover:text-sky-600 font-medium">
              Refresh Now
            </button>
          </div>
        )}

        <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">useEffect Concepts Used</p>
          <div className="flex flex-wrap gap-2">
            {['Mount effect (default city)', 'Dependency array (city)', 'Cleanup (interval clear)', 'Conditional fetching', 'Async in useEffect'].map(c => (
              <span key={c} className="px-2.5 py-1 bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400 text-xs rounded-lg border border-sky-200 dark:border-sky-800">{c}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
