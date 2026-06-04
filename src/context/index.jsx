import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('auth_user')) } catch { return null }
  })

  const login = (email, password) => {
    const u = { email, name: email.split('@')[0] }
    setUser(u)
    localStorage.setItem('auth_user', JSON.stringify(u))
    return true
  }

  const signup = (email, password, name) => {
    const u = { email, name }
    setUser(u)
    localStorage.setItem('auth_user', JSON.stringify(u))
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('auth_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

// Task Context
import { createContext as cc, useContext as uc, useReducer as ur } from 'react'

const TaskContext = cc(null)

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK': return { ...state, tasks: [...state.tasks, { id: Date.now(), text: action.payload, completed: false }] }
    case 'TOGGLE_TASK': return { ...state, tasks: state.tasks.map(t => t.id === action.payload ? { ...t, completed: !t.completed } : t) }
    case 'EDIT_TASK': return { ...state, tasks: state.tasks.map(t => t.id === action.payload.id ? { ...t, text: action.payload.text } : t) }
    case 'DELETE_TASK': return { ...state, tasks: state.tasks.filter(t => t.id !== action.payload) }
    case 'CLEAR_ALL': return { ...state, tasks: [] }
    default: return state
  }
}

export function TaskProvider({ children }) {
  const [state, dispatch] = ur(taskReducer, { tasks: [] })
  return <TaskContext.Provider value={{ state, dispatch }}>{children}</TaskContext.Provider>
}

export const useTask = () => uc(TaskContext)
