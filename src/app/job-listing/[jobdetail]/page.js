import { notFound } from 'next/navigation';
import JobDetail from '@/components/jobs/JobDetail';

async function getJobBySlug(slug) {
  if (!slug) return null;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs/${slug}/`, {
      next: {
        revalidate: Number(process.env.ISR_REVALIDATE_SECONDS || 86400),
      },
    });

    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`Failed to fetch job "${slug}": ${res.status}`);

    return res.json();
  } catch (error) {
    console.error(`Job fetch error for slug "${slug}":`, error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { jobdetail } = await params;
  const job = await getJobBySlug(jobdetail);

  if (!job) {
    return { title: 'Job Not Found | Alzareen International' };
  }

  const title = job.meta_title || `${job.title} at ${job.company || 'Alzareen International'} | ${job.country || ''}`;
  const description =
    job.meta_description ||
    `${job.title} in ${job.location || job.country || 'the Gulf'}. ${job.salary_display || ''} Apply now through Alzareen International.`.trim();

  return {
    title,
    description,
    keywords: job.meta_keywords || undefined,
    alternates: {
      canonical: `https://www.alzareeninternational.com/job-listing/${job.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.alzareeninternational.com/job-listing/${job.slug}`,
      type: 'website',
      images: job.og_image || job.banner_image ? [{ url: job.og_image || job.banner_image }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: job.og_image || job.banner_image ? [job.og_image || job.banner_image] : undefined,
    },
    robots: { index: job.is_active !== false, follow: true },
  };
}

export default async function JobDetailsPage({ params }) {
  const { jobdetail } = await params;
  const job = await getJobBySlug(jobdetail);

  if (!job) {
    notFound();
  }

  return <JobDetail job={job} />;
}