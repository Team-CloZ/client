export * from './auth.api';
import { SERVER_ADDRESS } from '@src/const';
import axios from 'axios';

export const serverAxios = axios.create({
  baseURL: SERVER_ADDRESS,
});
