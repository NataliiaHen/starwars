'use client';

import Link from 'next/link';
import styles from './ExploreLink.module.scss';

const ExploreHeroesLink = () => {
  return (
    <div className="">
      <Link href="/heroes" className={styles.headerCta}>
        <span>Discover The Galaxy</span>
      </Link>
    </div>
  );
};

export default ExploreHeroesLink;
