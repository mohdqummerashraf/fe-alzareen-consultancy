// components/jobs/JobSchema.jsx

export default function JobSchema({ job }) {
  if (!job) return null;

  const employmentTypeMap = {
    full_time: 'FULL_TIME',
    part_time: 'PART_TIME',
    contract: 'CONTRACTOR',
    internship: 'INTERN',
  };

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description || job.meta_description || '',
    identifier: {
      '@type': 'PropertyValue',
      name: 'Alzareen International',
      value: job.slug,
    },
    datePosted: job.created_at,
    validThrough: job.application_deadline || undefined,
    employmentType: employmentTypeMap[job.job_type] || 'FULL_TIME',
    hiringOrganization: {
      '@type': 'Organization',
      name: job.company || 'Alzareen International',
      ...(job.company_logo && { logo: job.company_logo }),
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: job.city || job.location || '',
        addressCountry: job.country || '',
      },
    },
    ...(job.salary_min &&
      job.salary_max && {
        baseSalary: {
          '@type': 'MonetaryAmount',
          currency: job.salary_currency || 'AED',
          value: {
            '@type': 'QuantitativeValue',
            minValue: job.salary_min,
            maxValue: job.salary_max,
            unitText: job.salary_period === '/yr' ? 'YEAR' : job.salary_period === '/day' ? 'DAY' : 'MONTH',
          },
        },
      }),
  };

  // Strip undefined keys so we don't emit invalid/empty schema properties
  const cleanSchema = JSON.parse(JSON.stringify(schema));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(cleanSchema) }}
    />
  );
}