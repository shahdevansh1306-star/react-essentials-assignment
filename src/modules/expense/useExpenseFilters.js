import { useMemo } from 'react'

export function useExpenseFilters(expenses, filters) {
  return useMemo(() => {
    return expenses
      .filter((expense) =>
        filters.category === 'All' ? true : expense.category === filters.category,
      )
      .filter((expense) =>
        filters.search
          ? expense.title.toLowerCase().includes(filters.search.toLowerCase())
          : true,
      )
      .filter((expense) => {
        if (!filters.startDate && !filters.endDate) {
          return true
        }

        const expenseDate = new Date(expense.date).getTime()
        const startDate = filters.startDate ? new Date(filters.startDate).getTime() : -Infinity
        const endDate = filters.endDate ? new Date(filters.endDate).getTime() : Infinity
        return expenseDate >= startDate && expenseDate <= endDate
      })
      .sort((first, second) => {
        if (filters.sortBy === 'amount') {
          return second.amount - first.amount
        }

        if (filters.sortBy === 'category') {
          return first.category.localeCompare(second.category)
        }

        return new Date(second.date).getTime() - new Date(first.date).getTime()
      })
  }, [expenses, filters])
}
