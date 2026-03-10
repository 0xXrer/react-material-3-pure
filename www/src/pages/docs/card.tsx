import { Card } from '@m3/components/Card';
import { Button } from '@m3/components/Button';
import { Icon } from '@m3/components/Icon';
import { CodeBlock, InstallBlock } from '@/components/code-block';

function DemoContent({ title, body }: { title: string; body: string }) {
    return (
        <div style={{ padding: 16 }}>
            <div style={{
                fontSize: 16,
                fontWeight: 500,
                color: 'var(--md-sys-color-on-surface)',
                marginBottom: 8,
            }}>
                {title}
            </div>
            <div style={{
                fontSize: 14,
                color: 'var(--md-sys-color-on-surface-variant)',
                lineHeight: 1.5,
                marginBottom: 16,
            }}>
                {body}
            </div>
        </div>
    );
}

export function CardPage() {
    return (
        <div className="page">
            <div className="page-header">
                <h1 className="page-title">Card</h1>
                <p className="page-description">
                    Cards contain content and actions about a single subject. M3 offers three variants: elevated, filled, and outlined.
                </p>
            </div>

            <InstallBlock npm="npm install react-material-3-pure" cli="npx m3-pure add card" />

            <div className="section">
                <h2 className="section-title">Variants</h2>
                <div className="demo-area" style={{ gap: 16, alignItems: 'stretch' }}>
                    <Card variant="elevated" style={{ flex: 1, minWidth: 200 }}>
                        <DemoContent title="Elevated Card" body="Uses shadow for depth separation from the surface." />
                    </Card>
                    <Card variant="filled" style={{ flex: 1, minWidth: 200 }}>
                        <DemoContent title="Filled Card" body="Uses a contrasting container color for visual grouping." />
                    </Card>
                    <Card variant="outlined" style={{ flex: 1, minWidth: 200 }}>
                        <DemoContent title="Outlined Card" body="Uses a border to define the container boundary." />
                    </Card>
                </div>
                <CodeBlock code={`<Card variant="elevated">...</Card>
<Card variant="filled">...</Card>
<Card variant="outlined">...</Card>`} />
            </div>

            <div className="section">
                <h2 className="section-title">Interactive Cards</h2>
                <div className="demo-area" style={{ gap: 16, alignItems: 'stretch' }}>
                    <Card variant="elevated" interactive style={{ flex: 1, minWidth: 200 }}>
                        <DemoContent title="Clickable Card" body="Interactive cards have hover, focus, and press states with ripple." />
                    </Card>
                    <Card variant="outlined" interactive style={{ flex: 1, minWidth: 200 }}>
                        <DemoContent title="Outlined Interactive" body="Click or tap to see the ripple effect." />
                    </Card>
                </div>
                <CodeBlock code={`<Card variant="elevated" interactive onClick={handleClick}>
  ...
</Card>`} />
            </div>

            <div className="section">
                <h2 className="section-title">Rich Content</h2>
                <div className="demo-area">
                    <Card variant="outlined" style={{ maxWidth: 360, width: '100%' }}>
                        <div style={{
                            height: 180,
                            background: 'linear-gradient(135deg, var(--md-sys-color-primary-container), var(--md-sys-color-tertiary-container))',
                            borderRadius: '12px 12px 0 0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Icon name="landscape" style={{ fontSize: 48, color: 'var(--md-sys-color-on-primary-container)' }} />
                        </div>
                        <div style={{ padding: 16 }}>
                            <div style={{ fontSize: 22, fontWeight: 500, color: 'var(--md-sys-color-on-surface)', marginBottom: 8 }}>
                                Card with Media
                            </div>
                            <div style={{ fontSize: 14, color: 'var(--md-sys-color-on-surface-variant)', lineHeight: 1.5, marginBottom: 16 }}>
                                Cards can combine images, text, and actions for rich content layouts.
                            </div>
                            <div style={{ display: 'flex', gap: 8 }}>
                                <Button variant="filled" size="sm">Action</Button>
                                <Button variant="outlined" size="sm">Cancel</Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
