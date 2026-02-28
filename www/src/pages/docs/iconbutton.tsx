import { useState } from 'react';
import { IconButton } from '@m3/components/IconButton';
import { CodeBlock, InstallBlock } from '@/components/code-block';

export function IconButtonPage() {
    const [toggled, setToggled] = useState(false);

    const FavoriteIcon = () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="m12 21.35-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
    );
    const ShareIcon = () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" /></svg>
    );
    const SettingsIcon = () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.48.48 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.49.49 0 0 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" /></svg>
    );

    return (
        <div className="page">
            <div className="page-header">
                <h1 className="page-title">IconButton</h1>
                <p className="page-description">
                    Icon buttons help people take supplementary actions with a single tap.
                    Standard, filled, tonal, and outlined variants.
                </p>
            </div>

            <InstallBlock npm="npm install react-material-3-pure" cli="npx m3-pure add icon-button" />

            <div className="section">
                <h2 className="section-title">Variants</h2>
                <div className="demo-area">
                    <IconButton variant="standard"><FavoriteIcon /></IconButton>
                    <IconButton variant="filled"><FavoriteIcon /></IconButton>
                    <IconButton variant="tonal"><FavoriteIcon /></IconButton>
                    <IconButton variant="outlined"><FavoriteIcon /></IconButton>
                </div>
                <CodeBlock code={`import { IconButton } from 'react-material-3-pure'

<IconButton variant="standard"><HeartIcon /></IconButton>
<IconButton variant="filled"><HeartIcon /></IconButton>
<IconButton variant="tonal"><HeartIcon /></IconButton>
<IconButton variant="outlined"><HeartIcon /></IconButton>`} />
            </div>

            <div className="section">
                <h2 className="section-title">Toggle</h2>
                <div className="demo-area">
                    <IconButton
                        variant="standard"
                        toggle
                        selected={toggled}
                        onClick={() => setToggled(!toggled)}
                    >
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton variant="filled" toggle selected><ShareIcon /></IconButton>
                    <IconButton variant="tonal" toggle><SettingsIcon /></IconButton>
                </div>
                <CodeBlock code={`const [selected, setSelected] = useState(false);

<IconButton
  toggle
  selected={selected}
  onClick={() => setSelected(!selected)}
>
  <HeartIcon />
</IconButton>`} />
            </div>

            <div className="section">
                <h2 className="section-title">Disabled</h2>
                <div className="demo-area">
                    <IconButton variant="standard" disabled><FavoriteIcon /></IconButton>
                    <IconButton variant="filled" disabled><FavoriteIcon /></IconButton>
                    <IconButton variant="tonal" disabled><FavoriteIcon /></IconButton>
                    <IconButton variant="outlined" disabled><FavoriteIcon /></IconButton>
                </div>
            </div>
        </div>
    );
}
