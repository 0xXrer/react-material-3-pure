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
import styles from './Tabs.module.css';
import { useRipple } from '../../hooks';

function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export type TabVariant = 'primary' | 'secondary';

interface TabsContextValue {
  activeIndex: number;
  variant: TabVariant;
  onTabClick: (index: number) => void;
  registerTab: (index: number, element: HTMLButtonElement | null) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

export interface TabProps {
  icon?: React.ReactNode;
  label?: string;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const Tab = forwardRef<HTMLButtonElement, TabProps>(
  ({ icon, label, disabled = false, className, children }, ref) => {
    const ctx = useContext(TabsContext);
    const indexRef = useRef(-1);
    const internalRef = useRef<HTMLButtonElement | null>(null);

    const { surfaceRef, handlers, state } = useRipple<HTMLSpanElement>(disabled);

    const setRef = useCallback(
      (node: HTMLButtonElement | null) => {
        internalRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      },
      [ref]
    );

    useEffect(() => {
      const parent = internalRef.current?.parentElement;
      if (!parent || !internalRef.current) return;

      const tabs = Array.from(parent.querySelectorAll('[role="tab"]'));
      const idx = tabs.indexOf(internalRef.current);
      indexRef.current = idx;
      ctx?.registerTab(idx, internalRef.current);

      return () => {
        ctx?.registerTab(idx, null);
      };
    }, [ctx]);

    const isActive = ctx ? ctx.activeIndex === indexRef.current : false;
    const variant = ctx?.variant ?? 'primary';
    const displayLabel = label || children;

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        handlers.onClick(e as React.MouseEvent<HTMLElement>);
        if (!disabled && ctx && indexRef.current >= 0) {
          ctx.onTabClick(indexRef.current);
        }
      },
      [disabled, ctx, handlers]
    );

    return (
      <button
        ref={setRef}
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
    const isControlled = controlledIndex !== undefined;
    const [internalIndex, setInternalIndex] = useState(defaultActiveIndex);
    const activeIndex = isControlled ? controlledIndex : internalIndex;

    const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    const registerTab = useCallback(
      (index: number, element: HTMLButtonElement | null) => {
        tabsRef.current[index] = element;
      },
      []
    );

    const onTabClick = useCallback(
      (index: number) => {
        if (!isControlled) {
          setInternalIndex(index);
        }
        onChange?.(index);
      },
      [isControlled, onChange]
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        const tabs = tabsRef.current.filter(Boolean) as HTMLButtonElement[];
        const count = tabs.length;
        if (!count) return;

        let newIndex = activeIndex;

        switch (e.key) {
          case 'ArrowRight':
            e.preventDefault();
            newIndex = (activeIndex + 1) % count;
            break;
          case 'ArrowLeft':
            e.preventDefault();
            newIndex = (activeIndex - 1 + count) % count;
            break;
          case 'Home':
            e.preventDefault();
            newIndex = 0;
            break;
          case 'End':
            e.preventDefault();
            newIndex = count - 1;
            break;
          default:
            return;
        }

        while (tabs[newIndex]?.disabled && newIndex !== activeIndex) {
          if (e.key === 'ArrowRight' || e.key === 'End') {
            newIndex = (newIndex + 1) % count;
          } else {
            newIndex = (newIndex - 1 + count) % count;
          }
        }

        tabs[newIndex]?.focus();
        if (!isControlled) setInternalIndex(newIndex);
        onChange?.(newIndex);
      },
      [activeIndex, isControlled, onChange]
    );

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
      <TabsContext.Provider value={contextValue}>
        <div
          ref={ref}
          role="tablist"
          className={cn(styles.tabs, styles[`tabs_${variant}`], className)}
          onKeyDown={handleKeyDown}
        >
          {children}
        </div>
      </TabsContext.Provider>
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
