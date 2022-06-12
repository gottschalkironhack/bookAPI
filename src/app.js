const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors')({ exposedHeaders: ['X-ResponseTime'] });
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/bookStoreDB', { useMongoClient: true, promiseLibrary: global.Promise });
const books = require('./api/books');
const app = express();

// VIEW ENGINE SETUP
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//ENABLE CROSS BROWSER REQUESTS
app.use(cors);
app.options('*', cors);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/books', books);

// CATCH 404 AND FORWARD TO ERROR HANDLER
app.use(function(next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// ERROR HANDLER
app.use(function(err, _req, res) {
  // SET LOCALS, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // RENDER ERROR PAGE
  res.status(err.status || 500);
  res.render('error');
});
;
module.exports = app;
