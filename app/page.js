import { supabase } from '@/lib/supabase';

export default async function Home() {
  const { data, error } = await supabase.from('salons').select('*');

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Salon SaaS</h1>
      <p className="mt-4 text-gray-500">
        {error ? 'Connection failed' : 'Database connected'}
      </p>
    </main>
  );
}