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
