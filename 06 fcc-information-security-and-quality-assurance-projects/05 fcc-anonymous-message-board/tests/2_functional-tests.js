/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);
var id = '5c3576318b785a49510bfef5'
suite('Functional Tests', function() {

  suite('API ROUTING FOR /api/threads/:board', function() {
    
    test('POST', function(done) {
      chai.request(server)
        .post('/api/threads/functest')
        .send({text: "Creating test case", delete_password:"del"})
        .end(function(err, res){
          assert.equal(res.statusCode, 200);
          done();
      })
    });
    
    test('GET', function(done) {
      chai.request(server)
        .get('/api/threads/functest')
        .end(function(err, res){
          assert.equal(res.statusCode, 200);
          assert.isArray(res.body)
          assert.equal(res.body[0].text, "Creating test case");
          assert.property(res.body[0], 'created_on');
          assert.isArray(res.body[0].replies);
          assert.property(res.body[0], 'bumped_on');
          assert.property(res.body[0], '_id');
          assert.isAtMost(res.body[0].replies.length, 3);
          done();
        });
      
    });
    
    test('DELETE', function(done) {
      chai.request(server)
        .delete('/api/threads/functest')
        .query({thread_id: '123456789'})
        .end(function(err, res){
          assert.equal(res.statusCode, 200);
          assert.equal(res.text, "document not found");
          done();
      });
    });
    
    test('PUT', function(done) {
      chai.request(server)
        .put('/api/threads/functest')
        .send({report_id: '5c3576318b785a49510bfef5'})
        .end(function(err, res){
          assert.equal(res.statusCode, 200);
          assert.equal(res.text, "failure");
          done();
      });
    });
    

  });
  
  suite('API ROUTING FOR /api/replies/:board', function() {
    
    test('POST', function(done) {
      chai.request(server)
        .post('/api/replies/functest')
        .send({text: "Creating test case reply", delete_password:"del", thread_id:id})
        .end(function(err, res){
          assert.equal(res.statusCode, 200);
          done();
      })
    });
    
    test('GET', function(done) {
      chai.request(server)
        .get('/api/replies/functest')
        .query({thread_id: id})
        .end(function(err, res){
          assert.equal(res.statusCode, 200);
          assert.isArray(res.body)
          assert.isArray(res.body[0].replies);
          assert.property(res.body[0].replies[0], '_id');
          assert.equal(res.body[0].replies[0].text, 'Creating test case reply')
          assert.property(res.body[0].replies[0], 'created_on');
          assert.property(res.body[0].replies[0], 'reported');
          assert.equal(res.body[0].replies[0].delete_password, 'del');
          done();
        });
    });
    
    test('PUT', function(done) {
      chai.request(server)
        .put('/api/replies/functest')
        .end(function(err, res){
          assert.equal(res.statusCode, 200);
          assert.equal(res.text, "failure");
          done();
      });
    });
    
    test('DELETE', function(done) {
      chai.request(server)
        .delete('/api/replies/functest')
        .end(function(err, res){
          assert.equal(res.statusCode, 200);
          assert.equal(res.text, "document not found");
          done();
      });
    });
    
  });

});
