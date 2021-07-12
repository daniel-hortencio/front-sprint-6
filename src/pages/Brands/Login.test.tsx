import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Login from './index';

describe('PageNotFound component', () => {
  it('renders correctly', () => {
    render(<Login />);
    expect(screen.getByText('Página de login')).toBeInTheDocument();
  });
});
