import { jobPostingSchema } from '@/services/buildJobPostingSchema';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.alzareenglobaloverseas.com';

export default function DriveSchema({ drive }) {
  if (!drive) return null;

  const jobSchemas = (drive.vacancyBreakdown || [])
    .map((job) => jobPostingSchema(job, SITE_URL))
    .filter(Boolean);

  if (jobSchemas.length === 0) return null;

  return (
    <>
      {jobSchemas.map((schema, i) => (
        <script
          key={schema.identifier?.value || i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
