import StudentGradeTracker from '../modules/grade/StudentGradeTracker'

export function GradeTrackerPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-[40px] border border-white/60 bg-[linear-gradient(135deg,#102a43,#0f766e,#99f6e4)] px-6 py-10 text-white sm:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-teal-100">
          Class Components + Lifecycle
        </p>
        <h1 className="display-serif mt-4 max-w-4xl text-5xl leading-tight">
          Legacy React patterns, but clean enough to feel intentional instead of outdated.
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-teal-50/90">
          This module uses class-based components, constructor state, componentDidMount,
          componentDidUpdate, and componentWillUnmount to manage a dynamic grade tracker.
        </p>
      </section>

      <StudentGradeTracker />
    </div>
  )
}
