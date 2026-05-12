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
    <main>
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-[60vh] bg-pink-50 text-center px-6">
        <h1 className="text-5xl font-bold text-pink-600">{salon.name}</h1>
        <p className="mt-4 text-gray-500 text-lg">{salon.location}</p>
        <p className="mt-1 text-gray-400">{salon.opening_hours}</p>
        <a
          href={`https://wa.me/${salon.phone}`}
          className="mt-8 bg-green-500 text-white px-6 py-3 rounded-full font-medium hover:bg-green-600">
          Chat on WhatsApp
        </a>
      </section>
    </main>
  );
}