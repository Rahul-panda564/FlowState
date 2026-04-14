import express from 'express';
import mongoose from 'mongoose';
import Venue from '../models/Venue.js';

const router = express.Router();

// Simulated fallback for volatile memory mode
const baselineVenues = [
  {
    _id: 'v_baseline_01',
    name: 'Nexus Arena (Simulated)',
    location: 'Global Intelligence Node',
    capacity: 75000,
    liveLoad: 42,
    sensorsTotal: 24,
    sensorsOnline: 24,
    sensorHealth: true,
    status: 'Active',
    region: 'North America'
  }
];

// @route   GET /api/venues
// @desc    Get all venues
router.get('/', async (req, res) => {
  const { search, region } = req.query;
  
  // Resilient Connection Check
  if (mongoose.connection.readyState !== 1) {
    console.warn('⚡ DB Offline: Serving simulated venue baseline.');
    return res.json(baselineVenues);
  }

  let query = {};
  if (search) query.name = { $regex: search, $options: 'i' };
  if (region && region !== 'All Regions') query.region = region;

  try {
    const venues = await Venue.find(query);
    // If DB is connected but empty, still provide baseline for UX
    if (venues.length === 0 && !search) return res.json(baselineVenues);
    res.json(venues);
  } catch (err) {
    console.error('API Error (Venues):', err.message);
    res.json(baselineVenues); // Fallback even on error to keep UI alive
  }
});

// @route   GET /api/venues/:id
// @desc    Get single venue
router.get('/:id', async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);
    if (!venue) return res.status(404).json({ message: 'Venue not found' });
    res.json(venue);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   POST /api/venues
router.post('/', async (req, res) => {
  const venue = new Venue(req.body);
  try {
    const newVenue = await venue.save();
    res.status(201).json(newVenue);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route   PATCH /api/venues/:id
router.patch('/:id', async (req, res) => {
  // Volatile Memory Mode Update
  if (mongoose.connection.readyState !== 1 || req.params.id.startsWith('v_baseline')) {
    const venueIndex = baselineVenues.findIndex(v => v._id === req.params.id);
    if (venueIndex !== -1) {
      baselineVenues[venueIndex] = { ...baselineVenues[venueIndex], ...req.body };
      return res.json(baselineVenues[venueIndex]);
    }
  }

  try {
    const updatedVenue = await Venue.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedVenue) return res.status(404).json({ message: 'Venue not found' });
    res.json(updatedVenue);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route   DELETE /api/venues/:id
router.delete('/:id', async (req, res) => {
  try {
    await Venue.findByIdAndDelete(req.params.id);
    res.json({ message: 'Venue decommissioned successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
