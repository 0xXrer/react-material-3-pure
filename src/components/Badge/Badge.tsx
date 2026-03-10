'use client';

import { forwardRef } from 'react';
import styles from './Badge.module.css';

export type BadgeSize = 'small' | 'large';

export type BadgeProps = {
  value?: number | string;
  size?: BadgeSize;
  max?: number;
  visible?: boolean;
  className?: string;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

function formatValue(value: number | string | undefined, max?: number): string {
  if (value === undefined || value === '') return '';
  if (typeof value === 'number' && max !== undefined && value > max) {
    return `${max}+`;
  }
  return String(value);
}

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ value, size = 'large', max = 999, visible = true, className, children, ...props }, ref) => {
    const displayValue = formatValue(value, max);
    const isSmall = size === 'small' || (value === undefined && size !== 'large');

    if (!visible) {
      return <>{children}</>;
    }

    if (!children) {
      return (
        <span
          ref={ref as React.Ref<HTMLSpanElement>}
          className={cn(styles.badge, isSmall ? styles.small : styles.large, className)}
          {...(props as React.HTMLAttributes<HTMLSpanElement>)}
        >
          {!isSmall && displayValue && <span className={styles.value}>{displayValue}</span>}
        </span>
      );
    }

    return (
      <div ref={ref} className={cn(styles.wrapper, className)} {...props}>
        {children}
        <span className={cn(styles.badge, isSmall ? styles.small : styles.large)}>
          {!isSmall && displayValue && <span className={styles.value}>{displayValue}</span>}
        </span>
      </div>
    );
  }
);

Badge.displayName = 'Badge';
