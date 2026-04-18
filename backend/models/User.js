import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firebaseId: { type: String, required: true, unique: true }, // UID from Firebase Auth
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { 
    type: String, 
    enum: ['super-admin', 'venue-admin', 'operations', 'security', 'attendee'], 
    default: 'attendee' 
  },
  venueAccess: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Venue' }], // For venue-specific admins
  avatar: { type: String },
  status: { type: String, enum: ['Active', 'Inactive', 'Invited'], default: 'Active' },
  lastActive: { type: Date, default: Date.now }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
