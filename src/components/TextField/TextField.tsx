'use client';

import {
  forwardRef,
  useId,
  useState,
  useCallback,
  useRef,
  useImperativeHandle,
} from 'react';
import styles from './TextField.module.css';

/**
 * Material Design 3 TextField Component
 *
 * A text input field with M3 styling. Supports filled and outlined variants.
 *
 * @example
 * ```tsx
 * // Filled (default)
 * <TextField label="Email" />
 *
 * // Outlined
 * <TextField variant="outlined" label="Password" type="password" />
 *
 * // With icons
 * <TextField
 *   label="Search"
 *   leadingIcon={<SearchIcon />}
 *   trailingIcon={<ClearIcon />}
 * />
 *
 * // With supporting text
 * <TextField
 *   label="Username"
 *   supportingText="Enter your username"
 * />
 *
 * // Error state
 * <TextField
 *   label="Email"
 *   error
 *   errorText="Invalid email address"
 * />
 * ```
 */

export type TextFieldVariant = 'filled' | 'outlined';
export type TextFieldType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'search'
  | 'tel'
  | 'url'
  | 'textarea';

export interface TextFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Visual style of the text field */
  variant?: TextFieldVariant;
  /** Input type */
  type?: TextFieldType;
  /** Floating label text */
  label?: string;
  /** Supporting text below the field */
  supportingText?: string;
  /** Error state */
  error?: boolean;
  /** Error message (replaces supportingText when error is true) */
  errorText?: string;
  /** Prefix text inside the field */
  prefixText?: string;
  /** Suffix text inside the field */
  suffixText?: string;
  /** Leading icon element */
  leadingIcon?: React.ReactNode;
  /** Trailing icon element */
  trailingIcon?: React.ReactNode;
  /** Number of rows for textarea */
  rows?: number;
  /** Additional class name */
  className?: string;
}

export interface TextFieldRef {
  focus: () => void;
  blur: () => void;
  select: () => void;
  inputElement: HTMLInputElement | HTMLTextAreaElement | null;
}

function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter((c): c is string => typeof c === 'string').join(' ');
}

export const TextField = forwardRef<TextFieldRef, TextFieldProps>(
  (
    {
      variant = 'filled',
      type = 'text',
      label,
      supportingText,
      error = false,
      errorText,
      prefixText,
      suffixText,
      leadingIcon,
      trailingIcon,
      rows = 2,
      disabled = false,
      required = false,
      value,
      defaultValue,
      className,
      id: providedId,
      onFocus,
      onBlur,
      onChange,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = providedId || generatedId;
    const inputId = `${id}-input`;
    const labelId = `${id}-label`;
    const supportingId = `${id}-supporting`;

    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
    const [focused, setFocused] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue || '');

    const currentValue = value !== undefined ? value : internalValue;
    const hasPlaceholder = Boolean(props.placeholder);
    const populated = Boolean(currentValue) || Boolean(prefixText) || hasPlaceholder;
    const hasLabel = Boolean(label);
    const hasError = error;
    const displayText = hasError && errorText ? errorText : supportingText;

    const isTextarea = type === 'textarea';

    useImperativeHandle(ref, () => ({
      focus: () => inputRef.current?.focus(),
      blur: () => inputRef.current?.blur(),
      select: () => inputRef.current?.select(),
      inputElement: inputRef.current,
    }));

    const handleFocus = useCallback(
      (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFocused(true);
        onFocus?.(e as React.FocusEvent<HTMLInputElement>);
      },
      [onFocus]
    );

    const handleBlur = useCallback(
      (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFocused(false);
        onBlur?.(e as React.FocusEvent<HTMLInputElement>);
      },
      [onBlur]
    );

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (value === undefined) {
          setInternalValue(e.target.value);
        }
        onChange?.(e as React.ChangeEvent<HTMLInputElement>);
      },
      [value, onChange]
    );

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
      className
    );

    return (
      <div className={styles.textField}>
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

              <div className={styles.middle}>
                  {variant === 'outlined' && hasLabel && !(focused || populated) && (
                    <div className={styles.labelWrapper}>
                      <span
                        id={labelId}
                        className={cn(styles.label, styles.resting)}
                      >
                        {label}
                        {required && !disabled && '*'}
                      </span>
                    </div>
                  )}

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
                  {prefixText && (
                    <span className={styles.prefix}>{prefixText}</span>
                  )}

                  <div className={styles.inputWrapper}>
                    {isTextarea ? (
                      <textarea
                        ref={inputRef as React.Ref<HTMLTextAreaElement>}
                        id={inputId}
                        className={styles.input}
                        value={currentValue as string}
                        disabled={disabled}
                        required={required}
                        rows={rows}
                        aria-labelledby={hasLabel ? labelId : undefined}
                        aria-describedby={displayText ? supportingId : undefined}
                        aria-invalid={hasError || undefined}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                    ) : (
                      <input
                        ref={inputRef as React.Ref<HTMLInputElement>}
                        id={inputId}
                        className={styles.input}
                        type={type}
                        value={currentValue}
                        disabled={disabled}
                        required={required}
                        aria-labelledby={hasLabel ? labelId : undefined}
                        aria-describedby={displayText ? supportingId : undefined}
                        aria-invalid={hasError || undefined}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        {...props}
                      />
                    )}
                  </div>

                  {suffixText && (
                    <span className={styles.suffix}>{suffixText}</span>
                  )}
                </div>
              </div>

              {trailingIcon && (
                <div className={cn(styles.icon, styles.trailing)}>
                  {trailingIcon}
                </div>
              )}
            </div>

            {variant === 'filled' && (
              <div className={styles.activeIndicator} aria-hidden="true" />
            )}
          </div>
        </div>

        {displayText && (
          <div
            id={supportingId}
            className={cn(
              styles.supportingText,
              hasError && styles.supportingTextError
            )}
          >
            {displayText}
          </div>
        )}
      </div>
    );
  }
);

TextField.displayName = 'TextField';
