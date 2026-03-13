'use client';

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import styles from './Dialog.module.css';

/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Material Design 3 Dialog Component
 *
 * A React port of the official @material/web dialog component.
 * Dialogs can require an action, communicate information, or help
 * users accomplish a task.
 *
 * @see https://github.com/material-components/material-web/tree/main/dialog
 * @see https://m3.material.io/components/dialogs
 */

/* ==========================================================================
   ANIMATION CONSTANTS
   ========================================================================== */

const EASING = {
  EMPHASIZED: 'cubic-bezier(0.2, 0, 0, 1)',
  EMPHASIZED_ACCELERATE: 'cubic-bezier(0.3, 0, 0.8, 0.15)',
  EMPHASIZED_DECELERATE: 'cubic-bezier(0.05, 0.7, 0.1, 1)',
};

/* ==========================================================================
   DIALOG PROPS
   ========================================================================== */

export interface DialogProps {
  /**
   * Whether the dialog is open.
   * @default false
   */
  open?: boolean;

  /**
   * Skips the opening and closing animations.
   * @default false
   */
  quick?: boolean;

  /**
   * The type of dialog for accessibility. Set this to `alert` to announce
   * a dialog as an alert dialog.
   */
  type?: 'alert';

  /**
   * Disables focus trapping, which by default keeps keyboard Tab navigation
   * within the dialog.
   * @default false
   */
  noFocusTrap?: boolean;

  /**
   * The return value of the dialog, usually indicating which button was used
   * to close it.
   */
  returnValue?: string;

  /**
   * Icon element displayed at the top of the dialog.
   */
  icon?: React.ReactNode;

  /**
   * Headline/title of the dialog.
   */
  headline?: React.ReactNode;

  /**
   * Content/body of the dialog.
   */
  children?: React.ReactNode;

  /**
   * Action buttons displayed at the bottom of the dialog.
   */
  actions?: React.ReactNode;

  /**
   * Callback fired when the dialog starts opening.
   */
  onOpen?: () => void;

  /**
   * Callback fired after the dialog has opened.
   */
  onOpened?: () => void;

  /**
   * Callback fired when the dialog starts closing.
   * Return false to prevent closing.
   */
  onClose?: (returnValue: string) => boolean | void;

  /**
   * Callback fired after the dialog has closed.
   */
  onClosed?: (returnValue: string) => void;

  /**
   * Callback fired when the dialog is canceled (by clicking scrim or pressing Escape).
   * Return false to prevent canceling.
   */
  onCancel?: () => boolean | void;

  /**
   * Additional CSS class names.
   */
  className?: string;

  /**
   * Unique ID for the dialog. Used for aria-labelledby and aria-describedby.
   * Auto-generated if not provided.
   */
  id?: string;

  /**
   * ARIA label for the dialog.
   */
  'aria-label'?: string;

  /**
   * ARIA description for the dialog content.
   */
  'aria-describedby'?: string;
}

export interface DialogRef {
  /**
   * Opens the dialog.
   */
  show: () => Promise<void>;

  /**
   * Closes the dialog.
   * @param returnValue Optional return value.
   */
  close: (returnValue?: string) => Promise<void>;

  /**
   * The native dialog element.
   */
  dialogElement: HTMLDialogElement | null;

  /**
   * The return value of the dialog.
   */
  returnValue: string;
}

/**
 * M3 Dialog Component
 *
 * @summary Dialogs can require an action, communicate information, or help
 * users accomplish a task.
 *
 * @description
 * A dialog is a modal window that appears in front of app content to provide
 * critical information or ask for a decision.
 *
 * Features:
 * - Modal behavior with backdrop
 * - Focus trapping for accessibility
 * - Animated open/close transitions
 * - Support for icon, headline, content, and actions slots
 * - Scroll indicators with dividers
 * - Escape key and backdrop click to cancel
 */
export const Dialog = forwardRef<DialogRef, DialogProps>(
  (
    {
      open = false,
      quick = false,
      type,
      noFocusTrap = false,
      returnValue: initialReturnValue = '',
      icon,
      headline,
      children,
      actions,
      onOpen,
      onOpened,
      onClose,
      onClosed,
      onCancel,
      className = '',
      id,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
    },
    ref
  ) => {
    // Generate unique IDs for accessibility
    const generatedId = useRef(`dialog-${Math.random().toString(36).slice(2, 9)}`);
    const dialogId = id || generatedId.current;
    const headlineId = `${dialogId}-headline`;
    const contentId = `${dialogId}-content`;

    const dialogRef = useRef<HTMLDialogElement>(null);
    const scrollerRef = useRef<HTMLDivElement>(null);
    const topAnchorRef = useRef<HTMLDivElement>(null);
    const bottomAnchorRef = useRef<HTMLDivElement>(null);
    const firstFocusTrapRef = useRef<HTMLDivElement>(null);
    const previousActiveElement = useRef<HTMLElement | null>(null);

    const [isOpen, setIsOpen] = useState(open);
    const [isAnimating, setIsAnimating] = useState(false);
    const [returnValueState, setReturnValue] = useState(initialReturnValue);
    const [isAtScrollTop, setIsAtScrollTop] = useState(true);
    const [isAtScrollBottom, setIsAtScrollBottom] = useState(true);

    const hasIcon = !!icon;
    const hasHeadline = !!headline;
    const hasActions = !!actions;

    // Imperative handle for external control
    useImperativeHandle(ref, () => ({
      show: async () => {
        await showDialog();
      },
      close: async (value?: string) => {
        await closeDialog(value);
      },
      dialogElement: dialogRef.current,
      returnValue: returnValueState,
    }));

    // Animation helpers
    const animateElement = useCallback(
      async (
        element: Element,
        keyframes: Keyframe[] | PropertyIndexedKeyframes,
        options: KeyframeAnimationOptions
      ): Promise<void> => {
        if (quick) return;
        try {
          await element.animate(keyframes, options).finished;
        } catch {
          // Animation was cancelled
        }
      },
      [quick]
    );

    const runOpenAnimation = useCallback(async () => {
      const dialog = dialogRef.current;
      const scroller = scrollerRef.current;
      if (!dialog || quick) return;

      setIsAnimating(true);

      const animations: Promise<void>[] = [];

      // Dialog slide down
      animations.push(
        animateElement(
          dialog,
          [{ transform: 'translateY(-50px)' }, { transform: 'translateY(0)' }],
          { duration: 500, easing: EASING.EMPHASIZED }
        )
      );

      // Scrim fade in
      const scrim = dialog.previousElementSibling;
      if (scrim) {
        animations.push(
          animateElement(scrim, [{ opacity: 0 }, { opacity: 0.32 }], {
            duration: 500,
            easing: 'linear',
          })
        );
      }

      // Container fade and grow
      const container = dialog.querySelector(`.${styles.container}`);
      if (container) {
        animations.push(
          animateElement(container, [{ opacity: 0 }, { opacity: 1 }], {
            duration: 50,
            easing: 'linear',
          })
        );
      }

      // Content fade in
      if (scroller) {
        animations.push(
          animateElement(
            scroller,
            [
              { opacity: 0 },
              { opacity: 0, offset: 0.2 },
              { opacity: 1 },
            ],
            { duration: 250, easing: 'linear', fill: 'forwards' }
          )
        );
      }

      await Promise.all(animations);
      setIsAnimating(false);
    }, [quick, animateElement]);

    const runCloseAnimation = useCallback(async () => {
      const dialog = dialogRef.current;
      if (!dialog || quick) return;

      setIsAnimating(true);

      const animations: Promise<void>[] = [];

      // Dialog slide up
      animations.push(
        animateElement(
          dialog,
          [{ transform: 'translateY(0)' }, { transform: 'translateY(-50px)' }],
          { duration: 150, easing: EASING.EMPHASIZED_ACCELERATE }
        )
      );

      // Scrim fade out
      const scrim = dialog.previousElementSibling;
      if (scrim) {
        animations.push(
          animateElement(scrim, [{ opacity: 0.32 }, { opacity: 0 }], {
            duration: 150,
            easing: 'linear',
          })
        );
      }

      // Content fade out
      const scroller = scrollerRef.current;
      if (scroller) {
        animations.push(
          animateElement(scroller, [{ opacity: 1 }, { opacity: 0 }], {
            duration: 100,
            easing: 'linear',
            fill: 'forwards',
          })
        );
      }

      await Promise.all(animations);
      setIsAnimating(false);
    }, [quick, animateElement]);

    // Show dialog
    const showDialog = useCallback(async () => {
      const dialog = dialogRef.current;
      if (!dialog || dialog.open) return;

      // Store previously focused element (SSR-safe)
      if (typeof document !== 'undefined') {
        previousActiveElement.current = document.activeElement as HTMLElement;
      }

      onOpen?.();
      dialog.showModal();
      setIsOpen(true);

      // Reset scroll position
      if (scrollerRef.current) {
        scrollerRef.current.scrollTop = 0;
      }

      // Focus autofocus element or first focusable
      const autofocusElement = dialog.querySelector<HTMLElement>('[autofocus]');
      if (autofocusElement) {
        autofocusElement.focus();
      }

      await runOpenAnimation();
      onOpened?.();
    }, [onOpen, onOpened, runOpenAnimation]);

    // Close dialog
    const closeDialog = useCallback(
      async (newReturnValue?: string) => {
        const dialog = dialogRef.current;
        if (!dialog || !dialog.open) return;

        const value = newReturnValue ?? returnValueState;
        
        const shouldClose = onClose?.(value);
        if (shouldClose === false) return;

        setReturnValue(value);
        await runCloseAnimation();
        dialog.close(value);
        setIsOpen(false);

        // Restore focus
        previousActiveElement.current?.focus();

        onClosed?.(value);
      },
      [returnValueState, onClose, onClosed, runCloseAnimation]
    );

    // Handle cancel (Escape key or scrim click)
    const handleCancel = useCallback(
      (event: React.SyntheticEvent) => {
        event.preventDefault();
        
        const shouldCancel = onCancel?.();
        if (shouldCancel === false) return;

        closeDialog(returnValueState);
      },
      [onCancel, closeDialog, returnValueState]
    );

    // Handle scrim click
    const handleDialogClick = useCallback(
      (event: React.MouseEvent<HTMLDialogElement>) => {
        // Only close if clicking the dialog backdrop itself
        if (event.target === dialogRef.current) {
          handleCancel(event);
        }
      },
      [handleCancel]
    );

    // Handle content click to prevent bubbling
    const handleContentClick = useCallback((event: React.MouseEvent) => {
      event.stopPropagation();
    }, []);

    // Handle form submission within dialog
    const handleFormSubmit = useCallback(
      (event: React.FormEvent<HTMLFormElement>) => {
        const form = event.currentTarget;
        if (form.method !== 'dialog') return;

        event.preventDefault();
        const submitter = (event.nativeEvent as SubmitEvent).submitter;
        const value = submitter?.getAttribute('value') ?? returnValueState;
        closeDialog(value);
      },
      [closeDialog, returnValueState]
    );

    // Handle focus trap
    const handleFocusTrapFocus = useCallback(
      (event: React.FocusEvent<HTMLDivElement>) => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        const focusableElements = dialog.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );

        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];

        if (!firstFocusable) {
          dialog.focus();
          return;
        }

        const isFirst = event.target === firstFocusTrapRef.current;
        const focusCameFromFirst = event.relatedTarget === firstFocusable;
        const focusCameFromLast = event.relatedTarget === lastFocusable;

        if (isFirst && focusCameFromFirst) {
          lastFocusable?.focus();
        } else if (!isFirst && focusCameFromLast) {
          firstFocusable?.focus();
        } else {
          firstFocusable?.focus();
        }
      },
      []
    );

    // Sync with open prop
    useEffect(() => {
      if (open && !isOpen && !isAnimating) {
        showDialog();
      } else if (!open && isOpen && !isAnimating) {
        closeDialog();
      }
    }, [open, isOpen, isAnimating, showDialog, closeDialog]);

    // Set up intersection observer for scroll indicators
    useEffect(() => {
      const scroller = scrollerRef.current;
      const topAnchor = topAnchorRef.current;
      const bottomAnchor = bottomAnchorRef.current;

      if (!scroller || !topAnchor || !bottomAnchor) return;

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.target === topAnchor) {
              setIsAtScrollTop(entry.isIntersecting);
            } else if (entry.target === bottomAnchor) {
              setIsAtScrollBottom(entry.isIntersecting);
            }
          }
        },
        { root: scroller }
      );

      observer.observe(topAnchor);
      observer.observe(bottomAnchor);

      return () => observer.disconnect();
    }, [isOpen]);

    // Handle Escape key
    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape' && isOpen) {
          event.preventDefault();
          handleCancel(event as unknown as React.SyntheticEvent);
        }
      };

      if (isOpen) {
        document.addEventListener('keydown', handleKeyDown);
      }

      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, handleCancel]);

    // Build class names
    const scrollable = isOpen && !(isAtScrollTop && isAtScrollBottom);

    const dialogClasses = useMemo(() => {
      const classes = [styles.dialog];
      if (hasHeadline) classes.push(styles.hasHeadline);
      if (hasActions) classes.push(styles.hasActions);
      if (hasIcon) classes.push(styles.hasIcon);
      if (scrollable) classes.push(styles.scrollable);
      if (scrollable && !isAtScrollTop) classes.push(styles.showTopDivider);
      if (scrollable && !isAtScrollBottom) classes.push(styles.showBottomDivider);
      if (className) classes.push(className);
      return classes.join(' ');
    }, [hasHeadline, hasActions, hasIcon, scrollable, isAtScrollTop, isAtScrollBottom, className]);

    const focusTrap = !noFocusTrap && isOpen && (
      <div
        ref={firstFocusTrapRef}
        className={styles.focusTrap}
        tabIndex={0}
        aria-hidden="true"
        onFocus={handleFocusTrapFocus}
      />
    );

    return (
      <div className={styles.host} data-open={isOpen || undefined}>
        <div className={styles.scrim} aria-hidden="true" />
        <dialog
          ref={dialogRef}
          id={dialogId}
          className={dialogClasses}
          aria-label={ariaLabel}
          aria-labelledby={hasHeadline && !ariaLabel ? headlineId : undefined}
          aria-describedby={ariaDescribedBy || (children ? contentId : undefined)}
          aria-modal="true"
          role={type === 'alert' ? 'alertdialog' : 'dialog'}
          onClick={handleDialogClick}
          onCancel={handleCancel}
        >
          {focusTrap}
          <div className={styles.container} onClick={handleContentClick}>
            <div className={styles.headline}>
              {hasIcon && (
                <div className={styles.icon} aria-hidden="true">
                  {icon}
                </div>
              )}
              {hasHeadline && (
                <h2 id={headlineId} className={styles.headlineText}>
                  {headline}
                </h2>
              )}
              <div className={styles.divider} aria-hidden="true" />
            </div>
            <div ref={scrollerRef} className={styles.scroller}>
              <div id={contentId} className={styles.content}>
                <div ref={topAnchorRef} className={styles.topAnchor} />
                <form method="dialog" onSubmit={handleFormSubmit}>
                  {children}
                </form>
                <div ref={bottomAnchorRef} className={styles.bottomAnchor} />
              </div>
            </div>
            {hasActions && (
              <div className={styles.actions}>
                <div className={styles.divider} aria-hidden="true" />
                <div className={styles.actionsContent}>{actions}</div>
              </div>
            )}
          </div>
          {focusTrap}
        </dialog>
      </div>
    );
  }
);

Dialog.displayName = 'Dialog';
