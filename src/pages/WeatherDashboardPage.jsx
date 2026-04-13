import { useEffect, useState } from 'react'
import { CloudSun, LoaderCircle, MapPin, RefreshCcw, Wind } from 'lucide-react'

const weatherMap = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Foggy',
  48: 'Depositing rime fog',
  51: 'Light drizzle',
  61: 'Light rain',
  63: 'Rain',
  71: 'Snowfall',
  80: 'Rain showers',
  95: 'Thunderstorm',
}

async function fetchWeatherByCity(city, signal) {
  const geoResponse = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`,
    { signal },
  )

  if (!geoResponse.ok) {
    throw new Error('Unable to fetch city information.')
  }

  const geoData = await geoResponse.json()
  const location = geoData.results?.[0]

  if (!location) {
    throw new Error('City not found.')
  }

  const weatherResponse = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto`,
    { signal },
  )

  if (!weatherResponse.ok) {
    throw new Error('Unable to fetch weather data.')
  }

  const weatherData = await weatherResponse.json()

  return {
    city: `${location.name}, ${location.country}`,
    latitude: location.latitude,
    longitude: location.longitude,
    current: weatherData.current,
  }
}

export function WeatherDashboardPage() {
  const [query, setQuery] = useState('Ahmedabad')
  const [selectedCity, setSelectedCity] = useState('Ahmedabad')
  const [refreshToken, setRefreshToken] = useState(0)
  const [weather, setWeather] = useState(null)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const [lastUpdated, setLastUpdated] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadWeather() {
      try {
        setStatus('loading')
        setError('')
        const data = await fetchWeatherByCity(selectedCity, controller.signal)
        setWeather(data)
        setStatus('success')
        setLastUpdated(new Date().toLocaleTimeString())
      } catch (fetchError) {
        if (fetchError.name === 'AbortError') {
          return
        }
        setStatus('error')
        setError(fetchError.message)
      }
    }

    loadWeather()
    return () => controller.abort()
  }, [refreshToken, selectedCity])

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setRefreshToken((value) => value + 1)
    }, 60000)

    return () => window.clearInterval(intervalId)
  }, [])

  function handleSubmit(event) {
    event.preventDefault()
    if (!query.trim()) {
      return
    }
    setSelectedCity(query.trim())
    setRefreshToken((value) => value + 1)
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[40px] border border-white/60 bg-[linear-gradient(135deg,#082f49,#0f766e,#67e8f9)] px-6 py-10 text-white sm:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-cyan-100">
          useEffect + API Fetching
        </p>
        <h1 className="display-serif mt-4 max-w-4xl text-5xl leading-tight">
          A weather dashboard that actually demonstrates side-effects, cleanup, and async control.
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-cyan-50/90">
          The page loads a default city, fetches weather on demand, manages loading and error
          states, and keeps side-effects separated and predictable.
        </p>
      </section>

      <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-6">
          <div className="rounded-[32px] border border-white/60 bg-white/75 p-6 backdrop-blur-xl">
            <form className="grid gap-4" onSubmit={handleSubmit}>
              <label className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-600">
                Search city
              </label>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Enter a city name..."
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
              />
              <button
                type="submit"
                className="rounded-full bg-slate-950 px-5 py-3 font-semibold text-white transition hover:-translate-y-0.5"
              >
                Get Weather
              </button>
            </form>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {[
              ['Current city', weather?.city || selectedCity],
              ['Last updated', lastUpdated || 'Awaiting response'],
              ['Fetch mode', 'Default + on demand'],
            ].map(([label, value]) => (
              <div key={label} className="rounded-[28px] border border-white/60 bg-white/75 p-5 backdrop-blur-xl">
                <p className="text-sm font-medium text-slate-500">{label}</p>
                <p className="mt-3 text-2xl font-semibold text-slate-950">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[32px] border border-white/60 bg-white/75 p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-600">
                Live weather card
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                Open Meteo powered dashboard
              </h2>
            </div>
            <RefreshCcw className={`h-5 w-5 text-cyan-600 ${status === 'loading' ? 'animate-spin' : ''}`} />
          </div>

          <div className="mt-6 rounded-[28px] bg-slate-950 p-6 text-white">
            {status === 'loading' ? (
              <div className="flex min-h-[280px] flex-col items-center justify-center gap-4 text-center text-slate-300">
                <LoaderCircle className="h-8 w-8 animate-spin text-cyan-300" />
                Loading weather data...
              </div>
            ) : null}

            {status === 'error' ? (
              <div className="min-h-[280px] rounded-[24px] border border-rose-400/20 bg-rose-500/10 p-6 text-rose-100">
                <p className="text-lg font-semibold">Unable to fetch weather</p>
                <p className="mt-3 text-sm leading-7">{error}</p>
              </div>
            ) : null}

            {status === 'success' && weather ? (
              <div className="space-y-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm text-cyan-200">
                      <MapPin className="h-4 w-4" />
                      {weather.city}
                    </div>
                    <p className="mt-5 text-6xl font-semibold text-cyan-200">
                      {Math.round(weather.current.temperature_2m)}°C
                    </p>
                    <p className="mt-2 text-lg text-slate-200">
                      {weatherMap[weather.current.weather_code] || 'Current conditions available'}
                    </p>
                  </div>
                  <CloudSun className="h-16 w-16 text-cyan-300" />
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-[24px] bg-white/6 p-4">
                    <p className="text-sm text-slate-300">Humidity</p>
                    <p className="mt-2 text-2xl font-semibold">
                      {weather.current.relative_humidity_2m}%
                    </p>
                  </div>
                  <div className="rounded-[24px] bg-white/6 p-4">
                    <p className="text-sm text-slate-300">Wind speed</p>
                    <p className="mt-2 text-2xl font-semibold">
                      {weather.current.wind_speed_10m} km/h
                    </p>
                  </div>
                  <div className="rounded-[24px] bg-white/6 p-4">
                    <p className="text-sm text-slate-300">Coordinates</p>
                    <p className="mt-2 text-lg font-semibold">
                      {weather.latitude.toFixed(2)}, {weather.longitude.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="rounded-[24px] border border-white/10 bg-white/5 p-4 text-sm leading-7 text-slate-300">
                  <div className="flex items-center gap-2 text-cyan-200">
                    <Wind className="h-4 w-4" />
                    useEffect management notes
                  </div>
                  <p className="mt-2">
                    Weather is fetched on initial mount, refreshed on city change, and wrapped in
                    cleanup through AbortController so stale requests do not leak or overwrite state.
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
