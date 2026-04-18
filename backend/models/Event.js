import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  venueId: { type: mongoose.Schema.Types.ObjectId, ref: 'Venue', required: true },
  name: { type: String, required: true },
  date: { type: String, required: true }, // Simple string date for now
  time: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['sports', 'concert', 'conference', 'other'], 
    required: true 
  },
  expected: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['live', 'scheduled', 'completed', 'cancelled', 'draft'], 
    default: 'scheduled' 
  },
  staffing: { 
    type: String, 
    enum: ['minimal', 'partial', 'full'], 
    default: 'full' 
  },
  peakAttendance: { type: Number, default: 0 },
  successRate: { type: Number, default: 0 },
  durationMinutes: { type: Number, default: 0 }
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);
export default Event;
