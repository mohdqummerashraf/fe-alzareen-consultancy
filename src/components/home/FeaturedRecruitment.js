import Link from 'next/link';
import styles from '@/styles/home/FeaturedRecruitment.module.css';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

async function getRecruitmentDrives(limit = 6) {
  try {
    const res = await fetch(`${API_BASE_URL}/recruitment-drives/`, {
      next: {
        revalidate: Number(process.env.ISR_REVALIDATE_SECONDS) || 60,
      },
    });

    if (!res.ok) {
      // console.error('FeaturedRecruitment: API returned', res.status, res.statusText);

      return {
        drives: [],
        total: 0,
      };
    }

    const data = await res.json();

    return {
      drives: (data.results || []).slice(0, limit),
      total: data.count || 0,
    };
  } catch (error) {
    console.error('FeaturedRecruitment fetch failed:', error);

    return {
      drives: [],
      total: 0,
    };
  }
}

async function FeaturedRecruitment() {
  const { drives, total } = await getRecruitmentDrives();

  return (
    <section
      id="recruitment-drives"
      className={styles.section}
      aria-labelledby="recruitment-drives-heading"
    >
      <div className={styles.wrap}>
        <div className={styles.sectionHead}>
          <div>
            <span className={styles.eyebrow}>Recruitment Drives</span>

            <h2 id="recruitment-drives-heading">Latest Recruitment Drives</h2>
          </div>

          <p>
            Explore the latest overseas recruitment drives from leading employers across UAE, Saudi
            Arabia, Qatar, Kuwait and other Gulf countries.
          </p>
        </div>

        <div className={styles.board} role="table" aria-label="Recruitment drives">
          <div className={styles.boardHead} role="row">
            <div role="columnheader">Drive</div>
            <div role="columnheader">Location</div>
            <div role="columnheader">Industry</div>
            <div role="columnheader">Vacancies</div>
            <div role="columnheader">Action</div>
          </div>

          {drives.length === 0 && (
            <div className={styles.boardEmpty}>No recruitment drives available right now.</div>
          )}

          {drives.map((drive) => (
            <div className={styles.boardRow} role="row" key={drive.id}>
              <div className={styles.role} role="cell" data-label="Drive">
                <Link href={`/recruitment-drive/${drive.slug}`}>{drive.title}</Link>

                <span>
                  {drive.positions} Position
                  {drive.positions > 1 ? 's' : ''}
                </span>
              </div>

              <div className={styles.flip} role="cell" data-label="Location">
                {(drive.country === 'United Arab Emirates' ? 'UAE' : drive.country) || 'TBA'}
                {drive.city ? ` — ${drive.city}` : ''}
              </div>

              <div className={styles.flip} role="cell" data-label="Industry">
                {drive.industry}
              </div>

              <div className={styles.flip} role="cell" data-label="Vacancies">
                {drive.vacancies}
              </div>

              <Link href={`/recruitment-drive/${drive.slug}`}>View →</Link>
            </div>
          ))}

          {total > 0 && (
            <div className={styles.boardMore}>
              <Link href="/recruitment-drive">View all {total} recruitment drives →</Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default FeaturedRecruitment;
