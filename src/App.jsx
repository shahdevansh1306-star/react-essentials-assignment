import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { useSelector } from 'react-redux'
import store from './store/index'
import './index.css'

import Home from './pages/Home'
import PortfolioMovies from './pages/PortfolioMovies'
import Grocify from './pages/Grocify'
import TaskManager from './pages/TaskManager'
import WeatherDashboard from './pages/WeatherDashboard'
import GradeTracker from './pages/GradeTracker'
import ExpenseTracker from './pages/ExpenseTracker'
import Forms from './pages/Forms'
import ReduxApp from './pages/ReduxApp'
import AuthRouting from './pages/AuthRouting'

function AppInner() {
  const darkMode = useSelector(s => s.ui.darkMode)

  return (
    <div className={darkMode ? 'dark' : ''}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<PortfolioMovies />} />
          <Route path="/grocify" element={<Grocify />} />
          <Route path="/task-manager" element={<TaskManager />} />
          <Route path="/weather" element={<WeatherDashboard />} />
          <Route path="/grade-tracker" element={<GradeTracker />} />
          <Route path="/expense-tracker" element={<ExpenseTracker />} />
          <Route path="/forms" element={<Forms />} />
          <Route path="/redux-app" element={<ReduxApp />} />
          <Route path="/*" element={<AuthRouting />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default function App() {
  return (
    <Provider store={store}>
      <AppInner />
    </Provider>
  )
}
