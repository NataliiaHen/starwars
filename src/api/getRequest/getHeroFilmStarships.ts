import { Starship } from '@/app/types/StarShip';
import { ApiResponse, fetchData } from '../data';

export const getHeroFilmStarships = async (pilotId: number, filmId: number) => {
  const response = await fetchData<ApiResponse<Starship>>(
    `starships?pilots=${pilotId}&films=${filmId}`,
  );

  const data = await response.results;

  return data;
};
