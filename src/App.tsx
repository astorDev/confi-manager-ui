import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import AppConfiguration from './Config';
import { useEffect, useState } from 'react';
import { fetchApps } from './api';

function App() {
  const [apps, setApps] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    fetchApps().then(setApps);
  }, []);

  return (
    <BrowserRouter>
      <div className="whole">
        <nav>
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
    </BrowserRouter>
  );
}

export default App
