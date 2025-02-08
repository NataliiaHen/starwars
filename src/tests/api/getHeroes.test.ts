import api from '@/api/axiosService';
import { getHeroes } from '@/api/getRequest/getHeroes';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(api);

const mockResponse = {
  count: 2,
  next: 'https://sw-api.starnavi.io/people/?page=2',
  previous: null,
  results: [{ name: 'Obi-Wan Kenobi' }, { name: 'Yoda' }],
};
const page = 1;

mock.onGet(`/people/?page=${page}`).reply(200, mockResponse);

describe('getHeroes response', () => {
  it('getHeroes returns heroes', async () => {
    const films = await getHeroes(page);
    expect(films).toEqual(mockResponse);
  });

  it('getHeroes returns error if something went wrong', async () => {
    try {
      await getHeroes(page);
      fail();
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
