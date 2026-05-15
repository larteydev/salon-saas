'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase-browser';

export default function ServiceForm({ salonId, onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
  });
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const { data: newService, error } = await supabase.from('services').insert({
      salon_id: salonId,
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      duration: parseInt(formData.duration),
    })
    .select()
    .single();

    setLoading(false);

    if (!error) {
      setFormData({ name: '', description: '', price: '', duration: '' });
      onSuccess(newService);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-xl">
      <input
        type="text"
        name="name"
        placeholder="Service name"
        value={formData.name}
        onChange={handleChange}
        required
        className="bg-white border border-stone-200 rounded-xl px-4 py-3 text-stone-900 placeholder-stone-400 focus:outline-none focus:border-rose-400 transition-colors"
      />
      <input
        type="text"
        name="description"
        placeholder="Description (optional)"
        value={formData.description}
        onChange={handleChange}
        className="bg-white border border-stone-200 rounded-xl px-4 py-3 text-stone-900 placeholder-stone-400 focus:outline-none focus:border-rose-400 transition-colors"
      />
      <div className="flex gap-4">
        <input
          type="number"
          name="price"
          placeholder="Price (GHS)"
          value={formData.price}
          onChange={handleChange}
          required
          className="bg-white border border-stone-200 rounded-xl px-4 py-3 text-stone-900 placeholder-stone-400 focus:outline-none focus:border-rose-400 transition-colors w-full"
        />
        <input
          type="number"
          name="duration"
          placeholder="Duration (mins)"
          value={formData.duration}
          onChange={handleChange}
          className="bg-white border border-stone-200 rounded-xl px-4 py-3 text-stone-900 placeholder-stone-400 focus:outline-none focus:border-rose-400 transition-colors w-full"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-stone-900 text-white py-3 rounded-xl font-medium hover:bg-stone-700 active:scale-[0.98] transition-all disabled:opacity-50"
      >
        {loading ? 'Adding...' : 'Add Service'}
      </button>
    </form>
  );
}
