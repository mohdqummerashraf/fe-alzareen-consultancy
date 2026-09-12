import JobsListingPage from './JobListingPage';

async function getJobs(params = {}) {
  const query = new URLSearchParams();

  if (params.country) query.append('country', params.country);
  if (params.category) query.append('category', params.category);
  if (params.job_type) query.append('job_type', params.job_type);
  if (params.location) query.append('location', params.location);
  if (params.posted_within) query.append('posted_within', params.posted_within);
  if (params.search) query.append('search', params.search);
  if (params.page) query.append('page', params.page);

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const res = await fetch(`${apiUrl}/job-listing/?${query.toString()}`, {
      next: {
        revalidate: Number(process.env.ISR_REVALIDATE_SECONDS) || 86400,
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch job listings: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error('Job listings fetch error:', error);

    return {
      count: 0,
      results: [],
      next: null,
      previous: null,
    };
  }
}

export const metadata = {
  title: 'Overseas Jobs & GCC Job Vacancies',

  description:
    'Explore the latest overseas job opportunities across UAE, Saudi Arabia, Qatar, Kuwait and other international destinations. Find jobs by country, category, location and experience.',

  alternates: {
    canonical: '/job-listing',
  },

  openGraph: {
    title: 'Overseas Jobs & GCC Job Vacancies | Alzareen Global Overseas',

    description:
      'Find the latest overseas and GCC job opportunities across multiple industries and destinations.',

    url: '/job-listing',

    type: 'website',

    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Alzareen Global Overseas - Overseas Jobs',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',

    title: 'Overseas Jobs & GCC Job Vacancies | Alzareen Global Overseas',

    description:
      'Find the latest overseas and GCC job opportunities through Alzareen Global Overseas.',

    images: ['/og-image.jpg'],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default async function Page({ searchParams }) {
  const resolvedSearchParams = await searchParams;

  const jobs = await getJobs(resolvedSearchParams);

  const PAGE_SIZE = 10;

  const currentPage = Number(resolvedSearchParams?.page) || 1;

  const totalJobs = Number(jobs?.count) || 0;

  const totalPages = Math.max(1, Math.ceil(totalJobs / PAGE_SIZE));

  return (
    <JobsListingPage
      jobs={jobs?.results || []}
      total={totalJobs}
      currentPage={currentPage}
      totalPages={totalPages}
    />
  );
}
