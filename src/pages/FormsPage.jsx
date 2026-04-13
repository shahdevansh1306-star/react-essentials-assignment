import { useMemo, useState } from 'react'

const pizzaOptions = {
  sizes: [
    { id: 'small', label: 'Small', price: 169 },
    { id: 'medium', label: 'Medium', price: 249 },
    { id: 'large', label: 'Large', price: 349 },
  ],
  crusts: [
    { id: 'classic', label: 'Classic', price: 0 },
    { id: 'thin', label: 'Thin', price: 20 },
    { id: 'stuffed', label: 'Stuffed', price: 60 },
  ],
  toppings: [
    { id: 'olives', label: 'Olives', price: 25 },
    { id: 'corn', label: 'Sweet corn', price: 30 },
    { id: 'paneer', label: 'Paneer', price: 55 },
    { id: 'pepperoni', label: 'Pepperoni', price: 75 },
  ],
  sides: [
    { id: 'dip', label: 'Cheesy dip', price: 35 },
    { id: 'garlic', label: 'Garlic bread', price: 95 },
    { id: 'cola', label: 'Cola', price: 55 },
  ],
}

function getRegistrationErrors(form) {
  const errors = {}

  if (!form.name.trim()) errors.name = 'Name is required.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Enter a valid email.'
  if (!/^\d{10,13}$/.test(form.phone.replace(/\s+/g, ''))) errors.phone = 'Phone must be 10 to 13 digits.'
  if (form.password.length < 8) errors.password = 'Password must be at least 8 characters.'
  if (form.confirmPassword !== form.password) errors.confirmPassword = 'Passwords do not match.'
  if (!form.gender) errors.gender = 'Select a gender.'
  if (!form.acceptedTerms) errors.acceptedTerms = 'Accept the terms to continue.'

  return errors
}

function getPizzaTotal(order) {
  const size = pizzaOptions.sizes.find((entry) => entry.id === order.size)
  const crust = pizzaOptions.crusts.find((entry) => entry.id === order.crust)
  const toppings = pizzaOptions.toppings.filter((entry) => order.toppings.includes(entry.id))
  const sides = pizzaOptions.sides.filter((entry) => order.sides.includes(entry.id))

  const onePizzaPrice =
    (size?.price || 0) +
    (crust?.price || 0) +
    toppings.reduce((sum, item) => sum + item.price, 0) +
    sides.reduce((sum, item) => sum + item.price, 0)

  return onePizzaPrice * order.quantity
}

export function FormsPage() {
  const [registration, setRegistration] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    gender: '',
    acceptedTerms: false,
  })
  const [registrationErrors, setRegistrationErrors] = useState({})
  const [registrationSuccess, setRegistrationSuccess] = useState('')

  const [pizzaOrder, setPizzaOrder] = useState({
    size: 'medium',
    crust: 'classic',
    toppings: ['corn'],
    sides: ['cola'],
    quantity: 1,
    instructions: '',
  })
  const [pizzaSuccess, setPizzaSuccess] = useState('')

  const registrationValid = useMemo(
    () =>
      Object.keys(getRegistrationErrors(registration)).length === 0 &&
      registration.name &&
      registration.email &&
      registration.phone &&
      registration.password &&
      registration.confirmPassword &&
      registration.gender &&
      registration.acceptedTerms,
    [registration],
  )

  const pizzaTotal = useMemo(() => getPizzaTotal(pizzaOrder), [pizzaOrder])

  function submitRegistration(event) {
    event.preventDefault()
    const errors = getRegistrationErrors(registration)
    setRegistrationErrors(errors)

    if (Object.keys(errors).length > 0) {
      return
    }

    setRegistrationSuccess('Registration submitted successfully.')
  }

  function togglePizzaOption(field, value) {
    setPizzaOrder((previous) => {
      const selected = previous[field]
      return {
        ...previous,
        [field]: selected.includes(value)
          ? selected.filter((item) => item !== value)
          : [...selected, value],
      }
    })
  }

  function submitPizzaOrder(event) {
    event.preventDefault()
    setPizzaSuccess(`Order submitted successfully. Payable total: ₹${pizzaTotal}`)
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[40px] border border-white/60 bg-[linear-gradient(135deg,#fff7ed,#fde7d5,#f97316)] px-6 py-10 text-slate-950 sm:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-slate-900/65">
          Controlled Forms Assignment
        </p>
        <h1 className="display-serif mt-4 max-w-4xl text-5xl leading-tight">
          Registration validation and pizza ordering with clear, real-time feedback.
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-900/80">
          This route focuses on pure form handling: controlled components, validation, dynamic
          pricing, live previews, reset flows, and submission confirmation behavior.
        </p>
      </section>

      <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="rounded-[32px] border border-white/60 bg-white/75 p-6 backdrop-blur-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-500">
            User Registration Form
          </p>
          <form className="mt-6 grid gap-4" onSubmit={submitRegistration}>
            {[
              ['name', 'Name', 'text'],
              ['email', 'Email', 'email'],
              ['phone', 'Phone Number', 'tel'],
              ['password', 'Password', 'password'],
              ['confirmPassword', 'Confirm Password', 'password'],
            ].map(([field, label, type]) => (
              <div key={field}>
                <label className="mb-2 block text-sm font-medium text-slate-700">{label}</label>
                <input
                  type={type}
                  value={registration[field]}
                  onChange={(event) =>
                    setRegistration((previous) => ({
                      ...previous,
                      [field]: event.target.value,
                    }))
                  }
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                />
                {registrationErrors[field] ? (
                  <p className="mt-2 text-sm text-rose-600">{registrationErrors[field]}</p>
                ) : null}
              </div>
            ))}

            <div>
              <p className="mb-2 block text-sm font-medium text-slate-700">Gender</p>
              <div className="flex gap-3">
                {['Male', 'Female', 'Other'].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() =>
                      setRegistration((previous) => ({
                        ...previous,
                        gender: option,
                      }))
                    }
                    className={`rounded-full px-4 py-2 text-sm font-medium ${
                      registration.gender === option
                        ? 'bg-slate-950 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {registrationErrors.gender ? (
                <p className="mt-2 text-sm text-rose-600">{registrationErrors.gender}</p>
              ) : null}
            </div>

            <label className="flex items-start gap-3 rounded-2xl bg-slate-950/[0.04] p-4 text-sm leading-6 text-slate-600">
              <input
                type="checkbox"
                checked={registration.acceptedTerms}
                onChange={(event) =>
                  setRegistration((previous) => ({
                    ...previous,
                    acceptedTerms: event.target.checked,
                  }))
                }
                className="mt-1"
              />
              I accept the terms and conditions for this registration.
            </label>
            {registrationErrors.acceptedTerms ? (
              <p className="text-sm text-rose-600">{registrationErrors.acceptedTerms}</p>
            ) : null}

            <div className="flex flex-wrap gap-3">
              <button
                disabled={!registrationValid}
                type="submit"
                className="rounded-full bg-slate-950 px-5 py-3 font-semibold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Submit Registration
              </button>
              <button
                type="button"
                onClick={() => {
                  setRegistration({
                    name: '',
                    email: '',
                    phone: '',
                    password: '',
                    confirmPassword: '',
                    gender: '',
                    acceptedTerms: false,
                  })
                  setRegistrationErrors({})
                  setRegistrationSuccess('')
                }}
                className="rounded-full border border-slate-200 px-5 py-3 font-semibold text-slate-700"
              >
                Reset
              </button>
            </div>
          </form>

          {registrationSuccess ? (
            <p className="mt-4 text-sm font-medium text-emerald-600">{registrationSuccess}</p>
          ) : null}
        </div>

        <div className="rounded-[32px] border border-white/60 bg-white/75 p-6 backdrop-blur-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-500">
            Mario’s Pizza Ordering Form
          </p>

          <form className="mt-6 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]" onSubmit={submitPizzaOrder}>
            <div className="space-y-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Size</p>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  {pizzaOptions.sizes.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() =>
                        setPizzaOrder((previous) => ({
                          ...previous,
                          size: option.id,
                        }))
                      }
                      className={`rounded-[22px] border p-4 text-left ${
                        pizzaOrder.size === option.id
                          ? 'border-orange-300 bg-orange-50'
                          : 'border-slate-200'
                      }`}
                    >
                      <p className="font-semibold text-slate-900">{option.label}</p>
                      <p className="mt-1 text-sm text-slate-500">₹{option.price}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Crust</p>
                <div className="mt-3 grid gap-3">
                  {pizzaOptions.crusts.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() =>
                        setPizzaOrder((previous) => ({
                          ...previous,
                          crust: option.id,
                        }))
                      }
                      className={`rounded-2xl border px-4 py-3 text-left ${
                        pizzaOrder.crust === option.id
                          ? 'border-slate-950 bg-slate-950 text-white'
                          : 'border-slate-200 text-slate-700'
                      }`}
                    >
                      {option.label} {option.price ? `+ ₹${option.price}` : ''}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Toppings</p>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {pizzaOptions.toppings.map((option) => {
                    const selected = pizzaOrder.toppings.includes(option.id)
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => togglePizzaOption('toppings', option.id)}
                        className={`rounded-2xl border p-4 text-left ${
                          selected ? 'border-orange-300 bg-orange-50' : 'border-slate-200'
                        }`}
                      >
                        <p className="font-semibold text-slate-900">{option.label}</p>
                        <p className="mt-1 text-sm text-slate-500">₹{option.price}</p>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Sides</p>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  {pizzaOptions.sides.map((option) => {
                    const selected = pizzaOrder.sides.includes(option.id)
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => togglePizzaOption('sides', option.id)}
                        className={`rounded-2xl border px-4 py-3 text-left ${
                          selected ? 'border-slate-950 bg-slate-950 text-white' : 'border-slate-200'
                        }`}
                      >
                        {option.label}
                        <p className="mt-1 text-xs uppercase tracking-[0.2em]">₹{option.price}</p>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="rounded-[28px] bg-slate-950 p-5 text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-300">
                Order preview
              </p>
              <h2 className="mt-4 text-3xl font-semibold">Mario’s live order receipt</h2>

              <div className="mt-5 space-y-4 text-sm text-slate-300">
                <div className="flex items-center justify-between">
                  <span>Quantity</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setPizzaOrder((previous) => ({
                          ...previous,
                          quantity: Math.max(1, previous.quantity - 1),
                        }))
                      }
                      className="rounded-full bg-white/10 px-3 py-1"
                    >
                      -
                    </button>
                    <span>{pizzaOrder.quantity}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setPizzaOrder((previous) => ({
                          ...previous,
                          quantity: previous.quantity + 1,
                        }))
                      }
                      className="rounded-full bg-white/10 px-3 py-1"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div>
                  <span className="block">Selected toppings</span>
                  <p className="mt-2 text-white">
                    {pizzaOrder.toppings
                      .map((id) => pizzaOptions.toppings.find((item) => item.id === id)?.label)
                      .join(', ') || 'No toppings'}
                  </p>
                </div>

                <div>
                  <span className="block">Selected sides</span>
                  <p className="mt-2 text-white">
                    {pizzaOrder.sides
                      .map((id) => pizzaOptions.sides.find((item) => item.id === id)?.label)
                      .join(', ') || 'No sides'}
                  </p>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300" htmlFor="instructions">
                    Special instructions
                  </label>
                  <textarea
                    id="instructions"
                    value={pizzaOrder.instructions}
                    onChange={(event) =>
                      setPizzaOrder((previous) => ({
                        ...previous,
                        instructions: event.target.value,
                      }))
                    }
                    rows="4"
                    className="w-full rounded-2xl border border-white/10 bg-white/8 px-4 py-3 outline-none"
                    placeholder="Less spicy, extra crisp, no onions..."
                  />
                </div>

                <div className="border-t border-white/10 pt-4">
                  <p className="text-sm text-slate-300">Live total</p>
                  <p className="mt-2 text-4xl font-semibold text-orange-300">₹{pizzaTotal}</p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="submit"
                  className="rounded-full bg-orange-500 px-5 py-3 font-semibold text-white transition hover:-translate-y-0.5"
                >
                  Submit Order
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setPizzaOrder({
                      size: 'medium',
                      crust: 'classic',
                      toppings: ['corn'],
                      sides: ['cola'],
                      quantity: 1,
                      instructions: '',
                    })
                  }
                  className="rounded-full border border-white/12 px-5 py-3 font-semibold text-white"
                >
                  Clear Order
                </button>
              </div>
            </div>
          </form>

          {pizzaSuccess ? <p className="mt-4 text-sm font-medium text-emerald-600">{pizzaSuccess}</p> : null}
        </div>
      </div>
    </div>
  )
}
