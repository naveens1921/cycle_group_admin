const dbPool = require('./config/db'); // Import the dbPool


// Sample data to insert
const spotsData = [
    {
      name: 'Antarctica',
      latitude: -90.0,
      longitude: 0.0,
      accessible_by_cycling: 0,
    },
    {
      name: 'Greenland',
      latitude: 71.7,
      longitude: -42.6,
      accessible_by_cycling: 0,
    },
    {
      name: 'Easter Island',
      latitude: -27.1,
      longitude: -109.4,
      accessible_by_cycling: 1,
    },
    {
      name: 'Machu Picchu',
      latitude: -13.1631,
      longitude: -72.5450,
      accessible_by_cycling: 0,
    },
    {
      name: 'Mount Everest',
      latitude: 27.9881,
      longitude: 86.9250,
      accessible_by_cycling: 0,
    },
    {
      name: 'Great Barrier Reef',
      latitude: -18.2871,
      longitude: 147.6992,
      accessible_by_cycling: 0,
    },
    {
      name: 'Stonehenge',
      latitude: 51.1789,
      longitude: -1.8262,
      accessible_by_cycling: 1,
    },
    {
      name: 'Trans-Siberian Railway',
      latitude: 55.7558,
      longitude: 37.6176,
      accessible_by_cycling: 0,
    },
    {
      name: 'Uluru (Ayers Rock)',
      latitude: -25.3444,
      longitude: 131.0369,
      accessible_by_cycling: 0,
    },
    {
      name: 'The Great Wall of China',
      latitude: 40.4319,
      longitude: 116.5704,
      accessible_by_cycling: 1,
    },
  ];
  

// Function to insert data
async function insertData() {
    const connection = await dbPool.getConnection();
  try {
    for (const spot of spotsData) {
      await connection.query('INSERT INTO spots (name, latitude, longitude, accessible_by_cycling) VALUES (?, ?, ?, ?)',
        [spot.name, spot.latitude, spot.longitude, spot.accessible_by_cycling]);
    }
    console.log('Data inserted successfully');
  } catch (error) {
    console.error('Error inserting data:', error);
  } finally {
    connection.release();
  }
}

// Call the insertData function to insert data into the database
insertData();
