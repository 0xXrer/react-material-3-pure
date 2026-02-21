import { useState } from 'react';
import { TextField } from '@m3/components/TextField';
import { CodeBlock, InstallCmd } from '@/components/code-block';

export function TextFieldPage() {
    const [value, setValue] = useState('');
    const [error, setError] = useState(false);

    return (
        <div className="page">
            <div className="page-header">
                <h1 className="page-title">TextField</h1>
                <p className="page-description">
                    Text fields let users enter and edit text. They come in two variants: filled and outlined.
                </p>
            </div>

            <InstallCmd cmd="npx m3-pure add textfield" />

            <div className="section">
                <h2 className="section-title">Variants</h2>
                <div className="demo-area demo-area-col" style={{ gap: 20 }}>
                    <TextField label="Filled" variant="filled" style={{ width: 280 }} />
                    <TextField label="Outlined" variant="outlined" style={{ width: 280 }} />
                </div>
                <CodeBlock code={`import { TextField } from '@/components/ui/TextField';

<TextField label="Filled" variant="filled" />
<TextField label="Outlined" variant="outlined" />`} />
            </div>

            <div className="section">
                <h2 className="section-title">Supporting Text</h2>
                <div className="demo-area demo-area-col" style={{ gap: 20 }}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        type="email"
                        supportingText="Enter your email address"
                        style={{ width: 320 }}
                    />
                </div>
            </div>

            <div className="section">
                <h2 className="section-title">Error State</h2>
                <div className="demo-area demo-area-col" style={{ gap: 20 }}>
                    <TextField
                        label="Password"
                        variant="filled"
                        type="password"
                        error
                        errorText="Password must be at least 8 characters"
                        style={{ width: 320 }}
                    />
                </div>
                <CodeBlock code={`<TextField
  label="Password"
  type="password"
  error
  errorText="Password must be at least 8 characters"
/>`} />
            </div>

            <div className="section">
                <h2 className="section-title">Prefix & Suffix</h2>
                <div className="demo-area demo-area-col" style={{ gap: 20 }}>
                    <TextField
                        label="Price"
                        variant="outlined"
                        prefixText="$"
                        type="number"
                        style={{ width: 200 }}
                    />
                    <TextField
                        label="Weight"
                        variant="outlined"
                        suffixText="kg"
                        type="number"
                        style={{ width: 200 }}
                    />
                </div>
            </div>

            <div className="section">
                <h2 className="section-title">Disabled</h2>
                <div className="demo-area demo-area-col" style={{ gap: 20 }}>
                    <TextField label="Disabled Filled" disabled style={{ width: 280 }} />
                    <TextField label="Disabled Outlined" variant="outlined" disabled style={{ width: 280 }} />
                </div>
            </div>
        </div>
    );
}
