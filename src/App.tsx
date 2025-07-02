import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import AppConfiguration from './Config';

function App() {
  return (
    <BrowserRouter>
      <div className="whole">
        <nav>
          <Link to="/">Home</Link><br/>
          <Link to="/about">About</Link>
        </nav>
        <main>
          <Routes>
            <Route path="/" element={<AppConfiguration id="home"/>} />
            <Route path="/about" element={<AppConfiguration id="about"/>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}


export default App
