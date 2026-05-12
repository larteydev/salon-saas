'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function BookingForm({ salonId, services }) {
  const [formData, setFormData] = useState({
    service_id: '',
    appointment_date: '',
    appointment_time: '',
    customer_name: '',
    customer_phone: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from('appointments').insert({
      salon_id: salonId,
      ...formData,
      status: 'pending',
    });

    setLoading(false);

    if (error) {
      alert('Something went wrong. Please try again.');
    } else {
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <h3 className="text-2xl font-bold text-green-600">Booking Received!</h3>
        <p className="mt-2 text-gray-500">We will contact you shortly to confirm.</p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 bg-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-pink-700"
        >
          Book Another Appointment
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto">
      <select
        name="service_id"
        value={formData.service_id}
        onChange={handleChange}
        required
        className="border rounded-lg p-3"
      >
        <option value="">Select a service</option>
        {services.map((s) => (
          <option key={s.id} value={s.id}>{s.name}</option>
        ))}
      </select>

      <input
        type="date"
        name="appointment_date"
        value={formData.appointment_date}
        onChange={handleChange}
        required
        className="border rounded-lg p-3"
      />

      <input
        type="time"
        name="appointment_time"
        value={formData.appointment_time}
        onChange={handleChange}
        required
        className="border rounded-lg p-3"
      />

      <input
        type="text"
        name="customer_name"
        placeholder="Your name"
        value={formData.customer_name}
        onChange={handleChange}
        required
        className="border rounded-lg p-3"
      />

      <input
        type="tel"
        name="customer_phone"
        placeholder="Your phone number"
        value={formData.customer_phone}
        onChange={handleChange}
        required
        className="border rounded-lg p-3"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-pink-600 text-white py-3 rounded-lg font-medium hover:bg-pink-700 disabled:opacity-50"
      >
        {loading ? 'Booking...' : 'Book Appointment'}
      </button>
    </form>
  );
}