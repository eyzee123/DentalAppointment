import api from './api';

export const loginUser = async (credentials) => {
    try {
      const response = await api('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
  
      return response; 
    } catch (error) {
      throw new Error('Error while registering. Please try again later.');
    }
  };

  export const registerUser = async (userData) => {
    try {
      const response = await api('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      });
  
      return response; 
    } catch (error) {
      throw new Error('Error while registering. Please try again later.');
    }
  };