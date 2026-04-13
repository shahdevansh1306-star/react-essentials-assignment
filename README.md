# React Essentials Assignment Showcase

A premium multi-module React repository that covers all the assignment briefs from the provided PDFs in one polished, submission-friendly project.

## What This Repo Includes

- `Grocify Grocery Homepage`
- `Authentication, Protected Navigation & Component Testing`
- `Redux Toolkit Signup & Pizza Ordering`
- `User Registration & Mario’s Pizza Form Handling`
- `Expense Tracker with Custom Hooks & LocalStorage`
- `Student Grade Tracker with Class Components & Lifecycle`
- `Weather Dashboard with useEffect and API Fetching`
- `Task Manager with Context API & useReducer`
- `Portfolio Card & Movie Explorer Mini Projects`

## Tech Stack

- React 19
- Vite
- Tailwind CSS 4
- React Router DOM
- Framer Motion
- Redux Toolkit
- React Redux
- Vitest
- React Testing Library
- Lucide React

## Routes

- `/` : Showcase landing page
- `/grocify` : Grocery website homepage
- `/auth` : Routing, authentication, protected pages, and tests module
- `/redux-pizza` : Redux Toolkit signup and pizza ordering module
- `/forms` : Registration form and Mario’s Pizza ordering form
- `/expense-tracker` : Custom hooks and localStorage expense tracker
- `/grade-tracker` : Class-based student grade tracker
- `/weather-dashboard` : Weather dashboard using API fetching and side-effect management
- `/task-manager` : Context API and `useReducer` task manager
- `/react-essentials` : Portfolio card and movie explorer mini projects

## Project Structure

```text
src/
├── assets/
├── components/
├── data/
├── lib/
├── modules/
│   ├── auth/
│   ├── expense/
│   ├── grade/
│   ├── redux/
│   └── tasks/
├── pages/
└── test/
```

## Run Locally

If Node.js is installed globally:

```bash
npm install
npm run dev
```

If you want to use the portable Node toolchain included in this workspace:

```powershell
$nodeDir = "C:\Odoo 18\server\custom_addons\inward_document_mgmt_odoo18_FIXED\deliverables\tools\node-v24.14.1-win-x64"
$env:Path = "$nodeDir;$env:Path"
npm install
npm run dev
```

## Validation

```bash
npm run build
npm run test
npm run lint
```

Status at handoff:

- `build` passes
- `test` passes
- `lint` passes

## Submission Notes

- Repository name target: `react-essentials-assignment`
- Each module is built as a dedicated route so screenshots and demo recordings are easy to capture.
- Use the companion checklist in [SUBMISSION_CHECKLIST.md](/C:/Odoo%2018/server/custom_addons/inward_document_mgmt_odoo18_FIXED/deliverables/react-essentials-assignment/SUBMISSION_CHECKLIST.md) to map routes to assignment deliverables.
