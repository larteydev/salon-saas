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
    <main className="max-w-5xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <LogoutButton />
      </div>

      <section>
        <h2 className="text-xl font-semibold mb-4">Appointments</h2>
        <div className="flex flex-col gap-4">
          {appointments && appointments.map((apt) => (
            <AppointmentCard key={apt.id} appointment={apt} />
          ))}
        </div>
      </section>
      <GalleryUpload salonId={salon?.id} />

      <ServicesManager initialServices={services || []} salonId={salon?.id} />
    </main>
  );
}