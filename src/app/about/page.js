import AboutPageDetail from './AboutPageDetail';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://alzareenglobaloverseas.com';

export const dynamic = 'force-static';

export const revalidate = false;

export const metadata = {
  metadataBase: new URL(siteUrl),

  title: 'About Alzareen Global Overseas | Overseas Recruitment Agency',

  description:
    'Learn about Alzareen Global Overseas, an India-based overseas recruitment and manpower consultancy connecting skilled, semi-skilled and professional candidates with employment opportunities across the GCC and international markets.',

  alternates: {
    canonical: `${siteUrl}/about`,
  },

  openGraph: {
    title: 'About Alzareen Global Overseas | Overseas Recruitment',
    description:
      'Discover Alzareen Global Overseas and our approach to overseas recruitment, GCC jobs, candidate support and international manpower placement.',
    url: `${siteUrl}/about`,
    siteName: 'Alzareen Global Overseas',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Alzareen Global Overseas - Overseas Recruitment',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'About Alzareen Global Overseas',
    description:
      'Learn about Alzareen Global Overseas and our overseas recruitment and manpower services.',
    images: [`${siteUrl}/og-image.jpg`],
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
      '@id': `${siteUrl}/#organization`,
      name: 'Alzareen Global Overseas',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },

    {
      '@type': 'AboutPage',
      '@id': `${siteUrl}/about#webpage`,
      url: `${siteUrl}/about`,
      name: 'About Alzareen Global Overseas',
      description:
        'Learn about Alzareen Global Overseas, an India-based overseas recruitment and manpower consultancy connecting candidates with employment opportunities across the GCC and international markets.',
      isPartOf: {
        '@id': `${siteUrl}/#website`,
      },
      about: {
        '@id': `${siteUrl}/#organization`,
      },
      breadcrumb: {
        '@id': `${siteUrl}/about#breadcrumb`,
      },
    },

    {
      '@type': 'BreadcrumbList',
      '@id': `${siteUrl}/about#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: siteUrl,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'About Us',
          item: `${siteUrl}/about`,
        },
      ],
    },

    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'Alzareen Global Overseas',
      publisher: {
        '@id': `${siteUrl}/#organization`,
      },
    },
  ],
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <AboutPageDetail />
    </>
  );
}
