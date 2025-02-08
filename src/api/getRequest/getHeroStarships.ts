import { Starship } from '@/app/types/StarShip';
import { ApiResponse, fetchData } from '../data';

export const getHeroStarships = async (id: number) => {
  const response = await fetchData<ApiResponse<Starship>>(
    `starships?pilots=${id}`,
  );

  const data = await response.results;

  return data;
};
