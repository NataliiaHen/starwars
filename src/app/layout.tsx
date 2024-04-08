import './globals.css';
import type { Metadata } from 'next';
import { orbitron } from '@/app/ui/fonts';
import StarLogo from '@/app/ui/Logo/Logo';

export const metadata: Metadata = {
  title: 'Star wars',
  description: 'Discover Star wars heroes',
  icons: {
    icon: '/images/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${orbitron.className} h-screen w-screen bg-[url('/images/home-bg.jpg')] bg-cover bg-center text-white antialiased`}
      >
        <div className="flex h-screen flex-col items-center justify-between">
          <StarLogo />
          {children}
        </div>
      </body>
    </html>
  );
}
