const express = require('express');

const bodyParser = require('body-parser');

const app = express();

const path = require('path');

const v1 = require('./routes/v1');

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization',
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS',
  );
  next();
});

app.use('/api/v1', v1);

app.use('/gifs', express.static(path.join(__dirname, 'gifs')));

module.exports = app;
