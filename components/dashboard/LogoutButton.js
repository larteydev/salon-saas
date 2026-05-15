'use client';

import { createClient } from '@/lib/supabase-browser';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/login');
  }

  return (
    <button
      onClick={handleLogout}
      className="text-stone-400 hover:text-white text-sm font-medium transition-colors"
    >
      Sign Out
    </button>
  );
}