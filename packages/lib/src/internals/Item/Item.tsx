'use client';

import { forwardRef } from 'react';
import { cn } from '../../utils';
import styles from './Item.module.css';

export interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Content before the headline (icon, avatar, checkbox, etc.). */
  start?: React.ReactNode;
  /** Primary text. Falls back to `children`. */
  headline?: React.ReactNode;
  /** Secondary text shown below the headline. */
  supportingText?: React.ReactNode;
  /** Small text above the headline (e.g. category, date). */
  overline?: React.ReactNode;
  /** Content after the text body (icon, badge, trailing text). */
  end?: React.ReactNode;
  /** Trailing supporting text (e.g. metadata). */
  trailingSupportingText?: React.ReactNode;
  /** Forces multiline layout (taller min-height). Auto-detected when supportingText or overline is provided. */
  multiline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Base item layout primitive used by List, Menu, and Select.
 * Provides start / headline / supporting-text / end slots in a row.
 *
 * Ported from `extracted/labs/item`.
 */
export const Item = forwardRef<HTMLDivElement, ItemProps>(
  (
    {
      start,
      headline,
      supportingText,
      overline,
      end,
      trailingSupportingText,
      multiline: multilineProp,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const isMultiline =
      multilineProp ?? Boolean(supportingText || overline);

    return (
      <div
        ref={ref}
        className={cn(
          styles.item,
          isMultiline && styles.multiline,
          className,
        )}
        {...props}
      >
        {start && <span className={styles.start}>{start}</span>}
        <div className={styles.text}>
          {overline && (
            <span className={styles.overline}>{overline}</span>
          )}
          <span className={styles.headline}>{headline ?? children}</span>
          {supportingText && (
            <span className={styles.supportingText}>{supportingText}</span>
          )}
        </div>
        {trailingSupportingText && (
          <span className={styles.trailingSupportingText}>
            {trailingSupportingText}
          </span>
        )}
        {end && <span className={styles.end}>{end}</span>}
      </div>
    );
  },
);

Item.displayName = 'Item';
