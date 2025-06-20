'use client';

import { motion } from 'framer-motion';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="bg-white shadow-lg rounded-lg max-w-sm w-full p-10 flex flex-col gap-8"
      >
        <h1 className="text-3xl font-extrabold text-gray-900 text-center">
          Giriş Yap
        </h1>
        <p className="text-center text-gray-500 text-sm">
          Hesabınızla devam edin
        </p>

        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => signIn('auth0', { callbackUrl: '/dashboard' })}
          className="w-full py-3 rounded-md bg-gray-900 text-white font-semibold shadow-md hover:bg-gray-800 transition"
        >
          Auth0 ile Giriş Yap
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
          className="w-full py-3 rounded-md border border-gray-300 text-gray-900 font-semibold shadow-sm hover:bg-gray-100 transition"
        >
          Google ile Giriş Yap
        </motion.button>

      </motion.div>
    </div>
  );
}
