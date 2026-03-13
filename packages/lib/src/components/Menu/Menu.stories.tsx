import type { Meta, StoryObj } from '@storybook/react';
import { useState, useRef } from 'react';
import { Menu, MenuItem, MenuDivider } from './Menu';
import { Button } from '../Button';

const meta: Meta<typeof Menu> = {
  title: 'Components/Menu',
  component: Menu,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Menu>;

const CutIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.64 7.64c.23-.5.36-1.05.36-1.64 0-2.21-1.79-4-4-4S2 3.79 2 6s1.79 4 4 4c.59 0 1.14-.13 1.64-.36L10 12l-2.36 2.36C7.14 14.13 6.59 14 6 14c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4c0-.59-.13-1.14-.36-1.64L12 14l7 7h3v-1L9.64 7.64zM6 8c-1.1 0-2-.89-2-2s.9-2 2-2 2 .89 2 2-.9 2-2 2zm0 12c-1.1 0-2-.89-2-2s.9-2 2-2 2 .89 2 2-.9 2-2 2zm6-7.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zM19 3l-6 6 2 2 7-7V3h-3z" /></svg>
);

const CopyIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" /></svg>
);

const PasteIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 2h-4.18C14.4.84 13.3 0 12 0c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 18H5V4h2v3h10V4h2v16z" /></svg>
);

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);
    return (
      <div style={{ position: 'relative' }}>
        <Button ref={anchorRef as React.RefObject<HTMLButtonElement>} onClick={() => setOpen(!open)}>
          Open Menu
        </Button>
        <Menu open={open} onClose={() => setOpen(false)} anchorEl={anchorRef.current}>
          <MenuItem onClick={() => console.log('Cut')}>Cut</MenuItem>
          <MenuItem onClick={() => console.log('Copy')}>Copy</MenuItem>
          <MenuItem onClick={() => console.log('Paste')}>Paste</MenuItem>
        </Menu>
      </div>
    );
  },
};

export const WithIcons: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);
    return (
      <div style={{ position: 'relative' }}>
        <Button ref={anchorRef as React.RefObject<HTMLButtonElement>} onClick={() => setOpen(!open)}>
          Edit
        </Button>
        <Menu open={open} onClose={() => setOpen(false)} anchorEl={anchorRef.current}>
          <MenuItem leadingIcon={<CutIcon />} trailingText="Ctrl+X">Cut</MenuItem>
          <MenuItem leadingIcon={<CopyIcon />} trailingText="Ctrl+C">Copy</MenuItem>
          <MenuItem leadingIcon={<PasteIcon />} trailingText="Ctrl+V">Paste</MenuItem>
          <MenuDivider />
          <MenuItem disabled>Delete</MenuItem>
        </Menu>
      </div>
    );
  },
};

export const WithSelection: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState('option1');
    const anchorRef = useRef<HTMLButtonElement>(null);
    return (
      <div style={{ position: 'relative' }}>
        <Button ref={anchorRef as React.RefObject<HTMLButtonElement>} onClick={() => setOpen(!open)}>
          Sort By
        </Button>
        <Menu open={open} onClose={() => setOpen(false)} anchorEl={anchorRef.current}>
          <MenuItem selected={selected === 'option1'} onClick={() => setSelected('option1')}>Name</MenuItem>
          <MenuItem selected={selected === 'option2'} onClick={() => setSelected('option2')}>Date</MenuItem>
          <MenuItem selected={selected === 'option3'} onClick={() => setSelected('option3')}>Size</MenuItem>
        </Menu>
      </div>
    );
  },
};
