import { render, screen } from '@testing-library/react'
import AccountReport from './AccountReport'
import { mockStatement } from './mockStatement'

describe('Account report', () => {
  test('returns an object with the place and the max spent', () => {
    const accountReport = new AccountReport(mockStatement)
    expect(accountReport.showTopTenExpenses()[0]).toEqual({
      Date: 'fake',
      Description: 'fake4',
      Amount: -1200,
      Balance: 'balance'
    })
    expect(accountReport.showTopTenExpenses().length).toEqual(10)
  })

  test('returns the amount spent during the month', () => {
    const accountReport = new AccountReport(mockStatement)
    expect(accountReport.monthlyExpenditure()).toEqual(1558.50)
  })

  test('returns the amount spent during the month under 100', () => {
    const accountReport = new AccountReport(mockStatement)
    expect(accountReport.expensesUnderHundred()).toEqual(158.50)
  })

  test('returns the amount spent at amazon', () => {
    const accountReport = new AccountReport(mockStatement)
    expect(accountReport.amazonExpenses()).toEqual(80)
  })

  test('returns the % spent on rent and daily expenses', () => {
    const accountReport = new AccountReport(mockStatement)
    expect(accountReport.livingExpenses()).toEqual('40%')
  })
})
