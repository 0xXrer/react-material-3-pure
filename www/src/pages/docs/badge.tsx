import { useState } from 'react';
import { Badge } from '@m3/components/Badge';
import { IconButton } from '@m3/components/IconButton';
import { Icon } from '@m3/components/Icon';
import { CodeBlock, InstallBlock } from '@/components/code-block';

export function BadgePage() {
    const [count, setCount] = useState(3);

    return (
        <div className="page">
            <div className="page-header">
                <h1 className="page-title">Badge</h1>
                <p className="page-description">
                    Badges convey dynamic information, such as a count or status. A badge can include a number or other short text.
                </p>
            </div>

            <InstallBlock npm="npm install react-material-3-pure" cli="npx m3-pure add badge" />

            <div className="section">
                <h2 className="section-title">Small Badge (Dot)</h2>
                <div className="demo-area">
                    <Badge size="small">
                        <IconButton>
                            <Icon name="notifications" />
                        </IconButton>
                    </Badge>
                    <Badge size="small">
                        <IconButton>
                            <Icon name="mail" />
                        </IconButton>
                    </Badge>
                </div>
                <CodeBlock code={`<Badge size="small">
  <IconButton>
    <Icon name="notifications" />
  </IconButton>
</Badge>`} />
            </div>

            <div className="section">
                <h2 className="section-title">Large Badge (with value)</h2>
                <div className="demo-area">
                    <Badge value={count}>
                        <IconButton onClick={() => setCount((c) => c + 1)}>
                            <Icon name="notifications" />
                        </IconButton>
                    </Badge>
                    <Badge value={99}>
                        <IconButton>
                            <Icon name="mail" />
                        </IconButton>
                    </Badge>
                    <Badge value={1234} max={999}>
                        <IconButton>
                            <Icon name="chat" />
                        </IconButton>
                    </Badge>
                </div>
                <CodeBlock code={`<Badge value={3}>
  <IconButton><Icon name="notifications" /></IconButton>
</Badge>

<Badge value={1234} max={999}>
  <IconButton><Icon name="chat" /></IconButton>
</Badge>`} />
            </div>

            <div className="section">
                <h2 className="section-title">Visibility</h2>
                <div className="demo-area">
                    <Badge value={5} visible={count % 2 === 0}>
                        <IconButton onClick={() => setCount((c) => c + 1)}>
                            <Icon name="notifications" />
                        </IconButton>
                    </Badge>
                    <span style={{ fontSize: 13, color: 'var(--md-sys-color-on-surface-variant)' }}>
                        Click to toggle (count: {count})
                    </span>
                </div>
                <CodeBlock code={`<Badge value={5} visible={show}>
  <IconButton><Icon name="notifications" /></IconButton>
</Badge>`} />
            </div>
        </div>
    );
}
