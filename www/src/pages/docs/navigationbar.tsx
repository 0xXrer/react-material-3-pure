import { useState } from 'react';
import { NavigationBar, NavigationBarItem } from '@m3/components/NavigationBar';
import { Badge } from '@m3/components/Badge';
import { Icon } from '@m3/components/Icon';
import { CodeBlock, InstallBlock } from '@/components/code-block';

export function NavigationBarPage() {
    const [active, setActive] = useState(0);

    return (
        <div className="page">
            <div className="page-header">
                <h1 className="page-title">Navigation Bar</h1>
                <p className="page-description">
                    Navigation bars let people switch between UI views on smaller screens. Placed at the bottom, they show three to five destinations with icons and text labels.
                </p>
            </div>

            <InstallBlock npm="npm install react-material-3-pure" cli="npx m3-pure add navigation-bar" />

            <div className="section">
                <h2 className="section-title">Basic Navigation Bar</h2>
                <div className="demo-area" style={{ padding: 0, overflow: 'hidden', borderRadius: 'var(--md-sys-shape-corner-large)' }}>
                    <div style={{ position: 'relative', width: '100%', height: 80 }}>
                        <NavigationBar activeIndex={active} onChange={setActive} style={{ position: 'absolute' }}>
                            <NavigationBarItem
                                icon={<Icon name="home" />}
                                activeIcon={<Icon name="home" filled />}
                                label="Home"
                            />
                            <NavigationBarItem
                                icon={<Icon name="search" />}
                                activeIcon={<Icon name="search" filled />}
                                label="Search"
                            />
                            <NavigationBarItem
                                icon={<Icon name="notifications" />}
                                activeIcon={<Icon name="notifications" filled />}
                                label="Alerts"
                            />
                            <NavigationBarItem
                                icon={<Icon name="person" />}
                                activeIcon={<Icon name="person" filled />}
                                label="Profile"
                            />
                        </NavigationBar>
                    </div>
                </div>
                <div style={{ marginTop: 8, fontSize: 13, color: 'var(--md-sys-color-on-surface-variant)' }}>
                    Active: {['Home', 'Search', 'Alerts', 'Profile'][active]}
                </div>
                <CodeBlock code={`const [active, setActive] = useState(0)

<NavigationBar activeIndex={active} onChange={setActive}>
  <NavigationBarItem icon={<Icon name="home" />} label="Home" />
  <NavigationBarItem icon={<Icon name="search" />} label="Search" />
  <NavigationBarItem icon={<Icon name="notifications" />} label="Alerts" />
  <NavigationBarItem icon={<Icon name="person" />} label="Profile" />
</NavigationBar>`} />
            </div>

            <div className="section">
                <h2 className="section-title">With Badge</h2>
                <div className="demo-area" style={{ padding: 0, overflow: 'hidden', borderRadius: 'var(--md-sys-shape-corner-large)' }}>
                    <div style={{ position: 'relative', width: '100%', height: 80 }}>
                        <NavigationBar activeIndex={0} style={{ position: 'absolute' }}>
                            <NavigationBarItem icon={<Icon name="home" />} label="Home" />
                            <NavigationBarItem
                                icon={<Icon name="chat" />}
                                label="Chat"
                                badge={<Badge value={3} />}
                            />
                            <NavigationBarItem
                                icon={<Icon name="notifications" />}
                                label="Alerts"
                                badge={<Badge size="small" />}
                            />
                        </NavigationBar>
                    </div>
                </div>
                <CodeBlock code={`<NavigationBarItem
  icon={<Icon name="chat" />}
  label="Chat"
  badge={<Badge value={3} />}
/>`} />
            </div>
        </div>
    );
}
