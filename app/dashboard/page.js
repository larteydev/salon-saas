import { supabase } from '@/lib/supabase';

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
            <div key={apt.id} className="border rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-lg">{apt.customer_name}</p>
                  <p className="text-gray-500">{apt.customer_phone}</p>
                  <p className="text-gray-500">{apt.services?.name}</p>
                  <p className="text-gray-500">{apt.appointment_date} at {apt.appointment_time}</p>
                </div>
                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
                  {apt.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}