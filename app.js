'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _babelPolyfill = require('babel-polyfill');

var _babelPolyfill2 = _interopRequireDefault(_babelPolyfill);

var _babelCore = require('babel-core');

var _babelCore2 = _interopRequireDefault(_babelCore);

var _initController = require('./controller/initController');

var _initController2 = _interopRequireDefault(_initController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Koa = require('koa');
var router = require('koa-simple-router');

var render = require('koa-swig');
var co = require('co');
var path = require('path');
var serve = require('koa-static');
var app = new Koa();

_initController2.default.init(app, router);
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

io.on('connection', function (socket) {
	socket.on('news', function (data) {
		console.log('data:' + data);
		socket.broadcast.emit('news', {
			username: data.username,
			message: data.message
		});
	});

	socket.on('enterChat', function (data) {
		console.log('data:' + data);
		socket.broadcast.emit('enterChat', {
			username: data.username,
			message: 'enter'
		});
	});
	socket.on('leaveChat', function (data) {
		console.log('leaveChat:' + data);
		socket.broadcast.emit('leaveChat', {
			username: data.username,
			message: 'had Gone'
		});
	});
});
// io.on('disconnect', function() {

// });


app.use(serve(path.join(__dirname, 'public')));

server.listen(port);

exports.default = app;
