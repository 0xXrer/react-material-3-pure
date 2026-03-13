'use client';

import { forwardRef } from 'react';
import { cn } from '../../utils';
import styles from './FocusRing.module.css';

export interface FocusRingProps {
  /** Show the ring (typically from :focus-visible). */
  visible?: boolean;
  /** Inward ring instead of outward. */
  inward?: boolean;
  className?: string;
}

/**
 * Renders a keyboard-focus indicator ring around its host.
 * Host must be `position: relative`.
 */
export const FocusRing = forwardRef<HTMLSpanElement, FocusRingProps>(
  ({ visible, inward, className }, ref) => (
    <span
      ref={ref}
      aria-hidden="true"
      className={cn(
        styles.focusRing,
        visible && styles.visible,
        inward && styles.inward,
        className,
      )}
    />
  ),
);

FocusRing.displayName = 'FocusRing';
