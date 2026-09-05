const EMPLOYMENT_TYPE_MAP = {
  full_time: 'FULL_TIME',
  part_time: 'PART_TIME',
  contract: 'CONTRACTOR',
  internship: 'INTERN',
};

export function jobPostingSchema(job, siteUrl) {
  if (!job) return null;

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
    url: job.slug ? `${siteUrl}/job-listing/${job.slug}` : undefined,
    datePosted: job.created_at,
    validThrough: job.application_deadline || undefined,
    employmentType: EMPLOYMENT_TYPE_MAP[job.job_type] || 'FULL_TIME',
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

  return JSON.parse(JSON.stringify(schema)); // strips undefined keys
}