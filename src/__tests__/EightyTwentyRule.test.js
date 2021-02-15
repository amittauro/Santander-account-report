import { render, screen, waitFor } from '@testing-library/react'
import EightyTwentyRule from '../EightyTwentyRule'
import { mockTransactions } from '../mocks/mockTransactions'
import userEvent from '@testing-library/user-event'

window.alert = jest.fn()

test('renders eighty twenty rule result', async () => {
  render(<EightyTwentyRule sortedTransactions={mockTransactions} />)
  const salary = screen.getByLabelText('Monthly take home Salary (£):')
  const rent = screen.getByLabelText('Monthly Rent (£):')
  const maxExpenseValue = screen.getByLabelText('Maximum cost of living expenses:')
  userEvent.type(salary, '1000')
  userEvent.type(rent, '400')
  userEvent.type(maxExpenseValue, '100')
  const submit = screen.getByRole('button')
  userEvent.click(submit)
  const text = await waitFor(() => screen.getByText(/43%/))
  expect(text).toBeInTheDocument()
})

test('asks user to for valid inputs', async () => {
  jest.spyOn(window, 'alert')
  render(<EightyTwentyRule sortedTransactions={mockTransactions} />)
  const salary = screen.getByLabelText('Monthly take home Salary (£):')
  const rent = screen.getByLabelText('Monthly Rent (£):')
  const maxExpenseValue = screen.getByLabelText('Maximum cost of living expenses:')
  userEvent.type(salary, '£1000')
  userEvent.type(rent, '400')
  userEvent.type(maxExpenseValue, '100')
  const submit = screen.getByRole('button')
  userEvent.click(submit)
  expect(window.alert).toHaveBeenCalled()
})
