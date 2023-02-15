export * from './auth.api';
import axios from 'axios';

export const serverAxios = axios.create({
  baseURL: 'http://localhost:3000',
});

export const aiAxios = axios.create({
  baseURL: 'http://localhost:5000',
});
