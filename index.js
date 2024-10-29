const { fetchISSFlyOverTimes } = require('./iss');
const { nextISSTimesForMyLocation } = require('./iss');

// Replace with coordinates from fetchCoordsByIP or use test coordinates directly
const testCoords = { latitude: '49.27670', longitude: '-123.13000' };

fetchISSFlyOverTimes(testCoords, (error, passTimes) => {
  if (error) {
    console.log("It didn't work!", error.message);
    return;
  }
  console.log("It worked! Returned flyover times:", passTimes);

  nextISSTimesForMyLocation((error, passTimes) => {
    if (error) {
      return console.log("It didn't work!", error.message);
    }
    
    // Success, print out each pass time in a readable format
    for (const pass of passTimes) {
      const datetime = new Date(pass.risetime * 1000);
      const duration = pass.duration;
      console.log(`Next pass at ${datetime} for ${duration} seconds!`);
    }
  });
});
