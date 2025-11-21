import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Teachers Tool - AI-Powered Educational Platform',
  description: 'Bridge classroom realities and curriculum expectations with the platform that\'s AI-supported, but teacher-first.',
  keywords: ['education', 'teachers', 'AI', 'learning', 'curriculum', 'classroom'],
  authors: [{ name: 'Teachers Tool Team' }],
  openGraph: {
    title: 'Teachers Tool - AI-Powered Educational Platform',
    description: 'Bridge classroom realities and curriculum expectations with the platform that\'s AI-supported, but teacher-first.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

