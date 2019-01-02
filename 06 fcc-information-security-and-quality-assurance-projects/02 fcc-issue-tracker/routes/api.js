/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb');
var ObjectId = require('mongodb').ObjectID;

const CONNECTION_STRING = process.env.DB; 

module.exports = function (app) {
  
      app.route('/api/issues/:project')

        .get(function (req, res){
          var project = req.params.project;
          MongoClient.connect(CONNECTION_STRING, function(err,db){
            if (err){
              res.send("failed to connect DB");
              return
            }
            var queryObj = {}
            for (const key of Object.keys(req.query)){
              queryObj[key] = req.query[key]
            }
            db.collection(project).find(queryObj).toArray(function(err, documents){
              if(err){
                console.log("Failure to retreive documents");
              }
              res.send(documents);
            })
            db.close();
          });
        })
        .post(function (req, res){
          var project = req.params.project;
          if(!req.body.issue_title || !req.body.issue_text || !req.body.created_by){
            res.send("Fill mandatory fields");
          }else{
            MongoClient.connect(CONNECTION_STRING, function(err, db){
              if(err) {
                res.send("failed to connect DB");
                return
              }
              var issueObj = {
                _id: new ObjectId(), 
                issue_title: req.body.issue_title,
                issue_text: req.body.issue_text,
                created_by: req.body.created_by,
                assigned_to: (req.body.assigned_to || ''),
                status_text: (req.body.status_text || ''),
                created_on: new Date(),
                updated_on: new Date(),
                open: "true"
              }

              db.collection(project).save(issueObj, (err, data)=>{
                if(err) {
                  res.send("Failed to write data to DB");
                  db.close();
                  return;
                }
                console.log("Sending");
                res.json(issueObj);

              })
              db.close();
            });
          }
        })

        .put(function (req, res){
          var project = req.params.project;
          if(req.body._id.length == 24){
            MongoClient.connect(CONNECTION_STRING, function(err, db){
              if(err){
                res.send("failed to connectdb")
                return
              }
              var objectToFind = {
                _id:new ObjectId(req.body._id)
              }
              var valuesToUpdate = {
                updated_on: new Date()
              }
              for (const key of Object.keys(req.body)){
                if(req.body[key] && key!= '_id'){
                  valuesToUpdate[key] = req.body[key]
                } 
              }
              console.log("Object length: "+Object.keys(valuesToUpdate).length);
              if (Object.keys(valuesToUpdate).length == 1){
                res.send("no updated field sent")
              } else{
                db.collection(project).updateOne(objectToFind, {$set: valuesToUpdate}, function(err, data){
                  if(err){
                    res.send("Database Error: failed to update entry");
                  } else if(data.result.nModified==0){
                    res.send("could not update "+req.body._id);
                  } else {
                    res.send("successfully updated")
                  }
                })
              }
              db.close();
            })
          } else {
            res.send("could not update "+req.body._id);
          }
        })

        .delete(function (req, res){
          var project = req.params.project;
          if (!req.body._id){
            res.send("_id error");
          }
          if(req.body._id.length == 24){
            MongoClient.connect(CONNECTION_STRING, function(err, db){
              console.log("connected to DB");
              if(err){
                res.send("ERROR: failed to connect DB")
                return
              };
              var objectToDelete = {
                _id: new ObjectId(req.body._id)
              };
              db.collection(project).deleteOne(objectToDelete, function(err, data){
                if (err) {
                  res.send("ERROR: failed to delete document");
                } else if (data.result.n === 0){
                  res.send("could not delete "+req.body._id);
                } else {
                  res.send("deleted "+req.body._id);
                }
              });
              db.close();
            });
          } else {
            res.send("could not delete "+req.body._id);
          };

      });
  }
  
  