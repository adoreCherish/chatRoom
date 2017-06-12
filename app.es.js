const Koa = require('koa');
const router = require('koa-simple-router');
import babelPolyfill from 'babel-polyfill';
import babelCore from 'babel-core';
const render = require('koa-swig');
const co = require('co');
const path = require('path');
const serve = require('koa-static');
const app = new Koa();
import initController from './controller/initController';
initController.init(app, router)
var server = require('http').createServer(app.callback());
var io = require('socket.io')(server);
var port = 3000;

app.context.render = co.wrap(render({
	root: path.join(__dirname, 'views'),
	autoescape: true,
	cache: 'memory', // disable, set to false 
	ext: 'html',
	writeBody: false
}));

io.on('connection', function(socket) {
	socket.on('news', function(data) {
		console.log('data:' + data);
		socket.broadcast.emit('news', {
			username: data.username,
			message: data.message
		});
	});

	socket.on('enterChat', function(data) {
		console.log('data:' + data);
		socket.broadcast.emit('enterChat', {
			username: data.username,
			message: 'enter'
		});
	});
	socket.on('leaveChat', function(data) {
		console.log('leaveChat:' + data);
		socket.broadcast.emit('leaveChat', {
			username: data.username,
			message: 'had Gone'
		});
	});


})
// io.on('disconnect', function() {
	
// });


app.use(serve(path.join(__dirname, 'public')));

server.listen(port);

export default app;