import Link from 'next/link';
import styles from './JobsListing.module.css';
import ResultNotFound from '@/components/common/ResultNotFound';
import HeroSection from '@/components/common/HeroSection';
import Breadcrumb from '@/components/SEO/Breadcrumb';
import LeadForm from '@/components/forms/LeadForm';
import PaginationClient from '@/components/common/PaginationClient';
import SearchFilter from '@/components/common/SearchFilter';

function formatPosted(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  const diffDays = Math.floor((Date.now() - date) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  return `${diffDays} days ago`;
}

export default function JobsListingPage({ jobs = [], total = 0, currentPage = 1, totalPages = 1 }) {
  return (
    <>
      <HeroSection
        eyebrow="Career Opportunities"
        title="Find Your Next"
        highlight="Dream Job"
        description="Explore exciting job opportunities across industries and locations. Connect with leading employers, apply with confidence, and take the next step in your professional journey."
        stats={[
          { icon: '💼', value: '1000+', label: 'Job Openings' },
          { icon: '🏢', value: '500+', label: 'Hiring Companies' },
          { icon: '🌎', value: 'Multiple', label: 'Locations' },
          { icon: '🚀', value: 'Career', label: 'Growth' },
        ]}
      />

      <main className={styles.container}>
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Job Listings' }]} />

        <SearchFilter
          basePath="/job-listing"
          searchPlaceholder="Job title, company..."
          submitLabel="Find Jobs"
        />

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
              jobs.map((job) => (
                <Link href={`/job-listing/${job.slug}`} className={styles.card} key={job.id}>
                  <div className={styles.cardTop}>
                    <h3 className={styles.cardRole}>{job.title}</h3>
                    <span
                      className={`${styles.postedBadge} ${
                        job.postedDaysAgo <= 3 ? styles.postedNew : styles.postedOlder
                      }`}
                    >
                      {formatPosted(job.created_at)}
                    </span>
                  </div>

                  <div className={styles.cardMeta}>
                    <span className={`${styles.metaTag} ${styles.tagBlue}`}>
                      {job.location}, {job.country}
                    </span>
                    <span className={`${styles.metaTag} ${styles.tagPurple}`}>
                      {job?.category_names?.[0]}
                    </span>
                    {job.experienceDisplay && (
                      <span className={`${styles.metaTag} ${styles.tagAmber}`}>
                        {job.experienceDisplay}
                      </span>
                    )}
                  </div>

                  <div className={styles.cardFooter}>
                    <span className={styles.salary}>{job.salaryDisplay}</span>
                    <span className={styles.applyBtn}>Apply →</span>
                  </div>
                </Link>
              ))
            )}
          </div>

          {jobs.length > 0 && (
            <PaginationClient
              basePath="/job-listing"
              currentPage={currentPage}
              totalPages={totalPages}
            />
          )}

          <div className={styles.formSection}>
            <LeadForm source="jobs_listing_page" />
          </div>
        </section>
      </main>
    </>
  );
}
