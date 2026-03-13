'use client';

import { forwardRef, useMemo } from 'react';
import styles from './Progress.module.css';
import { cn } from '../../utils';

export interface LinearProgressProps {
  value?: number;
  max?: number;
  indeterminate?: boolean;
  fourColor?: boolean;
  buffer?: number;
  className?: string;
  'aria-label'?: string;
}

export const LinearProgress = forwardRef<HTMLDivElement, LinearProgressProps>(
  (
    {
      value = 0,
      max = 1,
      indeterminate = false,
      fourColor = false,
      buffer = 1,
      className,
      ...ariaProps
    },
    ref
  ) => {
    const fraction = useMemo(() => {
      if (indeterminate || max === 0) return 0;
      return Math.min(Math.max(value / max, 0), 1);
    }, [value, max, indeterminate]);

    const bufferFraction = useMemo(() => {
      if (indeterminate || max === 0) return 1;
      return Math.min(Math.max(buffer / max, 0), 1);
    }, [buffer, max, indeterminate]);

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={indeterminate ? undefined : value}
        aria-label={ariaProps['aria-label']}
        className={cn(
          styles.linear,
          indeterminate && styles.indeterminate,
          fourColor && styles.fourColor,
          className
        )}
      >
        <div className={styles.linearTrack}>
          <div
            className={styles.linearBuffer}
            style={{ width: `${bufferFraction * 100}%` }}
          />
          <div
            className={styles.linearBar}
            style={
              indeterminate ? undefined : { width: `${fraction * 100}%` }
            }
          />
          {indeterminate && (
            <div className={styles.linearBarIndeterminate} />
          )}
        </div>
      </div>
    );
  }
);

LinearProgress.displayName = 'LinearProgress';

export interface CircularProgressProps {
  value?: number;
  max?: number;
  indeterminate?: boolean;
  fourColor?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  'aria-label'?: string;
}

export const CircularProgress = forwardRef<HTMLDivElement, CircularProgressProps>(
  (
    {
      value = 0,
      max = 1,
      indeterminate = false,
      fourColor = false,
      size = 'md',
      className,
      ...ariaProps
    },
    ref
  ) => {
    const fraction = useMemo(() => {
      if (indeterminate || max === 0) return 0;
      return Math.min(Math.max(value / max, 0), 1);
    }, [value, max, indeterminate]);

    const circumference = 2 * Math.PI * 18;
    const dashOffset = circumference * (1 - fraction);

    const sizeMap = { sm: 24, md: 48, lg: 64 };
    const pixelSize = sizeMap[size];

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={indeterminate ? undefined : value}
        aria-label={ariaProps['aria-label']}
        className={cn(
          styles.circular,
          indeterminate && styles.circularIndeterminate,
          fourColor && styles.fourColor,
          styles[`circular_${size}`],
          className
        )}
        style={{ width: pixelSize, height: pixelSize }}
      >
        <svg viewBox="0 0 48 48" className={styles.circularSvg}>
          <circle
            className={styles.circularTrack}
            cx="24"
            cy="24"
            r="18"
            fill="none"
            strokeWidth="4"
          />
          {!indeterminate && (
            <circle
              className={styles.circularBar}
              cx="24"
              cy="24"
              r="18"
              fill="none"
              strokeWidth="4"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
            />
          )}
          {indeterminate && (
            <circle
              className={styles.circularBarIndeterminate}
              cx="24"
              cy="24"
              r="18"
              fill="none"
              strokeWidth="4"
              strokeLinecap="round"
            />
          )}
        </svg>
      </div>
    );
  }
);

CircularProgress.displayName = 'CircularProgress';
