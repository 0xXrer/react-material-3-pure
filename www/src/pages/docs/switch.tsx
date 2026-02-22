import { useState } from 'react';
import { Switch } from '@m3/components/Switch';
import { CodeBlock, InstallBlock } from '@/components/code-block';

export function SwitchPage() {
    const [s1, setS1] = useState(false);
    const [s2, setS2] = useState(true);
    const [s3, setS3] = useState(false);
    const [s4, setS4] = useState(true);

    return (
        <div className="page">
            <div className="page-header">
                <h1 className="page-title">Switch</h1>
                <p className="page-description">
                    Switches toggle the state of a single item on or off. They are the preferred way to adjust settings on mobile.
                </p>
            </div>

            <InstallBlock npm="npm install react-material-3-pure" cli="npx m3-pure add switch" />

            <div className="section">
                <h2 className="section-title">Basic</h2>
                <div className="demo-area">
                    <label style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', color: 'var(--md-sys-color-on-surface)', fontSize: 14 }}>
                        Wi-Fi
                        <Switch selected={s1} onChange={() => setS1(!s1)} />
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', color: 'var(--md-sys-color-on-surface)', fontSize: 14 }}>
                        Bluetooth
                        <Switch selected={s2} onChange={() => setS2(!s2)} />
                    </label>
                </div>
                <CodeBlock code={`import { Switch } from 'react-material-3-pure'

const [selected, setSelected] = useState(false);

<Switch
  selected={selected}
  onChange={() => setSelected(!selected)}
/>`} />
            </div>

            <div className="section">
                <h2 className="section-title">With Icons</h2>
                <div className="demo-area">
                    <Switch selected={s3} onChange={() => setS3(!s3)} icons />
                    <Switch selected={s4} onChange={() => setS4(!s4)} showOnlySelectedIcon />
                </div>
                <CodeBlock code={`<Switch icons selected={selected} onChange={...} />
<Switch showOnlySelectedIcon selected={selected} onChange={...} />`} />
            </div>

            <div className="section">
                <h2 className="section-title">Disabled</h2>
                <div className="demo-area">
                    <Switch disabled />
                    <Switch selected disabled />
                </div>
            </div>
        </div>
    );
}
