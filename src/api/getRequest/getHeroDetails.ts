import { Hero } from '@/app/types/Hero';
import { fetchData } from '../data';

export const getHeroDetails = async (id: number) => {
  const response = await fetchData<Hero>(`people/${id}`);

  return response;
};
