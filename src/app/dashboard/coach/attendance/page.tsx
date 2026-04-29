'use client';

import React, { useState } from 'react';
import { CheckSquare, Calendar, Users, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import styles from './attendance.module.css';

export default function AttendancePage() {
  const [students, setStudents] = useState([
    { id: '1', name: 'Shriram P', status: 'PRESENT' },
    { id: '2', name: 'Rahul S', status: 'ABSENT' },
    { id: '3', name: 'Aditi K', status: 'PRESENT' },
    { id: '4', name: 'Karthik R', status: 'PRESENT' },
    { id: '5', name: 'Sneha L', status: 'PRESENT' },
  ]);

  const toggleStatus = (id: string) => {
    setStudents(students.map(s => 
      s.id === id ? { ...s, status: s.status === 'PRESENT' ? 'ABSENT' : 'PRESENT' } : s
    ));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>Mark Attendance</h1>
          <p className={styles.subtitle}>Beginners Fundamentals • April 26, 2026</p>
        </div>
        <Button className={styles.saveBtn}>
          Save Attendance
        </Button>
      </div>

      <div className={styles.stats}>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Total Students</span>
          <span className={styles.statValue}>{students.length}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Present</span>
          <span className={styles.statValue} style={{ color: '#10b981' }}>
            {students.filter(s => s.status === 'PRESENT').length}
          </span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Absent</span>
          <span className={styles.statValue} style={{ color: '#ef4444' }}>
            {students.filter(s => s.status === 'ABSENT').length}
          </span>
        </div>
      </div>

      <div className={styles.studentList}>
        {students.map((student) => (
          <div key={student.id} className={styles.studentItem}>
            <div className={styles.studentInfo}>
              <div className={styles.avatar}>
                {student.name.substring(0, 1)}
              </div>
              <span className={styles.studentName}>{student.name}</span>
            </div>
            <div className={styles.statusActions}>
              <button 
                onClick={() => toggleStatus(student.id)}
                className={student.status === 'PRESENT' ? styles.presentBtn : styles.absentBtn}
              >
                {student.status}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
