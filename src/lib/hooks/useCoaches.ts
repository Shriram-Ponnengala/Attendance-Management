'use client';

import { useState, useEffect } from 'react';

export interface Coach {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  name: string;
  specialization: string;
  email: string;
  phone: string;
  initials: string;
  photo?: string | null;
  countryCode?: string;
  mobile?: string;
  country?: string;
  city?: string;
  bio?: string;
  dob?: string;
  memberSince: string;
}

const INITIAL_COACHES: Coach[] = [
  { 
    id: '1',
    firstName: 'Magnus',
    lastName: 'Carlsen',
    name: 'Magnus Carlsen', 
    specialization: 'World Champion', 
    email: 'magnus@chess.com', 
    phone: '+47 900 00 000', 
    initials: 'MC',
    photo: null,
    memberSince: '2023-01-01'
  },
  { 
    id: '2',
    firstName: 'Judit',
    lastName: 'Polgar',
    name: 'Judit Polgar', 
    specialization: 'Grandmaster', 
    email: 'judit@chess.com', 
    phone: '+36 30 000 0000', 
    initials: 'JP',
    photo: null,
    memberSince: '2023-02-15'
  },
  { 
    id: '3',
    firstName: 'Shriram',
    lastName: 'Ponnengala',
    name: 'Shriram Ponnengala', 
    specialization: 'Academy Director', 
    email: 'shrmpnga@gmail.com', 
    phone: '+91 9567027370', 
    initials: 'SP',
    photo: null,
    memberSince: '2023-03-10'
  },
];

export function useCoaches() {
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchCoaches = async () => {
    try {
      const res = await fetch('/api/users?role=COACH');
      if (!res.ok) throw new Error('Failed to fetch coaches');
      const data = await res.json();
      const mapped = data.map((u: any) => ({
        ...u,
        name: `${u.firstName || ''} ${u.middleName ? u.middleName + ' ' : ''}${u.lastName || ''}`.trim() || u.username,
        initials: `${u.firstName?.[0] || ''}${u.lastName?.[0] || u.username?.[0] || ''}`.toUpperCase(),
        memberSince: u.createdAt ? u.createdAt.split('T')[0] : '',
        phone: u.mobile || u.phone || ''
      }));
      setCoaches(mapped);
      setIsLoaded(true);
    } catch (e) {
      console.error('Fetch coaches error:', e);
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    fetchCoaches();
  }, []);

  const addCoach = async (coachData: Omit<Coach, 'id' | 'memberSince'>) => {
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...coachData,
          username: coachData.email.split('@')[0], // Generate username from email
          role: 'COACH'
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to add coach');
      }
      await fetchCoaches();
      return true;
    } catch (error: any) {
      alert(error.message);
      return false;
    }
  };

  const updateCoach = async (id: string, updates: Partial<Coach>) => {
    try {
      const res = await fetch(`/api/users/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error('Failed to update coach');
      await fetchCoaches();
    } catch (error: any) {
      alert(error.message);
    }
  };

  const deleteCoach = async (id: string) => {
    try {
      const res = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete coach');
      setCoaches(prev => prev.filter(c => c.id !== id));
    } catch (error: any) {
      alert(error.message);
    }
  };

  return {
    coaches,
    isLoaded,
    addCoach,
    updateCoach,
    deleteCoach,
    refresh: fetchCoaches
  };
}
