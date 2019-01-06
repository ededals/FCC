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

suite('Functional Tests', function() {
    
    suite('GET /api/stock-prices => stockData object', function() {
      
      test('1 stock', function(done) {
       chai.request(server)
        .get('/api/stock-prices')
        .query({stock: 'goog'})
        .set('X-Forwarded-For', '192.168.2.1')
        .end(function(err, res){
           assert.equal(res.statusCode, 200);
           assert.equal(res.body.stockData.stock, 'GOOG');
           assert.property(res.body.stockData, 'price');
           assert.property(res.body.stockData, 'likes');
           assert.notProperty(res.body.stockData, 'rel_likes');
          //complete this one too
          
          done();
        });
      });
      
      test('1 stock with like', function(done) {
       chai.request(server)
        .get('/api/stock-prices')
        .query({stock: 'goog', like: "true"})
        .set('X-Forwarded-For', '192.168.2.1')
        .end(function(err, res){
           assert.equal(res.statusCode, 200);
           assert.equal(res.body.stockData.stock, 'GOOG');
           assert.property(res.body.stockData, 'price');
           assert.equal(res.body.stockData.likes, 1);
           assert.notProperty(res.body.stockData, 'rel_likes');
          //complete this one too
          
          done();
       })
      });
      
      test('1 stock with like again (ensure likes arent double counted)', function(done) {
        chai.request(server)
        .get('/api/stock-prices')
        .query({stock: 'goog', like: "true"})
        .set('X-Forwarded-For', '192.168.2.1')
        .end(function(err, res){
           assert.equal(res.statusCode, 200);
           assert.equal(res.body.stockData.stock, 'GOOG');
           assert.property(res.body.stockData, 'price');
           assert.equal(res.body.stockData.likes, 1);
           assert.notProperty(res.body.stockData, 'rel_likes');
           done();
        });
      });
      
      test('2 stocks', function(done) {
        chai.request(server)
        .get('/api/stock-prices')
        .query({stock: ['aapl', 'msft']})
        .set('X-Forwarded-For', '192.168.2.1')
        .end(function(err, res){
           assert.equal(res.statusCode, 200);
           assert.isArray(res.body.stockData);
           assert.equal(res.body.stockData[0].stock, 'AAPL');
           assert.property(res.body.stockData[0], 'price');
           assert.notProperty(res.body.stockData[0], 'likes');
           assert.property(res.body.stockData[0], 'rel_likes');
           done();
        });
      });
      
      test('2 stocks with like', function(done) {
        chai.request(server)
        .get('/api/stock-prices')
        .query({stock: ['aapl', 'msft'], like: "true"})
        .set('X-Forwarded-For', '192.168.2.1')
        .end(function(err, res){
           assert.equal(res.statusCode, 200);
           assert.isArray(res.body.stockData);
           assert.equal(res.body.stockData[0].stock, 'AAPL');
           assert.property(res.body.stockData[0], 'price');
           assert.notProperty(res.body.stockData[0], 'likes');
           assert.property(res.body.stockData[0], 'rel_likes');
           done();
        });
      });
      
    });

});
