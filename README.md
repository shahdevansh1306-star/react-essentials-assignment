# React Essentials Assignment

A comprehensive React learning project covering all 9 modules from the TuteDude React course. All assignments are combined into a single unified app.

## 🚀 Live Demo

> Add your deployment link here after deploying

## 📦 Modules Included

| # | Module | Topic | Route |
|---|--------|--------|-------|
| 1 | Portfolio & Movie Explorer | JSX, Props, State, Events, Lists | `/portfolio` |
| 2 | Grocify Clone | TailwindCSS, Responsive UI | `/grocify` |
| 3 | Task Manager | Context API + useReducer | `/task-manager` |
| 4 | Weather Dashboard | useEffect, API Fetching | `/weather` |
| 5 | Student Grade Tracker | Class Components + Lifecycle | `/grade-tracker` |
| 6 | Expense Tracker | Custom Hooks + LocalStorage | `/expense-tracker` |
| 7 | Registration & Pizza Order | Forms + Validation | `/forms` |
| 8 | Redux Pizza & Signup | Redux Toolkit | `/redux-app` |
| 9 | Auth App + Routing | React Router + Protected Routes + Testing | `/auth-routing` |

## 🛠️ Tech Stack

- **React 18** — functional & class components, hooks
- **React Router v6** — client-side routing, dynamic routes, protected routes
- **Redux Toolkit** — global state management with slices
- **TailwindCSS** — utility-first styling
- **Vite** — fast build tool
- **Open-Meteo API** — free weather API (no key needed)

## 📁 Project Structure

```
src/
├── components/
│   └── BackButton.jsx
├── context/
│   └── index.jsx          # AuthContext + TaskContext
├── hooks/
│   └── index.js           # useLocalStorage, useForm, useExpenses, useWeather
├── pages/
│   ├── Home.jsx
│   ├── PortfolioMovies.jsx
│   ├── Grocify.jsx
│   ├── TaskManager.jsx
│   ├── WeatherDashboard.jsx
│   ├── GradeTracker.jsx
│   ├── ExpenseTracker.jsx
│   ├── Forms.jsx
│   ├── ReduxApp.jsx
│   └── AuthRouting.jsx
├── store/
│   └── index.js           # Redux store: userSlice, pizzaSlice, cartSlice, uiSlice
├── App.jsx
├── main.jsx
└── index.css
```

## ⚙️ Setup & Run Locally

```bash
# Clone the repo
git clone https://github.com/yourusername/react-essentials-assignment
cd react-essentials-assignment

# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## 🚀 Deploy to Netlify

1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com) → New site from Git
3. Connect your GitHub repo
4. Set build command: `npm run build`
5. Set publish directory: `dist`
6. Click **Deploy**

> ⚠️ For Netlify, add a `_redirects` file in the `public/` folder:
> ```
> /* /index.html 200
> ```

## 🚀 Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Follow the prompts. Vercel auto-detects Vite projects.

## Screenshots

> Add screenshots of each module here

## Author

Your Name — [GitHub](https://github.com/yourusername)
