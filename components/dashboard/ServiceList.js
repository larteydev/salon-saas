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
    <div className="flex flex-col gap-3 max-w-xl">
      {initialServices.map((service) => (
        <div key={service.id} className="bg-white rounded-2xl p-5 border border-stone-100 shadow-sm flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-stone-900">{service.name}</p>
            {service.description && (
              <p className="text-stone-400 text-sm">{service.description}</p>
            )}
            <p className="text-rose-500 font-medium mt-1">
              GHS {service.price}
              {service.duration ? <span className="text-stone-400 font-normal"> · {service.duration} mins</span> : null}
            </p>
          </div>
          <button
            onClick={() => handleDelete(service.id)}
            className="text-stone-300 hover:text-red-400 transition-colors text-sm ml-4 mt-1"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}