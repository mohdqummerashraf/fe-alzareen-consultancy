'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import apiService from '@/services/apiService';
import ResultNotFound from '../common/ResultNotFound';
import styles from '@/styles/profile/SavedJob.module.css';

export default function SavedJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await apiService.get('/accounts/saved-jobs/');
      setJobs(res.data?.results || res.data || []);
    } catch (err) {
      console.error('Failed to load saved jobs', err);
      setError(err.message || 'Failed to load saved jobs');
    } finally {
      setLoading(false);
    }
  }

  async function handleRemove(id) {
    setRemovingId(id);
    try {
      await apiService.delete('/accounts/saved-jobs', id);
      setJobs((prev) => prev.filter((j) => j.id !== id));
    } catch (err) {
      console.error('Failed to remove saved job', err);
    } finally {
      setRemovingId(null);
    }
  }

  if (loading) return <div className={styles.loading}>Loading saved jobs…</div>;
  if (error) return <div className={styles.errorState}>{error}</div>;
  if (jobs.length === 0) {
    return (
      <ResultNotFound
        type="jobs"
        title="No saved jobs yet"
        message="Jobs you bookmark will show up here."
      />
    );
  }

  return (
    <div className={styles.grid}>
      {jobs.map((saved) => (
        <div className={styles.card} key={saved.id}>
          <Link href={`/job-listing/${saved.job_detail?.slug}`}>
            <h3>{saved.job_detail?.title}</h3>
          </Link>
          <p>
            {saved.job_detail?.location}, {saved.job_detail?.country}
          </p>
          <span className={styles.salary}>{saved.job_detail?.salaryDisplay}</span>
          <button
            type="button"
            onClick={() => handleRemove(saved.id)}
            disabled={removingId === saved.id}
          >
            {removingId === saved.id ? 'Removing…' : 'Remove'}
          </button>
        </div>
      ))}
    </div>
  );
}