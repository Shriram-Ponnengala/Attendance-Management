'use client';

import React, { useState } from 'react';
import { BookOpen, Upload, FileText, Download, Trash2, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import styles from './materials.module.css';

export default function MaterialsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [materials, setMaterials] = useState([
    { id: '1', title: 'Sicilian Defense Openings', type: 'PDF', size: '2.4 MB', uploadedBy: 'Priya', date: '2026-04-24' },
    { id: '2', title: 'Endgame Fundamentals', type: 'PDF', size: '1.8 MB', uploadedBy: 'Vikram', date: '2026-04-20' },
    { id: '3', title: 'Tactics Workbook Vol 1', type: 'PDF', size: '5.2 MB', uploadedBy: 'Admin', date: '2026-04-15' },
    { id: '4', title: 'Chess Strategy Guide', type: 'PDF', size: '3.1 MB', uploadedBy: 'Priya', date: '2026-04-10' },
  ]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>Study Materials</h1>
          <p className={styles.subtitle}>Upload and manage educational resources for students.</p>
        </div>
        <Button className={styles.uploadBtn} onClick={() => setIsModalOpen(true)}>
          <Upload size={18} />
          Upload Material
        </Button>
      </div>

      <div className={styles.actions}>
        <div className={styles.searchWrapper}>
          <Search size={18} className={styles.searchIcon} />
          <input type="text" placeholder="Search materials..." className={styles.searchInput} />
        </div>
      </div>

      <div className={styles.materialsList}>
        {materials.map((item) => (
          <div key={item.id} className={styles.materialItem}>
            <div className={styles.fileIcon}>
              <FileText size={24} />
            </div>
            <div className={styles.fileInfo}>
              <h3 className={styles.fileTitle}>{item.title}</h3>
              <p className={styles.fileMeta}>
                {item.type} • {item.size} • Uploaded by {item.uploadedBy} on {item.date}
              </p>
            </div>
            <div className={styles.fileActions}>
              <button className={styles.actionBtn} title="Download">
                <Download size={18} />
              </button>
              <button className={styles.actionBtnDelete} title="Delete">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Upload Study Material"
      >
        <form className={styles.modalForm} onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); alert('Material uploaded successfully!'); }}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Material Title</label>
            <input type="text" placeholder="e.g. Sicilian Defense Basics" className={styles.input} required />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Category</label>
            <select className={styles.select} required>
              <option value="Openings">Openings</option>
              <option value="Endgames">Endgames</option>
              <option value="Tactics">Tactics</option>
              <option value="Strategy">Strategy</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>File</label>
            <input type="file" className={styles.fileInput} required />
          </div>
          <Button type="submit" className={styles.saveBtn}>Upload</Button>
        </form>
      </Modal>
    </div>
  );
}
