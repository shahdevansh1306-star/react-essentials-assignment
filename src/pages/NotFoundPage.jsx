import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="glass-panel rounded-[40px] px-6 py-14 text-center sm:px-10">
      <p className="text-sm font-semibold uppercase tracking-[0.32em] text-orange-500">404</p>
      <h1 className="display-serif mt-4 text-5xl text-slate-950">Route not found</h1>
      <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
        The route you tried to open does not exist in this assignment showcase. Jump back to the
        overview and pick one of the built modules.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 font-semibold text-white transition hover:-translate-y-0.5"
      >
        <ArrowLeft className="h-4 w-4" />
        Return to showcase
      </Link>
    </div>
  )
}
