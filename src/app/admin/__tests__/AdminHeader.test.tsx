import React from 'react';
import { render, screen } from '@testing-library/react';
import {AdminHeader} from '../AdminHeader';

test('renders AdminHeader component', () => {
    render(<AdminHeader />);
    const headerElement = screen.getByText(/Admin Header/i);
    expect(headerElement).toBeInTheDocument();
});