'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Calendar, BookOpen, LogOut, CheckSquare } from 'lucide-react';
import styles from './Sidebar.module.css';

interface SidebarProps {
  role: 'ADMIN' | 'COACH' | 'STUDENT';
}

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();

  const adminLinks = [
    { href: '/dashboard/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/dashboard/admin/users', label: 'Users', icon: Users },
    { href: '/dashboard/admin/classes', label: 'Classes', icon: Calendar },
    { href: '/dashboard/admin/materials', label: 'Materials', icon: BookOpen },
  ];

  const coachLinks = [
    { href: '/dashboard/coach', label: 'My Classes', icon: Calendar },
    { href: '/dashboard/coach/attendance', label: 'Mark Attendance', icon: CheckSquare },
  ];

  const studentLinks = [
    { href: '/dashboard/student', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/dashboard/student/attendance', label: 'My Attendance', icon: CheckSquare },
    { href: '/dashboard/student/materials', label: 'Study Materials', icon: BookOpen },
  ];

  let links = studentLinks;
  if (role === 'ADMIN') links = adminLinks;
  if (role === 'COACH') links = coachLinks;

  const handleLogout = async () => {
    // We will implement this later with auth
    window.location.href = '/';
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoContainer}>
        {/* Placeholder for logo */}
        <div style={{ width: 32, height: 32, backgroundColor: 'var(--secondary)', borderRadius: '50%' }} />
        <span className={styles.logoText}>Venture Chess</span>
      </div>
      
      <nav className={styles.nav}>
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
          
          return (
            <Link 
              key={link.href} 
              href={link.href} 
              className={`${styles.navLink} ${isActive ? styles.active : ''}`}
            >
              <Icon size={20} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className={styles.footer}>
        <button onClick={handleLogout} className={styles.logoutBtn}>
          <LogOut size={20} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
