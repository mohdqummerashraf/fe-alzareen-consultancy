import Image from 'next/image';
import Link from 'next/link';
import DriveSchema from './DriveSchema';
import {
  FaMapMarkerAlt,
  FaIndustry,
  FaUsers,
  FaListOl,
  FaCalendarAlt,
  FaClipboardList,
  FaListUl,
  FaFileAlt,
  FaBriefcase,
} from 'react-icons/fa';
import Breadcrumb from '../SEO/Breadcrumb';
import styles from '@/styles/recruitment/RecruitmentDetailPage.module.css';
import LeadForm from '../forms/LeadForm';

const infoItems = (drive) => [
  { icon: FaMapMarkerAlt, label: 'Country', value: drive.country, color: styles.iconRose },
  { icon: FaIndustry, label: 'Industry', value: drive.industry, color: styles.iconBlue },
  {
    icon: FaUsers,
    label: 'Total Vacancies',
    value: drive.vacancies != null ? `${drive.vacancies} Openings` : null,
    color: styles.iconPurple,
  },
  {
    icon: FaListOl,
    label: 'Positions',
    value: drive.positions != null ? `${drive.positions} Roles` : null,
    color: styles.iconIndigo,
  },
  {
    icon: FaCalendarAlt,
    label: 'Posted',
    value: drive.postedDaysAgo != null ? `${drive.postedDaysAgo} days ago` : null,
    color: styles.iconAmber,
  },
].filter((item) => item.value);

export default function RecruitmentDriveDetail({ drive }) {
  if (!drive) return null;

  const isNew = drive.postedDaysAgo != null && drive.postedDaysAgo <= 5;

  return (
    <>
      <DriveSchema
       drive={drive} />

      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Recruitment Drives', href: '/recruitment-drive' },
          { label: drive.title },
        ]}
      />

      <section className={styles.driveDetail}>
        {/* Hero */}
        <div className={styles.driveHero}>
          {drive.poster && (
            <>
              <div className={styles.heroBanner}>
                <Image
                  src={drive.poster}
                  alt=""
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 1180px"
                />
              </div>
              <div className={styles.heroBannerOverlay} aria-hidden="true" />
            </>
          )}

          <div className={styles.heroContent}>
            <span className={`${styles.statusBadge} ${isNew ? styles.statusUpcoming : styles.statusClosingSoon}`}>
              <span className={styles.statusDot} aria-hidden="true" />
              {isNew ? 'Newly Posted' : 'Hiring Now'}
            </span>

            <h1>{drive.title}</h1>

            {(drive.country || drive.industry) && (
              <p className={styles.driveCompany}>
                <FaMapMarkerAlt aria-hidden="true" />
                {[drive.country, drive.industry].filter(Boolean).join(' · ')}
              </p>
            )}

            <div className={styles.driveMeta}>
              {drive.vacancies != null && <span>{drive.vacancies} Vacancies</span>}
              {drive.positions != null && <span>{drive.positions} Positions</span>}
              {drive.country && <span>{drive.country}</span>}
            </div>
          </div>
        </div>

        {/* Info grid */}
        {infoItems(drive).length > 0 && (
          <div className={styles.infoGrid}>
            {infoItems(drive).map(({ icon: Icon, label, value, color }) => (
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

        {drive.description && (
          <section className={`${styles.section} ${styles.sectionBlue}`}>
            <h2>
              <span className={styles.sectionIcon}>
                <FaClipboardList aria-hidden="true" />
              </span>
              About This Drive
            </h2>
            <div dangerouslySetInnerHTML={{ __html: drive.description }} />
          </section>
        )}

        {drive.vacancyBreakdown && drive.vacancyBreakdown.length > 0 && (
          <section className={`${styles.section} ${styles.sectionIndigo}`}>
            <h2>
              <span className={styles.sectionIcon}>
                <FaBriefcase aria-hidden="true" />
              </span>
              Vacancies by Role
            </h2>
            <div className={styles.rolesList}>
              {drive.vacancyBreakdown.map((v) => (
                <div className={styles.roleRow} key={v.id || v.slug}>
                  <span className={styles.roleName}>{v.title}</span>
                  <div className={styles.roleTags}>
                    {v.total_positions != null && (
                      <span className={styles.roleTag}>{v.total_positions} openings</span>
                    )}
                    {v.salaryDisplay && <span className={styles.roleTag}>{v.salaryDisplay}</span>}
                    {v.slug && (
                      <Link href={`/job-listing/${v.slug}`} className={styles.roleApplyLink}>
                        Apply
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {drive.eligibility && drive.eligibility.length > 0 && (
          <section className={`${styles.section} ${styles.sectionAmber}`}>
            <h2>
              <span className={styles.sectionIcon}>
                <FaListUl aria-hidden="true" />
              </span>
              Eligibility Criteria
            </h2>
            <ul className={styles.featureList}>
              {drive.eligibility.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {drive.documentsRequired && drive.documentsRequired.length > 0 && (
          <section className={`${styles.section} ${styles.sectionGreen}`}>
            <h2>
              <span className={styles.sectionIcon}>
                <FaFileAlt aria-hidden="true" />
              </span>
              Documents to Carry
            </h2>
            <ul className={styles.featureList}>
              {drive.documentsRequired.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {drive.benefits && drive.benefits.length > 0 && (
          <section className={`${styles.section} ${styles.sectionAmber}`}>
            <h2>
              <span className={styles.sectionIcon}>
                <FaFileAlt aria-hidden="true" />
              </span>
              Benefits
            </h2>
            <ul className={styles.featureList}>
              {drive.benefits.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        <LeadForm source="recruitment_drive_detail_page" jobTitle={drive.title} />
      </section>
    </>
  );
}