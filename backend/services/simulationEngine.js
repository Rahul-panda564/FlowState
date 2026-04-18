import mongoose from 'mongoose';
import Venue from '../models/Venue.js';
import Sensor from '../models/Sensor.js';

class SimulationEngine {
  constructor() {
    this.intervalId = null;
  }

  start() {
    console.log('🚀 Kinetic Crowd Simulation Engine initialized...');
    this.intervalId = setInterval(this.tick.bind(this), 5000);
  }

  stop() {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  async tick() {
    try {
      // Resilient connection check
      if (mongoose.connection.readyState !== 1) {
        return; // Skip DB cycle in volatile memory mode
      }

      // 1. Update Venue Metrics (Predictive Drift)
      const venues = await Venue.find();
      for (const venue of venues) {
        // Randomly adjust occupancy by +/- 0.5%
        const drift = (Math.random() - 0.5) * 1.5;
        let newLoad = (venue.liveLoad || 45) + drift;
        
        // Keep within realistic bounds for a live event
        if (newLoad > 98) newLoad = 97.5;
        if (newLoad < 5) newLoad = 5.5;

        venue.liveLoad = parseFloat(newLoad.toFixed(2));
        
        // Randomized sensor health simulation
        venue.sensorsOnline = Math.max(0, venue.sensorsTotal - Math.floor(Math.random() * 3));
        venue.sensorHealth = venue.sensorsOnline === venue.sensorsTotal;
        
        await venue.save();
      }

      // 2. Update Sensor Signals
      const sensors = await Sensor.find();
      for (const sensor of sensors) {
        if (sensor.status === 'Online') {
          // Randomized signal strength
          const signal = Math.floor(Math.random() * 15) + 85; // 85-100%
          sensor.signal = `${signal}%`;
          await sensor.save();
        }
      }

    } catch (err) {
      console.error('Simulation Engine Cycle Error:', err.message);
    }
  }
}

export default new SimulationEngine();
