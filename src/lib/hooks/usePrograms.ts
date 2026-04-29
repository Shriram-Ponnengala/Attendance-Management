'use client';

import { useState, useEffect } from 'react';

export interface Topic {
  id: string;
  title: string;
  description: string;
  order: number;
}

export interface Program {
  id: number;
  name: string;
  code: string;
  topics: Topic[];
}

const INITIAL_PROGRAMS: Program[] = [
  { 
    id: 1, 
    name: 'Pawn Batch', 
    code: 'PAWN', 
    order: 1,
    topics: [
      { id: 'p1', title: 'Chess Board Setup and Notation', description: 'Learn coordinates and piece placement', order: 1 },
      { id: 'p2', title: 'How Pieces Move', description: 'Detailed movement rules for all 6 pieces', order: 2 },
      { id: 'p3', title: 'Check, Checkmate, and Stalemate', description: 'End-game conditions and rules', order: 3 },
      { id: 'p4', title: 'Basic Opening Principles', description: 'Control the center and develop pieces', order: 4 },
      { id: 'p5', title: 'Simple Tactical Patterns', description: 'Introduction to forks and pins', order: 5 },
    ]
  },
  { 
    id: 2, 
    name: 'Knight Batch', 
    code: 'KNIGHT', 
    order: 2,
    topics: [
      { id: 'k1', title: 'Advanced Tactics: Forks and Pins', description: 'Mastering short-range tactical strikes', order: 1 },
      { id: 'k2', title: 'Opening Theory for Beginners', description: 'Common opening lines and traps', order: 2 },
      { id: 'k3', title: 'Endgame Fundamentals', description: 'King and pawn endings', order: 3 },
      { id: 'k4', title: 'Positional Play Basics', description: 'Understanding piece activity', order: 4 },
    ]
  },
  { id: 3, name: 'Bishop Batch', code: 'BISHOP', order: 3, topics: [] },
  { id: 4, name: 'Rook Batch', code: 'ROOK', order: 4, topics: [] },
  { id: 5, name: 'Queen Batch', code: 'QUEEN', order: 5, topics: [] },
  { id: 6, name: 'King Batch', code: 'KING', order: 6, topics: [] },
];

export function usePrograms() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('vca_programs');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setPrograms(parsed.sort((a: any, b: any) => a.order - b.order));
      } catch (e) {
        setPrograms(INITIAL_PROGRAMS);
      }
    } else {
      setPrograms(INITIAL_PROGRAMS);
      localStorage.setItem('vca_programs', JSON.stringify(INITIAL_PROGRAMS));
    }
    setIsLoaded(true);
  }, []);

  const savePrograms = (newPrograms: Program[]) => {
    const sorted = [...newPrograms].sort((a, b) => a.order - b.order);
    setPrograms(sorted);
    localStorage.setItem('vca_programs', JSON.stringify(sorted));
  };

  const addProgram = (name: string, code: string) => {
    const newId = programs.length > 0 ? Math.max(...programs.map(p => p.id)) + 1 : 1;
    const newOrder = programs.length > 0 ? Math.max(...programs.map(p => p.order)) + 1 : 1;
    const newProgram: Program = {
      id: newId,
      name,
      code,
      order: newOrder,
      topics: []
    };
    savePrograms([...programs, newProgram]);
    return newId;
  };

  const updateProgram = (id: number, updates: Partial<Program>) => {
    savePrograms(programs.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProgram = (id: number) => {
    savePrograms(programs.filter(p => p.id !== id));
  };

  const moveProgram = (id: number, direction: 'up' | 'down') => {
    const index = programs.findIndex(p => p.id === id);
    if (index === -1) return;
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === programs.length - 1) return;

    const newPrograms = [...programs];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Swap orders
    const tempOrder = newPrograms[index].order;
    newPrograms[index].order = newPrograms[targetIndex].order;
    newPrograms[targetIndex].order = tempOrder;

    savePrograms(newPrograms);
  };

  const updateTopics = (programId: number, topics: Topic[]) => {
    savePrograms(programs.map(p => p.id === programId ? { ...p, topics } : p));
  };

  return {
    programs,
    isLoaded,
    addProgram,
    updateProgram,
    deleteProgram,
    moveProgram,
    updateTopics
  };
}

