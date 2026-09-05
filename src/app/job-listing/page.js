import JobsListingPage from './JobListingPage';

async function getJobs(params) {
  const query = new URLSearchParams();

  if (params.country) query.append('country', params.country);
  if (params.category) query.append('category', params.category);
  if (params.job_type) query.append('job_type', params.job_type);
  if (params.location) query.append('location', params.location);
  if (params.posted_within) query.append('posted_within', params.posted_within);
  if (params.search) query.append('search', params.search);
  if (params.page) query.append('page', params.page);

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/job-listing/?${query.toString()}`, {
      next: { revalidate: Number(process.env.ISR_REVALIDATE_SECONDS) || 3600 },
    });
    if (!res.ok) throw new Error(`Failed to fetch job listings: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error('Job listings fetch error:', error);
    return { count: 0, results: [] };
  }
}

export default async function Page({ searchParams }) {
  const resolvedSearchParams = await searchParams; // Next 15+: must await
  const jobs = await getJobs(resolvedSearchParams);

  const PAGE_SIZE = 10; // must match your DRF paginator's page_size
  const currentPage = Number(resolvedSearchParams?.page) || 1;
  const totalPages = Math.max(1, Math.ceil(jobs.count / PAGE_SIZE));

  return (
    <JobsListingPage
      jobs={jobs.results}
      total={jobs.count}
      currentPage={currentPage}
      totalPages={totalPages}
    />
  );
}
