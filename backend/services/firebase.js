import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

/**
 * FlowState Firebase Administrative Services
 * Initializes the connection to the Firebase Command Node.
 */
const initializeFirebase = () => {
    if (admin.apps.length > 0) return admin.app();

    try {
        // We look for individual environment variables or a single JSON string
        if (process.env.FIREBASE_SERVICE_ACCOUNT) {
            const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
            return admin.initializeApp({
                credential: admin.credential.cert(serviceAccount)
            });
        } else if (process.env.FIREBASE_PROJECT_ID) {
            // Fallback for individual variables
            return admin.initializeApp({
                credential: admin.credential.cert({
                    projectId: process.env.FIREBASE_PROJECT_ID,
                    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
                })
            });
        } else {
            console.warn('⚠️ Firebase Admin SDK: No credentials found. Authentication will run in fallback/development mode.');
            return null;
        }
    } catch (error) {
        console.error('❌ Firebase Admin Initialization Error:', error.message);
        return null;
    }
};

const firebaseAdmin = initializeFirebase();

export default admin;
