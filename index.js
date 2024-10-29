const { fetchISSFlyOverTimes } = require('./iss');

// Replace with coordinates from fetchCoordsByIP or use test coordinates directly
const testCoords = { latitude: '49.27670', longitude: '-123.13000' };

fetchISSFlyOverTimes(testCoords, (error, passTimes) => {
  if (error) {
    console.log("It didn't work!", error.message);
    return;
  }
  console.log("It worked! Returned flyover times:", passTimes);
});
