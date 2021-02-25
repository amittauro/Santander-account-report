import { Parser } from '../Parser.js'
import { mockRawData } from '../mocks/mockRawData'

test('it returns an array transactions as objects', () => {
  const parser = new Parser(mockRawData)
  expect(parser.processStatement()[0]).toEqual({
    Date: 'fake',
    Description: 'CARD PAYMENT TO fake',
    Amount: -6.75,
    Balance: 'balance'
  })
  expect(parser.processStatement().length).toEqual(2)
})

test('it processes the start date', () => {
  const parser = new Parser(mockRawData)
  expect(parser.processStartDate()).toEqual('January 2000')
})

test('it processes the end date', () => {
  const parser = new Parser(mockRawData)
  expect(parser.processEndDate()).toEqual('January 2000')
})
