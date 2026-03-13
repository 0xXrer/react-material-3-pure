import type { Meta, StoryObj } from '@storybook/react';
import { List, ListItem, ListDivider } from './List';

const meta: Meta<typeof List> = {
  title: 'Components/List',
  component: List,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof List>;

const PersonIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
);

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
);

const SettingsIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" /></svg>
);

const ChevronIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" /></svg>
);

export const Default: Story = {
  render: () => (
    <List>
      <ListItem headline="Single Line Item" type="button" onClick={() => {}} />
      <ListItem headline="Another Item" type="button" onClick={() => {}} />
      <ListItem headline="Third Item" type="button" onClick={() => {}} />
    </List>
  ),
};

export const WithSupportingText: Story = {
  render: () => (
    <List>
      <ListItem
        type="button"
        headline="Photos"
        supportingText="Jan 9, 2024"
        onClick={() => {}}
      />
      <ListItem
        type="button"
        headline="Recipes"
        supportingText="Jan 17, 2024"
        onClick={() => {}}
      />
      <ListItem
        type="button"
        headline="Work"
        supportingText="Jan 28, 2024"
        onClick={() => {}}
      />
    </List>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <List>
      <ListItem
        type="button"
        headline="Profile"
        leadingIcon={<PersonIcon />}
        trailingIcon={<ChevronIcon />}
        onClick={() => {}}
      />
      <ListItem
        type="button"
        headline="Favorites"
        leadingIcon={<StarIcon />}
        trailingIcon={<ChevronIcon />}
        onClick={() => {}}
      />
      <ListItem
        type="button"
        headline="Settings"
        leadingIcon={<SettingsIcon />}
        trailingIcon={<ChevronIcon />}
        onClick={() => {}}
      />
    </List>
  ),
};

export const WithDividers: Story = {
  render: () => (
    <List>
      <ListItem type="button" headline="Item 1" onClick={() => {}} />
      <ListDivider />
      <ListItem type="button" headline="Item 2" onClick={() => {}} />
      <ListDivider />
      <ListItem type="button" headline="Item 3" onClick={() => {}} />
    </List>
  ),
};

export const WithTrailingText: Story = {
  render: () => (
    <List>
      <ListItem
        type="button"
        headline="Wi-Fi"
        supportingText="Connected"
        trailingSupportingText="On"
        onClick={() => {}}
      />
      <ListItem
        type="button"
        headline="Bluetooth"
        supportingText="Not connected"
        trailingSupportingText="Off"
        onClick={() => {}}
      />
    </List>
  ),
};

export const NonInteractive: Story = {
  render: () => (
    <List>
      <ListItem headline="Read-only item" />
      <ListItem headline="Another read-only" supportingText="With supporting text" />
    </List>
  ),
};

export const Disabled: Story = {
  render: () => (
    <List>
      <ListItem type="button" headline="Active Item" onClick={() => {}} />
      <ListItem type="button" headline="Disabled Item" disabled onClick={() => {}} />
      <ListItem type="button" headline="Active Item" onClick={() => {}} />
    </List>
  ),
};

export const AsLinks: Story = {
  render: () => (
    <List>
      <ListItem
        type="link"
        headline="Google"
        supportingText="Search engine"
        href="https://google.com"
        target="_blank"
      />
      <ListItem
        type="link"
        headline="GitHub"
        supportingText="Code hosting"
        href="https://github.com"
        target="_blank"
      />
    </List>
  ),
};
