'use client';

import { forwardRef } from 'react';
import styles from './Icon.module.css';
import { cn } from '../../utils';

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
