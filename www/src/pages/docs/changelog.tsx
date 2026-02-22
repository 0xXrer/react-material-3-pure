const RELEASES: Release[] = [
    {
        version: '0.1.1',
        date: '2026-02-22',
        sections: [
            {
                type: 'added',
                items: [
                    'Publishable NPM package (packages/lib/) — ESM + CJS + TypeScript declarations',
                    'CSS Modules support via esbuild-css-modules-plugin',
                    './styles export for theme tokens + global reset',
                    'Tree-shaking with sideEffects: ["*.css"]',
                    'Monorepo workspace setup (packages/*, cli)',
                    'Button — filled, outlined, text, elevated, tonal',
                    'Checkbox — standard + indeterminate',
                    'Chip — assist, filter, input, suggestion',
                    'Dialog — modal with focus trap and actions',
                    'Divider — horizontal + vertical',
                    'Radio — standalone + group',
                    'Switch — with/without icons',
                    'TextField — filled, outlined',
                    'ThemeProvider — light/dark/system mode, seed color customization',
                    'useRipple hook — M3 ripple effect for any element',
                ],
            },
            {
                type: 'fixed',
                items: [
                    'Missing Switch export in src/index.ts barrel',
                ],
            },
        ],
    },
];

type ChangeType = 'added' | 'fixed' | 'changed' | 'removed' | 'deprecated';

interface ChangeSection {
    type: ChangeType;
    items: string[];
}

interface Release {
    version: string;
    date: string;
    sections: ChangeSection[];
}

const TAG_COLORS: Record<ChangeType, { bg: string; fg: string }> = {
    added: {
        bg: 'var(--md-sys-color-primary-container)',
        fg: 'var(--md-sys-color-on-primary-container)',
    },
    fixed: {
        bg: 'var(--md-sys-color-tertiary-container)',
        fg: 'var(--md-sys-color-on-tertiary-container)',
    },
    changed: {
        bg: 'var(--md-sys-color-secondary-container)',
        fg: 'var(--md-sys-color-on-secondary-container)',
    },
    removed: {
        bg: 'var(--md-sys-color-error-container)',
        fg: 'var(--md-sys-color-on-error-container)',
    },
    deprecated: {
        bg: 'var(--md-sys-color-surface-container-highest)',
        fg: 'var(--md-sys-color-on-surface-variant)',
    },
};

function Tag({ type }: { type: ChangeType }) {
    const colors = TAG_COLORS[type];
    return (
        <span style={{
            display: 'inline-block',
            padding: '2px 10px',
            borderRadius: 'var(--md-sys-shape-corner-full)',
            background: colors.bg,
            color: colors.fg,
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: '0.3px',
            textTransform: 'uppercase',
        }}>
            {type}
        </span>
    );
}

export function ChangelogPage() {
    return (
        <div className="page">
            <div className="page-header">
                <h1 className="page-title">Changelog</h1>
                <p className="page-description">
                    All notable changes to react-material-3-pure.
                </p>
            </div>

            {RELEASES.map((release) => (
                <div key={release.version} className="section">
                    <div style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: 12,
                        marginBottom: 20,
                    }}>
                        <h2 style={{
                            fontSize: 28,
                            fontWeight: 500,
                            color: 'var(--md-sys-color-on-surface)',
                            letterSpacing: '-0.3px',
                        }}>
                            {release.version}
                        </h2>
                        <span style={{
                            fontSize: 14,
                            color: 'var(--md-sys-color-on-surface-variant)',
                            fontFamily: "'Google Sans Mono', monospace",
                        }}>
                            {release.date}
                        </span>
                    </div>

                    {release.sections.map((section) => (
                        <div key={section.type} style={{ marginBottom: 24 }}>
                            <Tag type={section.type} />
                            <ul style={{
                                marginTop: 12,
                                paddingLeft: 20,
                                listStyleType: 'none',
                            }}>
                                {section.items.map((item, i) => (
                                    <li key={i} style={{
                                        padding: '6px 0',
                                        fontSize: 14,
                                        color: 'var(--md-sys-color-on-surface)',
                                        lineHeight: 1.5,
                                        position: 'relative',
                                        paddingLeft: 16,
                                    }}>
                                        <span style={{
                                            position: 'absolute',
                                            left: 0,
                                            top: 10,
                                            width: 6,
                                            height: 6,
                                            borderRadius: '50%',
                                            background: 'var(--md-sys-color-outline)',
                                        }} />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
