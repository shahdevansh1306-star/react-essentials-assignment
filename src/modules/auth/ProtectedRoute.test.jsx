import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

import { AuthContext } from './AuthContext'
import { ProtectedRoute } from './ProtectedRoute'

function renderRoute(isAuthenticated) {
  return render(
    <AuthContext.Provider value={{ isAuthenticated }}>
      <MemoryRouter initialEntries={['/dashboard']}>
        <Routes>
          <Route path="/auth/login" element={<div>Login page</div>} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <div>Secret dashboard</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>,
  )
}

describe('ProtectedRoute', () => {
  it('redirects unauthenticated users to login', () => {
    renderRoute(false)
    expect(screen.getByText(/login page/i)).toBeInTheDocument()
  })

  it('renders protected content for authenticated users', () => {
    renderRoute(true)
    expect(screen.getByText(/secret dashboard/i)).toBeInTheDocument()
  })
})
