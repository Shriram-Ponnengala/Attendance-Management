import { useRouter } from 'next/navigation';
import { Calendar, CheckSquare, Users, Clock } from 'lucide-react';
import styles from './coach.module.css';

export default function CoachDashboard() {
  const router = useRouter();
  const stats = [
    { label: 'My Classes Today', value: '3', icon: Calendar, color: '#3b82f6' },
    { label: 'Total Students', value: '42', icon: Users, color: '#10b981' },
    { label: 'Pending Attendance', value: '1', icon: CheckSquare, color: '#f59e0b' },
    { label: 'Classes This Week', value: '15', icon: Clock, color: '#8b5cf6' },
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

      <div className={styles.todaySchedule}>
        <h2 className={styles.sectionTitle}>Today's Schedule</h2>
        <div className={styles.scheduleList}>
          <div className={styles.scheduleItem}>
            <div className={styles.timeInfo}>
              <span className={styles.time}>10:00 AM</span>
            </div>
            <div className={styles.classInfo}>
              <h3 className={styles.className}>Beginners Fundamentals</h3>
              <p className={styles.classDetails}>Room 1 • 12 Students</p>
            </div>
            <button 
              className={styles.actionBtn}
              onClick={() => router.push('/dashboard/coach/attendance')}
            >
              Mark Attendance
            </button>
          </div>
          <div className={styles.scheduleItem}>
            <div className={styles.timeInfo}>
              <span className={styles.time}>02:00 PM</span>
            </div>
            <div className={styles.classInfo}>
              <h3 className={styles.className}>Intermediate Strategy</h3>
              <p className={styles.classDetails}>Room 3 • 8 Students</p>
            </div>
            <button className={styles.actionBtnDisabled}>Upcoming</button>
          </div>
        </div>
      </div>
    </div>
  );
}
