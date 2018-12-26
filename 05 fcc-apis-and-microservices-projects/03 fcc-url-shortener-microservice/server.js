'use strict';

var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var dns = require('dns');

var cors = require('cors');

var app = express();

// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
mongoose.connect(process.env.MONGOLAB_URI);
var linkSchema = new mongoose.Schema({
  shortLink: Number,
  url: String,
})

const Link = mongoose.model('Link', linkSchema);


app.use(cors());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here
var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({ extended: false })

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

//This takes care of logic of new db entry creation
app.post('/api/shorturl/new', urlEncodedParser, function(req, res){
  var invalidResObj = {
        error:"invalid URL"
  };
  
  if(!(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/).test(req.body.url)){
    res.json(invalidResObj)
    return
  }
  var parsePost = req.body.url.match(/(?:www\.)([a-zA-Z]+\.[a-zA-Z]+)/)
  var domain = parsePost[1];
  var originalUrl = req.body.url;
  dns.lookup(domain, (error, address, family)=>{
    if (error){
      res.json(invalidResObj)
    }else{
      Link.findOne({url:originalUrl}, (err,data)=>{
        //If url was not found in database create new entry
        if(!data){
            //Next id value is calculated by looking at the 
            //largest value of shortLink and incremented by one
            Link.findOne({})
              .sort('-shortLink')
              .exec((errr, data)=>{
                var newId = data.shortLink+1;
                var document = Link({shortLink: newId, url: originalUrl});
                document.save((err, data)=>{
                  console.log(data)
                  res.json({
                    original_url: originalUrl,
                    short_url: newId
                  });
                });
            });
            return
          }
        //If url was found in database return existing entry in requested format.
        res.json({
          original_url: data.url,
          short_url: data.shortLink,
        });
      });
    }  
  
  });
});



app.get('/api/shorturl/:linkId',(req, res)=>{
  Link.findOne({shortLink: req.params.linkId},(err, data)=>{
    if (err){
      res.send("Link not found");
      return
    }
    res.redirect(data.url);
    
  });

});

app.listen(port, function () {
  console.log('Node.js listening ...');
});