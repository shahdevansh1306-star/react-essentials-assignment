import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Counter } from './Counter'

describe('Counter', () => {
  it('increments and decrements the count', async () => {
    const user = userEvent.setup()

    render(<Counter />)

    expect(screen.getByLabelText('counter-value')).toHaveTextContent('0')

    await user.click(screen.getByRole('button', { name: /increment/i }))
    await user.click(screen.getByRole('button', { name: /increment/i }))
    expect(screen.getByLabelText('counter-value')).toHaveTextContent('2')

    await user.click(screen.getByRole('button', { name: /decrement/i }))
    expect(screen.getByLabelText('counter-value')).toHaveTextContent('1')
  })
})
