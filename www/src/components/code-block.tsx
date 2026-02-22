import { useState, useCallback } from 'react';

interface CodeBlockProps {
    code: string;
    lang?: string;
}

export function CodeBlock({ code, lang = 'tsx' }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }, [code]);

    return (
        <div style={{
            position: 'relative',
            borderRadius: 'var(--md-sys-shape-corner-medium)',
            overflow: 'hidden',
            border: '1px solid var(--md-sys-color-outline-variant)',
            marginBottom: 16,
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 12px',
                background: 'var(--md-sys-color-surface-container-highest)',
                borderBottom: '1px solid var(--md-sys-color-outline-variant)',
            }}>
                <span style={{
                    fontSize: 11,
                    fontWeight: 500,
                    color: 'var(--md-sys-color-on-surface-variant)',
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                    fontFamily: "'Google Sans Mono', monospace",
                }}>
                    {lang}
                </span>
                <button
                    onClick={handleCopy}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: copied
                            ? 'var(--md-sys-color-primary)'
                            : 'var(--md-sys-color-on-surface-variant)',
                        cursor: 'pointer',
                        fontSize: 12,
                        fontWeight: 500,
                        padding: '4px 8px',
                        borderRadius: 4,
                        transition: 'color 150ms',
                        fontFamily: 'inherit',
                    }}
                >
                    {copied ? '✓ Copied' : 'Copy'}
                </button>
            </div>
            <pre style={{
                margin: 0,
                padding: 16,
                background: 'var(--md-sys-color-surface-container)',
                overflowX: 'auto',
            }}>
                <code style={{
                    fontFamily: "'Google Sans Mono', 'Fira Code', monospace",
                    fontSize: 13,
                    lineHeight: 1.6,
                    color: 'var(--md-sys-color-on-surface)',
                    whiteSpace: 'pre',
                }}>
                    {code}
                </code>
            </pre>
        </div>
    );
}

interface InstallCmdProps {
    cmd: string;
}

export function InstallCmd({ cmd }: InstallCmdProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(cmd);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }, [cmd]);

    return (
        <div className="install-cmd">
            <span className="prefix">$</span>
            <span className="cmd">{cmd}</span>
            <button onClick={handleCopy} title="Copy">
                {copied ? '✓' : '⧉'}
            </button>
        </div>
    );
}

interface InstallBlockProps {
    npm: string;
    cli: string;
}

export function InstallBlock({ npm, cli }: InstallBlockProps) {
    const [tab, setTab] = useState<'npm' | 'cli'>('npm');
    const cmd = tab === 'npm' ? npm : cli;
    const [copied, setCopied] = useState(false);

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(cmd);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }, [cmd]);

    return (
        <div style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', gap: 0 }}>
                {(['npm', 'cli'] as const).map((t) => (
                    <button
                        key={t}
                        onClick={() => setTab(t)}
                        style={{
                            padding: '6px 16px',
                            fontSize: 12,
                            fontWeight: 500,
                            letterSpacing: '0.3px',
                            textTransform: 'uppercase',
                            border: '1px solid var(--md-sys-color-outline-variant)',
                            borderBottom: tab === t ? 'none' : '1px solid var(--md-sys-color-outline-variant)',
                            borderRadius: t === 'npm' ? '8px 0 0 0' : '0 8px 0 0',
                            background: tab === t
                                ? 'var(--md-sys-color-surface-container-highest)'
                                : 'var(--md-sys-color-surface-container)',
                            color: tab === t
                                ? 'var(--md-sys-color-on-surface)'
                                : 'var(--md-sys-color-on-surface-variant)',
                            cursor: 'pointer',
                            fontFamily: 'inherit',
                            transition: 'background 150ms, color 150ms',
                        }}
                    >
                        {t}
                    </button>
                ))}
                <div style={{ flex: 1, borderBottom: '1px solid var(--md-sys-color-outline-variant)' }} />
            </div>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                background: 'var(--md-sys-color-surface-container-highest)',
                borderRadius: '0 0 8px 8px',
                padding: '12px 16px',
                fontFamily: "'Google Sans Mono', monospace",
                fontSize: 14,
                color: 'var(--md-sys-color-on-surface)',
                border: '1px solid var(--md-sys-color-outline-variant)',
                borderTop: 'none',
            }}>
                <span style={{ color: 'var(--md-sys-color-primary)', userSelect: 'none' }}>$</span>
                <span style={{ flex: 1 }}>{cmd}</span>
                <button
                    onClick={handleCopy}
                    title="Copy"
                    style={{
                        background: 'none',
                        border: 'none',
                        color: copied ? 'var(--md-sys-color-primary)' : 'var(--md-sys-color-on-surface-variant)',
                        cursor: 'pointer',
                        padding: 4,
                        borderRadius: 4,
                        display: 'flex',
                        alignItems: 'center',
                        transition: 'color 150ms',
                    }}
                >
                    {copied ? '✓' : '⧉'}
                </button>
            </div>
        </div>
    );
}

