import { render, screen } from '@testing-library/react'
import FileInput from '../FileInput'
import userEvent from '@testing-library/user-event'

test('renders file uploading', () => {
  render(<FileInput />)
  const fileSubmit = screen.getByRole('button', { name: /submit/i })
  expect(fileSubmit).toBeInTheDocument()
})

test('submitting file', () => {
  const readAsText = jest.spyOn(FileReader.prototype, 'readAsText').mockImplementation()
  render(<FileInput />)
  const fileSubmit = screen.getByRole('button', { name: /submit/i })
  userEvent.click(fileSubmit)
  expect(readAsText).toHaveBeenCalled()
})
