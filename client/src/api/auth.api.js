import axios from 'axios';
import axiosInstance from '@/api/axios-instance';

// Login
export const userLogin = async (data) => {
  const response = await axiosInstance.post(
    `http://localhost:3000/api/auth`,
    data,
  );
  const { accessToken } = response.data;
  localStorage.setItem('accessToken', accessToken);
  return response.data;
};

// Refresh Token
export const refreshToken = async () => {
  const response = await axios.get(
    `http://localhost:3000/api/auth`,
    { withCredentials: true },
  );
  const { accessToken } = response.data;

  localStorage.setItem('accessToken', accessToken);

  return response.data;
};

// Logout
export const userLogout = async () => {
  await axiosInstance.post(
    `http://localhost:3000/api/auth/logout`,
    {},
    { withCredentials: true },
  );

  localStorage.removeItem('accessToken');
};
