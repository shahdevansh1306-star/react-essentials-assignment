import { createContext, useContext, useEffect, useMemo, useReducer } from 'react'

const STORAGE_KEY = 'react-showcase-task-manager'

const TaskContext = createContext(null)

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TASK':
      return [
        {
          id: `task-${Date.now()}`,
          title: action.payload,
          completed: false,
        },
        ...state,
      ]
    case 'TOGGLE_TASK':
      return state.map((task) =>
        task.id === action.payload ? { ...task, completed: !task.completed } : task,
      )
    case 'EDIT_TASK':
      return state.map((task) =>
        task.id === action.payload.id ? { ...task, title: action.payload.title } : task,
      )
    case 'DELETE_TASK':
      return state.filter((task) => task.id !== action.payload)
    case 'CLEAR_TASKS':
      return []
    default:
      return state
  }
}

function readTasks() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw
      ? JSON.parse(raw)
      : [
          { id: 'task-1', title: 'Submit Grocify screenshots', completed: true },
          { id: 'task-2', title: 'Record demo walkthrough', completed: false },
          { id: 'task-3', title: 'Push repo to GitHub', completed: false },
        ]
  } catch {
    return []
  }
}

export function TaskProvider({ children }) {
  const [tasks, dispatch] = useReducer(reducer, [], readTasks)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  const value = useMemo(() => ({ tasks, dispatch }), [tasks])
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}

export function useTasks() {
  const context = useContext(TaskContext)

  if (!context) {
    throw new Error('useTasks must be used inside TaskProvider')
  }

  return context
}
