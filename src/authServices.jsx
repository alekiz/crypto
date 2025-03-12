// services/authService.js
import axios from 'axios';

export const signUpUser = async (data) => {
    try {
      const response = await axios.post('https://server4-qto3.vercel.app/api/auth/signin', data);
      if (response.data.token) {
        // Save the token to localStorage
        localStorage.setItem('token', response.data.token);
        // Log the saved token to the console
        console.log("Token saved in localStorage:", response.data.token);
      } else {
        console.log("No token returned:", response.data);
      }
      return response.data;
    } catch (error) {
      console.error("Error during sign in:", error.response ? error.response.data : error.message);
      throw error;
    }
  };
export const signInUser = async (data) => {
  try {
    const response = await axios.post('https://server4-qto3.vercel.app/api/auth/signup', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProtectedData = async () => {
    // Retrieve token from localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error("No token found in localStorage");
    }
  
    try {
      const response = await axios.get('http://localhost:4000/api/auth/protected', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching protected data:", error.response ? error.response.data : error.message);
      throw new Error(error.response?.data?.error || error.message);
    }
  };