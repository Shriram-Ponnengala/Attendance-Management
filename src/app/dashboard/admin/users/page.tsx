'use client';

import React, { useState, useEffect } from 'react';
import { UserPlus, Search, Edit2, Trash2, Filter } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import styles from './users.module.css';

export default function UsersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([
    { id: '1', username: 'shriram_p', role: 'STUDENT', createdAt: '2026-04-20' },
    { id: '2', username: 'coach_vikram', role: 'COACH', createdAt: '2026-04-15' },
    { id: '3', username: 'admin_user', role: 'ADMIN', createdAt: '2026-04-01' },
    { id: '4', username: 'priya_m', role: 'COACH', createdAt: '2026-04-18' },
    { id: '5', username: 'rahul_s', role: 'STUDENT', createdAt: '2026-04-22' },
  ]);

  const [search, setSearch] = useState('');

  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(search.toLowerCase()) ||
    user.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>User Management</h1>
          <p className={styles.subtitle}>Manage all academy members and their roles.</p>
        </div>
        <Button className={styles.addBtn} onClick={() => setIsModalOpen(true)}>
          <UserPlus size={18} />
          Add New User
        </Button>
      </div>

      <div className={styles.filters}>
        <div className={styles.searchWrapper}>
          <Search size={18} className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Search users..." 
            className={styles.searchInput}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline" className={styles.filterBtn}>
          <Filter size={18} />
          Filter
        </Button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Username</th>
              <th>Role</th>
              <th>Joined Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className={styles.userCell}>
                    <div className={styles.avatar}>
                      {user.username.substring(0, 1).toUpperCase()}
                    </div>
                    <span className={styles.username}>{user.username}</span>
                  </div>
                </td>
                <td>
                  <Badge variant={user.role === 'ADMIN' ? 'success' : user.role === 'COACH' ? 'info' : 'warning'}>
                    {user.role}
                  </Badge>
                </td>
                <td>{user.createdAt}</td>
                <td>
                  <div className={styles.actions}>
                    <button className={styles.actionBtn} title="Edit">
                      <Edit2 size={16} />
                    </button>
                    <button className={styles.actionBtnDelete} title="Delete">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
