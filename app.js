
/**
 * Module dependencies.
 */

var exec = require('child_process').exec,
    child;

var express = require('express.io')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

var server = http.createServer(app);
var io = require('socket.io').listen(server);

// all environments
app.set('port', process.env.PORT || 3000);
// app.set('views', __dirname + '/views');
// app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
// app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var copter = io
  .of('/copter')
  .on('connection', function (socket) {
  	socket.on('message', function(msg) {
  		console.log('MESSAGE : '+msg);
  		if (msg === 'hover') {
  			console.log('calling hover')
  			socket.emit('stdout','calling hover')
			child = exec('node hover --channel 9',
			function (error, stdout, stderr) {
				console.log('stdout: ' + stdout);
				socket.emit('stdout', stdout);
				console.log('stderr: ' + stderr);
				socket.emit('stderr', stderr);
				if (error !== null) {
					console.log('exec error: ' + error);
					}
			});
  		};
  	});
  });


