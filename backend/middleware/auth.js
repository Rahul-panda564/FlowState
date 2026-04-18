import admin from '../services/firebase.js';

/**
 * FlowState Authentication Middleware
 * Verifies the identity of the operator via Firebase ID Tokens.
 */
export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: No command link established.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // If Admin SDK is initialized, verify the token
    if (admin.apps.length > 0) {
      const decodedToken = await admin.auth().verifyIdToken(token);
      req.user = { 
        id: decodedToken.uid, 
        role: decodedToken.role || 'user',
        email: decodedToken.email 
      };
    } else {
      // Fallback for development if no credentials provided
      console.warn('⚠️ Security Bypass: No Firebase credentials. Using dev-operator fallback.');
      req.user = { id: 'dev-operator', role: 'admin' };
    }
    next();
  } catch (error) {
    console.error('Auth Error:', error.message);
    res.status(401).json({ error: 'Unauthorized: Invalid security credentials.' });
  }
};

export const authorize = (roles = []) => {
  return (req, res, next) => {
    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden: Insufficient security clearance.' });
    }
    next();
  };
};
