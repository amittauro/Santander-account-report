import { render, screen, waitFor } from '@testing-library/react'
import EightyTwentyRule from '../EightyTwentyRule'
import { mockEightyTwentyRule } from '../mocks/mockEightyTwentyRule'
import userEvent from '@testing-library/user-event'

window.alert = jest.fn()

test('renders eighty twenty rule result', async () => {
  render(<EightyTwentyRule sortedTransactions={mockEightyTwentyRule} />)
  const company = screen.getByLabelText(/Company:/i)
  userEvent.type(company, 'fake company')
  const submit = screen.getByRole('button')
  userEvent.click(submit)
  const text = await waitFor(() => screen.getByText(/43%/))
  expect(text).toBeInTheDocument()
})

test('alerts user to enter a valid company', async () => {
  jest.spyOn(window, 'alert')
  render(<EightyTwentyRule sortedTransactions={mockEightyTwentyRule} />)
  const company = screen.getByLabelText(/Company:/i)
  userEvent.type(company, 'doesnt exist')
  const submit = screen.getByRole('button')
  userEvent.click(submit)
  expect(window.alert).toHaveBeenCalled()
})
