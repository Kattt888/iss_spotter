const { nextISSTimesForMyLocation } = require('./iss_promised');

// Helper function to format and print flyover times
const printPassTimes = (passTimes) => {
  passTimes.forEach(pass => {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    console.log(`Next pass at ${datetime} for ${pass.duration} seconds!`);
  });
};

// Fetch and print ISS flyover times
nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work:", error.message);
  });

