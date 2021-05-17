/* eslint-disable no-undef */
const express = require('express');
const app = express();
const cors = require('cors');

const usersRoutes = require('./app/routes/userRoutes');
const plantsRoutes = require('./app/routes/plantRoutes');

const corsOptions = {
  origin: 'http://localhost:8082'
};

app.use(cors(corsOptions));
// Add middleware for parsing JSON and urlencoded data and populating `req.body`
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// ********** Routes *******************
app.use('/api/v1', usersRoutes);
app.use('/api/v1', plantsRoutes);

// ************** Start Up *****************
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
  console.log('http://localhost:8080/');
});