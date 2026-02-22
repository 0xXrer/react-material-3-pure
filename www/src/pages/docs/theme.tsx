import { useTheme } from '@m3/components/ThemeProvider';
import type { ThemeMode, ColorScheme } from '@m3/components/ThemeProvider';
import { Button } from '@m3/components/Button';
import { CodeBlock, InstallBlock } from '@/components/code-block';

const SCHEMES: ColorScheme[] = ['default', 'teal', 'blue', 'green', 'orange', 'pink'];

const SCHEME_COLORS: Record<string, string> = {
    default: '#6750A4',
    teal: '#006A6A',
    blue: '#0061A4',
    green: '#386A20',
    orange: '#A03D00',
    pink: '#984061',
};

export function ThemePage() {
    const { mode, resolvedMode, colorScheme, setMode, setColorScheme, toggleMode } = useTheme();

    return (
        <div className="page">
            <div className="page-header">
                <h1 className="page-title">ThemeProvider</h1>
                <p className="page-description">
                    Provides theme context for managing light/dark mode, color schemes,
                    and automatic system preference detection with localStorage persistence.
                </p>
            </div>

            <InstallBlock npm="npm install react-material-3-pure" cli="npx m3-pure add theme-provider" />

            <div className="section">
                <h2 className="section-title">Theme Mode</h2>
                <div className="demo-area demo-area-col">
                    <div style={{ color: 'var(--md-sys-color-on-surface-variant)', fontSize: 13, marginBottom: 12 }}>
                        Current: <strong>{mode}</strong> (resolved: {resolvedMode})
                    </div>
                    <div className="demo-row">
                        {(['light', 'dark', 'system'] as ThemeMode[]).map((m) => (
                            <Button
                                key={m}
                                variant={mode === m ? 'filled' : 'outlined'}
                                size="sm"
                                onClick={() => setMode(m)}
                            >
                                {m}
                            </Button>
                        ))}
                    </div>
                </div>
                <CodeBlock code={`import { ThemeProvider, useTheme } from 'react-material-3-pure'

// Wrap your app
<ThemeProvider defaultMode="system">
  <App />
</ThemeProvider>

// Use in components
function ThemeToggle() {
  const { mode, toggleMode } = useTheme();
  return <button onClick={toggleMode}>{mode}</button>;
}`} />
            </div>

            <div className="section">
                <h2 className="section-title">Color Schemes</h2>
                <div className="demo-area">
                    {SCHEMES.map((s) => (
                        <button
                            key={s}
                            onClick={() => setColorScheme(s)}
                            style={{
                                width: 48,
                                height: 48,
                                borderRadius: 'var(--md-sys-shape-corner-full)',
                                border: colorScheme === s
                                    ? '3px solid var(--md-sys-color-on-surface)'
                                    : '2px solid var(--md-sys-color-outline-variant)',
                                background: SCHEME_COLORS[s],
                                cursor: 'pointer',
                                transition: 'border 150ms, transform 150ms',
                                transform: colorScheme === s ? 'scale(1.1)' : 'scale(1)',
                            }}
                            title={s}
                        />
                    ))}
                </div>
                <CodeBlock code={`const { setColorScheme } = useTheme();
setColorScheme('teal'); // 'default' | 'teal' | 'blue' | 'green' | 'orange' | 'pink'`} />
            </div>

            <div className="section">
                <h2 className="section-title">Preview</h2>
                <div className="demo-area demo-area-col">
                    <div className="demo-row">
                        <Button variant="filled">Filled</Button>
                        <Button variant="outlined">Outlined</Button>
                        <Button variant="tonal">Tonal</Button>
                        <Button variant="text">Text</Button>
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--md-sys-color-on-surface-variant)', marginTop: 8 }}>
                        Buttons above react to the selected color scheme in real time.
                    </p>
                </div>
            </div>
        </div>
    );
}
