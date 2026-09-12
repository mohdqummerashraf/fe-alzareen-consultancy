import { getCountryJobCount, getJobCountsByCountry } from '@/services/getJobCountsByCountry';
import CountryDetail from './CountryDetail';
import { countries } from './data';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.alzareenglobaloverseas.com';

export const metadata = {
  title: 'Overseas Job Destinations | UAE, Saudi Arabia, Qatar & More | Alzareen International',
  description:
    'Explore verified overseas job opportunities across the GCC, Europe, and Asia. Compare salaries, visa requirements, and active recruitment drives by country.',
  keywords: [
    'overseas jobs by country',
    'jobs in UAE',
    'jobs in Saudi Arabia',
    'jobs in Qatar',
    'Gulf recruitment',
    'GCC jobs for Indians',
    'work visa countries',
    'overseas manpower recruitment',
  ],
  alternates: { canonical: `${SITE_URL}/countries` },
  openGraph: {
    title: 'Overseas Job Destinations | Alzareen International',
    description: 'Explore verified overseas job opportunities across the GCC, Europe, and Asia.',
    url: `${SITE_URL}/countries`,
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default async function CountriesPage() {
  const jobCounts = await getJobCountsByCountry();

  const countriesWithJobs = countries.filter((c) => getCountryJobCount(jobCounts, c) > 0);

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: countriesWithJobs.map((c, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: c.name,
      url: `${SITE_URL}/countries/${c.slug}`,
    })),
  };

  return (
    <>
      {countriesWithJobs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
      )}
      <CountryDetail />
    </>
  );
}
