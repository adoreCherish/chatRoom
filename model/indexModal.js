'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var request = require('request-promise');

var indexModal = function () {
	function indexModal(ctx) {
		_classCallCheck(this, indexModal);

		this.ctx = ctx;
	}

	_createClass(indexModal, [{
		key: 'insertD',
		value: function insertD(username, content) {
			console.log('insertData:' + username + '   ' + content);

			var options = {
				method: 'GET',
				uri: 'http://localhost/connectSql.php',
				qs: {
					username: '\'' + username + '\'',
					message: '\'' + content + '\''
				},
				headers: {
					'User-Agent': 'Request-Promise'
				},
				json: true // Automatically stringifies the body to JSON
			};
			return new Promise(function (resolve, reject) {
				request(options).then(function (result) {
					console.log('result:' + result);
					var info = JSON.parse(result);
					console.log('info:' + info);
					if (info) {
						resolve({
							username: username,
							message: content
						});
					} else {
						reject({
							username: '无',
							message: '无'
						});
					}
				}).catch(function (err) {
					console.log('err:' + err);
				});
			});
		}
	}]);

	return indexModal;
}();

exports.default = indexModal;
