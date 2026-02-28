import { useState } from 'react';
import { Select, SelectOption } from '@m3/components/Select';
import { CodeBlock, InstallBlock } from '@/components/code-block';

export function SelectPage() {
    const [value, setValue] = useState('apple');

    return (
        <div className="page">
            <div className="page-header">
                <h1 className="page-title">Select</h1>
                <p className="page-description">
                    Select menus display a list of choices on temporary surfaces and display the
                    currently selected menu item above the menu. Filled and outlined variants.
                </p>
            </div>

            <InstallBlock npm="npm install react-material-3-pure" cli="npx m3-pure add select" />

            <div className="section">
                <h2 className="section-title">Filled</h2>
                <div className="demo-area">
                    <Select label="Fruit" variant="filled" value={value} onChange={setValue}>
                        <SelectOption value="apple">Apple</SelectOption>
                        <SelectOption value="banana">Banana</SelectOption>
                        <SelectOption value="cherry">Cherry</SelectOption>
                        <SelectOption value="grape">Grape</SelectOption>
                    </Select>
                </div>
                <CodeBlock code={`import { Select, SelectOption } from 'react-material-3-pure'

<Select label="Fruit" variant="filled" value={value} onChange={setValue}>
  <SelectOption value="apple">Apple</SelectOption>
  <SelectOption value="banana">Banana</SelectOption>
  <SelectOption value="cherry">Cherry</SelectOption>
</Select>`} />
            </div>

            <div className="section">
                <h2 className="section-title">Outlined</h2>
                <div className="demo-area">
                    <Select label="Country" variant="outlined" defaultValue="us">
                        <SelectOption value="us">United States</SelectOption>
                        <SelectOption value="uk">United Kingdom</SelectOption>
                        <SelectOption value="de">Germany</SelectOption>
                        <SelectOption value="jp">Japan</SelectOption>
                    </Select>
                </div>
            </div>

            <div className="section">
                <h2 className="section-title">Error State</h2>
                <div className="demo-area">
                    <Select label="Required" variant="filled" error errorText="Please select a value" required>
                        <SelectOption value="a">Option A</SelectOption>
                        <SelectOption value="b">Option B</SelectOption>
                    </Select>
                </div>
            </div>

            <div className="section">
                <h2 className="section-title">Disabled</h2>
                <div className="demo-area">
                    <Select label="Disabled" variant="filled" disabled defaultValue="val">
                        <SelectOption value="val">Selected</SelectOption>
                    </Select>
                    <Select label="Disabled" variant="outlined" disabled defaultValue="val">
                        <SelectOption value="val">Selected</SelectOption>
                    </Select>
                </div>
            </div>
        </div>
    );
}
