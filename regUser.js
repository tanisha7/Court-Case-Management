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

var app = express();


app.use(bodyParser.json());
app.use(express.static('assets'));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.post('/login', function(req, res) {
    const name = req.body.uName;
    const email = req.body.uEmail;
    const contact = req.body.uContactH+req.body.uContact;
    const dc = req.body.uDC;
    const caseT=req.body.uCaseT;
    const caseN=req.body.uCaseN;
    const date = req.body.uDate;
    const password = req.body.uPassword;
    const cnn = req.body.uCaseN+req.body.uYY;

    var data = {
      'cnnNo':cnn,
      "name": name,
      "email": email,
      "contact": contact,
      "caseType": caseT,
      "caseNo":caseN,
      "dc": dc,
      "date": date,
      "password": password

    }
    if (req.body.uPassword === req.body.uRePassword) {
      db.collection('userDetails').insertOne(data, function(err, collection) {
        if (err) throw err;
        console.log("Record inserted Successfully");

      });
      return res.sendFile(__dirname + '/signup_success.html');
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
  return res.sendFile(__dirname + '/regUser.html');
}).listen(3000)


console.log("server listening at port 3000");
