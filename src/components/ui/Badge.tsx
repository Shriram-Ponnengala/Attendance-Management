import React from 'react';
import styles from './Badge.module.css';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {}

export function Badge({ className = '', children, ...props }: BadgeProps) {
  return (
    <span className={`${styles.badge} ${className}`} {...props}>
      {children}
    </span>
  );
}
