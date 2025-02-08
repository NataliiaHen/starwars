import api from '@/api/axiosService';
import { getHeroDetails } from '@/api/getRequest/getHeroDetails';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(api);

const mockResponse = {
  results: { name: 'Obi-Wan Kenobi' },
};
const heroId = 1;

mock.onGet(`/people/${heroId}`).reply(200, mockResponse);

describe('getHeroDetails response', () => {
  it('getHeroDetails returns hero details', async () => {
    const films = await getHeroDetails(heroId);
    expect(films).toEqual(mockResponse);
  });

  it('getHeroDetails returns error if something went wrong', async () => {
    try {
      await getHeroDetails(heroId);
      fail();
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
