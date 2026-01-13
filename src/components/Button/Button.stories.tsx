import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

/**
 * Material Design 3 Button Component
 *
 * A React port of the official @material/web button.
 * Supports 5 visual variants, state layers, ripple effects, and full accessibility.
 *
 * @see https://github.com/material-components/material-web/tree/main/button
 * @see https://m3.material.io/components/buttons
 */
const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['filled', 'outlined', 'text', 'elevated', 'tonal'],
      description: 'Visual style of the button',
      table: {
        defaultValue: { summary: 'filled' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the button',
    },
    softDisabled: {
      control: 'boolean',
      description: 'Soft-disable the button (disabled but focusable)',
    },
    icon: {
      control: false,
      description: 'Icon element to display',
    },
    trailingIcon: {
      control: 'boolean',
      description: 'Position the icon at the end',
    },
    href: {
      control: 'text',
      description: 'URL for link buttons',
    },
    children: {
      control: 'text',
      description: 'Button label text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// Sample SVG icon for demonstrations
const AddIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
  </svg>
);

const SendIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
  </svg>
);

/* ==========================================================================
   VARIANT STORIES
   ========================================================================== */

/**
 * Filled Button - High emphasis
 *
 * The most prominent button for primary actions. Uses primary color background.
 */
export const Filled: Story = {
  args: {
    variant: 'filled',
    children: 'Filled Button',
  },
};

/**
 * Outlined Button - Medium emphasis
 *
 * For secondary actions. Has a visible border with no fill.
 */
export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: 'Outlined Button',
  },
};

/**
 * Text Button - Low emphasis
 *
 * For tertiary actions. No background or border.
 */
export const Text: Story = {
  args: {
    variant: 'text',
    children: 'Text Button',
  },
};

/**
 * Elevated Button - Medium emphasis with shadow
 *
 * For when a button needs to stand out from a patterned background.
 */
export const Elevated: Story = {
  args: {
    variant: 'elevated',
    children: 'Elevated Button',
  },
};

/**
 * Tonal Button (Filled Tonal) - Medium emphasis
 *
 * Uses secondary container color. Good middle ground between filled and outlined.
 */
export const Tonal: Story = {
  args: {
    variant: 'tonal',
    children: 'Tonal Button',
  },
};

/* ==========================================================================
   ALL VARIANTS SHOWCASE
   ========================================================================== */

/**
 * All Variants
 *
 * Displays all button variants side by side for comparison.
 */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="filled">Filled</Button>
      <Button variant="outlined">Outlined</Button>
      <Button variant="text">Text</Button>
      <Button variant="elevated">Elevated</Button>
      <Button variant="tonal">Tonal</Button>
    </div>
  ),
};

/* ==========================================================================
   ICON STORIES
   ========================================================================== */

/**
 * With Leading Icon
 *
 * Icons appear before the label by default.
 */
export const WithLeadingIcon: Story = {
  args: {
    variant: 'filled',
    icon: <AddIcon />,
    children: 'Add Item',
  },
};

/**
 * With Trailing Icon
 *
 * Use `trailingIcon` prop to position icon after the label.
 */
export const WithTrailingIcon: Story = {
  args: {
    variant: 'filled',
    icon: <SendIcon />,
    trailingIcon: true,
    children: 'Send',
  },
};

/**
 * All Variants with Icons
 *
 * Icons work with all button variants.
 */
export const AllVariantsWithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="filled" icon={<AddIcon />}>Filled</Button>
      <Button variant="outlined" icon={<AddIcon />}>Outlined</Button>
      <Button variant="text" icon={<AddIcon />}>Text</Button>
      <Button variant="elevated" icon={<AddIcon />}>Elevated</Button>
      <Button variant="tonal" icon={<AddIcon />}>Tonal</Button>
    </div>
  ),
};

/* ==========================================================================
   STATE STORIES
   ========================================================================== */

/**
 * Disabled State
 *
 * Disabled buttons are non-interactive and visually muted.
 */
export const Disabled: Story = {
  args: {
    variant: 'filled',
    disabled: true,
    children: 'Disabled',
  },
};

/**
 * Soft Disabled State
 *
 * Soft-disabled buttons are visually disabled but remain focusable
 * for accessibility. Useful when users need to know why a button is disabled.
 */
export const SoftDisabled: Story = {
  args: {
    variant: 'filled',
    softDisabled: true,
    children: 'Soft Disabled',
  },
};

/**
 * All Variants Disabled
 *
 * Shows disabled state across all variants.
 */
export const AllVariantsDisabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="filled" disabled>Filled</Button>
      <Button variant="outlined" disabled>Outlined</Button>
      <Button variant="text" disabled>Text</Button>
      <Button variant="elevated" disabled>Elevated</Button>
      <Button variant="tonal" disabled>Tonal</Button>
    </div>
  ),
};

/* ==========================================================================
   LINK STORIES
   ========================================================================== */

/**
 * Link Button
 *
 * When `href` is provided, the button renders as an anchor element.
 */
export const LinkButton: Story = {
  args: {
    variant: 'filled',
    href: 'https://m3.material.io',
    target: '_blank',
    children: 'Visit Material Design',
  },
};

/**
 * All Variants as Links
 *
 * All variants support link mode.
 */
export const AllVariantsAsLinks: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="filled" href="#">Filled Link</Button>
      <Button variant="outlined" href="#">Outlined Link</Button>
      <Button variant="text" href="#">Text Link</Button>
      <Button variant="elevated" href="#">Elevated Link</Button>
      <Button variant="tonal" href="#">Tonal Link</Button>
    </div>
  ),
};

/* ==========================================================================
   INTERACTIVE STORIES
   ========================================================================== */

/**
 * Interactive Playground
 *
 * Use controls to experiment with all button props.
 */
export const Playground: Story = {
  args: {
    variant: 'filled',
    children: 'Button',
    disabled: false,
    softDisabled: false,
    trailingIcon: false,
  },
};

/**
 * Button Types
 *
 * Demonstrates different form button types.
 */
export const ButtonTypes: Story = {
  render: () => (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        alert('Form submitted!');
      }}
      style={{ display: 'flex', gap: '16px' }}
    >
      <Button type="submit" variant="filled">Submit</Button>
      <Button type="reset" variant="outlined">Reset</Button>
      <Button type="button" variant="text">Button</Button>
    </form>
  ),
};

/* ==========================================================================
   ACCESSIBILITY STORIES
   ========================================================================== */

/**
 * Keyboard Navigation
 *
 * Buttons support full keyboard navigation (Tab, Enter, Space).
 */
export const KeyboardNavigation: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <Button variant="filled">First</Button>
      <Button variant="outlined">Second</Button>
      <Button variant="tonal">Third</Button>
    </div>
  ),
};

/**
 * Custom Styling
 *
 * Buttons can be customized using CSS custom properties.
 */
export const CustomStyling: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Button
        variant="filled"
        style={{
          '--md-filled-button-container-color': '#006a6a',
          '--md-filled-button-label-text-color': '#ffffff',
        } as React.CSSProperties}
      >
        Custom Teal
      </Button>
      <Button
        variant="outlined"
        style={{
          '--md-outlined-button-outline-color': '#ba1a1a',
          '--md-outlined-button-label-text-color': '#ba1a1a',
        } as React.CSSProperties}
      >
        Custom Red
      </Button>
      <Button
        variant="tonal"
        style={{
          '--md-filled-tonal-button-container-color': '#ffd8e4',
          '--md-filled-tonal-button-label-text-color': '#31111d',
        } as React.CSSProperties}
      >
        Custom Pink
      </Button>
    </div>
  ),
};

