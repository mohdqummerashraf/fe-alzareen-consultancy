import Breadcrumb from '@/components/SEO/Breadcrumb';
import HeroSection from '@/components/common/HeroSection';
import JobPostCard from './JobPostCard';
import styles from './RecruitmentDrivesPage.module.css';
import PaginationClient from '@/components/common/PaginationClient';
import dynamic from 'next/dynamic';
import ResultNotFound from '@/components/common/ResultNotFound';
import SearchFilter from '@/components/common/SearchFilter';

const LeadForm = dynamic(() => import('@/components/forms/LeadForm'));

function RecruitmentDriveList({
  recruitmentDrives = [],
  total = 0,
  currentPage = 1,
  totalPages = 1,
}) {
  return (
    <>
      <HeroSection
        eyebrow="Overseas Recruitment"
        title="Find Recruitment Drives Across"
        highlight="20+ Countries"
        description="Browse active hiring campaigns from UAE, Saudi Arabia, Qatar, Kuwait, Oman, Europe and Asia."
        stats={[
          { icon: '💼', value: '1000+', label: 'Active Vacancies' },
          { icon: '🌍', value: '20+', label: 'Countries' },
          { icon: '🏢', value: '100+', label: 'Recruitment Drives' },
          { icon: '✅', value: 'Trusted', label: 'Verified Employers' },
        ]}
      />
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Recruitment Drives' }]} />

      <section className={styles.filterSection}>
        <SearchFilter
          basePath="/recruitment-drive"
          searchPlaceholder="Job title, skill or company"
          submitLabel="Find Drives"
          // showIndustry
          // showInterviewMode
        />{' '}
      </section>

      <div className={styles.recruitmentDrivesContainer}>
        <h2 className={styles.recruitmentDrivesTitle}>Recruitment Drives</h2>
        <span className={styles.recruitmentDrivesCount}>
          Showing {recruitmentDrives.length} of {total} drives
        </span>
      </div>

      <section>
        {recruitmentDrives.length > 0 ? (
          <div className={styles.drivesGrid}>
            {recruitmentDrives.map((drive) => (
              <JobPostCard key={drive.id} drive={drive} />
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

      <PaginationClient currentPage={currentPage} totalPages={totalPages} />
      <LeadForm source="recruitment_drives_page" />
    </>
  );
}

export default RecruitmentDriveList;
