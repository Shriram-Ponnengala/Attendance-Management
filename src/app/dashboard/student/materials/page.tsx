'use client';

import React from 'react';
import { BookOpen, Download, FileText, Search } from 'lucide-react';
import styles from './materials.module.css';

export default function StudentMaterialsPage() {
  const materials = [
    { id: '1', title: 'Sicilian Defense Openings', type: 'PDF', size: '2.4 MB', date: '2026-04-24' },
    { id: '2', title: 'Endgame Fundamentals', type: 'PDF', size: '1.8 MB', date: '2026-04-20' },
    { id: '3', title: 'Middle Game Tactics', type: 'PDF', size: '3.5 MB', date: '2026-04-18' },
    { id: '4', title: 'Pawn Structure Analysis', type: 'PDF', size: '1.2 MB', date: '2026-04-12' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Study Materials</h1>
        <p className={styles.subtitle}>Access chess guides and workbooks shared by your coaches.</p>
      </div>

      <div className={styles.searchBar}>
        <Search size={18} className={styles.searchIcon} />
        <input type="text" placeholder="Search materials..." className={styles.searchInput} />
      </div>

      <div className={styles.grid}>
        {materials.map((item) => (
          <div key={item.id} className={styles.card}>
            <div className={styles.iconWrapper}>
              <FileText size={32} />
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.materialTitle}>{item.title}</h3>
              <p className={styles.materialMeta}>{item.type} • {item.size}</p>
              <p className={styles.materialDate}>Added on {item.date}</p>
            </div>
            <button className={styles.downloadBtn}>
              <Download size={20} />
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
