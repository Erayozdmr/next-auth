
import React from 'react';
import { render, screen } from '@testing-library/react';
import DashboardPage from '../page';
import { useSession } from 'next-auth/react';

// next-auth/react'i mockla
jest.mock('next-auth/react');

describe('DashboardPage', () => {
  it('Yükleniyor... durumunda mesajı gösterir', () => {
    (useSession as jest.Mock).mockReturnValue({ data: null, status: 'loading' });

    render(<DashboardPage />);
    expect(screen.getByText('Yükleniyor...')).toBeInTheDocument();
  });

  it('Oturum yoksa "Giriş yapmalısınız." mesajı gösterir', () => {
    (useSession as jest.Mock).mockReturnValue({ data: null, status: 'unauthenticated' });

    render(<DashboardPage />);
    expect(screen.getByText('Giriş yapmalısınız.')).toBeInTheDocument();
  });

  it('Oturum varsa dashboard içeriğini gösterir', () => {
    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: { name: 'Eray Özdemir', email: 'eray@example.com' },
      },
      status: 'authenticated',
    });

    render(<DashboardPage />);
    expect(screen.getByText('Hoşgeldin, Eray Özdemir!')).toBeInTheDocument();
    expect(screen.getByText('Toplam Satış')).toBeInTheDocument();
    expect(screen.getByText('Yeni Siparişler')).toBeInTheDocument();
    expect(screen.getByText('Stokta Ürünler')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /çıkış yap/i })).toBeInTheDocument();
  });
});
