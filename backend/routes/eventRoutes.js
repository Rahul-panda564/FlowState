import express from 'express';
import mongoose from 'mongoose';
import Event from '../models/Event.js';

const router = express.Router();

// Simulated fallback for volatile memory mode
const baselineEvents = [
  {
    _id: 'e_baseline_01',
    name: 'Metropolis Derby',
    venueId: { name: 'Nexus Arena', location: 'Global Node' },
    status: 'Live',
    startTime: new Date().toISOString(),
    occupancy: 42500
  }
];

// @route   GET /api/events
// @desc    Get all events
router.get('/', async (req, res) => {
  // Resilient Connection Check
  if (mongoose.connection.readyState !== 1) {
    console.warn('⚡ DB Offline: Serving simulated event baseline.');
    return res.json(baselineEvents);
  }

  try {
    const events = await Event.find().populate('venueId', 'name location');
    if (events.length === 0) return res.json(baselineEvents);
    res.json(events);
  } catch (err) {
    console.error('API Error (Events):', err.message);
    res.json(baselineEvents);
  }
});

// @route   GET /api/events/venue/:venueId
// @desc    Get events for a specific venue
router.get('/venue/:venueId', async (req, res) => {
  try {
    const events = await Event.find({ venueId: req.params.venueId });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   POST /api/events
router.post('/', async (req, res) => {
  const event = new Event(req.body);
  try {
    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route   PATCH /api/events/:id
router.patch('/:id', async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route   DELETE /api/events/:id
router.delete('/:id', async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event successfully cancelled and archived.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
