'use client';

import {
  forwardRef,
  useCallback,
  useRef,
  useImperativeHandle,
  useMemo,
  useId,
} from 'react';
import styles from './Switch.module.css';
import { useRipple } from '../../hooks';

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  selected?: boolean;
  disabled?: boolean;
  required?: boolean;
  icons?: boolean;
  showOnlySelectedIcon?: boolean;
  value?: string;
  name?: string;
  touchTarget?: 'wrapper' | 'none';
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      selected = false,
      disabled = false,
      required = false,
      icons = false,
      showOnlySelectedIcon = false,
      value = 'on',
      name,
      touchTarget = 'wrapper',
      className = '',
      onChange,
      id: providedId,
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = providedId || `switch-${generatedId}`;

    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const { state: rippleState, handlers: rippleHandlers, surfaceRef } = useRipple<HTMLSpanElement>(disabled);

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

    const switchClasses = useMemo(() => {
      const classes = [styles.switch];
      if (selected) classes.push(styles.selected);
      else classes.push(styles.unselected);
      if (disabled) classes.push(styles.disabled);
      return classes.join(' ');
    }, [selected, disabled]);

    const handleClasses = useMemo(() => {
      const classes = [styles.handle];
      const showIcon = showOnlySelectedIcon ? selected : icons;
      if (showIcon) classes.push(styles.withIcon);
      return classes.join(' ');
    }, [icons, showOnlySelectedIcon, selected]);

    const rippleClasses = useMemo(() => {
      const classes = [styles.ripple];
      if (rippleState.hovered) classes.push(styles.hovered);
      if (rippleState.pressed) classes.push(styles.pressed);
      return classes.join(' ');
    }, [rippleState.hovered, rippleState.pressed]);

    const shouldShowIcons = icons || showOnlySelectedIcon;

    return (
      <div className={hostClasses} data-touch-target={touchTarget}>
        <div className={switchClasses}>
          <input
            ref={inputRef}
            type="checkbox"
            role="switch"
            id={inputId}
            className={styles.input}
            checked={selected}
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
            {...props}
          />

          <div className={styles.focusRing} />

          <span className={styles.track}>
            <span className={styles.handleContainer}>
              <span ref={surfaceRef} className={rippleClasses} />
              <span className={handleClasses}>
                {shouldShowIcons && (
                  <div className={styles.icons}>
                    <svg className={`${styles.icon} ${styles.iconOn}`} viewBox="0 0 24 24">
                      <path d="M9.55 18.2 3.65 12.3 5.275 10.675 9.55 14.95 18.725 5.775 20.35 7.4Z" />
                    </svg>
                    {!showOnlySelectedIcon && (
                      <svg className={`${styles.icon} ${styles.iconOff}`} viewBox="0 0 24 24">
                        <path d="M6.4 19.2 4.8 17.6 10.4 12 4.8 6.4 6.4 4.8 12 10.4 17.6 4.8 19.2 6.4 13.6 12 19.2 17.6 17.6 19.2 12 13.6Z" />
                      </svg>
                    )}
                  </div>
                )}
              </span>
            </span>
          </span>
        </div>
      </div>
    );
  }
);

Switch.displayName = 'Switch';
