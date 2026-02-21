import { useState, useRef } from 'react';
import { Dialog } from '@m3/components/Dialog';
import type { DialogRef } from '@m3/components/Dialog';
import { Button } from '@m3/components/Button';
import { CodeBlock, InstallCmd } from '@/components/code-block';

export function DialogPage() {
    const [open, setOpen] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);

    return (
        <div className="page">
            <div className="page-header">
                <h1 className="page-title">Dialog</h1>
                <p className="page-description">
                    Dialogs provide important prompts in a user flow. They can require an action,
                    communicate information, or help users accomplish a task.
                </p>
            </div>

            <InstallCmd cmd="npx m3-pure add dialog" />

            <div className="section">
                <h2 className="section-title">Basic Dialog</h2>
                <div className="demo-area">
                    <Button variant="filled" onClick={() => setOpen(true)}>
                        Open Dialog
                    </Button>
                </div>
                <Dialog
                    open={open}
                    headline="Dialog Title"
                    onClose={() => { setOpen(false); }}
                    onCancel={() => { setOpen(false); }}
                    actions={
                        <>
                            <Button variant="text" onClick={() => setOpen(false)}>Cancel</Button>
                            <Button variant="text" onClick={() => setOpen(false)}>Confirm</Button>
                        </>
                    }
                >
                    <p style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>
                        This is a basic dialog with a headline, content area, and action buttons.
                        Click outside or press Escape to close.
                    </p>
                </Dialog>
                <CodeBlock code={`import { Dialog } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';

const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open</Button>

<Dialog
  open={open}
  headline="Dialog Title"
  onClose={() => setOpen(false)}
  onCancel={() => setOpen(false)}
  actions={
    <>
      <Button variant="text" onClick={() => setOpen(false)}>
        Cancel
      </Button>
      <Button variant="text" onClick={() => setOpen(false)}>
        Confirm
      </Button>
    </>
  }
>
  <p>Dialog content here.</p>
</Dialog>`} />
            </div>

            <div className="section">
                <h2 className="section-title">Alert Dialog</h2>
                <div className="demo-area">
                    <Button variant="outlined" onClick={() => setAlertOpen(true)}>
                        Show Alert
                    </Button>
                </div>
                <Dialog
                    open={alertOpen}
                    type="alert"
                    headline="Discard draft?"
                    onClose={() => setAlertOpen(false)}
                    onCancel={() => setAlertOpen(false)}
                    actions={
                        <>
                            <Button variant="text" onClick={() => setAlertOpen(false)}>Cancel</Button>
                            <Button variant="text" onClick={() => setAlertOpen(false)}>Discard</Button>
                        </>
                    }
                >
                    <p style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>
                        Your draft will be permanently deleted. This action cannot be undone.
                    </p>
                </Dialog>
            </div>
        </div>
    );
}
