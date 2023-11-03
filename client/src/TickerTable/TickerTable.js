import React from 'react';

import { useTickerContext } from '../Context/TickerContext';
import { TableRow } from '../TableRow/TableRow';

import { colors } from '../utils/colors';

import './TickerTable.scss';

export const TickerTable = () => {
  const { tickerData } = useTickerContext();


  return (
    <div className="table-container">
      <table className="table">
        <thead className='thead'> 
          <tr>
          <th>Ticker</th>
          <th>Company</th>
          <th>Exchange</th>
          <th>Price</th>
          <th>Change</th>
          <th>Percent</th>
          <th>Dividend</th>
          <th>Yield</th>
          <th>Action</th>
          </tr>
        </thead>
        <tbody>
            {tickerData.map((ticker, index) => (
                <TableRow key={ticker.ticker} ticker={ticker} color={colors[index]}/>
            ))}
        </tbody>
      </table>
    </div>
  );
};
