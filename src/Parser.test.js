import { render, screen } from '@testing-library/react';
import Parser from './Parser';
import { mockRawData } from './mockRawData'

test('returns an object with the place and the max spent', () => {
  let parser = new Parser(mockRawData)
  expect(parser.processStatement()[0]).toEqual({
      'Date': 'fake',
      'Description': 'fake',
      'Amount': -6.75,
      'Balance': 'balance'
  })
  expect(parser.processStatement().length).toEqual(2)
})
