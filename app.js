const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const login=require("login.js");

const app = express();


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

mongoose.connect("mongodb://localhost:27017/courtDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const partyDetailSchema = {
  partyName1: String,
  partyName2: String,
  caseno: String,
  cnn: String,
  ctype: String,
  year: String,
  category: String,
  date_of_filling: String,
  date_of_register: String,
  date_of_disposal: String,
  caseBetween: String,
  status: String

};
const AdminUser = mongoose.model("AdminUser", partyDetailSchema);
const user1 = new AdminUser({
  partyName1: "Mr Sandeep Bindra",
  partyName2: "Dr. Ambedkar International Centre",
  caseno: "5517(2019)",
  cnn: "5517",
  year: "2019",
  category: "Civil Case",
  date_of_filling: "17-05-2019",
  date_of_register: "17-05-2019",
  caseBetween: "M/S MOETS Catering Services throught sole proprietor Mr Sandeep Bindra VS Dr. Ambedkar International Centre",
  status: "Pending"


});
const user2 = new AdminUser({
  partyName1: "Centre of Applied Politics",
  partyName2: "Govt of India US ANR",
  caseno: "500(2019)",
  cnn: "500",
  year: "2019",
  category: "Civil Case",
  date_of_filling: "02-08-2019",
  date_of_register: "02-08-2019",
  date_of_disposal: "10-10-2019",
  caseBetween: "Centre Of  Applied Politics VS  Govt Of & ANR",
  status: "Disposed"
});
const user3 = new AdminUser({
  partyName1: "Centre of Applied Politics",
  partyName2: "Govt of India & ANR",
  caseno: "5513(2019)",
  cnn: "5513",
  year: "2019",
  category: "Civil Case",
  date_of_filling: "03-07-2019",
  date_of_register: "04-07-2019",
  date_of_disposal: "06-08-2019",
  caseBetween: "Centre Of  Applied Politics VS  Govt Of & ANR",
  status: "Disposed"
});
const user4 = new AdminUser({
  partyName1: "Rajesh Sharma",
  partyName2: "Mohd. Hakim Khan",
  caseno: "4000(2017)",
  cnn: "4000",
  year: "2017",
  category: "Civil Case",
  date_of_filling: "02-03-2017",
  date_of_register: "02-03-2017",
  caseBetween: "Rajesh Sharma VS  Mohd. Hakim Khan",
  status: "Pending"
});
const user5 = new AdminUser({
  partyName1: "Ajainder Kumar",
  partyName2: "Franklin Institue of Air Hostess",
  caseno: "3200(2017)",
  cnn: "3200",
  year: "2017",
  category: "Civil Case",
  date_of_filling: "25-09-2017",
  date_of_register: "25-09-2017",
  caseBetween: "Ajainder Kumar VSFranklin Institue of Air Hostess(Recovery Of Money)",
  status: "Pending"
});
const user6 = new AdminUser({
  partyName1: "Praveen",
  partyName2: "State",
  caseno: "2200(2011)",
  cnn: "2200",
  year: "2011",
  category: "Criminal Case",
  date_of_filling: "27-09-2011",
  date_of_register: "28-09-2011",
  caseBetween: "Praveen VS State(deceased)",
  status: "Disposed"
});


app.post('/adminInsert', function(req, res) {
  const partyName1 = req.body.partyName1
  const partyName2 = req.body.partyName2
  const caseno = req.body.caseno
  const cnn = req.body.cnn
  const year = req.body.year
  const category = req.body.category
  const date_of_filling = req.body.date_of_filling
  const date_of_register = req.body.date_of_register
  const caseBetween = req.body.caseBetween
  const status = req.body.status

  var data = {
    'partyName1': partyName1,
    'partyName2': partyName2,
    'caseno': caseno,
    'cnn': cnn,
    'year': year,
    'category': category,
    'date_of_filling': date_of_filling,
    'date_of_register': date_of_register,
    'caseBetween': caseBetween,
    'status': status

  }
  db.collection('adminusers').insertOne(data, function(err, collection) {
    if (err) {
      res.sendFile(__dirname + "/failure.html");
    } else {
      console.log("Record inserted Successfully");
    }
  });
  res.redirect('/adminDetails')
});

const defaultCases = [user1, user2, user3, user4, user5, user6];

app.get("/", function(req, res) {

  AdminUser.find({}, function(err, foundItems) {

    if (foundItems.length === 0) {
      AdminUser.insertMany(defaultCases, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully savevd default items to DB.");
        }
      });
      res.redirect("/");
    } else {
      res.sendFile(__dirname + "/home.html");
    }
  });

});


app.get("/search.html", function(req, res) {
  res.sendFile(__dirname + "/search.html");

});

app.post("/searchR", function(req, res) {
  const cnn = req.body.searchcnn;
  const year = req.body.searchyear;
  AdminUser.findOne({
    cnn: cnn
  }, function(err, foundRes) {
    if (!err) {
      if (!foundRes) {
        res.sendFile(__dirname + "/failureSearch.html");
      } else {
        res.render("searchResult", {
          caseBet: foundRes.caseBetween,
          cnn: foundRes.caseno,
          caseType: foundRes.category,
          cstatus: foundRes.status,
          dateOfFile: foundRes.date_of_filling,
          dateOfRegister: foundRes.date_of_register,
          imageName: cnn
        });


      }

    }

  });

});
app.post("/search.html", function(req, res) {
  res.redirect("/");
});
app.post("/failureSearch.html", function(req, res) {
  res.redirect("/");
});
const postSchema = {
  title: String,
  content: String
};
const Post = mongoose.model("Post", postSchema);

app.get("/compose", function(req, res) {
  // res.redirect("/userPost");
});


app.post("/compose", function(req, res) {
  console.log(req.body)
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });


  post.save(function(err) {
    if (!err) {
      res.redirect("/userPost");
    }
  });

});
app.post("/userPost", function(req, res) {
  Post.find({}, function(err, posts) {
    res.render("Post", {
      title: homeStartingContent,
      posts: posts
    });
  });

});

app.get("/userPost", function(req, res) {
  Post.find({}, function(err, posts) {
    res.render("Post", {
      title: homeStartingContent,
      posts: posts
    });
  });

});


const homeStartingContent = " NOTICE BOARD";

app.get("/posts/:postId", function(req, res) {
  const requestedPostId = req.params.postId;
  Post.findOne({
    _id: requestedPostId
  }, function(err, post) {
    res.render("readMore", {
      title: post.title,
      content: post.content
    });
  });

});


var db = mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback) {
  console.log("connection succeeded");
})
app.get('/login.html', function(req, res) {
  res.set({
    'Access-control-Allow-Origin': '*'
  });
  return res.sendFile(__dirname + '/login.html');
});
app.post("/user", function(req, res) {
  const password = req.body.loginPass;
  const id = req.body.loginId;
  const job = req.body.loginJob;
  if (job === "Party Name") {
    UserDetail.findOne({
      password: password,
      cnnNo: id
    }, function(err, uInfo) {
      if (!err) {
        if (!uInfo) {
          res.sendFile(__dirname + "/failure.html");
        } else {
          //  console.log(uInfo);
          res.render("userP", {
            name: uInfo.name,
            cnn: uInfo.cnnNo,
            email: uInfo.email,
            contact: uInfo.contact,
            dc: uInfo.dc,
            caseType: uInfo.caseType,
            caseNo: uInfo.caseNo,
            dateOfFile: uInfo.date,
            dateOfRegister: uInfo.date,
            cstatus: "Pending"
          });
        }
      }
    });
  } else if (job === "Adminstrator") {
    if (id === 'adm2020') {
      if (password === "12345678") {
        res.sendFile(__dirname + "/admin.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
  } else {
    StaffDetail.findOne({
      password: password,
      id: id
    }, function(err, sInfo) {
      if (!err) {
        if (!sInfo) {
          res.sendFile(__dirname + "/failure.html");
        } else {
          res.render(job, {
            name: sInfo.name,
            id: sInfo.id,
            email: sInfo.email,
            contact: sInfo.contact,
            dc: sInfo.dc,
            job: sInfo.job
          });
        }
      }
    });
  }
});
app.get("/adminDetails", function(req, res) {
  AdminUser.find({}, function(err, info) {
        res.render("adminDB", {
         adminInfo:info
      });
      })
    });
app.post("/adminDetails", function(req, res) {
  AdminUser.find({}, function(err, info) {
        res.render("adminDB", {
         adminInfo:info
      });
      })
    });
app.post("/caseDetails", function(req, res) {
  CaseDetail.find({}, function(err, info) {
        res.render("caseDB", {
          caseInfo:info
        });
  });
});
staffSchema={
  id: String,
  name:String,
  email:String,
  contact:String,
  job :String,
  dc:String,
  date:String,
  password:String
}
const StaffDetail=mongoose.model("StaffDetail",staffSchema)

caseSchema={
  sessionNo: String,
  magistrate: String,
  cnnNo1: String,
  cnnNo2: String,
  caseText: String,
  date: String,
  lawyer1_ID: String,
  lawyer2_ID: String,
  stenographer_ID: String,
  time: String
}
const CaseDetail=mongoose.model("CaseDetail",caseSchema)
userSchema={
  name:String,
  email:String,
  contact:String,
  caseType:String,
  caseNo:String,
  dc:String,
  cnnNo:String,
  date:String,
  password:String
}
const UserDetail=mongoose.model("UserDetail",userSchema)

app.post("/staffDetails", function(req, res) {
  StaffDetail.find({}, function(err, info) {
    console.log(info);
     res.render("staffDB", {
           staffInfo:info
         });
    })
});
app.post("/noticeDetails", function(req, res) {
  Post.find({}, function(err, info) {
        res.render("noticeDB", {
          noticeInfo:info
        });
  });
});
app.post("/userDetails", function(req, res) {
  UserDetail.find({}, function(err, info) {
        res.render("userDB", {
          userInfo:info
        });
  });
});


app.post("/failure.html", function(req, res) {
  res.redirect("/");
});
// app.post("/search.html",function(req,res){
//   res.redirect("/");
// });
app.post("/login.html", function(req, res) {
  res.redirect("/");
});
app.post("/speech.html", function(req, res) {
  res.sendFile(__dirname + '/speech.html');
});
app.post('/loginStaff', function(req, res) {
  const name = req.body.sName;
  const email = req.body.sEmail;
  const contact = req.body.sContactH + req.body.sContact;
  const dc = req.body.sDC;
  const date = req.body.sDate;
  const password = req.body.sPassword;
  const job = req.body.sJob;
  const id = req.body.sId;

  const data = {
    id: id,
    name: name,
    email: email,
    contact: contact,
    job: job,
    dc: dc,
    date: date,
    password: password

  }
  if (req.body.sPassword === req.body.sRePassword) {
    StaffDetail.create(data, function(err, collection) {
      if (err) {
        res.sendFile(__dirname + "/failure.html");
      } else {
        console.log("Record inserted Successfully");
      }
    });
    return res.sendFile(__dirname + '/login.html');
  } else {
    res.sendFile(__dirname + "/failure.html");
  }
});

app.post("/failure.html", function(req, res) {
  res.redirect("/");
});

app.get('/register.html', function(req, res) {
  res.set({
    'Access-control-Allow-Origin': '*'
  });
  return res.sendFile(__dirname + '/regStaff.html');
})
app.get('/regStaff.html', function(req, res) {
  res.set({
    'Access-control-Allow-Origin': '*'
  });
  return res.sendFile(__dirname + '/regStaff.html');
})
app.get('/regUser.html', function(req, res) {
  res.set({
    'Access-control-Allow-Origin': '*'
  });
  return res.sendFile(__dirname + '/regUser.html');
})
app.post('/loginUser', function(req, res) {
  const name = req.body.uName;
  const email = req.body.uEmail;
  const contact = req.body.uContactH + req.body.uContact;
  const dc = req.body.uDC;
  const caseT = req.body.uCaseT;
  const caseN = req.body.uCaseN;
  const date = req.body.uDate;
  const password = req.body.uPassword;
  const cnn = req.body.uCaseN + req.body.uYY;

  const data = {
    cnnNo: cnn,
    name: name,
    email: email,
    contact: contact,
    caseType: caseT,
    caseNo: caseN,
    dc: dc,
    date: date,
    password: password

  }
  if (req.body.uPassword === req.body.uRePassword) {
    UserDetail.create(data, function(err, collection) {
      if (err) {
        res.sendFile(__dirname + "/failure.html");
      } else {
        console.log("Record inserted Successfully");
      }
    });
    return res.sendFile(__dirname + '/login.html');
  } else {
    res.sendFile(__dirname + "/failure.html");
  }
});

// Speech JavaScript
app.post('/speech', function(req, res) {
  //console.log(req.body)
  const cnn1 = req.body.cnnNo1;
  const cnn2 = req.body.cnnNo2;
  const textConv = req.body.text;
  const date = req.body.date;
  const lawyer1 = req.body.lawyer1;
  const lawyer2 = req.body.lawyer2;
  const sessionNo = req.body.sessionNo;
  const magistrate = req.body.magistrate;
  const stenoId = req.body.stenoId;
  const time = req.body.time;

  const data = {
    sessionNo: sessionNo,
    magistrate: magistrate,
    cnnNo1: cnn1,
    cnnNo2: cnn2,
    caseText: textConv,
    date: date,
    lawyer1_ID: lawyer1,
    lawyer2_ID: lawyer2,
    stenographer_ID: stenoId,
    time: time
  }
  CaseDetail.create(data, function(err, collection) {
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

app.get('/speech.html', function(req, res) {
  res.set({
    'Access-control-Allow-Origin': '*'
  });
  return res.sendFile(__dirname + '/speech.html');
})



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
