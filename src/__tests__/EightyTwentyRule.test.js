import { render, screen, waitFor } from '@testing-library/react'
import EightyTwentyRule from '../EightyTwentyRule'
import { mockEightyTwentyRule } from '../mocks/mockEightyTwentyRule'
import userEvent from '@testing-library/user-event'

test('renders eighty twenty rule result', async () => {
  render(<EightyTwentyRule sortedTransactions={mockEightyTwentyRule} />)
  const company = screen.getByLabelText(/Company/i)
  userEvent.type(company, 'Fake Company')
  const submit = screen.getByRole('button')
  userEvent.click(submit)
  const text = await waitFor(() => screen.getByText(/43%/))
  expect(text).toBeInTheDocument()
})
