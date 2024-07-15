// client.js

import axios from 'axios';

const Client = axios.create({
  baseURL: 'http://localhost:5000/api', // Replace with your backend API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default Client;
