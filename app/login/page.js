'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError('Invalid email or password');
      setLoading(false);
    } else {
      router.push('/dashboard');
    }
  }

  return (
  <main className="min-h-[100dvh] bg-stone-900 flex items-center justify-center px-6">
    <div className="w-full max-w-sm">
      <p className="text-rose-500 text-sm tracking-widest uppercase mb-3">Admin</p>
      <h1 className="text-3xl font-bold text-white mb-8">Crane Hair Studio</h1>

      {error && (
        <p className="text-red-400 text-sm mb-4">{error}</p>
      )}

      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-stone-400 mb-1">Email</label>
          <input
            type="email"
            placeholder="admin@cranehair.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-stone-800 border border-stone-700 text-white placeholder-stone-500 rounded-xl px-4 py-3 focus:outline-none focus:border-rose-400 transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-400 mb-1">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-stone-800 border border-stone-700 text-white placeholder-stone-500 rounded-xl px-4 py-3 focus:outline-none focus:border-rose-400 transition-colors"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="mt-2 bg-rose-500 text-white py-3 rounded-xl font-medium hover:bg-rose-600 active:scale-[0.98] transition-all disabled:opacity-50"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  </main>
);
}