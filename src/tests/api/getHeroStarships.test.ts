import api from '@/api/axiosService';
import { getHeroStarships } from '@/api/getRequest/getHeroStarships';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(api);

const mockResponse = {
  results: [{ name: 'Calamari Cruiser' }, { title: 'Solar Sailer' }],
};
const characterId = 1;

mock.onGet(`/starships?pilots=${characterId}`).reply(200, mockResponse);

describe('getHeroStarships response', () => {
  it('getHeroStarships returns hero starships', async () => {
    const films = await getHeroStarships(characterId);
    expect(films).toEqual(mockResponse.results);
  });

  it('getHeroStarships returns error if something went wrong', async () => {
    try {
      await getHeroStarships(characterId);
      fail();
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
