import api from './api';

export const getDentists = async () => {
    try {
      const response = await api('/dentist', {
        method: 'GET',
      });
      return response; 
    } catch (error) {
      throw new Error('Error while processing. Please try again later.');
    }
};

export const getDentistTimeSlot = async (requestData) => {
  try {
    console.log("request",requestData);
    const response = await api('/dentist/timeslot', {
      method: 'POST',
      body: JSON.stringify(requestData),
    });
    return response; 
  } catch (error) {
    console.log("err",error);
    throw new Error('Error while processing. Please try again later.');
  }
};