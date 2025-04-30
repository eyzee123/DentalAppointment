import api from './api';

export const registerUser = async (userData) => {
    try {
      const response = await api('/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      });
  
      return response; 
    } catch (error) {
      throw new Error('Error while registering. Please try again later.');
    }
  };