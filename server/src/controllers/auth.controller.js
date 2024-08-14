import asyncHandler from 'express-async-handler';
import { userLogin, verifyRefreshToken, clearRefreshToken } from '../services/auth.service.js';

const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const { accessToken, refreshToken } = await userLogin({ email, password });

    // Create secure cookie with refresh token
    res.cookie('jwt', refreshToken, {
      httpOnly: true, //accessible only by web server
      secure: true, //https
      sameSite: 'None', //cross-site cookie
      maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
    });

    res.json({ accessToken });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' });

  const refreshToken = cookies.jwt;

  try {
    const accessToken = await verifyRefreshToken(refreshToken);
    res.json({ accessToken });
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
});

const logoutUser = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content

  res.clearCookie('jwt', clearRefreshToken());
  res.json({ message: 'Cookie cleared' });
};

export { loginUser, refreshAccessToken, logoutUser };
