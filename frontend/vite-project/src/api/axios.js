import axios from 'axios';

const API = axios.create({
  baseURL: 'https://srikarphotoshop-0.onrender.com/api',
});

// Pass JWT Token automatically in requests
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;