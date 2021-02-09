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
  const text = jest.spyOn(FileReader.prototype, 'text')
  jest.mock("../Parser", () => ({data}))

  // jest.spyOn(FileReader.prototype, 'onload')

  // .mockImplementation(() => {
  //   return Promise.resolve(data)
  // })
  render(<FileSubmit />)
  const fileSubmit = screen.getByRole('button', { name: /submit/i })
  userEvent.click(fileSubmit)
  expect(text).toHaveBeenCalled()
  screen.debug()
  const element = await waitFor(() => screen.getByText(/description/))
  expect(element).toBeInTheDocument()
})
