const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://alzareenglobaloverseas.com';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function getAllPaginatedResults(endpoint) {
  const results = [];
  let url = `${API_URL}${endpoint}`;

  try {
    while (url) {
      const response = await fetch(url, {
        next: {
          revalidate: 3600,
        },
      });

      if (!response.ok) break;

      const data = await response.json();

      if (Array.isArray(data)) {
        results.push(...data);
        break;
      }

      results.push(...(data.results || []));

      url = data.next || null;

      // Prevent accidentally following an external API URL.
      if (url && !url.startsWith(API_URL)) {
        break;
      }
    }
  } catch (error) {
    console.error(`Sitemap fetch error: ${endpoint}`, error);
  }

  return results;
}

export default async function sitemap() {
  const [jobs, recruitmentDrives] = await Promise.all([
    getAllPaginatedResults('/jobs/'),
    getAllPaginatedResults('/recruitment-drives/'),
  ]);

  const staticPages = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/job-listing`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/recruitment-drive`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  const jobPages = jobs
    .filter((job) => job.is_active !== false && job.slug)
    .map((job) => ({
      url: `${SITE_URL}/job-listing/${job.slug}`,
      lastModified: job.updated_at ? new Date(job.updated_at) : new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    }));

  const drivePages = recruitmentDrives
    .filter((drive) => drive.is_active !== false && drive.slug)
    .map((drive) => ({
      url: `${SITE_URL}/recruitment-drive/${drive.slug}`,
      lastModified: drive.updated_at ? new Date(drive.updated_at) : new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    }));

  return [...staticPages, ...jobPages, ...drivePages];
}
