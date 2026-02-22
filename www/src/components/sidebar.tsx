import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTheme } from '@m3/components/ThemeProvider';
import logoSvg from '../assets/logo.svg';

const DISCORD_DISMISSED_KEY = 'm3-discord-dismissed';

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

const bannerKeyframes = `
@keyframes discordSlideUp {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
}
@keyframes discordPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
}
@keyframes discordShimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
}
`;

export function Sidebar() {
    const { toggleMode, resolvedMode } = useTheme();
    const location = useLocation();
    const [dismissed, setDismissed] = useState(() =>
        localStorage.getItem(DISCORD_DISMISSED_KEY) === '1'
    );

    const handleDismiss = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        localStorage.setItem(DISCORD_DISMISSED_KEY, '1');
        setDismissed(true);
    };

    return (
        <aside className="app-sidebar">
            <style>{bannerKeyframes}</style>
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
                        <img src={logoSvg} alt="M3 Pure" style={{
                            width: 32,
                            height: 32,
                            borderRadius: 'var(--md-sys-shape-corner-medium)',
                        }} />
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

            {!dismissed && (
                <div style={{
                    position: 'absolute',
                    bottom: 76,
                    left: 12,
                    right: 12,
                    zIndex: 10,
                }}>

                    <a
                        href="https://discord.gg/BaKN84V6Bv"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            position: 'relative',
                            display: 'block',
                            padding: '14px 14px 12px',
                            borderRadius: 'var(--md-sys-shape-corner-large, 16px)',
                            background: 'linear-gradient(135deg, #5865F2 0%, #7289DA 50%, #99AAF5 100%)',
                            color: '#fff',
                            textDecoration: 'none',
                            overflow: 'hidden',
                            animation: 'discordSlideUp 400ms cubic-bezier(0.2, 0.9, 0.3, 1)',
                            transition: 'transform 200ms, box-shadow 200ms',
                            boxShadow: '0 2px 12px rgba(88, 101, 242, 0.3)',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 6px 20px rgba(88, 101, 242, 0.45)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 2px 12px rgba(88, 101, 242, 0.3)';
                        }}
                    >
                        <div
                            style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
                                backgroundSize: '200% 100%',
                                animation: 'discordShimmer 3s ease-in-out infinite',
                                pointerEvents: 'none',
                            }}
                        />

                        <button
                            onClick={handleDismiss}
                            style={{
                                position: 'absolute',
                                top: 6,
                                right: 6,
                                width: 20,
                                height: 20,
                                borderRadius: '50%',
                                border: 'none',
                                background: 'rgba(255,255,255,0.15)',
                                color: 'rgba(255,255,255,0.7)',
                                fontSize: 12,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: 0,
                                lineHeight: 1,
                                transition: 'background 150ms',
                                zIndex: 1,
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'rgba(255,255,255,0.3)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                            }}
                        >
                            ✕
                        </button>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, position: 'relative' }}>
                            <div style={{ animation: 'discordPulse 2s ease-in-out infinite' }}>
                                <svg width="24" height="18" viewBox="0 0 71 55" fill="#fff">
                                    <path d="M60.1 4.9A58.5 58.5 0 0 0 45.4.2a.2.2 0 0 0-.2.1 40.7 40.7 0 0 0-1.8 3.7 54 54 0 0 0-16.2 0A39.2 39.2 0 0 0 25.4.3a.2.2 0 0 0-.2-.1A58.4 58.4 0 0 0 10.5 4.9a.2.2 0 0 0-.1.1C1.5 18.7-.9 32.2.3 45.5v.2a58.9 58.9 0 0 0 17.7 9a.2.2 0 0 0 .3-.1 42.1 42.1 0 0 0 3.6-5.9.2.2 0 0 0-.1-.3 38.8 38.8 0 0 1-5.5-2.7.2.2 0 0 1 0-.4l1.1-.9a.2.2 0 0 1 .2 0 42 42 0 0 0 35.8 0 .2.2 0 0 1 .2 0l1.1.9a.2.2 0 0 1 0 .4 36.4 36.4 0 0 1-5.5 2.7.2.2 0 0 0-.1.3 47.2 47.2 0 0 0 3.6 5.9.2.2 0 0 0 .3.1A58.7 58.7 0 0 0 70.7 45.7v-.2c1.4-15.2-2.4-28.4-10-40.1a.2.2 0 0 0-.6-.5ZM23.7 37.3c-3.5 0-6.3-3.2-6.3-7s2.8-7 6.3-7 6.4 3.2 6.3 7-2.8 7-6.3 7Zm23.2 0c-3.5 0-6.3-3.2-6.3-7s2.8-7 6.3-7 6.4 3.2 6.3 7-2.8 7-6.3 7Z" />
                                </svg>
                            </div>
                            <span style={{ fontWeight: 600, fontSize: 14, letterSpacing: '-0.2px' }}>
                                Join our Discord
                            </span>
                        </div>
                        <div style={{
                            fontSize: 11,
                            opacity: 0.85,
                            lineHeight: 1.4,
                            position: 'relative',
                        }}>
                            Get help, share feedback, and connect with the M3 Pure community
                        </div>

                        <div style={{
                            marginTop: 10,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 4,
                            background: 'rgba(255,255,255,0.18)',
                            borderRadius: 'var(--md-sys-shape-corner-full, 100px)',
                            padding: '4px 12px',
                            fontSize: 11,
                            fontWeight: 600,
                            letterSpacing: '0.3px',
                            position: 'relative',
                            backdropFilter: 'blur(4px)',
                        }}>
                            <span style={{
                                width: 6,
                                height: 6,
                                borderRadius: '50%',
                                background: '#57F287',
                                display: 'inline-block',
                                boxShadow: '0 0 6px rgba(87, 242, 135, 0.6)',
                            }} />
                            Join now →
                        </div>
                    </a>
                </div>
            )}

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
