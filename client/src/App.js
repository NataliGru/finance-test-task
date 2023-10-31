import React from 'react';
import 'bulma/css/bulma.css';

import './App.scss';
import { TickerTable } from './TickerTable/TickerTable';
import { Header } from './Header/Header';
import { IntervalSelector } from './IntervalSelector/IntervalSelector';

function App() {
  return (
    <div className='App'>
      <Header />
      <IntervalSelector />
      <TickerTable />
    </div>
  );
}

export default App;
