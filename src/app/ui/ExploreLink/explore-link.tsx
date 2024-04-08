'use client';

import Link from 'next/link';

const ExploreHeroesLink = () => {
  return (
    <div className="max-w-min transform animate-pulse cursor-pointer overflow-hidden rounded-lg bg-gray-200 px-5 py-1 text-center text-2xl font-bold shadow-lg transition duration-500 hover:-translate-y-1 hover:scale-105 hover:animate-none hover:bg-gray-300 sm:px-10 sm:py-2 sm:text-4xl">
      <Link
        href="/heroes"
        className="inline-block w-full px-2 py-1 font-bold text-sky-500 hover:text-sky-600 sm:px-4 sm:py-2"
      >
        Discover The Galaxy
      </Link>
    </div>
  );
};

export default ExploreHeroesLink;
