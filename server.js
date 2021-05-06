// https://bezkoder.com/node-js-jwt-authentication-postgresql/#Create_Nodejs_App
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();


var corsOptions = {
  origin: 'http://localhost:8082'
};

app.use(cors(corsOptions));

// deprecated 
// // parses requests of content-type - application/json
// app.use(bodyParser.json());

// // parse requests of content-type - application/x-ww-form-urlencoded
// app.use(bodyParser.urlencoded({extended: true}));

// better
// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });


// *************** DB setup *************
const db = require('./models');
const Role = db.role;

// TODO: remove force: true when going to prod
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync db');
  initial();
});

//temp TODO: remove for prod
function initial() {
  Role.create({
    id: 1,
    name: "user"
  });

  Role.create({
    id: 2,
    name: "moderator"
  });

  Role.create({
    id: 3,
    name: "admin"
  });
}




// ********** Routes *******************

// jsonParser for typical calls ({POST}/api/users (creates user))
// urlencoded for authorized calls ({POST}/login)

// simple route
app.get('/', jsonParser, (req, res) => {
  //res.json({ message: "Welcome to water your plants application." });
  res.send('<h1>Welcome to water your plants application.</h1>')
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
  console.log('http://localhost:8080/');
});