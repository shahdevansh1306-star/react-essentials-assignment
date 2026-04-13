import React from 'react'

const seedStudents = [
  { id: 'stu-1', name: 'Riya Shah', grade: 84, status: 'Passed' },
  { id: 'stu-2', name: 'Yash Trivedi', grade: 56, status: 'Passed' },
  { id: 'stu-3', name: 'Meera Patel', grade: 32, status: 'Failed' },
]

class StudentForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      grade: '',
      error: '',
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const grade = Number(this.state.grade)
    if (!this.state.name.trim()) {
      this.setState({ error: 'Student name is required.' })
      return
    }

    if (Number.isNaN(grade) || grade < 0 || grade > 100) {
      this.setState({ error: 'Grade must be between 0 and 100.' })
      return
    }

    this.props.onAdd({
      id: `stu-${Date.now()}`,
      name: this.state.name,
      grade,
      status: grade >= 35 ? 'Passed' : 'Failed',
    })

    this.setState({
      name: '',
      grade: '',
      error: '',
    })
  }

  render() {
    return (
      <form className="grid gap-4" onSubmit={this.handleSubmit}>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Student name</label>
          <input
            value={this.state.name}
            onChange={(event) => this.setState({ name: event.target.value })}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-teal-400 focus:ring-4 focus:ring-teal-100"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Grade</label>
          <input
            type="number"
            value={this.state.grade}
            onChange={(event) => this.setState({ grade: event.target.value })}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-teal-400 focus:ring-4 focus:ring-teal-100"
          />
        </div>

        {this.state.error ? <p className="text-sm text-rose-600">{this.state.error}</p> : null}

        <button
          type="submit"
          className="rounded-full bg-slate-950 px-5 py-3 font-semibold text-white transition hover:-translate-y-0.5"
        >
          Add student
        </button>
      </form>
    )
  }
}

class StudentItem extends React.Component {
  render() {
    const { student, onRemove, onAdjustGrade, highlight } = this.props
    const isPassed = student.status === 'Passed'

    return (
      <div
        className={`grid gap-4 rounded-[28px] border p-5 shadow-sm md:grid-cols-[1fr_auto_auto] ${
          highlight
            ? 'border-teal-300 bg-teal-50'
            : 'border-slate-200 bg-white'
        }`}
      >
        <div>
          <div className="flex items-center gap-3">
            <p className="text-lg font-semibold text-slate-900">{student.name}</p>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] ${
                isPassed ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
              }`}
            >
              {student.status}
            </span>
          </div>
          <p className="mt-2 text-sm text-slate-500">Grade: {student.grade}</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onAdjustGrade(student.id, -5)}
            className="rounded-full bg-slate-100 px-3 py-2 text-sm font-medium text-slate-600"
          >
            -5
          </button>
          <button
            type="button"
            onClick={() => onAdjustGrade(student.id, 5)}
            className="rounded-full bg-slate-950 px-3 py-2 text-sm font-medium text-white"
          >
            +5
          </button>
        </div>

        <button
          type="button"
          onClick={() => onRemove(student.id)}
          className="rounded-full bg-rose-50 px-4 py-2 text-sm font-medium text-rose-600"
        >
          Remove
        </button>
      </div>
    )
  }
}

export default class StudentGradeTracker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      students: [],
      filter: 'all',
      sortOrder: 'desc',
      highlightId: '',
      logMessage: 'Waiting for componentDidMount...',
    }
  }

  componentDidMount() {
    console.log('StudentGradeTracker mounted')
    this.setState({
      students: seedStudents,
      logMessage: 'Sample data loaded through componentDidMount().',
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.students.length !== this.state.students.length) {
      console.log('Student list changed', this.state.students)
      this.setState({
        logMessage: 'Student list updated through componentDidUpdate().',
      })
    }
  }

  componentWillUnmount() {
    console.log('StudentGradeTracker will unmount')
  }

  addStudent = (student) => {
    this.setState({
      students: [student, ...this.state.students],
      highlightId: student.id,
    })
  }

  removeStudent = (studentId) => {
    this.setState({
      students: this.state.students.filter((student) => student.id !== studentId),
      highlightId: '',
    })
  }

  adjustGrade = (studentId, amount) => {
    this.setState({
      students: this.state.students.map((student) => {
        if (student.id !== studentId) {
          return student
        }

        const grade = Math.min(100, Math.max(0, student.grade + amount))
        return {
          ...student,
          grade,
          status: grade >= 35 ? 'Passed' : 'Failed',
        }
      }),
      highlightId: studentId,
    })
  }

  render() {
    const visibleStudents = [...this.state.students]
      .filter((student) => {
        if (this.state.filter === 'passed') return student.status === 'Passed'
        if (this.state.filter === 'failed') return student.status === 'Failed'
        return true
      })
      .sort((first, second) =>
        this.state.sortOrder === 'desc' ? second.grade - first.grade : first.grade - second.grade,
      )

    const passedCount = this.state.students.filter((student) => student.status === 'Passed').length

    return (
      <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
        <div className="space-y-6">
          <div className="rounded-[32px] border border-white/60 bg-white/75 p-6 backdrop-blur-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-teal-600">
              Class-based form
            </p>
            <h2 className="mt-4 text-2xl font-semibold text-slate-900">Add new student</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{this.state.logMessage}</p>
            <div className="mt-6">
              <StudentForm onAdd={this.addStudent} />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {[
              ['Total students', this.state.students.length],
              ['Passed students', passedCount],
              ['Failed students', this.state.students.length - passedCount],
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
            <div className="flex flex-wrap gap-3">
              {[
                ['all', 'All students'],
                ['passed', 'Only passed'],
                ['failed', 'Only failed'],
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => this.setState({ filter: value })}
                  className={`rounded-full px-4 py-2 text-sm font-medium ${
                    this.state.filter === value
                      ? 'bg-slate-950 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {label}
                </button>
              ))}

              <button
                type="button"
                onClick={() =>
                  this.setState({
                    sortOrder: this.state.sortOrder === 'desc' ? 'asc' : 'desc',
                  })
                }
                className="rounded-full bg-teal-100 px-4 py-2 text-sm font-medium text-teal-700"
              >
                Sort: {this.state.sortOrder === 'desc' ? 'High to low' : 'Low to high'}
              </button>
            </div>
          </div>

          <div className="grid gap-4">
            {visibleStudents.map((student) => (
              <StudentItem
                key={student.id}
                highlight={student.id === this.state.highlightId}
                onAdjustGrade={this.adjustGrade}
                onRemove={this.removeStudent}
                student={student}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }
}
