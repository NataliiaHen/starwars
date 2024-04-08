import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../page';

describe('Home Page', () => {
  it('renders without crashing', () => {
    render(<Home />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('renders the ExploreHeroesLink component', () => {
    render(<Home />);
    expect(screen.getByText('Discover The Galaxy')).toBeInTheDocument();
  });

  it('renders an image with the expected alt text', () => {
    render(<Home />);
    expect(screen.getByAltText('Ilustration of heroes')).toBeInTheDocument();
  });
});
