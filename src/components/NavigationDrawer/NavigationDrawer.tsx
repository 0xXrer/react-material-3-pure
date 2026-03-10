'use client';

import { forwardRef, useCallback, useEffect, useRef } from 'react';
import styles from './NavigationDrawer.module.css';

function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export type NavigationDrawerProps = {
  open?: boolean;
  modal?: boolean;
  anchor?: 'start' | 'end';
  onClose?: () => void;
  className?: string;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

export const NavigationDrawer = forwardRef<HTMLElement, NavigationDrawerProps>(
  ({ open = false, modal = false, anchor = 'start', onClose, className, children, ...props }, ref) => {
    const internalRef = useRef<HTMLElement>(null);
    const drawerRef = (ref as React.RefObject<HTMLElement>) || internalRef;

    useEffect(() => {
      if (!modal || !open) return;
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose?.();
      };
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
      };
    }, [modal, open, onClose]);

    const handleScrimClick = useCallback(() => {
      onClose?.();
    }, [onClose]);

    if (modal) {
      return (
        <div className={cn(styles.modalContainer, open && styles.open)}>
          <div className={styles.scrim} onClick={handleScrimClick} aria-hidden="true" />
          <aside
            ref={drawerRef}
            className={cn(styles.drawer, styles.modal, styles[anchor], open && styles.open, className)}
            role="dialog"
            aria-modal="true"
            {...props}
          >
            <div className={styles.content}>{children}</div>
          </aside>
        </div>
      );
    }

    return (
      <aside
        ref={drawerRef}
        className={cn(styles.drawer, styles.standard, styles[anchor], open && styles.open, className)}
        {...props}
      >
        <div className={styles.content}>{children}</div>
      </aside>
    );
  },
);

NavigationDrawer.displayName = 'NavigationDrawer';

export type NavigationDrawerItemProps = {
  icon?: React.ReactNode;
  active?: boolean;
  badge?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const NavigationDrawerItem = forwardRef<HTMLButtonElement, NavigationDrawerItemProps>(
  ({ icon, active = false, badge, className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(styles.item, active && styles.activeItem, className)}
        role="tab"
        aria-selected={active}
        {...props}
      >
        {icon && <span className={styles.itemIcon}>{icon}</span>}
        <span className={styles.itemLabel}>{children}</span>
        {badge && <span className={styles.itemBadge}>{badge}</span>}
      </button>
    );
  },
);

NavigationDrawerItem.displayName = 'NavigationDrawerItem';

export type NavigationDrawerHeaderProps = {
  className?: string;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export const NavigationDrawerHeader = forwardRef<HTMLDivElement, NavigationDrawerHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(styles.header, className)} {...props}>
        {children}
      </div>
    );
  },
);

NavigationDrawerHeader.displayName = 'NavigationDrawerHeader';
