import { render, screen, waitFor } from '@testing-library/react'
import App from '../App'
import userEvent from '@testing-library/user-event'
import { mockMonthlyData } from '../mocks/mockMonthlyData'

test('renders homepage', () => {
  render(<App />)
  const text = screen.getByText(/Santander Monthly Report/i)
  expect(text).toBeInTheDocument()
})

test('when submitting file it provides the app class with the data', async () => {
  window.FileReader = class {
    readAsText () {
      this.onload({
        target: {
          result: mockMonthlyData
        }
      })
    }
  }
  render(<App />)
  const fileSubmit = screen.getByRole('button', { name: /submit/i })
  userEvent.click(fileSubmit)
  const element = await waitFor(() => screen.getByText(/Your Top Ten Expenses/))
  expect(element).toBeInTheDocument()
})
