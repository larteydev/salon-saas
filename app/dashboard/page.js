import { supabase } from '@/lib/supabase';
import AppointmentCard from '@/components/dashboard/AppointmentCard';

export default async function Dashboard() {
  const { data: appointments } = await supabase
    .from('appointments')
    .select('*, services(name)')
    .order('created_at', { ascending: false });

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <section>
        <h2 className="text-xl font-semibold mb-4">Appointments</h2>
        <div className="flex flex-col gap-4">
          {appointments && appointments.map((apt) => (
            <AppointmentCard key={apt.id} appointment={apt} />
          ))}
        </div>
      </section>
    </main>
  );
}