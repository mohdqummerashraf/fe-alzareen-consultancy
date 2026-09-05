export const WebsiteSchema = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Alzareen International',
        url: 'https://alzareeninternational.com',
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
        url: 'https://alzareeninternational.com',
        logo: 'https://alzareeninternational.com/logo.png',
      }),
    }}
  />
);
