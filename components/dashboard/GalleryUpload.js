'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase-browser';

export default function GalleryUpload({ salonId }) {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const supabase = createClient();

  async function handleUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setMessage('');

    const fileName = `${salonId}/${Date.now()}-${file.name}`;

    const { error: uploadError } = await supabase.storage
      .from('gallery')
      .upload(fileName, file);

    if (uploadError) {
      setMessage('Upload failed. Try again.');
      setUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('gallery')
      .getPublicUrl(fileName);

    const { error: dbError } = await supabase
      .from('gallery_images')
      .insert({ salon_id: salonId, image_url: publicUrl });

    if (dbError) {
      setMessage('Image saved to storage but failed to save to database.');
    } else {
      setMessage('Image uploaded successfully.');
    }

    setUploading(false);
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Upload Gallery Image</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        disabled={uploading}
        className="border rounded-lg p-3 w-full"
      />
      {uploading && <p className="mt-2 text-gray-500">Uploading...</p>}
      {message && <p className="mt-2 text-green-600">{message}</p>}
    </div>
  );
}