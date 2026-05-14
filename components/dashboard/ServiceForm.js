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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
      <input
        type="text"
        name="name"
        placeholder="Service name"
        value={formData.name}
        onChange={handleChange}
        required
        className="border rounded-lg p-3"
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="border rounded-lg p-3"
      />
      <input
        type="number"
        name="price"
        placeholder="Price (GHS)"
        value={formData.price}
        onChange={handleChange}
        required
        className="border rounded-lg p-3"
      />
      <input
        type="number"
        name="duration"
        placeholder="Duration (mins)"
        value={formData.duration}
        onChange={handleChange}
        className="border rounded-lg p-3"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-pink-600 text-white py-3 rounded-lg font-medium hover:bg-pink-700 disabled:opacity-50"
      >
        {loading ? 'Adding...' : 'Add Service'}
      </button>
    </form>
  );
}
