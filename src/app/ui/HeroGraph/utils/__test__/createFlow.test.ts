import { Film } from '@/app/types/Film';
import { Hero } from '@/app/types/Hero';
import { StarshipsFromFilms } from '@/app/types/StarShip';
import { createFlowElements } from '../createFlowElements';

const heroData: Hero = {
  id: 1,
  name: 'Luke Skywalker',
  height: '172',
  mass: '77',
  hair_color: 'blond',
  skin_color: 'fair',
  eye_color: 'blue',
  birth_year: '19BBY',
  gender: 'male',
  homeworld: 1,
  films: [1, 2],
  species: [],
  vehicles: [14, 30],
  starships: [12],
  created: '2014-12-09T13:50:51.644000Z',
  edited: '2014-12-20T21:17:56.891000Z',
  url: 'http://swapi.dev/api/people/1/',
};

const films: Film[] = [
  {
    id: 1,
    title: 'A New Hope',
    episode_id: 4,
    opening_crawl: 'It is a period of civil war...',
    director: 'George Lucas',
    producer: 'Gary Kurtz, Rick McCallum',
    release_date: '1977-05-25',
    characters: [1, 2, 3],
    planets: [1, 2],
    starships: [2, 3],
    vehicles: [4, 5],
    species: [1, 2, 3],
    created: '2014-12-10T14:23:31.880000Z',
    edited: '2014-12-20T19:49:45.256000Z',
    url: 'http://swapi.dev/api/films/1/',
  },
  {
    id: 2,
    title: 'The Empire Strikes Back',
    episode_id: 5,
    opening_crawl: 'Rebel spaceships, striking...',
    director: 'Irvin Kershner',
    producer: 'Gary Kurtz, Rick McCallum',
    release_date: '1980-05-17',
    characters: [1, 2, 3],
    planets: [3, 4],
    starships: [3, 4],
    vehicles: [6, 7],
    species: [3, 4],
    created: '2014-12-12T11:26:24.656000Z',
    edited: '2014-12-15T13:07:53.386000Z',
    url: 'http://swapi.dev/api/films/2/',
  },
];

const starships: StarshipsFromFilms[] = [
  {
    filmId: 1,
    starships: [
      {
        id: 2,
        name: 'Millennium Falcon',
        model: 'YT-1300 light freighter',
        manufacturer: 'Corellian Engineering Corporation',
        cost_in_credits: 100000,
        length: 34.37,
        max_atmosphering_speed: 1050,
        crew: 4,
        passengers: 6,
        cargo_capacity: 100000,
        consumables: '2 months',
        hyperdrive_rating: 0.5,
        MGLT: 75,
        starship_class: 'Light freighter',
        pilots: [1],
        films: 1,
        created: '2014-12-10T14:23:31.880000Z',
        edited: '2014-12-20T21:23:49.886000Z',
        url: 'http://swapi.dev/api/starships/10/',
      },
    ],
  },
];

describe('createFlowElements', () => {
  it('correctly constructs nodes and edges based on input data', () => {
    // Sample data based on your provided types

    const { nodes, edges } = createFlowElements({ heroData, films, starships });

    expect(nodes.length).toBeGreaterThan(0);
    expect(edges.length).toBeGreaterThan(0);

    // Testing specific node content
    expect(nodes.find((node) => node.id === `hero-${heroData.id}`)).toEqual(
      expect.objectContaining({
        data: expect.objectContaining({
          label: heroData.name,
        }),
      }),
    );

    // Ensure that film and starship nodes are connected correctly
    expect(
      edges.some(
        (edge) =>
          edge.source === `film-${films[0].id}` &&
          edge.target.startsWith('starships-'),
      ),
    ).toBe(true);
  });

  it('creates correct number of nodes and edges with Star Wars data', () => {
    const { nodes, edges } = createFlowElements({ heroData, films, starships });
    expect(nodes.length).toBe(6);
    expect(edges.length).toBe(5);

    // Check connections and data integrity
    expect(
      edges.some(
        (edge) => edge.source === 'films' && edge.target.startsWith('film-'),
      ),
    ).toBeTruthy();
    expect(
      nodes.some(
        (node) =>
          node.data.label === 'Luke Skywalker' && node.data.emoji === '🦸🏻‍♂️',
      ),
    ).toBeTruthy();
    expect(
      nodes.some((node) => node.data.label === 'Millennium Falcon'),
    ).toBeTruthy();
  });

  it('handles empty input arrays gracefully', () => {
    const { nodes, edges } = createFlowElements({
      heroData: { ...heroData, films: [] },
      films: [],
      starships: [],
    });
    expect(nodes.length).toBe(1);
    expect(edges.length).toBe(0);
  });

  it('verifies node connections are correct', () => {
    const { edges } = createFlowElements({ heroData, films, starships });
    const hasCorrectConnections = edges.some(
      (edge) =>
        edge.source === `film-${films[0].id}` &&
        edge.target.startsWith('starships-'),
    );
    expect(hasCorrectConnections).toBe(true);
  });
});
