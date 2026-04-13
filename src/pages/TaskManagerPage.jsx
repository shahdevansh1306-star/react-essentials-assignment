import { useState } from 'react'
import { CheckCheck, Pencil, Plus, Trash2 } from 'lucide-react'

import { TaskProvider, useTasks } from '../modules/tasks/TaskContext'

function TaskWorkspace() {
  const { tasks, dispatch } = useTasks()
  const [input, setInput] = useState('')
  const [editingId, setEditingId] = useState('')
  const [editingValue, setEditingValue] = useState('')

  const completedCount = tasks.filter((task) => task.completed).length

  function addTask(event) {
    event.preventDefault()
    if (!input.trim()) {
      return
    }

    dispatch({ type: 'ADD_TASK', payload: input.trim() })
    setInput('')
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[40px] border border-white/60 bg-[linear-gradient(135deg,#111827,#1d4ed8,#60a5fa)] px-6 py-10 text-white sm:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-sky-200">
          Context API + useReducer
        </p>
        <h1 className="display-serif mt-4 max-w-4xl text-5xl leading-tight">
          Global task state with reducer-driven actions and responsive interaction patterns.
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-sky-50/90">
          Tasks are created, edited, toggled, and deleted through a global reducer so the app
          stays scalable without prop drilling.
        </p>
      </section>

      <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
        <div className="space-y-6">
          <div className="rounded-[32px] border border-white/60 bg-white/75 p-6 backdrop-blur-xl">
            <form className="grid gap-4" onSubmit={addTask}>
              <label className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-600">
                Add task
              </label>
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Enter a task title..."
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 font-semibold text-white transition hover:-translate-y-0.5"
              >
                <Plus className="h-4 w-4" />
                Add task
              </button>
            </form>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {[
              ['Total tasks', tasks.length],
              ['Completed', completedCount],
              ['Pending', tasks.length - completedCount],
            ].map(([label, value]) => (
              <div key={label} className="rounded-[28px] border border-white/60 bg-white/75 p-5 backdrop-blur-xl">
                <p className="text-sm font-medium text-slate-500">{label}</p>
                <p className="mt-3 text-3xl font-semibold text-slate-950">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[32px] border border-white/60 bg-white/75 p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-600">
                  Task list
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                  Actions are dispatched through the reducer
                </h2>
              </div>
              <button
                type="button"
                onClick={() => dispatch({ type: 'CLEAR_TASKS' })}
                className="rounded-full bg-rose-50 px-4 py-2 text-sm font-medium text-rose-600"
              >
                Clear all
              </button>
            </div>

            <div className="mt-6 grid gap-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`grid gap-4 rounded-[28px] border p-5 shadow-sm md:grid-cols-[1fr_auto] ${
                    task.completed
                      ? 'border-slate-200 bg-slate-100 text-slate-500'
                      : 'border-slate-200 bg-white text-slate-800'
                  }`}
                >
                  <div>
                    {editingId === task.id ? (
                      <div className="flex flex-wrap items-center gap-3">
                        <input
                          value={editingValue}
                          onChange={(event) => setEditingValue(event.target.value)}
                          className="min-w-[220px] flex-1 rounded-2xl border border-slate-200 px-4 py-3 outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            dispatch({
                              type: 'EDIT_TASK',
                              payload: { id: task.id, title: editingValue },
                            })
                            setEditingId('')
                            setEditingValue('')
                          }}
                          className="rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <>
                        <p className={`text-lg font-semibold ${task.completed ? 'line-through' : ''}`}>
                          {task.title}
                        </p>
                        <p className="mt-2 text-sm">
                          {task.completed ? 'Completed and greyed out for quick scanning.' : 'Active task awaiting action.'}
                        </p>
                      </>
                    )}
                  </div>

                  <div className="flex flex-wrap items-start gap-2 md:justify-end">
                    <button
                      type="button"
                      onClick={() => dispatch({ type: 'TOGGLE_TASK', payload: task.id })}
                      className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700"
                    >
                      <CheckCheck className="mr-1 inline h-4 w-4" />
                      {task.completed ? 'Reopen' : 'Complete'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingId(task.id)
                        setEditingValue(task.title)
                      }}
                      className="rounded-full bg-sky-50 px-4 py-2 text-sm font-medium text-sky-700"
                    >
                      <Pencil className="mr-1 inline h-4 w-4" />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => dispatch({ type: 'DELETE_TASK', payload: task.id })}
                      className="rounded-full bg-rose-50 px-4 py-2 text-sm font-medium text-rose-600"
                    >
                      <Trash2 className="mr-1 inline h-4 w-4" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function TaskManagerPage() {
  return (
    <TaskProvider>
      <TaskWorkspace />
    </TaskProvider>
  )
}
