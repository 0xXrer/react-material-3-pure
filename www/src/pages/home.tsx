import { Link } from 'react-router-dom';
import { Button } from '@m3/components/Button';
import { InstallBlock } from '@/components/code-block';

const COMPONENTS = [
    { to: '/docs/button', name: 'Button', desc: 'Filled, outlined, text, elevated, tonal' },
    { to: '/docs/checkbox', name: 'Checkbox', desc: 'Checked, unchecked, indeterminate states' },
    { to: '/docs/chip', name: 'Chip', desc: 'Assist, filter, input, suggestion variants' },
    { to: '/docs/dialog', name: 'Dialog', desc: 'Modal with focus trap and animations' },
    { to: '/docs/divider', name: 'Divider', desc: 'Full-width and inset variants' },
    { to: '/docs/radio', name: 'Radio', desc: 'Single selection with ripple effect' },
    { to: '/docs/switch', name: 'Switch', desc: 'Toggle with handle and optional icons' },
    { to: '/docs/textfield', name: 'TextField', desc: 'Filled and outlined with floating label' },
    { to: '/docs/theme', name: 'ThemeProvider', desc: 'Light/dark/system mode management' },
];

export function Home() {
    return (
        <div className="page">
            <div style={{ padding: '40px 0 60px' }}>
                <div style={{
                    display: 'inline-block',
                    padding: '4px 12px',
                    borderRadius: 'var(--md-sys-shape-corner-full)',
                    background: 'var(--md-sys-color-primary-container)',
                    color: 'var(--md-sys-color-on-primary-container)',
                    fontSize: 12,
                    fontWeight: 500,
                    letterSpacing: '0.3px',
                    marginBottom: 16,
                }}>
                    v0.3.1
                </div>

                <h1 style={{
                    fontSize: 48,
                    fontWeight: 500,
                    letterSpacing: '-1px',
                    lineHeight: 1.1,
                    color: 'var(--md-sys-color-on-surface)',
                    marginBottom: 16,
                }}>
                    M3 Pure
                </h1>

                <p style={{
                    fontSize: 20,
                    color: 'var(--md-sys-color-on-surface-variant)',
                    maxWidth: 560,
                    lineHeight: 1.5,
                    marginBottom: 32,
                }}>
                    Beautiful, accessible Material Design 3 components for React.
                    <br />
                    Copy-paste into your project. No runtime dependency.
                </p>

                <div style={{ display: 'flex', gap: 12, marginBottom: 48 }}>
                    <Button variant="filled" as="a" href="/docs/button">
                        Browse Components
                    </Button>
                    <Button variant="outlined" as="a" href="https://github.com/user/react-material-3-pure" target="_blank">
                        GitHub
                    </Button>
                </div>

                <InstallBlock npm="npm install react-material-3-pure" cli="npx m3-pure init" />
            </div>

            <h2 style={{
                fontSize: 24,
                fontWeight: 500,
                color: 'var(--md-sys-color-on-surface)',
                marginBottom: 24,
                letterSpacing: '-0.3px',
            }}>
                Components
            </h2>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                gap: 12,
            }}>
                {COMPONENTS.map((c) => (
                    <Link
                        key={c.to}
                        to={c.to}
                        style={{
                            padding: '20px',
                            borderRadius: 'var(--md-sys-shape-corner-large)',
                            border: '1px solid var(--md-sys-color-outline-variant)',
                            background: 'var(--md-sys-color-surface-container-low)',
                            textDecoration: 'none',
                            transition: 'background 150ms, border-color 150ms',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'var(--md-sys-color-surface-container)';
                            e.currentTarget.style.borderColor = 'var(--md-sys-color-outline)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'var(--md-sys-color-surface-container-low)';
                            e.currentTarget.style.borderColor = 'var(--md-sys-color-outline-variant)';
                        }}
                    >
                        <div style={{
                            fontSize: 16,
                            fontWeight: 500,
                            color: 'var(--md-sys-color-on-surface)',
                            marginBottom: 4,
                        }}>
                            {c.name}
                        </div>
                        <div style={{
                            fontSize: 13,
                            color: 'var(--md-sys-color-on-surface-variant)',
                            lineHeight: 1.4,
                        }}>
                            {c.desc}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
