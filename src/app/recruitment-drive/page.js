// app/recruitment-drives/page.jsx
import RecruitmentDriveList from './RecruitmentDriveList';

async function getDrives(params) {
  const query = new URLSearchParams();

  if (params.country) query.append('country', params.country);
  if (params.industry) query.append('industry', params.industry);
  if (params.interview_mode) query.append('interview_mode', params.interview_mode);
  if (params.search) query.append('search', params.search);
  if (params.page) query.append('page', params.page);
  if (params.posted_within) query.append('posted_within', params.posted_within);

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/recruitment-drives/?${query.toString()}`,
      { next: { revalidate: Number(process.env.ISR_REVALIDATE_SECONDS) || 3600 } }
    );
    return res.json();
  } catch (err) {
    console.error('Failed to fetch recruitment drives:', err);
    return { count: 0, results: [], next: null, previous: null };
  }
}

export default async function RecruitmentDrivesPage({ searchParams }) {
  const resolvedSearchParams = await searchParams; // Next 15+: must await
  const drives = await getDrives(resolvedSearchParams);

  const PAGE_SIZE = 10; // must match your DRF paginator's page_size
  const currentPage = Number(resolvedSearchParams?.page) || 1;
  const totalPages = Math.max(1, Math.ceil(drives.count / PAGE_SIZE));
  console.log('dreiveßs', drives);

  return (
    <RecruitmentDriveList
      recruitmentDrives={drives.results}
      total={drives.count}
      currentPage={currentPage}
      totalPages={totalPages}
    />
  );
}
