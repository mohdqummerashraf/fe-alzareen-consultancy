import React from 'react';
import Link from 'next/link';
import styles from './JobPostCard.module.css';

const JobPostCard = ({ drive }) => {
  if (!drive) return null;

  const summaryHtml = typeof drive.summary === 'string' ? drive.summary : '';

  return (
    <article className={styles.driveCard}>
      <div className={styles.driveImage}>
        <img src={drive.poster} alt={drive.title} />
      </div>

      <div className={styles.driveContent}>
        <div className={styles.driveMeta}>
          <span>{drive.country}</span>
          <span>{drive.industry}</span>
        </div>

        <h2>{drive.title}</h2>

        {summaryHtml && (
          <div className={styles.summary} dangerouslySetInnerHTML={{ __html: summaryHtml }} />
        )}

        <div className={styles.driveStats}>
          <div>
            <strong>{drive.vacancies}</strong>
            <span>Vacancies</span>
          </div>
          <div>
            <strong>{drive.positions}</strong>
            <span>Positions</span>
          </div>
          <div>
            <strong>{drive.postedDaysAgo} Days</strong>
            <span>Posted</span>
          </div>
        </div>

        <Link href={`/recruitment-drive/${drive.slug}`} className={styles.viewBtn}>
          View Positions →
        </Link>
      </div>
    </article>
  );
};

export default JobPostCard;