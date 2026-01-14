import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Field } from './Field';

const meta: Meta<typeof Field> = {
  title: 'Components/Field',
  component: Field,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'outlined'],
    },
    focused: { control: 'boolean' },
    populated: { control: 'boolean' },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Filled: Story = {
  args: {
    variant: 'filled',
    label: 'Label',
    supportingText: 'Supporting text',
    children: (
      <input
        type="text"
        placeholder="Enter value"
        style={{
          border: 'none',
          background: 'transparent',
          outline: 'none',
          font: 'inherit',
          color: 'inherit',
          width: '100%',
        }}
      />
    ),
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    label: 'Label',
    supportingText: 'Supporting text',
    children: (
      <input
        type="text"
        placeholder="Enter value"
        style={{
          border: 'none',
          background: 'transparent',
          outline: 'none',
          font: 'inherit',
          color: 'inherit',
          width: '100%',
        }}
      />
    ),
  },
};

export const Focused: Story = {
  args: {
    variant: 'filled',
    label: 'Focused field',
    focused: true,
    supportingText: 'This field is focused',
    children: (
      <input
        type="text"
        defaultValue="Focused"
        style={{
          border: 'none',
          background: 'transparent',
          outline: 'none',
          font: 'inherit',
          color: 'inherit',
          width: '100%',
        }}
      />
    ),
  },
};

export const Populated: Story = {
  args: {
    variant: 'filled',
    label: 'Populated field',
    populated: true,
    children: (
      <input
        type="text"
        defaultValue="Has a value"
        style={{
          border: 'none',
          background: 'transparent',
          outline: 'none',
          font: 'inherit',
          color: 'inherit',
          width: '100%',
        }}
      />
    ),
  },
};

export const Error: Story = {
  args: {
    variant: 'filled',
    label: 'Error field',
    error: true,
    supportingText: 'This field has an error',
    children: (
      <input
        type="text"
        defaultValue="Invalid value"
        style={{
          border: 'none',
          background: 'transparent',
          outline: 'none',
          font: 'inherit',
          color: 'inherit',
          width: '100%',
        }}
      />
    ),
  },
};

export const Disabled: Story = {
  args: {
    variant: 'filled',
    label: 'Disabled field',
    disabled: true,
    children: (
      <input
        type="text"
        defaultValue="Disabled"
        disabled
        style={{
          border: 'none',
          background: 'transparent',
          outline: 'none',
          font: 'inherit',
          color: 'inherit',
          width: '100%',
        }}
      />
    ),
  },
};

export const WithLeadingContent: Story = {
  args: {
    variant: 'filled',
    label: 'With icon',
    leadingContent: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
      </svg>
    ),
    children: (
      <input
        type="text"
        placeholder="Search..."
        style={{
          border: 'none',
          background: 'transparent',
          outline: 'none',
          font: 'inherit',
          color: 'inherit',
          width: '100%',
        }}
      />
    ),
  },
};

export const WithTrailingContent: Story = {
  args: {
    variant: 'filled',
    label: 'With trailing icon',
    trailingContent: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
      </svg>
    ),
    children: (
      <input
        type="text"
        defaultValue="Clear me"
        style={{
          border: 'none',
          background: 'transparent',
          outline: 'none',
          font: 'inherit',
          color: 'inherit',
          width: '100%',
        }}
      />
    ),
  },
};

const InteractiveExample = () => {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Field
        variant="filled"
        label="Interactive filled"
        focused={focused}
        populated={value.length > 0}
        supportingText="Type something"
      >
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            border: 'none',
            background: 'transparent',
            outline: 'none',
            font: 'inherit',
            color: 'inherit',
            width: '100%',
          }}
        />
      </Field>

      <Field
        variant="outlined"
        label="Interactive outlined"
        focused={focused}
        populated={value.length > 0}
        supportingText="Type something"
      >
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            border: 'none',
            background: 'transparent',
            outline: 'none',
            font: 'inherit',
            color: 'inherit',
            width: '100%',
          }}
        />
      </Field>
    </div>
  );
};

export const Interactive: Story = {
  render: () => <InteractiveExample />,
};

export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '24px',
        padding: '24px',
        maxWidth: '600px',
      }}
    >
      <Field variant="filled" label="Filled">
        <input
          type="text"
          style={{
            border: 'none',
            background: 'transparent',
            outline: 'none',
            font: 'inherit',
            color: 'inherit',
            width: '100%',
          }}
        />
      </Field>

      <Field variant="outlined" label="Outlined">
        <input
          type="text"
          style={{
            border: 'none',
            background: 'transparent',
            outline: 'none',
            font: 'inherit',
            color: 'inherit',
            width: '100%',
          }}
        />
      </Field>

      <Field variant="filled" label="Filled focused" focused>
        <input
          type="text"
          style={{
            border: 'none',
            background: 'transparent',
            outline: 'none',
            font: 'inherit',
            color: 'inherit',
            width: '100%',
          }}
        />
      </Field>

      <Field variant="outlined" label="Outlined focused" focused>
        <input
          type="text"
          style={{
            border: 'none',
            background: 'transparent',
            outline: 'none',
            font: 'inherit',
            color: 'inherit',
            width: '100%',
          }}
        />
      </Field>

      <Field variant="filled" label="Filled error" error supportingText="Error">
        <input
          type="text"
          style={{
            border: 'none',
            background: 'transparent',
            outline: 'none',
            font: 'inherit',
            color: 'inherit',
            width: '100%',
          }}
        />
      </Field>

      <Field variant="outlined" label="Outlined error" error supportingText="Error">
        <input
          type="text"
          style={{
            border: 'none',
            background: 'transparent',
            outline: 'none',
            font: 'inherit',
            color: 'inherit',
            width: '100%',
          }}
        />
      </Field>

      <Field variant="filled" label="Filled disabled" disabled>
        <input
          type="text"
          disabled
          style={{
            border: 'none',
            background: 'transparent',
            outline: 'none',
            font: 'inherit',
            color: 'inherit',
            width: '100%',
          }}
        />
      </Field>

      <Field variant="outlined" label="Outlined disabled" disabled>
        <input
          type="text"
          disabled
          style={{
            border: 'none',
            background: 'transparent',
            outline: 'none',
            font: 'inherit',
            color: 'inherit',
            width: '100%',
          }}
        />
      </Field>
    </div>
  ),
};
