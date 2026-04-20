import { describe, it, expect, vi } from 'vitest';
import User from '../models/User.js';
import Venue from '../models/Venue.js';

describe('Data Models Validation', () => {
  it('User model should require firebaseId', () => {
    const user = new User({ name: 'Test User', email: 'test@example.com' });
    const err = user.validateSync();
    expect(err.errors.firebaseId).toBeDefined();
  });

  it('Venue model should require capacity and name', () => {
    const venue = new Venue({ location: 'Sector 7G' });
    const err = venue.validateSync();
    expect(err.errors.name).toBeDefined();
    expect(err.errors.capacity).toBeDefined();
  });

  it('Venue model should have default status as active', () => {
    const venue = new Venue({ name: 'Nexus', location: '7G', region: 'NA', capacity: 1000 });
    expect(venue.status).toBe('active');
  });

  it('User model should have default role as attendee', () => {
    const user = new User({ firebaseId: '123', name: 'Test', email: 't@t.com' });
    expect(user.role).toBe('attendee');
  });
});
