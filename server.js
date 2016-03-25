var express = require('express'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  routes = require('./routes/'),
  favicon = require('serve-favicon'),
  app = express()
  
var session = require('express-session')
var MongoStore = require('connect-mongo')(session)
var cookieParser = require('cookie-parser')


/*
* Database configuration.
*/

app.set('dbhost', '127.0.0.1')
app.set('dbname', 'hyper')
mongoose.connect('mongodb://' + app.get('dbhost') + '/' + app.get('dbname'))

app.set('port', process.env.PORT ||8081)
app.set('ip', process.env.IP || '0.0.0.0')

/*
* static folder and view engine config
*/
app.use(favicon(__dirname + '/public/favicon.ico'))
app.use(express.static(__dirname + '/public'))
app.set('view engine', 'jade')

/*
* Allowed data methods.
*/
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

/*
* Session and store configuration
*/
var sessionStore = new MongoStore({
  mongooseConnection: mongoose.connection
})
app.use(cookieParser('Change me please, I need to be secret')) // these values are temporary and will be chnaged
app.use(session({
  secret: 'Change me please, I need to be secret', // these values are temporary and will be chnaged
  key: 'Change me please, I need to be the key', // these values are temporary and will be chnaged
  store: sessionStore,
  resave: false,
  saveUninitialized: true,
  cookie: {
      secure: false
  }
}))

/*
* default route location.
*/
app.use('/', routes)

app.listen(app.get('port'), app.get('ip'), function () {
  console.log('hyper-server has started...')
})