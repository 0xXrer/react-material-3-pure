import { useState } from 'react';
import { Button } from '@m3/components/Button';
import { CodeBlock, InstallBlock } from '@/components/code-block';

export function ButtonPage() {
    return (
        <div className="page">
            <div className="page-header">
                <h1 className="page-title">Button</h1>
                <p className="page-description">
                    Buttons help people take actions, such as sending an email, sharing a document, or liking a comment.
                    M3 provides 5 types of common buttons.
                </p>
            </div>

            <InstallBlock npm="npm install react-material-3-pure" cli="npx m3-pure add button" />

            <div className="section">
                <h2 className="section-title">Variants</h2>
                <div className="demo-area">
                    <Button variant="filled">Filled</Button>
                    <Button variant="outlined">Outlined</Button>
                    <Button variant="text">Text</Button>
                    <Button variant="elevated">Elevated</Button>
                    <Button variant="tonal">Tonal</Button>
                </div>
                <CodeBlock code={`import { Button } from 'react-material-3-pure'

<Button variant="filled">Filled</Button>
<Button variant="outlined">Outlined</Button>
<Button variant="text">Text</Button>
<Button variant="elevated">Elevated</Button>
<Button variant="tonal">Tonal</Button>`} />
            </div>

            <div className="section">
                <h2 className="section-title">Sizes</h2>
                <div className="demo-area">
                    <Button variant="filled" size="sm">Small</Button>
                    <Button variant="filled" size="md">Medium</Button>
                    <Button variant="filled" size="lg">Large</Button>
                </div>
                <CodeBlock code={`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`} />
            </div>

            <div className="section">
                <h2 className="section-title">Disabled</h2>
                <div className="demo-area">
                    <Button variant="filled" disabled>Filled</Button>
                    <Button variant="outlined" disabled>Outlined</Button>
                    <Button variant="tonal" disabled>Tonal</Button>
                </div>
            </div>

            <div className="section">
                <h2 className="section-title">As Link</h2>
                <div className="demo-area">
                    <Button variant="text" as="a" href="#">
                        Link Button
                    </Button>
                </div>
                <CodeBlock code={`<Button variant="text" as="a" href="/about">
  Link Button
</Button>`} />
            </div>
        </div>
    );
}
