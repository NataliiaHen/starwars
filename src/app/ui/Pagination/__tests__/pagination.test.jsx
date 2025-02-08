import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import * as NextNavigation from 'next/navigation';
import { Pagination } from '../Pagination';

export const usePathname = jest.fn();
export const useSearchParams = jest.fn();

// Mocking Next.js hooks
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe('Pagination', () => {
  it('renders pagination correctly for the first page', () => {
    // Mock hooks return values for the first page scenario
    NextNavigation.usePathname.mockReturnValue('/test');
    NextNavigation.useSearchParams.mockReturnValue(
      new URLSearchParams('?page=1'),
    );

    render(<Pagination totalPages={5} />);

    // Assertions for first page
    expect(
      screen.getByLabelText('Go to previous page').closest('a'),
    ).toHaveAttribute('tabIndex', '-1'); // Previous page arrow is disabled
    expect(
      screen.getByLabelText('Go to next page').closest('a'),
    ).not.toHaveAttribute('tabIndex', '-1'); // Next page arrow is active
    expect(screen.getByText('1').closest('div')).toHaveClass('z-10'); // First page number is active
  });

  it('renders pagination correctly for a middle page', () => {
    NextNavigation.usePathname.mockReturnValue('/test');
    NextNavigation.useSearchParams.mockReturnValue(
      new URLSearchParams('?page=3'),
    );

    render(<Pagination totalPages={5} />);

    // Assertions for a middle page
    expect(
      screen.getByLabelText('Go to previous page').closest('a'),
    ).not.toHaveAttribute('tabIndex', '-1');
    expect(
      screen.getByLabelText('Go to next page').closest('a'),
    ).not.toHaveAttribute('tabIndex', '-1');
    expect(screen.getByText('3').closest('div')).toHaveClass('z-10'); // Middle page number is active
  });

  it('renders pagination correctly for the last page', () => {
    NextNavigation.usePathname.mockReturnValue('/test');
    NextNavigation.useSearchParams.mockReturnValue(
      new URLSearchParams('?page=5'),
    );

    render(<Pagination totalPages={5} />);

    // Assertions for last page
    expect(
      screen.getByLabelText('Go to next page').closest('a'),
    ).toHaveAttribute('tabIndex', '-1'); // Next page arrow is disabled
    expect(
      screen.getByLabelText('Go to previous page').closest('a'),
    ).not.toHaveAttribute('tabIndex', '-1'); // Previous page arrow is active
    expect(screen.getByText('5').closest('div')).toHaveClass('z-10'); // Last page number is active
  });
});
