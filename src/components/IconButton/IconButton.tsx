'use client';

import { forwardRef, useCallback, useState } from 'react';
import styles from './IconButton.module.css';
import { useRipple } from '../../hooks';

function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export type IconButtonVariant = 'standard' | 'filled' | 'tonal' | 'outlined';

type IconButtonAsButton = {
  as?: 'button';
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

type IconButtonAsAnchor = {
  as: 'a';
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

type IconButtonAsType = IconButtonAsButton | IconButtonAsAnchor;

export type IconButtonProps = {
  variant?: IconButtonVariant;
  disabled?: boolean;
  toggle?: boolean;
  selected?: boolean;
  defaultSelected?: boolean;
  onSelectedChange?: (selected: boolean) => void;
  className?: string;
  children?: React.ReactNode;
  'aria-label'?: string;
} & IconButtonAsType;

export const IconButton = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  IconButtonProps
>(
  (
    {
      variant = 'standard',
      as = 'button',
      disabled = false,
      toggle = false,
      selected: controlledSelected,
      defaultSelected = false,
      onSelectedChange,
      className,
      children,
      onClick,
      ...props
    },
    ref
  ) => {
    const isSelectedControlled = controlledSelected !== undefined;
    const [internalSelected, setInternalSelected] = useState(defaultSelected);
    const selected = toggle
      ? isSelectedControlled
        ? controlledSelected
        : internalSelected
      : false;

    const { surfaceRef, handlers, state } = useRipple<HTMLSpanElement>(disabled);

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        handlers.onClick(e as React.MouseEvent<HTMLElement>);

        if (toggle && !disabled) {
          const newSelected = !selected;
          if (!isSelectedControlled) {
            setInternalSelected(newSelected);
          }
          onSelectedChange?.(newSelected);
        }

        if (onClick) {
          (onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>)(e);
        }
      },
      [handlers, toggle, disabled, selected, isSelectedControlled, onSelectedChange, onClick]
    );

    const buttonClass = cn(
      styles.iconButton,
      styles[variant],
      disabled && styles.disabled,
      toggle && selected && styles.selected,
      state.pressed && styles.pressed,
      className
    );

    const content = (
      <>
        <span ref={surfaceRef} className={styles.ripple} aria-hidden="true" />
        <span className={styles.stateLayer} aria-hidden="true" />
        <span className={styles.icon}>{children}</span>
      </>
    );

    if (as === 'a') {
      const anchorProps = props as React.AnchorHTMLAttributes<HTMLAnchorElement>;
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={buttonClass}
          aria-disabled={disabled || undefined}
          aria-pressed={toggle ? selected : undefined}
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
        aria-pressed={toggle ? selected : undefined}
        aria-label={props['aria-label']}
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

IconButton.displayName = 'IconButton';
