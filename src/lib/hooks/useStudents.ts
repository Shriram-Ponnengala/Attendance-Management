'use client';

import { useState, useEffect } from 'react';

export interface Student {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  name: string;
  email: string;
  parentFirstName: string;
  parentMiddleName?: string;
  parentLastName: string;
  parentName: string;
  mobile: string;
  countryCode: string;
  secParentFirstName?: string;
  secParentMiddleName?: string;
  secParentLastName?: string;
  dob: string;
  country: string;
  city: string;
  status: 'active' | 'inactive';
  memberSince: string;
  program?: string; // Default or assigned program
}

const INITIAL_STUDENTS: Student[] = [
  {
    id: 's1',
    firstName: 'Arjun',
    lastName: 'Kumar',
    name: 'Arjun Kumar',
    email: 'arjun.k@example.com',
    parentFirstName: 'Amit',
    parentLastName: 'Kumar',
    parentName: 'Amit Kumar',
    mobile: '9876543210',
    countryCode: '+91',
    dob: '2015-05-20',
    country: 'India',
    city: 'Mumbai',
    status: 'active',
    memberSince: '2023-01-10',
    program: 'Pawn Batch'
  },
  {
    id: 's2',
    firstName: 'Priya',
    lastName: 'Sharma',
    name: 'Priya Sharma',
    email: 'priya.s@example.com',
    parentFirstName: 'Rajesh',
    parentLastName: 'Sharma',
    parentName: 'Rajesh Sharma',
    mobile: '9876543211',
    countryCode: '+91',
    dob: '2014-08-15',
    country: 'India',
    city: 'Delhi',
    status: 'active',
    memberSince: '2023-02-12',
    program: 'Rook Batch'
  },
  {
    id: 's3',
    firstName: 'Alice',
    lastName: 'Smith',
    name: 'Alice Smith',
    email: 'alice.s@example.com',
    parentFirstName: 'Bob',
    parentLastName: 'Smith',
    parentName: 'Bob Smith',
    mobile: '1234567890',
    countryCode: '+1',
    dob: '2016-03-10',
    country: 'USA',
    city: 'New York',
    status: 'active',
    memberSince: '2023-03-05',
    program: 'Pawn Batch'
  }
];

export function useStudents() {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchStudents = async () => {
    try {
      const res = await fetch('/api/users?role=STUDENT');
      if (!res.ok) throw new Error('Failed to fetch students');
      const data = await res.json();
      const mapped = data.map((u: any) => ({
        ...u,
        name: `${u.firstName || ''} ${u.middleName ? u.middleName + ' ' : ''}${u.lastName || ''}`.trim() || u.username,
        parentName: `${u.parentFirstName || ''} ${u.parentMiddleName ? u.parentMiddleName + ' ' : ''}${u.parentLastName || ''}`.trim(),
        memberSince: u.createdAt ? u.createdAt.split('T')[0] : '',
        status: u.status || 'active'
      }));
      setStudents(mapped);
      setIsLoaded(true);
    } catch (e) {
      console.error('Fetch students error:', e);
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const addStudent = async (studentData: Omit<Student, 'id' | 'name' | 'parentName' | 'memberSince' | 'status'>) => {
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...studentData,
          username: studentData.email, // Use email as username
          role: 'STUDENT'
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to add student');
      }
      await fetchStudents();
      return true;
    } catch (error: any) {
      alert(error.message);
      return false;
    }
  };

  const updateStudent = async (id: string, updates: Partial<Student>) => {
    try {
      const res = await fetch(`/api/users/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error('Failed to update student');
      await fetchStudents();
    } catch (error: any) {
      alert(error.message);
    }
  };

  const deleteStudent = async (id: string) => {
    try {
      const res = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete student');
      setStudents(prev => prev.filter(s => s.id !== id));
    } catch (error: any) {
      alert(error.message);
    }
  };

  return {
    students,
    isLoaded,
    addStudent,
    updateStudent,
    deleteStudent,
    refresh: fetchStudents
  };
}
