import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    selected: { control: 'boolean' },
    disabled: { control: 'boolean' },
    icons: { control: 'boolean' },
    showOnlySelectedIcon: { control: 'boolean' },
    touchTarget: { control: 'select', options: ['wrapper', 'none'] },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

function DefaultSwitch(args: Partial<React.ComponentProps<typeof Switch>>) {
  const [selected, setSelected] = useState(false);
  return (
    <Switch
      {...args}
      selected={selected}
      onChange={() => setSelected(!selected)}
    />
  );
}

export const Default: Story = {
  render: (args) => <DefaultSwitch {...args} />,
};

export const Selected: Story = {
  args: {
    selected: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledSelected: Story = {
  args: {
    disabled: true,
    selected: true,
  },
};

function WithIconsSwitch() {
  const [selected, setSelected] = useState(false);
  return (
    <Switch
      icons
      selected={selected}
      onChange={() => setSelected(!selected)}
    />
  );
}

export const WithIcons: Story = {
  render: () => <WithIconsSwitch />,
};

function SelectedIconOnlySwitch() {
  const [selected, setSelected] = useState(true);
  return (
    <Switch
      showOnlySelectedIcon
      selected={selected}
      onChange={() => setSelected(!selected)}
    />
  );
}

export const SelectedIconOnly: Story = {
  render: () => <SelectedIconOnlySwitch />,
};

function WithLabelSwitch() {
  const [selected, setSelected] = useState(false);
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
      <Switch
        selected={selected}
        onChange={() => setSelected(!selected)}
      />
      Dark Mode
    </label>
  );
}

export const WithLabel: Story = {
  render: () => <WithLabelSwitch />,
};
