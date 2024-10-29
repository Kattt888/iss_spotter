const request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address.
 * @param {Function} callback - A callback function to pass back an error or the IP string.
 */
const fetchMyIP = function(callback) {
  const url = 'https://api.ipify.org?format=json';
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

/**
 * Makes a single API request to retrieve the user's coordinates (latitude & longitude) based on their IP.
 * @param {string} ip - The IP address.
 * @param {Function} callback - A callback function to pass back an error or the coordinates object.
 */
const fetchCoordsByIP = function(ip, callback) {
  const url = `https://freegeoip.app/json/${ip}`;
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching coordinates for IP: ${body}`), null);
      return;
    }
    const { latitude, longitude } = JSON.parse(body);
    callback(null, { latitude, longitude });
  });
};

/**
 * Makes a single API request to retrieve upcoming ISS fly over times for the given coordinates.
 * @param {Object} coords - An object with keys `latitude` and `longitude`.
 * @param {Function} callback - A callback function to pass back an error or the flyover times array.
 */
const fetchISSFlyOverTimes = function(coords, callback) {
  const url = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }
    const passes = JSON.parse(body).response;
    callback(null, passes);
  });
};

/**
 * Orchestrates multiple API requests to determine the next 5 upcoming ISS flyovers for the user's current location.
 * @param {Function} callback - A callback with an error or results.
 */
const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      callback(error, null);
      return;
    }

    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        callback(error, null);
        return;
      }

      fetchISSFlyOverTimes(coords, (error, passTimes) => {
        if (error) {
          callback(error, null);
          return;
        }

        // If successful, return the pass times
        callback(null, passTimes);
      });
    });
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };
