'use client';

import { forwardRef, useCallback } from 'react';
import styles from './NavigationBar.module.css';
import { useRipple } from '../../hooks';
import { cn, createOptionalContext } from '../../utils';

interface NavBarContext {
  activeIndex: number;
  hideLabels: boolean;
}

const [NavBarProvider, useNavBarContext] = createOptionalContext<NavBarContext>('NavBar', { activeIndex: 0, hideLabels: false });

export type NavigationBarProps = {
  activeIndex?: number;
  onChange?: (index: number) => void;
  hideLabels?: boolean;
  className?: string;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

export const NavigationBar = forwardRef<HTMLElement, NavigationBarProps>(
  ({ activeIndex = 0, onChange, hideLabels = false, className, children, ...props }, ref) => {
    return (
      <NavBarProvider value={{ activeIndex, hideLabels }}>
        <nav ref={ref} className={cn(styles.bar, className)} role="navigation" {...props}>
          <div className={styles.content}>
            {Array.isArray(children)
              ? children.map((child, i) => {
                  if (child && typeof child === 'object' && 'type' in child) {
                    return (
                      <child.type key={child.key ?? i} {...child.props} _index={i} _onChange={onChange} />
                    );
                  }
                  return child;
                })
              : children}
          </div>
        </nav>
      </NavBarProvider>
    );
  },
);

NavigationBar.displayName = 'NavigationBar';

export type NavigationBarItemProps = {
  icon: React.ReactNode;
  activeIcon?: React.ReactNode;
  label?: string;
  badge?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  /** @internal */
  _index?: number;
  /** @internal */
  _onChange?: (index: number) => void;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'>;

export const NavigationBarItem = forwardRef<HTMLButtonElement, NavigationBarItemProps>(
  ({ icon, activeIcon, label, badge, disabled = false, className, _index = 0, _onChange, onClick, ...props }, ref) => {
    const { activeIndex, hideLabels } = useNavBarContext();
    const isActive = activeIndex === _index;
    const { surfaceRef, handlers, state } = useRipple<HTMLSpanElement>(disabled);

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        handlers.onClick(e as React.MouseEvent<HTMLElement>);
        _onChange?.(_index);
        onClick?.(e);
      },
      [handlers, _onChange, _index, onClick],
    );

    return (
      <button
        ref={ref}
        className={cn(styles.item, isActive && styles.active, disabled && styles.disabled, state.pressed && styles.pressed, className)}
        disabled={disabled}
        role="tab"
        aria-selected={isActive}
        {...props}
        onPointerEnter={handlers.onPointerEnter}
        onPointerLeave={handlers.onPointerLeave}
        onPointerDown={handlers.onPointerDown}
        onPointerUp={handlers.onPointerUp}
        onPointerCancel={handlers.onPointerCancel}
        onClick={handleClick}
      >
        <div className={styles.iconContainer}>
          <span ref={surfaceRef} className={styles.ripple} aria-hidden="true" />
          <span className={styles.stateLayer} aria-hidden="true" />
          {isActive && <span className={styles.indicator} />}
          <span className={styles.icon}>{isActive && activeIcon ? activeIcon : icon}</span>
          {badge && <span className={styles.badge}>{badge}</span>}
        </div>
        {!hideLabels && label && <span className={styles.label}>{label}</span>}
      </button>
    );
  },
);

NavigationBarItem.displayName = 'NavigationBarItem';
