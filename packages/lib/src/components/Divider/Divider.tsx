'use client';

import { forwardRef } from 'react';
import styles from './Divider.module.css';

/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Material Design 3 Divider Component
 *
 * A React port of the official @material/web divider component.
 * A divider is a thin line that groups content in lists and containers.
 *
 * @see https://github.com/material-components/material-web/tree/main/divider
 * @see https://m3.material.io/components/divider
 */

/* ==========================================================================
   DIVIDER PROPS
   ========================================================================== */

export interface DividerProps {
  /**
   * Indents the divider with equal padding on both sides.
   * @default false
   */
  inset?: boolean;

  /**
   * Indents the divider with padding on the leading side.
   * @default false
   */
  insetStart?: boolean;

  /**
   * Indents the divider with padding on the trailing side.
   * @default false
   */
  insetEnd?: boolean;

  /**
   * Additional CSS class names.
   */
  className?: string;

  /**
   * Inline styles for the divider.
   */
  style?: React.CSSProperties;
}

/**
 * M3 Divider Component
 *
 * @summary A divider is a thin line that groups content in lists and containers.
 *
 * @description Dividers can reinforce tapability, such as when used to separate
 * list items or define tappable regions in an accordion.
 *
 * Features:
 * - Full-width divider by default
 * - Inset options for indentation (both sides, start only, or end only)
 * - Follows M3 design tokens for color and thickness
 * - High contrast mode support
 *
 * @example
 * ```tsx
 * // Full-width divider
 * <Divider />
 *
 * // Inset on both sides
 * <Divider inset />
 *
 * // Inset on start only
 * <Divider insetStart />
 *
 * // Inset on end only
 * <Divider insetEnd />
 * ```
 */
export const Divider = forwardRef<HTMLHRElement, DividerProps>(
  (
    {
      inset = false,
      insetStart = false,
      insetEnd = false,
      className = '',
      style,
    },
    ref
  ) => {
    const classNames = [styles.divider];
    
    if (inset) {
      classNames.push(styles.inset);
    }
    if (insetStart) {
      classNames.push(styles.insetStart);
    }
    if (insetEnd) {
      classNames.push(styles.insetEnd);
    }
    if (className) {
      classNames.push(className);
    }

    return (
      <hr
        ref={ref}
        className={classNames.join(' ')}
        style={style}
        role="separator"
        aria-orientation="horizontal"
      />
    );
  }
);

Divider.displayName = 'Divider';
