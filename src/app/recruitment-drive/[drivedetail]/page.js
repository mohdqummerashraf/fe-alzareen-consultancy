import { notFound } from 'next/navigation';
import RecruitmentDriveDetail from '@/components/recruitment-drive/RecruitmentDriveDetail';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.wayportcareers.com';

async function getDrive(slug) {
  if (!slug) return null;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recruitment-drives/${slug}/`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error('Error fetching drive:', error);
    return null;
  }
}

export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recruitment-drives/`);
    const data = await res.json();
    const drives = data.results || data;

    return drives.map((drive) => ({ drivedetail: drive.slug }));
  } catch (error) {
    console.error('generateStaticParams error:', error);
    return [];
  }
}

function stripHtml(html) {
  return (html || '').replace(/<[^>]*>/g, '').trim();
}

export async function generateMetadata({ params }) {
  const { drivedetail } = await params;
  const drive = await getDrive(drivedetail);

  if (!drive) {
    return {
      title: 'Recruitment Drive Not Found | Alzareen International Careers',
      robots: { index: false, follow: false },
    };
  }

  const title = drive.meta_title || `${drive.title} | ${drive.vacancies} Vacancies`;
  const description =
    drive.meta_description || stripHtml(drive.description).slice(0, 160) || `${drive.title} — hiring in ${drive.country}.`;
  const canonicalUrl = `${SITE_URL}/recruitment-drive/${drive.slug}`;

  return {
    title,
    description,
    keywords: drive.meta_keywords || `${drive.title}, overseas jobs, ${drive.country} jobs`,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      type: 'website',
      url: canonicalUrl,
      images: drive.poster ? [{ url: drive.poster }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: drive.poster ? [drive.poster] : [],
    },
    robots: { index: true, follow: true },
  };
}

export default async function RecruitmentDrivePage({ params }) {
  const { drivedetail } = await params;
  const drive = await getDrive(drivedetail);

  if (!drive) {
    notFound();
  }

  return <RecruitmentDriveDetail drive={drive} />;
}