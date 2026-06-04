import { useNavigate } from 'react-router-dom'

const modules = [
  { id: 1, path: '/portfolio', title: 'Portfolio & Movie Explorer', tag: 'Module 2', desc: 'JSX, props, state, event handling, conditional rendering', color: 'from-violet-500 to-purple-600', icon: '🎬' },
  { id: 2, path: '/grocify', title: 'Grocify Clone', tag: 'Bonus', desc: 'React + TailwindCSS UI recreation with responsive layout', color: 'from-green-500 to-emerald-600', icon: '🥦' },
  { id: 3, path: '/task-manager', title: 'Task Manager', tag: 'Module 5', desc: 'Context API + useReducer for global state management', color: 'from-pink-500 to-rose-600', icon: '✅' },
  { id: 4, path: '/weather', title: 'Weather Dashboard', tag: 'Module 6', desc: 'useEffect, API fetching & side-effect management', color: 'from-sky-500 to-blue-600', icon: '🌤' },
  { id: 5, path: '/grade-tracker', title: 'Student Grade Tracker', tag: 'Module 7', desc: 'Class-based components & React lifecycle methods', color: 'from-amber-500 to-orange-600', icon: '📊' },
  { id: 6, path: '/expense-tracker', title: 'Expense Tracker', tag: 'Module 10', desc: 'Custom hooks & LocalStorage integration', color: 'from-teal-500 to-cyan-600', icon: '💰' },
  { id: 7, path: '/forms', title: 'Registration & Pizza Order', tag: 'Module 11', desc: 'Forms, validation, controlled components', color: 'from-red-500 to-orange-500', icon: '🍕' },
  { id: 8, path: '/redux-app', title: 'Redux Pizza & Signup', tag: 'Module 12', desc: 'Redux Toolkit: slices, reducers, actions, cart', color: 'from-indigo-500 to-blue-600', icon: '🛒' },
  { id: 9, path: '/auth-routing', title: 'Auth App + Routing', tag: 'Module 13', desc: 'React Router, protected routes, authentication, testing', color: 'from-slate-600 to-gray-800', icon: '🔐' },
]

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14 animate-fade-up">
          <span className="inline-block bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
            TuteDude React Course
          </span>
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            React Essentials
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            All 9 assignments in one unified app. Click any module to explore it.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {modules.map((mod, i) => (
            <button
              key={mod.id}
              onClick={() => navigate(mod.path)}
              className="text-left group module-card"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${mod.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                {mod.icon}
              </div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-orange-500 dark:text-orange-400">{mod.tag}</span>
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white text-base mb-1 leading-tight">{mod.title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{mod.desc}</p>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-orange-500 dark:text-orange-400 group-hover:gap-2 transition-all">
                Open <span>→</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
