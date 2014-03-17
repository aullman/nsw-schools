// Replace the schools variable with the data scraped from 'scrapeBetterEducation.js'
// and run this file,
// To run: 
//   npm install request
//   node cleanData.js > cleanedData.js

var request = require('request');
var schools = []; // Replace with the output of scrapeBetterEducation.js

var schoolMap = {},
  requestQueue = [],
  requestInterval;

function fetchLatLong(address) {
  console.error("Fetch for " + address);
  request({
    url: 'https://maps.googleapis.com/maps/api/geocode/json',
    qs: {
      address: address + " Australia",
      sensor: 'false'
    }
  }, function(err, msg, res) {
    if (!err) {
      res = JSON.parse(res);
      if (res && res.results.length > 0) {
        schoolMap[address].latlong = res.results[0].geometry.location.lat.toString() + "," + res.results[0].geometry.location.lng.toString();
      } else {
        console.error("Unknown response", res);
      }
    } else {
      console.error("Error: ", err);
    }
  });
}

function enqueueAddress(address) {
  requestQueue.push(address);
  if (!requestInterval) requestInterval = setInterval(function () {
    console.error("Interval: " + requestQueue.length);
    if (requestQueue.length > 0) {
      fetchLatLong(requestQueue.pop());
    } else {
      clearInterval(requestInterval);
      console.log(Object.keys(schoolMap).map(function(key){return schoolMap[key];}));
      process.exit();
    }
  }, 300);
}



schools.forEach(function (school) {
  var key = school.label;
  if (!schoolMap.hasOwnProperty(school.label)) {
    schoolMap[key] = school;
    schoolMap[key].label = school.label.substr(0, school.label.indexOf(school.suburb)-1);
    // TODO: Lookup the location using the Google Geocoding API
    // https://developers.google.com/maps/documentation/geocoding/
    enqueueAddress(key);
  } else if (school.score2010){
    schoolMap[key].score2010 = school.score2010;
  } else if (school.score2011) {
    schoolMap[key].score2011 = school.score2011;
  } else if (school.score2012){
    schoolMap[key].score2012 = school.score2012;
  } else if (school.score2013){
    schoolMap[key].score2013 = school.score2013;
    // Use the 2013 enrolments
    schoolMap[key].enrolments = school.enrolments;
  }
});