import axios from 'axios';
import Cookies from 'js-cookie';
import { FieldValues } from 'react-hook-form';
import { BASE_URL, BASE_IMAGE_URL } from '@/config';
export const baseurl = BASE_URL;
export const baseurlImage = BASE_IMAGE_URL;
const apiClient = axios.create({
  baseURL: baseurl,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const mainApiWrapper = async (
  method: string,
  url: string,
  data?: FieldValues
) => {
  try {
    const response = await apiClient({ method, url, data });
    return response?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error;
    } else {
      throw error;
    }
  }
};

