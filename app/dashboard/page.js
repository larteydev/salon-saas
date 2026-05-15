import { createClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import AppointmentCard from '@/components/dashboard/AppointmentCard';
import LogoutButton from '@/components/dashboard/LogoutButton';
import GalleryUpload from '@/components/dashboard/GalleryUpload';
import ServicesManager from '@/components/dashboard/ServicesManager';

export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: appointments } = await supabase
    .from('appointments')
    .select('*, services(name)')
    .order('created_at', { ascending: false });

  const { data: salon } = await supabase
    .from('salons')
    .select('id')
    .single();
  
  const { data: services } = await supabase
    .from('services')
    .select('*')
    .eq('salon_id', salon?.id);

  return (
    <main className="min-h-[100dvh] bg-stone-50">
      {/* Header */}
      <header className="bg-stone-900 px-6 py-5 flex justify-between items-center">
        <div>
          <p className="text-rose-500 text-xs tracking-widest uppercase">Admin</p>
          <h1 className="text-white font-bold text-xl">Crane Hair Studio</h1>
        </div>
        <LogoutButton />
      </header>

      <div className="max-w-5xl mx-auto px-6 py-12">

        {/* Appointments */}
        <section>
          <h2 className="text-lg font-semibold text-stone-700 uppercase tracking-widest mb-6">
            Appointments
          </h2>
          {appointments && appointments.length > 0 ? (
            <div className="flex flex-col gap-4">
              {appointments.map((apt) => (
                <AppointmentCard key={apt.id} appointment={apt} />
              ))}
            </div>
          ) : (
            <p className="text-stone-400">No appointments yet.</p>
          )}
        </section>

        <div className="border-t border-stone-200 my-12"/>

        {/* Services */}
        <ServicesManager initialServices={services || []} salonId={salon?.id} />

        <div className="border-t border-stone-200 my-12"/>

        {/* Gallery */}
        <section>
          <h2 className="text-lg font-semibold text-stone-700 uppercase tracking-widest mb-6">
            Gallery
          </h2>
          <GalleryUpload salonId={salon?.id} />
        </section>

      </div>
    </main>
  );
}