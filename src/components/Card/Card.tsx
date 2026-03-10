'use client';

import { forwardRef, useCallback } from 'react';
import styles from './Card.module.css';
import { useRipple } from '../../hooks';

export type CardVariant = 'elevated' | 'filled' | 'outlined';

export type CardProps = {
  variant?: CardVariant;
  interactive?: boolean;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'filled', interactive = false, disabled = false, className, children, onClick, ...props }, ref) => {
    const { surfaceRef, handlers, state } = useRipple<HTMLSpanElement>(disabled || !interactive);

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (interactive) handlers.onClick(e as React.MouseEvent<HTMLElement>);
        onClick?.(e);
      },
      [handlers, onClick, interactive],
    );

    const cardClass = cn(
      styles.card,
      styles[variant],
      interactive && styles.interactive,
      disabled && styles.disabled,
      state.pressed && styles.pressed,
      className,
    );

    const interactiveProps = interactive
      ? {
          role: 'button' as const,
          tabIndex: disabled ? -1 : 0,
          onPointerEnter: handlers.onPointerEnter,
          onPointerLeave: handlers.onPointerLeave,
          onPointerDown: handlers.onPointerDown,
          onPointerUp: handlers.onPointerUp,
          onPointerCancel: handlers.onPointerCancel,
        }
      : {};

    return (
      <div ref={ref} className={cardClass} onClick={handleClick} aria-disabled={disabled || undefined} {...interactiveProps} {...props}>
        {interactive && <span ref={surfaceRef} className={styles.ripple} aria-hidden="true" />}
        {interactive && <span className={styles.stateLayer} aria-hidden="true" />}
        <div className={styles.background} />
        <div className={styles.content}>{children}</div>
        <div className={styles.outline} />
      </div>
    );
  },
);

Card.displayName = 'Card';
