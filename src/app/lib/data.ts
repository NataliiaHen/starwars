import { HeroesResponce } from '../types/Hero';
import api from './axiosService';

export const fetchData = async <T>(url: string, config = {}): Promise<T> => {
  try {
    const response = await api.get(url, config);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    throw error;
  }
};

export const fetchHeroes = (page = 1) =>
  fetchData<HeroesResponce>(`people/?page=${page}`);
