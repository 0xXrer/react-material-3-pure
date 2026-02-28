import { useState, useEffect } from 'react';
import { LinearProgress, CircularProgress } from '@m3/components/Progress';
import { Button } from '@m3/components/Button';
import { CodeBlock, InstallBlock } from '@/components/code-block';

export function ProgressPage() {
    const [progress, setProgress] = useState(0);
    const [running, setRunning] = useState(false);

    useEffect(() => {
        if (!running) return;
        const interval = setInterval(() => {
            setProgress((p) => {
                if (p >= 100) { setRunning(false); return 0; }
                return p + 2;
            });
        }, 60);
        return () => clearInterval(interval);
    }, [running]);

    return (
        <div className="page">
            <div className="page-header">
                <h1 className="page-title">Progress</h1>
                <p className="page-description">
                    Progress indicators inform users about the status of ongoing processes,
                    such as loading an app or submitting a form. Linear and circular variants.
                </p>
            </div>

            <InstallBlock npm="npm install react-material-3-pure" cli="npx m3-pure add progress" />

            <div className="section">
                <h2 className="section-title">Linear — Indeterminate</h2>
                <div className="demo-area demo-area-col">
                    <div style={{ width: '100%' }}>
                        <LinearProgress />
                    </div>
                </div>
                <CodeBlock code={`import { LinearProgress } from 'react-material-3-pure'

<LinearProgress />`} />
            </div>

            <div className="section">
                <h2 className="section-title">Linear — Determinate</h2>
                <div className="demo-area demo-area-col" style={{ gap: 16 }}>
                    <div style={{ width: '100%' }}>
                        <LinearProgress value={progress} />
                    </div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <Button variant="tonal" size="sm" onClick={() => { setProgress(0); setRunning(true); }}>
                            Start
                        </Button>
                        <span style={{ fontSize: 13, color: 'var(--md-sys-color-on-surface-variant)', fontFamily: "'Google Sans Mono', monospace" }}>
                            {progress}%
                        </span>
                    </div>
                </div>
                <CodeBlock code={`<LinearProgress value={50} />`} />
            </div>

            <div className="section">
                <h2 className="section-title">Circular — Indeterminate</h2>
                <div className="demo-area">
                    <CircularProgress />
                    <CircularProgress size="sm" />
                    <CircularProgress size="lg" />
                </div>
                <CodeBlock code={`import { CircularProgress } from 'react-material-3-pure'

<CircularProgress />
<CircularProgress size="sm" />
<CircularProgress size="lg" />`} />
            </div>

            <div className="section">
                <h2 className="section-title">Circular — Determinate</h2>
                <div className="demo-area">
                    <CircularProgress value={0.25} />
                    <CircularProgress value={0.5} />
                    <CircularProgress value={0.75} />
                    <CircularProgress value={1} />
                </div>
                <CodeBlock code={`<CircularProgress value={0.75} />`} />
            </div>

            <div className="section">
                <h2 className="section-title">Four-Color</h2>
                <div className="demo-area">
                    <CircularProgress fourColor />
                    <LinearProgress fourColor />
                </div>
                <CodeBlock code={`<CircularProgress fourColor />
<LinearProgress fourColor />`} />
            </div>
        </div>
    );
}
