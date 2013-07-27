$( document ).ready(function() {

	var copter = io.connect('http://localhost/copter');

	copter.on('connect', function() {
		stdout('server connected');
	});

	copter.on('disconnect', function() {
		stdout('server disconnected');
	});

	copter.on('stdout', function(msg) {
		stdout(msg);
	});

	copter.on('stderr', function(msg) {
		stderr(msg);
	});

	$('#hover').click( function() {
		copter.send('hover');
	});
});

function stdout(text){
	$('#stdout').text($('#stdout').text() + text + '\n');
}

function stderr(text){
	$('#stderr').text($('#stderr').text() + text + '\n');
}