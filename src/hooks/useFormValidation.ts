'use client';

import { useState, useCallback, useRef, useEffect, type RefObject } from 'react';

export interface FormValidationOptions {
  /** Maps to the HTML `required` attribute. */
  required?: boolean;
  /** Regex pattern string for text fields. */
  pattern?: string;
  /** Minimum value for number inputs or min-length for text. */
  min?: number;
  /** Maximum value for number inputs or max-length for text. */
  max?: number;
  /** Minimum character length. */
  minLength?: number;
  /** Maximum character length. */
  maxLength?: number;
  /** A custom validity message. When non-empty, the field is invalid. */
  customValidity?: string;
  /** Reference to the native input/select/textarea element. */
  inputRef?: RefObject<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null>;
}

export interface FormValidationReturn {
  error: boolean;
  errorText: string;
  validate: () => boolean;
  /** Spread onto the native input for automatic constraint validation. */
  validationProps: {
    required?: boolean;
    pattern?: string;
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    onInvalid: (e: React.FormEvent) => void;
  };
}

/**
 * Hook that wraps browser constraint-validation APIs and surfaces
 * `error` / `errorText` state suitable for M3 form components.
 *
 * Ported from the Lit `mixinConstraintValidation` behavior
 * (`extracted/labs/behaviors/constraint-validation.ts`).
 */
export function useFormValidation(
  options: FormValidationOptions = {},
): FormValidationReturn {
  const {
    required,
    pattern,
    min,
    max,
    minLength,
    maxLength,
    customValidity,
    inputRef,
  } = options;

  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const customMessageRef = useRef(customValidity ?? '');

  useEffect(() => {
    customMessageRef.current = customValidity ?? '';
    const el = inputRef?.current;
    if (el) {
      el.setCustomValidity(customMessageRef.current);
      setError(!el.validity.valid);
      setErrorText(el.validationMessage);
    }
  }, [customValidity, inputRef]);

  const validate = useCallback((): boolean => {
    const el = inputRef?.current;
    if (!el) return true;

    el.setCustomValidity(customMessageRef.current);
    const valid = el.checkValidity();
    setError(!valid);
    setErrorText(valid ? '' : el.validationMessage);
    return valid;
  }, [inputRef]);

  const onInvalid = useCallback((e: React.FormEvent) => {
    const el = e.target as HTMLInputElement;
    setError(true);
    setErrorText(el.validationMessage);
  }, []);

  const validationProps = {
    ...(required !== undefined && { required }),
    ...(pattern !== undefined && { pattern }),
    ...(min !== undefined && { min }),
    ...(max !== undefined && { max }),
    ...(minLength !== undefined && { minLength }),
    ...(maxLength !== undefined && { maxLength }),
    onInvalid,
  };

  return { error, errorText, validate, validationProps };
}
