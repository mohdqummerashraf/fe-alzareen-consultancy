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
