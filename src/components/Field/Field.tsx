'use client';

import { forwardRef, useId } from 'react';
import styles from './Field.module.css';

/**
 * Material Design 3 Field Component
 *
 * A low-level container component for building custom form fields.
 * Used internally by TextField, Select, and other input components.
 *
 * @example
 * ```tsx
 * <Field
 *   variant="filled"
 *   label="Custom Field"
 *   focused={isFocused}
 *   populated={hasValue}
 * >
 *   <input type="text" />
 * </Field>
 * ```
 */

export type FieldVariant = 'filled' | 'outlined';

export interface FieldProps {
  /** Visual style of the field */
  variant?: FieldVariant;
  /** Floating label text */
  label?: string;
  /** Whether the field is focused */
  focused?: boolean;
  /** Whether the field has a value */
  populated?: boolean;
  /** Whether the field is in an error state */
  error?: boolean;
  /** Whether the field is disabled */
  disabled?: boolean;
  /** Whether the field is required */
  required?: boolean;
  /** Supporting text below the field */
  supportingText?: string;
  /** Leading content (icon, etc.) */
  leadingContent?: React.ReactNode;
  /** Trailing content (icon, etc.) */
  trailingContent?: React.ReactNode;
  /** Field content */
  children?: React.ReactNode;
  /** Additional class name */
  className?: string;
}

function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter((c): c is string => typeof c === 'string').join(' ');
}

export const Field = forwardRef<HTMLDivElement, FieldProps>(
  (
    {
      variant = 'filled',
      label,
      focused = false,
      populated = false,
      error = false,
      disabled = false,
      required = false,
      supportingText,
      leadingContent,
      trailingContent,
      children,
      className,
    },
    ref
  ) => {
    const id = useId();
    const labelId = `${id}-label`;
    const supportingId = `${id}-supporting`;

    const hasLabel = Boolean(label);

    const fieldClasses = cn(
      styles.field,
      styles[variant],
      focused && styles.focused,
      populated && styles.populated,
      error && styles.error,
      disabled && styles.disabled,
      !hasLabel && styles.noLabel,
      Boolean(leadingContent) && styles.withStart,
      Boolean(trailingContent) && styles.withEnd,
      className
    );

    return (
      <div ref={ref} className={styles.wrapper}>
        <div className={fieldClasses}>
          <div className={styles.containerOverflow}>
            {variant === 'filled' && (
              <>
                <div className={styles.background} aria-hidden="true" />
                <div className={styles.stateLayer} aria-hidden="true" />
              </>
            )}

            {variant === 'outlined' && (
              <div className={styles.outline} aria-hidden="true">
                <div className={styles.outlineStart} />
                <div className={styles.outlineNotch}>
                  <div className={styles.outlinePanelInactive} />
                  <div className={styles.outlinePanelActive} />
                  {hasLabel && (
                    <div className={styles.outlineLabel}>
                      <span className={cn(styles.label, styles.floating)}>
                        {label}
                        {required && !disabled && '*'}
                      </span>
                    </div>
                  )}
                </div>
                <div className={styles.outlineEnd} />
              </div>
            )}

            <div className={styles.container}>
              {leadingContent && (
                <div className={cn(styles.slot, styles.leading)}>
                  {leadingContent}
                </div>
              )}

              <div className={styles.middle}>
                {variant === 'filled' && hasLabel && (
                  <div className={styles.labelWrapper}>
                    <span
                      id={labelId}
                      className={cn(
                        styles.label,
                        focused || populated ? styles.floating : styles.resting
                      )}
                    >
                      {label}
                      {required && !disabled && '*'}
                    </span>
                  </div>
                )}

                <div className={styles.content}>
                  {children}
                </div>
              </div>

              {trailingContent && (
                <div className={cn(styles.slot, styles.trailing)}>
                  {trailingContent}
                </div>
              )}
            </div>

            {variant === 'filled' && (
              <div className={styles.activeIndicator} aria-hidden="true" />
            )}
          </div>
        </div>

        {supportingText && (
          <div
            id={supportingId}
            className={cn(
              styles.supportingText,
              error && styles.supportingTextError
            )}
          >
            {supportingText}
          </div>
        )}
      </div>
    );
  }
);

Field.displayName = 'Field';
