import express from 'express';
import SystemSetting from '../models/SystemSetting.js';

const router = express.Router();

// @route   GET /api/settings
// @desc    Get all settings
router.get('/', async (req, res) => {
  try {
    const settings = await SystemSetting.find();
    // Convert to a key-value object for easier frontend consumption
    const settingsObj = settings.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});
    res.json(settingsObj);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   PUT /api/settings
// @desc    Update settings (multiple)
router.put('/', async (req, res) => {
  const updates = req.body; // Expecting { key: value, ... }
  try {
    const p = Object.keys(updates).map(async (key) => {
      return SystemSetting.findOneAndUpdate(
        { key },
        { key, value: updates[key] },
        { upsert: true, new: true }
      );
    });
    await Promise.all(p);
    res.json({ message: 'Settings synchronized across global grid.' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
