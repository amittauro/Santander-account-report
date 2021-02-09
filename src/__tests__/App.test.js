import { render, screen } from '@testing-library/react'
import App from '../App'

test('renders homepage', () => {
  render(<App />)
  const text = screen.getByText(/Santander Monthly Report/i)
  expect(text).toBeInTheDocument()
})
