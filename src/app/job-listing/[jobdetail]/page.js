import JobDetail from '@/components/jobs/JobDetail';
import { notFound } from 'next/navigation';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://alzareenglobaloverseas.com';

async function getJobBySlug(slug) {
  if (!slug) return null;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs/${slug}/`, {
      next: {
        revalidate: Number(process.env.ISR_REVALIDATE_SECONDS) || 86400,
      },
    });

    if (res.status === 404) {
      return null;
    }

    if (!res.ok) {
      throw new Error(`Failed to fetch job "${slug}": ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error(`Job fetch error for slug "${slug}":`, error);

    return null;
  }
}

export async function generateMetadata({ params }) {
  const { jobdetail } = await params;
  const job = await getJobBySlug(jobdetail);

  if (!job) {
    return {
      title: 'Job Not Found | Alzareen Global Overseas',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title =
    job.meta_title ||
    `${job.title}${job.company ? ` at ${job.company}` : ''}${
      job.country ? ` | ${job.country}` : ''
    }`;

  const description =
    job.meta_description ||
    `${job.title} ${job.location || job.country ? `in ${job.location || job.country}` : ''}. ${
      job.salary_display || job.salaryDisplay || ''
    } Apply through Alzareen Global Overseas.`.trim();

  const canonicalUrl = `${SITE_URL}/job-listing/${job.slug}`;

  const socialImage = job.og_image || job.banner_image || '/og-image.jpg';

  return {
    title,
    description,

    keywords: job.meta_keywords || undefined,

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Alzareen Global Overseas',
      locale: 'en_IN',
      type: 'website',

      images: [
        {
          url: socialImage,
          alt: `${job.title} - Alzareen Global Overseas`,
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [socialImage],
    },

    robots: {
      index: job.is_active !== false,
      follow: true,
    },
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
