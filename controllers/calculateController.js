require('dotenv').config();
const dbPool = require('../config/db'); // Import the dbPool

async function getspotbyLimit(req, res) {
  try {
    const connection = await dbPool.getConnection();
    const [rows] = await connection.query('SELECT name FROM spots LIMIT 10');
    connection.release();

    const spotNames = rows.map((row) => row.name);

    res.json(spotNames);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function getAllSpots(req, res) {
  try {
    const connection = await dbPool.getConnection();
    const [rows] = await connection.query('SELECT * FROM spots');
    connection.release();

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// spotController.js

// Controller function for /spotname/:spotName route
async function getSpotByName(req, res) {
  const spotName = req.params.spotName;

  try {
    const connection = await dbPool.getConnection();
    const [rows] = await connection.query('SELECT name, latitude, longitude, accessible_by_cycling FROM spots WHERE name = ?', [spotName]);
    connection.release();

    if (rows.length === 1) {
      const spot = rows[0];
      res.json(spot);
    } else {
      res.status(404).json({ message: 'Spot not found' });
    }
  } catch (error) {
    console.error(error);
    if (error instanceof SyntaxError) {
      res.status(400).json({ message: 'Invalid user input' });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}


// Helper function to calculate the distance between two points (Haversine formula)
function calculateDistance(location1, location2) {
  const R = 6371; // Radius of the Earth in kilometers
  const lat1 = location1.latitude;
  const lon1 = location1.longitude;
  const lat2 = location2.latitude;
  const lon2 = location2.longitude;

  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance;
}

// Controller function for /calculate route
function calculateEstimatedTime(req, res) {
  const userLocation = {
    latitude: parseFloat(req.body.userLocation.latitude), // Convert to a floating-point number
    longitude: parseFloat(req.body.userLocation.longitude), // Convert to a floating-point number
  };

  const chosenSpot = {
    latitude: parseFloat(req.body.chosenSpot.latitude), // Convert to a floating-point number
    longitude: parseFloat(req.body.chosenSpot.longitude), // Convert to a floating-point number
    accessible_by_cycling: req.body.chosenSpot.accessible_by_cycling, // 0 or 1 indicating accessibility
  };

  const cyclingSpeed = parseFloat(req.body.cyclingSpeed); // Convert to a floating-point number
  const dailyCyclingHours = parseFloat(req.body.dailyCyclingHours); // Convert to a floating-point number

  // Verify if the chosen spot is accessible by cycling
  if (chosenSpot.accessible_by_cycling === 1) {
    // Calculate the distance between the user's location and the chosen spot
    const distanceInKm = calculateDistance(userLocation, chosenSpot);

    // Estimate the time required to cycle
    const estimatedTimeInHours = distanceInKm / cyclingSpeed * dailyCyclingHours;

    res.json({ message: 'This tourist spot is accessible by cycling', estimatedTimeInHours });
  } else {
    res.json({ message: 'This tourist spot is not accessible by cycling.' });
  }
}

function calculateEstimate(req, res) {
  const userLocation = {
    latitude: 40.4319, // Replace with user's actual latitude
    longitude: 116.5704, // Replace with user's actual longitude
  };
  const chosenSpot = {
    latitude: -27.1, // Replace with chosen spot's latitude
    longitude: -109.4, // Replace with chosen spot's longitude
  };

  // Perform the calculation based on the user's input
  // For demonstration purposes, let's assume a simple calculation:
  const distanceInKm = calculateDistance(userLocation, chosenSpot);
  const cyclingSpeed = 20; // Replace with the desired cycling speed in km/h
  const estimatedTimeInHours = distanceInKm / cyclingSpeed;

  res.json({ estimatedTimeInHours });
}

function calculatebyInput(req, res) {

  const { currentLocation, chosenSpot, cyclingSpeed, dailyCyclingHours } = req.body;

  const distanceInKm = calculateDistance(currentLocation, chosenSpot);
  const timeInHours = distanceInKm / cyclingSpeed;
  const totalTimeInHours = timeInHours * dailyCyclingHours;

  res.json({ estimatedTimeInHours: totalTimeInHours });


}

module.exports = { calculateEstimatedTime, calculateEstimate, calculatebyInput, getSpotByName, getspotbyLimit, getAllSpots };
