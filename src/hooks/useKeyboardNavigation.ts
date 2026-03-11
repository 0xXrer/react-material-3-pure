'use client';

import { useCallback } from 'react';

export interface KeyboardNavigationOptions {
  /** CSS selector for focusable items within the container. */
  selector: string;
  /** Whether navigation wraps around at the ends. Default: true */
  wrap?: boolean;
  /** Orientation of navigation. Default: 'vertical' */
  orientation?: 'vertical' | 'horizontal' | 'both';
  /** Called when the focused index changes via keyboard. */
  onFocusChange?: (index: number, element: HTMLElement) => void;
}

/**
 * Returns a keydown handler that implements arrow-key, Home, and End
 * navigation for list-like containers (Menu, Select, Tabs, List).
 */
export function useKeyboardNavigation(options: KeyboardNavigationOptions) {
  const { selector, wrap = true, orientation = 'vertical', onFocusChange } = options;

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLElement>) => {
      const container = e.currentTarget;
      const items = Array.from(
        container.querySelectorAll<HTMLElement>(selector),
      ).filter((el) => !el.hasAttribute('aria-disabled') || el.getAttribute('aria-disabled') === 'false');

      if (!items.length) return;

      const current = document.activeElement as HTMLElement;
      let idx = items.indexOf(current);

      const prev = orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp';
      const next = orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown';
      const bothPrev = ['ArrowLeft', 'ArrowUp'];
      const bothNext = ['ArrowRight', 'ArrowDown'];

      const isPrev = orientation === 'both' ? bothPrev.includes(e.key) : e.key === prev;
      const isNext = orientation === 'both' ? bothNext.includes(e.key) : e.key === next;

      let newIndex = idx;

      if (isNext) {
        e.preventDefault();
        newIndex = wrap
          ? (idx + 1) % items.length
          : Math.min(idx + 1, items.length - 1);
      } else if (isPrev) {
        e.preventDefault();
        newIndex = wrap
          ? (idx - 1 + items.length) % items.length
          : Math.max(idx - 1, 0);
      } else if (e.key === 'Home') {
        e.preventDefault();
        newIndex = 0;
      } else if (e.key === 'End') {
        e.preventDefault();
        newIndex = items.length - 1;
      } else {
        return;
      }

      items[newIndex]?.focus();
      onFocusChange?.(newIndex, items[newIndex]);
    },
    [selector, wrap, orientation, onFocusChange],
  );

  return { handleKeyDown };
}
