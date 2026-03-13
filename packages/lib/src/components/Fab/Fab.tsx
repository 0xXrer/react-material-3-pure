'use client';

import { forwardRef, useCallback } from 'react';
import styles from './Fab.module.css';
import { useRipple } from '../../hooks';
import { cn } from '../../utils';

export type FabVariant = 'primary' | 'secondary' | 'tertiary' | 'surface';
export type FabSize = 'small' | 'medium' | 'large';

type FabAsButton = {
  as?: 'button';
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

type FabAsAnchor = {
  as: 'a';
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

type FabAsType = FabAsButton | FabAsAnchor;

export type FabProps = {
  variant?: FabVariant;
  size?: FabSize;
  lowered?: boolean;
  label?: string;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  'aria-label'?: string;
} & FabAsType;

export const Fab = forwardRef<HTMLButtonElement | HTMLAnchorElement, FabProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      as = 'button',
      lowered = false,
      label,
      disabled = false,
      className,
      children,
      onClick,
      ...props
    },
    ref
  ) => {
    const { surfaceRef, handlers, state } = useRipple<HTMLSpanElement>(disabled);
    const extended = !!label;

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        handlers.onClick(e as React.MouseEvent<HTMLElement>);
        if (onClick) {
          (onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>)(e);
        }
      },
      [handlers, onClick]
    );

    const fabClass = cn(
      styles.fab,
      styles[variant],
      styles[size],
      extended && styles.extended,
      lowered && styles.lowered,
      disabled && styles.disabled,
      state.pressed && styles.pressed,
      className
    );

    const content = (
      <>
        <span ref={surfaceRef} className={styles.ripple} aria-hidden="true" />
        <span className={styles.stateLayer} aria-hidden="true" />
        <span className={styles.content}>
          {children && <span className={styles.icon}>{children}</span>}
          {label && <span className={styles.label}>{label}</span>}
        </span>
      </>
    );

    if (as === 'a') {
      const anchorProps = props as React.AnchorHTMLAttributes<HTMLAnchorElement>;
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={fabClass}
          aria-disabled={disabled || undefined}
          aria-label={props['aria-label'] || label}
          {...anchorProps}
          onPointerEnter={handlers.onPointerEnter}
          onPointerLeave={handlers.onPointerLeave}
          onPointerDown={handlers.onPointerDown}
          onPointerUp={handlers.onPointerUp}
          onPointerCancel={handlers.onPointerCancel}
          onClick={handleClick}
        >
          {content}
        </a>
      );
    }

    const buttonProps = props as React.ButtonHTMLAttributes<HTMLButtonElement>;
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={fabClass}
        disabled={disabled}
        aria-label={props['aria-label'] || label}
        {...buttonProps}
        onPointerEnter={handlers.onPointerEnter}
        onPointerLeave={handlers.onPointerLeave}
        onPointerDown={handlers.onPointerDown}
        onPointerUp={handlers.onPointerUp}
        onPointerCancel={handlers.onPointerCancel}
        onClick={handleClick}
      >
        {content}
      </button>
    );
  }
);

Fab.displayName = 'Fab';
