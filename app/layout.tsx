import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Vinicius International - Building, Securing, and Powering Nigeria\'s Future',
  description: 'Leading Nigerian conglomerate specializing in security solutions, construction, agro-trade, and aviation. Trusted government partner with $80M+ assets.',
  keywords: 'security equipment Nigeria, armored vehicles, construction Nigeria, agro-trade, aviation Nigeria, government contractor',
  authors: [{ name: 'Vinicius International' }],
  openGraph: {
    title: 'Vinicius International - Nigeria\'s Premier Security & Infrastructure Company',
    description: 'Trusted Nigerian conglomerate delivering world-class security, construction, and trade solutions.',
    url: 'https://viniciusinternational.com',
    siteName: 'Vinicius International',
    locale: 'en_NG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vinicius International',
    description: 'Building, Securing, and Powering Nigeria\'s Future',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <link rel="icon" type="image/svg+xml" href="/logo.png" />
        <Navigation />
        <main>{children}</main>
        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}