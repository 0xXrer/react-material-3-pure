'use client';

import { useState, useCallback, useRef } from 'react';

/**
 * Manages a value that can be either controlled (value provided externally)
 * or uncontrolled (managed internally). Mirrors the pattern used by native
 * HTML inputs.
 */
export function useControllableState<T>(props: {
  value?: T;
  defaultValue: T;
  onChange?: (value: T) => void;
}): [T, (next: T | ((prev: T) => T)) => void] {
  const { value: controlledValue, defaultValue, onChange } = props;
  const isControlled = controlledValue !== undefined;
  const isControlledRef = useRef(isControlled);
  isControlledRef.current = isControlled;

  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = isControlled ? controlledValue : internalValue;

  const setValue = useCallback(
    (next: T | ((prev: T) => T)) => {
      const nextValue =
        typeof next === 'function'
          ? (next as (prev: T) => T)(currentValue)
          : next;

      if (!isControlledRef.current) {
        setInternalValue(nextValue);
      }
      onChange?.(nextValue);
    },
    [currentValue, onChange],
  );

  return [currentValue, setValue];
}
