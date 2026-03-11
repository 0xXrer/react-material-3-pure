'use client';

import { forwardRef, useCallback } from 'react';
import styles from './SegmentedButton.module.css';
import { useRipple } from '../../hooks';
import { cn, createOptionalContext } from '../../utils';

interface SegmentedCtx {
  selectedSet: Set<number>;
  multiSelect: boolean;
}

const [SegProvider, useSegContext] = createOptionalContext<SegmentedCtx>('SegmentedButton', { selectedSet: new Set(), multiSelect: false });

export type SegmentedButtonSetProps = {
  selected?: number | number[];
  multiSelect?: boolean;
  onChange?: (selected: number | number[]) => void;
  className?: string;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export const SegmentedButtonSet = forwardRef<HTMLDivElement, SegmentedButtonSetProps>(
  ({ selected = 0, multiSelect = false, onChange, className, children, ...props }, ref) => {
    const selectedSet = new Set(Array.isArray(selected) ? selected : [selected]);

    const handleToggle = useCallback(
      (index: number) => {
        if (multiSelect) {
          const next = new Set(selectedSet);
          if (next.has(index)) {
            next.delete(index);
          } else {
            next.add(index);
          }
          onChange?.([...next].sort());
        } else {
          onChange?.(index);
        }
      },
      [multiSelect, selectedSet, onChange],
    );

    return (
      <SegProvider value={{ selectedSet, multiSelect }}>
        <div ref={ref} className={cn(styles.set, className)} role="group" {...props}>
          {Array.isArray(children)
            ? children.map((child, i) => {
                if (child && typeof child === 'object' && 'type' in child) {
                  return <child.type key={child.key ?? i} {...child.props} _index={i} _onToggle={handleToggle} />;
                }
                return child;
              })
            : children}
        </div>
      </SegProvider>
    );
  },
);

SegmentedButtonSet.displayName = 'SegmentedButtonSet';

export type SegmentedButtonProps = {
  icon?: React.ReactNode;
  label?: string;
  disabled?: boolean;
  className?: string;
  /** @internal */
  _index?: number;
  /** @internal */
  _onToggle?: (index: number) => void;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'>;

export const SegmentedButton = forwardRef<HTMLButtonElement, SegmentedButtonProps>(
  ({ icon, label, disabled = false, className, _index = 0, _onToggle, onClick, ...props }, ref) => {
    const { selectedSet } = useSegContext();
    const isSelected = selectedSet.has(_index);
    const { surfaceRef, handlers, state } = useRipple<HTMLSpanElement>(disabled);

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        handlers.onClick(e as React.MouseEvent<HTMLElement>);
        _onToggle?.(_index);
        onClick?.(e);
      },
      [handlers, _onToggle, _index, onClick],
    );

    return (
      <button
        ref={ref}
        className={cn(styles.button, isSelected && styles.selected, disabled && styles.disabled, state.pressed && styles.pressed, className)}
        disabled={disabled}
        role="option"
        aria-selected={isSelected}
        {...props}
        onPointerEnter={handlers.onPointerEnter}
        onPointerLeave={handlers.onPointerLeave}
        onPointerDown={handlers.onPointerDown}
        onPointerUp={handlers.onPointerUp}
        onPointerCancel={handlers.onPointerCancel}
        onClick={handleClick}
      >
        <span ref={surfaceRef} className={styles.ripple} aria-hidden="true" />
        <span className={styles.stateLayer} aria-hidden="true" />
        <span className={styles.content}>
          {isSelected && (
            <svg className={styles.checkmark} viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
          )}
          {icon && <span className={styles.icon}>{icon}</span>}
          {label && <span className={styles.label}>{label}</span>}
        </span>
      </button>
    );
  },
);

SegmentedButton.displayName = 'SegmentedButton';
