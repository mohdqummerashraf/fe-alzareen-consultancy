// components/jobs/JobDetail.jsx

import Image from 'next/image';
import {
  FaBuilding,
  FaBriefcase,
  FaClock,
  FaFileContract,
  FaPassport,
  FaUserClock,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaClipboardList,
  FaTasks,
  FaListUl,
  FaGift,
} from 'react-icons/fa';
import JobSchema from './JobSchema';
import styles from '@/styles/Job/JobDetailPage.module.css';
import LeadForm from '../forms/LeadForm';
import Breadcrumb from '../SEO/Breadcrumb';

const JOB_TYPE_LABELS = {
  full_time: 'Full-time',
  part_time: 'Part-time',
  contract: 'Contract',
  internship: 'Internship',
};

const infoItems = (job) => [
  { icon: FaBuilding, label: 'Company', value: job.company, color: styles.iconBlue },
  {
    icon: FaBriefcase,
    label: 'Employment Type',
    value: JOB_TYPE_LABELS[job.job_type] || job.job_type,
    color: styles.iconPurple,
  },
  { icon: FaClock, label: 'Duty Hours', value: job.duty_hours, color: styles.iconTeal },
  {
    icon: FaFileContract,
    label: 'Contract Length',
    value: job.contract_length,
    color: styles.iconAmber,
  },
  { icon: FaPassport, label: 'Visa Type', value: job.visa_type, color: styles.iconRose },
  { icon: FaUserClock, label: 'Age Limit', value: job.ageDisplay, color: styles.iconIndigo },
].filter((item) => item.value);

export default function JobDetail({ job }) {
  if (!job) return null;

const facilities = [
  job.accommodation_provided && 'Accommodation Provided',   // always undefined, dead
  job.transportation_provided && 'Transportation Provided', // always undefined, dead
  job.free_visa && job.free_visa_note,                       // this one works
].filter(Boolean);

  return (
    <>
      <JobSchema job={job} />
<Breadcrumb
  items={[
    { label: 'Home', href: '/' },
    { label: 'Job Listings', href: '/job-listing' },
    { label: job.title },
  ]}
/>

      <section className={styles.jobDetail}>
        {/* Hero */}
        <div className={styles.jobHero}>
          {job.banner_image && (
            <>
              <div className={styles.heroBanner}>
                <Image
                  src={job.banner_image}
                  alt=""
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 1180px"
                />
              </div>
              <div className={styles.heroBannerOverlay} aria-hidden="true" />
            </>
          )}

          <div className={styles.heroTopRow}>
            {job.company_logo ? (
              <span className={styles.companyLogo}>
                <Image src={job.company_logo} alt={`${job.company} logo`} width={56} height={56} />
              </span>
            ) : (
              <span className={styles.companyLogoFallback} aria-hidden="true">
                {job.company?.charAt(0) || 'A'}
              </span>
            )}
            <div>
              <h1>{job.title}</h1>
              {(job.location || job.country) && (
                <p className={styles.jobLocation}>
                  <FaMapMarkerAlt aria-hidden="true" />
                  {[job.location, job.country].filter(Boolean).join(', ')}
                </p>
              )}
            </div>
          </div>

          <div className={styles.jobMeta}>
{job.salaryDisplay && <span>{job.salaryDisplay}</span>}
{job.experienceDisplay && <span>{job.experienceDisplay}</span>}
            {job.total_positions != null && <span>{job.total_positions} Openings</span>}
          </div>
        </div>

        {/* Info grid */}
        {infoItems(job).length > 0 && (
          <div className={styles.infoGrid}>
            {infoItems(job).map(({ icon: Icon, label, value, color }) => (
              <div className={styles.infoCard} key={label}>
                <span className={`${styles.infoIconWrap} ${color}`}>
                  <Icon aria-hidden="true" />
                </span>
                <div>
                  <span className={styles.infoLabel}>{label}</span>
                  <p className={styles.infoValue}>{value}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {job.description && (
          <section className={`${styles.section} ${styles.sectionBlue}`}>
            <h2>
              <span className={styles.sectionIcon}>
                <FaClipboardList aria-hidden="true" />
              </span>
              Job Overview
            </h2>
            <div dangerouslySetInnerHTML={{ __html: job.description }} />
          </section>
        )}

        {job?.responsibility_list?.length > 0 && (
          <section className={`${styles.section} ${styles.sectionIndigo}`}>
            <h2>
              <span className={styles.sectionIcon}>
                <FaTasks aria-hidden="true" />
              </span>
              Key Responsibilities
            </h2>
            <ul className={styles.featureList}>
              {job.responsibility_list.map((item) => (
                <li key={item}>
                  <FaCheckCircle className={styles.featureIcon} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {job?.documents_required_list?.length > 0 && (
          <section className={`${styles.section} ${styles.sectionAmber}`}>
            <h2>
              <span className={styles.sectionIcon}>
                <FaListUl aria-hidden="true" />
              </span>
              Documents Required
            </h2>
            <ul className={styles.featureList}>
              {job.documents_required_list.map((item) => (
                <li key={item}>
                  <FaCheckCircle className={styles.featureIcon} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {job?.benefits_list?.length > 0 && (
          <section className={`${styles.section} ${styles.sectionGreen}`}>
            <h2>
              <span className={styles.sectionIcon}>
                <FaGift aria-hidden="true" />
              </span>
              Benefits
            </h2>
            <ul className={styles.featureList}>
              {job.benefits_list.map((item) => (
                <li key={item}>
                  <FaCheckCircle className={styles.featureIcon} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section>
          <LeadForm jobId={job?.id} source="job_detail_page" jobTitle={job.title} />
        </section>
      </section>
    </>
  );
}