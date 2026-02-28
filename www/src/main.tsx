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
import { FabPage } from './pages/docs/fab';
import { IconPage } from './pages/docs/icon';
import { IconButtonPage } from './pages/docs/iconbutton';
import { ListPage } from './pages/docs/list';
import { MenuPage } from './pages/docs/menu';
import { ProgressPage } from './pages/docs/progress';
import { RadioPage } from './pages/docs/radio';
import { SelectPage } from './pages/docs/select';
import { SliderPage } from './pages/docs/slider';
import { SwitchPage } from './pages/docs/switch';
import { TabsPage } from './pages/docs/tabs';
import { TextFieldPage } from './pages/docs/textfield';
import { ThemePage } from './pages/docs/theme';
import { InstallPage } from './pages/docs/install';
import { ChangelogPage } from './pages/docs/changelog';
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
                        <Route path="/docs/fab" element={<FabPage />} />
                        <Route path="/docs/icon" element={<IconPage />} />
                        <Route path="/docs/icon-button" element={<IconButtonPage />} />
                        <Route path="/docs/list" element={<ListPage />} />
                        <Route path="/docs/menu" element={<MenuPage />} />
                        <Route path="/docs/progress" element={<ProgressPage />} />
                        <Route path="/docs/radio" element={<RadioPage />} />
                        <Route path="/docs/select" element={<SelectPage />} />
                        <Route path="/docs/slider" element={<SliderPage />} />
                        <Route path="/docs/switch" element={<SwitchPage />} />
                        <Route path="/docs/tabs" element={<TabsPage />} />
                        <Route path="/docs/textfield" element={<TextFieldPage />} />
                        <Route path="/docs/theme" element={<ThemePage />} />
                        <Route path="/docs/install" element={<InstallPage />} />
                        <Route path="/docs/changelog" element={<ChangelogPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    </StrictMode>
);
