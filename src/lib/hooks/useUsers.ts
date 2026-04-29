'use client';

import { useState, useEffect } from 'react';

export interface User {
  id: string;
  username: string;
  role: 'ADMIN' | 'COACH' | 'STUDENT';
  createdAt: string;
}

const INITIAL_USERS: User[] = [
  { id: '1', username: 'shriram_p', role: 'STUDENT', createdAt: '2026-04-20' },
  { id: '2', username: 'coach_vikram', role: 'COACH', createdAt: '2026-04-15' },
  { id: '3', username: 'admin_user', role: 'ADMIN', createdAt: '2026-04-01' },
  { id: '4', username: 'priya_m', role: 'COACH', createdAt: '2026-04-18' },
  { id: '5', username: 'rahul_s', role: 'STUDENT', createdAt: '2026-04-22' },
];

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('vca_users_mgmt');
    if (stored) {
      try {
        setUsers(JSON.parse(stored));
      } catch (e) {
        setUsers(INITIAL_USERS);
      }
    } else {
      setUsers(INITIAL_USERS);
      localStorage.setItem('vca_users_mgmt', JSON.stringify(INITIAL_USERS));
    }
    setIsLoaded(true);
  }, []);

  const saveUsers = (newUsers: User[]) => {
    setUsers(newUsers);
    localStorage.setItem('vca_users_mgmt', JSON.stringify(newUsers));
  };

  const addUser = (userData: Omit<User, 'id' | 'createdAt'>) => {
    const newUser: User = {
      ...userData,
      id: `u${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    saveUsers([...users, newUser]);
    return newUser.id;
  };

  const updateUser = (id: string, updates: Partial<User>) => {
    saveUsers(users.map(u => u.id === id ? { ...u, ...updates } : u));
  };

  const deleteUser = (id: string) => {
    saveUsers(users.filter(u => u.id !== id));
  };

  return {
    users,
    isLoaded,
    addUser,
    updateUser,
    deleteUser
  };
}
