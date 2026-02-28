import { Icon } from '@m3/components/Icon';
import { CodeBlock, InstallBlock } from '@/components/code-block';

export function IconPage() {
    return (
        <div className="page">
            <div className="page-header">
                <h1 className="page-title">Icon</h1>
                <p className="page-description">
                    Icons are visual symbols used to represent commands, objects, or common actions.
                    Wraps Material Symbols with M3 sizing, color, and grade support.
                </p>
            </div>

            <InstallBlock npm="npm install react-material-3-pure" cli="npx m3-pure add icon" />

            <div className="section">
                <h2 className="section-title">Basic</h2>
                <div className="demo-area">
                    <Icon>home</Icon>
                    <Icon>settings</Icon>
                    <Icon>favorite</Icon>
                    <Icon>search</Icon>
                    <Icon>delete</Icon>
                </div>
                <CodeBlock code={`import { Icon } from 'react-material-3-pure'

<Icon>home</Icon>
<Icon>settings</Icon>
<Icon>favorite</Icon>`} />
                <div style={{
                    marginTop: 12,
                    background: 'var(--md-sys-color-tertiary-container)',
                    color: 'var(--md-sys-color-on-tertiary-container)',
                    borderRadius: 'var(--md-sys-shape-corner-medium)',
                    padding: '12px 16px',
                    fontSize: 14,
                    lineHeight: 1.5,
                }}>
                    Requires <code>Material Symbols</code> font. Add to your HTML:
                    <br />
                    <code style={{ fontSize: 12 }}>{'<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />'}</code>
                </div>
            </div>

            <div className="section">
                <h2 className="section-title">Sizes</h2>
                <div className="demo-area" style={{ alignItems: 'flex-end' }}>
                    <Icon size="sm">star</Icon>
                    <Icon size="md">star</Icon>
                    <Icon size="lg">star</Icon>
                </div>
                <CodeBlock code={`<Icon size="sm">star</Icon>
<Icon size="md">star</Icon>
<Icon size="lg">star</Icon>`} />
            </div>

            <div className="section">
                <h2 className="section-title">Filled</h2>
                <div className="demo-area">
                    <Icon>favorite</Icon>
                    <Icon filled>favorite</Icon>
                    <Icon>bookmark</Icon>
                    <Icon filled>bookmark</Icon>
                </div>
                <CodeBlock code={`<Icon filled>favorite</Icon>`} />
            </div>
        </div>
    );
}
