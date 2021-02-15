import { render, screen } from '@testing-library/react'
import AmazonExpenses from '../AmazonExpenses'
import { mockTransactions } from '../mocks/mockTransactions'

test('renders amazon spend', async () => {
  render(<AmazonExpenses sortedTransactions={mockTransactions} />)
  const text = screen.getByText(/30/)
  expect(text).toBeInTheDocument()
})
