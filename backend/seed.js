import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Venue from './models/Venue.js';
import Event from './models/Event.js';
import Sensor from './models/Sensor.js';

dotenv.config();

const mockVenues = [
  {
    name: 'Apex Arena Central',
    location: 'New York, USA',
    region: 'NA-EAST',
    capacity: 65500,
    liveLoad: 42,
    status: 'active',
    sensorsOnline: 1204,
    sensorsTotal: 1204,
    sensorHealth: true,
    tier: 'enterprise',
    image: '🏟️',
  },
  {
    name: 'Neon Plaza Hub',
    location: 'Tokyo, Japan',
    region: 'APAC-01',
    capacity: 12200,
    liveLoad: 89,
    status: 'offline',
    sensorsOnline: 422,
    sensorsTotal: 850,
    sensorHealth: false,
    tier: 'pro',
    image: '🏢',
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await Venue.deleteMany({});
    await Event.deleteMany({});
    await Sensor.deleteMany({});

    // Seed Venues
    const createdVenues = await Venue.insertMany(mockVenues);
    console.log(`✅ Seeded ${createdVenues.length} Venues`);

    // Seed Events for the first venue
    const mockEvents = [
      { 
        venueId: createdVenues[0]._id,
        name: 'Championship Game', 
        date: '2025-12-14', 
        time: '19:00', 
        type: 'sports', 
        expected: 65000, 
        status: 'live', 
        staffing: 'full' 
      },
      { 
        venueId: createdVenues[0]._id,
        name: 'Concert: Solar Echoes', 
        date: '2025-12-15', 
        time: '20:30', 
        type: 'concert', 
        expected: 45000, 
        status: 'scheduled', 
        staffing: 'partial' 
      }
    ];

    await Event.insertMany(mockEvents);
    console.log('✅ Seeded Events');

    // Seed Sensors for the first venue
    const mockSensors = [
      { 
        venueId: createdVenues[0]._id,
        sensorId: 'LID-AR-092', 
        type: 'LIDAR', 
        status: 'Online', 
        needsCalibration: true, 
        battery: 88, 
        x: 60, 
        y: 50 
      },
      { 
        venueId: createdVenues[0]._id,
        sensorId: 'IOT-12', 
        type: 'IOT SENSOR', 
        status: 'Online', 
        battery: 12, 
        x: 80, 
        y: 20 
      }
    ];

    await Sensor.insertMany(mockSensors);
    console.log('✅ Seeded Sensors');

    console.log('--- Seeding Complete ---');
    process.exit();
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

seedDB();
