import Link from 'next/link';
import styles from '@/styles/Home/LatestJobs.module.css';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

async function getLatestJobs(limit = 6) {
  try {
    const res = await fetch(`${API_BASE_URL}/jobs/`, {
      next: { revalidate: Number(process.env.ISR_REVALIDATE_SECONDS) || 60 },
    });

    if (!res.ok) {
      // console.error('LatestJobs: API returned', res.status, res.statusText);
      return { jobs: [], total: 0 };
    }

    const data = await res.json();
    const results = data.results ?? [];

    return { jobs: results.slice(0, limit), total: data.count ?? results.length };
  } catch (err) {
    // console.error('LatestJobs: fetch failed ->', err);
    return { jobs: [], total: 0 };
  }
}

async function LatestJobs() {
  const { jobs, total } = await getLatestJobs();

  return (
    <section id="board" className={styles.section} aria-labelledby="board-heading">
      <div className={styles.wrap}>
        <div className={styles.sectionHead}>
          <div>
            <span className={styles.eyebrow}>Jobs</span>
            <h2 id="board-heading" className={styles.sectionTitle}>
              Latest Featured Jobs
            </h2>
          </div>
          <p>
            Roles are added and refreshed daily as our partner employers confirm openings. Apply
            before the gate closes.
          </p>
        </div>

        <div className={styles.board} role="table" aria-label="Open job listings">
          <div className={styles.boardHead} role="row">
            <div role="columnheader">Role</div>
            <div role="columnheader">Destination</div>
            <div role="columnheader">Salary (mo.)</div>
            <div role="columnheader" style={{ textAlign: 'center' }}>
              Openings
            </div>
            <div role="columnheader">Action</div>
          </div>

          {jobs.length === 0 && (
            <div className={styles.boardEmpty}>
              No open roles right now — check back soon, or browse recruitment drives instead.
            </div>
          )}

          {jobs.map((job) => (
            <div className={styles.boardRow} role="row" key={job.id}>
              <div className={styles.role} role="cell" data-label="Role">
                {' '}
                {job.title} <span>{job.company}</span>
              </div>
              <div className={styles.flip} role="cell" data-label="Destination">
                {' '}
                {(job.country === 'United Arab Emirates' ? 'UAE' : job.country) || 'Location TBC'}
                {job.city ? ` — ${job.city}` : ''}
              </div>
              <div className={styles.flip} role="cell" data-label="Salary per month">
                {' '}
                {job.salaryDisplay || '—'}
              </div>
              <div
                className={styles.flip}
                role="cell"
                data-label="Openings"
                style={{ textAlign: 'center' }}
              >
                {' '}
                {job.total_positions}
              </div>
              <Link
                className={styles.boardApply}
                href={`/job-listing/${job.slug}`}
                role="cell"
                data-label="Apply"
              >
                Apply →
              </Link>
            </div>
          ))}

          {total > 0 && (
            <div className={styles.boardMore}>
              <Link href="/job-listing">View all {total} open roles →</Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default LatestJobs;
