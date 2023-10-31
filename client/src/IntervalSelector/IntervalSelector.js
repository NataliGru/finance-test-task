import { useState } from 'react';
import { useTickerContext } from '../Context/TickerContext';
import { intervals } from '../intervals';

import './IntervalSelector.scss';

export const IntervalSelector = () => {
  const { selectedInterval, handleChangeInterval} = useTickerContext();

  const [newInterval, setNewInterval] = useState(selectedInterval);

  const handleClick = () => {
    (selectedInterval !== newInterval) && (
      handleChangeInterval(newInterval)
    )
  }
  
  return (
    <div className='container'>
      <label className='label'>Select interval:</label>
      <div className='select is-success'>
        <select
          value={selectedInterval}
          onChange={(e) => setNewInterval(parseInt(e.target.value))}
        >
          {intervals.map((interval) => (
            <option key={interval.value} value={interval.value} className='select-option'>
              {interval.label}
            </option>
          ))}
        </select>
      </div>

      <button className='button is-outlined' onClick={handleClick}>
        Change
      </button>
    </div>
  );
};
