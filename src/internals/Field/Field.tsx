'use client';

import { forwardRef } from 'react';
import { cn } from '../../utils';
import styles from './Field.module.css';

export type FieldVariant = 'filled' | 'outlined';

export interface FieldProps {
  variant?: FieldVariant;
  label?: string;
  focused?: boolean;
  populated?: boolean;
  error?: boolean;
  disabled?: boolean;
  required?: boolean;
  supportingText?: string;
  errorText?: string;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
  /** Additional classes applied to the content middle section */
  contentClassName?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
}

/**
 * Internal shared field container used by TextField and Select.
 * Handles filled/outlined chrome, floating label, supporting text,
 * leading/trailing icons. Children are rendered in the content slot.
 *
 * Ported from `extracted/field/full.txt` (md-filled-field / md-outlined-field).
 */
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
      errorText,
      leadingIcon,
      trailingIcon,
      className,
      contentClassName,
      children,
      onClick,
      onKeyDown,
    },
    ref,
  ) => {
    const hasLabel = Boolean(label);
    const hasError = error;
    const displayText = hasError && errorText ? errorText : supportingText;
    const isFilled = variant === 'filled';
    const isOutlined = variant === 'outlined';

    const fieldClasses = cn(
      styles.field,
      styles[variant],
      focused && styles.focused,
      populated && styles.populated,
      hasError && styles.error,
      disabled && styles.disabled,
      !hasLabel && styles.noLabel,
      Boolean(leadingIcon) && styles.withStart,
      Boolean(trailingIcon) && styles.withEnd,
      className,
    );

    return (
      <div className={styles.root}>
        <div
          ref={ref}
          className={fieldClasses}
          onClick={onClick}
          onKeyDown={onKeyDown}
        >
          <div className={styles.containerOverflow}>
            {/* Filled background & state layer */}
            {isFilled && (
              <>
                <div className={styles.background} aria-hidden="true" />
                <div className={styles.stateLayer} aria-hidden="true" />
              </>
            )}

            {/* Outlined border segments */}
            {isOutlined && (
              <div className={styles.outline} aria-hidden="true">
                <div className={styles.outlineStart} />
                <div className={styles.outlineNotch}>
                  <div className={styles.outlinePanelInactive} />
                  <div className={styles.outlinePanelActive} />
                  {hasLabel && (focused || populated) && (
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
              {leadingIcon && (
                <div className={cn(styles.icon, styles.leading)}>
                  {leadingIcon}
                </div>
              )}

              <div className={cn(styles.middle, contentClassName)}>
                {/* Outlined resting label */}
                {isOutlined && hasLabel && !(focused || populated) && (
                  <div className={styles.labelWrapper}>
                    <span className={cn(styles.label, styles.resting)}>
                      {label}
                      {required && !disabled && '*'}
                    </span>
                  </div>
                )}

                {/* Filled label (always present, animates) */}
                {isFilled && hasLabel && (
                  <div className={styles.labelWrapper}>
                    <span
                      className={cn(
                        styles.label,
                        focused || populated ? styles.floating : styles.resting,
                      )}
                    >
                      {label}
                      {required && !disabled && '*'}
                    </span>
                  </div>
                )}

                {/* Content slot (input, select value, etc.) */}
                <div className={styles.content}>{children}</div>
              </div>

              {trailingIcon && (
                <div className={cn(styles.icon, styles.trailing)}>
                  {trailingIcon}
                </div>
              )}
            </div>

            {/* Filled active indicator line */}
            {isFilled && (
              <div className={styles.activeIndicator} aria-hidden="true" />
            )}
          </div>
        </div>

        {/* Supporting / error text */}
        {displayText && (
          <div
            className={cn(
              styles.supportingText,
              hasError && styles.supportingTextError,
            )}
          >
            {displayText}
          </div>
        )}
      </div>
    );
  },
);

Field.displayName = 'Field';
