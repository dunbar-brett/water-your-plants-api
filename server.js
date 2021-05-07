// https://bezkoder.com/node-js-jwt-authentication-postgresql/#Create_Nodejs_App
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { pool } = require('./config/db.config')
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var corsOptions = {
  origin: 'http://localhost:8082'
};

app.use(cors(corsOptions));

// *************** DB setup *************




// ********** Routes *******************

// jsonParser for typical calls ({POST}/api/users (creates user))
// urlencoded for authorized calls ({POST}/login)

// simple route
app.get('/', (req, res) => {
  //res.json({ message: "Welcome to water your plants application." });
  res.send('<h1>Welcome to water your plants application!</h1>')
});

app.get('/users', (req, res) => {
  //res.json({ message: "Welcome to water your plants application." });
  res.send('<h1>Welcome to water your plants application.</h1>')
});

app.get('/users/login', (req, res) => {
  //res.json({ message: "Welcome to water your plants application." });
  res.send('<h1>Welcome to water your plants application.</h1>')
});

app.post('/users/register', (req, res) => {
  let {name, email, password} = req.body;

  
  let errors = [];
  // todo
  // check if all required info exists and are valid
  if (!name || !email || !password) {
    errors.push({message: 'Request has missing data.'});
  }

  if (password.length < 8) {
    errors.push({message: 'Password is less than 8 characters'});
  }


  // verify that user email doesn't exist in db
  // hash password
  // store user in db
  
  if (errors.length > 1) {
    res.json(errors);
    return;
  }

  res.json({
    message:'User Added'
  });
});

// ************** Start Up *****************
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
  console.log('http://localhost:8080/');
});










// deprecated 
// // parses requests of content-type - application/json
// app.use(bodyParser.json());

// // parse requests of content-type - application/x-ww-form-urlencoded
// app.use(bodyParser.urlencoded({extended: true}));

// const db = require('./models');
// const Role = db.role;

// // TODO: remove force: true when going to prod
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync db');
//   initial();
// });

// //temp TODO: remove for prod
// function initial() {
//   Role.create({
//     id: 1,
//     name: "user"
//   });

//   Role.create({
//     id: 2,
//     name: "moderator"
//   });

//   Role.create({
//     id: 3,
//     name: "admin"
//   });
// }
