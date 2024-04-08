'use client';

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { generatePagination, getSearchWith } from '../../lib/utils';

const basePaginationClass =
  'flex h-10 w-10 items-center justify-center rounded-md border text-sm ease-in duration-300';

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = getSearchWith(searchParams, { page: pageNumber.toString() });
    return `${pathname}?${params.toString()}`;
  };

  const allPages = generatePagination(currentPage, totalPages);

  return (
    <div className="flex items-center justify-between py-3 sm:px-6">
      <div className="flex gap-1">
        <PaginationArrow
          direction="left"
          href={currentPage > 1 ? createPageURL(currentPage - 1) : '#'}
          isDisabled={currentPage <= 1}
        />

        <div className="flex gap-1">
          {allPages.map((page, index) => {
            if (page === '...') {
              return (
                <div className={basePaginationClass} key={`ellipsis-${index}`}>
                  {page}
                </div>
              );
            }

            return (
              <PaginationNumber
                key={page}
                href={createPageURL(page)}
                page={page}
                isActive={currentPage === page}
              />
            );
          })}
        </div>

        <PaginationArrow
          direction="right"
          href={currentPage < totalPages ? createPageURL(currentPage + 1) : '#'}
          isDisabled={currentPage >= totalPages}
        />
      </div>
    </div>
  );
}

function PaginationNumber({
  page,
  href,
  isActive,
}: {
  page: number | string;
  href: string;
  isActive: boolean;
}) {
  const className = clsx(basePaginationClass, {
    'z-10 bg-gray-100 border-gray-300 text-black': isActive,
    'hover:bg-gray-300 hover:text-black bg-black': !isActive,
  });

  return isActive ? (
    <div className={className}>{page}</div>
  ) : (
    <Link href={href} className={className}>
      {page}
    </Link>
  );
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string;
  direction: 'left' | 'right';
  isDisabled?: boolean;
}) {
  const ariaLabel =
    direction === 'left' ? 'Go to previous page' : 'Go to next page';

  return (
    <Link
      href={href}
      className={clsx(basePaginationClass, {
        'bg-black hover:bg-gray-300 hover:text-black': !isDisabled,
        'text-gray-300': isDisabled,
        'mr-2': direction === 'left',
        'ml-2': direction === 'right',
      })}
      aria-label={ariaLabel}
      tabIndex={isDisabled ? -1 : 0}
    >
      {direction === 'left' ? (
        <ArrowLeftIcon className="w-4" />
      ) : (
        <ArrowRightIcon className="w-4" />
      )}
    </Link>
  );
}
