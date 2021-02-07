import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const text = screen.getByText(/Santander Monthly Account Report/i);
  expect(text).toBeInTheDocument();
});
