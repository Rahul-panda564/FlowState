import express from 'express';
import Sensor from '../models/Sensor.js';

const router = express.Router();

// @route   GET /api/sensors
// @desc    Get all sensors
router.get('/', async (req, res) => {
  try {
    const sensors = await Sensor.find().populate('venueId', 'name');
    res.json(sensors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   POST /api/sensors
router.post('/', async (req, res) => {
  const sensor = new Sensor(req.body);
  try {
    const newSensor = await sensor.save();
    res.status(201).json(newSensor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route   POST /api/sensors/diagnostics
// @desc    Run system-wide diagnostic sweep
router.post('/diagnostics', async (req, res) => {
  try {
    const sensors = await Sensor.find();
    const updates = sensors.map(s => {
      // Logic: 10% chance to need calibration, random signal fluctuation
      const needsCal = Math.random() < 0.15;
      const newSignal = Math.floor(Math.random() * 20) + 80; // 80-100%
      return Sensor.findByIdAndUpdate(s._id, { 
        needsCalibration: needsCal,
        signal: newSignal,
        status: Math.random() < 0.05 ? 'Offline' : 'Online'
      });
    });
    
    await Promise.all(updates);
    res.json({ message: 'Diagnostic sweep complete. Nexus synchronized.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
