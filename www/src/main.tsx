import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@m3/components/ThemeProvider';
import { App } from './app';
import { Home } from './pages/home';
import { ButtonPage } from './pages/docs/button';
import { CheckboxPage } from './pages/docs/checkbox';
import { ChipPage } from './pages/docs/chip';
import { DialogPage } from './pages/docs/dialog';
import { DividerPage } from './pages/docs/divider';
import { RadioPage } from './pages/docs/radio';
import { SwitchPage } from './pages/docs/switch';
import { TextFieldPage } from './pages/docs/textfield';
import { ThemePage } from './pages/docs/theme';
import './app.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider defaultMode="dark">
            <BrowserRouter>
                <Routes>
                    <Route element={<App />}>
                        <Route index element={<Home />} />
                        <Route path="/docs/button" element={<ButtonPage />} />
                        <Route path="/docs/checkbox" element={<CheckboxPage />} />
                        <Route path="/docs/chip" element={<ChipPage />} />
                        <Route path="/docs/dialog" element={<DialogPage />} />
                        <Route path="/docs/divider" element={<DividerPage />} />
                        <Route path="/docs/radio" element={<RadioPage />} />
                        <Route path="/docs/switch" element={<SwitchPage />} />
                        <Route path="/docs/textfield" element={<TextFieldPage />} />
                        <Route path="/docs/theme" element={<ThemePage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    </StrictMode>
);
