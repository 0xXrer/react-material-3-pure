'use client';

import { forwardRef } from 'react';
import { cn } from '../../utils';
import styles from './StateLayer.module.css';

export interface StateLayerProps {
  /** Whether the element is currently hovered. */
  hovered?: boolean;
  /** Whether the element is currently pressed / active. */
  pressed?: boolean;
  /** Whether the element is currently focused. */
  focused?: boolean;
  /** Whether the host is disabled (layer becomes invisible). */
  disabled?: boolean;
  className?: string;
}

/**
 * M3 state-layer overlay that shows hover, focus, and pressed feedback.
 * Renders as an absolutely-positioned span; host must be `position: relative`.
 */
export const StateLayer = forwardRef<HTMLSpanElement, StateLayerProps>(
  ({ hovered, pressed, focused, disabled, className }, ref) => (
    <span
      ref={ref}
      aria-hidden="true"
      className={cn(
        styles.stateLayer,
        hovered && styles.hovered,
        pressed && styles.pressed,
        focused && styles.focused,
        disabled && styles.disabled,
        className,
      )}
    />
  ),
);

StateLayer.displayName = 'StateLayer';
