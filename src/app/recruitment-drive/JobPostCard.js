import Link from 'next/link';
import styles from './JobPostCard.module.css';

function stripHtml(html) {
  if (!html || typeof html !== 'string') {
    return '';
  }

  return html
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

const JobPostCard = ({ drive }) => {
  if (!drive) return null;

  const summary = stripHtml(drive.summary);

  const country = drive.country || 'International';

  const industry = drive.industry || 'Various Industries';

  const vacancies = drive.vacancies ?? drive.total_vacancies;

  const positions = drive.positions ?? drive.total_positions;

  const postedDays = drive.postedDaysAgo ?? drive.posted_days_ago;

  return (
    <article className={styles.driveCard}>
      {/* Poster */}
      {drive.poster ? (
        <div className={styles.driveImage}>
          <img src={drive.poster} alt={`${drive.title} recruitment drive`} loading="lazy" />
        </div>
      ) : (
        <div className={styles.driveImage} aria-hidden="true" />
      )}

      <div className={styles.driveContent}>
        {/* Meta */}
        <div className={styles.driveMeta}>
          <span>{country}</span>
          <span>{industry}</span>
        </div>

        {/* Title */}
        <h3>{drive.title}</h3>

        {/* Summary */}
        {summary && <p className={styles.summary}>{summary}</p>}

        {/* Stats */}
        <div className={styles.driveStats}>
          {vacancies != null && (
            <div>
              <strong>{vacancies}</strong>
              <span>Vacancies</span>
            </div>
          )}

          {positions != null && (
            <div>
              <strong>{positions}</strong>
              <span>Positions</span>
            </div>
          )}

          {postedDays != null && (
            <div>
              <strong>{postedDays === 0 ? 'Today' : `${postedDays} Days`}</strong>

              <span>Posted</span>
            </div>
          )}
        </div>

        {/* CTA */}
        {drive.slug && (
          <Link href={`/recruitment-drive/${drive.slug}`} className={styles.viewBtn}>
            View Positions →
          </Link>
        )}
      </div>
    </article>
  );
};

export default JobPostCard;
