import axios from './Client'; // Assuming client.js is configured as in the previous example

const api = '/api'; // Base API endpoint

const Service = {
  // Example function to fetch all trips
  async getAllTrips() {
    try {
      const response = await axios.get(`${api}/trips`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Example function to book a trip
  async bookTrip(tripId, passengerName, seats) {
    try {
      const response = await axios.post(`${api}/bookings`, { tripId, passengerName, seats });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Example function to register a new user
  async registerUser(username, password, email) {
    try {
      const response = await axios.post(`${api}/auth/register`, { username, password, email });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Example function to login user
  async loginUser(username, password) {
    try {
      const response = await axios.post(`${api}/auth/login`, { username, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Add more API functions as needed
};

export default Service;
