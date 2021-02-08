import { Parser } from '../Parser'
import { mockRawData } from '../mocks/mockRawData'

test('it returns a sorted array object of transactions', () => {
    const parser = new Parser(mockRawData)
    expect(parser.sortedTransactions()[0]).toEqual({
      Date: 'fake',
      Description: 'fake1',
      Amount: -15.75,
      Balance: 'balance'
    })
    expect(parser.sortedTransactions().length).toEqual(2)
})
