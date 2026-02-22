import { CodeBlock, InstallBlock } from '@/components/code-block';

export function InstallPage() {
    return (
        <div className="page">
            <div className="page-header">
                <h1 className="page-title">Installation</h1>
                <p className="page-description">
                    Get started with M3 Pure — install the package and import components directly.
                </p>
            </div>

            <div className="section">
                <h2 className="section-title">Install</h2>
                <InstallBlock npm="npm install react-material-3-pure" cli="npx m3-pure init" />
                <CodeBlock code={`import { Button, Switch } from 'react-material-3-pure'
import 'react-material-3-pure/styles'

function App() {
  return (
    <ThemeProvider>
      <Button variant="filled">Click me</Button>
      <Switch />
    </ThemeProvider>
  )
}`} />
            </div>

            <div className="section">
                <h2 className="section-title">Styles</h2>
                <p className="page-description" style={{ marginBottom: 16 }}>
                    Import the full theme (design tokens + global reset):
                </p>
                <CodeBlock code={`import 'react-material-3-pure/styles'`} />
                <p className="page-description" style={{ marginTop: 16 }}>
                    Component-level CSS is auto-included via CSS Modules — no extra imports needed per component.
                </p>
            </div>

            <div className="section">
                <h2 className="section-title">Peer Dependencies</h2>
                <div style={{
                    background: 'var(--md-sys-color-surface-container)',
                    borderRadius: 'var(--md-sys-shape-corner-large)',
                    padding: '20px 24px',
                    border: '1px solid var(--md-sys-color-outline-variant)',
                }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th style={thStyle}>Package</th>
                                <th style={thStyle}>Version</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={tdStyle}><code>react</code></td>
                                <td style={tdStyle}>≥18</td>
                            </tr>
                            <tr>
                                <td style={tdStyle}><code>react-dom</code></td>
                                <td style={tdStyle}>≥18</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="section">
                <h2 className="section-title">Package Exports</h2>
                <CodeBlock code={`// Main entry — all components + hooks
import { Button, Checkbox, useRipple } from 'react-material-3-pure'

// Styles entry — theme tokens + global reset
import 'react-material-3-pure/styles'`} />
                <div style={{
                    marginTop: 16,
                    background: 'var(--md-sys-color-tertiary-container)',
                    color: 'var(--md-sys-color-on-tertiary-container)',
                    borderRadius: 'var(--md-sys-shape-corner-medium)',
                    padding: '12px 16px',
                    fontSize: 14,
                    lineHeight: 1.5,
                }}>
                    <strong>Tree-shaking:</strong> The package is configured with <code>sideEffects: ["*.css"]</code> so
                    unused components are eliminated by your bundler.
                </div>
            </div>
        </div>
    );
}

const thStyle: React.CSSProperties = {
    textAlign: 'left',
    padding: '8px 12px',
    fontSize: 13,
    fontWeight: 500,
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    color: 'var(--md-sys-color-on-surface-variant)',
    borderBottom: '1px solid var(--md-sys-color-outline-variant)',
};

const tdStyle: React.CSSProperties = {
    padding: '10px 12px',
    fontSize: 14,
    color: 'var(--md-sys-color-on-surface)',
};
