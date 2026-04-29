'use client';

import React from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { AlertTriangle } from 'lucide-react';
import styles from './ConfirmModal.module.css';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  confirmVariant?: 'primary' | 'secondary' | 'outline' | 'ghost';
}

export function ConfirmModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmLabel = 'Confirm',
  confirmVariant = 'primary'
}: ConfirmModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className={styles.container}>
        <div className={styles.iconArea}>
          <AlertTriangle size={32} className={styles.icon} />
        </div>
        <p className={styles.message}>{message}</p>
        <div className={styles.actions}>
          <Button variant="outline" onClick={onClose} className={styles.btn}>Cancel</Button>
          <Button 
            variant={confirmVariant} 
            onClick={() => {
              onConfirm();
              onClose();
            }} 
            className={styles.btn}
            style={confirmVariant === 'primary' ? { backgroundColor: '#ef4444' } : {}}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
