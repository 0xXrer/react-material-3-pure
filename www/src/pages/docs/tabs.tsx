import { useState } from 'react';
import { Tabs, Tab, TabPanel } from '@m3/components/Tabs';
import { CodeBlock, InstallBlock } from '@/components/code-block';

export function TabsPage() {
    const [primary, setPrimary] = useState(0);
    const [secondary, setSecondary] = useState(0);
    const [withIcons, setWithIcons] = useState(0);

    const FlightIcon = () => (
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" /></svg>
    );
    const HotelIcon = () => (
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z" /></svg>
    );
    const ExploreIcon = () => (
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 10.9c-.61 0-1.1.49-1.1 1.1s.49 1.1 1.1 1.1c.61 0 1.1-.49 1.1-1.1s-.49-1.1-1.1-1.1zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm2.19 12.19L6 18l3.81-8.19L18 6l-3.81 8.19z" /></svg>
    );

    return (
        <div className="page">
            <div className="page-header">
                <h1 className="page-title">Tabs</h1>
                <p className="page-description">
                    Tabs organize content across different screens, data sets, and other interactions.
                    Primary and secondary variants with animated indicator.
                </p>
            </div>

            <InstallBlock npm="npm install react-material-3-pure" cli="npx m3-pure add tabs" />

            <div className="section">
                <h2 className="section-title">Primary</h2>
                <div className="demo-area demo-area-col">
                    <Tabs variant="primary" activeIndex={primary} onChange={setPrimary}>
                        <Tab label="Flights" />
                        <Tab label="Hotels" />
                        <Tab label="Explore" />
                    </Tabs>
                    <TabPanel index={0} activeIndex={primary}>
                        <p style={{ color: 'var(--md-sys-color-on-surface-variant)', fontSize: 14 }}>Flights content</p>
                    </TabPanel>
                    <TabPanel index={1} activeIndex={primary}>
                        <p style={{ color: 'var(--md-sys-color-on-surface-variant)', fontSize: 14 }}>Hotels content</p>
                    </TabPanel>
                    <TabPanel index={2} activeIndex={primary}>
                        <p style={{ color: 'var(--md-sys-color-on-surface-variant)', fontSize: 14 }}>Explore content</p>
                    </TabPanel>
                </div>
                <CodeBlock code={`import { Tabs, Tab, TabPanel } from 'react-material-3-pure'

const [active, setActive] = useState(0);

<Tabs variant="primary" activeIndex={active} onChange={setActive}>
  <Tab label="Flights" />
  <Tab label="Hotels" />
  <Tab label="Explore" />
</Tabs>
<TabPanel index={0} activeIndex={active}>Content</TabPanel>`} />
            </div>

            <div className="section">
                <h2 className="section-title">Secondary</h2>
                <div className="demo-area demo-area-col">
                    <Tabs variant="secondary" activeIndex={secondary} onChange={setSecondary}>
                        <Tab label="All" />
                        <Tab label="Unread" />
                        <Tab label="Starred" />
                    </Tabs>
                </div>
            </div>

            <div className="section">
                <h2 className="section-title">With Icons</h2>
                <div className="demo-area demo-area-col">
                    <Tabs variant="primary" activeIndex={withIcons} onChange={setWithIcons}>
                        <Tab icon={<FlightIcon />} label="Flights" />
                        <Tab icon={<HotelIcon />} label="Hotels" />
                        <Tab icon={<ExploreIcon />} label="Explore" />
                    </Tabs>
                </div>
                <CodeBlock code={`<Tab icon={<FlightIcon />} label="Flights" />`} />
            </div>
        </div>
    );
}
