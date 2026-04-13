import { useState } from 'react'

export function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-500">
        Test Component
      </p>
      <h3 className="mt-3 text-2xl font-semibold text-slate-900">Counter Playground</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        This lightweight counter is included so the module can demonstrate interaction testing.
      </p>

      <div className="mt-5 flex items-center gap-3">
        <button
          type="button"
          onClick={() => setCount((value) => value - 1)}
          className="rounded-full border border-slate-200 px-4 py-2 font-medium text-slate-700 transition hover:border-orange-300 hover:text-orange-600"
        >
          Decrement
        </button>
        <span aria-label="counter-value" className="min-w-12 text-center text-2xl font-semibold">
          {count}
        </span>
        <button
          type="button"
          onClick={() => setCount((value) => value + 1)}
          className="rounded-full bg-slate-950 px-4 py-2 font-medium text-white transition hover:-translate-y-0.5"
        >
          Increment
        </button>
      </div>
    </div>
  )
}
