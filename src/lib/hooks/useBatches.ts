'use client';

import { useState, useEffect } from 'react';

export interface BatchHistoryRecord {
  id: string;
  date: string;
  day: string;
  presentCount: number;
  totalCount: number;
  status: 'completed' | 'cancelled' | 'makeup';
  attendanceRecords: { studentId: string; status: 'present' | 'absent' | 'makeup' }[];
}

export interface Batch {
  id: string;
  name: string;
  program: string;
  coach: string;
  type: 'Group' | 'One-on-One';
  startDate: string;
  days: string[];
  startTime: string;
  endTime: string;
  students: string[]; // array of student IDs
  status: 'active' | 'inactive';
  history: BatchHistoryRecord[];
}

const INITIAL_BATCHES: Batch[] = [
  {
    id: 'b1',
    name: 'Weekend Pawn Beginners',
    program: 'Pawn Batch',
    coach: 'Judit Polgar',
    type: 'Group',
    startDate: '2023-01-07',
    days: ['SAT', 'SUN'],
    startTime: '10:00',
    endTime: '11:00',
    students: ['s1'],
    status: 'active',
    history: []
  },
  {
    id: 'b2',
    name: 'Advanced Rook Strategy',
    program: 'Rook Batch',
    coach: 'Magnus Carlsen',
    type: 'Group',
    startDate: '2023-01-04',
    days: ['WED', 'FRI'],
    startTime: '18:00',
    endTime: '19:30',
    students: ['s1', 's2'],
    status: 'active',
    history: [
      {
        id: 'h1',
        date: '2023-01-04',
        day: 'Wednesday',
        presentCount: 2,
        totalCount: 2,
        status: 'completed',
        attendanceRecords: [
          { studentId: 's1', status: 'present' },
          { studentId: 's2', status: 'present' }
        ]
      }
    ]
  }
];

export function useBatches() {
  const [batches, setBatches] = useState<Batch[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('vca_batches');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Basic schema validation: if it doesn't have an id or students isn't an array, it's old data
        if (Array.isArray(parsed) && parsed.length > 0 && (!parsed[0].id || !Array.isArray(parsed[0].students))) {
          console.warn('Old batch data detected, resetting to initial batches.');
          setBatches(INITIAL_BATCHES);
          localStorage.setItem('vca_batches', JSON.stringify(INITIAL_BATCHES));
        } else {
          setBatches(parsed);
        }
      } catch (e) {
        setBatches(INITIAL_BATCHES);
        localStorage.setItem('vca_batches', JSON.stringify(INITIAL_BATCHES));
      }
    } else {
      setBatches(INITIAL_BATCHES);
      localStorage.setItem('vca_batches', JSON.stringify(INITIAL_BATCHES));
    }
    setIsLoaded(true);
  }, []);

  const saveBatches = (newBatches: Batch[]) => {
    setBatches(newBatches);
    localStorage.setItem('vca_batches', JSON.stringify(newBatches));
  };

  const addBatch = (batch: Omit<Batch, 'id' | 'students' | 'history' | 'status'>) => {
    const newBatch: Batch = {
      ...batch,
      id: `b${Date.now()}`,
      students: [],
      history: [],
      status: 'active'
    };
    saveBatches([...batches, newBatch]);
    return newBatch.id;
  };

  const updateBatch = (id: string, updates: Partial<Batch>) => {
    saveBatches(batches.map(b => b.id === id ? { ...b, ...updates } : b));
  };

  const deleteBatch = (id: string) => {
    saveBatches(batches.filter(b => b.id !== id));
  };

  const enrollStudent = (batchId: string, studentId: string) => {
    saveBatches(batches.map(b => {
      if (b.id === batchId && !b.students.includes(studentId)) {
        return { ...b, students: [...b.students, studentId] };
      }
      return b;
    }));
  };

  const unenrollStudent = (batchId: string, studentId: string) => {
    saveBatches(batches.map(b => {
      if (b.id === batchId) {
        return { ...b, students: b.students.filter(id => id !== studentId) };
      }
      return b;
    }));
  };

  const addHistoryRecord = (batchId: string, record: Omit<BatchHistoryRecord, 'id'>) => {
    saveBatches(batches.map(b => {
      if (b.id === batchId) {
        const newRecord = { ...record, id: `h${Date.now()}` };
        return { ...b, history: [newRecord, ...(b.history || [])] };
      }
      return b;
    }));
  };

  return {
    batches,
    isLoaded,
    addBatch,
    updateBatch,
    deleteBatch,
    enrollStudent,
    unenrollStudent,
    addHistoryRecord
  };
}

export const MOCK_STUDENTS = [
  { id: 's1', name: 'Arjun Kumar', email: 'arjun.k@example.com' },
  { id: 's2', name: 'Priya Sharma', email: 'priya.s@example.com' },
  { id: 's3', name: 'Rohan Patel', email: 'rohan.p@example.com' },
];

export const MOCK_COACHES = [
  'Magnus Carlsen',
  'Judit Polgar',
  'Shriram Ponnengala',
  'Viswanathan Anand',
  'Garry Kasparov'
];

export const PROGRAM_OPTIONS = [
  'Pawn Batch',
  'Knight Batch',
  'Bishop Batch',
  'Rook Batch',
  'Queen Batch',
  'King Batch'
];
