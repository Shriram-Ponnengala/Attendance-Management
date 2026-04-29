'use client';

import { useRouter } from 'next/navigation';
import { Award } from 'lucide-react';
import styles from './student.module.css';

export default function StudentDashboard() {
  const router = useRouter();
  const stats = [
    { label: 'My Level', value: 'Intermediate', icon: Award, color: '#f59e0b' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.statsGrid}>
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className={styles.statCard}>
              <div className={styles.statIcon} style={{ backgroundColor: `${stat.color}10`, color: stat.color }}>
                <Icon size={24} />
              </div>
              <div className={styles.statInfo}>
                <p className={styles.statLabel}>{stat.label}</p>
                <h3 className={styles.statValue}>{stat.value}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
