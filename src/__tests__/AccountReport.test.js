// import { render, screen } from '@testing-library/react'
// import AccountReport from '../AccountReport'
// import { mockStatement } from '../mocks/mockStatement'
//
// describe('Account report', () => {
//   test('returns the top ten expenses', () => {
//     const accountReport = new AccountReport(mockStatement)
//     expect(accountReport.showTopTenExpenses()[0]).toEqual({
//       Date: 'fake',
//       Description: 'fake4',
//       Amount: -1200,
//       Balance: 'balance'
//     })
//     expect(accountReport.showTopTenExpenses().length).toEqual(10)
//   })
//
//   test('returns the sorted transactions', () => {
//     const accountReport = new AccountReport(mockStatement)
//     expect(accountReport.sortedTransactions()[0]).toEqual({
//       Date: 'fake',
//       Description: 'fake4',
//       Amount: -1200,
//       Balance: 'balance'
//     })
//     expect(accountReport.sortedTransactions().length).toEqual(mockStatement.length)
//   })
// })
