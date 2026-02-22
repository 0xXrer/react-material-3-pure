import { NavLink, useLocation } from 'react-router-dom';
import { useTheme } from '@m3/components/ThemeProvider';

const NAV_ITEMS = [
    {
        label: 'Getting Started',
        items: [
            { to: '/', label: 'Introduction' },
            { to: '/docs/install', label: 'Installation' },
            { to: '/docs/changelog', label: 'Changelog' },
        ],
    },
    {
        label: 'Components',
        items: [
            { to: '/docs/button', label: 'Button' },
            { to: '/docs/checkbox', label: 'Checkbox' },
            { to: '/docs/chip', label: 'Chip' },
            { to: '/docs/dialog', label: 'Dialog' },
            { to: '/docs/divider', label: 'Divider' },
            { to: '/docs/radio', label: 'Radio' },
            { to: '/docs/switch', label: 'Switch' },
            { to: '/docs/textfield', label: 'TextField' },
        ],
    },
    {
        label: 'Utilities',
        items: [
            { to: '/docs/theme', label: 'ThemeProvider' },
        ],
    },
];

export function Sidebar() {
    const { mode, toggleMode, resolvedMode } = useTheme();
    const location = useLocation();

    return (
        <aside className="app-sidebar">
            <div style={{
                padding: '24px 20px 16px',
                borderBottom: '1px solid var(--md-sys-color-outline-variant)',
            }}>
                <NavLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                    }}>
                        <div style={{
                            width: 32,
                            height: 32,
                            borderRadius: 'var(--md-sys-shape-corner-medium)',
                            background: 'var(--md-sys-color-primary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--md-sys-color-on-primary)',
                            fontWeight: 700,
                            fontSize: 14,
                        }}>
                            M3
                        </div>
                        <div>
                            <div style={{
                                fontWeight: 500,
                                fontSize: 16,
                                letterSpacing: '-0.2px',
                                color: 'var(--md-sys-color-on-surface)',
                            }}>
                                M3 Pure
                            </div>
                            <div style={{
                                fontSize: 11,
                                color: 'var(--md-sys-color-on-surface-variant)',
                                letterSpacing: '0.3px',
                            }}>
                                React Components
                            </div>
                        </div>
                    </div>
                </NavLink>
            </div>

            <nav style={{ flex: 1, padding: '12px 8px', overflowY: 'auto' }}>
                {NAV_ITEMS.map((group) => (
                    <div key={group.label} style={{ marginBottom: 8 }}>
                        <div style={{
                            padding: '8px 12px 4px',
                            fontSize: 11,
                            fontWeight: 500,
                            letterSpacing: '0.8px',
                            textTransform: 'uppercase',
                            color: 'var(--md-sys-color-on-surface-variant)',
                        }}>
                            {group.label}
                        </div>
                        {group.items.map((item) => {
                            const isActive = location.pathname === item.to;
                            return (
                                <NavLink
                                    key={item.to}
                                    to={item.to}
                                    style={{
                                        display: 'block',
                                        padding: '8px 12px',
                                        borderRadius: 'var(--md-sys-shape-corner-full)',
                                        fontSize: 14,
                                        fontWeight: isActive ? 500 : 400,
                                        color: isActive
                                            ? 'var(--md-sys-color-on-secondary-container)'
                                            : 'var(--md-sys-color-on-surface-variant)',
                                        background: isActive
                                            ? 'var(--md-sys-color-secondary-container)'
                                            : 'transparent',
                                        textDecoration: 'none',
                                        transition: 'background 150ms, color 150ms',
                                        marginBottom: 2,
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isActive) {
                                            e.currentTarget.style.background = 'var(--md-sys-color-surface-container-high)';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isActive) {
                                            e.currentTarget.style.background = 'transparent';
                                        }
                                    }}
                                >
                                    {item.label}
                                </NavLink>
                            );
                        })}
                    </div>
                ))}
            </nav>

            <div style={{
                padding: '12px 16px',
                borderTop: '1px solid var(--md-sys-color-outline-variant)',
            }}>
                <button
                    onClick={toggleMode}
                    style={{
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: 'var(--md-sys-shape-corner-full)',
                        border: '1px solid var(--md-sys-color-outline-variant)',
                        background: 'var(--md-sys-color-surface-container)',
                        color: 'var(--md-sys-color-on-surface)',
                        fontSize: 13,
                        fontWeight: 500,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 8,
                        transition: 'background 150ms',
                        fontFamily: 'inherit',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'var(--md-sys-color-surface-container-high)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'var(--md-sys-color-surface-container)';
                    }}
                >
                    {resolvedMode === 'dark' ? '☀️' : '🌙'}
                    {resolvedMode === 'dark' ? 'Light mode' : 'Dark mode'}
                </button>
            </div>
        </aside>
    );
}
