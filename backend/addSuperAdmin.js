import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import crypto from 'crypto';

dotenv.config();

const addSuperAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const email = 'admin@gmail.com';
    const password = 'admin123';
    const name = 'Admin User';
    const firebaseId = crypto.randomUUID(); // Generate a placeholder ID

    // Check if user already exists in MongoDB
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('⚠️ User already exists in MongoDB, updating...');
      existingUser.role = 'super-admin';
      existingUser.firebaseId = firebaseId;
      await existingUser.save();
      console.log('✅ Updated existing user to super-admin');
    } else {
      // Create MongoDB user
      console.log('Creating MongoDB user record...');
      const newUser = new User({
        firebaseId: firebaseId,
        email: email,
        name: name,
        role: 'super-admin',
        status: 'Active'
      });
      await newUser.save();
      console.log('✅ MongoDB user created');
    }

    console.log('\n--- Super Admin Created Successfully ---');
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    console.log(`Role: super-admin`);
    console.log('\n⚠️  Note: You will need to set up Firebase Authentication separately');
    console.log('   to enable password-based login in production.');
    
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
};

addSuperAdmin();
