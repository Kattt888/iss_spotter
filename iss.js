const request = require('needle');

const fetchMyIP = function(callback) {
  const url = 'https://api.ipify.org?format=json';

  // Set json option to true to automatically parse the response body
  request.get(url, { json: true }, (error, response) => {
    // Handle any error that occurred during the request
    if (error) {
      callback(error, null);
      return;
    }

    // Check for a non-200 status code
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${JSON.stringify(response.body)}`;
      callback(Error(msg), null);
      return;
    }

    // If everything is okay, extract the IP address
    const ip = response.body.ip;
    callback(null, ip);
  });
};

module.exports = { fetchMyIP };
