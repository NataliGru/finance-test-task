import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

const updateIntervals = [
  { label: '5 s', value: 5000 },
  { label: '10 s', value: 10000 },
  { label: '30 s', value: 30000 },
  { label: '1 h', value: 3600000 },
  { label: '6 h', value: 21600000 },
  { label: '12 h', value: 43200000 },
];

function App() {
  const [tickerData, setTickerData] = useState([]);
  const [selectedInterval, setSelectedInterval] = useState(updateIntervals[0].value);


  useEffect(() => {
    socket.on('ticker', (data) => {
      setTickerData(data);
      console.log(data)
    });

    socket.emit('start');

    return () => {
      socket.off('ticker');
      socket.off('updateInterval');
    };
  }, []);

  function handleChangeInterval() {
    socket.emit('changeInterval', selectedInterval);
  }

  // console.log(tickerData);

  return (
    <div className="App">
      <h1>Stock Ticker Data</h1>
      <div>
        {/* Вибір інтервалу оновлення */}
        <label>Select the update interval:</label>
        <select
          value={selectedInterval}
          onChange={(e) => setSelectedInterval(parseInt(e.target.value))}
        >
          {updateIntervals.map((interval) => (
            <option key={interval.value} value={interval.value}>
              {interval.label}
            </option>
          ))}
        </select>
      </div>

      <button onClick={handleChangeInterval}>
        Change
      </button>
      
      <table>
        <thead>
          <tr>
            <th>Ticker</th>
            <th>Exchange</th>
            <th>Price</th>
            <th>Change</th>
            <th>Change Percent</th>
            <th>Dividend</th>
            <th>Yield</th>
            <th>Last Trade Time</th>
          </tr>
        </thead>
        <tbody>
          {tickerData.map((ticker) => (
            <tr key={ticker.ticker}>
              <td>{ticker.ticker}</td>
              <td>{ticker.exchange}</td>
              <td>{ticker.price}</td>
              <td>{ticker.change}</td>
              <td>{ticker.change_percent}</td>
              <td>{ticker.dividend}</td>
              <td>{ticker.yield}</td>
              <td>{ticker.last_trade_time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
