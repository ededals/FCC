/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
const MONGODB_CONNECTION_STRING = process.env.DB;
//Example connection: MongoClient.connect(MONGODB_CONNECTION_STRING, function(err, db) {});

module.exports = function (app) {
  let db;
  MongoClient.connect(MONGODB_CONNECTION_STRING)
    .then(client => {
    db = client;
  })
    .catch(error => console.log(error));
  app.route('/api/books')
    .get(function (req, res){
      db.collection('books')
       .find({}).toArray(function(err, docArray){
        if (err) res.send("Error finding information");
        var retArray = []
        docArray.forEach(object=>{
          var pushObj = {
            _id: object._id,
            title: object.title,
            commentcount: object.comments.length
          }
          retArray.push(pushObj);
        
        });
        res.json(retArray);
      });
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
    })
    
    .post(function (req, res){
      var title = req.body.title;
      if(!title) {
        res.send("indicate title");
      } else{
        var objectToWrite = {
          title,
          comments: []
        }
        db.collection('books')
         .save(objectToWrite, function(err, document){
          if (err) res.send("Error writing to database");
          res.send(document.ops[0]);
        })
      }
        //response will contain new book object including atleast _id and title
    })
    
    .delete(function(req, res){
      db.collection('books')
        .deleteMany({}, function(err, data){
        if (data.deletedCount > 0){
          res.send("complete delete successful");
        } else {
          res.send("No deleted entries");
        }
      })
      //if successful response will be 'complete delete successful'
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      var bookid = req.params.id;
      if (bookid.length!=24){
        res.send("no book exists");
      } else {
        db.collection('books')
         .findOne({_id: new ObjectId(bookid)}, function(err, data){
          if (err) res.send("Error finding information");
          if (!data) {
            res.send("no book exists")
          } else {
            res.json(data);
          }
        })
      }
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })
    
    .post(function(req, res){
      var bookid = req.params.id;
      var comment = req.body.comment;
      //json res format same as .get
      var objectToUpdate = {
        _id: new ObjectId(bookid)
      }
      var queryObject = {
        $push: {comments: comment}
      }
      db.collection('books')
       .findOneAndUpdate(objectToUpdate, queryObject, function (err, document){
        if (err) res.send("Error posting information");
        if (!document.value){
          res.send('no book exists')
        } else {
          res.json(document.value);
        }
      })
    })
    
    .delete(function(req, res){
      var bookid = req.params.id;
      var objectToDelete = {
        _id: new ObjectId(bookid)
      }
      db.collection('books')
        .deleteOne(objectToDelete, function(err, document){
          if (err) {
            res.send("Error posting information");
          }
          else if (document.result.n === 1){
            res.send("delete successful");
          } else {
            res.send("no book exists");
          }
      });
      //if successful response will be 'delete successful'
    });
  
};
