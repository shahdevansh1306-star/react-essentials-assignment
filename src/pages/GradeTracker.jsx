import { Component } from 'react'
import BackButton from '../components/BackButton'

class StudentItem extends Component {
  render() {
    const { student, onToggle, onDelete, onGradeChange } = this.props
    const passed = student.grade >= 60
    return (
      <div className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${passed ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800'}`}>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm text-gray-900 dark:text-white">{student.name}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${passed ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'}`}>
              {passed ? 'Passed' : 'Failed'}
            </span>
          </div>
        </div>
        <input
          type="number"
          min="0"
          max="100"
          value={student.grade}
          onChange={e => onGradeChange(student.id, parseInt(e.target.value) || 0)}
          className="w-16 px-2 py-1 text-sm text-center border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-orange-400"
        />
        <span className="text-xs font-bold text-gray-500">/ 100</span>
        <button onClick={() => onDelete(student.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">🗑</button>
      </div>
    )
  }
}

class StudentList extends Component {
  render() {
    const { students, filter, onToggle, onDelete, onGradeChange } = this.props
    const filtered = filter === 'all' ? students : students.filter(s => filter === 'passed' ? s.grade >= 60 : s.grade < 60)
    const sorted = [...filtered].sort((a, b) => b.grade - a.grade)

    if (sorted.length === 0) return <p className="text-center text-gray-400 py-8 text-sm">No students found.</p>

    return (
      <div className="space-y-2">
        {sorted.map(s => <StudentItem key={s.id} student={s} onToggle={onToggle} onDelete={onDelete} onGradeChange={onGradeChange} />)}
      </div>
    )
  }
}

class GradeTracker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      students: [
        { id: 1, name: 'Alice Johnson', grade: 88 },
        { id: 2, name: 'Bob Smith', grade: 45 },
        { id: 3, name: 'Carol White', grade: 72 },
        { id: 4, name: 'David Lee', grade: 91 },
        { id: 5, name: 'Eva Martinez', grade: 58 },
      ],
      form: { name: '', grade: '' },
      errors: {},
      filter: 'all',
      log: [],
    }
  }

  componentDidMount() {
    this.setState(prev => ({ log: [...prev.log, '✅ Component mounted — loaded 5 sample students'] }))
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.students.length !== this.state.students.length) {
      this.setState(prev => ({ log: [...prev.log.slice(-4), `📝 Students updated: ${this.state.students.length} total`] }))
    }
  }

  componentWillUnmount() {
    console.log('GradeTracker unmounting — cleanup')
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState(prev => ({ form: { ...prev.form, [name]: value }, errors: { ...prev.errors, [name]: '' } }))
  }

  validate = () => {
    const { name, grade } = this.state.form
    const errors = {}
    if (!name.trim()) errors.name = 'Name is required'
    if (!grade) errors.grade = 'Grade is required'
    else if (isNaN(grade) || grade < 0 || grade > 100) errors.grade = 'Grade must be 0–100'
    return errors
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const errors = this.validate()
    if (Object.keys(errors).length) { this.setState({ errors }); return }
    this.setState(prev => ({
      students: [...prev.students, { id: Date.now(), name: prev.form.name.trim(), grade: parseInt(prev.form.grade) }],
      form: { name: '', grade: '' },
      errors: {},
    }))
  }

  handleDelete = (id) => this.setState(prev => ({ students: prev.students.filter(s => s.id !== id) }))
  handleGradeChange = (id, grade) => this.setState(prev => ({ students: prev.students.map(s => s.id === id ? { ...s, grade: Math.min(100, Math.max(0, grade)) } : s) }))

  render() {
    const { students, form, errors, filter, log } = this.state
    const passed = students.filter(s => s.grade >= 60).length
    const avg = students.length ? (students.reduce((s, x) => s + x.grade, 0) / students.length).toFixed(1) : 0

    return (
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {[['Total', students.length, 'text-gray-700 dark:text-gray-200'], ['Passed', passed, 'text-green-600 dark:text-green-400'], ['Average', avg, 'text-orange-500']].map(([label, val, cls]) => (
              <div key={label} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 text-center">
                <p className="text-xs text-gray-400 mb-1">{label}</p>
                <p className={`text-2xl font-bold ${cls}`}>{val}</p>
              </div>
            ))}
          </div>

          {/* Filter */}
          <div className="flex gap-2">
            {['all', 'passed', 'failed'].map(f => (
              <button key={f} onClick={() => this.setState({ filter: f })} className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors capitalize ${filter === f ? 'bg-orange-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>{f}</button>
            ))}
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5">
            <StudentList students={students} filter={filter} onDelete={this.handleDelete} onGradeChange={this.handleGradeChange} />
          </div>
        </div>

        <div className="space-y-5">
          {/* Add Form */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-sm">Add Student</h3>
            <form onSubmit={this.handleSubmit} className="space-y-3">
              <div>
                <input name="name" value={form.name} onChange={this.handleChange} placeholder="Student name" className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm focus:outline-none focus:border-orange-400 text-gray-900 dark:text-white placeholder-gray-400" />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <input name="grade" type="number" min="0" max="100" value={form.grade} onChange={this.handleChange} placeholder="Grade (0–100)" className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm focus:outline-none focus:border-orange-400 text-gray-900 dark:text-white placeholder-gray-400" />
                {errors.grade && <p className="text-red-500 text-xs mt-1">{errors.grade}</p>}
              </div>
              <button type="submit" className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-sm font-semibold transition-colors">Add Student</button>
            </form>
          </div>

          {/* Lifecycle Log */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5">
            <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-sm">Lifecycle Log</h3>
            <div className="space-y-1">
              {log.map((entry, i) => <p key={i} className="text-xs text-gray-500 dark:text-gray-400 font-mono">{entry}</p>)}
              {log.length === 0 && <p className="text-xs text-gray-400">No events yet...</p>}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default function GradeTrackerPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <BackButton />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Student Grade Tracker</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">Module 7 — Class-Based Components & Lifecycle Methods</p>
        <GradeTracker />
      </div>
    </div>
  )
}
