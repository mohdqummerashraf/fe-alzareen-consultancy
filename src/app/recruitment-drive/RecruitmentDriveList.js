import Breadcrumb from '@/components/SEO/Breadcrumb';
import HeroSection from '@/components/common/HeroSection';
import PaginationClient from '@/components/common/PaginationClient';
import ResultNotFound from '@/components/common/ResultNotFound';
import SearchFilter from '@/components/common/SearchFilter';
import dynamic from 'next/dynamic';

import JobPostCard from './JobPostCard';
import styles from './RecruitmentDrivesPage.module.css';

const LeadForm = dynamic(() => import('@/components/forms/LeadForm'));

export default function RecruitmentDriveList({
  recruitmentDrives = [],
  total = 0,
  currentPage = 1,
  totalPages = 1,
}) {
  return (
    <>
      {/* Hero */}
      <HeroSection
        eyebrow="Overseas Recruitment"
        title="Find Overseas Recruitment"
        highlight="Drives"
        description="Explore active hiring campaigns and recruitment drives for overseas jobs across the GCC and other international destinations."
        stats={[
          {
            icon: '💼',
            value: '1000+',
            label: 'Job Vacancies',
          },
          {
            icon: '🌍',
            value: '20+',
            label: 'Countries',
          },
          {
            icon: '🏢',
            value: '100+',
            label: 'Recruitment Drives',
          },
          {
            icon: '✅',
            value: 'Trusted',
            label: 'Employers',
          },
        ]}
      />

      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          {
            label: 'Home',
            href: '/',
          },
          {
            label: 'Recruitment Drives',
          },
        ]}
      />

      {/* SEO Content */}
      <section className={styles.seoSection}>
        <h2>Overseas Recruitment Drives and Hiring Campaigns</h2>

        <p>
          Browse active recruitment drives through Alzareen Global Overseas and discover overseas
          employment opportunities across the UAE, Saudi Arabia, Qatar, Kuwait, Oman and other
          international destinations.
        </p>

        <p>
          Recruitment drives may include multiple vacancies and positions for industries such as
          construction, hospitality, healthcare, engineering, security, facility management and
          other sectors. Open a recruitment drive to view available positions, requirements,
          vacancies and application details.
        </p>
      </section>

      {/* Search & Filters */}
      <section className={styles.filterSection}>
        <SearchFilter
          basePath="/recruitment-drive"
          searchPlaceholder="Job title, skill or company"
          submitLabel="Find Drives"
        />
      </section>

      {/* Results Header */}
      <div className={styles.recruitmentDrivesContainer}>
        <div>
          <h2 className={styles.recruitmentDrivesTitle}>Latest Recruitment Drives</h2>

          <p className={styles.recruitmentDrivesSubtitle}>
            Explore current overseas hiring campaigns and available positions.
          </p>
        </div>

        <span className={styles.recruitmentDrivesCount}>
          Showing {recruitmentDrives.length} of {total} drives
        </span>
      </div>

      {/* Recruitment Drives */}
      <section>
        {recruitmentDrives.length > 0 ? (
          <div className={styles.drivesGrid}>
            {recruitmentDrives.map((drive) => (
              <JobPostCard key={drive.id || drive.slug} drive={drive} />
            ))}
          </div>
        ) : (
          <ResultNotFound
            type="drives"
            actionLabel="Clear filters"
            actionHref="/recruitment-drive"
          />
        )}
      </section>

      {/* Pagination */}
      {recruitmentDrives.length > 0 && totalPages > 1 && (
        <PaginationClient
          basePath="/recruitment-drive"
          currentPage={currentPage}
          totalPages={totalPages}
        />
      )}

      {/* Lead Form */}
      <LeadForm source="recruitment_drives_page" />
    </>
  );
}
