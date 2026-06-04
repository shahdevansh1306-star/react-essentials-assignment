import { useState, useEffect } from 'react'

// useLocalStorage hook
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch { return initialValue }
  })

  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(value)) } catch {}
  }, [key, value])

  return [value, setValue]
}

// useForm hook
export function useForm(initialValues) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setValues(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const reset = () => { setValues(initialValues); setErrors({}) }

  return { values, setValues, errors, setErrors, handleChange, reset }
}

// useExpenses hook
export function useExpenses() {
  const [expenses, setExpenses] = useLocalStorage('expenses', [])

  const addExpense = (expense) => {
    setExpenses(prev => [...prev, { ...expense, id: Date.now() }])
  }

  const deleteExpense = (id) => {
    setExpenses(prev => prev.filter(e => e.id !== id))
  }

  const totalAmount = expenses.reduce((sum, e) => sum + parseFloat(e.amount || 0), 0)

  return { expenses, addExpense, deleteExpense, totalAmount }
}

// useWeather hook
export function useWeather() {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchWeather = async (city) => {
    if (!city.trim()) return
    setLoading(true)
    setError(null)
    try {
      // Using Open-Meteo (free, no API key needed) with geocoding
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`)
      const geoData = await geoRes.json()
      if (!geoData.results?.length) throw new Error('City not found')
      const { latitude, longitude, name, country } = geoData.results[0]
      const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&temperature_unit=celsius`)
      const weatherData = await weatherRes.json()
      const wc = weatherData.current.weather_code
      const condition = wc <= 1 ? 'Clear' : wc <= 3 ? 'Partly Cloudy' : wc <= 67 ? 'Rainy' : wc <= 77 ? 'Snowy' : 'Thunderstorm'
      setWeather({
        city: `${name}, ${country}`,
        temp: Math.round(weatherData.current.temperature_2m),
        condition,
        humidity: weatherData.current.relative_humidity_2m,
        wind: Math.round(weatherData.current.wind_speed_10m),
      })
    } catch (err) {
      setError(err.message || 'Unable to fetch weather data')
    } finally {
      setLoading(false)
    }
  }

  return { weather, loading, error, fetchWeather }
}
