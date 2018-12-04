'use strict';

// application dependencies
const express = require('express'); // JS library for building APIs
const cors = require('cors'); // 'Cross Origin Resource Sharing' - sharing across domains

// get project environment variables
require('dotenv').config();
  // in .env file

// application constants
const PORT = process.env.port || 3000;
const app = express();

// application middleware (not that important yet)
app.use(cors());

// create API test route
// app.get('/testroute', function(req,res) { // request
//   let animal = {type: 'turtle', name: 'tim'}; // stuff for server to do
//   res.json(animal); // response is a JSON file
// });

// create route for sample data
app.get('/location', (req,res) => {
  //TODO: capture location data (use helper function)
  console.log('my request object',req);
  const locationData = searchToLatLong(req.query.data);
  res.json(locationData);
});

// helper functions for getlocation

function searchToLatLong(query) { // build and return object from query
  const geoData = require('./data.json'); // get the data file
  const location = new Location(geoData.results[0]); // create object from returned data
  location.search_query = query;
  return location;
}

function Location (data) {
  this.latitude = data.geometry.location.lat;
  this.longtitude = data.geometry.location.lng;
  this.formatted_query = data.formatted_address;
}




app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
