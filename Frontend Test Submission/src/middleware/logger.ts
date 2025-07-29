import axios from 'axios';

export const logRequest = async (details: {
  endpoint: string;
  method: string;
  timestamp?: string;
}) => {
  try {
    await axios.post('http://localhost:3000/log', {
      ...details,
      timestamp: details.timestamp || new Date().toISOString(),
    });
  } catch (err) {
    console.error('Log failed', err);
  }
};
