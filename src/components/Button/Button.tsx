'use client';

import { forwardRef, useCallback } from 'react';
import styles from './Button.module.css';
import { useRipple } from '../../hooks';
import { cn } from '../../utils';

export type ButtonVariant = 'filled' | 'outlined' | 'text' | 'elevated' | 'tonal';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'icon';

type ButtonAsButton = {
  as?: 'button';
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonAsAnchor = {
  as: 'a';
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

type ButtonAsType = ButtonAsButton | ButtonAsAnchor;

export type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  square?: boolean;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
} & ButtonAsType;

/**
 * M3 Button Component
 *
 * Simple API - icons and text are just children.
 * Use `as="a"` to render as a link.
 */
export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      variant = 'filled',
      size = 'md',
      as = 'button',
      disabled = false,
      square = false,
      className,
      children,
      onClick,
      ...props
    },
    ref
  ) => {
    const { surfaceRef, handlers, state } = useRipple<HTMLSpanElement>(disabled);

    // Combine ripple handlers with user's onClick
    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        handlers.onClick(e as React.MouseEvent<HTMLElement>);
        if (onClick) {
          (onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>)(e);
        }
      },
      [handlers, onClick]
    );

    const buttonClass = cn(
      styles.button,
      styles[variant],
      styles[size],
      square && styles.square,
      disabled && styles.disabled,
      state.pressed && styles.pressed,
      className
    );

    const content = (
      <>
        <span 
          ref={surfaceRef} 
          className={styles.ripple}
          aria-hidden="true"
        />
        <span className={styles.stateLayer} aria-hidden="true" />
        <span className={styles.content}>{children}</span>
      </>
    );

    if (as === 'a') {
      const anchorProps = props as React.AnchorHTMLAttributes<HTMLAnchorElement>;
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={buttonClass}
          aria-disabled={disabled || undefined}
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
        className={buttonClass}
        disabled={disabled}
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

Button.displayName = 'Button';
