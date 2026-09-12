// app/page.js
import Home from '@/components/home/Home';

export const metadata = {
  metadataBase: new URL('https://alzareenglobaloverseas.com'),

  title:
    'Overseas Recruitment Agency | GCC Jobs, UAE Jobs & Gulf Hiring | Alzareen Global Overseas',

  description:
    'Alzareen Global Overseas is an overseas recruitment and manpower consultancy connecting skilled and semi-skilled candidates with employment opportunities across UAE, Saudi Arabia, Qatar, Kuwait and other Gulf countries.',

  keywords: [
    'Alzareen Global Overseas',
    'overseas recruitment agency',
    'overseas jobs',
    'GCC jobs',
    'Gulf jobs',
    'UAE jobs',
    'Saudi Arabia jobs',
    'Qatar jobs',
    'Kuwait jobs',
    'overseas manpower consultancy',
    'international recruitment',
    'Gulf manpower recruitment',
  ],

  alternates: {
    canonical: 'https://alzareenglobaloverseas.com',
  },

  openGraph: {
    title: 'Alzareen Global Overseas | Overseas Recruitment & GCC Jobs',

    description:
      'Alzareen Global Overseas connects skilled and semi-skilled candidates with overseas employment opportunities across the GCC and other international markets.',

    url: 'https://alzareenglobaloverseas.com',

    siteName: 'Alzareen Global Overseas',

    locale: 'en_IN',

    type: 'website',

    images: [
      {
        url: 'https://alzareenglobaloverseas.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Alzareen Global Overseas',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',

    title: 'Alzareen Global Overseas | Overseas Jobs & Recruitment',

    description:
      'Explore overseas employment opportunities and GCC jobs through Alzareen Global Overseas.',

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
