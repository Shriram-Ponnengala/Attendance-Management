import { useRouter } from 'next/navigation';
import { BookOpen, Calendar, CheckSquare, Award } from 'lucide-react';
import styles from './student.module.css';

export default function StudentDashboard() {
  const router = useRouter();
  const stats = [
    { label: 'Attendance Rate', value: '95%', icon: CheckSquare, color: '#10b981' },
    { label: 'Classes Attended', value: '38', icon: Calendar, color: '#3b82f6' },
    { label: 'Study Materials', value: '12', icon: BookOpen, color: '#8b5cf6' },
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

      <div className={styles.mainGrid}>
        <div className={styles.upcomingClass}>
          <h2 className={styles.sectionTitle}>My Next Class</h2>
          <div className={styles.classCard}>
            <div className={styles.classDate}>
              <span className={styles.day}>MON</span>
              <span className={styles.date}>27</span>
            </div>
            <div className={styles.classDetails}>
              <h3 className={styles.className}>Intermediate Strategy</h3>
              <p className={styles.classInfo}>04:00 PM • Coach Priya</p>
              <div className={styles.classStatus}>Confirmed</div>
            </div>
          </div>
        </div>

        <div className={styles.recentMaterials}>
          <h2 className={styles.sectionTitle}>Recent Materials</h2>
          <div className={styles.materialList}>
            <div className={styles.materialItem}>
              <div className={styles.materialIcon}>
                <BookOpen size={20} />
              </div>
              <div className={styles.materialContent}>
                <p className={styles.materialTitle}>Sicilian Defense Openings</p>
                <span className={styles.materialMeta}>PDF • Added 2 days ago</span>
              </div>
              <button 
                className={styles.viewBtn}
                onClick={() => router.push('/dashboard/student/materials')}
              >
                View
              </button>
            </div>
            <div className={styles.materialItem}>
              <div className={styles.materialIcon}>
                <BookOpen size={20} />
              </div>
              <div className={styles.materialContent}>
                <p className={styles.materialTitle}>Endgame Fundamentals</p>
                <span className={styles.materialMeta}>PDF • Added 5 days ago</span>
              </div>
              <button className={styles.viewBtn}>View</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
