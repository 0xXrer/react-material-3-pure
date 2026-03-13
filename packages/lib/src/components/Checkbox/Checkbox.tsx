'use client';

import {
  forwardRef,
  useCallback,
  useRef,
  useImperativeHandle,
  useMemo,
  useState,
  useId,
  useLayoutEffect,
  useEffect,
} from 'react';
import styles from './Checkbox.module.css';
import { useRipple } from '../../hooks';

/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Material Design 3 Checkbox Component
 *
 * A React port of the official @material/web checkbox component.
 * Implements the M3 Checkbox specification with full support
 * for indeterminate state, state layers, ripple effects, and accessibility.
 *
 * @see https://github.com/material-components/material-web/tree/main/checkbox
 * @see https://m3.material.io/components/checkbox
 */

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  /**
   * Whether or not the checkbox is selected.
   * @default false
   */
  checked?: boolean;

  /**
   * Whether or not the checkbox is indeterminate.
   * Indeterminate state indicates a "mixed" selection, typically used
   * for parent checkboxes that have partially selected children.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#indeterminate_state_checkboxes
   * @default false
   */
  indeterminate?: boolean;

  /**
   * Whether the checkbox is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * When true, require the checkbox to be selected when participating in
   * form submission.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#validation
   * @default false
   */
  required?: boolean;

  /**
   * The value of the checkbox that is submitted with a form when selected.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#value
   * @default 'on'
   */
  value?: string;

  /**
   * The name of the checkbox for form submission.
   */
  name?: string;

  /**
   * Controls the touch target size.
   * - `wrapper`: Adds margin to ensure 48px touch target (default)
   * - `none`: No additional touch target sizing
   * @default 'wrapper'
   */
  touchTarget?: 'wrapper' | 'none';

  /**
   * Callback fired when the checkbox value changes.
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * Callback fired on input events.
   */
  onInput?: (event: React.FormEvent<HTMLInputElement>) => void;
}

/**
 * M3 Checkbox Component
 *
 * @summary Checkboxes allow users to select one or more items from a set.
 * Checkboxes can turn an option on or off.
 *
 * @description
 * Use checkboxes to:
 * - Select one or more options from a list
 * - Present a list containing sub-selections
 * - Turn an item on or off in a desktop environment
 *
 * Features:
 * - Checked, unchecked, and indeterminate states
 * - M3 State Layer implementation (opacity-based state visualization)
 * - Hardware-accelerated ripple effect using Web Animations API
 * - Full accessibility support (ARIA attributes, keyboard navigation)
 * - Animated checkmark and indeterminate mark transitions
 * - Form integration (name, value, required)
 * - Touch target sizing for mobile accessibility
 *
 * @fires change - Fired when the checkbox checked state changes
 * @fires input - Fired when the checkbox receives input
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      checked = false,
      indeterminate = false,
      disabled = false,
      required = false,
      value = 'on',
      name,
      touchTarget = 'wrapper',
      className = '',
      onChange,
      onInput,
      id: providedId,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      'aria-describedby': ariaDescribedBy,
      'aria-invalid': ariaInvalid,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = providedId || `checkbox-${generatedId}`;
    
    const inputRef = useRef<HTMLInputElement>(null);
    
    // Track previous states for animation classes
    // Use refs to store the previous value before it changes
    const prevCheckedRef = useRef(checked);
    const prevIndeterminateRef = useRef(indeterminate);
    const prevDisabledRef = useRef(disabled);
    
    // State to trigger re-render with previous values
    const [prevStates, setPrevStates] = useState({
      checked: checked,
      indeterminate: indeterminate,
      disabled: disabled,
    });

    // Update previous states BEFORE the next render cycle
    useLayoutEffect(() => {
      // Store current as previous for next change
      const timeoutId = setTimeout(() => {
        prevCheckedRef.current = checked;
        prevIndeterminateRef.current = indeterminate;
        prevDisabledRef.current = disabled;
        setPrevStates({
          checked,
          indeterminate,
          disabled,
        });
      }, 400); // After animation completes
      
      return () => clearTimeout(timeoutId);
    }, [checked, indeterminate, disabled]);

    // Set indeterminate property on input (can't be set via attribute)
    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    // Forward the ref to the input element
    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    // Ripple hook
    const { state: rippleState, handlers: rippleHandlers, surfaceRef } = useRipple<HTMLDivElement>(disabled);

    // Handle input change
    const handleChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(event);
      },
      [onChange]
    );

    // Handle input event
    const handleInput = useCallback(
      (event: React.FormEvent<HTMLInputElement>) => {
        onInput?.(event);
      },
      [onInput]
    );

    // Determine current selection states
    const isChecked = checked && !indeterminate;
    const isIndeterminate = indeterminate;
    const isSelected = isChecked || isIndeterminate;

    // Use refs for previous state (before current change)
    // These values are from BEFORE the current props changed
    const prevChecked = prevCheckedRef.current;
    const prevIndeterminate = prevIndeterminateRef.current;
    const prevDisabled = prevDisabledRef.current;

    // Determine previous selection states for animation
    const prevNone = !prevChecked && !prevIndeterminate;
    const prevWasChecked = prevChecked && !prevIndeterminate;
    const prevWasIndeterminate = prevIndeterminate;

    // Build host class names
    const hostClasses = useMemo(() => {
      const classes = [styles.host];
      if (touchTarget === 'wrapper') classes.push(styles.touchTargetWrapper);
      if (disabled) classes.push(styles.disabled);
      if (className) classes.push(className);
      return classes.filter(Boolean).join(' ');
    }, [touchTarget, disabled, className]);

    // Build container class names for animation states
    // Depends on prevStates to re-compute after animation timeout
    const containerClasses = useMemo(() => {
      const classes = [styles.container];
      if (disabled) classes.push(styles.disabled);
      if (isSelected) classes.push(styles.selected);
      if (!isSelected) classes.push(styles.unselected);
      if (isChecked) classes.push(styles.checked);
      if (isIndeterminate) classes.push(styles.indeterminate);
      if (prevNone) classes.push(styles.prevUnselected);
      if (prevWasChecked) classes.push(styles.prevChecked);
      if (prevWasIndeterminate) classes.push(styles.prevIndeterminate);
      if (prevDisabled) classes.push(styles.prevDisabled);
      return classes.join(' ');
    }, [
      disabled,
      isSelected,
      isChecked,
      isIndeterminate,
      prevNone,
      prevWasChecked,
      prevWasIndeterminate,
      prevDisabled,
      prevStates, // Re-compute when prevStates updates after animation
    ]);

    // Ripple surface classes
    const rippleSurfaceClasses = useMemo(() => {
      const classes = [styles.ripple];
      if (rippleState.hovered) classes.push(styles.hovered);
      if (rippleState.pressed) classes.push(styles.pressed);
      if (isSelected) classes.push(styles.selected);
      return classes.join(' ');
    }, [rippleState.hovered, rippleState.pressed, isSelected]);

    return (
      <div
        className={hostClasses}
        data-touch-target={touchTarget}
      >
        <div className={containerClasses}>
          {/* Hidden input for form integration and accessibility */}
          <input
            ref={inputRef}
            type="checkbox"
            id={inputId}
            className={styles.input}
            checked={checked}
            disabled={disabled}
            required={required}
            value={value}
            name={name}
            onChange={handleChange}
            onInput={handleInput}
            onClick={rippleHandlers.onClick}
            onPointerEnter={rippleHandlers.onPointerEnter}
            onPointerLeave={rippleHandlers.onPointerLeave}
            onPointerDown={rippleHandlers.onPointerDown}
            onPointerUp={rippleHandlers.onPointerUp}
            onPointerCancel={rippleHandlers.onPointerCancel}
            aria-checked={isIndeterminate ? 'mixed' : checked}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            aria-describedby={ariaDescribedBy}
            aria-invalid={ariaInvalid}
            {...props}
          />

          {/* Outline (visible when unchecked) */}
          <div className={styles.outline} aria-hidden="true" />

          {/* Background (visible when checked/indeterminate) */}
          <div className={styles.background} aria-hidden="true" />

          {/* Focus ring */}
          <div className={styles.focusRing} aria-hidden="true" />

          {/* Ripple surface */}
          <div
            ref={surfaceRef}
            className={rippleSurfaceClasses}
            aria-hidden="true"
          />

          {/* Checkmark / Indeterminate icon */}
          <svg className={styles.icon} viewBox="0 0 18 18" aria-hidden="true">
            <rect className={`${styles.mark} ${styles.short}`} />
            <rect className={`${styles.mark} ${styles.long}`} />
          </svg>
        </div>
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
