'use client';

import { forwardRef } from 'react';
import styles from './Icon.module.css';

function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export type IconSize = 'sm' | 'md' | 'lg';

export interface IconProps {
  size?: IconSize;
  filled?: boolean;
  className?: string;
  children?: React.ReactNode;
  'aria-hidden'?: boolean;
}

export const Icon = forwardRef<HTMLSpanElement, IconProps>(
  ({ size = 'md', filled = false, className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        aria-hidden={props['aria-hidden'] ?? true}
        className={cn(
          styles.icon,
          styles[`icon_${size}`],
          filled && styles.filled,
          className
        )}
      >
        {children}
      </span>
    );
  }
);

Icon.displayName = 'Icon';
