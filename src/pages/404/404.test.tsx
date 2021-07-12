import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import PageNotFound from './index';

describe('PageNotFound component', () => {
  it('renders correctly', () => {
    render(<PageNotFound />);
    expect(screen.getByText('Página não encontrada')).toBeInTheDocument();
  });
});
