import React from 'react';
import { useTickerContext } from '../Context/TickerContext';
import { intervals } from '../utils/intervals';
import './IntervalSelector.scss';

export const IntervalSelector = () => {
  const {
    selectedInterval,
    setSelectedInterval,
    changeInterval,
    isActiveSelector,
    setIsActiveSelector,
  } = useTickerContext();

  const handleIntervalSelection = (newInterval) => {
    setSelectedInterval(newInterval);
    changeInterval(newInterval);
    setIsActiveSelector(false);
  };

  const handleSelectorClick = () => {
    setIsActiveSelector(!isActiveSelector);
  };

  const handleMouseLeave = () => {
    setIsActiveSelector(false);
  };

  return (
    <div className='selector-container'>
      <label className='selector-label'>Select interval:</label>
      <div
        className={`custom-select ${isActiveSelector ? 'active' : ''}`}
        onClick={handleSelectorClick}
        onMouseLeave={handleMouseLeave}
      >
        <span className='select-value'>
          {selectedInterval.label}
          <i className='fas fa-angle-down' aria-hidden='true'></i>
        </span>
        <ul className='options'>
          {intervals.map((interval) => (
            <li
              key={interval.value}
              onClick={() => handleIntervalSelection(interval)}
            >
              {interval.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
