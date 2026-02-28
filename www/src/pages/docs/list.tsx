import { List, ListItem, ListDivider } from '@m3/components/List';
import { CodeBlock, InstallBlock } from '@/components/code-block';

export function ListPage() {
    const InboxIcon = () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H4.99c-1.11 0-1.98.89-1.98 2L3 19c0 1.1.88 2 1.99 2H19c1.1 0 2-.9 2-2V5c0-1.11-.9-2-2-2zm0 12h-4c0 1.66-1.35 3-3 3s-3-1.34-3-3H4.99V5H19v10z" /></svg>
    );
    const DraftsIcon = () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M21.99 8c0-.72-.37-1.35-.94-1.7L12 1 2.95 6.3C2.38 6.65 2 7.28 2 8v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2l-.01-10zM12 13 3.74 7.84 12 3l8.26 4.84L12 13z" /></svg>
    );
    const SendIcon = () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
    );

    return (
        <div className="page">
            <div className="page-header">
                <h1 className="page-title">List</h1>
                <p className="page-description">
                    Lists are continuous, vertical indexes of text and images.
                    They can be interactive (clickable) or static.
                </p>
            </div>

            <InstallBlock npm="npm install react-material-3-pure" cli="npx m3-pure add list" />

            <div className="section">
                <h2 className="section-title">Basic</h2>
                <div className="demo-area demo-area-col" style={{ maxWidth: 360, padding: 0 }}>
                    <List>
                        <ListItem headline="Inbox" />
                        <ListItem headline="Drafts" />
                        <ListItem headline="Sent" />
                        <ListItem headline="Trash" />
                    </List>
                </div>
                <CodeBlock code={`import { List, ListItem } from 'react-material-3-pure'

<List>
  <ListItem headline="Inbox" />
  <ListItem headline="Drafts" />
  <ListItem headline="Sent" />
</List>`} />
            </div>

            <div className="section">
                <h2 className="section-title">With Icons</h2>
                <div className="demo-area demo-area-col" style={{ maxWidth: 360, padding: 0 }}>
                    <List>
                        <ListItem headline="Inbox" leadingIcon={<InboxIcon />} trailingSupportingText="24" />
                        <ListItem headline="Drafts" leadingIcon={<DraftsIcon />} trailingSupportingText="3" />
                        <ListItem headline="Sent" leadingIcon={<SendIcon />} />
                    </List>
                </div>
                <CodeBlock code={`<ListItem
  headline="Inbox"
  leadingIcon={<InboxIcon />}
  trailingSupportingText="24"
/>`} />
            </div>

            <div className="section">
                <h2 className="section-title">Two-Line</h2>
                <div className="demo-area demo-area-col" style={{ maxWidth: 400, padding: 0 }}>
                    <List>
                        <ListItem
                            headline="Photos"
                            supportingText="Jan 9, 2026"
                            leadingIcon={<InboxIcon />}
                        />
                        <ListDivider />
                        <ListItem
                            headline="Vacation"
                            supportingText="Summer trip to the mountains with the family"
                            leadingIcon={<DraftsIcon />}
                        />
                    </List>
                </div>
            </div>

            <div className="section">
                <h2 className="section-title">Disabled</h2>
                <div className="demo-area demo-area-col" style={{ maxWidth: 360, padding: 0 }}>
                    <List>
                        <ListItem headline="Active" />
                        <ListItem headline="Disabled" disabled />
                    </List>
                </div>
            </div>
        </div>
    );
}
