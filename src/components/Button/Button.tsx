import React, { forwardRef, useCallback, useRef, useImperativeHandle, useMemo, useState } from 'react';
import styles from './Button.module.css';
import { useRipple } from '../../hooks';

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Material Design 3 Button Component
 *
 * A React port of the official @material/web button component.
 * Implements the M3 "Common Buttons" specification with full support
 * for all variants, state layers, ripple effects, and accessibility.
 *
 * @see https://github.com/material-components/material-web/tree/main/button
 * @see https://m3.material.io/components/buttons
 */

export type ButtonVariant = 'filled' | 'outlined' | 'text' | 'elevated' | 'tonal';

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /**
   * The visual style of the button.
   * - `filled` - High emphasis, primary actions (Save, Confirm, Done)
   * - `outlined` - Medium emphasis, secondary actions (Cancel, Back)
   * - `text` - Low emphasis, tertiary actions (Learn more, View all)
   * - `elevated` - Medium emphasis with shadow, for patterned backgrounds
   * - `tonal` - Medium emphasis, secondary container color
   * @default 'filled'
   */
  variant?: ButtonVariant;

  /**
   * Icon element to display. Pass any React element (SVG, icon component, etc.)
   */
  icon?: React.ReactNode;

  /**
   * Whether to render the icon at the inline end of the label
   * rather than the inline start.
   * 
   * _Note:_ Link buttons cannot have trailing icons.
   * @default false
   */
  trailingIcon?: boolean;

  /**
   * Whether or not the button is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether or not the button is "soft-disabled" (disabled but still focusable).
   *
   * Use this when a button needs increased visibility when disabled.
   * @see https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_disabled_controls
   * @default false
   */
  softDisabled?: boolean;

  /**
   * The URL that the link button points to.
   */
  href?: string;

  /**
   * The filename to use when downloading the linked resource.
   * If not specified, the browser will determine a filename.
   * This is only applicable when the button is used as a link (`href` is set).
   */
  download?: string;

  /**
   * Where to display the linked `href` URL for a link button. Common options
   * include `_blank` to open in a new tab.
   */
  target?: '_blank' | '_parent' | '_self' | '_top' | '';

  /**
   * The default behavior of the button. May be "button", "reset", or "submit"
   * (default).
   * @default 'submit'
   */
  type?: 'button' | 'reset' | 'submit';

  /**
   * The value added to a form with the button's name when the button submits a form.
   */
  value?: string;

  /**
   * The name of the button, submitted as a pair with the button's value as part of the form data.
   */
  name?: string;

  /**
   * Button content (label text).
   */
  children: React.ReactNode;
}

/**
 * M3 Button Component
 *
 * @summary Buttons help people take action, such as sending an email, sharing a
 * document, or liking a comment.
 *
 * A production-ready Material Design 3 button ported from @material/web.
 * Features:
 * - 5 visual variants (filled, outlined, text, elevated, tonal)
 * - M3 State Layer implementation (opacity-based state visualization)
 * - Hardware-accelerated ripple effect using Web Animations API
 * - Full accessibility support (ARIA attributes)
 * - Icon support (leading/trailing)
 * - Link support (renders as anchor when href is provided)
 * - Soft-disabled state for increased accessibility
 * - Form integration (name, value, type)
 */
export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      variant = 'filled',
      icon,
      trailingIcon = false,
      disabled = false,
      softDisabled = false,
      href,
      download,
      target = '',
      type = 'submit',
      value = '',
      name,
      children,
      className = '',
      onClick,
      'aria-label': ariaLabel,
      'aria-haspopup': ariaHasPopup,
      'aria-expanded': ariaExpanded,
      ...props
    },
    ref
  ) => {
    const hostRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement & HTMLAnchorElement>(null);
    const [hasIconState, setHasIconState] = useState(!!icon);
    
    const isRippleDisabled = disabled || softDisabled;
    const { state: rippleState, handlers: rippleHandlers, surfaceRef } = useRipple(isRippleDisabled);

    // Forward the ref to the actual button/anchor element
    useImperativeHandle(ref, () => buttonRef.current as HTMLButtonElement | HTMLAnchorElement);

    // Update hasIcon state when icon prop changes
    React.useEffect(() => {
      setHasIconState(!!icon);
    }, [icon]);

    // Handle click - prevent if soft-disabled or disabled link
    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        if (softDisabled || (disabled && href)) {
          e.stopPropagation();
          e.preventDefault();
          return;
        }
        
        rippleHandlers.onClick(e);
        onClick?.(e as React.MouseEvent<HTMLButtonElement>);
        
        // Focus the button after click
        buttonRef.current?.focus();
      },
      [softDisabled, disabled, href, onClick, rippleHandlers]
    );

    // Build host class names
    const hostClasses = useMemo(() => {
      const classes = [styles.host, styles[variant]];
      if (hasIconState && !trailingIcon) classes.push(styles.hasLeadingIcon);
      if (hasIconState && trailingIcon) classes.push(styles.hasTrailingIcon);
      if (disabled) classes.push(styles.disabled);
      if (softDisabled) classes.push(styles.softDisabled);
      if (className) classes.push(className);
      return classes.filter(Boolean).join(' ');
    }, [variant, hasIconState, trailingIcon, disabled, softDisabled, className]);

    // Ripple surface classes
    const rippleSurfaceClasses = useMemo(() => {
      const classes = [styles.surface];
      if (rippleState.hovered) classes.push(styles.hovered);
      if (rippleState.pressed) classes.push(styles.pressed);
      return classes.join(' ');
    }, [rippleState.hovered, rippleState.pressed]);

    /**
     * Render elevation or outline based on variant.
     * - Elevated, Filled, Tonal: use elevation
     * - Outlined: use outline div
     * - Text: nothing
     */
    const renderElevationOrOutline = () => {
      if (variant === 'outlined') {
        return <div className={styles.outline} aria-hidden="true" />;
      }
      if (variant === 'elevated' || variant === 'filled' || variant === 'tonal') {
        return <div className={styles.elevation} aria-hidden="true" />;
      }
      return null;
    };

    /**
     * Render button content (touch target, icon, label)
     */
    const renderContent = () => {
      const iconSlot = icon ? (
        <span className={styles.iconSlot} aria-hidden="true">
          {icon}
        </span>
      ) : null;

      return (
        <>
          <span className={styles.touch} aria-hidden="true" />
          {!trailingIcon && iconSlot}
          <span className={styles.label}>
            {children}
          </span>
          {trailingIcon && iconSlot}
        </>
      );
    };

    // Shared props for button/link elements
    const sharedProps = {
      ref: buttonRef,
      id: href ? 'link' : 'button',
      className: styles.button,
      onClick: handleClick,
      onPointerEnter: rippleHandlers.onPointerEnter,
      onPointerLeave: rippleHandlers.onPointerLeave,
      onPointerDown: rippleHandlers.onPointerDown,
      onPointerUp: rippleHandlers.onPointerUp,
      onPointerCancel: rippleHandlers.onPointerCancel,
      'aria-label': ariaLabel,
      'aria-haspopup': ariaHasPopup,
      'aria-expanded': ariaExpanded,
    };

    // Render as link if href is provided
    if (href) {
      return (
        <div ref={hostRef} className={hostClasses} data-variant={variant}>
          {renderElevationOrOutline()}
          <div className={styles.background} aria-hidden="true" />
          <div className={styles.focusRing} aria-hidden="true" />
          <div ref={surfaceRef} className={rippleSurfaceClasses} data-ripple-surface aria-hidden="true" />
          <a
            {...(sharedProps as any)}
            href={disabled ? undefined : href}
            download={download || undefined}
            target={target || undefined}
            aria-disabled={disabled || softDisabled || undefined}
            tabIndex={disabled && !softDisabled ? -1 : undefined}
            {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
          >
            {renderContent()}
          </a>
        </div>
      );
    }

    // Render as button (default)
    return (
      <div ref={hostRef} className={hostClasses} data-variant={variant}>
        {renderElevationOrOutline()}
        <div className={styles.background} aria-hidden="true" />
        <div className={styles.focusRing} aria-hidden="true" />
        <div ref={surfaceRef} className={rippleSurfaceClasses} data-ripple-surface aria-hidden="true" />
        <button
          {...sharedProps}
          type={type}
          value={value}
          name={name}
          disabled={disabled}
          aria-disabled={softDisabled || undefined}
          {...props}
        >
          {renderContent()}
        </button>
      </div>
    );
  }
);

Button.displayName = 'Button';
