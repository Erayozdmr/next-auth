"use client";
import React from 'react';
import { render, screen } from '@testing-library/react';

import LoginForm from '@/components/LoginForm';

describe('LoginPage', () => {
  it('renders login buttons', () => {
    render(<LoginForm />);
    expect(screen.getByText(/Auth0 ile Giriş Yap/i)).toBeInTheDocument();
    expect(screen.getByText(/Google ile Giriş Yap/i)).toBeInTheDocument();
  });
});
