'use client';

import {
  forwardRef,
  useState,
  useRef,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import styles from './Menu.module.css';
import { useRipple, useClickOutside, useKeyboardNavigation } from '../../hooks';
import { cn, createSafeContext, mergeRefs } from '../../utils';

interface MenuContextValue {
  closeMenu: () => void;
}

const [MenuProvider, useMenuContext] = createSafeContext<MenuContextValue>('Menu');

export type MenuPositioning = 'absolute' | 'fixed' | 'popover';
export type MenuCorner = 'start-start' | 'start-end' | 'end-start' | 'end-end';

export interface MenuProps {
  open?: boolean;
  onClose?: () => void;
  anchorEl?: HTMLElement | null;
  positioning?: MenuPositioning;
  anchorCorner?: MenuCorner;
  menuCorner?: MenuCorner;
  className?: string;
  children?: React.ReactNode;
}

export const Menu = forwardRef<HTMLDivElement, MenuProps>(
  (
    {
      open = false,
      onClose,
      anchorEl,
      positioning = 'absolute',
      className,
      children,
    },
    ref
  ) => {
    const menuRef = useRef<HTMLDivElement>(null);
    const anchorRef = useRef<HTMLElement | null>(null);
    anchorRef.current = anchorEl ?? null;

    const [position, setPosition] = useState({ top: 0, left: 0 });

    useEffect(() => {
      if (!open || !anchorEl) return;
      const rect = anchorEl.getBoundingClientRect();
      if (positioning === 'fixed') {
        setPosition({ top: rect.bottom, left: rect.left });
      } else {
        setPosition({ top: anchorEl.offsetHeight, left: 0 });
      }
    }, [open, anchorEl, positioning]);

    const handleClose = useCallback(() => onClose?.(), [onClose]);

    useClickOutside([menuRef, anchorRef], handleClose, open);

    useEffect(() => {
      if (!open) return;
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') handleClose();
      };
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }, [open, handleClose]);

    const { handleKeyDown } = useKeyboardNavigation({
      selector: '[role="menuitem"]:not([aria-disabled="true"])',
      orientation: 'vertical',
    });

    useEffect(() => {
      if (!open) return;
      requestAnimationFrame(() => {
        const first = menuRef.current?.querySelector(
          '[role="menuitem"]:not([aria-disabled="true"])'
        ) as HTMLElement | null;
        first?.focus();
      });
    }, [open]);

    const contextValue = useMemo(
      () => ({ closeMenu: handleClose }),
      [handleClose]
    );

    if (!open) return null;

    return (
      <MenuProvider value={contextValue}>
        <div
          ref={mergeRefs(ref, menuRef)}
          role="menu"
          className={cn(
            styles.menu,
            positioning === 'fixed' && styles.fixed,
            className
          )}
          style={{
            top: position.top,
            left: position.left,
          }}
          onKeyDown={handleKeyDown}
        >
          <div className={styles.menuContent}>{children}</div>
        </div>
      </MenuProvider>
    );
  }
);

Menu.displayName = 'Menu';

export interface MenuItemProps {
  disabled?: boolean;
  selected?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  trailingText?: string;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  children?: React.ReactNode;
}

export const MenuItem = forwardRef<HTMLDivElement, MenuItemProps>(
  (
    {
      disabled = false,
      selected = false,
      leadingIcon,
      trailingIcon,
      trailingText,
      onClick,
      className,
      children,
    },
    ref
  ) => {
    const ctx = useMenuContext();
    const { surfaceRef, handlers, state } = useRipple<HTMLSpanElement>(disabled);

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        handlers.onClick(e as React.MouseEvent<HTMLElement>);
        if (!disabled) {
          onClick?.(e);
          ctx.closeMenu();
        }
      },
      [disabled, onClick, ctx, handlers]
    );

    return (
      <div
        ref={ref}
        role="menuitem"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled || undefined}
        className={cn(
          styles.menuItem,
          selected && styles.menuItemSelected,
          disabled && styles.menuItemDisabled,
          state.pressed && styles.pressed,
          className
        )}
        onClick={handleClick}
        onPointerEnter={handlers.onPointerEnter}
        onPointerLeave={handlers.onPointerLeave}
        onPointerDown={handlers.onPointerDown}
        onPointerUp={handlers.onPointerUp}
        onPointerCancel={handlers.onPointerCancel}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick(e as unknown as React.MouseEvent<HTMLDivElement>);
          }
        }}
      >
        <span ref={surfaceRef} className={styles.menuItemRipple} aria-hidden="true" />
        <span className={styles.menuItemStateLayer} aria-hidden="true" />

        {leadingIcon && (
          <span className={styles.menuItemLeading}>{leadingIcon}</span>
        )}

        <span className={styles.menuItemContent}>{children}</span>

        {trailingText && (
          <span className={styles.menuItemTrailing}>{trailingText}</span>
        )}
        {trailingIcon && (
          <span className={styles.menuItemTrailing}>{trailingIcon}</span>
        )}
      </div>
    );
  }
);

MenuItem.displayName = 'MenuItem';

export interface MenuDividerProps {
  className?: string;
}

export const MenuDivider = forwardRef<HTMLHRElement, MenuDividerProps>(
  ({ className }, ref) => (
    <hr
      ref={ref}
      role="separator"
      className={cn(styles.menuDivider, className)}
    />
  )
);

MenuDivider.displayName = 'MenuDivider';
