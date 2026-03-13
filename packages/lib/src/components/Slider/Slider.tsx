'use client';

import { forwardRef, useState, useRef, useCallback, useMemo } from 'react';
import styles from './Slider.module.css';
import { cn } from '../../utils';

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function quantize(value: number, step: number): number {
  if (step <= 0) return value;
  return Math.round(value / step) * step;
}

export interface SliderProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  labeled?: boolean;
  ticks?: boolean;
  name?: string;
  onChange?: (value: number) => void;
  onInput?: (value: number) => void;
  className?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
}

export interface RangeSliderProps {
  valueStart?: number;
  valueEnd?: number;
  defaultValueStart?: number;
  defaultValueEnd?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  labeled?: boolean;
  ticks?: boolean;
  nameStart?: string;
  nameEnd?: string;
  onChange?: (start: number, end: number) => void;
  onInput?: (start: number, end: number) => void;
  className?: string;
  'aria-label'?: string;
}

export const Slider = forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      value: controlledValue,
      defaultValue,
      min = 0,
      max = 100,
      step = 1,
      disabled = false,
      labeled = false,
      ticks = false,
      name,
      onChange,
      onInput,
      className,
      ...ariaProps
    },
    ref
  ) => {
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = useState(defaultValue ?? min);
    const value = isControlled ? controlledValue : internalValue;

    const trackRef = useRef<HTMLDivElement>(null);
    const [dragging, setDragging] = useState(false);
    const [hovered, setHovered] = useState(false);

    const fraction = useMemo(() => {
      if (max === min) return 0;
      return (clamp(value, min, max) - min) / (max - min);
    }, [value, min, max]);

    const tickCount = useMemo(() => {
      if (!ticks || step <= 0) return 0;
      return Math.floor((max - min) / step);
    }, [ticks, step, min, max]);

    const updateValue = useCallback(
      (clientX: number) => {
        const track = trackRef.current;
        if (!track) return;
        const rect = track.getBoundingClientRect();
        const rawFraction = clamp((clientX - rect.left) / rect.width, 0, 1);
        let newValue = min + rawFraction * (max - min);
        newValue = quantize(newValue, step);
        newValue = clamp(newValue, min, max);
        newValue = Math.round(newValue * 1e10) / 1e10;

        if (!isControlled) {
          setInternalValue(newValue);
        }
        onInput?.(newValue);
        return newValue;
      },
      [min, max, step, isControlled, onInput]
    );

    const handlePointerDown = useCallback(
      (e: React.PointerEvent) => {
        if (disabled) return;
        e.preventDefault();
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
        setDragging(true);
        updateValue(e.clientX);
      },
      [disabled, updateValue]
    );

    const handlePointerMove = useCallback(
      (e: React.PointerEvent) => {
        if (!dragging) return;
        updateValue(e.clientX);
      },
      [dragging, updateValue]
    );

    const handlePointerUp = useCallback(
      (e: React.PointerEvent) => {
        if (!dragging) return;
        setDragging(false);
        const finalValue = updateValue(e.clientX);
        if (finalValue !== undefined) {
          onChange?.(finalValue);
        }
      },
      [dragging, updateValue, onChange]
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (disabled) return;
        let newValue = value;
        const bigStep = (max - min) / 10;

        switch (e.key) {
          case 'ArrowRight':
          case 'ArrowUp':
            e.preventDefault();
            newValue = clamp(value + step, min, max);
            break;
          case 'ArrowLeft':
          case 'ArrowDown':
            e.preventDefault();
            newValue = clamp(value - step, min, max);
            break;
          case 'PageUp':
            e.preventDefault();
            newValue = clamp(value + bigStep, min, max);
            break;
          case 'PageDown':
            e.preventDefault();
            newValue = clamp(value - bigStep, min, max);
            break;
          case 'Home':
            e.preventDefault();
            newValue = min;
            break;
          case 'End':
            e.preventDefault();
            newValue = max;
            break;
          default:
            return;
        }

        newValue = quantize(newValue, step);
        if (!isControlled) setInternalValue(newValue);
        onInput?.(newValue);
        onChange?.(newValue);
      },
      [disabled, value, min, max, step, isControlled, onInput, onChange]
    );

    return (
      <div
        ref={ref}
        className={cn(
          styles.slider,
          disabled && styles.disabled,
          dragging && styles.dragging,
          className
        )}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <div
          ref={trackRef}
          className={styles.track}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => setDragging(false)}
        >
          <div className={styles.trackInactive} />
          <div
            className={styles.trackActive}
            style={{ width: `${fraction * 100}%` }}
          />

          {ticks && tickCount > 0 && (
            <div className={styles.ticks}>
              {Array.from({ length: tickCount + 1 }, (_, i) => {
                const tickFraction = i / tickCount;
                return (
                  <div
                    key={i}
                    className={cn(
                      styles.tick,
                      tickFraction <= fraction
                        ? styles.tickActive
                        : styles.tickInactive
                    )}
                    style={{ left: `${tickFraction * 100}%` }}
                  />
                );
              })}
            </div>
          )}

          <div
            className={styles.thumbContainer}
            style={{ left: `${fraction * 100}%` }}
          >
            <div className={cn(styles.rippleContainer, (hovered || dragging) && styles.rippleVisible)}>
              <span className={styles.ripple} aria-hidden="true" />
            </div>

            {labeled && (dragging || hovered) && (
              <div className={styles.label}>
                <span className={styles.labelText}>{Math.round(value)}</span>
              </div>
            )}

            <div
              className={styles.thumb}
              role="slider"
              tabIndex={disabled ? -1 : 0}
              aria-valuemin={min}
              aria-valuemax={max}
              aria-valuenow={value}
              aria-disabled={disabled || undefined}
              aria-label={ariaProps['aria-label']}
              aria-labelledby={ariaProps['aria-labelledby']}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>

        {name && (
          <input type="hidden" name={name} value={value} disabled={disabled} />
        )}
      </div>
    );
  }
);

Slider.displayName = 'Slider';

export const RangeSlider = forwardRef<HTMLDivElement, RangeSliderProps>(
  (
    {
      valueStart: controlledStart,
      valueEnd: controlledEnd,
      defaultValueStart,
      defaultValueEnd,
      min = 0,
      max = 100,
      step = 1,
      disabled = false,
      labeled = false,
      ticks = false,
      nameStart,
      nameEnd,
      onChange,
      onInput,
      className,
      ...ariaProps
    },
    ref
  ) => {
    const isControlled = controlledStart !== undefined && controlledEnd !== undefined;
    const [internalStart, setInternalStart] = useState(defaultValueStart ?? min);
    const [internalEnd, setInternalEnd] = useState(defaultValueEnd ?? max);
    const start = isControlled ? controlledStart : internalStart;
    const end = isControlled ? controlledEnd : internalEnd;

    const trackRef = useRef<HTMLDivElement>(null);
    const [activeThumb, setActiveThumb] = useState<'start' | 'end' | null>(null);
    const [hovered, setHovered] = useState(false);

    const startFraction = useMemo(() => {
      if (max === min) return 0;
      return (clamp(start, min, max) - min) / (max - min);
    }, [start, min, max]);

    const endFraction = useMemo(() => {
      if (max === min) return 0;
      return (clamp(end, min, max) - min) / (max - min);
    }, [end, min, max]);

    const getClosestThumb = useCallback(
      (clientX: number): 'start' | 'end' => {
        const track = trackRef.current;
        if (!track) return 'start';
        const rect = track.getBoundingClientRect();
        const frac = (clientX - rect.left) / rect.width;
        const distStart = Math.abs(frac - startFraction);
        const distEnd = Math.abs(frac - endFraction);
        return distStart <= distEnd ? 'start' : 'end';
      },
      [startFraction, endFraction]
    );

    const updateValue = useCallback(
      (clientX: number, thumb: 'start' | 'end') => {
        const track = trackRef.current;
        if (!track) return;
        const rect = track.getBoundingClientRect();
        const rawFraction = clamp((clientX - rect.left) / rect.width, 0, 1);
        let newValue = min + rawFraction * (max - min);
        newValue = quantize(newValue, step);
        newValue = clamp(newValue, min, max);
        newValue = Math.round(newValue * 1e10) / 1e10;

        let newStart = start;
        let newEnd = end;

        if (thumb === 'start') {
          newStart = Math.min(newValue, end);
        } else {
          newEnd = Math.max(newValue, start);
        }

        if (!isControlled) {
          setInternalStart(newStart);
          setInternalEnd(newEnd);
        }
        onInput?.(newStart, newEnd);
        return [newStart, newEnd] as const;
      },
      [min, max, step, start, end, isControlled, onInput]
    );

    const handlePointerDown = useCallback(
      (e: React.PointerEvent) => {
        if (disabled) return;
        e.preventDefault();
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
        const thumb = getClosestThumb(e.clientX);
        setActiveThumb(thumb);
        updateValue(e.clientX, thumb);
      },
      [disabled, getClosestThumb, updateValue]
    );

    const handlePointerMove = useCallback(
      (e: React.PointerEvent) => {
        if (!activeThumb) return;
        updateValue(e.clientX, activeThumb);
      },
      [activeThumb, updateValue]
    );

    const handlePointerUp = useCallback(
      (e: React.PointerEvent) => {
        if (!activeThumb) return;
        const result = updateValue(e.clientX, activeThumb);
        setActiveThumb(null);
        if (result) {
          onChange?.(result[0], result[1]);
        }
      },
      [activeThumb, updateValue, onChange]
    );

    return (
      <div
        ref={ref}
        className={cn(
          styles.slider,
          styles.range,
          disabled && styles.disabled,
          activeThumb && styles.dragging,
          className
        )}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <div
          ref={trackRef}
          className={styles.track}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => setActiveThumb(null)}
        >
          <div className={styles.trackInactive} />
          <div
            className={styles.trackActive}
            style={{
              left: `${startFraction * 100}%`,
              width: `${(endFraction - startFraction) * 100}%`,
            }}
          />

          <div
            className={styles.thumbContainer}
            style={{ left: `${startFraction * 100}%` }}
          >
            {labeled && (activeThumb === 'start' || hovered) && (
              <div className={styles.label}>
                <span className={styles.labelText}>{Math.round(start)}</span>
              </div>
            )}
            <div
              className={styles.thumb}
              role="slider"
              tabIndex={disabled ? -1 : 0}
              aria-valuemin={min}
              aria-valuemax={end}
              aria-valuenow={start}
              aria-label={`${ariaProps['aria-label'] || 'Range'} start`}
            />
          </div>

          <div
            className={styles.thumbContainer}
            style={{ left: `${endFraction * 100}%` }}
          >
            {labeled && (activeThumb === 'end' || hovered) && (
              <div className={styles.label}>
                <span className={styles.labelText}>{Math.round(end)}</span>
              </div>
            )}
            <div
              className={styles.thumb}
              role="slider"
              tabIndex={disabled ? -1 : 0}
              aria-valuemin={start}
              aria-valuemax={max}
              aria-valuenow={end}
              aria-label={`${ariaProps['aria-label'] || 'Range'} end`}
            />
          </div>
        </div>

        {nameStart && <input type="hidden" name={nameStart} value={start} disabled={disabled} />}
        {nameEnd && <input type="hidden" name={nameEnd} value={end} disabled={disabled} />}
      </div>
    );
  }
);

RangeSlider.displayName = 'RangeSlider';
