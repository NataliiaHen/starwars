import { Film } from '@/app/types/Film';
import { ApiResponse, fetchData } from '../data';

export const getHeroFilms = async (id: number) => {
  const response = await fetchData<ApiResponse<Film>>(`films?characters=${id}`);

  const data = await response.results;

  return data;
};
