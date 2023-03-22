import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const container = screen.getByTestId('legend');
  expect(container).toBeInTheDocument();
  expect(container).toHaveTextContent('Todo List')
});
