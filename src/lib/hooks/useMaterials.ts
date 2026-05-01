'use client';

import { useState, useEffect } from 'react';

export interface Material {
  id: string;
  title: string;
  fileUrl: string;
  classId?: string;
  uploadedBy: string;
  createdAt: string;
  class?: { className: string };
  uploader?: { username: string };
}

export function useMaterials() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMaterials = async () => {
    try {
      const res = await fetch('/api/materials');
      if (!res.ok) throw new Error('Failed to fetch materials');
      const data = await res.json();
      setMaterials(data);
      setIsLoaded(true);
    } catch (err: any) {
      setError(err.message);
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const addMaterial = async (data: { title: string; fileUrl: string; classId?: string }) => {
    try {
      const res = await fetch('/api/materials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to upload material');
      const newMaterial = await res.json();
      setMaterials(prev => [newMaterial, ...prev]);
      return newMaterial.id;
    } catch (err: any) {
      alert(err.message);
      return null;
    }
  };

  const deleteMaterial = async (id: string) => {
    try {
      const res = await fetch(`/api/materials/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete material');
      setMaterials(prev => prev.filter(m => m.id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  return {
    materials,
    isLoaded,
    error,
    addMaterial,
    deleteMaterial,
    refresh: fetchMaterials
  };
}
