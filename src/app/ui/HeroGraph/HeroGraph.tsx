'use client';
import 'reactflow/dist/style.css';
import React, { FC } from 'react';
import { unstable_noStore as noStore } from 'next/cache';
import {
  HeroDetailsGraphType,
  createFlowElements,
} from './utils/createFlowElements';
import { Flow } from '../Flow/Flow';

const HeroDetailsGraph: FC<HeroDetailsGraphType> = ({
  heroData,
  films,
  starships,
}) => {
  noStore();

  const { nodes: initialNodes, edges: initialEdges } = createFlowElements({
    heroData,
    films,
    starships,
  });

  return <Flow initialNodes={initialNodes} initialEdges={initialEdges} />;
};

export default HeroDetailsGraph;
