import api from '@/api/axiosService';
import { getHeroFilms } from '@/api/getRequest/getHeroFilms';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(api);

const mockResponse = {
  results: [{ title: 'Film 1' }, { title: 'Film 2' }],
};
const characterId = 1;

mock.onGet(`/films?characters=${characterId}`).reply(200, mockResponse);

describe('getFilms response', () => {
  it('getFilms returns films', async () => {
    const films = await getHeroFilms(characterId);
    expect(films).toEqual(mockResponse.results);
  });

  it('getFilms returns error if something went wrong', async () => {
    try {
      await getHeroFilms(characterId);
      fail();
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
