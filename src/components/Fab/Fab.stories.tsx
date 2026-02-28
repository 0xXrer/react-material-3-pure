import type { Meta, StoryObj } from '@storybook/react';
import { Fab } from './Fab';

const meta: Meta<typeof Fab> = {
  title: 'Components/FAB',
  component: Fab,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'surface'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Fab>;

const AddIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" /></svg>
);

const EditIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" /></svg>
);

const NavigationIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" /></svg>
);

export const Primary: Story = {
  render: () => (
    <Fab variant="primary" aria-label="Add">
      <AddIcon />
    </Fab>
  ),
};

export const Secondary: Story = {
  render: () => (
    <Fab variant="secondary" aria-label="Edit">
      <EditIcon />
    </Fab>
  ),
};

export const Tertiary: Story = {
  render: () => (
    <Fab variant="tertiary" aria-label="Navigate">
      <NavigationIcon />
    </Fab>
  ),
};

export const Surface: Story = {
  render: () => (
    <Fab variant="surface" aria-label="Add">
      <AddIcon />
    </Fab>
  ),
};

export const Small: Story = {
  render: () => (
    <Fab variant="primary" size="small" aria-label="Add">
      <AddIcon />
    </Fab>
  ),
};

export const Large: Story = {
  render: () => (
    <Fab variant="primary" size="large" aria-label="Add">
      <AddIcon />
    </Fab>
  ),
};

export const Extended: Story = {
  render: () => (
    <Fab variant="primary" label="Create">
      <AddIcon />
    </Fab>
  ),
};

export const ExtendedVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <Fab variant="primary" label="Primary"><AddIcon /></Fab>
      <Fab variant="secondary" label="Secondary"><EditIcon /></Fab>
      <Fab variant="tertiary" label="Tertiary"><NavigationIcon /></Fab>
      <Fab variant="surface" label="Surface"><AddIcon /></Fab>
    </div>
  ),
};

export const Lowered: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <Fab variant="primary" lowered aria-label="Add"><AddIcon /></Fab>
      <Fab variant="primary" lowered label="Lowered"><AddIcon /></Fab>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Fab variant="primary" size="small" aria-label="Small"><AddIcon /></Fab>
      <Fab variant="primary" size="medium" aria-label="Medium"><AddIcon /></Fab>
      <Fab variant="primary" size="large" aria-label="Large"><AddIcon /></Fab>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <Fab variant="primary" disabled aria-label="Disabled"><AddIcon /></Fab>
      <Fab variant="primary" disabled label="Disabled"><AddIcon /></Fab>
    </div>
  ),
};
