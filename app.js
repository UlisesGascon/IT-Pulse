var credentials = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY, 
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_SECRET
};

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sentiment = require('sentiment');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

var server = require('http').createServer(app);
var port = process.env.PORT || 3000;
server.listen(port);
console.log("Socket.io server listening on 127.0.0.1:" + port);

var sio = require('socket.io').listen(server);
var twitter = require('twitter');

var t = new twitter(credentials);

var keywords = ['github', '#git', 'scrum', '#js', 'javascript', 'jquery', 'angular', 'frontend', 'front-end', 'php', 'python' ,'nodejs', '#node', 'django', 'backend', 'back-end'];

t.stream('statuses/filter', {track: keywords.join(','), language: 'en, es' }, function(stream){
    stream.on('data', function(tweet){
      if(tweet.text !== undefined){
        var text = tweet.text.toLowerCase();

        if(text.indexOf(keywords[0]) > -1 || text.indexOf(keywords[1]) > -1 || text.indexOf(keywords[2]) > -1){
          var data = {
            tweet: tweet.text,
            tweetId: tweet.id_str,
            tweetUsserPhoto: tweet.user.profile_image_url,
            tweeter: tweet.user.screen_name,
            sentiment: sentiment(tweet.text),
          };
          sio.sockets.emit('github', data);
          console.log("Github, Git and Scrum: "+tweet.text);
          
        } 
        if(text.indexOf(keywords[3]) > -1 || text.indexOf(keywords[4]) > -1 || text.indexOf(keywords[5]) > -1 || text.indexOf(keywords[6]) > -1 || text.indexOf(keywords[7]) > -1 || text.indexOf(keywords[8]) > -1){
          var data = {
            tweet: tweet.text,
            tweetId: tweet.id_str,
            tweetUsserPhoto: tweet.user.profile_image_url,
            tweeter: tweet.user.screen_name,
            sentiment: sentiment(tweet.text),
          };
          sio.sockets.emit('js', data);
          console.log("Frontend, Javascript, Jquery and Angular: "+tweet.text);
          
        }
        
        if(text.indexOf(keywords[9]) > -1 || text.indexOf(keywords[10]) > -1 || text.indexOf(keywords[11]) > -1 || text.indexOf(keywords[12]) > -1 || text.indexOf(keywords[13]) > -1 || text.indexOf(keywords[14]) > -1|| text.indexOf(keywords[15]) > -1){
          var data = {
            tweet: tweet.text,
            tweetId: tweet.id_str,
            tweetUsserPhoto: tweet.user.profile_image_url,
            tweeter: tweet.user.screen_name,
            sentiment: sentiment(tweet.text),
          };
          sio.sockets.emit('nodejs', data);
          console.log("Backend, Php, Python, Nodejs and Django: "+tweet.text);
          
        } 
      }
    });

    stream.on('error', function(error, code){
      console.log("ERROR " + code + ": " + error);
    });
  });
  

sio.sockets.on('connection', function(socket){
  console.log('Web client connected');
  console.log("Connecting to Twitter stream...");

  socket.on('disconnect', function(){
    console.log('Web client disconnected');
  });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;