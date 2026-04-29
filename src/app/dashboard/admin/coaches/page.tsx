'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Mail, Phone, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { AddCoachModal } from './AddCoachModal';
import { useCoaches } from '@/lib/hooks/useCoaches';
import styles from './coaches.module.css';

export default function CoachesPage() {
  const router = useRouter();
  const { coaches, isLoaded, addCoach, updateCoach, deleteCoach } = useCoaches();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCoach, setEditingCoach] = useState<any>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleSaveCoach = (data: any) => {
    const fullName = `${data.firstName} ${data.middleName ? data.middleName + ' ' : ''}${data.lastName}`;
    const initials = (data.firstName[0] + data.lastName[0]).toUpperCase();
    
    const coachData = {
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      name: fullName,
      specialization: data.bio || 'Coach',
      email: data.email,
      phone: `${data.countryCode} ${data.mobile}`,
      initials: initials,
      photo: data.photo,
      countryCode: data.countryCode,
      mobile: data.mobile,
      country: data.country,
      city: data.city,
      bio: data.bio,
      dob: data.dob
    };

    if (editingCoach) {
      updateCoach(editingCoach.id, coachData);
      setToastMessage('Coach updated successfully!');
    } else {
      addCoach(coachData);
      setToastMessage('Coach registered successfully!');
    }

    setIsModalOpen(false);
    setEditingCoach(null);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleEdit = (e: React.MouseEvent, coach: any) => {
    e.stopPropagation();
    setEditingCoach(coach);
    setIsModalOpen(true);
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this coach?')) {
      try {
        deleteCoach(id);
        setToastMessage('Coach deleted successfully!');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      } catch (error) {
        console.error('Delete failed:', error);
        alert('Failed to delete coach. Your storage might be full.');
      }
    }
  };

  const openAddModal = () => {
    setEditingCoach(null);
    setIsModalOpen(true);
  };

  if (!isLoaded) return <div className={styles.container}>Loading...</div>;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleArea}>
          <h1 className={styles.title}>Coaches</h1>
          <p className={styles.subtitle}>Welcome back to the academy</p>
        </div>
        <Button className={styles.addBtn} onClick={openAddModal}>
          <Plus size={18} />
          Add Coach
        </Button>
      </header>

      <div className={styles.grid}>
        {coaches.map((coach) => (
          <div 
            key={coach.id} 
            className={styles.card}
            onClick={() => router.push(`/dashboard/admin/coaches/${coach.id}`)}
            style={{ cursor: 'pointer' }}
          >
            <div className={styles.cardActions}>
              <button className={styles.actionIcon} onClick={(e) => handleEdit(e, coach)}>
                <Pencil size={16} />
              </button>
              <button className={`${styles.actionIcon} ${styles.deleteIcon}`} onClick={(e) => handleDelete(e, coach.id)}>
                <Trash2 size={16} />
              </button>
            </div>

            <div className={styles.avatarArea}>
              {coach.photo ? (
                <img src={coach.photo} alt={coach.name} className={styles.avatarImage} />
              ) : (
                <div className={styles.avatar}>{coach.initials}</div>
              )}
            </div>
            <div className={styles.cardInfo}>
              <h3 className={styles.coachName}>{coach.name}</h3>
              <p className={styles.role}>CHESS COACH</p>
              <p className={styles.specialization}><i>"{coach.specialization}"</i></p>
            </div>
            
            <div className={styles.divider} />
            
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <Mail size={16} />
                <span>{coach.email}</span>
              </div>
              <div className={styles.contactItem}>
                <Phone size={16} />
                <span>{coach.phone}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AddCoachModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setEditingCoach(null);
        }} 
        onSave={handleSaveCoach}
        initialData={editingCoach}
      />

      {showToast && (
        <div className={styles.toast}>
          {toastMessage}
        </div>
      )}
    </div>
  );
}
