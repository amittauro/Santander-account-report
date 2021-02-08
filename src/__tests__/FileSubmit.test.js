import { render, screen, waitFor } from '@testing-library/react'
import FileSubmit from '../FileSubmit'
import userEvent from '@testing-library/user-event'
import { Parser } from '../Parser'

test('renders file uploading', () => {
  render(<FileSubmit />)
  const fileSubmit = screen.getByRole('button', { name: /submit/i })
  expect(fileSubmit).toBeInTheDocument()
})

test('submitting file', async () => {
  const data = [{
    Date: 'fake',
    Description: 'fake1',
    Amount: -15.75,
    Balance: 'balance'
  }]
  jest.mock("../Parser", () => ({data}))
  const readAsText = jest.spyOn(FileReader.prototype, 'readAsText').mockImplementation()
  render(<FileSubmit />)
  const fileSubmit = screen.getByRole('button', { name: /submit/i })
  userEvent.click(fileSubmit)
  expect(readAsText).toHaveBeenCalled()
  screen.debug()
  const element = await waitFor(() => screen.getByText(/description/))
  expect(element).toBeInTheDocument()
})
