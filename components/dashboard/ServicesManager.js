'use client';

import { useState } from 'react';
import ServiceForm from './ServiceForm';
import ServiceList from './ServiceList';

export default function ServicesManager({ initialServices, salonId }) {
  const [services, setServices] = useState(initialServices);

  function handleUpdate(newService) {
    if (newService) {
      setServices((prev) => [...prev, newService]);
    }
  }

  function handleDelete(id) {
    setServices((prev) => prev.filter((s) => s.id !== id));
  }

  return (
    <section className="mt-12">
      <h2 className="text-xl font-semibold mb-4">Services</h2>
      <ServiceList
        initialServices={services}
        onDelete={handleDelete}
      />
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">Add New Service</h3>
        <ServiceForm salonId={salonId} onSuccess={handleUpdate} />
      </div>
    </section>
  );
}