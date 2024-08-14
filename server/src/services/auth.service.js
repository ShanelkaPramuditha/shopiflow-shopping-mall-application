import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserSchema from '../models/user.model.js';
import { JWT_CONFIG } from '../constants/constants.js';

const userLogin = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error('All fields are required');
  }

  const foundUser = await UserSchema.findOne({ email }).exec();
  if (!foundUser) {
    throw new Error('Unauthorized');
  }

  const match = await bcrypt.compare(password, foundUser.password);
  if (!match) {
    throw new Error('Unauthorized');
  }

  const accessToken = jwt.sign(
    {
      UserInfo: {
        email: foundUser.email,
        role: foundUser.role
      }
    },
    JWT_CONFIG.accessTokenSecret,
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign({ email: foundUser.email }, JWT_CONFIG.refreshTokenSecret, {
    expiresIn: '7d'
  });

  return { accessToken, refreshToken };
};

const verifyRefreshToken = async (refreshToken) => {
  return new Promise((resolve, reject) => {
    jwt.verify(refreshToken, JWT_CONFIG.refreshTokenSecret, async (err, decoded) => {
      if (err) return reject(new Error('Forbidden'));

      const foundUser = await UserSchema.findOne({ email: decoded.email }).exec();
      if (!foundUser) return reject(new Error('Unauthorized'));

      const accessToken = jwt.sign(
        {
          UserInfo: {
            email: foundUser.email,
            role: foundUser.role
          }
        },
        JWT_CONFIG.accessTokenSecret,
        { expiresIn: '15m' }
      );

      resolve(accessToken);
    });
  });
};

const clearRefreshToken = () => {
  return {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    maxAge: 0
  };
};

export { userLogin, verifyRefreshToken, clearRefreshToken };
