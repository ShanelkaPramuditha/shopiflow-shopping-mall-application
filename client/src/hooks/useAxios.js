import axios from 'axios';

const baseURL = import.meta.env.VITE_SERVER_URL;

const useAxios = () => {
  const get = async (url) => {
    try {
      const response = await axios.get(`${baseURL}${url}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const post = async (url, data) => {
    try {
      const response = await axios.post(
        `${baseURL}${url}`,
        data,
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const put = async (url, data) => {
    try {
      const response = await axios.put(
        `${baseURL}${url}`,
        data,
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const remove = async (url) => {
    try {
      const response = await axios.delete(
        `${baseURL}${url}`,
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  return { get, post, put, remove };
};

export default useAxios;
