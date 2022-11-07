import { render, screen } from '@testing-library/react';
import { FullSpinner } from './full-spinner';

describe('FullSpinner', () => {
  it('should be render successfully', () => {
    render(<FullSpinner />);

    expect(screen).toBeDefined();
    expect(screen.getByTestId('spinner-element')).toBeInTheDocument();
  });
});
