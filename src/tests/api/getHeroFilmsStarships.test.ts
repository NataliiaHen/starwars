import api from '@/api/axiosService';
import { getHeroFilmStarships } from '@/api/getRequest/getHeroFilmStarships';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(api);

const mockResponse = {
  results: [{ name: 'X-wing' }, { title: 'Jedi starfighter' }],
};
const pilotId = 1;
const filmId = 1;

mock
  .onGet(`/starships?pilots=${pilotId}&films=${filmId}`)
  .reply(200, mockResponse);

describe('getFilms response', () => {
  it('getFilms returns films', async () => {
    const films = await getHeroFilmStarships(pilotId, filmId);
    expect(films).toEqual(mockResponse.results);
  });

  it('getFilms returns error if something went wrong', async () => {
    try {
      await getHeroFilmStarships(pilotId, filmId);
      fail();
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
