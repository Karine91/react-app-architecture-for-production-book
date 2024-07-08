import Axios from 'axios';

import { API_URL } from '@/config/constants';
import { useNotifications } from '@/stores/notifications';

export const apiClient = Axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.log('intersept an error');
    const message =
      error.response?.data?.message || error.message;

    useNotifications.getState().showNotification({
      type: 'error',
      title: 'Error',
      duration: 5000,
      message,
    });

    return Promise.reject(error);
  }
);
