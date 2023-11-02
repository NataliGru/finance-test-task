'use strict';
const express = require('express');
const http = require('http');
const io = require('socket.io');
const cors = require('cors');

const PORT = process.env.PORT || 4000;

const DEFAULT_FETCH_INTERVAL = 5000;
const PRICE_CHANGE_RANGE = 20;

const tickers = [
  { ticker: 'AAPL', name: 'Apple' },
  { ticker: 'GOOGL', name: 'Alphabet' },
  { ticker: 'MSFT', name: 'Microsoft' },
  { ticker: 'AMZN', name: 'Amazon' },
  { ticker: 'FB', name: 'Facebook' },
  { ticker: 'TSLA', name: 'Tesla' },
];

function randomFloatValue(min, max, precision) {
  return parseFloat((Math.random() * (max - min + 1) + min).toFixed(precision));
}

function utcDate() {
  const now = new Date();
  return new Date(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    now.getUTCHours(),
    now.getUTCMinutes(),
    now.getUTCSeconds()
  );
}

function getQuotes(socket) {
  const quotes = tickers.map(({ ticker, name }) => {
    const currentPrice = randomFloatValue(100, 300, 2);
    const priceChange = randomFloatValue(
      PRICE_CHANGE_RANGE,
      -PRICE_CHANGE_RANGE,
      2
    );
    const newPrice = currentPrice + priceChange;

    return {
      ticker,
      name,
      exchange: 'NASDAQ',
      price: newPrice.toFixed(2),
      change: priceChange,
      change_percent: ((priceChange / currentPrice) * 100).toFixed(2),
      dividend: randomFloatValue(0, 1, 2),
      yield: randomFloatValue(0, 2, 2),
      last_trade_time: utcDate(),
    };
  });

  socket.emit('ticker', quotes);
}

let clientTimer;

function trackTickers(socket, interval) {
  if (clientTimer) {
    clearInterval(clientTimer);
  }
  
  clientTimer = setInterval(function () {
    getQuotes(socket);
  }, interval);
  
  socket.on('disconnect', function () {
    if (clientTimer) {
      clearInterval(clientTimer);
    }
  });

  getQuotes(socket);
}

const app = express();
app.use(cors());
const server = http.createServer(app);

const socketServer = io(server, {
  cors: {
    origin: '*',
  },
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

socketServer.on('connection', (socket) => {
  socket.on('start', () => {
    trackTickers(socket, DEFAULT_FETCH_INTERVAL);
  });
  
  socket.on('changeInterval', (newInterval) => {
    trackTickers(socket, newInterval);
  });  
});

server.listen(PORT, () => {
  console.log(`Streaming service is running on http://localhost:${PORT}`);
});
