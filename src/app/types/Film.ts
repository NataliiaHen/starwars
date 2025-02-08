export type Film = {
  id: number;
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: number[]; // Array of character IDs
  planets: number[]; // Array of planet IDs
  starships: number[]; // Array of starship IDs
  vehicles: number[]; // Array of vehicle IDs
  species: number[]; // Array of species IDs
  created: string; // Could potentially be converted to a Date object
  edited: string; // Could potentially be converted to a Date object
  url: string;
};
