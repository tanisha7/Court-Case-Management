//jshint esversion:6

var express = require("express");
var bodyParser = require("body-parser");
const mongoose = require('mongoose');
var session = require('express-session');
var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(express.static('assets'));
app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.connect('mongodb://localhost:27017/CourtDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var db = mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback) {
  console.log("connection succeeded");
})

app.post("/user", function(req, res) {
  const password = req.body.loginPass;
  const id = req.body.loginId;
  const job = req.body.loginJob;
  if (job === "Party Name") {
    db.collection('userDetails').findOne({
      password: password,
      cnnNo: id
    }, function(err, uInfo) {
      if(!err){
        res.sendFile(__dirname + "/failure.html");
      }
      res.render("user", {
        name: uInfo.name,
        cnn:uInfo.cnn,
        email :uInfo.email,
        contact : uInfo.contact,
        dc: uInfo.dc,
        caseType: uInfo.caseType,
        caseNo:uInfo.caseNo,
        date:uInfo.date
      });
    });
  }

  else if (job === "Adminstrator") {
    if (id === '') {
      if (password === "") {
        res.sendFile(__dirname + '/signup_success.html');
      } else {
        res.sendFile(__dirname + "/failure.html");
      }
    }

   else {
      res.sendFile(__dirname + "/failure.html");
    }
  }

  else {
    db.collection('staffDetails').findOne({
      password: password,
      id: id
    }, function(err, sInfo) {
      if(!err){
        res.sendFile(__dirname + "/failure.html");
      }
        res.render(job, {
          name: sInfo.name,
          id:sInfo.id,
          email :sInfo.email,
          contact : sInfo.contact,
          dc: sInfo.dc,
          job: sInfo.job
        });
    });
  }
});

app.post("/failure.html", function(req, res) {
  res.redirect("/");
});
app.post("/login.html", function(req, res) {
  res.redirect("/");
});
app.post("/speech.html", function(req, res) {
  res.sendFile(__dirname + '/speech.html');
});

app.get('/', function(req, res) {
  res.set({
    'Access-control-Allow-Origin': '*'
  });
  return res.sendFile(__dirname + '/login.html');
}).listen(3000)


console.log("server listening at port 3000");
