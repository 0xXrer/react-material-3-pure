'use client';

import {
  forwardRef,
  useState,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import styles from './Select.module.css';
import { useControllableState, useClickOutside } from '../../hooks';
import { cn, createSafeContext } from '../../utils';

export type SelectVariant = 'filled' | 'outlined';

export interface SelectOptionProps {
  value: string;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

interface SelectContextValue {
  selectedValue: string;
  onSelect: (value: string) => void;
  focusedIndex: number;
  registerOption: (value: string, index: number) => void;
}

const [SelectProvider, useSelectContext] = createSafeContext<SelectContextValue>('Select');

export const SelectOption = forwardRef<HTMLLIElement, SelectOptionProps>(
  ({ value, disabled = false, children, className }, ref) => {
    const ctx = useSelectContext();
    const isSelected = ctx.selectedValue === value;

    const handleClick = useCallback(() => {
      if (!disabled) {
        ctx.onSelect(value);
      }
    }, [disabled, ctx, value]);

    return (
      <li
        ref={ref}
        role="option"
        aria-selected={isSelected}
        aria-disabled={disabled || undefined}
        tabIndex={-1}
        className={cn(
          styles.option,
          isSelected && styles.optionSelected,
          disabled && styles.optionDisabled,
          className
        )}
        onClick={handleClick}
        data-value={value}
      >
        <span className={styles.optionStateLayer} aria-hidden="true" />
        <span className={styles.optionContent}>{children}</span>
        {isSelected && (
          <svg
            className={styles.optionCheck}
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
        )}
      </li>
    );
  }
);

SelectOption.displayName = 'SelectOption';

export interface SelectProps {
  variant?: SelectVariant;
  label?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  errorText?: string;
  supportingText?: string;
  leadingIcon?: React.ReactNode;
  placeholder?: string;
  name?: string;
  className?: string;
  children?: React.ReactNode;
}

export const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      variant = 'filled',
      label,
      value: controlledValue,
      defaultValue = '',
      onChange,
      disabled = false,
      required = false,
      error = false,
      errorText,
      supportingText,
      leadingIcon,
      placeholder,
      name,
      className,
      children,
    },
    ref
  ) => {
    const [currentValue, setCurrentValue] = useControllableState({
      value: controlledValue,
      defaultValue,
      onChange,
    });

    const [open, setOpen] = useState(false);
    const [focused, setFocused] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(-1);

    const fieldRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLUListElement>(null);
    const optionValues = useRef<string[]>([]);

    const populated = currentValue !== '' && currentValue !== undefined;
    const hasError = error || (!!errorText && errorText.length > 0);

    const displayText = useMemo(() => {
      if (!children) return '';
      const childArray = Array.isArray(children) ? children : [children];
      for (const child of childArray) {
        if (
          child &&
          typeof child === 'object' &&
          'props' in child &&
          child.props.value === currentValue
        ) {
          const content = child.props.children;
          if (typeof content === 'string') return content;
          return String(content ?? '');
        }
      }
      return '';
    }, [children, currentValue]);

    const handleSelect = useCallback(
      (val: string) => {
        setCurrentValue(val);
        setOpen(false);
        fieldRef.current?.focus();
      },
      [setCurrentValue]
    );

    const registerOption = useCallback((value: string, index: number) => {
      optionValues.current[index] = value;
    }, []);

    const handleFieldClick = useCallback(() => {
      if (!disabled) {
        setOpen((prev) => !prev);
      }
    }, [disabled]);

    const handleFieldKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (disabled) return;

        switch (e.key) {
          case 'Enter':
          case ' ':
          case 'ArrowDown':
          case 'ArrowUp':
            e.preventDefault();
            setOpen(true);
            break;
          case 'Escape':
            e.preventDefault();
            setOpen(false);
            break;
        }
      },
      [disabled]
    );

    const handleMenuKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        const items = menuRef.current?.querySelectorAll(
          '[role="option"]:not([aria-disabled="true"])'
        );
        if (!items?.length) return;

        const enabledValues: string[] = [];
        items.forEach((item) => {
          enabledValues.push((item as HTMLElement).dataset.value || '');
        });

        let idx = enabledValues.indexOf(currentValue);

        switch (e.key) {
          case 'ArrowDown':
            e.preventDefault();
            idx = Math.min(idx + 1, enabledValues.length - 1);
            handleSelect(enabledValues[idx]);
            break;
          case 'ArrowUp':
            e.preventDefault();
            idx = Math.max(idx - 1, 0);
            handleSelect(enabledValues[idx]);
            break;
          case 'Home':
            e.preventDefault();
            handleSelect(enabledValues[0]);
            break;
          case 'End':
            e.preventDefault();
            handleSelect(enabledValues[enabledValues.length - 1]);
            break;
          case 'Escape':
            e.preventDefault();
            setOpen(false);
            fieldRef.current?.focus();
            break;
          case 'Enter':
          case ' ':
            e.preventDefault();
            setOpen(false);
            fieldRef.current?.focus();
            break;
        }
      },
      [currentValue, handleSelect]
    );

    const handleCloseOutside = useCallback(() => setOpen(false), []);
    useClickOutside([fieldRef, menuRef], handleCloseOutside, open);

    const contextValue = useMemo(
      () => ({
        selectedValue: currentValue,
        onSelect: handleSelect,
        focusedIndex,
        registerOption,
      }),
      [currentValue, handleSelect, focusedIndex, registerOption]
    );

    const isFilled = variant === 'filled';
    const isOutlined = variant === 'outlined';

    return (
      <div
        ref={ref}
        className={cn(
          styles.select,
          isFilled && styles.filled,
          isOutlined && styles.outlined,
          open && styles.open,
          focused && styles.focused,
          populated && styles.populated,
          hasError && styles.error,
          disabled && styles.disabled,
          Boolean(leadingIcon) && styles.withLeadingIcon,
          className
        )}
      >
        <div
          ref={fieldRef}
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-disabled={disabled || undefined}
          aria-required={required || undefined}
          aria-label={label}
          tabIndex={disabled ? -1 : 0}
          className={styles.field}
          onClick={handleFieldClick}
          onKeyDown={open ? handleMenuKeyDown : handleFieldKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            if (!open) setFocusedIndex(-1);
          }}
        >
          {isFilled && (
            <>
              <span className={styles.background} aria-hidden="true" />
              <span className={styles.stateLayer} aria-hidden="true" />
            </>
          )}

          {isOutlined && (
            <span className={styles.outline} aria-hidden="true">
              <span className={styles.outlineStart} />
              <span className={styles.outlineNotch}>
                <span className={styles.outlineLabel}>{label}</span>
              </span>
              <span className={styles.outlineEnd} />
            </span>
          )}

          {leadingIcon && (
            <span className={styles.leadingIcon}>{leadingIcon}</span>
          )}

          <span className={styles.fieldContent}>
            {isFilled && label && (
              <span className={styles.label}>{label}</span>
            )}
            <span className={styles.valueText}>
              {displayText || (
                <span className={styles.placeholder}>{placeholder}</span>
              )}
            </span>
          </span>

          <span className={styles.trailingIcon}>
            <svg
              className={styles.arrow}
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M7 10l5 5 5-5z" />
            </svg>
          </span>

          {isFilled && (
            <span className={styles.activeIndicator} aria-hidden="true" />
          )}
        </div>

        {open && (
          <SelectProvider value={contextValue}>
            <div className={styles.menuWrapper}>
              <ul
                ref={menuRef}
                role="listbox"
                className={styles.menu}
                onKeyDown={handleMenuKeyDown}
              >
                {children}
              </ul>
            </div>
          </SelectProvider>
        )}

        {(supportingText || (hasError && errorText)) && (
          <div
            className={cn(
              styles.supportingText,
              hasError && styles.supportingTextError
            )}
          >
            {hasError && errorText ? errorText : supportingText}
          </div>
        )}

        {name && (
          <input
            type="hidden"
            name={name}
            value={currentValue}
            disabled={disabled}
          />
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
