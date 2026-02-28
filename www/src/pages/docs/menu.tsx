import { useState, useRef } from 'react';
import { Menu, MenuItem, MenuDivider } from '@m3/components/Menu';
import { Button } from '@m3/components/Button';
import { CodeBlock, InstallBlock } from '@/components/code-block';

export function MenuPage() {
    const [open, setOpen] = useState(false);
    const [iconsOpen, setIconsOpen] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);
    const iconsAnchorRef = useRef<HTMLButtonElement>(null);

    const CutIcon = () => (
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.64 7.64c.23-.5.36-1.05.36-1.64 0-2.21-1.79-4-4-4S2 3.79 2 6s1.79 4 4 4c.59 0 1.14-.13 1.64-.36L10 12l-2.36 2.36C7.14 14.13 6.59 14 6 14c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4c0-.59-.13-1.14-.36-1.64L12 14l7 7h3v-1L9.64 7.64zM6 8c-1.1 0-2-.89-2-2s.9-2 2-2 2 .89 2 2-.9 2-2 2zm0 12c-1.1 0-2-.89-2-2s.9-2 2-2 2 .89 2 2-.9 2-2 2zm6-7.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zM19 3l-6 6 2 2 7-7V3h-3z" /></svg>
    );
    const CopyIcon = () => (
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" /></svg>
    );
    const PasteIcon = () => (
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 2h-4.18C14.4.84 13.3 0 12 0c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 18H5V4h2v3h10V4h2v16z" /></svg>
    );

    return (
        <div className="page">
            <div className="page-header">
                <h1 className="page-title">Menu</h1>
                <p className="page-description">
                    Menus display a list of choices on a temporary surface. They appear when users
                    interact with a button, action, or other control.
                </p>
            </div>

            <InstallBlock npm="npm install react-material-3-pure" cli="npx m3-pure add menu" />

            <div className="section">
                <h2 className="section-title">Basic</h2>
                <div className="demo-area">
                    <div style={{ position: 'relative' }}>
                        <Button ref={anchorRef as React.RefObject<HTMLButtonElement>} onClick={() => setOpen(!open)}>
                            Open Menu
                        </Button>
                        <Menu open={open} onClose={() => setOpen(false)} anchorEl={anchorRef.current}>
                            <MenuItem>Cut</MenuItem>
                            <MenuItem>Copy</MenuItem>
                            <MenuItem>Paste</MenuItem>
                        </Menu>
                    </div>
                </div>
                <CodeBlock code={`import { Menu, MenuItem } from 'react-material-3-pure'

const [open, setOpen] = useState(false);
const anchorRef = useRef(null);

<Button ref={anchorRef} onClick={() => setOpen(!open)}>Open</Button>
<Menu open={open} onClose={() => setOpen(false)} anchorEl={anchorRef.current}>
  <MenuItem>Cut</MenuItem>
  <MenuItem>Copy</MenuItem>
  <MenuItem>Paste</MenuItem>
</Menu>`} />
            </div>

            <div className="section">
                <h2 className="section-title">With Icons & Shortcuts</h2>
                <div className="demo-area">
                    <div style={{ position: 'relative' }}>
                        <Button ref={iconsAnchorRef as React.RefObject<HTMLButtonElement>} variant="outlined" onClick={() => setIconsOpen(!iconsOpen)}>
                            Edit
                        </Button>
                        <Menu open={iconsOpen} onClose={() => setIconsOpen(false)} anchorEl={iconsAnchorRef.current}>
                            <MenuItem leadingIcon={<CutIcon />} trailingText="Ctrl+X">Cut</MenuItem>
                            <MenuItem leadingIcon={<CopyIcon />} trailingText="Ctrl+C">Copy</MenuItem>
                            <MenuItem leadingIcon={<PasteIcon />} trailingText="Ctrl+V">Paste</MenuItem>
                            <MenuDivider />
                            <MenuItem disabled>Delete</MenuItem>
                        </Menu>
                    </div>
                </div>
                <CodeBlock code={`<MenuItem leadingIcon={<CutIcon />} trailingText="Ctrl+X">
  Cut
</MenuItem>
<MenuDivider />
<MenuItem disabled>Delete</MenuItem>`} />
            </div>
        </div>
    );
}
