import { Hero } from '../../types/Hero';

type Props = {
  heroes: Hero[];
};

const HeroesList: React.FC<Props> = ({ heroes }) => {
  return (
    <div className="grid w-2/4 grid-cols-2 gap-4">
      {heroes.map((hero, index) => (
        <div
          key={index}
          className="h-min w-full flex-none transform cursor-pointer overflow-hidden rounded-lg bg-orange-400 text-center shadow-lg transition duration-500 hover:-translate-y-1 hover:scale-105 hover:bg-orange-500"
        >
          <div className="p-5">
            <h3 className="text-xl font-bold">{hero.name}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeroesList;
