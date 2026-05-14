'use client';

import { createClient } from '@/lib/supabase-browser';

export default function ServiceList({ initialServices, onDelete }) {
  const supabase = createClient();

  async function handleDelete(id) {
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id);

    if (!error) {
      onDelete(id);
    }
  }

  if (!initialServices || initialServices.length === 0) {
    return <p className="text-gray-400">No services yet.</p>;
  }

  return (
    <div className="flex flex-col gap-4 max-w-md">
      {initialServices.map((service) => (
        <div key={service.id} className="border rounded-xl p-4 flex justify-between items-start">
          <div>
            <p className="font-semibold">{service.name}</p>
            <p className="text-gray-500 text-sm">{service.description}</p>
            <p className="text-pink-600 font-medium mt-1">GHS {service.price} · {service.duration} mins</p>
          </div>
          <button
            onClick={() => handleDelete(service.id)}
            className="text-red-500 text-sm hover:underline ml-4"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}