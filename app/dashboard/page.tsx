'use client';
import React from 'react';
import { signOut, useSession } from 'next-auth/react';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p className="flex justify-center items-center min-h-screen">Yükleniyor...</p>;
  }

  if (!session) {
    return <p className="flex justify-center items-center min-h-screen">Giriş yapmalısınız.</p>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-900">E-Commerce Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-700 font-medium">{session.user?.name || 'Kullanıcı'}</span>
          <button
            onClick={() => signOut()}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            Çıkış Yap
          </button>
        </div>
      </nav>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-60 bg-white border-r border-gray-200 p-6 hidden md:block">
          <ul className="space-y-4 text-gray-700 font-semibold">
            <li className="cursor-pointer hover:text-blue-600">Ana Sayfa</li>
            <li className="cursor-pointer hover:text-blue-600">Siparişler</li>
            <li className="cursor-pointer hover:text-blue-600">Ürünler</li>
            <li className="cursor-pointer hover:text-blue-600">Profil</li>
            <li className="cursor-pointer hover:text-blue-600">Ayarlar</li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-2xl font-semibold text-gray-900 mb-6"
          >
            Hoşgeldin, {session.user?.name || 'Kullanıcı'}!
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Kartlar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-lg shadow p-6"
            >
              <h3 className="text-lg font-medium text-gray-700 mb-2">Toplam Satış</h3>
              <p className="text-3xl font-bold text-blue-600">₺12,345</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-lg shadow p-6"
            >
              <h3 className="text-lg font-medium text-gray-700 mb-2">Yeni Siparişler</h3>
              <p className="text-3xl font-bold text-green-600">23</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-lg shadow p-6"
            >
              <h3 className="text-lg font-medium text-gray-700 mb-2">Stokta Ürünler</h3>
              <p className="text-3xl font-bold text-yellow-600">154</p>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
export function GET() {
    throw new Error('Function not implemented.');
}

export function POST() {
    throw new Error('Function not implemented.');
}

