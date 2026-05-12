import { supabase } from '@/lib/supabase';
import BookingForm from '@/components/booking/BookingForm';

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

  const { data: services } = await supabase 
    .from('services')
    .select('*')
    .eq('salon_id', salon.id);

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

      {/* Services Section */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-10">Our Services</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {services && services.map((service) => (
            <div key={service.id} className="border rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold">{service.name}</h3>
              <p className="mt-2 text-gray-500">{service.description}</p>
              <p className="mt-4 text-pink-600 font-bold">GHS {service.price}</p>
              <p className="text-gray-400 text-sm">{service.duration} mins</p>
            </div>
          ))}
        </div>
      </section>

      {/* Booking Section */}
      <section className="max-w-4xl mx-auto px-6 py-16 bg-pink-50">
        <h2 className="text-3xl font-bold text-center mb-10">Book an Appointment</h2>
        <BookingForm salonId={salon.id} services={services || []} />
      </section>
    </main>
  );
}