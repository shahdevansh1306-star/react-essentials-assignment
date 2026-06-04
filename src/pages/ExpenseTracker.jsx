import { useState } from 'react'
import { useExpenses, useForm } from '../hooks/index'
import BackButton from '../components/BackButton'

const CATEGORIES = ['Food', 'Transport', 'Shopping', 'Health', 'Entertainment', 'Bills', 'Other']
const CAT_COLORS = { Food: 'bg-orange-100 text-orange-700', Transport: 'bg-blue-100 text-blue-700', Shopping: 'bg-pink-100 text-pink-700', Health: 'bg-green-100 text-green-700', Entertainment: 'bg-purple-100 text-purple-700', Bills: 'bg-red-100 text-red-700', Other: 'bg-gray-100 text-gray-700' }

export default function ExpenseTracker() {
  const { expenses, addExpense, deleteExpense, totalAmount } = useExpenses()
  const { values, errors, setErrors, handleChange, reset } = useForm({ title: '', amount: '', category: 'Food', date: new Date().toISOString().split('T')[0] })
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')

  const validate = () => {
    const e = {}
    if (!values.title.trim()) e.title = 'Title required'
    if (!values.amount || isNaN(values.amount) || parseFloat(values.amount) <= 0) e.amount = 'Valid amount required'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    addExpense(values)
    reset()
  }

  const filtered = expenses.filter(e => {
    const matchCat = filter === 'All' || e.category === filter
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const byCategory = CATEGORIES.map(cat => ({
    cat,
    total: expenses.filter(e => e.category === cat).reduce((s, e) => s + parseFloat(e.amount || 0), 0)
  })).filter(c => c.total > 0)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <BackButton />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Expense Tracker</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">Module 10 — Custom Hooks & LocalStorage</p>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left: Form */}
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 mb-5">
              <h2 className="font-bold text-gray-900 dark:text-white mb-4">Add Expense</h2>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <input name="title" value={values.title} onChange={handleChange} placeholder="Expense title" className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm focus:outline-none focus:border-teal-400 text-gray-900 dark:text-white placeholder-gray-400" />
                  {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                </div>
                <div>
                  <input name="amount" type="number" step="0.01" value={values.amount} onChange={handleChange} placeholder="Amount (₹)" className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm focus:outline-none focus:border-teal-400 text-gray-900 dark:text-white placeholder-gray-400" />
                  {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
                </div>
                <select name="category" value={values.category} onChange={handleChange} className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm focus:outline-none focus:border-teal-400 text-gray-900 dark:text-white">
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
                <input name="date" type="date" value={values.date} onChange={handleChange} className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm focus:outline-none focus:border-teal-400 text-gray-900 dark:text-white" />
                <button type="submit" className="w-full py-2.5 bg-teal-500 hover:bg-teal-600 text-white rounded-xl text-sm font-semibold transition-colors">Add Expense</button>
              </form>
            </div>

            {/* Summary */}
            <div className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl p-5 text-white">
              <p className="text-white/70 text-xs mb-1">Total Spending</p>
              <p className="text-3xl font-bold">₹{totalAmount.toFixed(2)}</p>
              <p className="text-white/70 text-xs mt-2">{expenses.length} expense{expenses.length !== 1 ? 's' : ''} tracked</p>
            </div>
          </div>

          {/* Right: List */}
          <div className="lg:col-span-2">
            <div className="flex flex-wrap gap-2 mb-4">
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search expenses..." className="flex-1 min-w-32 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:border-teal-400 text-gray-900 dark:text-white placeholder-gray-400" />
              <select value={filter} onChange={e => setFilter(e.target.value)} className="px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm focus:outline-none text-gray-900 dark:text-white">
                <option>All</option>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>

            {filtered.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-12 text-center">
                <p className="text-4xl mb-3">💸</p>
                <p className="text-gray-400 text-sm">No expenses yet. Add your first one!</p>
              </div>
            ) : (
              <div className="space-y-2">
                {filtered.slice().reverse().map(exp => (
                  <div key={exp.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-3.5 flex items-center gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-gray-900 dark:text-white">{exp.title}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${CAT_COLORS[exp.category] || 'bg-gray-100 text-gray-700'}`}>{exp.category}</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">{exp.date}</p>
                    </div>
                    <span className="font-bold text-gray-900 dark:text-white">₹{parseFloat(exp.amount).toFixed(2)}</span>
                    <button onClick={() => deleteExpense(exp.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">🗑</button>
                  </div>
                ))}
              </div>
            )}

            {byCategory.length > 0 && (
              <div className="mt-5 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5">
                <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-sm">Spending by Category</h3>
                <div className="space-y-2">
                  {byCategory.sort((a, b) => b.total - a.total).map(({ cat, total }) => (
                    <div key={cat} className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400 w-24 shrink-0">{cat}</span>
                      <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-teal-500 h-2 rounded-full transition-all" style={{ width: `${Math.min(100, (total / totalAmount) * 100)}%` }} />
                      </div>
                      <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 w-20 text-right">₹{total.toFixed(0)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
