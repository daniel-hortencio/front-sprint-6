import axios from 'axios';

import { API_URL } from '../constants/enviroments';

export const api = axios.create({
    baseURL: API_URL,
})