// const BASE_API_URL = process.env.REACT_APP_BASE_API_URL; 
const BASE_API_URL = window.env.API_BASE_URL;


const api = async (endpoint, options = {}) => {
  const url = `${BASE_API_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json', 
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return await response.json();
};

export default api;
