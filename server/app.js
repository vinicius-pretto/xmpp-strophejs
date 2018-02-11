const express = require('express');
const { resolve } = require('path');
const app = express();

app.use(express.static(resolve('client')));

app.get('*', (req, res) => {
  res.sendFile(resolve('client/index.html'));
});

module.exports = app;