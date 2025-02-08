import { Hero } from '@/app/types/Hero';
import { ApiResponse, fetchData } from '../data';

export const getHeroes = async (page = 1) => {
  const response = await fetchData<ApiResponse<Hero>>(`people/?page=${page}`);

  return response;
};
