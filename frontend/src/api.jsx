import axios from 'axios';

const API = axios.create({ baseURL: import.meta.env.FRONTEND_URL || 'http://localhost:8000' });

export const googleAuth = (code) => API.get(`/api/auth/google?code=${code}`);