'use client';

import { useRouter } from 'next/navigation';
import { Users, Layers, GraduationCap, Clock } from 'lucide-react';
import { useStudents } from '@/lib/hooks/useStudents';
import { useBatches } from '@/lib/hooks/useBatches';
import { useCoaches } from '@/lib/hooks/useCoaches';
import styles from './Dashboard.module.css';

export default function AdminDashboard() {
  const router = useRouter();
  const { students } = useStudents();
  const { batches } = useBatches();
  const { coaches } = useCoaches();

  const stats = [
    { label: 'Total Students', value: students.length.toString(), icon: Users, href: '/dashboard/admin/students' },
    { label: 'Active Batches', value: batches.length.toString(), icon: Layers, href: '/dashboard/admin/batches' },
    { label: 'Academy Coaches', value: coaches.length.toString(), icon: GraduationCap, href: '/dashboard/admin/coaches' },
  ];


  const todayClasses: any[] = []; // Empty to match screenshot

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Dashboard</h1>
        <p className={styles.subtitle}>Welcome back to the academy</p>
      </header>

      <div className={styles.statsGrid}>
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div 
              key={i} 
              className={styles.statCard} 
              onClick={() => router.push(stat.href)}
              style={{ cursor: 'pointer' }}
            >
              <div className={styles.statHeader}>
                <div className={styles.statIconWrapper}>
                  <Icon size={20} />
                </div>
                <div className={styles.statDecoration}>
                  <Icon size={64} className={styles.bgIcon} />
                </div>
              </div>
              <div className={styles.statContent}>
                <h3 className={styles.statValue}>{stat.value}</h3>
                <p className={styles.statLabel}>{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>


      <div className={styles.chartsGrid}>
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h3 className={styles.chartTitle}>Student Attendance</h3>
            <div className={styles.chartLegend}>
              <div className={styles.legendItem}>
                <div className={styles.legendDot} style={{ background: '#3D1A0E' }} />
                <span>Present</span>
              </div>
              <div className={styles.legendItem}>
                <div className={styles.legendDot} style={{ background: '#EADBC8' }} />
                <span>Absent</span>
              </div>
            </div>
          </div>
          <div className={styles.chartBody}>
            {[
              { label: 'Mon', present: 85, absent: 15 },
              { label: 'Tue', present: 70, absent: 30 },
              { label: 'Wed', present: 90, absent: 10 },
              { label: 'Thu', present: 65, absent: 35 },
              { label: 'Fri', present: 80, absent: 20 },
              { label: 'Sat', present: 95, absent: 5 },
              { label: 'Sun', present: 88, absent: 12 },
            ].map((day, i) => (
              <div key={i} className={styles.barGroup}>
                <div 
                  className={styles.bar} 
                  style={{ height: `${day.present}%`, background: '#3D1A0E' }} 
                  data-value={`${day.present}%`}
                />
                <span className={styles.barLabel}>{day.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>



      <section className={styles.todaySection}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIcon}>
            <Clock size={24} />
          </div>
          <div className={styles.sectionTitleArea}>
            <h2 className={styles.sectionTitle}>Today's Classes</h2>
            <p className={styles.sectionDate}>Monday, April 27</p>
          </div>
        </div>

        {todayClasses.length > 0 ? (
          <div className={styles.classesList}>
            {todayClasses.map((cls, i) => (
              <div key={i} className={styles.classRow}>
                <div className={styles.timeBlock}>
                  <span className={styles.timeBold}>{cls.time}</span>
                  <span className={styles.timeLabel}>{cls.label}</span>
                </div>
                
                <div className={styles.batchInfo}>
                  <h4 className={styles.batchName}>{cls.batch}</h4>
                  <span className={styles.programBadge}>{cls.program}</span>
                </div>

                <div className={styles.coachInfo}>
                  <div className={styles.coachDot} />
                  <span className={styles.coachName}>{cls.coach}</span>
                  <span className={styles.separator}>•</span>
                  <span className={styles.groupLabel}>{cls.type}</span>
                </div>

                <div className={styles.timeRange}>
                  <div className={styles.rangeBadge}>
                    <Clock size={14} />
                    <span>{cls.range}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyIconBox}>
              <Clock size={32} />
            </div>
            <p className={styles.emptyText}>No classes scheduled for today.</p>
          </div>
        )}
      </section>
    </div>
  );
}
