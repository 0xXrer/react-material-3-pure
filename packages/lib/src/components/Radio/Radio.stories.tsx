import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Radio } from './Radio';

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    touchTarget: { control: 'select', options: ['wrapper', 'none'] },
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return (
      <Radio
        {...args}
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
    );
  },
};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    checked: true,
  },
};

export const RadioGroup: Story = {
  render: () => {
    const [selected, setSelected] = useState('apple');
    const options = [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' },
      { value: 'orange', label: 'Orange' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {options.map((option) => (
          <label
            key={option.value}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
            }}
          >
            <Radio
              name="fruit"
              value={option.value}
              checked={selected === option.value}
              onChange={() => setSelected(option.value)}
            />
            {option.label}
          </label>
        ))}
      </div>
    );
  },
};

export const WithLabel: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
        <Radio
          checked={checked}
          onChange={() => setChecked(!checked)}
        />
        Click me to toggle
      </label>
    );
  },
};
