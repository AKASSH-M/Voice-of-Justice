import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Bot from './components/Bot.js';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
            <div><pre>Voice of Justice</pre></div>

            <div>
              <input type="checkbox" className="checkbox" id="checkbox" />
              <label htmlFor="checkbox" className="hamburger-label hamburger">
                <span className="line line1"></span>
                <span className="line line2"></span>
                <span className="line line3"></span>
              </label>

              <nav className="menu">
                <ul className="nav_links">
                  <li><Link to="/">Bot</Link></li>
                  <li><Link to="/about">About</Link></li>
                  <li><Link to="/contact">Source</Link></li>
                </ul>
              </nav>
            </div>
          </header>

        
        <Routes >
          <Route path="/" element={<Bot />} />
          <Route path="/about" element={
              <div className="about">
                <h1>About Voice of Justice</h1>
                <div>
                  <p>Voice of Justice is a chatbot designed to assist users in understanding their legal rights and navigating the justice system. It provides information on various legal topics, including civil rights, criminal law, and more.</p>
                  <p>Our goal is to empower individuals with knowledge and resources to help them make informed decisions regarding their legal matters.</p>

                  <pre className='red'>this model is only for testing purpose
it is not a real legal assistant
                  </pre>
                </div>
              </div>
            } />
          <Route path="/contact" element={
            <div className="source">
              <h1>Source Code</h1>
              <p>The source code for this project will be available soon</p>
            </div>
          } />
        </Routes>

        <footer>
          <div>
            <p>© 2025 all rights reserved</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
