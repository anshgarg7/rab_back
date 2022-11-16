var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var toastr = require('express-toastr');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors')
const connectToDb = require('./db/connect');
var flash = require('connect-flash');
var app = express();
var session = require('express-session');
var layout = require('express-layout');
var moment = require('moment');
app.locals.moment = require('moment');

connectToDb();

app.use(layout());
app.use(cors())
app.use(logger('dev'));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.json());
app.use(cookieParser());
app.use(flash());
app.use(toastr());
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, "views"));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('layouts', './views/layouts');
app.set('layout', 'admin');

/********************************/
require('./app/routes/commonApi.js')(app);
require('./app/routes/userApi.js')(app);
require('./app/routes/vendorApi.js')(app);
require('./app/routes/taxiDriverApi.js')(app);
require('./app/routes/hotelApi.js')(app);
require('./app/routes/web.js')(app);

/* 404 page */
app.use(function(req, res, next) {
  res.status(404);
  res.render('404', {layout: false});
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
