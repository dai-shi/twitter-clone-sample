
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , SCB = require('social-cms-backend');

var app = express();

// all environments
app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000);
app.set('ipaddr', process.env.OPENSHIFT_NODEJS_IP);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(require('morgan')('dev'));
app.use(require('body-parser').json());
app.use(require('body-parser').urlencoded({ extended: false }));
app.use(require('method-override')());
app.use(require('cookie-parser')());
app.use(require('express-session')({
    secret: 'your secret here',
    resave: false,
    saveUninitialized: true
}));
app.use(SCB.middleware({
  mongodb_url: process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGODB_URL,
  passport_strategy: 'facebook',
  facebook_app_id: process.env.FACEBOOK_APP_ID,
  facebook_app_secret: process.env.FACEBOOK_APP_SECRET,
  login_success_facebook_path: '/',
  set_facebook_fullname: true,
  ensure_unique_index: {
    object_type: 'like',
    object_fields: ['owner', 'post_id']
  }
}));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(require('errorhandler')());
}

app.get('/', routes.index);
//app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), app.get('ipaddr'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
