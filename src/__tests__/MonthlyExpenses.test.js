import { render, screen, fireEvent } from '@testing-library/react'
import selectEvent from 'react-select-event'
import userEvent from '@testing-library/user-event'
import MonthlyExpenses from '../MonthlyExpenses'
import { mockWithdrawals } from '../mocks/mockWithdrawals'

test('renders total monthly spend', async () => {
  const { getByTestId } = render(<MonthlyExpenses expenses={mockWithdrawals} />)
  fireEvent.change(getByTestId('select'), { target: { value: 'Total' } })
  userEvent.click(screen.getByText('Submit'))
  const text = screen.getByText(/1870/)
  expect(text).toBeInTheDocument()
})

test('renders monthly spend under 100', async () => {
  const { getByTestId } = render(<MonthlyExpenses expenses={mockWithdrawals} />)
  fireEvent.change(getByTestId('select'), { target: { value: 'Under 100' } })
  userEvent.click(screen.getByText('Submit'))
  const text = screen.getByText(/170/)
  expect(text).toBeInTheDocument()
})

test('renders monthly Living expenses', async () => {
  const { getByTestId } = render(<MonthlyExpenses expenses={mockWithdrawals} />)
  fireEvent.change(getByTestId('select'), { target: { value: 'Living' } })
  const salary = screen.getByLabelText(/Salary:/)
  userEvent.type(salary, '2050')
  const rent = screen.getByLabelText(/Rent:/)
  userEvent.type(rent, '660')
  userEvent.click(screen.getByText('Submit'))
  const text = screen.getByText(/830/)
  expect(text).toBeInTheDocument()
})

test('renders 80 20 rule', async () => {
  const { getByTestId } = render(<MonthlyExpenses expenses={mockWithdrawals} />)
  fireEvent.change(getByTestId('select'), { target: { value: '20 Rule' } })
  const salary = screen.getByLabelText(/Salary:/)
  userEvent.type(salary, '2050')
  const rent = screen.getByLabelText(/Rent:/)
  userEvent.type(rent, '660')
  userEvent.click(screen.getByText('Submit'))
  const text = screen.getByText(/59%/)
  expect(text).toBeInTheDocument()
})

test('renders amazon spend', async () => {
  const { getByTestId } = render(<MonthlyExpenses expenses={mockWithdrawals} />)
  fireEvent.change(getByTestId('select'), { target: { value: 'Amazon' } })
  userEvent.click(screen.getByText('Submit'))
  const text = screen.getByText(/30/)
  expect(text).toBeInTheDocument()
})
