import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const USERS_KEY = 'react-showcase-auth-users'
const SESSION_KEY = 'react-showcase-auth-session'

const seedUsers = [
  {
    id: 'user-101',
    name: 'Aarav Patel',
    email: 'aarav@grocify.dev',
    password: 'Aarav@1234',
    role: 'Operations Lead',
    location: 'Ahmedabad',
    phone: '+91 98765 12345',
  },
]

export const AuthContext = createContext(null)

function readStorage(key, fallback) {
  if (typeof window === 'undefined') {
    return fallback
  }

  try {
    const value = window.localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => readStorage(USERS_KEY, seedUsers))
  const [currentUser, setCurrentUser] = useState(() => readStorage(SESSION_KEY, null))

  useEffect(() => {
    window.localStorage.setItem(USERS_KEY, JSON.stringify(users))
  }, [users])

  useEffect(() => {
    if (currentUser) {
      window.localStorage.setItem(SESSION_KEY, JSON.stringify(currentUser))
      return
    }

    window.localStorage.removeItem(SESSION_KEY)
  }, [currentUser])

  const value = useMemo(
    () => ({
      users,
      currentUser,
      isAuthenticated: Boolean(currentUser),
      login: async ({ email, password }) => {
        const matchedUser = users.find(
          (user) => user.email.toLowerCase() === email.toLowerCase() && user.password === password,
        )

        if (!matchedUser) {
          throw new Error('Invalid email or password.')
        }

        setCurrentUser(matchedUser)
        return matchedUser
      },
      signup: async ({ fullName, email, phone, password }) => {
        const alreadyExists = users.some(
          (user) => user.email.toLowerCase() === email.toLowerCase(),
        )

        if (alreadyExists) {
          throw new Error('An account with this email already exists.')
        }

        const newUser = {
          id: `user-${Date.now()}`,
          name: fullName,
          email,
          password,
          phone,
          role: 'Customer',
          location: 'India',
        }

        setUsers((previous) => [...previous, newUser])
        setCurrentUser(newUser)
        return newUser
      },
      logout: () => setCurrentUser(null),
    }),
    [currentUser, users],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
