import mongoose from 'mongoose';

const venueSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  region: { type: String, required: true },
  capacity: { type: Number, required: true },
  liveLoad: { type: Number, default: 0 },
  status: { 
    type: String, 
    enum: ['active', 'offline', 'paused'], 
    default: 'active' 
  },
  sensorsOnline: { type: Number, default: 0 },
  sensorsTotal: { type: Number, default: 0 },
  sensorHealth: { type: Boolean, default: true },
  tier: { 
    type: String, 
    enum: ['starter', 'pro', 'enterprise'], 
    default: 'enterprise' 
  },
  image: { type: String, default: '🏟️' },
  emergencyStatus: { 
    type: String, 
    enum: ['stable', 'warning', 'evacuating'], 
    default: 'stable' 
  },
  vendors: [{
    name: { type: String },
    type: { type: String },
    location: { type: String },
    status: { type: String, default: 'open' },
    waitTime: { type: Number, default: 5 }
  }]
}, { timestamps: true });

const Venue = mongoose.model('Venue', venueSchema);
export default Venue;
