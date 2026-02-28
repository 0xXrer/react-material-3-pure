import { useState } from 'react';
import { Slider, RangeSlider } from '@m3/components/Slider';
import { CodeBlock, InstallBlock } from '@/components/code-block';

export function SliderPage() {
    const [value, setValue] = useState(50);

    return (
        <div className="page">
            <div className="page-header">
                <h1 className="page-title">Slider</h1>
                <p className="page-description">
                    Sliders allow users to make selections from a range of values.
                    Supports single value, range, labels, and tick marks.
                </p>
            </div>

            <InstallBlock npm="npm install react-material-3-pure" cli="npx m3-pure add slider" />

            <div className="section">
                <h2 className="section-title">Basic</h2>
                <div className="demo-area demo-area-col">
                    <div style={{ width: '100%', maxWidth: 400 }}>
                        <Slider value={value} onChange={setValue} onInput={setValue} />
                    </div>
                    <span style={{ fontSize: 13, color: 'var(--md-sys-color-on-surface-variant)' }}>
                        Value: {value}
                    </span>
                </div>
                <CodeBlock code={`import { Slider } from 'react-material-3-pure'

const [value, setValue] = useState(50);

<Slider value={value} onChange={setValue} onInput={setValue} />`} />
            </div>

            <div className="section">
                <h2 className="section-title">With Label</h2>
                <div className="demo-area" style={{ paddingTop: 48 }}>
                    <div style={{ width: '100%', maxWidth: 400 }}>
                        <Slider defaultValue={40} labeled />
                    </div>
                </div>
                <CodeBlock code={`<Slider defaultValue={40} labeled />`} />
            </div>

            <div className="section">
                <h2 className="section-title">With Tick Marks</h2>
                <div className="demo-area">
                    <div style={{ width: '100%', maxWidth: 400 }}>
                        <Slider defaultValue={50} step={25} ticks labeled />
                    </div>
                </div>
                <CodeBlock code={`<Slider defaultValue={50} step={25} ticks labeled />`} />
            </div>

            <div className="section">
                <h2 className="section-title">Range Slider</h2>
                <div className="demo-area" style={{ paddingTop: 48 }}>
                    <div style={{ width: '100%', maxWidth: 400 }}>
                        <RangeSlider defaultValueStart={25} defaultValueEnd={75} labeled />
                    </div>
                </div>
                <CodeBlock code={`import { RangeSlider } from 'react-material-3-pure'

<RangeSlider defaultValueStart={25} defaultValueEnd={75} labeled />`} />
            </div>

            <div className="section">
                <h2 className="section-title">Disabled</h2>
                <div className="demo-area">
                    <div style={{ width: '100%', maxWidth: 400 }}>
                        <Slider defaultValue={30} disabled />
                    </div>
                </div>
            </div>
        </div>
    );
}
