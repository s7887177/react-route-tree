import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import BasicExample from './examples/BasicExample';
import FilteringExample from './examples/FilteringExample';
import ExpansionExample from './examples/ExpansionExample';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <nav className="nav">
          <h1>React Route Tree Examples</h1>
          <div className="nav-links">
            <Link to="/">Basic Usage</Link>
            <Link to="/filtering">Filtering</Link>
            <Link to="/expansion">Expansion Levels</Link>
          </div>
        </nav>
        
        <main className="content">
          <Routes>
            <Route path="/" element={<BasicExample />} />
            <Route path="/filtering" element={<FilteringExample />} />
            <Route path="/expansion" element={<ExpansionExample />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App
