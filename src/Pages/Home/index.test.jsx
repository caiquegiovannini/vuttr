import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

import Home from '.';

describe('Home', () => {
  it('Should open modal', () => {
    render(<Home />);

    userEvent.click(screen.getByRole('button', { name: /Add/ }));

    expect(screen.getByText(/Add new tool/)).toBeInTheDocument();
  });
});
