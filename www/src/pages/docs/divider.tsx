import { Divider } from '@m3/components/Divider';
import { CodeBlock, InstallCmd } from '@/components/code-block';

export function DividerPage() {
    return (
        <div className="page">
            <div className="page-header">
                <h1 className="page-title">Divider</h1>
                <p className="page-description">
                    A divider is a thin line that groups content in lists and containers.
                </p>
            </div>

            <InstallCmd cmd="npx m3-pure add divider" />

            <div className="section">
                <h2 className="section-title">Full Width</h2>
                <div className="demo-area demo-area-col">
                    <div style={{ color: 'var(--md-sys-color-on-surface)', marginBottom: 12 }}>Content above</div>
                    <Divider />
                    <div style={{ color: 'var(--md-sys-color-on-surface)', marginTop: 12 }}>Content below</div>
                </div>
                <CodeBlock code={`import { Divider } from '@/components/ui/Divider';

<Divider />`} />
            </div>

            <div className="section">
                <h2 className="section-title">Inset Variants</h2>
                <div className="demo-area demo-area-col" style={{ gap: 24 }}>
                    <div style={{ width: '100%' }}>
                        <div className="demo-label">Inset (both sides)</div>
                        <Divider inset />
                    </div>
                    <div style={{ width: '100%' }}>
                        <div className="demo-label">Inset Start</div>
                        <Divider insetStart />
                    </div>
                    <div style={{ width: '100%' }}>
                        <div className="demo-label">Inset End</div>
                        <Divider insetEnd />
                    </div>
                </div>
                <CodeBlock code={`<Divider inset />
<Divider insetStart />
<Divider insetEnd />`} />
            </div>
        </div>
    );
}
