const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const cors = require('cors')

const mongoose = require('mongoose')
mongoose.connect(process.env.MLAB_URI)

var userSchema = new mongoose.Schema({username: {type: String, unique: true} ,
                                     exercises: [{description: String,
                                                   duration: Number,
                                                   date: Date}]
                                      });

var User = mongoose.model('User', userSchema);


app.use(cors())

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})

app.post('/api/exercise/new-user', function(req, res){
  console.log(req.body.username);
  var document = User({username: req.body.username})
  document.save(function(err,data){
    if(err) {
      res.send(err);
      return
    }
    console.log(data);
    res.json({
      username: data.username,
      _id: data._id
    });
  });
});

app.get('/api/exercise/users', function(req, res){
  User.find({}, 'username _id', (err, data)=>{
    res.json(data);
  });
});

app.post('/api/exercise/add', function(req, res){
  //Check mandatory fields
  if (!req.body.userId || !req.body.description || !req.body.duration){
    res.send("Entry not saved. Please entre all mandatory fields");
    return;
  }
  //If block for date formating
  //Populate date if not centered
  if (!req.body.date){
    req.body.date = Date.now();
  }
  //if wrong format of data entered do not proceed
  else if (!testDateValidity(req.body.date)){
    res.send("Wrong format of date entered. Enter format yyyy-mm-dd")
  }
  //if correct data enterered parse to date format
  else {
    req.body.date = Date.parse(req.body.date);
  }
  
  User.findOneAndUpdate({_id: req.body.userId}, 
                        {$push: 
                          {exercises:
                            {description: req.body.description,
                              duration: req.body.duration,
                              date: req.body.date}}},
                        {new: true},
                       function(err,data){
    if(err){
      console.log(err);
      res.send("User not found")
    }
    res.json(data);
  })
})

app.get('/api/exercise/log/:userId', function(req,res){
  User.findOne({_id:req.params.userId}, function(err, data){
    if (err){
      console.log(err)
      res.send("Error during query");
      return;
    } 
    res.json(data.exercises);
    
  })
})

app.get('/api/exercise/log',function(req, res){
  console.log(req.query.userId);
  if(!req.query.userId){
    res.send("UserId is a mandatory parameter");
    return
  }
  var query = User.findOne({_id:req.query.userId})
  query.exec(function(err, data){
    if (err) {
      res.send("Error finding user");
      return
    }
    
    //Filtering of returned array
    if(req.query.from && testDateValidity(req.query.from)){
      data.exercises = data.exercises.filter((item) => item.date > Date.parse(req.query.from))
    }
    
    if(req.query.to && testDateValidity(req.query.to)){
      data.exercises = data.exercises.filter((item) => item.date < Date.parse(req.query.to))
    }
    
    if(Number(req.query.limit) < data.exercises.length){
      data.exercises.length= Number(req.query.limit)
    }
    var resObj={
      log: data.exercises,
      count: data.exercises.length
    }
    res.json(resObj);
  });
});
function testDateValidity(str){
  return /^\d{4}-\d{2}-\d{2}$/.test(str);
}