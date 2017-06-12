import app from '../app.js';
const request = require('supertest');
describe('GET /index', function() {
  it('index', function(done) {
    request(app.listen())
      .get('/index/index')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});
describe('GET /insert', function() {
  it('insert', function(done) {
    
    request(app.listen())
      .get('/index/insert')
      .query({ username: 'ceshi', message: 'ceshimessage' }) 
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
      .expect(200)
      .end(function(err,res){
        if (err) return done(err);
        done();
      });
  });
});