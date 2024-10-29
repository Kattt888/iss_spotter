const request = require('request');

const fetchMyIP = function(callback) {
  const url = 'https://api.ipify.org?format=json';

  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    // Check for a non-200 status code and return only the status code with a generic message
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP.`), null);
      return;
    }

    // Parse the body to get the IP address
    try {
      const data = JSON.parse(body);
      const ip = data.ip;
      callback(null, ip);
    } catch (parseError) {
      callback(Error("Failed to parse IP address"), null);
    }
  });
};

// Function to fetch IP coordinates 
const fetchCoordsByIP = function(ip, callback) {
  const url = `https://ipwho.is/${ip}`;

  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    // Parse the body
    const data = JSON.parse(body);

    // Check for success status in the response
    if (!data.success) {
      const message = `Success status was false. Server message says: ${data.message} when fetching for IP ${ip}`;
      callback(Error(message), null);
      return;
    }

    // Extract latitude and longitude
    const { latitude, longitude } = data;
    callback(null, { latitude, longitude });
  });
};


module.exports = { fetchMyIP, fetchCoordsByIP };

