import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
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

// Security & Optimization Middleware
app.use(helmet()); // Secure headers
app.use(morgan('dev')); // Operations logging
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: { error: 'Too many requests from this IP, please try again after 15 minutes.' }
});
app.use('/api/', limiter);

app.use(express.json({ limit: '10kb' })); // Body limit for security

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
