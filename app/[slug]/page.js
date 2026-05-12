import { supabase } from '@/lib/supabase';

export default async function SalonPage({ params }) {
  const { slug } = await params;

  const { data: salon, error } = await supabase
    .from('salons')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !salon) {
    return <main className="p-8"><h1>Salon not found</h1></main>;
  }

  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold">{salon.name}</h1>
      <p className="mt-2 text-gray-500">{salon.location}</p>
      <p className="mt-1 text-gray-500">{salon.opening_hours}</p>
      <p className="mt-1 text-gray-500">{salon.phone}</p>
    </main>
  );
}