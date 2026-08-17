import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Caveat } from 'next/font/google';
import { Sidebar } from '@/shared/components/layout/sidebar';
import { MobileHeader } from '@/shared/components/layout/mobile-header';
import { RegisterSW } from '@/shared/components/common/register-sw';
import { getSections } from '@/server/data/sections';
import type { NavLink } from '@/shared/lib/constants';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const caveat = Caveat({
  variable: '--font-caveat',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Singla Workshop',
    template: '%s | Singla Workshop',
  },
  description: 'A personal workshop for things I build, track, learn, and experiment with.',
  manifest: '/site.webmanifest',
  themeColor: '#f59e0b',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Singla Workshop',
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Singla Workshop',
    description: 'A personal workshop for things I build, track, learn, and experiment with.',
    url: '/',
    siteName: 'Singla Workshop',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const sections = await getSections();

  const sectionLinks: NavLink[] = sections.map((s) => ({
    label: s.name,
    href: `/${s.slug}`,
    icon: s.icon,
  }));

  const links: NavLink[] = [
    { label: 'Workbench', href: '/', icon: 'LayoutDashboard' },
    ...sectionLinks,
    { label: 'About', href: '/about', icon: 'User' },
  ];

  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} ${caveat.variable}`}
    >
      <body className="flex min-h-screen antialiased">
        <RegisterSW />
        <Sidebar links={links} />
        <div className="flex min-h-screen flex-1 flex-col">
          <MobileHeader links={links} />
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
