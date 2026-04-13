import { useEffect } from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { Pizza, ShoppingBag, UserRound } from 'lucide-react'

import { store } from '../modules/redux/store'
import { cartActions } from '../modules/redux/slices/cartSlice'
import { pizzaActions, selectCurrentPizzaPreview } from '../modules/redux/slices/pizzaSlice'
import { uiActions } from '../modules/redux/slices/uiSlice'
import { userActions } from '../modules/redux/slices/userSlice'

function validateSignup(form) {
  const errors = {}

  if (!form.fullName.trim()) {
    errors.fullName = 'Full name is required.'
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Valid email is required.'
  }

  if (!/^\d{10,13}$/.test(form.phone.replace(/\s+/g, ''))) {
    errors.phone = 'Phone should contain 10 to 13 digits.'
  }

  if (form.password.length < 8) {
    errors.password = 'Password should be at least 8 characters.'
  }

  if (form.confirmPassword !== form.password) {
    errors.confirmPassword = 'Passwords must match.'
  }

  if (!form.acceptedTerms) {
    errors.acceptedTerms = 'Please accept the terms to continue.'
  }

  return errors
}

function currency(value) {
  return `₹${value}`
}

function ReduxPizzaWorkspace() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const pizza = useSelector((state) => state.pizza)
  const cart = useSelector((state) => state.cart)
  const toast = useSelector((state) => state.ui.toast)
  const preview = useSelector(selectCurrentPizzaPreview)

  useEffect(() => {
    if (!toast) {
      return undefined
    }

    const timeoutId = window.setTimeout(() => dispatch(uiActions.clearToast()), 2600)
    return () => window.clearTimeout(timeoutId)
  }, [dispatch, toast])

  function handleSignupSubmit(event) {
    event.preventDefault()
    const errors = validateSignup(user.form)
    dispatch(userActions.setErrors(errors))

    if (Object.keys(errors).length > 0) {
      dispatch(userActions.setStatus('error'))
      return
    }

    dispatch(userActions.setCurrentUser({ ...user.form, id: `redux-user-${Date.now()}` }))
    dispatch(userActions.setSuccessMessage('Redux signup flow completed successfully.'))
    dispatch(userActions.setStatus('success'))
    dispatch(uiActions.setToast({ type: 'success', text: 'Account created and ready for checkout.' }))
  }

  function addPreviewToCart() {
    const lineItem = {
      id: `pizza-${Date.now()}`,
      title: `${preview.size.label} / ${preview.crust.label}`,
      toppings: preview.toppingList,
      sides: preview.sideList,
      quantity: pizza.current.quantity,
      total: preview.total,
    }

    dispatch(cartActions.addItem(lineItem))
    dispatch(pizzaActions.resetConfiguration())
    dispatch(uiActions.setToast({ type: 'success', text: 'Pizza added to cart.' }))
  }

  function checkout() {
    if (!user.currentUser) {
      dispatch(uiActions.setToast({ type: 'error', text: 'Create an account before checkout.' }))
      return
    }

    dispatch(cartActions.clearCart())
    dispatch(uiActions.setToast({ type: 'success', text: 'Order placed successfully.' }))
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[40px] border border-white/60 bg-[linear-gradient(135deg,#111827,#1f2937,#f97316)] px-6 py-10 text-white sm:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-orange-200">
              Redux Toolkit Assignment
            </p>
            <h1 className="display-serif mt-4 text-5xl leading-tight">
              Signup, customization, live pricing, and checkout in one centralized state graph.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-200">
              The full user flow is driven through slices for user, pizza, cart, and UI feedback.
              It demonstrates scalable Redux architecture instead of scattered local state.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ['4', 'Redux slices'],
              ['Live', 'Price updates'],
              ['Persisted', 'State in localStorage'],
            ].map(([value, label]) => (
              <div key={label} className="rounded-[28px] border border-white/12 bg-white/8 p-4">
                <p className="text-3xl font-semibold">{value}</p>
                <p className="mt-2 text-sm text-slate-300">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {toast ? (
        <div
          className={`rounded-[24px] px-5 py-4 text-sm font-medium ${
            toast.type === 'error'
              ? 'bg-rose-50 text-rose-700'
              : 'bg-emerald-50 text-emerald-700'
          }`}
        >
          {toast.text}
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-6">
          <div className="rounded-[32px] border border-white/60 bg-white/75 p-6 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <UserRound className="h-5 w-5 text-orange-500" />
              <h2 className="text-2xl font-semibold text-slate-900">Redux Signup Flow</h2>
            </div>

            <form className="mt-6 grid gap-4" onSubmit={handleSignupSubmit}>
              {[
                ['fullName', 'Full Name', 'text'],
                ['email', 'Email', 'email'],
                ['phone', 'Phone', 'tel'],
                ['password', 'Password', 'password'],
                ['confirmPassword', 'Confirm Password', 'password'],
              ].map(([field, label, type]) => (
                <div key={field}>
                  <label className="mb-2 block text-sm font-medium text-slate-700">{label}</label>
                  <input
                    type={type}
                    value={user.form[field]}
                    onChange={(event) =>
                      dispatch(
                        userActions.updateField({
                          field,
                          value: event.target.value,
                        }),
                      )
                    }
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                  />
                  {user.errors[field] ? (
                    <p className="mt-2 text-sm text-rose-600">{user.errors[field]}</p>
                  ) : null}
                </div>
              ))}

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Gender</label>
                <div className="flex gap-3">
                  {['Male', 'Female', 'Other'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() =>
                        dispatch(userActions.updateField({ field: 'gender', value: option }))
                      }
                      className={`rounded-full px-4 py-2 text-sm font-medium ${
                        user.form.gender === option
                          ? 'bg-slate-950 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <label className="flex items-start gap-3 rounded-2xl bg-slate-950/[0.04] p-4 text-sm leading-6 text-slate-600">
                <input
                  type="checkbox"
                  checked={user.form.acceptedTerms}
                  onChange={(event) =>
                    dispatch(
                      userActions.updateField({
                        field: 'acceptedTerms',
                        value: event.target.checked,
                      }),
                    )
                  }
                  className="mt-1"
                />
                I accept the pizza club terms, privacy policy, and order notifications.
              </label>
              {user.errors.acceptedTerms ? (
                <p className="text-sm text-rose-600">{user.errors.acceptedTerms}</p>
              ) : null}

              <button
                type="submit"
                className="rounded-full bg-orange-500 px-5 py-3 font-semibold text-white transition hover:-translate-y-0.5"
              >
                Create Account
              </button>
            </form>

            {user.successMessage ? (
              <p className="mt-4 text-sm font-medium text-emerald-600">{user.successMessage}</p>
            ) : null}
          </div>

          <div className="rounded-[32px] border border-white/60 bg-white/75 p-6 backdrop-blur-xl">
            <h3 className="text-xl font-semibold text-slate-900">Current session</h3>
            {user.currentUser ? (
              <div className="mt-4 space-y-2 text-sm text-slate-600">
                <p>
                  <span className="font-semibold text-slate-900">Name:</span> {user.currentUser.fullName}
                </p>
                <p>
                  <span className="font-semibold text-slate-900">Email:</span> {user.currentUser.email}
                </p>
                <p>
                  <span className="font-semibold text-slate-900">Gender:</span> {user.currentUser.gender}
                </p>
              </div>
            ) : (
              <p className="mt-4 text-sm text-slate-600">No active user yet. Create one above.</p>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[32px] border border-white/60 bg-white/75 p-6 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <Pizza className="h-5 w-5 text-orange-500" />
              <h2 className="text-2xl font-semibold text-slate-900">Pizza Configurator</h2>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.92fr]">
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-500">
                    Size
                  </p>
                  <div className="mt-3 grid gap-3 sm:grid-cols-3">
                    {pizza.catalog.sizeOptions.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => dispatch(pizzaActions.setSize(option.id))}
                        className={`rounded-[24px] border p-4 text-left transition ${
                          pizza.current.size === option.id
                            ? 'border-orange-300 bg-orange-50'
                            : 'border-slate-200 bg-white'
                        }`}
                      >
                        <p className="font-semibold text-slate-900">{option.label}</p>
                        <p className="mt-1 text-sm text-slate-500">{currency(option.price)}</p>
                        <p className="mt-2 text-xs uppercase tracking-[0.22em] text-orange-500">
                          {option.accent}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-500">
                    Crust
                  </p>
                  <div className="mt-3 grid gap-3">
                    {pizza.catalog.crustOptions.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => dispatch(pizzaActions.setCrust(option.id))}
                        className={`rounded-2xl border px-4 py-3 text-left transition ${
                          pizza.current.crust === option.id
                            ? 'border-slate-950 bg-slate-950 text-white'
                            : 'border-slate-200 bg-white text-slate-700'
                        }`}
                      >
                        {option.label} {option.price ? `+ ${currency(option.price)}` : ''}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-500">
                    Toppings
                  </p>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {pizza.catalog.toppings.map((option) => {
                      const disabled = option.premium && pizza.current.size !== 'large'
                      const selected = pizza.current.toppings.includes(option.id)

                      return (
                        <button
                          key={option.id}
                          disabled={disabled}
                          type="button"
                          onClick={() => dispatch(pizzaActions.toggleTopping(option.id))}
                          className={`rounded-2xl border p-4 text-left transition ${
                            selected
                              ? 'border-orange-300 bg-orange-50'
                              : 'border-slate-200 bg-white'
                          } ${disabled ? 'cursor-not-allowed opacity-45' : ''}`}
                        >
                          <p className="font-semibold text-slate-900">{option.label}</p>
                          <p className="mt-1 text-sm text-slate-500">{currency(option.price)}</p>
                          {option.premium ? (
                            <p className="mt-2 text-xs uppercase tracking-[0.22em] text-orange-500">
                              Large only
                            </p>
                          ) : null}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-500">
                    Sides & drinks
                  </p>
                  <div className="mt-3 grid gap-3 sm:grid-cols-3">
                    {pizza.catalog.sides.map((option) => {
                      const selected = pizza.current.sides.includes(option.id)
                      return (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => dispatch(pizzaActions.toggleSide(option.id))}
                          className={`rounded-2xl border px-4 py-3 text-left transition ${
                            selected
                              ? 'border-slate-950 bg-slate-950 text-white'
                              : 'border-slate-200 bg-white text-slate-700'
                          }`}
                        >
                          {option.label}
                          <p className="mt-1 text-xs uppercase tracking-[0.2em]">
                            {currency(option.price)}
                          </p>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>

              <div className="rounded-[28px] bg-slate-950 p-5 text-white">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-300">
                  Live preview
                </p>
                <h3 className="mt-4 text-3xl font-semibold">
                  {preview.size.label} pizza with {preview.crust.label}
                </h3>

                <div className="mt-5 space-y-3 text-sm text-slate-300">
                  <div className="flex items-center justify-between">
                    <span>One pizza total</span>
                    <span>{currency(preview.onePizzaTotal)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Quantity</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          dispatch(pizzaActions.setQuantity(Math.max(1, pizza.current.quantity - 1)))
                        }
                        className="rounded-full bg-white/10 px-3 py-1"
                      >
                        -
                      </button>
                      <span>{pizza.current.quantity}</span>
                      <button
                        type="button"
                        onClick={() => dispatch(pizzaActions.setQuantity(pizza.current.quantity + 1))}
                        className="rounded-full bg-white/10 px-3 py-1"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div>
                    <p>Selected toppings</p>
                    <p className="mt-2 text-white">
                      {preview.toppingList.length
                        ? preview.toppingList.map((item) => item.label).join(', ')
                        : 'No toppings selected'}
                    </p>
                  </div>
                  <div>
                    <p>Sides</p>
                    <p className="mt-2 text-white">
                      {preview.sideList.length
                        ? preview.sideList.map((item) => item.label).join(', ')
                        : 'No sides selected'}
                    </p>
                  </div>
                  <div className="border-t border-white/10 pt-4">
                    <p className="text-sm text-slate-300">Grand line total</p>
                    <p className="mt-2 text-4xl font-semibold text-orange-300">
                      {currency(preview.total)}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={addPreviewToCart}
                  className="mt-6 w-full rounded-full bg-orange-500 px-5 py-3 font-semibold text-white transition hover:-translate-y-0.5"
                >
                  Add configured pizza to cart
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-white/60 bg-white/75 p-6 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <ShoppingBag className="h-5 w-5 text-orange-500" />
              <h2 className="text-2xl font-semibold text-slate-900">Cart Summary</h2>
            </div>

            <div className="mt-6 space-y-4">
              {cart.items.length ? (
                cart.items.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-slate-900">{item.title}</p>
                        <p className="mt-2 text-sm text-slate-500">
                          {item.toppings.map((entry) => entry.label).join(', ') || 'No toppings'}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => dispatch(cartActions.removeItem(item.id))}
                        className="rounded-full bg-slate-950/[0.04] px-3 py-1 text-sm font-medium text-slate-600"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-sm text-slate-600">
                      <span>Qty {item.quantity}</span>
                      <span className="font-semibold text-slate-900">{currency(item.total)}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="rounded-[24px] bg-slate-950/[0.04] p-5 text-sm text-slate-600">
                  Your cart is empty. Build at least one pizza to unlock checkout.
                </p>
              )}
            </div>

            <div className="mt-6 rounded-[28px] bg-slate-950 p-5 text-white">
              <div className="flex items-center justify-between text-sm">
                <span>Subtotal</span>
                <span>{currency(cart.summary.subtotal)}</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span>Delivery</span>
                <span>{currency(cart.summary.delivery)}</span>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                <span className="text-sm">Payable total</span>
                <span className="text-3xl font-semibold text-orange-300">
                  {currency(cart.summary.grandTotal)}
                </span>
              </div>
            </div>

            <button
              disabled={!cart.items.length}
              type="button"
              onClick={checkout}
              className="mt-6 w-full rounded-full bg-emerald-500 px-5 py-3 font-semibold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ReduxPizzaPage() {
  return (
    <Provider store={store}>
      <ReduxPizzaWorkspace />
    </Provider>
  )
}
