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
    <div>
      <label className="block text-sm font-medium text-stone-600 mb-3">
        Select images to upload (multiple allowed)
      </label>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleUpload}
        disabled={uploading}
        className="block w-full max-w-xl text-sm text-stone-500
          file:mr-4 file:py-2 file:px-5
          file:rounded-xl file:border-0
          file:text-sm file:font-medium
          file:bg-stone-900 file:text-white
          hover:file:bg-stone-700
          disabled:opacity-50 cursor-pointer"
      />
      {uploading && (
        <p className="mt-3 text-stone-400 text-sm">
          Uploading {progress.done} of {progress.total}...
        </p>
      )}
      {message && (
        <p className="mt-3 text-green-600 text-sm">{message}</p>
      )}
    </div>
  );
}