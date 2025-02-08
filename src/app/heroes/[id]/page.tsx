import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { unstable_noStore as noStore } from 'next/cache';
import { StarshipsFromFilms } from '@/app/types/StarShip';
import { Film } from '@/app/types/Film';
import HeroDetailsGraph from '@/app/ui/HeroGraph/HeroGraph';
import { getHeroFilms } from '@/api/getRequest/getHeroFilms';
import { getHeroDetails } from '@/api/getRequest/getHeroDetails';
import { getHeroFilmStarships } from '@/api/getRequest/getHeroFilmStarships';

export const metadata: Metadata = {
  title: 'Hero Graph',
};

export default async function Page({ params }: { params: { id: string } }) {
  noStore();

  const id = Number(params.id);
  const [heroData, films] = await Promise.all([
    getHeroDetails(id),
    getHeroFilms(id),
  ]);

  async function fetchStarshipsForFilms(heroId: number, films: Film[]) {
    const starships = [] as StarshipsFromFilms[];

    // Map each film to an asynchronous fetch operation
    const fetchOperations = films.map(async (film) => {
      const starship = await getHeroFilmStarships(heroId, film.id);

      starships.push({
        filmId: film.id,
        starships: starship,
      });
    });

    // Wait for all asynchronous fetch operations to complete
    await Promise.all(fetchOperations);

    return starships;
  }

  const heroStarships = await fetchStarshipsForFilms(heroData.id, films);

  if (!heroData) {
    notFound();
  }

  return (
    <main>
      <HeroDetailsGraph
        heroData={heroData}
        films={films}
        starships={heroStarships}
      />
    </main>
  );
}
