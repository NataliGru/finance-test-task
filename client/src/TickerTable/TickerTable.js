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
          <td>Ticker</td>
          <td>Company</td>
          <td>Exchange</td>
          <td>Price</td>
          <td>Change</td>
          <td>Percent</td>
          <td>Dividend</td>
          <td>Yield</td>
          <td>Action</td>
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
