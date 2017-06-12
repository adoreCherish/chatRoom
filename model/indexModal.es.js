const request = require('request-promise');
class indexModal {
	constructor(ctx) {
		this.ctx = ctx;
	}
	insertD(username,content) {
		console.log('insertData:'+username+'   '+content);

		var options = {
			method: 'GET',
			uri: 'http://localhost/connectSql.php',
			qs: {
				username:'\''+username+'\'',
				message:'\''+content+'\''
			},
			headers: {
				'User-Agent': 'Request-Promise'
			},
			json: true // Automatically stringifies the body to JSON
		};
		return new Promise((resolve, reject) => {
			request(options)
				.then(function(result) {
					console.log('result:' + result);
					const info = JSON.parse(result);
					console.log('info:' + info)
					if (info) {
						resolve({
							username: username,
							message: content
						})
					} else {
						reject({
							username: '无',
							message: '无'
						})
					}
				})
				.catch(function(err) {
					console.log('err:' + err);
				});

		})
	}
}
export default indexModal;