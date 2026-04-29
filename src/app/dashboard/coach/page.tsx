'use client';

import { useRouter } from 'next/navigation';
import { Users } from 'lucide-react';
import styles from './coach.module.css';

export default function CoachDashboard() {
  const router = useRouter();
  const stats = [
    { label: 'Total Students', value: '42', icon: Users, color: '#10b981' },
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
