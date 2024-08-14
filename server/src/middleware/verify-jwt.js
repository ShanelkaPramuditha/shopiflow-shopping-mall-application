import jwt from 'jsonwebtoken';
import { JWT_CONFIG } from '../constants/constants';

const verifyJwt = (req, res, next) => {
  const autheHeader = req.headers.authorization || req.headers.Authorization;

  if (!autheHeader?.startsWith('Bearer')) {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  const token = autheHeader.split(' ')[1];

  jwt.verify(token, JWT_CONFIG.accessTokenSecret, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Forbidden' });

    req.email = decoded.email;
    req.role = decoded.UserInfo.role;
    next();
  });
};

export default verifyJwt;
