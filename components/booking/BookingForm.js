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

  const inputClass = "w-full border border-stone-200 rounded-xl px-4 py-3 text-stone-900 placeholder-stone-400 focus:outline-none focus:border-rose-400 transition-colors bg-white";

  if (submitted) {
    return (
      <div className="max-w-md py-12">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-stone-900">Booking Received</h3>
        <p className="mt-2 text-stone-500">We will contact you shortly to confirm your appointment.</p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 text-rose-500 font-medium hover:text-rose-600 transition-colors"
        >
          Book another appointment
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">Service</label>
        <select
          name="service_id"
          value={formData.service_id}
          onChange={handleChange}
          required
          className={inputClass}
        >
          <option value="">Select a service</option>
          {services.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">Date</label>
        <input
          type="date"
          name="appointment_date"
          value={formData.appointment_date}
          onChange={handleChange}
          required
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">Time</label>
        <input
          type="time"
          name="appointment_time"
          value={formData.appointment_time}
          onChange={handleChange}
          required
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">Your Name</label>
        <input
          type="text"
          name="customer_name"
          placeholder="Full name"
          value={formData.customer_name}
          onChange={handleChange}
          required
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">Phone Number</label>
        <input
          type="tel"
          name="customer_phone"
          placeholder="e.g. 0241234567"
          value={formData.customer_phone}
          onChange={handleChange}
          required
          className={inputClass}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-2 bg-stone-900 text-white py-3 rounded-xl font-medium hover:bg-stone-800 active:scale-[0.98] transition-all disabled:opacity-50"
      >
        {loading ? 'Booking...' : 'Book Appointment'}
      </button>
    </form>
  );
}