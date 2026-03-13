'use client';

import {
  forwardRef,
  useCallback,
  useMemo,
  useRef,
  useImperativeHandle,
} from 'react';
import styles from './Chip.module.css';
import { useRipple } from '../../hooks';

/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Material Design 3 Chip Components
 *
 * A React port of the official @material/web chip components.
 * Implements all M3 chip variants: Assist, Filter, Input, and Suggestion.
 *
 * @see https://github.com/material-components/material-web/tree/main/chips
 * @see https://m3.material.io/components/chips
 */

export type ChipVariant = 'assist' | 'filter' | 'input' | 'suggestion';

/* ==========================================================================
   BASE CHIP PROPS
   ========================================================================== */

export interface ChipBaseProps {
  /**
   * The label text of the chip.
   */
  label: string;

  /**
   * Whether the chip is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the chip is "soft-disabled" (disabled but still focusable).
   * Use for increased visibility when disabled.
   * @default false
   */
  softDisabled?: boolean;

  /**
   * Whether the chip is elevated (has shadow).
   * @default false
   */
  elevated?: boolean;

  /**
   * Leading icon element.
   */
  icon?: React.ReactNode;

  /**
   * Additional CSS class names.
   */
  className?: string;

  /**
   * Click handler.
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
}

/* ==========================================================================
   ASSIST CHIP
   ========================================================================== */

export interface AssistChipProps extends ChipBaseProps {
  /**
   * URL for link chips.
   */
  href?: string;

  /**
   * Link target.
   */
  target?: '_blank' | '_parent' | '_self' | '_top' | '';

  /**
   * Download filename for link chips.
   */
  download?: string;
}

/**
 * Assist Chip
 *
 * Assist chips represent smart or automated actions that can span multiple apps.
 * They function as though the user asked an assistant to complete the action.
 */
export const AssistChip = forwardRef<HTMLButtonElement | HTMLAnchorElement, AssistChipProps>(
  (
    {
      label,
      disabled = false,
      softDisabled = false,
      elevated = false,
      icon,
      href,
      target,
      download,
      className = '',
      onClick,
      ...props
    },
    ref
  ) => {
    const elementRef = useRef<HTMLButtonElement & HTMLAnchorElement>(null);
    useImperativeHandle(ref, () => elementRef.current!);

    const isDisabled = disabled || softDisabled;
    const isLink = !!href && !disabled;
    
    const { state: rippleState, handlers: rippleHandlers, surfaceRef } = useRipple(isDisabled);

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        if (softDisabled) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        rippleHandlers.onClick(e);
        onClick?.(e);
      },
      [softDisabled, onClick, rippleHandlers]
    );

    const containerClasses = useMemo(() => {
      const classes = [styles.chip, styles.assist];
      if (elevated) classes.push(styles.elevated);
      if (disabled) classes.push(styles.disabled);
      if (softDisabled) classes.push(styles.softDisabled);
      if (isLink) classes.push(styles.link);
      if (icon) classes.push(styles.hasIcon);
      if (className) classes.push(className);
      return classes.join(' ');
    }, [elevated, disabled, softDisabled, isLink, icon, className]);

    const rippleClasses = useMemo(() => {
      const classes = [styles.ripple];
      if (rippleState.hovered) classes.push(styles.hovered);
      if (rippleState.pressed) classes.push(styles.pressed);
      return classes.join(' ');
    }, [rippleState]);

    const content = (
      <>
        <span className={styles.outline} aria-hidden="true" />
        {elevated && <span className={styles.elevation} aria-hidden="true" />}
        <span className={styles.focusRing} aria-hidden="true" />
        <span ref={surfaceRef} className={rippleClasses} aria-hidden="true" />
        {icon && <span className={styles.leadingIcon} aria-hidden="true">{icon}</span>}
        <span className={styles.labelText}>{label}</span>
        <span className={styles.touch} aria-hidden="true" />
      </>
    );

    const sharedProps = {
      ref: elementRef,
      className: containerClasses,
      onClick: handleClick,
      onPointerEnter: rippleHandlers.onPointerEnter,
      onPointerLeave: rippleHandlers.onPointerLeave,
      onPointerDown: rippleHandlers.onPointerDown,
      onPointerUp: rippleHandlers.onPointerUp,
      onPointerCancel: rippleHandlers.onPointerCancel,
      ...props,
    };

    if (isLink) {
      return (
        <a
          {...(sharedProps as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
          href={href}
          target={target}
          download={download}
          aria-disabled={softDisabled || undefined}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        {...(sharedProps as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        type="button"
        disabled={disabled}
        aria-disabled={softDisabled || undefined}
      >
        {content}
      </button>
    );
  }
);

AssistChip.displayName = 'AssistChip';

/* ==========================================================================
   FILTER CHIP
   ========================================================================== */

export interface FilterChipProps extends Omit<ChipBaseProps, 'onClick'> {
  /**
   * Whether the chip is selected.
   * @default false
   */
  selected?: boolean;

  /**
   * Whether the chip can be removed.
   * @default false
   */
  removable?: boolean;

  /**
   * Called when selection changes.
   */
  onChange?: (selected: boolean) => void;

  /**
   * Called when remove button is clicked.
   */
  onRemove?: () => void;

  /**
   * Selected icon (shown when selected, defaults to checkmark).
   */
  selectedIcon?: React.ReactNode;
}

const CheckmarkIcon = () => (
  <svg viewBox="0 0 18 18" fill="currentColor">
    <path d="M6.75 12.127L3.623 9l-1.06 1.057 4.187 4.193 9-9-1.057-1.06z" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
);

/**
 * Filter Chip
 *
 * Filter chips use tags or descriptive words to filter content.
 * They can be toggled on/off and optionally removed.
 */
export const FilterChip = forwardRef<HTMLButtonElement, FilterChipProps>(
  (
    {
      label,
      disabled = false,
      softDisabled = false,
      elevated = false,
      selected = false,
      removable = false,
      icon,
      selectedIcon,
      className = '',
      onChange,
      onRemove,
      ...props
    },
    ref
  ) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const removeButtonRef = useRef<HTMLButtonElement>(null);
    useImperativeHandle(ref, () => buttonRef.current!);

    const isDisabled = disabled || softDisabled;
    const { state: rippleState, handlers: rippleHandlers, surfaceRef } = useRipple(isDisabled);

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (softDisabled) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        rippleHandlers.onClick(e);
        onChange?.(!selected);
      },
      [softDisabled, selected, onChange, rippleHandlers]
    );

    const handleRemove = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (!isDisabled) {
          onRemove?.();
        }
      },
      [isDisabled, onRemove]
    );

    const containerClasses = useMemo(() => {
      const classes = [styles.chip, styles.filter];
      if (elevated) classes.push(styles.elevated);
      if (disabled) classes.push(styles.disabled);
      if (softDisabled) classes.push(styles.softDisabled);
      if (selected) classes.push(styles.selected);
      if (icon || selected) classes.push(styles.hasIcon);
      if (removable) classes.push(styles.hasTrailing);
      if (className) classes.push(className);
      return classes.join(' ');
    }, [elevated, disabled, softDisabled, selected, icon, removable, className]);

    const rippleClasses = useMemo(() => {
      const classes = [styles.ripple];
      if (rippleState.hovered) classes.push(styles.hovered);
      if (rippleState.pressed) classes.push(styles.pressed);
      if (selected) classes.push(styles.selected);
      return classes.join(' ');
    }, [rippleState, selected]);

    const leadingIcon = selected
      ? (selectedIcon || <CheckmarkIcon />)
      : icon;

    return (
      <div className={containerClasses}>
        <button
          ref={buttonRef}
          type="button"
          className={styles.primaryAction}
          disabled={disabled}
          aria-disabled={softDisabled || undefined}
          aria-pressed={selected}
          onClick={handleClick}
          onPointerEnter={rippleHandlers.onPointerEnter}
          onPointerLeave={rippleHandlers.onPointerLeave}
          onPointerDown={rippleHandlers.onPointerDown}
          onPointerUp={rippleHandlers.onPointerUp}
          onPointerCancel={rippleHandlers.onPointerCancel}
          {...props}
        >
          <span className={styles.outline} aria-hidden="true" />
          {elevated && <span className={styles.elevation} aria-hidden="true" />}
          <span className={styles.focusRing} aria-hidden="true" />
          <span ref={surfaceRef} className={rippleClasses} aria-hidden="true" />
          {leadingIcon && (
            <span className={styles.leadingIcon} aria-hidden="true">
              {leadingIcon}
            </span>
          )}
          <span className={styles.labelText}>{label}</span>
          <span className={styles.touch} aria-hidden="true" />
        </button>
        {removable && (
          <button
            ref={removeButtonRef}
            type="button"
            className={styles.trailingAction}
            onClick={handleRemove}
            disabled={disabled}
            aria-label={`Remove ${label}`}
            tabIndex={-1}
          >
            <span className={styles.trailingIcon}>
              <CloseIcon />
            </span>
          </button>
        )}
      </div>
    );
  }
);

FilterChip.displayName = 'FilterChip';

/* ==========================================================================
   INPUT CHIP
   ========================================================================== */

export interface InputChipProps extends Omit<ChipBaseProps, 'onClick'> {
  /**
   * Whether the chip displays as an avatar chip.
   * @default false
   */
  avatar?: boolean;

  /**
   * Whether the chip is selected.
   * @default false
   */
  selected?: boolean;

  /**
   * URL for link chips.
   */
  href?: string;

  /**
   * Link target.
   */
  target?: '_blank' | '_parent' | '_self' | '_top' | '';

  /**
   * Called when the chip is clicked.
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;

  /**
   * Called when remove button is clicked.
   */
  onRemove?: () => void;

  /**
   * Aria label for the remove button.
   */
  removeAriaLabel?: string;
}

/**
 * Input Chip
 *
 * Input chips represent information entered by a user, such as
 * entities or selections from a list or menu.
 */
export const InputChip = forwardRef<HTMLButtonElement | HTMLAnchorElement, InputChipProps>(
  (
    {
      label,
      disabled = false,
      softDisabled = false,
      avatar = false,
      selected = false,
      icon,
      href,
      target,
      className = '',
      onClick,
      onRemove,
      removeAriaLabel,
      ...props
    },
    ref
  ) => {
    const elementRef = useRef<HTMLButtonElement & HTMLAnchorElement>(null);
    const removeButtonRef = useRef<HTMLButtonElement>(null);
    useImperativeHandle(ref, () => elementRef.current!);

    const isDisabled = disabled || softDisabled;
    const isLink = !!href && !disabled;
    
    const { state: rippleState, handlers: rippleHandlers, surfaceRef } = useRipple(isDisabled);

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        if (softDisabled) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        rippleHandlers.onClick(e);
        onClick?.(e);
      },
      [softDisabled, onClick, rippleHandlers]
    );

    const handleRemove = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (!isDisabled) {
          onRemove?.();
        }
      },
      [isDisabled, onRemove]
    );

    const containerClasses = useMemo(() => {
      const classes = [styles.chip, styles.input];
      if (disabled) classes.push(styles.disabled);
      if (softDisabled) classes.push(styles.softDisabled);
      if (selected) classes.push(styles.selected);
      if (avatar) classes.push(styles.avatar);
      if (isLink) classes.push(styles.link);
      if (icon) classes.push(styles.hasIcon);
      if (className) classes.push(className);
      return classes.join(' ');
    }, [disabled, softDisabled, selected, avatar, isLink, icon, className]);

    const rippleClasses = useMemo(() => {
      const classes = [styles.ripple];
      if (rippleState.hovered) classes.push(styles.hovered);
      if (rippleState.pressed) classes.push(styles.pressed);
      return classes.join(' ');
    }, [rippleState]);

    const sharedProps = {
      className: styles.primaryAction,
      onClick: handleClick,
      onPointerEnter: rippleHandlers.onPointerEnter,
      onPointerLeave: rippleHandlers.onPointerLeave,
      onPointerDown: rippleHandlers.onPointerDown,
      onPointerUp: rippleHandlers.onPointerUp,
      onPointerCancel: rippleHandlers.onPointerCancel,
    };

    const primaryContent = (
      <>
        {icon && <span className={styles.leadingIcon} aria-hidden="true">{icon}</span>}
        <span className={styles.labelText}>{label}</span>
        <span className={styles.touch} aria-hidden="true" />
      </>
    );

    return (
      <div ref={elementRef as any} className={containerClasses}>
        <span className={styles.outline} aria-hidden="true" />
        <span className={styles.focusRing} aria-hidden="true" />
        <span ref={surfaceRef} className={rippleClasses} aria-hidden="true" />
        
        {isLink ? (
          <a
            {...(sharedProps as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
            href={href}
            target={target}
            aria-disabled={softDisabled || undefined}
          >
            {primaryContent}
          </a>
        ) : (
          <button
            {...(sharedProps as React.ButtonHTMLAttributes<HTMLButtonElement>)}
            type="button"
            disabled={disabled}
            aria-disabled={softDisabled || undefined}
            {...props}
          >
            {primaryContent}
          </button>
        )}
        
        <button
          ref={removeButtonRef}
          type="button"
          className={styles.trailingAction}
          onClick={handleRemove}
          disabled={disabled}
          aria-label={removeAriaLabel || `Remove ${label}`}
        >
          <span className={styles.trailingIcon}>
            <CloseIcon />
          </span>
        </button>
      </div>
    );
  }
);

InputChip.displayName = 'InputChip';

/* ==========================================================================
   SUGGESTION CHIP
   ========================================================================== */

export type SuggestionChipProps = AssistChipProps;

/**
 * Suggestion Chip
 *
 * Suggestion chips help narrow a user's intent by presenting dynamically
 * generated suggestions, such as possible responses or search filters.
 *
 * Functionally identical to AssistChip but with different visual tokens.
 */
export const SuggestionChip = forwardRef<HTMLButtonElement | HTMLAnchorElement, SuggestionChipProps>(
  (props, ref) => {
    const { className = '', ...rest } = props;
    return (
      <AssistChip
        ref={ref}
        className={`${styles.suggestion} ${className}`.trim()}
        {...rest}
      />
    );
  }
);

SuggestionChip.displayName = 'SuggestionChip';

/* ==========================================================================
   CHIP SET
   ========================================================================== */

export interface ChipSetProps {
  /**
   * Chip elements.
   */
  children: React.ReactNode;

  /**
   * Additional CSS class names.
   */
  className?: string;

  /**
   * ARIA label for the chip set.
   */
  'aria-label'?: string;
}

/**
 * Chip Set
 *
 * A container for organizing chips with proper keyboard navigation.
 */
export const ChipSet = forwardRef<HTMLDivElement, ChipSetProps>(
  ({ children, className = '', 'aria-label': ariaLabel, ...props }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => containerRef.current!);

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
      const isLeft = e.key === 'ArrowLeft';
      const isRight = e.key === 'ArrowRight';
      const isHome = e.key === 'Home';
      const isEnd = e.key === 'End';

      if (!isLeft && !isRight && !isHome && !isEnd) return;

      const container = containerRef.current;
      if (!container) return;

      const chips = Array.from(
        container.querySelectorAll<HTMLElement>('button:not([disabled]), a:not([aria-disabled="true"])')
      );

      if (chips.length < 2) return;

      e.preventDefault();

      const currentIndex = chips.findIndex((chip) => chip === document.activeElement);
      let nextIndex: number;

      if (isHome) {
        nextIndex = 0;
      } else if (isEnd) {
        nextIndex = chips.length - 1;
      } else {
        const isRtl = getComputedStyle(container).direction === 'rtl';
        const forward = isRtl ? isLeft : isRight;

        if (currentIndex === -1) {
          nextIndex = forward ? 0 : chips.length - 1;
        } else {
          nextIndex = forward
            ? (currentIndex + 1) % chips.length
            : (currentIndex - 1 + chips.length) % chips.length;
        }
      }

      chips[nextIndex]?.focus();
    }, []);

    const containerClasses = useMemo(() => {
      const classes = [styles.chipSet];
      if (className) classes.push(className);
      return classes.join(' ');
    }, [className]);

    return (
      <div
        ref={containerRef}
        role="toolbar"
        aria-label={ariaLabel}
        className={containerClasses}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ChipSet.displayName = 'ChipSet';
