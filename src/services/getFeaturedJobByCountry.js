const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function safeFetchResults(url) {
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.results || [];
  } catch (error) {
    console.error(`Featured fetch failed for ${url}:`, error);
    return [];
  }
}

/**
 * Fetches live jobs and recruitment drives for a given country,
 * normalized to the flat shape JobCardSection expects.
 */
export async function getFeaturedByCountry(countryName, limit = 6) {
  const query = encodeURIComponent(countryName);

  const [jobs, drives] = await Promise.all([
    safeFetchResults(`${API_URL}/job-listing/?country=${query}`),
    safeFetchResults(`${API_URL}/recruitment-drives/?country=${query}`),
  ]);

  const normalizedJobs = jobs.slice(0, limit).map((job) => ({
    id: job.id,
    title: job.title,
    country: job.country,
    type: 'Job',
    vacancies: job.total_positions,
    image: job.banner_image || job.company_logo || null,
    slug: `/job-listing/${job.slug}`,
  }));

  const normalizedDrives = drives.slice(0, limit).map((drive) => ({
    id: drive.id,
    title: drive.title,
    country: drive.country,
    type: 'Recruitment Drive',
    vacancies: drive.vacancies,
    image: drive.poster || null,
    slug: `/recruitment-drive/${drive.slug}`,
  }));

  return { jobs: normalizedJobs, drives: normalizedDrives };
}