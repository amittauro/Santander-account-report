import { render, screen, waitFor } from '@testing-library/react'
import FileSubmit from '../FileSubmit'
import userEvent from '@testing-library/user-event'
import { Parser } from '../Parser'
import { mockRawData } from '../mocks/mockRawData'

test('renders file uploading', () => {
  render(<FileSubmit />)
  const fileSubmit = screen.getByRole('button', { name: /submit/i })
  expect(fileSubmit).toBeInTheDocument()
})

test('when submitting file renders result data', async () => {
  window.FileReader = class {
    readAsText () {
      this.onload({
        target: {
          result: mockRawData
        }
      })
    }
  }
  jest.mock('../Parser')
  render(<FileSubmit />)
  const fileSubmit = screen.getByRole('button', { name: /submit/i })
  userEvent.click(fileSubmit)
  const element = await waitFor(() => screen.getByText(/Description/))
  expect(element).toBeInTheDocument()
})
