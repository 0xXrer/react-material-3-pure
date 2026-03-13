'use client';

import { useRef, useCallback, useState } from 'react';

/**
 * Material Design 3 Ripple Hook
 *
 * SSR-safe ripple effect hook using CSS animations.
 *
 * @see https://github.com/material-components/material-web/blob/main/ripple/internal/ripple.ts
 */

const PRESS_GROW_MS = 450;
const MINIMUM_PRESS_MS = 225;
const INITIAL_ORIGIN_SCALE = 0.2;
const PADDING = 10;
const SOFT_EDGE_MINIMUM_SIZE = 75;
const SOFT_EDGE_CONTAINER_RATIO = 0.35;
const TOUCH_DELAY_MS = 150;
const EASING_STANDARD = 'cubic-bezier(0.2, 0, 0, 1)';

const State = {
  INACTIVE: 0,
  TOUCH_DELAY: 1,
  HOLDING: 2,
  WAITING_FOR_CLICK: 3,
} as const;

type StateType = (typeof State)[keyof typeof State];

export interface RippleState {
  hovered: boolean;
  pressed: boolean;
}

export interface RippleHandlers {
  onPointerEnter: (event: React.PointerEvent<HTMLElement>) => void;
  onPointerLeave: (event: React.PointerEvent<HTMLElement>) => void;
  onPointerDown: (event: React.PointerEvent<HTMLElement>) => void;
  onPointerUp: (event: React.PointerEvent<HTMLElement>) => void;
  onPointerCancel: (event: React.PointerEvent<HTMLElement>) => void;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

// SSR-safe window check
const isBrowser = typeof window !== 'undefined';

export function useRipple<T extends HTMLElement = HTMLElement>(disabled: boolean = false) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const stateRef = useRef<StateType>(State.INACTIVE);
  const rippleStartEventRef = useRef<React.PointerEvent<HTMLElement> | null>(null);
  const surfaceRef = useRef<T | null>(null);
  const growAnimationRef = useRef<Animation | null>(null);
  const initialSizeRef = useRef(0);
  const rippleSizeRef = useRef('');
  const rippleScaleRef = useRef('');

  const isTouch = useCallback((event: React.PointerEvent<HTMLElement>) => {
    return event.pointerType === 'touch';
  }, []);

  const shouldReactToEvent = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (disabled || !event.isPrimary) {
        return false;
      }

      if (
        rippleStartEventRef.current &&
        rippleStartEventRef.current.pointerId !== event.pointerId
      ) {
        return false;
      }

      if (event.type === 'pointerenter' || event.type === 'pointerleave') {
        return !isTouch(event);
      }

      const isPrimaryButton = event.buttons === 1;
      return isTouch(event) || isPrimaryButton;
    },
    [disabled, isTouch]
  );

  const determineRippleSize = useCallback((element: HTMLElement) => {
    const { height, width } = element.getBoundingClientRect();
    const maxDim = Math.max(height, width);
    const softEdgeSize = Math.max(SOFT_EDGE_CONTAINER_RATIO * maxDim, SOFT_EDGE_MINIMUM_SIZE);

    const initialSize = Math.floor(maxDim * INITIAL_ORIGIN_SCALE);
    const hypotenuse = Math.sqrt(width ** 2 + height ** 2);
    const maxRadius = hypotenuse + PADDING;

    initialSizeRef.current = initialSize;
    rippleScaleRef.current = String((maxRadius + softEdgeSize) / initialSize);
    rippleSizeRef.current = `${initialSize}px`;
  }, []);

  const getNormalizedPointerEventCoords = useCallback(
    (element: HTMLElement, event: React.PointerEvent<HTMLElement>) => {
      if (!isBrowser) return { x: 0, y: 0 };
      
      const { scrollX, scrollY } = window;
      const { left, top } = element.getBoundingClientRect();
      const documentX = scrollX + left;
      const documentY = scrollY + top;
      const { pageX, pageY } = event;
      return {
        x: pageX - documentX,
        y: pageY - documentY,
      };
    },
    []
  );

  const getTranslationCoordinates = useCallback(
    (element: HTMLElement, event?: React.PointerEvent<HTMLElement>) => {
      const { height, width } = element.getBoundingClientRect();
      const endPoint = {
        x: (width - initialSizeRef.current) / 2,
        y: (height - initialSizeRef.current) / 2,
      };

      let startPoint;
      if (event) {
        startPoint = getNormalizedPointerEventCoords(element, event);
      } else {
        startPoint = {
          x: width / 2,
          y: height / 2,
        };
      }

      startPoint = {
        x: startPoint.x - initialSizeRef.current / 2,
        y: startPoint.y - initialSizeRef.current / 2,
      };

      return { startPoint, endPoint };
    },
    [getNormalizedPointerEventCoords]
  );

  const startPressAnimation = useCallback(
    (event?: React.PointerEvent<HTMLElement>) => {
      if (!isBrowser) return;
      
      const surface = surfaceRef.current;
      if (!surface) return;

      setPressed(true);
      growAnimationRef.current?.cancel();
      determineRippleSize(surface);

      const { startPoint, endPoint } = getTranslationCoordinates(surface, event);
      const translateStart = `${startPoint.x}px, ${startPoint.y}px`;
      const translateEnd = `${endPoint.x}px, ${endPoint.y}px`;

      growAnimationRef.current = surface.animate(
        {
          top: [0, 0],
          left: [0, 0],
          height: [rippleSizeRef.current, rippleSizeRef.current],
          width: [rippleSizeRef.current, rippleSizeRef.current],
          transform: [
            `translate(${translateStart}) scale(1)`,
            `translate(${translateEnd}) scale(${rippleScaleRef.current})`,
          ],
        },
        {
          pseudoElement: '::after',
          duration: PRESS_GROW_MS,
          easing: EASING_STANDARD,
          fill: 'forwards',
        }
      );
    },
    [determineRippleSize, getTranslationCoordinates]
  );

  const endPressAnimation = useCallback(async () => {
    rippleStartEventRef.current = null;
    stateRef.current = State.INACTIVE;

    const animation = growAnimationRef.current;
    let pressAnimationPlayState = Infinity;
    if (typeof animation?.currentTime === 'number') {
      pressAnimationPlayState = animation.currentTime;
    }

    if (pressAnimationPlayState >= MINIMUM_PRESS_MS) {
      setPressed(false);
      return;
    }

    await new Promise((resolve) => {
      setTimeout(resolve, MINIMUM_PRESS_MS - pressAnimationPlayState);
    });

    if (growAnimationRef.current !== animation) {
      return;
    }

    setPressed(false);
  }, []);

  const onPointerEnter = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (!shouldReactToEvent(event)) return;
      setHovered(true);
    },
    [shouldReactToEvent]
  );

  const onPointerLeave = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (!shouldReactToEvent(event)) return;
      setHovered(false);

      if (stateRef.current !== State.INACTIVE) {
        endPressAnimation();
      }
    },
    [shouldReactToEvent, endPressAnimation]
  );

  const onPointerUp = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (!shouldReactToEvent(event)) return;

      if (stateRef.current === State.HOLDING) {
        stateRef.current = State.WAITING_FOR_CLICK;
        return;
      }

      if (stateRef.current === State.TOUCH_DELAY) {
        stateRef.current = State.WAITING_FOR_CLICK;
        startPressAnimation(rippleStartEventRef.current || undefined);
        return;
      }
    },
    [shouldReactToEvent, startPressAnimation]
  );

  const onPointerDown = useCallback(
    async (event: React.PointerEvent<HTMLElement>) => {
      if (!shouldReactToEvent(event)) return;

      rippleStartEventRef.current = event;
      
      if (!isTouch(event)) {
        stateRef.current = State.WAITING_FOR_CLICK;
        startPressAnimation(event);
        return;
      }

      stateRef.current = State.TOUCH_DELAY;
      await new Promise((resolve) => {
        setTimeout(resolve, TOUCH_DELAY_MS);
      });

      if (stateRef.current !== State.TOUCH_DELAY) return;

      stateRef.current = State.HOLDING;
      startPressAnimation(event);
    },
    [shouldReactToEvent, isTouch, startPressAnimation]
  );

  const onPointerCancel = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (!shouldReactToEvent(event)) return;
      endPressAnimation();
    },
    [shouldReactToEvent, endPressAnimation]
  );

  const onClick = useCallback(
    (_event: React.MouseEvent<HTMLElement>) => {
      if (disabled) return;

      if (stateRef.current === State.WAITING_FOR_CLICK) {
        endPressAnimation();
        return;
      }

      if (stateRef.current === State.INACTIVE) {
        // Keyboard synthesized click - start from center
        startPressAnimation();
        endPressAnimation();
      }
    },
    [disabled, startPressAnimation, endPressAnimation]
  );

  const handlers: RippleHandlers = {
    onPointerEnter,
    onPointerLeave,
    onPointerDown,
    onPointerUp,
    onPointerCancel,
    onClick,
  };

  const state: RippleState = {
    hovered,
    pressed,
  };

  return { state, handlers, surfaceRef };
}
