const needle = require('needle');

// fetchMyIP: Fetches the user's IP address
const fetchMyIP = () => {
  return needle('get', 'https://api.ipify.org?format=json')
    .then(response => {
      return response.body.ip;
    });
};

// fetchCoordsByIP: Fetches coordinates by IP address
const fetchCoordsByIP = (ip) => {
  return needle('get', `https://ipwho.is/${ip}`)
    .then(response => {
      const { latitude, longitude } = response.body;
      if (!latitude || !longitude) throw new Error("Failed to get coordinates");
      return { latitude, longitude };
    });
};

// fetchISSFlyOverTimes: Fetches ISS flyover times based on coordinates
const fetchISSFlyOverTimes = (coords) => {
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;
  return needle('get', url)
    .then(response => {
      if (response.body.response) return response.body.response;
      throw new Error("Failed to get flyover times");
    });
};

// nextISSTimesForMyLocation: Chains all functions to get final flyover times
const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes);
};

module.exports = { nextISSTimesForMyLocation };


