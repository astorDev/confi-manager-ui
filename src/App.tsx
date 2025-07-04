import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import AppConfiguration from './AppConfiguration';
import { useEffect, useState } from 'react';
import { fetchApps } from './api';

function App() {
  const [apps, setApps] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    fetchApps().then(setApps)
    function handleAppNameUpdated(e: Event) {
      const custom = e as CustomEvent<{ id: string; name: string }>
      setApps(apps => apps.map(app => app.id === custom.detail.id ? { ...app, name: custom.detail.name } : app))
    }
    window.addEventListener('app-name-updated', handleAppNameUpdated)
    return () => window.removeEventListener('app-name-updated', handleAppNameUpdated)
  }, []);

  return (
    <BrowserRouter>
      <div className="whole">
        <div className="layout-container">
          <nav>
            <header>Applications</header>
            {apps.map(app =>
              <Link key={app.id} to={`/${app.id}`}>{app.name}</Link>
            )}
          </nav>
          <main>
            <Routes>
              {apps.map(app =>
                <Route key={app.id} path={`/${app.id}`} element={<AppConfiguration id={app.id} />} />
              )}
              <Route path="*" element={apps.length > 0 ? <AppConfiguration id={apps[0].id} /> : null} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App
