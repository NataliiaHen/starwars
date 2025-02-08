export type Starship = {
  id: number;
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: number;
  length: number;
  max_atmosphering_speed: number;
  crew: number;
  passengers: number;
  cargo_capacity: number;
  consumables: string;
  hyperdrive_rating: number;
  MGLT: number;
  starship_class: string;
  pilots: number[];
  films: number;
  created: string;
  edited: string;
  url: string;
};

export type StarshipsFromFilms = {
  filmId: number;
  starships: Starship[];
};
