import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { TextField } from './TextField';

const meta: Meta<typeof TextField> = {
  title: 'Components/TextField',
  component: TextField,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'outlined'],
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'search', 'tel', 'url', 'textarea'],
    },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    error: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof TextField>;

/* ==========================================================================
   ICONS
   ========================================================================== */

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
  </svg>
);

const VisibilityIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
  </svg>
);

const ErrorIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
  </svg>
);

const PersonIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

/* ==========================================================================
   FILLED VARIANT
   ========================================================================== */

export const Filled: Story = {
  args: {
    variant: 'filled',
    label: 'Label',
  },
};

export const FilledWithValue: Story = {
  args: {
    variant: 'filled',
    label: 'Label',
    defaultValue: 'Input text',
  },
};

export const FilledWithPlaceholder: Story = {
  args: {
    variant: 'filled',
    label: 'Email',
    placeholder: 'example@email.com',
  },
};

/* ==========================================================================
   OUTLINED VARIANT
   ========================================================================== */

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    label: 'Label',
  },
};

export const OutlinedWithValue: Story = {
  args: {
    variant: 'outlined',
    label: 'Label',
    defaultValue: 'Input text',
  },
};

/* ==========================================================================
   WITH ICONS
   ========================================================================== */

export const WithLeadingIcon: Story = {
  args: {
    variant: 'filled',
    label: 'Search',
    leadingIcon: <SearchIcon />,
  },
};

export const WithTrailingIcon: Story = {
  args: {
    variant: 'filled',
    label: 'Password',
    type: 'password',
    trailingIcon: <VisibilityIcon />,
  },
};

export const WithBothIcons: Story = {
  args: {
    variant: 'outlined',
    label: 'Username',
    leadingIcon: <PersonIcon />,
    trailingIcon: <ErrorIcon />,
  },
};

/* ==========================================================================
   WITH PREFIX/SUFFIX
   ========================================================================== */

export const WithPrefix: Story = {
  args: {
    variant: 'filled',
    label: 'Amount',
    prefixText: '$',
    type: 'number',
  },
};

export const WithSuffix: Story = {
  args: {
    variant: 'filled',
    label: 'Weight',
    suffixText: 'kg',
    type: 'number',
  },
};

/* ==========================================================================
   WITH SUPPORTING TEXT
   ========================================================================== */

export const WithSupportingText: Story = {
  args: {
    variant: 'filled',
    label: 'Email',
    supportingText: 'Enter your email address',
  },
};

/* ==========================================================================
   ERROR STATE
   ========================================================================== */

export const ErrorState: Story = {
  args: {
    variant: 'filled',
    label: 'Email',
    error: true,
    errorText: 'Please enter a valid email address',
    defaultValue: 'invalid-email',
    trailingIcon: <ErrorIcon />,
  },
};

export const ErrorOutlined: Story = {
  args: {
    variant: 'outlined',
    label: 'Password',
    type: 'password',
    error: true,
    errorText: 'Password must be at least 8 characters',
    trailingIcon: <ErrorIcon />,
  },
};

/* ==========================================================================
   DISABLED STATE
   ========================================================================== */

export const Disabled: Story = {
  args: {
    variant: 'filled',
    label: 'Disabled',
    disabled: true,
    defaultValue: 'Disabled value',
  },
};

export const DisabledOutlined: Story = {
  args: {
    variant: 'outlined',
    label: 'Disabled',
    disabled: true,
    defaultValue: 'Disabled value',
  },
};

/* ==========================================================================
   REQUIRED
   ========================================================================== */

export const Required: Story = {
  args: {
    variant: 'filled',
    label: 'Required Field',
    required: true,
  },
};

/* ==========================================================================
   TEXTAREA
   ========================================================================== */

export const Textarea: Story = {
  args: {
    variant: 'filled',
    label: 'Description',
    type: 'textarea',
    rows: 4,
  },
};

export const TextareaOutlined: Story = {
  args: {
    variant: 'outlined',
    label: 'Comments',
    type: 'textarea',
    rows: 4,
  },
};

/* ==========================================================================
   CONTROLLED
   ========================================================================== */

export const Controlled: Story = {
  render: function ControlledTextField() {
    const [value, setValue] = useState('');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <TextField
          variant="filled"
          label="Controlled Input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          supportingText={`Characters: ${value.length}`}
        />
        <p style={{ fontSize: '14px', color: '#666' }}>
          Value: {value || '(empty)'}
        </p>
      </div>
    );
  },
};

/* ==========================================================================
   ALL VARIANTS
   ========================================================================== */

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', gap: '16px' }}>
        <TextField variant="filled" label="Filled" />
        <TextField variant="outlined" label="Outlined" />
      </div>
      <div style={{ display: 'flex', gap: '16px' }}>
        <TextField variant="filled" label="With Icon" leadingIcon={<SearchIcon />} />
        <TextField variant="outlined" label="With Icon" leadingIcon={<SearchIcon />} />
      </div>
      <div style={{ display: 'flex', gap: '16px' }}>
        <TextField variant="filled" label="Error" error errorText="Error message" />
        <TextField variant="outlined" label="Error" error errorText="Error message" />
      </div>
      <div style={{ display: 'flex', gap: '16px' }}>
        <TextField variant="filled" label="Disabled" disabled />
        <TextField variant="outlined" label="Disabled" disabled />
      </div>
    </div>
  ),
};
