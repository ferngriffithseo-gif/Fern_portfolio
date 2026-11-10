import type { Metadata } from 'next';
import '@fontsource-variable/fraunces';
import '@fontsource-variable/fraunces/standard-italic.css';
import '@fontsource-variable/dm-sans';
import './globals.css';
import { portfolio } from '@/content/portfolio';

export const metadata: Metadata = {
  title: `${portfolio.name} | ${portfolio.role}`,
  description: portfolio.description,
  ...(portfolio.contact.websiteUrl ? { metadataBase: new URL(portfolio.contact.websiteUrl) } : {}),
  openGraph: { title: `${portfolio.name} | ${portfolio.role}`, description: portfolio.description, type: 'website', locale: 'en_GB', images: [{ url: '/social-share.png', width: 1200, height: 630, alt: `${portfolio.name} — ${portfolio.role}` }] },
  twitter: { card: 'summary_large_image', title: `${portfolio.name} | ${portfolio.role}`, description: portfolio.description, images: ['/social-share.png'] },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en-GB"><body>{children}</body></html>;
}
