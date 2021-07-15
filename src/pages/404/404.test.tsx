import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { BrowserRouter } from 'react-router-dom';
import PageNotFound from './index';

describe('PageNotFound component', () => {
  it('renders correctly', () => {
    render(
      <BrowserRouter>
        <PageNotFound />
      </BrowserRouter>,
    );
    expect(screen.getByText('Página não encontrada')).toBeInTheDocument();
  });
});
