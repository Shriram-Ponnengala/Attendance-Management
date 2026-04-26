import React from 'react';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import styles from './layout.module.css';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;
  
  let role: 'ADMIN' | 'COACH' | 'STUDENT' = 'STUDENT';
  let username = 'User';

  if (token) {
    const payload = await verifyToken(token);
    if (payload) {
      role = payload.role;
      username = payload.username;
    }
  }

  return (
    <div className={styles.layout}>
      <Sidebar role={role} />
      <div className={styles.mainContent}>
        <Header title="Dashboard" userName={username} />
        <main className={styles.pageContent}>
          {children}
        </main>
      </div>
    </div>
  );
}
