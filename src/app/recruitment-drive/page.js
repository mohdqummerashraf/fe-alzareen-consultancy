import RecruitmentDriveList from './RecruitmentDriveList';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://alzareenglobaloverseas.com';

async function getDrives(params = {}) {
  const query = new URLSearchParams();

  if (params.country) {
    query.append('country', params.country);
  }

  if (params.industry) {
    query.append('industry', params.industry);
  }

  if (params.interview_mode) {
    query.append('interview_mode', params.interview_mode);
  }

  if (params.search) {
    query.append('search', params.search);
  }

  if (params.page) {
    query.append('page', params.page);
  }

  if (params.posted_within) {
    query.append('posted_within', params.posted_within);
  }

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const res = await fetch(`${apiUrl}/recruitment-drives/?${query.toString()}`, {
      next: {
        revalidate: Number(process.env.ISR_REVALIDATE_SECONDS) || 86400,
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch recruitment drives: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error('Failed to fetch recruitment drives:', error);

    return {
      count: 0,
      results: [],
      next: null,
      previous: null,
    };
  }
}

export const metadata = {
  title: 'Recruitment Drives & Overseas Hiring Campaigns',

  description:
    'Explore active overseas recruitment drives and hiring campaigns for jobs across the UAE, Saudi Arabia, Qatar, Kuwait, Oman and other international destinations.',

  alternates: {
    canonical: '/recruitment-drive',
  },

  openGraph: {
    title: 'Recruitment Drives & Overseas Hiring Campaigns | Alzareen Global Overseas',

    description:
      'Browse active overseas recruitment drives and hiring campaigns across the GCC and international destinations.',

    url: '/recruitment-drive',

    siteName: 'Alzareen Global Overseas',

    locale: 'en_IN',

    type: 'website',

    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Alzareen Global Overseas Recruitment Drives',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',

    title: 'Recruitment Drives & Overseas Hiring Campaigns',

    description:
      'Explore overseas recruitment drives and hiring campaigns through Alzareen Global Overseas.',

    images: ['/og-image.jpg'],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default async function RecruitmentDrivesPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;

  const drives = await getDrives(resolvedSearchParams);

  const PAGE_SIZE = 10;

  const currentPage = Number(resolvedSearchParams?.page) || 1;

  const totalDrives = Number(drives?.count) || 0;

  const totalPages = Math.max(1, Math.ceil(totalDrives / PAGE_SIZE));

  return (
    <RecruitmentDriveList
      recruitmentDrives={drives?.results || []}
      total={totalDrives}
      currentPage={currentPage}
      totalPages={totalPages}
    />
  );
}
