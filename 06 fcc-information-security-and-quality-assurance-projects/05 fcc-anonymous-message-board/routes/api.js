/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var mongoose = require('mongoose');

var CONNECTION_STRING = process.env.DB
mongoose.connect(CONNECTION_STRING, {useNewUrlParser: true})
var Schema = mongoose.Schema;
var messageSchema = new Schema({
  text: String,
  created_on: Date,
  bumped_on: Date,
  reported: Boolean,
  delete_password: String,
  board: String,
  replies: [{
      text: String,
      created_on: Date,
      delete_password: String,
      reported: Boolean
    }]
})
var Message = mongoose.model('Message', messageSchema);



module.exports = function (app) {
  
  app.route('/api/threads/:board')
    .post(function (req, res){
      var document = new Message({
        text: req.body.text,
        created_on: new Date,
        bumped_on: new Date,
        reported: false,
        delete_password: req.body.delete_password,
        replies: [],
        board: req.params.board
      })
      document.save(function (err, doc){
        if (err) console.log(err);
        res.redirect('/b/'+req.params.board+'/');
      })
    })
    .get(function getBoard(req, res){
      Message.find({board: req.params.board})
        .sort({bumped_on:1})
        .select('_id text created_on bumped_on replies')
        .limit(10)
        .where('replies').slice(-3)
        .exec(function(err, doc){
          if (err) res.send("Error");
          res.json(doc);
        })
    })
    .delete(function(req, res){
    Message.findById(req.body.thread_id, function (err, doc){
      if (err) res.send("DB Error, failed to find document");
      if (doc == null){
        res.send("document not found");
      } else if(doc.delete_password != req.body.delete_password){
        res.send("incorrect password");
      } else {
        Message.deleteOne({_id: req.body.thread_id}, function(err, doc){
          if (err) res.send("DB Error, failed to delete document");
          else {
            res.send('success');
          };
        })
      }
    })
  })
  .put(function(req, res){
    console.log(res.body);
    Message.updateOne({_id: req.body.report_id}, {reported: true}, function(err, doc){

      if (err) res.send("DB Error, failed to update db");
      if (doc.nModified !=0) res.send("success");
      else res.send ("failure");
      
    })
  })
    
  app.route('/api/replies/:board')
    .post(function(req, res){
      var reply = ({
        text: req.body.text,
        created_on: new Date,
        delete_password: req.body.delete_password,
        reported: false
      })
      var update = {
        bumped_on: new Date,
        $push: {
          replies: reply
        }
      }
      Message.findByIdAndUpdate(req.body.thread_id, update, {new: true},  function(err,doc){
        if (err) res.send("Failed to post reply");
        
        res.redirect('/b/'+req.params.board+'/'+req.body.thread_id);
      })
    })
  .get(function(req, res){
    Message.find({_id: req.query.thread_id, board: req.params.board}, function(err, doc){
      if (err) res.send("DB Error. Failed to send data");
      res.json(doc);
    
    })
  })
  .delete(function(req, res){
    var query = {
      board: req.params.board,
      _id: req.body.thread_id,
      "replies._id": req.body.reply_id
    }
    Message.findOne(query)
      .where('replies._id').equals(req.body.reply_id)
      .exec(function(err, doc){
      if (err) res.send("DB Error, failed to find document");
      if (doc == null){
        res.send("document not found");
      }else{
        var replyPassword = ''
        doc.replies.forEach(item =>{
          if (item._id == req.body.reply_id){
            replyPassword = item.delete_password;
          }
        })
        if(replyPassword != req.body.delete_password){
          res.send("incorrect password");
        }else{
          Message.updateOne(query, {$set:{"replies.$.text":"[deleted]"}}, function (err, updated){
            res.send("sucess");
          })
        }
      }
    })
  })
  .put(function(req, res){
    var query = {
      board: req.params.board,
      _id: req.body.thread_id,
      "replies._id": req.body.reply_id
    }
    Message.updateOne(query, {$set:{"replies.$.reported":true}}, function(err,doc){
      if (err) res.send("DB Error, failed to update db");
      if (doc.nModified !=0) res.send("success");
      else res.send ("failure");
    })
          
  })
};

