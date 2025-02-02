import axios from 'axios';
const API_URL = "/Uw5CrX";


export const fetchQuizData = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log('API Response:', response.data); 
    return response.data;
  } catch (error) {
    console.error('Error fetching quiz data:', error);
    throw error;
  }
};