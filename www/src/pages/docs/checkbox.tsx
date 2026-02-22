import { useState } from 'react';
import { Checkbox } from '@m3/components/Checkbox';
import { CodeBlock, InstallBlock } from '@/components/code-block';

export function CheckboxPage() {
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(true);
    const [indeterminate, setIndeterminate] = useState(true);

    return (
        <div className="page">
            <div className="page-header">
                <h1 className="page-title">Checkbox</h1>
                <p className="page-description">
                    Checkboxes let users select one or more items from a list, or turn an item on or off.
                    Supports checked, unchecked, and indeterminate states.
                </p>
            </div>

            <InstallBlock npm="npm install react-material-3-pure" cli="npx m3-pure add checkbox" />

            <div className="section">
                <h2 className="section-title">States</h2>
                <div className="demo-area">
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', color: 'var(--md-sys-color-on-surface)' }}>
                        <Checkbox
                            checked={checked1}
                            onChange={() => setChecked1(!checked1)}
                        />
                        Unchecked
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', color: 'var(--md-sys-color-on-surface)' }}>
                        <Checkbox
                            checked={checked2}
                            onChange={() => setChecked2(!checked2)}
                        />
                        Checked
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', color: 'var(--md-sys-color-on-surface)' }}>
                        <Checkbox
                            checked={true}
                            indeterminate={indeterminate}
                            onChange={() => setIndeterminate(!indeterminate)}
                        />
                        Indeterminate
                    </label>
                </div>
                <CodeBlock code={`import { Checkbox } from 'react-material-3-pure'

const [checked, setChecked] = useState(false);

<Checkbox
  checked={checked}
  onChange={() => setChecked(!checked)}
/>`} />
            </div>

            <div className="section">
                <h2 className="section-title">Disabled</h2>
                <div className="demo-area">
                    <Checkbox disabled />
                    <Checkbox checked disabled />
                    <Checkbox checked indeterminate disabled />
                </div>
            </div>
        </div>
    );
}
