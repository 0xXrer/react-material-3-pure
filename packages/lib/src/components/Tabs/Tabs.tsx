'use client';

import {
  forwardRef,
  useRef,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import styles from './Tabs.module.css';
import { useRipple, useControllableState, useKeyboardNavigation } from '../../hooks';
import { cn, createSafeContext, mergeRefs } from '../../utils';

export type TabVariant = 'primary' | 'secondary';

interface TabsContextValue {
  activeIndex: number;
  variant: TabVariant;
  onTabClick: (index: number) => void;
  registerTab: (index: number, element: HTMLButtonElement | null) => void;
}

const [TabsProvider, useTabsContext] = createSafeContext<TabsContextValue>('Tabs');

export interface TabProps {
  icon?: React.ReactNode;
  label?: string;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const Tab = forwardRef<HTMLButtonElement, TabProps>(
  ({ icon, label, disabled = false, className, children }, ref) => {
    const ctx = useTabsContext();
    const indexRef = useRef(-1);
    const internalRef = useRef<HTMLButtonElement | null>(null);

    const { surfaceRef, handlers, state } = useRipple<HTMLSpanElement>(disabled);

    useEffect(() => {
      const parent = internalRef.current?.parentElement;
      if (!parent || !internalRef.current) return;

      const tabs = Array.from(parent.querySelectorAll('[role="tab"]'));
      const idx = tabs.indexOf(internalRef.current);
      indexRef.current = idx;
      ctx.registerTab(idx, internalRef.current);

      return () => {
        ctx.registerTab(idx, null);
      };
    }, [ctx]);

    const isActive = ctx.activeIndex === indexRef.current;
    const variant = ctx.variant;
    const displayLabel = label || children;

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        handlers.onClick(e as React.MouseEvent<HTMLElement>);
        if (!disabled && indexRef.current >= 0) {
          ctx.onTabClick(indexRef.current);
        }
      },
      [disabled, ctx, handlers]
    );

    return (
      <button
        ref={mergeRefs(ref, internalRef)}
        role="tab"
        aria-selected={isActive}
        aria-disabled={disabled || undefined}
        tabIndex={isActive ? 0 : -1}
        disabled={disabled}
        className={cn(
          styles.tab,
          styles[variant],
          isActive && styles.active,
          disabled && styles.tabDisabled,
          state.pressed && styles.pressed,
          className
        )}
        onClick={handleClick}
        onPointerEnter={handlers.onPointerEnter}
        onPointerLeave={handlers.onPointerLeave}
        onPointerDown={handlers.onPointerDown}
        onPointerUp={handlers.onPointerUp}
        onPointerCancel={handlers.onPointerCancel}
      >
        <span ref={surfaceRef} className={styles.ripple} aria-hidden="true" />
        <span className={styles.tabStateLayer} aria-hidden="true" />
        <span className={styles.tabContent}>
          {icon && <span className={styles.tabIcon}>{icon}</span>}
          {displayLabel && <span className={styles.tabLabel}>{displayLabel}</span>}
        </span>
        {isActive && <span className={styles.indicator} />}
      </button>
    );
  }
);

Tab.displayName = 'Tab';

export interface TabsProps {
  variant?: TabVariant;
  activeIndex?: number;
  defaultActiveIndex?: number;
  onChange?: (index: number) => void;
  className?: string;
  children?: React.ReactNode;
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      variant = 'primary',
      activeIndex: controlledIndex,
      defaultActiveIndex = 0,
      onChange,
      className,
      children,
    },
    ref
  ) => {
    const [activeIndex, setActiveIndex] = useControllableState({
      value: controlledIndex,
      defaultValue: defaultActiveIndex,
      onChange,
    });

    const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

    const registerTab = useCallback(
      (index: number, element: HTMLButtonElement | null) => {
        tabsRef.current[index] = element;
      },
      []
    );

    const onTabClick = useCallback(
      (index: number) => {
        setActiveIndex(index);
      },
      [setActiveIndex]
    );

    const { handleKeyDown } = useKeyboardNavigation({
      selector: '[role="tab"]:not([disabled])',
      orientation: 'horizontal',
      onFocusChange: (index) => {
        setActiveIndex(index);
      },
    });

    const contextValue = useMemo(
      () => ({
        activeIndex,
        variant,
        onTabClick,
        registerTab,
      }),
      [activeIndex, variant, onTabClick, registerTab]
    );

    return (
      <TabsProvider value={contextValue}>
        <div
          ref={ref}
          role="tablist"
          className={cn(styles.tabs, styles[`tabs_${variant}`], className)}
          onKeyDown={handleKeyDown}
        >
          {children}
        </div>
      </TabsProvider>
    );
  }
);

Tabs.displayName = 'Tabs';

export interface TabPanelProps {
  index: number;
  activeIndex: number;
  className?: string;
  children?: React.ReactNode;
}

export const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(
  ({ index, activeIndex, className, children }, ref) => {
    if (index !== activeIndex) return null;

    return (
      <div
        ref={ref}
        role="tabpanel"
        tabIndex={0}
        className={cn(styles.tabPanel, className)}
      >
        {children}
      </div>
    );
  }
);

TabPanel.displayName = 'TabPanel';
