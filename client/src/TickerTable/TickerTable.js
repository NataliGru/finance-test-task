import React from 'react';

import { TableRow } from '../TableRow/TableRow';

import './TickerTable.scss';
import { useTickerContext } from '../Context/TickerContext';

export const TickerTable = () => {
  const { tickerData } = useTickerContext();

  return (
    <div className="table-container">
      <table className="table">
        <tbody>
            {tickerData.map((ticker) => (
                <TableRow key={ticker.ticker} ticker={ticker} />
            ))}
        </tbody>
      </table>
    </div>
  );
};
