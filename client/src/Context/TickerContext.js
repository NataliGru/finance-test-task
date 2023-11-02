/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import { intervals } from '../utils/intervals';

const TickerContext = createContext();

export const useTickerContext = () => {
  return useContext(TickerContext);
};

export const TickerProvider = ({ children }) => {
  const [tickerData, setTickerData] = useState([]);
  const [selectedInterval, setSelectedInterval] = useState(intervals[0]);
  const [isActiveSelector, setIsActiveSelector] = useState(false);

  const socket = io('http://localhost:4000');

  socket.on('ticker', (data) => {
    setTickerData(data);
  });

  useEffect(() => {
    socket.emit('start');

    return () => {
      socket.off('ticker');
      socket.off('changeInterval');
    };
  }, []);

  const changeInterval = (newInterval) => {
    socket.emit('changeInterval', newInterval.value);
  };

  const contextValue = {
    tickerData,
    selectedInterval,
    setSelectedInterval,
    changeInterval,
    isActiveSelector,
    setIsActiveSelector,
  };

  return (
    <TickerContext.Provider value={contextValue}>
      {children}
    </TickerContext.Provider>
  );
};
