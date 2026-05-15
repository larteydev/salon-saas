'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AppointmentCard({ appointment }) {
  const [status, setStatus] = useState(appointment.status);
  const [loading, setLoading] = useState(false);

  async function updateStatus(newStatus) {
    setLoading(true);
    const { error } = await supabase
      .from('appointments')
      .update({ status: newStatus })
      .eq('id', appointment.id);

    if (!error) setStatus(newStatus);
    setLoading(false);
  }

  const statusStyles = {
    pending: 'bg-amber-50 text-amber-700 border border-amber-200',
    approved: 'bg-green-50 text-green-700 border border-green-200',
    rejected: 'bg-red-50 text-red-700 border border-red-200',
    completed: 'bg-stone-100 text-stone-500 border border-stone-200',
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
      <div className="flex justify-between items-start gap-4">
        <div className="flex flex-col gap-1">
          <p className="font-semibold text-stone-900 text-lg">{appointment.customer_name}</p>
          <p className="text-stone-500 text-sm">{appointment.customer_phone}</p>
          <p className="text-stone-600 text-sm mt-1">{appointment.services?.name}</p>
          <p className="text-stone-400 text-sm">
            {appointment.appointment_date} · {appointment.appointment_time}
          </p>
        </div>
        <span className={`text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap ${statusStyles[status]}`}>
          {status}
        </span>
      </div>

      {status === 'pending' && (
        <div className="flex gap-3 mt-5">
          <button
            onClick={() => updateStatus('approved')}
            disabled={loading}
            className="bg-stone-900 text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-stone-700 disabled:opacity-50 transition-colors"
          >
            Approve
          </button>
          <button
            onClick={() => updateStatus('rejected')}
            disabled={loading}
            className="border border-red-200 text-red-500 px-5 py-2 rounded-xl text-sm font-medium hover:bg-red-50 disabled:opacity-50 transition-colors"
          >
            Reject
          </button>
        </div>
      )}

      {status === 'approved' && (
        <button
          onClick={() => updateStatus('completed')}
          disabled={loading}
          className="mt-5 border border-stone-200 text-stone-500 px-5 py-2 rounded-xl text-sm font-medium hover:bg-stone-50 disabled:opacity-50 transition-colors"
        >
          Mark Completed
        </button>
      )}
    </div>
  );
}