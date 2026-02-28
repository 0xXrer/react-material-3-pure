'use client';

import {
  forwardRef,
  useState,
  useRef,
  useCallback,
  useEffect,
  useMemo,
  createContext,
  useContext,
} from 'react';
import styles from './Menu.module.css';
import { useRipple } from '../../hooks';

function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

interface MenuContextValue {
  closeMenu: () => void;
}

const MenuContext = createContext<MenuContextValue | null>(null);

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

    useEffect(() => {
      if (!open) return;

      const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as Node;
        if (
          menuRef.current &&
          !menuRef.current.contains(target) &&
          anchorEl &&
          !anchorEl.contains(target)
        ) {
          onClose?.();
        }
      };

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose?.();
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEscape);
      };
    }, [open, anchorEl, onClose]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        const items = menuRef.current?.querySelectorAll(
          '[role="menuitem"]:not([aria-disabled="true"])'
        );
        if (!items?.length) return;
        const itemArray = Array.from(items) as HTMLElement[];
        const current = document.activeElement;
        const idx = itemArray.indexOf(current as HTMLElement);

        switch (e.key) {
          case 'ArrowDown':
            e.preventDefault();
            itemArray[(idx + 1) % itemArray.length]?.focus();
            break;
          case 'ArrowUp':
            e.preventDefault();
            itemArray[(idx - 1 + itemArray.length) % itemArray.length]?.focus();
            break;
          case 'Home':
            e.preventDefault();
            itemArray[0]?.focus();
            break;
          case 'End':
            e.preventDefault();
            itemArray[itemArray.length - 1]?.focus();
            break;
        }
      },
      []
    );

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
      () => ({ closeMenu: () => onClose?.() }),
      [onClose]
    );

    if (!open) return null;

    return (
      <MenuContext.Provider value={contextValue}>
        <div
          ref={(node) => {
            (menuRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) ref.current = node;
          }}
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
      </MenuContext.Provider>
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
    const ctx = useContext(MenuContext);
    const { surfaceRef, handlers, state } = useRipple<HTMLSpanElement>(disabled);

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        handlers.onClick(e as React.MouseEvent<HTMLElement>);
        if (!disabled) {
          onClick?.(e);
          ctx?.closeMenu();
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
