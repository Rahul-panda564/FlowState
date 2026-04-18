import mongoose from 'mongoose';

const sensorSchema = new mongoose.Schema({
  venueId: { type: mongoose.Schema.Types.ObjectId, ref: 'Venue', required: true },
  sensorId: { type: String, required: true, unique: true }, // e.g., 'LID-AR-092'
  type: { 
    type: String, 
    enum: ['LIDAR', 'IOT SENSOR', 'CAMERA', 'PLANNED'], 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['Online', 'Offline', 'Attention', 'Planned'], 
    default: 'Online' 
  },
  needsCalibration: { type: Boolean, default: false },
  battery: { type: Number, min: 0, max: 100, default: 100 },
  signal: { type: String, default: '-40dBm' },
  x: { type: Number, required: true },
  y: { type: Number, required: true }
}, { timestamps: true });

const Sensor = mongoose.model('Sensor', sensorSchema);
export default Sensor;
