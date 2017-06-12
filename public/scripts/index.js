//console.log('hi');
var socket = io();

var application = {
	init() {
		var self = this;

		self.render();
		self.bind();
	},
	render() {
		var self = this;
		self.clickSure = $('#clickSure');
		self.welcomeContent = $('.welcomeContent');
		self.yourName = $('.yourName');
		self.submitContent = $('#submitContent');
		self.contentChart = $('#contentChart'); //input的值
		self.connectContent = $('.connectContent');
		self.main = $('.main');
		self.connectContainer = $('#connectContainer');
		self.logOut = $('#logOut');
	},
	bind() {
		var self = this;
		self.clickSure.click(function() {
			self.clickAddFunction();
		})
		self.submitContent.click(function() {
			self.submitFunction();
		})
		self.logOut.click(function() {
			self.logOutFunction();
		})
	},
	clickAddFunction() {
		var self = this;
		$('#myModal').modal('hide')
		console.log($('#yourName').val());
		//获取输入框的名称,并显示
		var loginUserName = $('#yourName').val();
		// self.welcomeContent.css('display', 'block');
		self.yourName.html(loginUserName);
		self.enterChatFunction();
		socket.emit('enterChat', {
			username: $('#yourName').val(),
			message: 'enter'
		});

	},
	logOutFunction() {
		var self = this;
		self.leaveChatFunction();
		socket.emit('leaveChat', {
			username: $('#yourName').val(),
			message: 'leave'
		});
	},
	submitFunction() {
		var self = this;
		self.main.css('display', 'block');
		//self.addChatMessage();
		//console.log('kkk:'+self.cleanInput(self.contentChart.val()));
		socket.emit('news', {
			username: $('#yourName').val(),
			message: self.contentChart.val()
		});
		$.ajax({
				url: '/index/insert',
				method: 'GET',
				data: {
					username: $('#yourName').val(),
					message: self.contentChart.val()
				}
			})
			.then(function(data) {
				console.log('success:' + JSON.stringify(data));
				self.addChatMessage(data);
			}, function() {
				console.log('error:' + JSON.stringify(data));
			})


	},
	addChatMessage(d) {
		var self = this;
		if (d.username == $('#yourName').val()) {
			var div = '<div style="overflow:hidden"><div class="mainLeft">' + $('#yourName').val() + '说:' + self.contentChart.val() + '</span>' +
				'</div></div>';
			self.connectContainer.append(div)
		} else {
			//console.log('d.content:' + d.content);
			var div = '<div style="overflow:hidden"><div class="mainRight">' + d.username + '说:' + d.message + '</span>' +
				'</div></div>';
			self.connectContainer.append(div)
			console.log(11111);
		}


	},
	enterChatFunction(d) {
		var self = this;
		//self.welcomeContent.css('display', 'block');
		if (d == undefined) {

			var div = '<div class="welcomeContent">欢迎' + $('#yourName').val() + '来到聊天室</div>'
		} else {
			var div = '<div class="welcomeContent">欢迎' + d.username + '来到聊天室</div>'
		}
		self.connectContainer.append(div)


	},
	leaveChatFunction(d) {
		var self = this;
		//self.welcomeContent.css('display', 'block');
		if (d == undefined) {

			var div = '<div class="welcomeContent">' + $('#yourName').val() + '离开聊天室</div>'
		} else {
			var div = '<div class="welcomeContent">' + d.username + '离开聊天室</div>'
		}
		self.connectContainer.append(div)


	}



}
window.test = application;
$(function() {
	$('#myModal').modal({
		show: true,
		backdrop: 'static'
	})



	application.init();

	socket.on('news', function(data) {
		console.log('news data:' + JSON.stringify(data));
		application.addChatMessage(data);
	});
	socket.on('enterChat', function(data) {
		application.enterChatFunction(data);
	});

	socket.on('leaveChat', function(data) {
		application.leaveChatFunction(data);
	});

})