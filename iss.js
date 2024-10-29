const request = require('request');

const fetchMyIP = function(callback) {
  const url = 'https://api.ipify.org?format=json';
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP.`), null);
      return;
    }
    try {
      const data = JSON.parse(body);
      callback(null, data.ip);
    } catch (parseError) {
      callback(Error("Failed to parse IP address"), null);
    }
  });
};

const fetchCoordsByIP = function(ip, callback) {
  const url = `https://ipwho.is/${ip}`;
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    const data = JSON.parse(body);
    if (!data.success) {
      const message = `Success status was false. Server message says: ${data.message} when fetching for IP ${ip}`;
      callback(Error(message), null);
      return;
    }
    callback(null, { latitude: data.latitude, longitude: data.longitude });
  });
};

// function to fetch ISS flyover times
const fetchISSFlyOverTimes = function(coords, callback) {
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;
  
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching flyover times.`), null);
      return;
    }
    try {
      const data = JSON.parse(body);
      if (data.message !== "success") {
        callback(Error("Failed to retrieve flyover times"), null);
        return;
      }
      callback(null, data.response); // Passing the array of flyover times
    } catch (parseError) {
      callback(Error("Failed to parse flyover times data"), null);
    }
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };
