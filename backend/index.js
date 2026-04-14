import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Venue from './models/Venue.js';
import venueRoutes from './routes/venueRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import sensorRoutes from './routes/sensorRoutes.js';
import simulationEngine from './services/simulationEngine.js';
import settingRoutes from './routes/settingRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection with Resilience
mongoose.connect(process.env.MONGODB_URI, { 
    serverSelectionTimeoutMS: 5000,
    bufferCommands: false
})
  .then(async () => {
    console.log('✅ Connected to MongoDB Atlas: FlowState Cluster');
    
    // Seed default venue if empty
    const venueCount = await Venue.countDocuments();
    if (venueCount === 0) {
      console.log('📦 Seeding default operational node...');
      await Venue.create({
        name: 'Nexus Arena: Global Command',
        location: 'Sector 7G - Intelligence Node',
        capacity: 75000,
        liveLoad: 42,
        sensorsTotal: 24,
        sensorsOnline: 24,
        sensorHealth: true,
        status: 'Active'
      });
    }

    simulationEngine.start();
  })
  .catch(() => {
    console.warn('⚠️ MongoDB Connection Failed. Running in Volatile Memory Mode for simulation stability.');
    simulationEngine.start(); 
  });

// Routes
app.use('/api/venues', venueRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/sensors', sensorRoutes);
app.use('/api/settings', settingRoutes);
app.use('/api/users', userRoutes);

// Health Check Route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'active', system: 'FlowState Backend', timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`🚀 Mission Control Server running on port ${PORT}`);
});
