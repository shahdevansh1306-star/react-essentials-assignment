import { useLocalStorageState } from './useLocalStorageState'

const seedExpenses = [
  { id: 'exp-1', title: 'Groceries', amount: 2450, category: 'Food', date: '2026-04-05' },
  { id: 'exp-2', title: 'Uber to college', amount: 380, category: 'Transport', date: '2026-04-06' },
  { id: 'exp-3', title: 'Figma subscription', amount: 999, category: 'Software', date: '2026-04-07' },
]

export function useExpenseManager() {
  const [expenses, setExpenses] = useLocalStorageState('react-showcase-expenses', seedExpenses)

  function addExpense(expense) {
    setExpenses((previous) => [
      {
        ...expense,
        id: `exp-${Date.now()}`,
      },
      ...previous,
    ])
  }

  function deleteExpense(id) {
    setExpenses((previous) => previous.filter((expense) => expense.id !== id))
  }

  function toggleFlag(id) {
    setExpenses((previous) =>
      previous.map((expense) =>
        expense.id === id ? { ...expense, flagged: !expense.flagged } : expense,
      ),
    )
  }

  return {
    expenses,
    addExpense,
    deleteExpense,
    toggleFlag,
  }
}
