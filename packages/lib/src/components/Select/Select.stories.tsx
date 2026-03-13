import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Select, SelectOption } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'outlined'],
    },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    required: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
  </svg>
);

export const Filled: Story = {
  render: () => (
    <Select label="Fruit" variant="filled" defaultValue="apple">
      <SelectOption value="apple">Apple</SelectOption>
      <SelectOption value="banana">Banana</SelectOption>
      <SelectOption value="cherry">Cherry</SelectOption>
      <SelectOption value="grape">Grape</SelectOption>
    </Select>
  ),
};

export const Outlined: Story = {
  render: () => (
    <Select label="Fruit" variant="outlined" defaultValue="banana">
      <SelectOption value="apple">Apple</SelectOption>
      <SelectOption value="banana">Banana</SelectOption>
      <SelectOption value="cherry">Cherry</SelectOption>
      <SelectOption value="grape">Grape</SelectOption>
    </Select>
  ),
};

export const WithPlaceholder: Story = {
  render: () => (
    <Select label="Country" variant="filled" placeholder="Choose a country">
      <SelectOption value="us">United States</SelectOption>
      <SelectOption value="uk">United Kingdom</SelectOption>
      <SelectOption value="de">Germany</SelectOption>
      <SelectOption value="jp">Japan</SelectOption>
    </Select>
  ),
};

export const WithLeadingIcon: Story = {
  render: () => (
    <Select label="Search" variant="filled" leadingIcon={<SearchIcon />} defaultValue="opt1">
      <SelectOption value="opt1">Option 1</SelectOption>
      <SelectOption value="opt2">Option 2</SelectOption>
      <SelectOption value="opt3">Option 3</SelectOption>
    </Select>
  ),
};

export const WithError: Story = {
  render: () => (
    <Select
      label="Required Field"
      variant="filled"
      error
      errorText="This field is required"
      required
    >
      <SelectOption value="a">Option A</SelectOption>
      <SelectOption value="b">Option B</SelectOption>
    </Select>
  ),
};

export const WithSupportingText: Story = {
  render: () => (
    <Select label="Size" variant="outlined" supportingText="Choose your preferred size">
      <SelectOption value="s">Small</SelectOption>
      <SelectOption value="m">Medium</SelectOption>
      <SelectOption value="l">Large</SelectOption>
      <SelectOption value="xl">Extra Large</SelectOption>
    </Select>
  ),
};

export const DisabledOption: Story = {
  render: () => (
    <Select label="Plan" variant="filled" defaultValue="free">
      <SelectOption value="free">Free</SelectOption>
      <SelectOption value="pro">Pro</SelectOption>
      <SelectOption value="enterprise" disabled>Enterprise (Coming Soon)</SelectOption>
    </Select>
  ),
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    variant: 'filled',
    disabled: true,
    defaultValue: 'val',
  },
  render: (args) => (
    <Select {...args}>
      <SelectOption value="val">Selected Value</SelectOption>
    </Select>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('react');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
        <Select label="Framework" variant="outlined" value={value} onChange={setValue}>
          <SelectOption value="react">React</SelectOption>
          <SelectOption value="vue">Vue</SelectOption>
          <SelectOption value="angular">Angular</SelectOption>
          <SelectOption value="svelte">Svelte</SelectOption>
        </Select>
        <span style={{ fontSize: 14, color: '#666' }}>Selected: {value}</span>
      </div>
    );
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <Select label="Filled" variant="filled" defaultValue="a">
        <SelectOption value="a">Option A</SelectOption>
        <SelectOption value="b">Option B</SelectOption>
      </Select>
      <Select label="Outlined" variant="outlined" defaultValue="a">
        <SelectOption value="a">Option A</SelectOption>
        <SelectOption value="b">Option B</SelectOption>
      </Select>
    </div>
  ),
};
