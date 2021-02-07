import { render, screen } from '@testing-library/react';
import FileInput from './FileInput';

test('renders learn react link', () => {
  render(<FileInput />);
  const fileSubmit = screen.getByText(/submit/i);
  expect(fileSubmit).toBeInTheDocument();
});
