import { useState, useRef, useEffect } from 'react';
import './App.css';
import Bot from './components/Bot.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div><pre>Voice of Justice</pre></div>
        <div>
          <div className='hamburger'>
            <input type="checkbox" className="checkbox" id="checkbox" />
            <label htmlFor="checkbox" className="hamburger-label">
              <span className="line line1"></span>
              <span className="line line2"></span>
              <span className="line line3"></span>
            </label>
          </div>
        </div>
      </header>
      <Bot />
    </div>
  );
}

export default App;