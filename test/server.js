'use strict';

var _app = require('../app.js');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var request = require('supertest');
describe('GET /index', function () {
  it('index', function (done) {
    request(_app2.default.listen()).get('/index/index').expect(200).end(function (err, res) {
      if (err) return done(err);
      done();
    });
  });
});
describe('GET /insert', function () {
  it('insert', function (done) {

    request(_app2.default.listen()).get('/index/insert').query({ username: 'ceshi', message: 'ceshimessage' })
    // .expect(function(res) {
    //   console.log('res:' + JSON.stringify(res));
    //   res.body.username = 'ceshi';
    //   res.body.message = 'ceshimessage'
    // })
    // .expect(200, {
    //   username: 'ceshi',
    //   message: 'ceshimessage'
    // }, done);
    // .expect(200)
    // .end(function(err, res) {
    //   if (err) return done(err);
    //   done();
    // });
    .expect(200).end(function (err, res) {
      if (err) return done(err);
      done();
    });
  });
});
