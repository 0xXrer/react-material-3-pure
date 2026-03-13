import type { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';
import { Dialog } from './Dialog';
import type { DialogRef } from './Dialog';
import { Button } from '../Button';

/**
 * Material Design 3 Dialog Component
 *
 * Dialogs can require an action, communicate information, or help users accomplish a task.
 */
const meta = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    open: { control: 'boolean' },
    quick: { control: 'boolean' },
    type: { control: 'select', options: [undefined, 'alert'] },
    headline: { control: 'text' },
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ==========================================================================
   ICONS
   ========================================================================== */

const DeleteIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
  </svg>
);

const InfoIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
  </svg>
);

/* ==========================================================================
   BASIC DIALOG
   ========================================================================== */

export const Basic: Story = {
  render: function BasicDialog() {
    const [isOpen, setIsOpen] = useState(false);
    const dialogRef = useRef<DialogRef>(null);

    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>
          Open Dialog
        </Button>

        <Dialog
          ref={dialogRef}
          open={isOpen}
          headline="Basic Dialog"
          onClose={() => {
            setIsOpen(false);
            return true;
          }}
          onCancel={() => {
            setIsOpen(false);
            return true;
          }}
          actions={
            <>
              <Button variant="text" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsOpen(false)}>
                Confirm
              </Button>
            </>
          }
        >
          <p>
            This is the content of the dialog. Dialogs can contain text,
            forms, or other interactive elements.
          </p>
        </Dialog>
      </div>
    );
  },
};

/* ==========================================================================
   ALERT DIALOG
   ========================================================================== */

export const Alert: Story = {
  render: function AlertDialog() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <Button variant="tonal" onClick={() => setIsOpen(true)}>
          <DeleteIcon />
          Delete Item
        </Button>

        <Dialog
          open={isOpen}
          type="alert"
          headline="Permanently delete?"
          icon={<DeleteIcon />}
          onClose={() => {
            setIsOpen(false);
            return true;
          }}
          onCancel={() => {
            setIsOpen(false);
            return true;
          }}
          actions={
            <>
              <Button variant="text" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => {
                console.log('Item deleted');
                setIsOpen(false);
              }}>
                Delete
              </Button>
            </>
          }
        >
          <p>
            Deleting this item will remove it permanently. This action cannot be undone.
          </p>
        </Dialog>
      </div>
    );
  },
};

/* ==========================================================================
   WITH ICON
   ========================================================================== */

export const WithIcon: Story = {
  render: function IconDialog() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <Button variant="outlined" onClick={() => setIsOpen(true)}>
          <InfoIcon />
          Show Info
        </Button>

        <Dialog
          open={isOpen}
          headline="Information"
          icon={<InfoIcon />}
          onClose={() => {
            setIsOpen(false);
            return true;
          }}
          onCancel={() => {
            setIsOpen(false);
            return true;
          }}
          actions={
            <Button onClick={() => setIsOpen(false)}>
              Got it
            </Button>
          }
        >
          <p>
            This dialog has an icon at the top for visual emphasis.
            Icons help users quickly identify the type of dialog.
          </p>
        </Dialog>
      </div>
    );
  },
};

/* ==========================================================================
   SCROLLABLE CONTENT
   ========================================================================== */

export const Scrollable: Story = {
  render: function ScrollableDialog() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <Button variant="elevated" onClick={() => setIsOpen(true)}>
          Show Terms
        </Button>

        <Dialog
          open={isOpen}
          headline="Terms of Service"
          onClose={() => {
            setIsOpen(false);
            return true;
          }}
          onCancel={() => {
            setIsOpen(false);
            return true;
          }}
          actions={
            <>
              <Button variant="text" onClick={() => setIsOpen(false)}>
                Decline
              </Button>
              <Button onClick={() => setIsOpen(false)}>
                Accept
              </Button>
            </>
          }
        >
          <div style={{ maxHeight: '300px' }}>
            <h3 style={{ margin: '0 0 16px', fontSize: '16px' }}>1. Introduction</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris.
            </p>
            
            <h3 style={{ margin: '16px 0', fontSize: '16px' }}>2. User Agreement</h3>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
              dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
              proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            
            <h3 style={{ margin: '16px 0', fontSize: '16px' }}>3. Privacy Policy</h3>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
              doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
              veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
            
            <h3 style={{ margin: '16px 0', fontSize: '16px' }}>4. Data Collection</h3>
            <p>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,
              sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
            </p>
            
            <h3 style={{ margin: '16px 0', fontSize: '16px' }}>5. Contact</h3>
            <p>
              Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,
              adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et
              dolore magnam aliquam quaerat voluptatem.
            </p>
          </div>
        </Dialog>
      </div>
    );
  },
};

/* ==========================================================================
   WITH FORM
   ========================================================================== */

export const WithForm: Story = {
  render: function FormDialog() {
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState('');

    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>
          Subscribe
        </Button>

        <Dialog
          open={isOpen}
          headline="Subscribe to Newsletter"
          onClose={() => {
            setIsOpen(false);
            return true;
          }}
          onCancel={() => {
            setIsOpen(false);
            return true;
          }}
          actions={
            <>
              <Button variant="text" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button 
                disabled={!email}
                onClick={() => {
                  console.log('Subscribed:', email);
                  setIsOpen(false);
                }}
              >
                Subscribe
              </Button>
            </>
          }
        >
          <div>
            <p style={{ marginBottom: '16px' }}>
              Enter your email to receive updates:
            </p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '4px',
                border: '1px solid var(--md-sys-color-outline, #79747e)',
                fontSize: '16px',
                boxSizing: 'border-box',
              }}
            />
          </div>
        </Dialog>
      </div>
    );
  },
};

/* ==========================================================================
   QUICK (NO ANIMATION)
   ========================================================================== */

export const Quick: Story = {
  render: function QuickDialog() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <Button variant="text" onClick={() => setIsOpen(true)}>
          Quick Dialog
        </Button>

        <Dialog
          open={isOpen}
          quick
          headline="No Animation"
          onClose={() => {
            setIsOpen(false);
            return true;
          }}
          onCancel={() => {
            setIsOpen(false);
            return true;
          }}
          actions={
            <Button onClick={() => setIsOpen(false)}>
              Close
            </Button>
          }
        >
          <p>This dialog opens and closes immediately without animation.</p>
        </Dialog>
      </div>
    );
  },
};

/* ==========================================================================
   ALL BUTTON VARIANTS IN DIALOG
   ========================================================================== */

export const ButtonVariants: Story = {
  render: function ButtonVariantsDialog() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>
          Show Button Variants
        </Button>

        <Dialog
          open={isOpen}
          headline="Button Variants"
          onClose={() => {
            setIsOpen(false);
            return true;
          }}
          onCancel={() => {
            setIsOpen(false);
            return true;
          }}
          actions={
            <>
              <Button variant="text" onClick={() => setIsOpen(false)}>
                Text
              </Button>
              <Button variant="outlined" onClick={() => setIsOpen(false)}>
                Outlined
              </Button>
              <Button variant="tonal" onClick={() => setIsOpen(false)}>
                Tonal
              </Button>
              <Button onClick={() => setIsOpen(false)}>
                Filled
              </Button>
            </>
          }
        >
          <p>
            Dialog actions can use different button variants based on emphasis.
            Typically use Text for secondary and Filled for primary actions.
          </p>
        </Dialog>
      </div>
    );
  },
};
