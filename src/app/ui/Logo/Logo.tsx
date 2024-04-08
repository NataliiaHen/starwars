import Image from 'next/image';
import Link from 'next/link';

export default function StarLogo() {
  return (
    <Link href="/">
      <Image
        src="/images/star-wars-logo.png"
        width={250}
        height={60}
        className="block px-5 py-5"
        alt="Star Wars Logo"
      />
    </Link>
  );
}
