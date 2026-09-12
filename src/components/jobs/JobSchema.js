export default function JobSchema({ job }) {
  if (!job) return null;

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://alzareenglobaloverseas.com';

  const employmentTypeMap = {
    full_time: 'FULL_TIME',
    part_time: 'PART_TIME',
    contract: 'CONTRACTOR',
    internship: 'INTERN',
  };

  const employmentType = employmentTypeMap[job.job_type];

  const description =
    job.meta_description ||
    job.description ||
    `${job.title} job opportunity through Alzareen Global Overseas.`;

  const hiringOrganizationName = job.company || 'Alzareen Global Overseas';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',

    title: job.title,

    description,

    identifier: {
      '@type': 'PropertyValue',
      name: 'Alzareen Global Overseas',
      value: String(job.id || job.slug),
    },

    ...(job.created_at && {
      datePosted: new Date(job.created_at).toISOString(),
    }),

    ...(job.application_deadline && {
      validThrough: new Date(job.application_deadline).toISOString(),
    }),

    ...(employmentType && {
      employmentType,
    }),

    hiringOrganization: {
      '@type': 'Organization',
      name: hiringOrganizationName,

      ...(job.company_logo && {
        logo: job.company_logo,
      }),
    },

    ...(job.city || job.location || job.country
      ? {
          jobLocation: {
            '@type': 'Place',

            address: {
              '@type': 'PostalAddress',

              ...(job.city || job.location
                ? {
                    addressLocality: job.city || job.location,
                  }
                : {}),

              ...(job.country
                ? {
                    addressCountry: job.country,
                  }
                : {}),
            },
          },
        }
      : {}),

    ...(job.salary_min != null && job.salary_max != null && job.salary_currency
      ? {
          baseSalary: {
            '@type': 'MonetaryAmount',

            currency: job.salary_currency,

            value: {
              '@type': 'QuantitativeValue',

              minValue: Number(job.salary_min),

              maxValue: Number(job.salary_max),

              unitText:
                job.salary_period === '/yr'
                  ? 'YEAR'
                  : job.salary_period === '/day'
                    ? 'DAY'
                    : 'MONTH',
            },
          },
        }
      : {}),

    url: `${SITE_URL}/job-listing/${job.slug}`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}
