import { render, screen } from '@testing-library/react'
import Date from '../Date'

test('renders date', () => {
  render(<Date startDate='December 2000' endDate = 'December 2000' />)
  const text = screen.getByText(/December 2000/)
  expect(text).toBeInTheDocument()
})
