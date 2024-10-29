const { fetchMyIP, fetchCoordsByIP } = require('./iss');

// get the IP and then fetch the coordinates
fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error.message);
    return;
  }

  console.log('It worked! Returned IP:', ip);

  // use the IP to fetch coordinates
  fetchCoordsByIP(ip, (error, coords) => {
    if (error) {
      console.log("It didn't work!", error.message);
      return;
    }

    console.log('It worked! Returned Coords:', coords);
  });
});
