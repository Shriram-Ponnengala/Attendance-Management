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

  useEffect(() => {
    const stored = localStorage.getItem('vca_coaches');
    if (stored) {
      try {
        setCoaches(JSON.parse(stored));
      } catch (e) {
        setCoaches(INITIAL_COACHES);
      }
    } else {
      setCoaches(INITIAL_COACHES);
      localStorage.setItem('vca_coaches', JSON.stringify(INITIAL_COACHES));
    }
    setIsLoaded(true);
  }, []);

  const saveCoaches = (newCoaches: Coach[]) => {
    setCoaches(newCoaches);
    localStorage.setItem('vca_coaches', JSON.stringify(newCoaches));
  };

  const addCoach = (coachData: Omit<Coach, 'id' | 'memberSince'>) => {
    const newCoach: Coach = {
      ...coachData,
      id: `c${Date.now()}`,
      memberSince: new Date().toISOString().split('T')[0]
    };
    saveCoaches([...coaches, newCoach]);
    return newCoach.id;
  };

  const updateCoach = (id: string, updates: Partial<Coach>) => {
    saveCoaches(coaches.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const deleteCoach = (id: string) => {
    saveCoaches(coaches.filter(c => c.id !== id));
  };

  return {
    coaches,
    isLoaded,
    addCoach,
    updateCoach,
    deleteCoach
  };
}
