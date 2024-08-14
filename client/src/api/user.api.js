import axios from 'axios';

export const userRegister = async (data) => {
  const { data: response } = await axios.post(
    'http://localhost:3000/api/auth/register',
    data,
  );
  return response;
};
