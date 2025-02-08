import ExploreHeroesLink from '@/app/ui/ExploreLink/ExploreLink';
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <main className="w-screen">
        <div className="flex flex-col items-center justify-between">
          <div className="flex-1">
            <ExploreHeroesLink />
          </div>
          <div>
            <Image
              width={1000}
              height={400}
              src="/images/heroes-home-img.png"
              alt="Ilustration of heroes"
              className="object-cover object-center"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
