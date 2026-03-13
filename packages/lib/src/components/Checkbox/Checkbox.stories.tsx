import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';
import React, { useState } from 'react';

/**
 * Material Design 3 Checkbox Component
 *
 * A React port of the official @material/web checkbox.
 * Supports checked, unchecked, and indeterminate states with full accessibility.
 *
 * @see https://github.com/material-components/material-web/tree/main/checkbox
 * @see https://m3.material.io/components/checkbox
 */
const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Whether the checkbox is checked',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    indeterminate: {
      control: 'boolean',
      description: 'Whether the checkbox is in indeterminate state',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    required: {
      control: 'boolean',
      description: 'Whether the checkbox is required for form validation',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    value: {
      control: 'text',
      description: 'The value submitted with forms when checked',
      table: {
        defaultValue: { summary: 'on' },
      },
    },
    name: {
      control: 'text',
      description: 'The name of the checkbox for form submission',
    },
    touchTarget: {
      control: { type: 'select' },
      options: ['wrapper', 'none'],
      description: 'Touch target sizing behavior',
      table: {
        defaultValue: { summary: 'wrapper' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

// Default args for accessibility
const defaultArgs = {
  'aria-label': 'Checkbox',
};

/* ==========================================================================
   BASIC STATES
   ========================================================================== */

/**
 * Unchecked Checkbox
 *
 * The default unchecked state.
 */
export const Unchecked: Story = {
  args: {
    ...defaultArgs,
    checked: false,
  },
};

/**
 * Checked Checkbox
 *
 * The checked state displays a checkmark icon.
 */
export const Checked: Story = {
  args: {
    ...defaultArgs,
    checked: true,
  },
};

/**
 * Indeterminate Checkbox
 *
 * The indeterminate state displays a horizontal line.
 * Used for parent checkboxes with partially selected children.
 */
export const Indeterminate: Story = {
  args: {
    ...defaultArgs,
    indeterminate: true,
  },
};

/**
 * Disabled Unchecked
 *
 * A disabled checkbox that cannot be interacted with.
 */
export const DisabledUnchecked: Story = {
  args: {
    ...defaultArgs,
    disabled: true,
    checked: false,
  },
};

/**
 * Disabled Checked
 *
 * A disabled checkbox in the checked state.
 */
export const DisabledChecked: Story = {
  args: {
    ...defaultArgs,
    disabled: true,
    checked: true,
  },
};

/**
 * Disabled Indeterminate
 *
 * A disabled checkbox in the indeterminate state.
 */
export const DisabledIndeterminate: Story = {
  args: {
    ...defaultArgs,
    disabled: true,
    indeterminate: true,
  },
};

/* ==========================================================================
   INTERACTIVE EXAMPLES
   ========================================================================== */

/**
 * Controlled Checkbox
 *
 * A fully controlled checkbox that demonstrates state management.
 */
export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Checkbox
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          aria-label="Controlled checkbox"
        />
        <span style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px' }}>
          {checked ? 'Checked' : 'Unchecked'}
        </span>
      </div>
    );
  },
};

/**
 * With Label
 *
 * Checkbox with an associated label for better accessibility.
 */
export const WithLabel: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Checkbox
          id="with-label-checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        <label
          htmlFor="with-label-checkbox"
          style={{
            fontFamily: 'Roboto, sans-serif',
            fontSize: '14px',
            cursor: 'pointer',
            userSelect: 'none',
          }}
        >
          Accept terms and conditions
        </label>
      </div>
    );
  },
};

/**
 * Group Selection (Parent/Child)
 *
 * Demonstrates the indeterminate state for parent checkboxes
 * when children are partially selected.
 */
export const GroupSelection: Story = {
  render: () => {
    const [items, setItems] = useState([
      { id: 1, label: 'Option 1', checked: true },
      { id: 2, label: 'Option 2', checked: false },
      { id: 3, label: 'Option 3', checked: true },
    ]);

    const allChecked = items.every((item) => item.checked);
    const someChecked = items.some((item) => item.checked);
    const isIndeterminate = someChecked && !allChecked;

    const handleParentChange = () => {
      const newChecked = !allChecked;
      setItems(items.map((item) => ({ ...item, checked: newChecked })));
    };

    const handleChildChange = (id: number) => {
      setItems(
        items.map((item) =>
          item.id === id ? { ...item, checked: !item.checked } : item
        )
      );
    };

    return (
      <div style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Checkbox
            checked={allChecked}
            indeterminate={isIndeterminate}
            onChange={handleParentChange}
            aria-label="Select all options"
          />
          <span style={{ fontWeight: 500 }}>Select All</span>
        </div>
        <div style={{ marginLeft: '24px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {items.map((item) => (
            <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Checkbox
                checked={item.checked}
                onChange={() => handleChildChange(item.id)}
                aria-label={item.label}
              />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  },
};

/* ==========================================================================
   ALL STATES SHOWCASE
   ========================================================================== */

/**
 * All States
 *
 * Displays all checkbox states side by side for comparison.
 */
export const AllStates: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'auto auto auto',
        gap: '24px',
        alignItems: 'center',
        fontFamily: 'Roboto, sans-serif',
        fontSize: '14px',
      }}
    >
      <span></span>
      <span style={{ fontWeight: 500, textAlign: 'center' }}>Enabled</span>
      <span style={{ fontWeight: 500, textAlign: 'center' }}>Disabled</span>

      <span>Unchecked</span>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Checkbox aria-label="Unchecked enabled" />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Checkbox disabled aria-label="Unchecked disabled" />
      </div>

      <span>Checked</span>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Checkbox checked aria-label="Checked enabled" />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Checkbox checked disabled aria-label="Checked disabled" />
      </div>

      <span>Indeterminate</span>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Checkbox indeterminate aria-label="Indeterminate enabled" />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Checkbox indeterminate disabled aria-label="Indeterminate disabled" />
      </div>
    </div>
  ),
};

/* ==========================================================================
   FORM INTEGRATION
   ========================================================================== */

/**
 * Form Integration
 *
 * Demonstrates checkbox within a form with validation.
 */
export const FormIntegration: Story = {
  render: () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      console.log('Form data:', Object.fromEntries(formData.entries()));
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 2000);
    };

    return (
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          fontFamily: 'Roboto, sans-serif',
          fontSize: '14px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Checkbox name="newsletter" value="subscribed" aria-label="Subscribe to newsletter" />
          <span>Subscribe to newsletter</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Checkbox
            name="terms"
            value="accepted"
            required
            aria-label="Accept terms and conditions (required)"
          />
          <span>
            I accept the terms and conditions <span style={{ color: '#f2b8b5' }}>*</span>
          </span>
        </div>

        <button
          type="submit"
          style={{
            padding: '10px 24px',
            backgroundColor: '#6750a4',
            color: 'white',
            border: 'none',
            borderRadius: '20px',
            cursor: 'pointer',
            fontFamily: 'inherit',
            fontWeight: 500,
          }}
        >
          {submitted ? 'Submitted!' : 'Submit'}
        </button>
      </form>
    );
  },
};

/* ==========================================================================
   ACCESSIBILITY
   ========================================================================== */

/**
 * With ARIA Label
 *
 * Checkbox with explicit ARIA label for screen readers.
 */
export const WithAriaLabel: Story = {
  args: {
    ...defaultArgs,
    'aria-label': 'Toggle notification settings',
    checked: false,
  },
};

/**
 * Touch Target Sizes
 *
 * Comparison of different touch target configurations.
 */
export const TouchTargetSizes: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '32px',
        alignItems: 'center',
        fontFamily: 'Roboto, sans-serif',
        fontSize: '14px',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            background: 'rgba(103, 80, 164, 0.1)',
            padding: '4px',
            borderRadius: '4px',
          }}
        >
          <Checkbox touchTarget="wrapper" aria-label="With wrapper touch target" />
        </div>
        <div style={{ marginTop: '8px', fontSize: '12px', color: '#49454f' }}>
          wrapper (default)
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            background: 'rgba(103, 80, 164, 0.1)',
            padding: '4px',
            borderRadius: '4px',
          }}
        >
          <Checkbox touchTarget="none" aria-label="Without wrapper touch target" />
        </div>
        <div style={{ marginTop: '8px', fontSize: '12px', color: '#49454f' }}>none</div>
      </div>
    </div>
  ),
};

/* ==========================================================================
   THEMING
   ========================================================================== */

/**
 * Custom Theming
 *
 * Demonstrates how to customize checkbox colors using CSS custom properties.
 */
export const CustomTheming: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <div
        style={
          {
            '--md-checkbox-selected-container-color': '#006a6a',
            '--md-checkbox-selected-icon-color': '#ffffff',
            '--md-checkbox-outline-color': '#006a6a',
          } as React.CSSProperties
        }
      >
        <Checkbox checked aria-label="Teal themed checkbox" />
      </div>

      <div
        style={
          {
            '--md-checkbox-selected-container-color': '#7d5260',
            '--md-checkbox-selected-icon-color': '#ffffff',
            '--md-checkbox-outline-color': '#7d5260',
          } as React.CSSProperties
        }
      >
        <Checkbox checked aria-label="Rose themed checkbox" />
      </div>

      <div
        style={
          {
            '--md-checkbox-selected-container-color': '#4a6741',
            '--md-checkbox-selected-icon-color': '#ffffff',
            '--md-checkbox-outline-color': '#4a6741',
          } as React.CSSProperties
        }
      >
        <Checkbox checked aria-label="Green themed checkbox" />
      </div>
    </div>
  ),
};

/* ==========================================================================
   ERROR STATES
   ========================================================================== */

/**
 * Error State
 *
 * Checkbox with error indication using aria-invalid.
 */
export const ErrorState: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        fontFamily: 'Roboto, sans-serif',
      }}
    >
      <div
        style={
          {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            '--md-checkbox-outline-color': '#f2b8b5',
          } as React.CSSProperties
        }
      >
        <Checkbox 
          aria-label="Accept terms"
          aria-invalid="true" 
          aria-describedby="error-text" 
        />
        <span style={{ fontSize: '14px' }}>Accept terms</span>
      </div>
      <span
        id="error-text"
        style={{ color: '#f2b8b5', fontSize: '12px', marginLeft: '40px' }}
      >
        You must accept the terms to continue
      </span>
    </div>
  ),
};
