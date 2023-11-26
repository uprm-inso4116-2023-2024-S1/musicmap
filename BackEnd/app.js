var createError = require('http-errors');
var express = require('express');

require('./db/conn.js')

const session = require('express-session')
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var signRouter = require('./routes/signUp');
var testRouter = require('./routes/testRoute');
var loginRouter = require('./routes/signIn.js');
var userRouter = require('./routes/user.js')
var spotifyRouter = require('./routes/spotifyRoutes.js')
var spotifyAuthRouter = require('./routes/spotifyAuth.js')

var app = express();

app.use(
  session({
    secret: 'hehe-secretkey',
    resave: false,
    saveUninitialized: true,
  })
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/signUp', signRouter);
app.use('/testRoute', testRouter);
app.use('/login', loginRouter);
app.use('/user', userRouter);
app.use('/spotify', spotifyRouter)
app.use('/auth', spotifyAuthRouter)



/**
 * simple middleware to make sure user is logged in.
 * But really, we won't be using this probably 
 */
// app.user((req, res, next) => {
//   if (req.session.user) next();
//   else {
//     res.send("Please Log In , 401 (unauthorized)")
//   }
// })

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

// Cors settings 
const corsOptions = {
  origin: '*', 
  allowedHeaders: 'Content-Type', 
  credentials: true
};

app.use(cors(corsOptions));


module.exports = app;
