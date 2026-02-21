import { Outlet } from 'react-router-dom';
import { Sidebar } from './components/sidebar';

export function App() {
    return (
        <div className="app">
            <Sidebar />
            <main className="app-content">
                <Outlet />
            </main>
        </div>
    );
}
