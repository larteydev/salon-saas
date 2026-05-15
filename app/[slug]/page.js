import { supabase } from '@/lib/supabase';
import BookingForm from '@/components/booking/BookingForm';
import GalleryCarousel from '@/components/salon/GalleryCarousel';

export default async function SalonPage({ params }) {
  const { slug } = await params;

  const { data: salon, error } = await supabase
    .from('salons')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !salon) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400">Salon not found.</p>
      </main>
    );
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
      {/* Hero */}
      <section className="min-h-[100dvh] bg-stone-900 flex flex-col justify-end px-6 pb-16 pt-24">
        {/* {salon.logo_url && (
          <img
            src={salon.logo_url}
            alt={`${salon.name} logo`}
            className="w-32 h-32 object-contain mb-6"
          />
        )} */}
        <p className="text-stone-400 text-sm tracking-widest uppercase mb-4">
          {salon.location}
        </p>
        <h1 className="text-5xl md:text-7xl font-bold text-white leading-none tracking-tight">
          {salon.name}
        </h1>
        <p className="mt-4 text-stone-400">{salon.opening_hours}</p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <a
            href={`https://wa.me/${salon.phone}`}
            className="inline-flex items-center justify-center bg-rose-500 text-white px-7 py-3 rounded-full font-medium hover:bg-rose-600 transition-colors"
          >
            Chat on WhatsApp
          </a>
          <a
            href="#book"
            className="inline-flex items-center justify-center border border-stone-600 text-stone-300 px-7 py-3 rounded-full font-medium hover:border-stone-400 hover:text-white transition-colors"
          >
            Book Appointment
          </a>
        </div>
      </section>

      {/* Services */}
      <section className="px-6 py-20 max-w-5xl mx-auto">
        <p className="text-rose-500 text-sm tracking-widest uppercase mb-3">What we offer</p>
        <h2 className="text-3xl font-bold text-stone-900 mb-12">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-stone-100">
          {services && services.map((service) => (
            <div key={service.id} className="bg-white p-8 hover:bg-stone-50 transition-colors">
              <h3 className="text-lg font-semibold text-stone-900">{service.name}</h3>
              {service.description && (
                <p className="mt-2 text-stone-500 text-sm leading-relaxed">{service.description}</p>
              )}
              <div className="mt-6 flex items-center justify-between">
                <span className="text-rose-500 font-bold text-lg">GHS {service.price}</span>
                {service.duration && (
                  <span className="text-stone-400 text-sm">{service.duration} mins</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      {gallery && gallery.length > 0 && (
        <section className="px-6 py-20 bg-stone-50">
          <div className="max-w-5xl mx-auto">
            <p className="text-rose-500 text-sm tracking-widest uppercase mb-3">Portfolio</p>
            <h2 className="text-3xl font-bold text-stone-900 mb-12">Our Work</h2>
            <GalleryCarousel images={gallery} />
          </div>
        </section>
      )}

      {/* Testimonials */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-5xl mx-auto">
          <p className="text-rose-500 text-sm tracking-widests uppercase mb-3">Kind Words</p>
          <h2 className="text-3xl font-bold text-stone-900 mb-12">What Our Clients Say</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                name: "Abena M.",
                text: "I walked in not knowing what I wanted and walked out with the most beautiful knotless braids. The attention to detail is unmatched.",
              },
              {
                name: "Efua A.",
                text: "Crane Hair Studio is my go-to. Clean, professional, and they always deliver. My sew-in has never looked this good.",
              },
              {
                name: "Akosua D.",
                text: "Booked online and the whole experience was seamless. The studio has such a warm atmosphere. I won't go anywhere else.",
              },
            ].map((t, i) => (
              <div key={i} className="flex flex-col gap-4">
                <p className="text-stone-500 leading-relaxed italic">"{t.text}"</p>
                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 font-semibold text-sm">
                    {t.name[0]}
                  </div>
                  <span className="text-stone-700 font-medium text-sm">{t.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking */}
      <section id="book" className="px-6 py-20 bg-white">
        <div className="max-w-5xl mx-auto">
          <p className="text-rose-500 text-sm tracking-widest uppercase mb-3">Reservations</p>
          <h2 className="text-3xl font-bold text-stone-900 mb-12">Book an Appointment</h2>
          <div className="flex justify-center">
            <BookingForm salonId={salon.id} services={services || []} />
          </div>
        </div>
      </section>

    </main>
  );
}