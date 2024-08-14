import { useState, useEffect } from 'react';
import api from '@/api/axios-instance';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] =
    useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          setIsAuthenticated(false);
          return;
        }

        await api.get('/user/profile'); // A dummy endpoint to validate the token
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  return isAuthenticated;
};

export default useAuth;
