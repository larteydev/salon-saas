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

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-700',
    approved: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
    completed: 'bg-gray-100 text-gray-700',
  };

  return (
    <div className="border rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-semibold text-lg">{appointment.customer_name}</p>
          <p className="text-gray-500">{appointment.customer_phone}</p>
          <p className="text-gray-500">{appointment.services?.name}</p>
          <p className="text-gray-500">{appointment.appointment_date} at {appointment.appointment_time}</p>
        </div>
        <span className={`${statusColors[status]} px-3 py-1 rounded-full text-sm font-medium`}>
          {status}
        </span>
      </div>

      {status === 'pending' && (
        <div className="flex gap-3 mt-4">
          <button
            onClick={() => updateStatus('approved')}
            disabled={loading}
            className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600 disabled:opacity-50"
          >
            Approve
          </button>
          <button
            onClick={() => updateStatus('rejected')}
            disabled={loading}
            className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 disabled:opacity-50"
          >
            Reject
          </button>
        </div>
      )}

      {status === 'approved' && (
        <button
          onClick={() => updateStatus('completed')}
          disabled={loading}
          className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-600 disabled:opacity-50"
        >
          Mark Completed
        </button>
      )}
    </div>
  );
}