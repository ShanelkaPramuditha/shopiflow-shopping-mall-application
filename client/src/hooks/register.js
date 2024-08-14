// hooks/useRegisterUser.js
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const baseURL = import.meta.env.VITE_SERVER_URL;

const registerUser = async (userData) => {
  const response = await axios.post(
    `${baseURL}/register`,
    userData,
  );
  return response.data;
};

const useRegisterUser = () => {
  return useMutation(registerUser);
};

export default useRegisterUser;
