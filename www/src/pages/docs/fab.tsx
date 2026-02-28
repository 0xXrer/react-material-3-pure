import { Fab } from '@m3/components/Fab';
import { CodeBlock, InstallBlock } from '@/components/code-block';

export function FabPage() {
    const AddIcon = () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" /></svg>
    );
    const EditIcon = () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" /></svg>
    );
    const NavigationIcon = () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" /></svg>
    );

    return (
        <div className="page">
            <div className="page-header">
                <h1 className="page-title">Fab</h1>
                <p className="page-description">
                    The FAB represents the most important action on a screen.
                    It puts key actions within reach. Surface, primary, secondary, and tertiary colors.
                </p>
            </div>

            <InstallBlock npm="npm install react-material-3-pure" cli="npx m3-pure add fab" />

            <div className="section">
                <h2 className="section-title">Variants</h2>
                <div className="demo-area">
                    <Fab variant="surface"><AddIcon /></Fab>
                    <Fab variant="primary"><AddIcon /></Fab>
                    <Fab variant="secondary"><AddIcon /></Fab>
                    <Fab variant="tertiary"><AddIcon /></Fab>
                </div>
                <CodeBlock code={`import { Fab } from 'react-material-3-pure'

<Fab variant="surface"><AddIcon /></Fab>
<Fab variant="primary"><AddIcon /></Fab>
<Fab variant="secondary"><AddIcon /></Fab>
<Fab variant="tertiary"><AddIcon /></Fab>`} />
            </div>

            <div className="section">
                <h2 className="section-title">Sizes</h2>
                <div className="demo-area" style={{ alignItems: 'flex-end' }}>
                    <Fab size="small"><EditIcon /></Fab>
                    <Fab size="medium"><EditIcon /></Fab>
                    <Fab size="large"><EditIcon /></Fab>
                </div>
                <CodeBlock code={`<Fab size="small"><EditIcon /></Fab>
<Fab size="medium"><EditIcon /></Fab>
<Fab size="large"><EditIcon /></Fab>`} />
            </div>

            <div className="section">
                <h2 className="section-title">Extended FAB</h2>
                <div className="demo-area">
                    <Fab label="Navigate"><NavigationIcon /></Fab>
                    <Fab label="Compose" variant="tertiary"><EditIcon /></Fab>
                </div>
                <CodeBlock code={`<Fab label="Navigate"><NavigationIcon /></Fab>
<Fab label="Compose" variant="tertiary"><EditIcon /></Fab>`} />
            </div>

            <div className="section">
                <h2 className="section-title">Without Icon (Extended only)</h2>
                <div className="demo-area">
                    <Fab label="Action" />
                </div>
                <CodeBlock code={`<Fab label="Action" />`} />
            </div>

            <div className="section">
                <h2 className="section-title">Lowered</h2>
                <div className="demo-area">
                    <Fab lowered><AddIcon /></Fab>
                    <Fab label="Edit" lowered><EditIcon /></Fab>
                </div>
            </div>
        </div>
    );
}
