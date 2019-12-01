require('dotenv').config()

const express = require('express');
const helmet = require('helmet');
const sqlite = require('sqlite');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(helmet());

const indexRouter = require('./controllers/index');
const extRouter = require('./controllers/ext');
const mimeRouter = require('./controllers/mime');

app.use('/', indexRouter);
app.use('/ext', extRouter);
app.use('/mime', mimeRouter);

// Migracje
// const dbPromise = Promise.resolve()
//   .then(() => sqlite.open('./db.sqlite', { Promise }))
  // .then(() => // migrations);

app.listen(PORT, () => {
  console.log(`API started on port ${PORT}`);
});