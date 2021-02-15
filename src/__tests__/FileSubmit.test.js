import { render, screen, waitFor } from '@testing-library/react'
import FileSubmit from '../FileSubmit'
import userEvent from '@testing-library/user-event'
import { Parser } from '../Parser'
import { mockRawData } from '../mocks/mockRawData'

test('when submitting file it provides the app class with the data', async () => {
  window.FileReader = class {
    readAsText () {
      this.onload({
        target: {
          result: mockRawData
        }
      })
    }
  }
  const mockApp = { handleFileSubmit: () => {} }
  jest.spyOn(mockApp, 'handleFileSubmit')
  render(<FileSubmit onFileSubmission={mockApp.handleFileSubmit}/>)
  const fileSubmit = screen.getByRole('button', { name: /submit/i })
  userEvent.click(fileSubmit)
  expect(mockApp.handleFileSubmit).toHaveBeenCalledWith(mockRawData)
})
