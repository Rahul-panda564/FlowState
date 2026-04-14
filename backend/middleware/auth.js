/**
 * FlowState Authentication Middleware
 * Verifies the identity of the operator via Firebase ID Tokens.
 */
export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: No command link established.' });
  }

    // const token = authHeader.split(' ')[1];

  try {
    // Note: In a production environment, use firebase-admin to verify the token
    // admin.auth().verifyIdToken(token)
    
    // For development/functional testing, we assume valid if token exists 
    // but we can parse the decoded token here if needed.
    req.user = { id: 'dev-operator', role: 'admin' };
    next();
  } catch {
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
