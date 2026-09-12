export const homeJSONLD = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Alzareen Global Overseas | Overseas Recruitment & GCC Jobs',
  description:
    'Alzareen Global Overseas is an overseas recruitment and manpower consultancy connecting skilled and semi-skilled candidates with employment opportunities across the GCC and other international markets.',
  url: 'https://alzareenglobaloverseas.com',
  isPartOf: {
    '@type': 'WebSite',
    name: 'Alzareen Global Overseas',
    url: 'https://alzareenglobaloverseas.com',
  },
  about: {
    '@type': 'Organization',
    name: 'Alzareen Global Overseas',
    url: 'https://alzareenglobaloverseas.com',
  },
};

export const WebsiteSchema = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Alzareen International',
        url: 'https://alzareenglobaloverseas.com',
      }),
    }}
  />
);

export const OrganizationSchema = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Alzareen International',
        url: 'https://alzareenglobaloverseas.com',
        logo: 'https://alzareenglobaloverseas.com/logo.png',
      }),
    }}
  />
);
