import axios, { AxiosError } from 'axios';
import axiosInstance from './axiosService';
import { HeroesResponce } from '../types/Hero';

export const getFromServer = async <T>(url: string): Promise<T> => {
  try {
    const response = await axiosInstance.get<T>(url);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axios.isAxiosError(axiosError) && axiosError.response) {
      throw new Error(
        `${axiosError.response.status} ${axiosError.response.statusText}`,
      );
    }
    throw new Error('An unexpected error occurred while fetching data');
  }
};

export const fetchHeroes = async (page: string = '1') => {
  return getFromServer<HeroesResponce>(`/heroes?page=${page}`);
};
