'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import apiService from '@/services/apiService';
import ResultNotFound from '../common/ResultNotFound';
import styles from '@/styles/profile/AppliedJobs.module.css';

const STATUS_LABELS = {
  applied: 'Applied',
  shortlisted: 'Shortlisted',
  interview: 'Interview Scheduled',
  rejected: 'Rejected',
  hired: 'Hired',
};

export default function AppliedJobsCard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await apiService.get('/accounts/applied-jobs/');
        setApplications(res.data?.results || res.data || []);
      } catch (err) {
        console.error('Failed to load applications', err);
        setError(err.message || 'Failed to load applications');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className={styles.loading}>Loading applications…</div>;
  if (error) return <div className={styles.errorState}>{error}</div>;
  if (applications.length === 0) {
    return (
      <ResultNotFound
        type="jobs"
        title="No applications yet"
        message="Jobs you apply to will appear here with status updates."
      />
    );
  }

  return (
    <div className={styles.list}>
      {applications.map((app) => (
        <div className={styles.row} key={app.id}>
          <div>
            <Link href={`/job-listing/${app.job_detail?.slug}`}>
              <h3>{app.job_detail?.title}</h3>
            </Link>
            <p>{app.job_detail?.company}</p>
          </div>
          <span className={`${styles.status} ${styles[app.status]}`}>
            {STATUS_LABELS[app.status] || app.status}
          </span>
          <span className={styles.date}>
            Applied {new Date(app.applied_at).toLocaleDateString()}
          </span>
        </div>
      ))}
    </div>
  );
}