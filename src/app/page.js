// app/page.js
import Home from '@/components/home/Home';

export const metadata = {
  metadataBase: new URL('https://alzareenglobaloverseas.com'),

  title: 'Overseas Recruitment Agency | GCC Jobs, UAE Jobs & Gulf Hiring | Alzareen International',

  description:
    'Alzareen International is a licensed overseas recruitment agency helping skilled and semi-skilled candidates find jobs in UAE, Saudi Arabia, Qatar, Kuwait and other Gulf countries. 5000+ candidates placed worldwide.',

  keywords: [
    'overseas jobs',
    'gulf jobs',
    'uae jobs',
    'saudi arabia jobs',
    'qatar jobs',
    'kuwait jobs',
    'manpower consultancy',
    'international recruitment',
    'overseas recruitment agency',
  ],

  alternates: {
    canonical: 'https://alzareenglobaloverseas.com',
  },

  openGraph: {
    title: 'Overseas Recruitment Agency | GCC Jobs & Overseas Employment',
    description:
      'Licensed overseas recruitment agency connecting candidates with verified employers across the Gulf and beyond.',
    url: 'https://alzareenglobaloverseas.com',
    siteName: 'Alzareen International',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://alzareenglobaloverseas.com/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Alzareen International',
    description:
      'Find overseas jobs and recruitment drives across UAE, Saudi Arabia, Qatar and other Gulf countries.',
    images: ['https://alzareenglobaloverseas.com/og-image.jpg'],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return <Home />;
}
