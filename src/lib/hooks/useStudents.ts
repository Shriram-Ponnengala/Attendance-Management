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

  useEffect(() => {
    const stored = localStorage.getItem('vca_students');
    if (stored) {
      try {
        setStudents(JSON.parse(stored));
      } catch (e) {
        setStudents(INITIAL_STUDENTS);
      }
    } else {
      setStudents(INITIAL_STUDENTS);
      localStorage.setItem('vca_students', JSON.stringify(INITIAL_STUDENTS));
    }
    setIsLoaded(true);
  }, []);

  const saveStudents = (newStudents: Student[]) => {
    setStudents(newStudents);
    localStorage.setItem('vca_students', JSON.stringify(newStudents));
  };

  const addStudent = (studentData: Omit<Student, 'id' | 'name' | 'parentName' | 'memberSince' | 'status'>) => {
    const name = `${studentData.firstName} ${studentData.middleName ? studentData.middleName + ' ' : ''}${studentData.lastName}`;
    const parentName = `${studentData.parentFirstName} ${studentData.parentMiddleName ? studentData.parentMiddleName + ' ' : ''}${studentData.parentLastName}`;
    
    const newStudent: Student = {
      ...studentData,
      id: `s${Date.now()}`,
      name,
      parentName,
      status: 'active',
      memberSince: new Date().toISOString().split('T')[0]
    };
    
    saveStudents([...students, newStudent]);
    return newStudent.id;
  };

  const updateStudent = (id: string, updates: Partial<Student>) => {
    saveStudents(students.map(s => {
      if (s.id === id) {
        const updated = { ...s, ...updates };
        // Recalculate full names if components changed
        if (updates.firstName || updates.lastName || updates.middleName) {
          updated.name = `${updated.firstName} ${updated.middleName ? updated.middleName + ' ' : ''}${updated.lastName}`;
        }
        if (updates.parentFirstName || updates.parentLastName || updates.parentMiddleName) {
          updated.parentName = `${updated.parentFirstName} ${updated.parentMiddleName ? updated.parentMiddleName + ' ' : ''}${updated.parentLastName}`;
        }
        return updated;
      }
      return s;
    }));
  };

  const deleteStudent = (id: string) => {
    saveStudents(students.filter(s => s.id !== id));
  };

  return {
    students,
    isLoaded,
    addStudent,
    updateStudent,
    deleteStudent
  };
}
