import { Node, Edge } from 'reactflow';
import { Film } from '@/app/types/Film';
import { Hero } from '@/app/types/Hero';
import { StarshipsFromFilms } from '@/app/types/StarShip';

export type HeroDetailsGraphType = {
  heroData: Hero;
  films: Film[];
  starships: StarshipsFromFilms[];
};

export const createFlowElements = ({
  heroData,
  films,
  starships,
}: HeroDetailsGraphType) => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  const nodeWidth = 300;
  const nodeHeight = 'auto';
  const style = {
    width: nodeWidth,
    height: nodeHeight,
  };
  const position = { x: 0, y: 0 };
  const edgeType = 'smoothstep';

  // Add Hero Node
  nodes.push({
    id: `hero-${heroData.id}`,
    type: 'custom',
    data: { label: `${heroData.name}`, emoji: '🦸🏻‍♂️', title: 'main' },
    position,
    style,
  });

  if (films.length) {
    nodes.push({
      id: 'films',
      type: 'custom',
      data: { label: 'Films:', emoji: '🎥', title: 'category' },
      position,
      style,
    });

    edges.push({
      id: `hero-${heroData.id}-to-films`,
      source: `hero-${heroData.id}`,
      target: 'films',
      type: edgeType,
      animated: true,
      style: { stroke: 'rgb(249 115 22)', strokeWidth: 2 },
    });

    films.forEach((film) => {
      const filmNodeId = `film-${film.id}`;
      nodes.push({
        id: filmNodeId,
        type: 'custom',
        data: { label: `${film.title}`, emoji: '🎬' },
        position,
        style,
      });

      // Connect each film to the "Films" node
      edges.push({
        id: `film-${film.id}-to-films`,
        source: 'films',
        target: filmNodeId,
        type: edgeType,
        animated: true,
        style: { stroke: 'rgb(249 115 22)', strokeWidth: 3 },
      });

      const filmStarships = starships.find((item) => item.filmId === film.id);
      if (filmStarships && filmStarships.starships.length) {
        // Add a Starships node and connect it to the film
        const starshipsNodeId = `starships-${film.id}`;
        nodes.push({
          id: starshipsNodeId,
          type: 'custom',
          data: { label: 'Starships:', emoji: '🛸', title: 'category' },
          position,
          style,
        });

        edges.push({
          id: `starships-${film.id}-to-${filmNodeId}`,
          source: filmNodeId,
          target: starshipsNodeId,
          type: edgeType,
          animated: true,
          style: { stroke: 'rgb(249 115 22)', strokeWidth: 3 },
        });

        // Add nodes for each starship
        filmStarships.starships.forEach((starship) => {
          const starshipNodeId = `starship-${starship.id}-${film.id}`;
          nodes.push({
            id: starshipNodeId,
            type: 'custom',
            data: { label: `${starship.name}`, emoji: '🚀' },
            position,
            style,
          });

          edges.push({
            id: `${starshipNodeId}-to-${starshipsNodeId}`,
            source: starshipsNodeId,
            target: starshipNodeId,
            type: edgeType,
            animated: true,
            style: { stroke: 'rgb(249 115 22)', strokeWidth: 3 },
          });
        });
      }
    });
  }

  return { nodes, edges };
};
