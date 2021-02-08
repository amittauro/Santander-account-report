import { render, screen } from '@testing-library/react'
import FileInput from './FileInput'

test('renders file uploading', () => {
  render(<FileInput />)
  const fileSubmit = screen.getByText(/submit/i)
  expect(fileSubmit).toBeInTheDocument()
})

test('submitting file', () => {
  render(<FileInput />)
  const fileSubmit = screen.getByText(/submit/i)
  expect(fileSubmit).toBeInTheDocument()
})
