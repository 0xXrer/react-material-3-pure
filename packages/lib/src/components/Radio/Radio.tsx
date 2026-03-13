'use client';

import {
  forwardRef,
  useCallback,
  useRef,
  useImperativeHandle,
  useMemo,
  useState,
  useId,
} from 'react';
import styles from './Radio.module.css';
import { useRipple } from '../../hooks';

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  checked?: boolean;
  disabled?: boolean;
  required?: boolean;
  value?: string;
  name?: string;
  touchTarget?: 'wrapper' | 'none';
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

let maskIdCounter = 0;

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      checked = false,
      disabled = false,
      required = false,
      value = 'on',
      name,
      touchTarget = 'wrapper',
      className = '',
      onChange,
      id: providedId,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      'aria-describedby': ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = providedId || `radio-${generatedId}`;
    const [maskId] = useState(() => `radio-cutout-${++maskIdCounter}`);
    
    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const { state: rippleState, handlers: rippleHandlers, surfaceRef } = useRipple<HTMLDivElement>(disabled);

    const handleChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(event);
      },
      [onChange]
    );

    const hostClasses = useMemo(() => {
      const classes = [styles.host];
      if (touchTarget === 'wrapper') classes.push(styles.touchTargetWrapper);
      if (disabled) classes.push(styles.disabled);
      if (className) classes.push(className);
      return classes.filter(Boolean).join(' ');
    }, [touchTarget, disabled, className]);

    const containerClasses = useMemo(() => {
      const classes = [styles.container];
      if (checked) classes.push(styles.checked);
      return classes.join(' ');
    }, [checked]);

    const rippleClasses = useMemo(() => {
      const classes = [styles.ripple];
      if (rippleState.hovered) classes.push(styles.hovered);
      if (rippleState.pressed) classes.push(styles.pressed);
      if (checked) classes.push(styles.selected);
      return classes.join(' ');
    }, [rippleState.hovered, rippleState.pressed, checked]);

    return (
      <div
        className={hostClasses}
        data-touch-target={touchTarget}
      >
        <input
          ref={inputRef}
          type="radio"
          id={inputId}
          className={styles.input}
          checked={checked}
          disabled={disabled}
          required={required}
          value={value}
          name={name}
          onChange={handleChange}
          onClick={rippleHandlers.onClick}
          onPointerEnter={rippleHandlers.onPointerEnter}
          onPointerLeave={rippleHandlers.onPointerLeave}
          onPointerDown={rippleHandlers.onPointerDown}
          onPointerUp={rippleHandlers.onPointerUp}
          onPointerCancel={rippleHandlers.onPointerCancel}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-describedby={ariaDescribedBy}
          {...props}
        />
        <div className={containerClasses} aria-hidden="true">
          <div ref={surfaceRef} className={rippleClasses} />
          <div className={styles.focusRing} />
          <svg className={styles.icon} viewBox="0 0 20 20">
            <mask id={maskId}>
              <rect width="100%" height="100%" fill="white" />
              <circle cx="10" cy="10" r="8" fill="black" />
            </mask>
            <circle
              className={`${styles.circle} ${styles.outer}`}
              cx="10"
              cy="10"
              r="10"
              mask={`url(#${maskId})`}
            />
            <circle
              className={`${styles.circle} ${styles.inner}`}
              cx="10"
              cy="10"
              r="5"
            />
          </svg>
          <div className={styles.touchTarget} />
        </div>
      </div>
    );
  }
);

Radio.displayName = 'Radio';
