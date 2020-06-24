//jshint esversion:6

var express = require("express");
var bodyParser = require("body-parser");
//const ejs = require("ejs");


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

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(express.static('assets'));
app.use(bodyParser.urlencoded({
  extended: true
}));


app.post('/login', function(req, res) {
  const name = req.body.sName;
  const email = req.body.sEmail;
  const contact = req.body.sContactH + req.body.sContact;
  const dc = req.body.sDC;
  const date = req.body.sDate;
  const password = req.body.sPassword;
  const job = req.body.sJob;
  const id = req.body.sId;

  var data = {
    "id":id,
    "name": name,
    "email": email,
    "contact": contact,
    "job": job,
    "dc": dc,
    "date": date,
    "password": password

  }
  if (req.body.sPassword === req.body.sRePassword) {
    db.collection('staffDetails').insertOne(data, function(err, collection) {
      if (err) throw err;
      console.log("Record inserted Successfully");

    });

    return res.sendFile(__dirname + '/login.html');
  }
  else {
    res.sendFile(__dirname + "/failure.html");
  }
});

app.post("/failure.html", function(req, res) {
  res.redirect("/");
});

app.get('/', function(req, res) {
  res.set({
    'Access-control-Allow-Origin': '*'
  });
  return res.sendFile(__dirname + '/regStaff.html');
}).listen(3000)


console.log("server listening at port 3000");
