import React, { createContext, useContext, useState, useEffect } from 'react';
import io from 'socket.io-client';
import { intervals } from '../intervals';

const TickerContext = createContext();
const socket = io('http://localhost:4000');

export const useTickerContext = () => {
  return useContext(TickerContext);
};

export const TickerProvider = ({ children }) => {
  const [tickerData, setTickerData] = useState([]);
  const [selectedInterval, setSelectedInterval] = useState(intervals[0].value);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    socket.on('ticker', (data) => {
      setIsAnimated(true);
      setTickerData(data);
    });

    socket.emit('start');

    return () => {
      socket.off('ticker');
      socket.off('updateInterval');
    };
  }, []);

  useEffect(() => {
    const animationTimeout = setTimeout(() => {
      setIsAnimated(false);
    }, selectedInterval / 2);

    return () => clearTimeout(animationTimeout);
  }, [tickerData, selectedInterval]);

  const handleChangeInterval = (newInterval) => {
    setSelectedInterval(newInterval);

    socket.emit('changeInterval', selectedInterval);
  };

  const contextValue = {
    tickerData,
    selectedInterval,
    handleChangeInterval,
    isAnimated,
  };

  return (
    <TickerContext.Provider value={contextValue}>{children}</TickerContext.Provider>
  );
};
