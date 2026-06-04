import { useState } from 'react'
import { TaskProvider, useTask } from '../context/index'
import BackButton from '../components/BackButton'

function TaskInput() {
  const [text, setText] = useState('')
  const { dispatch } = useTask()

  const handleAdd = () => {
    if (!text.trim()) return
    dispatch({ type: 'ADD_TASK', payload: text.trim() })
    setText('')
  }

  return (
    <div className="flex gap-2 mb-6">
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleAdd()}
        placeholder="Add a new task..."
        className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm focus:outline-none focus:border-orange-400 text-gray-900 dark:text-white placeholder-gray-400"
      />
      <button onClick={handleAdd} className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-semibold transition-colors">
        Add Task
      </button>
    </div>
  )
}

function TaskSummary() {
  const { state, dispatch } = useTask()
  const total = state.tasks.length
  const done = state.tasks.filter(t => t.completed).length

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex gap-4">
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Total: <strong className="text-gray-900 dark:text-white">{total}</strong></span>
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Done: <strong className="text-green-600 dark:text-green-400">{done}</strong></span>
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Pending: <strong className="text-orange-500">{total - done}</strong></span>
      </div>
      {total > 0 && (
        <button onClick={() => dispatch({ type: 'CLEAR_ALL' })} className="text-xs text-red-500 hover:text-red-600 font-medium">Clear All</button>
      )}
    </div>
  )
}

function TaskItem({ task }) {
  const [editing, setEditing] = useState(false)
  const [editText, setEditText] = useState(task.text)
  const { dispatch } = useTask()

  const saveEdit = () => {
    if (editText.trim()) {
      dispatch({ type: 'EDIT_TASK', payload: { id: task.id, text: editText.trim() } })
    }
    setEditing(false)
  }

  return (
    <div className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${task.completed ? 'bg-gray-50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-700/50 opacity-60' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'}`}>
      <button
        onClick={() => dispatch({ type: 'TOGGLE_TASK', payload: task.id })}
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${task.completed ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 dark:border-gray-500 hover:border-green-400'}`}
      >
        {task.completed && <span className="text-xs">✓</span>}
      </button>

      {editing ? (
        <input
          value={editText}
          onChange={e => setEditText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && saveEdit()}
          onBlur={saveEdit}
          className="flex-1 text-sm bg-transparent border-b border-orange-400 focus:outline-none text-gray-900 dark:text-white"
          autoFocus
        />
      ) : (
        <span className={`flex-1 text-sm ${task.completed ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-800 dark:text-gray-200'}`}>
          {task.text}
        </span>
      )}

      <div className="flex gap-1">
        <button
          onClick={() => setEditing(e => !e)}
          className="p-1.5 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
        >✏️</button>
        <button
          onClick={() => dispatch({ type: 'DELETE_TASK', payload: task.id })}
          className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >🗑</button>
      </div>
    </div>
  )
}

function TaskList() {
  const { state } = useTask()
  if (state.tasks.length === 0) {
    return <p className="text-center text-gray-400 py-10 text-sm">No tasks yet. Add one above!</p>
  }
  return (
    <div className="space-y-2">
      {state.tasks.map(task => <TaskItem key={task.id} task={task} />)}
    </div>
  )
}

function TaskManager() {
  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">My Tasks</h2>
        <p className="text-xs text-gray-400 mb-5">Powered by Context API + useReducer</p>
        <TaskInput />
        <TaskSummary />
        <TaskList />
      </div>
    </div>
  )
}

export default function TaskManagerPage() {
  return (
    <TaskProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <BackButton />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Task Manager</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">Module 5 — Context API & useReducer</p>
          <TaskManager />
        </div>
      </div>
    </TaskProvider>
  )
}
