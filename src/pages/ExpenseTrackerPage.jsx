import { useDeferredValue, useMemo, useState } from 'react'
import { BarChart3, PiggyBank, Search, Trash2 } from 'lucide-react'

import { useExpenseFilters } from '../modules/expense/useExpenseFilters'
import { useExpenseManager } from '../modules/expense/useExpenseManager'

export function ExpenseTrackerPage() {
  const { expenses, addExpense, deleteExpense, toggleFlag } = useExpenseManager()
  const [form, setForm] = useState({
    title: '',
    amount: '',
    category: 'Food',
    date: new Date().toISOString().slice(0, 10),
  })
  const [filters, setFilters] = useState({
    search: '',
    category: 'All',
    startDate: '',
    endDate: '',
    sortBy: 'date',
  })

  const deferredSearch = useDeferredValue(filters.search)
  const filteredExpenses = useExpenseFilters(expenses, { ...filters, search: deferredSearch })

  const summary = useMemo(() => {
    const total = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0)
    const grouped = filteredExpenses.reduce((map, expense) => {
      map[expense.category] = (map[expense.category] || 0) + expense.amount
      return map
    }, {})

    const topCategory =
      Object.entries(grouped).sort((first, second) => second[1] - first[1])[0]?.[0] || 'None'

    return {
      total,
      count: filteredExpenses.length,
      topCategory,
    }
  }, [filteredExpenses])

  function handleSubmit(event) {
    event.preventDefault()

    if (!form.title || !form.amount || Number(form.amount) <= 0) {
      return
    }

    addExpense({
      title: form.title,
      amount: Number(form.amount),
      category: form.category,
      date: form.date,
    })

    setForm({
      title: '',
      amount: '',
      category: form.category,
      date: new Date().toISOString().slice(0, 10),
    })
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[40px] border border-white/60 bg-[linear-gradient(135deg,#0f172a,#134e4a,#10b981)] px-6 py-10 text-white sm:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-emerald-200">
          Custom Hooks + LocalStorage
        </p>
        <h1 className="display-serif mt-4 max-w-4xl text-5xl leading-tight">
          A personal finance tracker with reusable hooks, persistence, filters, and summaries.
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-emerald-50/85">
          Logic is split into dedicated hooks so the UI stays lightweight while storage, filtering,
          and mutations remain reusable and easy to reason about.
        </p>
      </section>

      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-6">
          <div className="rounded-[32px] border border-white/60 bg-white/75 p-6 backdrop-blur-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-600">
              Add Expense
            </p>
            <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
              {[
                ['title', 'Title', 'text'],
                ['amount', 'Amount', 'number'],
                ['date', 'Date', 'date'],
              ].map(([field, label, type]) => (
                <div key={field}>
                  <label className="mb-2 block text-sm font-medium text-slate-700">{label}</label>
                  <input
                    type={type}
                    value={form[field]}
                    onChange={(event) =>
                      setForm((previous) => ({
                        ...previous,
                        [field]: event.target.value,
                      }))
                    }
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
                  />
                </div>
              ))}

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Category</label>
                <select
                  value={form.category}
                  onChange={(event) =>
                    setForm((previous) => ({
                      ...previous,
                      category: event.target.value,
                    }))
                  }
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
                >
                  {['Food', 'Transport', 'Bills', 'Software', 'Shopping'].map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="rounded-full bg-slate-950 px-5 py-3 font-semibold text-white transition hover:-translate-y-0.5"
              >
                Add Expense
              </button>
            </form>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {[
              ['Total spend', `₹${summary.total}`],
              ['Transactions', summary.count],
              ['Top category', summary.topCategory],
            ].map(([label, value]) => (
              <div key={label} className="rounded-[28px] border border-white/60 bg-white/75 p-5 backdrop-blur-xl">
                <p className="text-sm font-medium text-slate-500">{label}</p>
                <p className="mt-3 text-3xl font-semibold text-slate-950">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[32px] border border-white/60 bg-white/75 p-6 backdrop-blur-xl">
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative min-w-[220px] flex-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  value={filters.search}
                  onChange={(event) =>
                    setFilters((previous) => ({
                      ...previous,
                      search: event.target.value,
                    }))
                  }
                  placeholder="Search by title..."
                  className="w-full rounded-full border border-slate-200 py-3 pl-11 pr-4 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
                />
              </div>

              <select
                value={filters.category}
                onChange={(event) =>
                  setFilters((previous) => ({
                    ...previous,
                    category: event.target.value,
                  }))
                }
                className="rounded-full border border-slate-200 px-4 py-3 outline-none"
              >
                {['All', 'Food', 'Transport', 'Bills', 'Software', 'Shopping'].map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <select
                value={filters.sortBy}
                onChange={(event) =>
                  setFilters((previous) => ({
                    ...previous,
                    sortBy: event.target.value,
                  }))
                }
                className="rounded-full border border-slate-200 px-4 py-3 outline-none"
              >
                <option value="date">Sort by date</option>
                <option value="amount">Sort by amount</option>
                <option value="category">Sort by category</option>
              </select>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <input
                type="date"
                value={filters.startDate}
                onChange={(event) =>
                  setFilters((previous) => ({
                    ...previous,
                    startDate: event.target.value,
                  }))
                }
                className="rounded-full border border-slate-200 px-4 py-3 outline-none"
              />
              <input
                type="date"
                value={filters.endDate}
                onChange={(event) =>
                  setFilters((previous) => ({
                    ...previous,
                    endDate: event.target.value,
                  }))
                }
                className="rounded-full border border-slate-200 px-4 py-3 outline-none"
              />
            </div>
          </div>

          <div className="rounded-[32px] border border-white/60 bg-white/75 p-6 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-5 w-5 text-emerald-500" />
              <h2 className="text-2xl font-semibold text-slate-900">Expense activity</h2>
            </div>

            <div className="mt-6 grid gap-4">
              {filteredExpenses.length ? (
                filteredExpenses.map((expense) => (
                  <div
                    key={expense.id}
                    className="grid gap-4 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-[1fr_auto_auto]"
                  >
                    <div>
                      <div className="flex items-center gap-3">
                        <p className="text-lg font-semibold text-slate-900">{expense.title}</p>
                        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                          {expense.category}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-slate-500">{expense.date}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleFlag(expense.id)}
                      className={`rounded-full px-4 py-2 text-sm font-medium ${
                        expense.flagged
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {expense.flagged ? 'Flagged' : 'Mark'}
                    </button>

                    <div className="flex items-center gap-3 justify-self-end">
                      <p className="text-2xl font-semibold text-slate-950">₹{expense.amount}</p>
                      <button
                        type="button"
                        onClick={() => deleteExpense(expense.id)}
                        className="rounded-full bg-rose-50 p-3 text-rose-600"
                        aria-label="Delete expense"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-[28px] bg-slate-950/[0.04] p-6 text-sm leading-7 text-slate-600">
                  No expenses match the current filters.
                </div>
              )}
            </div>
          </div>

          <div className="rounded-[32px] border border-white/60 bg-slate-950 p-6 text-white">
            <div className="flex items-center gap-3">
              <PiggyBank className="h-5 w-5 text-emerald-300" />
              <h2 className="text-2xl font-semibold">Monthly snapshot</h2>
            </div>
            <div className="mt-6 space-y-4">
              {['Food', 'Transport', 'Bills', 'Software', 'Shopping'].map((category) => {
                const total = filteredExpenses
                  .filter((expense) => expense.category === category)
                  .reduce((sum, expense) => sum + expense.amount, 0)

                return (
                  <div key={category}>
                    <div className="flex items-center justify-between text-sm text-slate-300">
                      <span>{category}</span>
                      <span>₹{total}</span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-white/10">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-300"
                        style={{
                          width: `${Math.min(100, summary.total ? (total / summary.total) * 100 : 0)}%`,
                        }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
