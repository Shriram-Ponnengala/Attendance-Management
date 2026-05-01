'use client';

import React from 'react';
import { BookOpen, FileText, Upload, Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useMaterials } from '@/lib/hooks/useMaterials';
import styles from './materials.module.css';

export default function CoachMaterialsPage() {
  const { materials, isLoaded, deleteMaterial } = useMaterials();

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this material?')) {
      deleteMaterial(id);
    }
  };

  if (!isLoaded) return <div className={styles.container}>Loading materials...</div>;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleArea}>
          <h1 className={styles.title}>Study Materials</h1>
          <p className={styles.subtitle}>Upload and manage resources for your students</p>
        </div>
        <Button className={styles.uploadBtn}>
          <Upload size={18} />
          Upload Material
        </Button>
      </header>

      <div className={styles.grid}>
        {materials.map((item) => (
          <div key={item.id} className={styles.card}>
            <div className={styles.iconArea}>
              <FileText size={32} color="#ef4444" />
              <button 
                className={styles.deleteBtn}
                onClick={() => handleDelete(item.id)}
              >
                <Plus size={16} style={{ transform: 'rotate(45deg)' }} />
              </button>
            </div>
            <div className={styles.info}>
              <h3 className={styles.materialTitle}>{item.title}</h3>
              <p className={styles.batch}>{item.class?.className || 'Global'}</p>
              <p className={styles.date}>{new Date(item.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
        {materials.length === 0 && (
          <div className={styles.emptyState}>
            <p>No materials uploaded yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
