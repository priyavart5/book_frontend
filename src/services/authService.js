import axios from 'axios';

const API_URL = process.env.REACT_APP_SERVER;

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, { email, password });
    return response.data;
  } catch (error) {
    throw error.response || error;
  }
};

export const registerUser = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/register`, { name, email, password });
    return response.data;
  } catch (error) {
    throw error.response || error;
  }
};
