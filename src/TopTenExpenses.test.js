import { render, screen } from '@testing-library/react'
import TopTenExpenses from './TopTenExpenses'
import { mockTopTen } from './mockTopTen'

test('renders learn react link', () => {
  render(<TopTenExpenses expenses={mockTopTen}/>)
  const text1 = screen.getByText('fake1')
  const text2 = screen.getByText(/fake10Amazon/i)
  expect(text1).toBeInTheDocument()
  expect(text2).toBeInTheDocument()
})
