//jshint esversion:6

var express = require("express");
var bodyParser = require("body-parser");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/CourtDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var db = mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback) {
  console.log("connection succeeded");
})

var app = express()


app.use(bodyParser.json());
app.use(express.static('assets'));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.post('/speech', function(req, res) {
  const cnn1 = req.body.cnnNo1;
  const cnn2 = req.body.cnnNo2;
  const textConv = req.body.text;
  const date = req.body.date;
  const lawyer1 = req.body.lawyer1;
  const lawyer2 = req.body.lawyer2;
  const sessionNo = req.body.sessionNo;
  const magistrate= req.body.magistrate

  var data = {
    "sessionNo":sessionNo,
    "magistrate":magistrate,
    "cnnNo1": cnn1,
    "cnnNo2": cnn2,
    "caseText": textConv,
    "date":date,
    "lawyer1":lawyer1,
    "lawyer2":lawye2,
  }
  db.collection('caseDetails').insertOne(data, function(err, collection) {
    if (err) throw err;
    console.log("Record inserted Successfully");

  });

  return res.sendFile(__dirname + '/signup_success.html');
});

/*app.get("/:id", function(req, res){
  const reqid =req.params.id;
  db.collection('caseDetails').findOne({cnn: reqid}, function(err, cInfo){
    res.render("staff", {
      cnnNo: cInfo.name,
      date:cInfo.date
    });
  });
});*/

app.get('/', function(req, res) {
  res.set({
    'Access-control-Allow-Origin': '*'
  });
  return res.sendFile(__dirname + '/speech.html');
}).listen(3000)


console.log("server listening at port 3000");
