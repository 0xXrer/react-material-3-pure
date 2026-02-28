'use client';

import { forwardRef, useCallback } from 'react';
import styles from './List.module.css';
import { useRipple } from '../../hooks';

function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export type ListItemType = 'text' | 'button' | 'link';

export interface ListProps {
  className?: string;
  children?: React.ReactNode;
}

export const List = forwardRef<HTMLUListElement, ListProps>(
  ({ className, children }, ref) => {
    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
      const list = e.currentTarget;
      const items = Array.from(
        list.querySelectorAll('[role="listitem"]:not([aria-disabled="true"])')
      ) as HTMLElement[];
      if (!items.length) return;

      const current = document.activeElement as HTMLElement;
      const idx = items.indexOf(current);

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          items[(idx + 1) % items.length]?.focus();
          break;
        case 'ArrowUp':
          e.preventDefault();
          items[(idx - 1 + items.length) % items.length]?.focus();
          break;
        case 'Home':
          e.preventDefault();
          items[0]?.focus();
          break;
        case 'End':
          e.preventDefault();
          items[items.length - 1]?.focus();
          break;
      }
    }, []);

    return (
      <ul
        ref={ref}
        role="list"
        className={cn(styles.list, className)}
        onKeyDown={handleKeyDown}
      >
        {children}
      </ul>
    );
  }
);

List.displayName = 'List';

export interface ListItemProps {
  type?: ListItemType;
  disabled?: boolean;
  headline: string;
  supportingText?: string;
  trailingSupportingText?: string;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  leadingAvatar?: React.ReactNode;
  leadingImage?: string;
  onClick?: (e: React.MouseEvent) => void;
  href?: string;
  target?: string;
  className?: string;
  children?: React.ReactNode;
}

export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
  (
    {
      type = 'text',
      disabled = false,
      headline,
      supportingText,
      trailingSupportingText,
      leadingIcon,
      trailingIcon,
      leadingAvatar,
      leadingImage,
      onClick,
      href,
      target,
      className,
    },
    ref
  ) => {
    const isInteractive = type !== 'text';
    const { surfaceRef, handlers, state } = useRipple<HTMLSpanElement>(
      disabled || !isInteractive
    );

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLLIElement>) => {
        if (isInteractive) {
          handlers.onClick(e as React.MouseEvent<HTMLElement>);
        }
        if (!disabled) {
          onClick?.(e);
        }
      },
      [disabled, isInteractive, onClick, handlers]
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (!isInteractive || disabled) return;
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (type === 'link' && href) {
            window.open(href, target || '_self');
          } else {
            onClick?.(e as unknown as React.MouseEvent);
          }
        }
      },
      [isInteractive, disabled, type, href, target, onClick]
    );

    const hasLeading = !!(leadingIcon || leadingAvatar || leadingImage);
    const hasTrailing = !!(trailingIcon || trailingSupportingText);
    const multiLine = !!supportingText;

    const content = (
      <>
        {isInteractive && (
          <>
            <span ref={surfaceRef} className={styles.ripple} aria-hidden="true" />
            <span className={styles.itemStateLayer} aria-hidden="true" />
          </>
        )}

        {leadingIcon && (
          <span className={styles.leading}>{leadingIcon}</span>
        )}

        {leadingAvatar && (
          <span className={styles.leadingAvatarWrapper}>{leadingAvatar}</span>
        )}

        {leadingImage && (
          <img
            className={styles.leadingImg}
            src={leadingImage}
            alt=""
            aria-hidden="true"
          />
        )}

        <span className={styles.body}>
          <span className={styles.headline}>{headline}</span>
          {supportingText && (
            <span className={styles.supporting}>{supportingText}</span>
          )}
        </span>

        {trailingSupportingText && (
          <span className={styles.trailingText}>{trailingSupportingText}</span>
        )}

        {trailingIcon && (
          <span className={styles.trailing}>{trailingIcon}</span>
        )}
      </>
    );

    return (
      <li
        ref={ref}
        role="listitem"
        tabIndex={isInteractive && !disabled ? 0 : undefined}
        aria-disabled={disabled || undefined}
        className={cn(
          styles.listItem,
          isInteractive && styles.interactive,
          multiLine && styles.multiLine,
          disabled && styles.listItemDisabled,
          state.pressed && styles.pressed,
          hasLeading && styles.hasLeading,
          hasTrailing && styles.hasTrailing,
          className
        )}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onPointerEnter={isInteractive ? handlers.onPointerEnter : undefined}
        onPointerLeave={isInteractive ? handlers.onPointerLeave : undefined}
        onPointerDown={isInteractive ? handlers.onPointerDown : undefined}
        onPointerUp={isInteractive ? handlers.onPointerUp : undefined}
        onPointerCancel={isInteractive ? handlers.onPointerCancel : undefined}
      >
        {type === 'link' && href ? (
          <a
            href={href}
            target={target}
            className={styles.linkOverlay}
            tabIndex={-1}
            aria-hidden="true"
          />
        ) : null}
        {content}
      </li>
    );
  }
);

ListItem.displayName = 'ListItem';

export interface ListDividerProps {
  className?: string;
}

export const ListDivider = forwardRef<HTMLHRElement, ListDividerProps>(
  ({ className }, ref) => (
    <hr
      ref={ref}
      role="separator"
      className={cn(styles.divider, className)}
    />
  )
);

ListDivider.displayName = 'ListDivider';
