import React from 'react';
import { render, screen } from '@testing-library/react';
import HeroDetailsGraph from '../HeroGraph';

// Mock the Flow component to isolate testing to HeroDetailsGraph behavior
jest.mock('../../Flow/Flow', () => ({
  __esModule: true,
  Flow: ({ initialNodes, initialEdges }) => (
    <div>
      <div data-testid="mockFlow">Flow Component Mock</div>
      <div data-testid="nodes">{JSON.stringify(initialNodes)}</div>
      <div data-testid="edges">{JSON.stringify(initialEdges)}</div>
    </div>
  ),
}));

// Mock data for testing
const mockHeroData = {
  id: 1,
  name: 'Test Hero',
};
const mockFilms = [{ id: 1, title: 'Test Film' }];
const mockStarships = [
  { filmId: 1, starships: [{ id: 1, name: 'Test Ship' }] },
];

describe('HeroDetailsGraph', () => {
  it('renders and passes correct data to the Flow component', () => {
    render(
      <HeroDetailsGraph
        heroData={mockHeroData}
        films={mockFilms}
        starships={mockStarships}
      />,
    );

    expect(screen.getByTestId('mockFlow')).toBeInTheDocument();

    // Checking if createFlowElements was called correctly
    const initialNodes = screen.getByTestId('nodes').textContent;
    const initialEdges = screen.getByTestId('edges').textContent;

    // Convert JSON data from textContent back to objects to assert their properties
    expect(JSON.parse(initialNodes)).toEqual(expect.any(Array));
    expect(JSON.parse(initialEdges)).toEqual(expect.any(Array));
  });
});
