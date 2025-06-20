'use client';
import { motion } from 'framer-motion';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import React from 'react';
export default function LoginForm() {
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);

  const handleSignIn = (provider: string) => {
    setLoadingProvider(provider);
    signIn(provider, { callbackUrl: '/dashboard' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="bg-white shadow-lg rounded-lg max-w-sm w-full p-10 flex flex-col gap-8"
      >
        <h1 className="text-3xl font-extrabold text-gray-900 text-center">Giriş Yap</h1>
        <p className="text-center text-gray-500 text-sm">Hesabınızla devam edin</p>

        <motion.button
          whileHover={{ scale: loadingProvider ? 1 : 1.04 }}
          whileTap={{ scale: loadingProvider ? 1 : 0.96 }}
          onClick={() => handleSignIn('auth0')}
          disabled={!!loadingProvider}
          className={`w-full py-3 rounded-md font-semibold shadow-md transition ${
            loadingProvider === 'auth0'
              ? 'bg-gray-700 cursor-not-allowed text-white'
              : 'bg-gray-900 text-white hover:bg-gray-800'
          }`}
          aria-label="Auth0 ile Giriş Yap"
        >
          {loadingProvider === 'auth0' ? 'Yükleniyor...' : 'Auth0 ile Giriş Yap'}
        </motion.button>

        <motion.button
          whileHover={{ scale: loadingProvider ? 1 : 1.04 }}
          whileTap={{ scale: loadingProvider ? 1 : 0.96 }}
          onClick={() => handleSignIn('google')}
          disabled={!!loadingProvider}
          className={`w-full py-3 rounded-md border border-gray-300 font-semibold shadow-sm transition ${
            loadingProvider === 'google'
              ? 'bg-gray-200 cursor-not-allowed text-gray-500'
              : 'text-gray-900 hover:bg-gray-100'
          }`}
          aria-label="Google ile Giriş Yap"
        >
          {loadingProvider === 'google' ? 'Yükleniyor...' : 'Google ile Giriş Yap'}
        </motion.button>
      </motion.div>
    </div>
  );
}