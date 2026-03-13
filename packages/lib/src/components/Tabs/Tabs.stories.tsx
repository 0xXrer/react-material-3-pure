import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Tabs, Tab, TabPanel } from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div style={{ width: 500 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

const FlightIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" /></svg>
);
const HotelIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z" /></svg>
);
const ExploreIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 10.9c-.61 0-1.1.49-1.1 1.1s.49 1.1 1.1 1.1c.61 0 1.1-.49 1.1-1.1s-.49-1.1-1.1-1.1zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm2.19 12.19L6 18l3.81-8.19L18 6l-3.81 8.19z" /></svg>
);

export const Primary: Story = {
  render: () => {
    const [active, setActive] = useState(0);
    return (
      <>
        <Tabs variant="primary" activeIndex={active} onChange={setActive}>
          <Tab label="Flights" />
          <Tab label="Hotels" />
          <Tab label="Explore" />
        </Tabs>
        <TabPanel index={0} activeIndex={active}>Flights content</TabPanel>
        <TabPanel index={1} activeIndex={active}>Hotels content</TabPanel>
        <TabPanel index={2} activeIndex={active}>Explore content</TabPanel>
      </>
    );
  },
};

export const Secondary: Story = {
  render: () => {
    const [active, setActive] = useState(0);
    return (
      <>
        <Tabs variant="secondary" activeIndex={active} onChange={setActive}>
          <Tab label="Flights" />
          <Tab label="Hotels" />
          <Tab label="Explore" />
        </Tabs>
        <TabPanel index={0} activeIndex={active}>Flights content</TabPanel>
        <TabPanel index={1} activeIndex={active}>Hotels content</TabPanel>
        <TabPanel index={2} activeIndex={active}>Explore content</TabPanel>
      </>
    );
  },
};

export const WithIcons: Story = {
  render: () => {
    const [active, setActive] = useState(0);
    return (
      <Tabs variant="primary" activeIndex={active} onChange={setActive}>
        <Tab icon={<FlightIcon />} label="Flights" />
        <Tab icon={<HotelIcon />} label="Hotels" />
        <Tab icon={<ExploreIcon />} label="Explore" />
      </Tabs>
    );
  },
};

export const IconsOnly: Story = {
  render: () => {
    const [active, setActive] = useState(0);
    return (
      <Tabs variant="primary" activeIndex={active} onChange={setActive}>
        <Tab icon={<FlightIcon />} />
        <Tab icon={<HotelIcon />} />
        <Tab icon={<ExploreIcon />} />
      </Tabs>
    );
  },
};

export const SecondaryWithIcons: Story = {
  render: () => {
    const [active, setActive] = useState(0);
    return (
      <Tabs variant="secondary" activeIndex={active} onChange={setActive}>
        <Tab icon={<FlightIcon />} label="Flights" />
        <Tab icon={<HotelIcon />} label="Hotels" />
        <Tab icon={<ExploreIcon />} label="Explore" />
      </Tabs>
    );
  },
};

export const WithDisabledTab: Story = {
  render: () => {
    const [active, setActive] = useState(0);
    return (
      <Tabs variant="primary" activeIndex={active} onChange={setActive}>
        <Tab label="Active" />
        <Tab label="Disabled" disabled />
        <Tab label="Also Active" />
      </Tabs>
    );
  },
};
