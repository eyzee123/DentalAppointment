import api from './api';

export const addAppointment = async (appointmentData) => {
    try {
      const response = await api('/booking', {
        method: 'POST',
        body: JSON.stringify(appointmentData),
      });
  
      return response; 
    } catch (error) {
      throw new Error('Error while processing. Please try again later.');
    }
  };

  export const getAppointments = async (patientId) => {
    try {
      const response = await api(`/booking/${patientId}`, {
        method: 'GET',
      });
      return response; 
    } catch (error) {
      throw new Error('Error while processing. Please try again later.');
    }
  };

  export const cancelAppointments = async (id) => {
    try {
      const response = await api(`/booking/${id}`, {
        method: 'PATCH',
      });
      return response; 
    } catch (error) {
      throw new Error('Error while processing. Please try again later.');
    }
  };

  export const updateAppointment = async (appointmentData) => {
    try {
      const response = await api(`/booking/${appointmentData.id}`, {
        method: 'PUT',
        body: JSON.stringify(appointmentData),
      });
  
      return response; 
    } catch (error) {
      throw new Error('Error while processing. Please try again later.');
    }
  };
