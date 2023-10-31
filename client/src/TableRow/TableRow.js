import React from 'react';
import './TableRow.scss';
import { useTickerContext } from '../Context/TickerContext';

export const TableRow = ({ ticker }) => {
  const { isAnimated } = useTickerContext();

  const cellClassName = isAnimated ? 'animated' : '';

  return (
    <tr className='table-row'>
      <td >
        <div className='ticker'>{ticker.ticker}</div>
      </td>
      <td>{ticker.name}</td>
      <td >{ticker.exchange}</td>
      <td className={cellClassName}>{ticker.price}</td>
      <td className={cellClassName}>{ticker.change}</td>
      <td className={cellClassName}>{Math.abs(ticker.change_percent)}</td>
      <td className={cellClassName}>{ticker.dividend}</td>
      <td className={cellClassName}>{ticker.yield}</td>
    </tr>
  );
};
