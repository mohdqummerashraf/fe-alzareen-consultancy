import { Geist_Mono, IBM_Plex_Sans } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

import Footer from '@/components/layout/Footer/Footer';
import Header from '@/components/layout/Navbar/Header';
import WhatsappSticky from '@/components/ui/WhatsappSticky';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://alzareenglobaloverseas.com';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

const ibmPlexSans = IBM_Plex_Sans({
  variable: '--font-ibm-plex-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: 'Alzareen Global Overseas | Overseas Recruitment & GCC Jobs',
    template: '%s | Alzareen Global Overseas',
  },

  description:
    'Alzareen Global Overseas is an overseas recruitment and manpower consultancy connecting skilled, semi-skilled and professional candidates with employment opportunities across the GCC and international markets.',

  applicationName: 'Alzareen Global Overseas',

  alternates: {
    canonical: '/',
  },

  openGraph: {
    title: 'Alzareen Global Overseas | Overseas Recruitment & GCC Jobs',
    description:
      'Overseas recruitment and manpower consultancy connecting candidates with employment opportunities across the GCC and international markets.',
    url: '/',
    siteName: 'Alzareen Global Overseas',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Alzareen Global Overseas',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Alzareen Global Overseas | Overseas Recruitment & GCC Jobs',
    description:
      'Explore overseas employment opportunities and GCC jobs through Alzareen Global Overseas.',
    images: ['/og-image.jpg'],
  },

  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Alzareen Global Overseas',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },

    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Alzareen Global Overseas',
      publisher: {
        '@id': `${SITE_URL}/#organization`,
      },
      inLanguage: 'en-IN',
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${ibmPlexSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-default text-heading bg-paper">
        {/* Google Analytics 4 */}
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />

            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}

        {/* Organization + WebSite structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />

        <Header />

        {children}

        <WhatsappSticky />

        <Footer />
      </body>
    </html>
  );
}
