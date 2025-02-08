import { Film } from '../app/types/Film';
import { Hero } from '../app/types/Hero';
import { Starship } from '../app/types/StarShip';
import api from './axiosService';

export interface ApiResponse<T> {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results: T[];
}

export const fetchData = async <T>(url: string, config = {}): Promise<T> => {
  try {
    const response = await api.get(url, config);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch data');
    throw error;
  }
};

export const fetchHeroes = (page = 1) =>
  fetchData<ApiResponse<Hero>>(`people/?page=${page}`);

export const fetchHeroDetails = (id: number) => fetchData<Hero>(`people/${id}`);

export const fetchHeroFilms = async (id: number) => {
  const response = await fetchData<ApiResponse<Film>>(`films?characters=${id}`);

  const data = await response.results;

  return data;
};

export const fetchHeroStarships = (id: number) =>
  fetchData<ApiResponse<Starship>>(`starships?pilots=${id}`);

export const fetchHeroFilmStarships = (pilotId: number, filmId: number) =>
  fetchData<ApiResponse<Starship>>(
    `starships?pilots=${pilotId}&films=${filmId}`,
  );
