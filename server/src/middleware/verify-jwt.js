import jwt from 'jsonwebtoken';

const verifyJwt = (req, res, next) => {
  const autheHeader = req.headers.authorization || req.headers.Authorization;

  if (!autheHeader?.startsWith('Bearer')) {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  const token = autheHeader.split(' ')[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Forbidden' });

    req.email = decoded.email;
    req.role = decoded.UserInfo.role;
    next();
  });
};

export default verifyJwt;
