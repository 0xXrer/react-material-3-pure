import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { IconButton } from './IconButton';

const meta: Meta<typeof IconButton> = {
  title: 'Components/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['standard', 'filled', 'tonal', 'outlined'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

const SettingsIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" /></svg>
);

const FavoriteBorderIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z" /></svg>
);

const FavoriteIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
);

export const Standard: Story = {
  render: () => (
    <IconButton variant="standard" aria-label="Settings">
      <SettingsIcon />
    </IconButton>
  ),
};

export const Filled: Story = {
  render: () => (
    <IconButton variant="filled" aria-label="Settings">
      <SettingsIcon />
    </IconButton>
  ),
};

export const Tonal: Story = {
  render: () => (
    <IconButton variant="tonal" aria-label="Settings">
      <SettingsIcon />
    </IconButton>
  ),
};

export const Outlined: Story = {
  render: () => (
    <IconButton variant="outlined" aria-label="Settings">
      <SettingsIcon />
    </IconButton>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <IconButton variant="standard" aria-label="Settings"><SettingsIcon /></IconButton>
      <IconButton variant="filled" aria-label="Settings"><SettingsIcon /></IconButton>
      <IconButton variant="tonal" aria-label="Settings"><SettingsIcon /></IconButton>
      <IconButton variant="outlined" aria-label="Settings"><SettingsIcon /></IconButton>
    </div>
  ),
};

export const Toggle: Story = {
  render: () => {
    const [selected, setSelected] = useState(false);
    return (
      <IconButton
        variant="standard"
        toggle
        selected={selected}
        onSelectedChange={setSelected}
        aria-label="Favorite"
      >
        {selected ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
    );
  },
};

export const ToggleVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <IconButton variant="standard" toggle defaultSelected aria-label="Favorite"><FavoriteIcon /></IconButton>
      <IconButton variant="filled" toggle defaultSelected aria-label="Favorite"><FavoriteIcon /></IconButton>
      <IconButton variant="tonal" toggle defaultSelected aria-label="Favorite"><FavoriteIcon /></IconButton>
      <IconButton variant="outlined" toggle defaultSelected aria-label="Favorite"><FavoriteIcon /></IconButton>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <IconButton variant="standard" disabled aria-label="Settings"><SettingsIcon /></IconButton>
      <IconButton variant="filled" disabled aria-label="Settings"><SettingsIcon /></IconButton>
      <IconButton variant="tonal" disabled aria-label="Settings"><SettingsIcon /></IconButton>
      <IconButton variant="outlined" disabled aria-label="Settings"><SettingsIcon /></IconButton>
    </div>
  ),
};
