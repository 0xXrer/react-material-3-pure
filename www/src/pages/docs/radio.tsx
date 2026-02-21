import { useState } from 'react';
import { Radio } from '@m3/components/Radio';
import { CodeBlock, InstallCmd } from '@/components/code-block';

export function RadioPage() {
    const [value, setValue] = useState('a');

    return (
        <div className="page">
            <div className="page-header">
                <h1 className="page-title">Radio</h1>
                <p className="page-description">
                    Radio buttons allow users to select one option from a set of mutually exclusive choices.
                </p>
            </div>

            <InstallCmd cmd="npx m3-pure add radio" />

            <div className="section">
                <h2 className="section-title">Radio Group</h2>
                <div className="demo-area demo-area-col">
                    {['a', 'b', 'c'].map((v) => (
                        <label key={v} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                            cursor: 'pointer',
                            color: 'var(--md-sys-color-on-surface)',
                            fontSize: 14,
                        }}>
                            <Radio
                                name="demo-radio"
                                value={v}
                                checked={value === v}
                                onChange={() => setValue(v)}
                            />
                            Option {v.toUpperCase()}
                        </label>
                    ))}
                </div>
                <CodeBlock code={`import { Radio } from '@/components/ui/Radio';

const [value, setValue] = useState('a');

<Radio
  name="group"
  value="a"
  checked={value === 'a'}
  onChange={() => setValue('a')}
/>`} />
            </div>

            <div className="section">
                <h2 className="section-title">Disabled</h2>
                <div className="demo-area">
                    <Radio disabled />
                    <Radio checked disabled />
                </div>
            </div>
        </div>
    );
}
