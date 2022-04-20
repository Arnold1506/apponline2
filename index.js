const http = require('http');
const express = require('express')
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
const mongoose = require('mongoose');
const { Schema } = mongoose;
var User = require('./models/Doctor');
var Schedule = require('./models/Schedule');
const Slot = require('./models/Slot');
var mongo = require('mongodb');
// app.use(auth);
const uuid = require('uuid').v4
var session = require('express-session');
var path = require('path');
var sessionStorage = require('sessionstorage');
const PORT = process.env.PORT || 8000;
//session

// app.use(bodyParser.json());
app.use(express.static("client/build/"));
app.use(session({
  genid: (req) => {
    console.log('Inside the session middleware')
    console.log(req.sessionID)
    return uuid() // use UUIDs for session IDs
  },
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))


// Connection URI
const server = http.createServer(app);
const url = "mongodb+srv://shravan:ravilata@cluster0.yyer7.mongodb.net/Appoinline?retryWrites=true&w=majority";
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Database connected');
});

app.get('/*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
})

app.get('/', (req, res) => {
  res.send('Hello World!');
  res.send(`Hit home page. Received the unique id: ${uniqueId}\n`)
});

app.post('/success', (req, err) => {
  let { items } = req.body
  console.log(items);
  const newUser = new User({
    fname: items.fname,
    lname: items.lname,
    email: items.email,
    userType: items.type,
    password: items.password
  });
  newUser.save()
    .then((newUser) => {
      console.log("Record inserted");
    })
    .catch((err) => console.log(err));
})

app.post('/slotbooking', (req, err) => {
  let { items } = req.body;
  console.log(items);
  const newSlot = new Slot({
    id: items.id,
    patientId: items.patientId,
    stime: items.stime,
    etime: items.etime
  });
  newSlot.save()
    .then((newSlot) => {
      console.log("Record Inserted");
    })
    .catch((err) => console.log(err));

});


app.post('/schedule', (req, err) => {
  let { schedule } = req.body;
  console.log(schedule);
  const newSchedule = new Schedule({
    email: schedule.email,
    date: schedule.date,
    stime: schedule.stime,
    etime: schedule.etime
  });
  console.log("newSchedule");
  console.log(newSchedule);
  newSchedule.save()
    .then((e) => {
      console.log("Record inserted");
    })
    .catch((err) => console.log(err));

})

app.post('/patientslist', (req, res) => {
  let { items } = req.body;
  let query = { id: items }
  let data_array = [];
  Slot.find(query)
    .then(patients => {
      // res.json({ patients });
      // console.log(patients.length);
      User.find({ userType: 'patient' })
        .then(allpat => {
          console.log(allpat);
          for (i = 0; i < allpat.length; i++) {
            for (j = 0; j < patients.length; j++) {
              console.log(allpat[i]._id + " " + patients[j].patientId);
              if (allpat[i]._id == patients[j].patientId) {
                let my_object = {};
                my_object.fname = (allpat[i].fname);
                my_object.lname = allpat[i].lname;
                my_object.id = (allpat[i]._id);
                data_array.push(my_object);
                // console.log("yes");
                console.log(data_array);
              }
            }
          }
          res.json(data_array);
        });

    })
    .catch(err => console.log(err));
});

app.post('/login', (req, res) => {
  let { items } = req.body;
  console.log(items);
  let query = { email: items.email, password: items.password };
  User.find(query)
    .then(users => {
      console.log(users, "shravan");
      if (users) {
        console.log("rignt matched");
        // console.log(users);
        res.send(users);
      }
      else {
        let mes = "mee";
        res.send({ mes: mes });
      }
    })
    .catch(err => console.log(err));
});


app.post('/delete', (req, res) => {
  let { items } = req.body;
  console.log(items);
  let query = { patientId: items }
  Slot.deleteOne(query)
    .then(console.log("Deleted"))
    .catch(err => console.log(err));
});


app.post('/appointments', async (req, res) => {
  let { items } = req.body;
  console.log(items);
  let data_array = [];
  let res_array = [];
  let users = {};
  let query = { patientId: items };
  await Slot.find(query)
    .then(async users => {
      for (i = 0; i < users.length; i++) {
        await Schedule.findById(users[i].id)
          .then(async x => {
            let q = { email: x.email };
            await User.find(q)
              .then(y => {
                console.log(y)
                for (k = 0; k < y.length; k++) {
                  let my_object1 = {};
                  my_object1.fname = y[k].fname;
                  my_object1.lname = y[k].lname;
                  my_object1.email = x.email;
                  my_object1.starttime = x.stime;
                  my_object1.endtime = x.etime;
                  my_object1.date = x.date;
                  // console.log(my_object1);
                  if (x.date == "2021-07-17") {
                    res_array.push(my_object1);
                  }
                }
              })
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
      }
    })
    .catch(err => console.log(err));
  res.json(res_array);
});


app.post('/pastappointments', async (req, res) => {
  let { items } = req.body;
  console.log(items);
  let data_array = [];
  let res_array = [];
  let users = {};
  let query = { patientId: items };
  await Slot.find(query)
    .then(async users => {
      for (i = 0; i < users.length; i++) {
        await Schedule.findById(users[i].id)
          .then(async x => {
            let q = { email: x.email };
            await User.find(q)
              .then(y => {
                console.log(y)
                for (k = 0; k < y.length; k++) {
                  let my_object1 = {};
                  my_object1.fname = y[k].fname;
                  my_object1.lname = y[k].lname;
                  my_object1.email = x.email;
                  my_object1.starttime = x.stime;
                  my_object1.endtime = x.etime;
                  my_object1.date = x.date;
                  // console.log(my_object1);
                  // if (x.date  "2021-07-17") {
                    res_array.push(my_object1);
                  // }
                }
              })
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
      }
    })
    .catch(err => console.log(err));
  res.json(res_array);
});



app.post('/name', (req, res) => {
  let items = req.body;
  let query = { email: items.items };
  console.log(items.items);
  User.find(query)
    .then(s => {
      console.log("akmsakmdkamk");
      console.log(s);
      res.json(s);
    })
    .catch(err => console.log(err));
})

app.get('/doctorlist', (req, res) => {
  let fname;
  let query = { userType: "doctor" };

  User.find(query)
    .then(users => {
      res.json({ users });
    })
    .catch(err => console.log(err));
});


app.post('/slot', (req, res) => {
  // let query = {email: "rohan@gmail.com"};
  let items = req.body;
  console.log(items);
  let query = { email: items.email };
  Schedule.find(query)
    .then(schedules => {
      res.json({ schedules });
    })
    .catch(err => console.log(err));
});

// if (process.env.NODE_ENV == "production") {
//   app.use(express.static("client/build"));
// }

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build",     
  "index.html"));
});

app.use(express.static('./client/build'));

app.set('port', process.env.PORT  || 5000);
console.log("++++++++++" + app.get('port'));

// app.listen(PORT, () => {
//   console.log(`Example app listening on PORT ${PORT} !`)
// });


