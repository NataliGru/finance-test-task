import React from 'react';
import 'bulma/css/bulma.css';

import './App.scss';
import { TickerTable } from './TickerTable/TickerTable';
import { Header } from './Header/Header';
import { IntervalSelector } from './IntervalSelector/IntervalSelector';

function handleMouseMove(e) {
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;
  const area = document.querySelector('.area');
  area.style.backgroundPosition = `${x * 50}% ${y * 50}%`;
}

function App() {
  return (
    <div className='App' onMouseMove={handleMouseMove}>
      <Header />
      <IntervalSelector />
      <TickerTable />

      <div class='area'>
        <ul class='circles'>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
  );
}

export default App;
