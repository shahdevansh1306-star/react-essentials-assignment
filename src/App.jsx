import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { AppFrame } from './components/AppFrame'
import {
  AuthDashboardPage,
  AuthHomePage,
  AuthLayout,
  AuthLoginPage,
  AuthModuleAboutPage,
  AuthNotFoundPage,
  AuthOrderPage,
  AuthProfilePage,
  AuthSignupPage,
} from './modules/auth/AuthModulePages'
import { ProtectedRoute } from './modules/auth/ProtectedRoute'
import { ExpenseTrackerPage } from './pages/ExpenseTrackerPage'
import { FormsPage } from './pages/FormsPage'
import { GradeTrackerPage } from './pages/GradeTrackerPage'
import { GrocifyPage } from './pages/GrocifyPage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ReactEssentialsPage } from './pages/ReactEssentialsPage'
import { ReduxPizzaPage } from './pages/ReduxPizzaPage'
import { TaskManagerPage } from './pages/TaskManagerPage'
import { WeatherDashboardPage } from './pages/WeatherDashboardPage'

function App() {
  return (
    <BrowserRouter>
      <AppFrame>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/grocify" element={<GrocifyPage />} />

          <Route path="/auth" element={<AuthLayout />}>
            <Route index element={<AuthHomePage />} />
            <Route path="about" element={<AuthModuleAboutPage />} />
            <Route path="login" element={<AuthLoginPage />} />
            <Route path="signup" element={<AuthSignupPage />} />
            <Route
              path="dashboard"
              element={
                <ProtectedRoute>
                  <AuthDashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="profile/:userId"
              element={
                <ProtectedRoute>
                  <AuthProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="order/:orderId"
              element={
                <ProtectedRoute>
                  <AuthOrderPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<AuthNotFoundPage />} />
          </Route>

          <Route path="/redux-pizza" element={<ReduxPizzaPage />} />
          <Route path="/forms" element={<FormsPage />} />
          <Route path="/expense-tracker" element={<ExpenseTrackerPage />} />
          <Route path="/grade-tracker" element={<GradeTrackerPage />} />
          <Route path="/weather-dashboard" element={<WeatherDashboardPage />} />
          <Route path="/task-manager" element={<TaskManagerPage />} />
          <Route path="/react-essentials" element={<ReactEssentialsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AppFrame>
    </BrowserRouter>
  )
}

export default App
