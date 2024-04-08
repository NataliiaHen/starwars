import { Metadata } from 'next';
import { fetchHeroes } from '../lib/data';
import HeroesList from '../ui/HeroesList/heroes-list';
import Pagination from '../ui/Pagination/pagination';

export const metadata: Metadata = {
  title: 'Heroes',
};

const HeroesPage = async ({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) => {
  const page = Number(searchParams?.page) || 1;
  const heroesData = await fetchHeroes(page);
  const { count, results: heroes } = heroesData;
  const totalPages = Math.ceil(count / 10);

  return (
    <div className="flex h-full w-full flex-col items-center justify-start gap-8 p-8">
      <HeroesList heroes={heroes} />
      <Pagination totalPages={totalPages} />
    </div>
  );
};

export default HeroesPage;
