/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var fetch = require('node-fetch');
var mongoose = require('mongoose');

const CONNECTION_STRING = process.env.DB; //MongoClient.connect(CONNECTION_STRING, function(err, db) {});
const API_KEY = process.env.ALPHA_KEY;


mongoose.connect(CONNECTION_STRING, { useNewUrlParser: true });
var stockSchema = new mongoose.Schema({
  stock: { type : String , unique : true},
  likes: [String]
})
var Stock = mongoose.model('stock', stockSchema);

function buildApiURL (stock){
  var stockString = '';
  if (typeof stock === 'object'){
    stock.forEach(item => {
      stockString += item;
      stockString += ','
    });
    stockString = stockString.slice(0, -1);
  } else {
    stockString = stock;
  }
  return 'https://www.worldtradingdata.com/api/v1/stock?symbol='+stockString+'&api_token='+API_KEY
}

function handleDb(like, stockData, ip){
  return new Promise((resolve, reject)=>{
    var extractedArray = extractStockNames(stockData);
    var leftStocks = [...extractedArray];
    Stock.find({stock: {$in: extractedArray}})
      .then(document=>{
        var documentsForReturn =[];
        document.forEach((item, index)=>{
          var originalIndex = extractedArray.indexOf(item.stock);
          if (like === "true" && !item.likes.includes(ip)) {
            documentsForReturn.push(updateDb(item, ip, stockData.data[originalIndex].price));
          } else {
            documentsForReturn.push(formatOutput(item, stockData.data[originalIndex].price))
          }
          var processedStockIndex = leftStocks.indexOf(item.stock)
          leftStocks.splice(processedStockIndex, 1)
        })
        leftStocks.forEach(item =>{
          var originalIndex = extractedArray.indexOf(item);
          documentsForReturn.push(saveDb(like, stockData.data[originalIndex], ip));
        })
        return Promise.all(documentsForReturn);       
      })
      .then(dBresponse=>resolve(dBresponse))
  })
}

function extractStockNames(stockData){
  var queryArray = []
  stockData.data.forEach(item => queryArray.push(item.symbol))
  return queryArray

}


function formatOutput(document, price){
  return new Promise((resolve, reject)=>{
    let stockObj = {
      stock: document.stock,
      price: price,
      likes: document.likes.length
    }
    resolve(stockObj);
  })
}

function updateDb(document, ip, price){
  return new Promise ((resolve, reject)=>{
    Stock.findOneAndUpdate({stock: document.stock}, {$push:{likes: ip}}, {new: true})
      .then(updatedDoc =>{
        let stockObj = {
          stock: updatedDoc.stock,
          price: price,
          likes: updatedDoc.likes.length
        }
        resolve(stockObj);
      })
  })
}

function saveDb(like, stockData, ip){
  return new Promise((resolve, reject)=>{
    var likeArr;
    if (like === "true"){
      likeArr = [ip];
    } else {
      likeArr = []
    }
    var document = new Stock({
      stock: stockData.symbol,
      likes: likeArr
    })
    document.save()
      .then(doc => {
        let stockObj = {
          stock: stockData.symbol,
          price: stockData.price,
          likes: likeArr.length,
        }
        resolve(stockObj);
    })
  })
}

function formatResponse(dbData){
  return new Promise((resolve, reject)=>{
    if(dbData.length == 1){
      resolve({stockData: dbData[0]});
    } else {
      var resData = [
        {
          stock: dbData[0].stock,
          price: dbData[0].price,
          rel_likes: dbData[0].likes-dbData[1].likes
        },
        {
          stock: dbData[1].stock,
          price: dbData[1].price,
          rel_likes: dbData[1].likes-dbData[0].likes
        }
      ]
      resolve({stockData: resData});
    }
  });
}

module.exports = function (app) {
  // we're connected!
    app.route('/api/stock-prices')
      .get(function (req, res){
        var ip = req.headers['x-forwarded-for'].split(',')[0];
        var like = req.query.like;
        const URL = buildApiURL(req.query.stock);
        fetch(URL)
          .then(response => response.json())
          .then(apiData => handleDb(like, apiData, ip))
          .then(dbData => formatResponse(dbData))
          .then(responseJson => res.json(responseJson))
      });
};
