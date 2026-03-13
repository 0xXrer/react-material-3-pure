import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Icon>;

const StarSvg = () => (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
);

const HomeSvg = () => (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" /></svg>
);

export const WithSvg: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Icon size="sm"><StarSvg /></Icon>
      <Icon size="md"><StarSvg /></Icon>
      <Icon size="lg"><StarSvg /></Icon>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Icon size="sm"><HomeSvg /></Icon>
      <Icon size="md"><HomeSvg /></Icon>
      <Icon size="lg"><HomeSvg /></Icon>
    </div>
  ),
};

export const WithColor: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Icon style={{ color: 'var(--md-sys-color-primary, #6750a4)' } as React.CSSProperties}><StarSvg /></Icon>
      <Icon style={{ color: 'var(--md-sys-color-error, #b3261e)' } as React.CSSProperties}><StarSvg /></Icon>
      <Icon style={{ color: 'var(--md-sys-color-tertiary, #7d5260)' } as React.CSSProperties}><StarSvg /></Icon>
    </div>
  ),
};
