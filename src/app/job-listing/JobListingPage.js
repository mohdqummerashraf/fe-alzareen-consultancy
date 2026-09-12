import HeroSection from '@/components/common/HeroSection';
import PaginationClient from '@/components/common/PaginationClient';
import ResultNotFound from '@/components/common/ResultNotFound';
import SearchFilter from '@/components/common/SearchFilter';
import LeadForm from '@/components/forms/LeadForm';
import Breadcrumb from '@/components/SEO/Breadcrumb';
import Link from 'next/link';
import styles from './JobsListing.module.css';

function formatPosted(dateString) {
  if (!dateString) return '';

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return '';
  }

  const diffDays = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';

  return `${diffDays} days ago`;
}

export default function JobsListingPage({ jobs = [], total = 0, currentPage = 1, totalPages = 1 }) {
  return (
    <>
      {/* Hero */}
      <HeroSection
        eyebrow="Overseas Career Opportunities"
        title="Find Overseas Jobs"
        highlight="Across the GCC"
        description="Explore the latest overseas job opportunities across UAE, Saudi Arabia, Qatar, Kuwait and other international destinations. Find jobs by industry, location and experience and apply with confidence."
        stats={[
          {
            icon: '💼',
            value: '1000+',
            label: 'Job Openings',
          },
          {
            icon: '🏢',
            value: '500+',
            label: 'Hiring Companies',
          },
          {
            icon: '🌎',
            value: 'Multiple',
            label: 'Destinations',
          },
          {
            icon: '🚀',
            value: 'Career',
            label: 'Opportunities',
          },
        ]}
      />

      <main className={styles.container}>
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            {
              label: 'Home',
              href: '/',
            },
            {
              label: 'Job Listings',
            },
          ]}
        />

        {/* SEO Content */}
        <section className={styles.seoSection}>
          <h2>Latest Overseas Jobs and GCC Vacancies</h2>

          <p>
            Browse the latest overseas employment opportunities through Alzareen Global Overseas.
            Find vacancies across the UAE, Saudi Arabia, Qatar, Kuwait and other international
            destinations in industries including construction, hospitality, healthcare, engineering,
            security and more.
          </p>

          <p>
            Use the filters below to find jobs by country, category, location, employment type and
            experience. Open an individual vacancy to view the job requirements, salary, benefits
            and application details.
          </p>
        </section>

        {/* Search & Filters */}
        <SearchFilter
          basePath="/job-listing"
          searchPlaceholder="Job title, company..."
          submitLabel="Find Jobs"
        />

        {/* Job Results */}
        <section className={styles.introSection}>
          <div className={styles.resultsHead}>
            <span className={styles.resultsCount}>
              Showing {jobs.length} of {total} roles
            </span>
          </div>

          <div className={styles.grid}>
            {jobs.length === 0 ? (
              <ResultNotFound type="jobs" actionLabel="Clear filters" actionHref="/job-listing" />
            ) : (
              jobs.map((job) => {
                const category = job?.category_names?.length > 0 ? job.category_names[0] : null;

                const location = job.location || job.city || 'Location not specified';

                const country = job.country || 'International';

                const experience = job.experienceDisplay || job.experience_display;

                const salary =
                  job.salaryDisplay || job.salary_display || 'Salary as per job details';

                const postedDays = typeof job.postedDaysAgo === 'number' ? job.postedDaysAgo : null;

                const isNew = postedDays !== null ? postedDays <= 3 : false;

                return (
                  <Link
                    href={`/job-listing/${job.slug}`}
                    className={styles.card}
                    key={job.id || job.slug}
                  >
                    {/* Job Header */}
                    <div className={styles.cardTop}>
                      <h3 className={styles.cardRole}>{job.title}</h3>

                      {job.created_at && (
                        <span
                          className={`${styles.postedBadge} ${
                            isNew ? styles.postedNew : styles.postedOlder
                          }`}
                        >
                          {formatPosted(job.created_at)}
                        </span>
                      )}
                    </div>

                    {/* Job Meta */}
                    <div className={styles.cardMeta}>
                      <span className={`${styles.metaTag} ${styles.tagBlue}`}>
                        {location}, {country}
                      </span>

                      {category && (
                        <span className={`${styles.metaTag} ${styles.tagPurple}`}>{category}</span>
                      )}

                      {experience && (
                        <span className={`${styles.metaTag} ${styles.tagAmber}`}>{experience}</span>
                      )}
                    </div>

                    {/* Job Footer */}
                    <div className={styles.cardFooter}>
                      <span className={styles.salary}>{salary}</span>

                      <span className={styles.applyBtn}>Apply →</span>
                    </div>
                  </Link>
                );
              })
            )}
          </div>

          {/* Pagination */}
          {jobs.length > 0 && totalPages > 1 && (
            <PaginationClient
              basePath="/job-listing"
              currentPage={currentPage}
              totalPages={totalPages}
            />
          )}

          {/* Lead Form */}
          <div className={styles.formSection}>
            <LeadForm source="jobs_listing_page" />
          </div>
        </section>
      </main>
    </>
  );
}
