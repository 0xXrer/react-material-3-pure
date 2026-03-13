import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Slider, RangeSlider } from './Slider';

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div style={{ width: 300 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  args: { defaultValue: 50 },
};

export const WithLabel: Story = {
  args: { defaultValue: 50, labeled: true },
};

export const WithTicks: Story = {
  args: { defaultValue: 40, step: 10, ticks: true },
};

export const WithTicksAndLabel: Story = {
  args: { defaultValue: 50, step: 25, ticks: true, labeled: true },
};

export const CustomRange: Story = {
  args: { defaultValue: 5, min: 0, max: 10, step: 1, labeled: true },
};

export const Disabled: Story = {
  args: { defaultValue: 30, disabled: true },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState(50);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 300 }}>
        <Slider value={value} onChange={setValue} onInput={setValue} labeled />
        <span style={{ fontSize: 14, color: '#666', textAlign: 'center' }}>Value: {value}</span>
      </div>
    );
  },
};

export const Range: Story = {
  render: () => (
    <div style={{ width: 300 }}>
      <RangeSlider defaultValueStart={25} defaultValueEnd={75} labeled />
    </div>
  ),
};

export const RangeWithTicks: Story = {
  render: () => (
    <div style={{ width: 300 }}>
      <RangeSlider defaultValueStart={20} defaultValueEnd={80} step={10} ticks labeled />
    </div>
  ),
};
