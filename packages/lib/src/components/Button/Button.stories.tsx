import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'text', 'elevated', 'tonal'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'icon'],
    },
    disabled: { control: 'boolean' },
    as: {
      control: 'select',
      options: ['button', 'a'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

/* ==========================================================================
   ICONS
   ========================================================================== */

const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
  </svg>
);

const SettingsIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
  </svg>
);

/* ==========================================================================
   VARIANTS
   ========================================================================== */

export const Filled: Story = {
  args: { children: 'Filled Button' },
};

export const Outlined: Story = {
  args: { variant: 'outlined', children: 'Outlined Button' },
};

export const Text: Story = {
  args: { variant: 'text', children: 'Text Button' },
};

export const Elevated: Story = {
  args: { variant: 'elevated', children: 'Elevated Button' },
};

export const Tonal: Story = {
  args: { variant: 'tonal', children: 'Tonal Button' },
};

/* ==========================================================================
   SIZES
   ========================================================================== */

export const Small: Story = {
  args: { size: 'sm', children: 'Small' },
};

export const Medium: Story = {
  args: { size: 'md', children: 'Medium Button' },
};

export const Large: Story = {
  args: { size: 'lg', children: 'Large Button' },
};

/* ==========================================================================
   WITH ICONS - Just add icons as children!
   ========================================================================== */

export const WithIconLeft: Story = {
  render: () => (
    <Button variant="filled">
      <PlusIcon />
      Add Item
    </Button>
  ),
};

export const WithIconRight: Story = {
  render: () => (
    <Button variant="filled">
      Continue
      <ArrowIcon />
    </Button>
  ),
};

export const IconOnly: Story = {
  render: () => (
    <Button variant="tonal" size="icon" aria-label="Settings">
      <SettingsIcon />
    </Button>
  ),
};

/* ==========================================================================
   AS LINK
   ========================================================================== */

export const AsLink: Story = {
  render: () => (
    <Button variant="text" as="a" href="https://m3.material.io" target="_blank">
      Learn More
      <ArrowIcon />
    </Button>
  ),
};

/* ==========================================================================
   STATES
   ========================================================================== */

export const Disabled: Story = {
  args: { disabled: true, children: 'Disabled' },
};

export const DisabledOutlined: Story = {
  args: { variant: 'outlined', disabled: true, children: 'Disabled Outlined' },
};

/* ==========================================================================
   ALL VARIANTS
   ========================================================================== */

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

export const AllWithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="filled">
        <PlusIcon />
        Filled
      </Button>
      <Button variant="outlined">
        <PlusIcon />
        Outlined
      </Button>
      <Button variant="text">
        <PlusIcon />
        Text
      </Button>
      <Button variant="elevated">
        <PlusIcon />
        Elevated
      </Button>
      <Button variant="tonal">
        <PlusIcon />
        Tonal
      </Button>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="icon" aria-label="Add">
        <PlusIcon />
      </Button>
    </div>
  ),
};
