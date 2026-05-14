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

  const { data: gallery } = await supabase
    .from('gallery_images')
    .select('*')
    .eq('salon_id', salon.id);

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-[70vh] bg-gradient-to-br from-pink-600 to-rose-500 text-center px-6">
        <h1 className="text-5xl font-bold text-white">{salon.name}</h1>
        <p className="mt-4 text-pink-100 text-lg">{salon.location}</p>
        <p className="mt-1 text-pink-200">{salon.opening_hours}</p>
        <a    
          href={`https://wa.me/${salon.phone}`}
          className="mt-8 bg-white text-pink-600 px-8 py-3 rounded-full font-semibold hover:bg-pink-50 transition-colors">
          Chat on WhatsApp
        </a>
      </section>

      {/* Services Section */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Our Services</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {services && services.map((service) => (
            <div key={service.id} className="border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900">{service.name}</h3>
              <p className="mt-2 text-gray-600">{service.description}</p>
              <p className="mt-4 text-pink-600 font-bold text-lg">GHS {service.price}</p>
              <p className="text-gray-400 text-sm mt-1">{service.duration} mins</p>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery Section */}
      <section className="bg-gray-50 px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Our Work</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {gallery && gallery.map((image) => (
              <img
                key={image.id}
                src={image.image_url}
                alt="Salon work"
                className="w-full h-48 object-cover rounded-2xl"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Book an Appointment</h2>
        <BookingForm salonId={salon.id} services={services || []} />
      </section>
    </main>
  );
}