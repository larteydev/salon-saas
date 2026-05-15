'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase-browser';

export default function GalleryUpload({ salonId }) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [message, setMessage] = useState('');
  const supabase = createClient();

  async function handleUpload(e) {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setUploading(true);
    setMessage('');
    setProgress({ done: 0, total: files.length });

    let successCount = 0;

    for (const file of files) {
      const fileName = `${salonId}/${Date.now()}-${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from('gallery')
        .upload(fileName, file);

      if (!uploadError) {
        const { data: { publicUrl } } = supabase.storage
          .from('gallery')
          .getPublicUrl(fileName);

        const { error: dbError } = await supabase
          .from('gallery_images')
          .insert({ salon_id: salonId, image_url: publicUrl });

        if (!dbError) successCount++;
      }

      setProgress((prev) => ({ ...prev, done: prev.done + 1 }));
    }

    setUploading(false);
    setMessage(`${successCount} of ${files.length} images uploaded successfully.`);
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Upload Gallery Images</h2>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleUpload}
        disabled={uploading}
        className="border rounded-lg p-3 w-full max-w-md"
      />
      {uploading && (
        <p className="mt-2 text-stone-500">
          Uploading {progress.done} of {progress.total}...
        </p>
      )}
      {message && <p className="mt-2 text-green-600">{message}</p>}
    </div>
  );
}